import { useState, useCallback } from 'react';
import { Alert, Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { storageService } from '../../../services/storage';
import { AppSettings, INITIAL_SETTINGS, StorageInfo } from '../types/types';


export const useSettings = () => {
  const { signOut } = useAuth();
  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    try {
      const savedSettings = await storageService.getAppSettings();
      setSettings(savedSettings || INITIAL_SETTINGS);

      const info = await storageService.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      Alert.alert('Erro', 'Não foi possível carregar as configurações.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [loadSettings])
  );

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await storageService.updateAppSettings({ [key]: value });
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a configuração.');
      // Reverte o estado em caso de erro
      setSettings(settings);
    }
  };

  const handleCreateBackup = async () => {
    setLoading(true);
    try {
      const backup = await storageService.createBackup();
      const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;
      await Share.share({
        message: backup,
        title: `Backup do App - ${fileName}`,
      });
      Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o backup.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    Alert.alert('Limpar Cache', 'Tem certeza que deseja limpar o cache?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: async () => {
          try {
            await storageService.clearCache();
            await loadSettings(); // Recarrega as informações
            Alert.alert('Sucesso', 'Cache limpo!');
          } catch {
            Alert.alert('Erro', 'Não foi possível limpar o cache.');
          }
        },
      },
    ]);
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Apagar Todos os Dados',
      'Essa ação não pode ser desfeita e irá deslogar você. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'APAGAR',
          style: 'destructive',
          onPress: async () => {
            try {
              await storageService.clearAll();
              Alert.alert('Concluído', 'Todos os dados foram apagados.', [
                { text: 'OK', onPress: signOut },
              ]);
            } catch {
              Alert.alert('Erro', 'Não foi possível apagar os dados.');
            }
          },
        },
      ]
    );
  };

  return {
    loading,
    settings,
    storageInfo,
    updateSetting,
    handleCreateBackup,
    handleClearCache,
    handleClearAllData,
  };
};