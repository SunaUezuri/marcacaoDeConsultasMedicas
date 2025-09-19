import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { useEditProfile } from './hooks/useEditProfile';
import { Container, styles } from './styles';
import ProfileForm from './components/ProfileForm';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    user,
    formData,
    loading,
    handleFieldChange,
    handleImageSelected,
    handleSaveProfile,
  } = useEditProfile();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProfileForm
          user={user}
          formData={formData}
          loading={loading}
          onFieldChange={handleFieldChange}
          onImageSelected={handleImageSelected}
          onSave={handleSaveProfile}
          onCancel={() => navigation.goBack()}
        />
      </ScrollView>
    </Container>
  );
};

export default EditProfileScreen;