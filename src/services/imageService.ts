import * as ImagePicker from 'expo-image-picker';
import { storageService, STORAGE_KEYS } from './storage';

export interface ImageResult {
  uri: string;
  base64?: string;
  width: number;
  height: number;
  fileSize?: number;
}

export const imageService = {
  // Solicita permissões necessárias
  async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para acessar a galeria de fotos!');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      return false;
    }
  },

  // Abre a galeria para seleção de imagem
  async pickImageFromGallery(): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Aspecto quadrado para foto de perfil
        quality: 0.8,
        base64: true, // Necessário para armazenamento local
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        return {
          uri: asset.uri,
          base64: asset.base64,
          width: asset.width,
          height: asset.height,
          fileSize: asset.fileSize,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      throw new Error('Erro ao selecionar imagem da galeria');
    }
  },

  // Abre a câmera para captura de foto
  async takePhoto(): Promise<ImageResult | null> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para usar a câmera!');
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        return {
          uri: asset.uri,
          base64: asset.base64,
          width: asset.width,
          height: asset.height,
          fileSize: asset.fileSize,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      throw new Error('Erro ao capturar foto com a câmera');
    }
  },

  // Salva a imagem no armazenamento local
  async saveProfileImage(userId: string, imageResult: ImageResult): Promise<string> {
    try {
      if (!imageResult.base64) {
        throw new Error('Dados da imagem não encontrados');
      }

      // Gera um identificador único para a imagem
      const imageId = `profile_${userId}_${Date.now()}`;
      const imageKey = `@MedicalApp:profileImage:${imageId}`;
      
      // Salva a imagem como base64 no AsyncStorage
      const imageData = {
        id: imageId,
        userId,
        base64: imageResult.base64,
        uri: imageResult.uri,
        metadata: {
          width: imageResult.width,
          height: imageResult.height,
          fileSize: imageResult.fileSize,
          createdAt: new Date().toISOString(),
        },
      };

      await storageService.setItem(imageKey, imageData);
      
      // Atualiza o índice de imagens do usuário
      await this.updateUserImageIndex(userId, imageId);
      
      // Retorna o URI local para uso imediato
      return `data:image/jpeg;base64,${imageResult.base64}`;
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      throw new Error('Erro ao salvar imagem no dispositivo');
    }
  },

  // Atualiza o índice de imagens do usuário
  async updateUserImageIndex(userId: string, imageId: string): Promise<void> {
    try {
      const indexKey = `@MedicalApp:userImages:${userId}`;
      const currentImages = await storageService.getItem<string[]>(indexKey, []);
      
      // Remove imagens antigas e adiciona a nova
      const updatedImages = [imageId, ...currentImages.slice(0, 4)]; // Mantém apenas as 5 mais recentes
      
      await storageService.setItem(indexKey, updatedImages);
    } catch (error) {
      console.error('Erro ao atualizar índice de imagens:', error);
    }
  },

  // Recupera a imagem de perfil do usuário
  async getUserProfileImage(userId: string): Promise<string | null> {
    try {
      const indexKey = `@MedicalApp:userImages:${userId}`;
      const userImages = await storageService.getItem<string[]>(indexKey, []);
      
      if (userImages.length === 0) {
        return null;
      }

      // Pega a imagem mais recente
      const latestImageId = userImages[0];
      const imageKey = `@MedicalApp:profileImage:${latestImageId}`;
      const imageData = await storageService.getItem(imageKey);
      
      if (imageData && imageData.base64) {
        return `data:image/jpeg;base64,${imageData.base64}`;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao recuperar imagem do perfil:', error);
      return null;
    }
  },

  // Remove imagens antigas do usuário
  async cleanupOldImages(userId: string): Promise<void> {
    try {
      const indexKey = `@MedicalApp:userImages:${userId}`;
      const userImages = await storageService.getItem<string[]>(indexKey, []);
      
      // Remove imagens além das 5 mais recentes
      const imagesToRemove = userImages.slice(5);
      
      for (const imageId of imagesToRemove) {
        const imageKey = `@MedicalApp:profileImage:${imageId}`;
        await storageService.removeItem(imageKey);
      }
      
      // Atualiza o índice
      const updatedImages = userImages.slice(0, 5);
      await storageService.setItem(indexKey, updatedImages);
    } catch (error) {
      console.error('Erro ao limpar imagens antigas:', error);
    }
  },

  // Valida se uma URI de imagem é válida
  validateImageUri(uri: string): boolean {
    if (!uri) return false;
    
    // Verifica se é uma URI de dados base64 ou uma URI local válida
    return uri.startsWith('data:image/') || 
           uri.startsWith('file://') || 
           uri.startsWith('content://') ||
           uri.startsWith('https://');
  },

  // Gera uma URI placeholder caso não tenha imagem
  getPlaceholderImage(): string {
    return 'https://via.placeholder.com/150/6366f1/ffffff?text=Avatar';
  },
};