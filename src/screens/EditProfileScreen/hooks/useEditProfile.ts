import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { imageService } from '../../../services/imageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileFormData } from '../types/types';

export const useEditProfile = () => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    name: user?.name || '',
    email: user?.email || '',
    specialty: user?.specialty || '',
    profileImage: user?.image || '',
  });
  const [loading, setLoading] = useState(false);

  const handleFieldChange = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelected = async (imageUri: string) => {
    try {
      handleFieldChange('profileImage', imageUri);
      
      if (imageUri.startsWith('data:image/') && user?.id) {
        const savedImageUri = await imageService.saveProfileImage(user.id, {
          uri: imageUri,
          base64: imageUri.split(',')[1],
          width: 150,
          height: 150,
        });
        handleFieldChange('profileImage', savedImageUri);
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem selecionada');
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!formData.name.trim() || !formData.email.trim()) {
        Alert.alert('Erro', 'Nome e email são obrigatórios');
        return;
      }

      const updatedUser = {
        ...user!,
        name: formData.name.trim(),
        email: formData.email.trim(),
        image: formData.profileImage,
        ...(user?.role === 'doctor' && { specialty: formData.specialty.trim() }),
      };

      await updateUser(updatedUser);
      await AsyncStorage.setItem('@MedicalApp:user', JSON.stringify(updatedUser));

      if (user?.id) {
        await imageService.cleanupOldImages(user.id);
      }

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    formData,
    loading,
    handleFieldChange,
    handleImageSelected,
    handleSaveProfile,
  };
};