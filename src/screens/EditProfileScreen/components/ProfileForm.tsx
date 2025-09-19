import React from 'react';
import { ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ProfileImagePicker from '../../../components/ProfileImagePicker';
import {
  Title,
  ProfileCard,
  RoleBadge,
  RoleText,
  styles,
} from '../styles';
import { ProfileFormProps } from '../types/types';

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  formData,
  loading,
  onFieldChange,
  onImageSelected,
  onSave,
  onCancel,
}) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'doctor': return 'Médico';
      default: return 'Paciente';
    }
  };

  return (
    <>
      <Title>Editar Perfil</Title>
      <ProfileCard>
        <ProfileImagePicker
          currentImageUri={formData.profileImage}
          onImageSelected={onImageSelected}
          size={120}
          editable={true}
        />
        
        <Input
          label="Nome"
          value={formData.name}
          onChangeText={(text) => onFieldChange('name', text)}
          containerStyle={styles.input}
          placeholder="Digite seu nome"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text) => onFieldChange('email', text)}
          containerStyle={styles.input}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {user?.role === 'doctor' && (
          <Input
            label="Especialidade"
            value={formData.specialty}
            onChangeText={(text) => onFieldChange('specialty', text)}
            containerStyle={styles.input}
            placeholder="Digite sua especialidade"
          />
        )}

        {user?.role && (
          <RoleBadge role={user.role}>
            <RoleText>{getRoleDisplayName(user.role)}</RoleText>
          </RoleBadge>
        )}
      </ProfileCard>

      <Button
        title="Salvar Alterações"
        onPress={onSave}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.saveButton}
      />

      <Button
        title="Cancelar"
        onPress={onCancel}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.cancelButton}
        disabled={loading}
      />
    </>
  );
};

export default ProfileForm;