import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageData {
  [key: string]: any;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry?: number;
}

// Cache em memória para melhor performance
const cache = new Map<string, CacheItem<any>>();

// Chaves de armazenamento centralizadas
export const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
  APPOINTMENTS: '@MedicalApp:appointments',
  NOTIFICATIONS: '@MedicalApp:notifications',
  REGISTERED_USERS: '@MedicalApp:registeredUsers',
  APP_SETTINGS: '@MedicalApp:settings',
  STATISTICS_CACHE: '@MedicalApp:statisticsCache',
} as const;

export const storageService = {
  // Operações básicas com cache
  async setItem<T>(key: string, value: T, expiryMinutes?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
      
      // Atualiza o cache
      const cacheItem: CacheItem<T> = {
        data: value,
        timestamp: Date.now(),
        expiry: expiryMinutes ? Date.now() + (expiryMinutes * 60 * 1000) : undefined,
      };
      cache.set(key, cacheItem);
    } catch (error) {
      console.error(`Erro ao salvar ${key}:`, error);
      throw error;
    }
  },

  async getItem<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      // Verifica se existe no cache e se não expirou
      const cached = cache.get(key);
      if (cached) {
        if (!cached.expiry || cached.expiry > Date.now()) {
          return cached.data as T;
        } else {
          // Remove do cache se expirou
          cache.delete(key);
        }
      }

      // Busca no AsyncStorage
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored) as T;
        
        // Adiciona ao cache
        cache.set(key, {
          data: parsed,
          timestamp: Date.now(),
        });
        
        return parsed;
      }
      
      return defaultValue || null;
    } catch (error) {
      console.error(`Erro ao carregar ${key}:`, error);
      return defaultValue || null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      cache.delete(key);
    } catch (error) {
      console.error(`Erro ao remover ${key}:`, error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
      cache.clear();
    } catch (error) {
      console.error('Erro ao limpar armazenamento:', error);
      throw error;
    }
  },

  // Backup e restore
  async createBackup(): Promise<string> {
    try {
      const backup = {
        timestamp: new Date().toISOString(),
        data: {
          appointments: await this.getItem(STORAGE_KEYS.APPOINTMENTS, []),
          notifications: await this.getItem(STORAGE_KEYS.NOTIFICATIONS, []),
          registeredUsers: await this.getItem(STORAGE_KEYS.REGISTERED_USERS, []),
          settings: await this.getItem(STORAGE_KEYS.APP_SETTINGS, {}),
        },
      };
      return JSON.stringify(backup);
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error;
    }
  },

  async restoreFromBackup(backupString: string): Promise<void> {
    try {
      const backup = JSON.parse(backupString);
      
      if (backup.data) {
        await this.setItem(STORAGE_KEYS.APPOINTMENTS, backup.data.appointments || []);
        await this.setItem(STORAGE_KEYS.NOTIFICATIONS, backup.data.notifications || []);
        await this.setItem(STORAGE_KEYS.REGISTERED_USERS, backup.data.registeredUsers || []);
        await this.setItem(STORAGE_KEYS.APP_SETTINGS, backup.data.settings || {});
      }
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      throw error;
    }
  },

  // Limpeza de cache
  clearCache(): void {
    cache.clear();
  },

  // Informações de armazenamento
  async getStorageInfo(): Promise<{
    cacheSize: number;
    totalKeys: number;
    lastAccess: { [key: string]: number };
  }> {
    const allKeys = await AsyncStorage.getAllKeys();
    const lastAccess: { [key: string]: number } = {};
    
    cache.forEach((value, key) => {
      lastAccess[key] = value.timestamp;
    });

    return {
      cacheSize: cache.size,
      totalKeys: allKeys.length,
      lastAccess,
    };
  },

  // Configurações da aplicação
  async getAppSettings(): Promise<any> {
    return await this.getItem(STORAGE_KEYS.APP_SETTINGS, {
      theme: 'light',
      notifications: true,
      language: 'pt-BR',
      autoBackup: true,
    });
  },

  async updateAppSettings(settings: Partial<any>): Promise<void> {
    const currentSettings = await this.getAppSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    await this.setItem(STORAGE_KEYS.APP_SETTINGS, updatedSettings);
  },
};