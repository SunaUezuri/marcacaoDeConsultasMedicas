import React, { useState } from 'react';
import { Alert, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { imageService, ImageResult } from '../services/imageService';
import theme from '../styles/theme';

interface ProfileImagePickerProps {
  currentImageUri?: string;
  onImageSelected: (imageUri: string) => void;
  size?: number;
  editable?: boolean;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  currentImageUri,
  onImageSelected,
  size = 120,
  editable = true,
}) => {
  const [loading, setLoading] = useState(false);

  const showImageOptions = () => {
    Alert.alert(
      'Alterar Foto de Perfil',
      'Como você gostaria de alterar sua foto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Galeria',
          onPress: pickFromGallery,
        },
        {
          text: 'Câmera',
          onPress: takePhoto,
        },
        ...(currentImageUri && !currentImageUri.includes('placeholder') ? [{
          text: 'Remover Foto',
          style: 'destructive' as const,
          onPress: removePhoto,
        }] : []),
      ]
    );
  };

  const pickFromGallery = async () => {
    try {
      setLoading(true);
      const result = await imageService.pickImageFromGallery();
      
      if (result) {
        await handleImageResult(result);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem da galeria');
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    try {
      setLoading(true);
      const result = await imageService.takePhoto();
      
      if (result) {
        await handleImageResult(result);
      }
    } catch (error) {
      console.error('Erro ao capturar foto:', error);
      Alert.alert('Erro', 'Não foi possível capturar a foto');
    } finally {
      setLoading(false);
    }
  };

  const handleImageResult = async (result: ImageResult) => {
    try {
      if (result.base64) {
        const base64Uri = `data:image/jpeg;base64,${result.base64}`;
        onImageSelected(base64Uri);
      } else {
        onImageSelected(result.uri);
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Não foi possível processar a imagem selecionada');
    }
  };

  const removePhoto = () => {
    Alert.alert(
      'Remover Foto',
      'Tem certeza que deseja remover sua foto de perfil?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            onImageSelected(imageService.getPlaceholderImage());
          },
        },
      ]
    );
  };

  const getImageSource = () => {
    if (currentImageUri && imageService.validateImageUri(currentImageUri)) {
      return { uri: currentImageUri };
    }
    return { uri: imageService.getPlaceholderImage() };
  };

  return (
    <Container>
      <ImageContainer size={size}>
        <ProfileImage 
          source={getImageSource()}
          size={size}
        />
        
        {loading && (
          <LoadingOverlay size={size}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadingOverlay>
        )}
        
        {editable && (
          <EditButton onPress={showImageOptions} disabled={loading}>
            <Ionicons 
              name="camera" 
              size={20} 
              color={theme.colors.white} 
            />
          </EditButton>
        )}
      </ImageContainer>
      
      {editable && (
        <ChangePhotoText>Toque no ícone para alterar</ChangePhotoText>
      )}
    </Container>
  );
};

const Container = styled.View`
  align-items: center;
  margin-bottom: 16px;
`;

const ImageContainer = styled.View<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
`;

const ProfileImage = styled.Image<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: 3px;
  border-color: ${theme.colors.primary};
`;

const LoadingOverlay = styled.View<{ size: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${theme.colors.white};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const ChangePhotoText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-top: 8px;
  text-align: center;
`;

export default ProfileImagePicker;