import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import Header from '../../components/Header';
import { useProfileScreen } from './hooks/useProfileScreen';
import ProfileDetailsCard from './components/ProfileDetailsCard';
import { Container, ScrollView, Title, styles } from './styles';

const ProfileScreen: React.FC = () => {
  const { user, signOut, handleEditProfile, handleGoBack } = useProfileScreen();

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileDetailsCard user={user} />

        <Button
          title="Editar Perfil"
          onPress={handleEditProfile}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.editButton}
        />

        <Button
          title="Voltar"
          onPress={handleGoBack}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;