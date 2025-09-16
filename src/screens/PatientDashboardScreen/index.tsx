import React from 'react';
import { ViewStyle, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import AppointmentInfoCard from './components/AppointmentInfoCard';
import { Container, Title, LoadingText, EmptyText, styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { usePatientDashboard } from './hooks/usePatientDashboard';

const PatientDashboardScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { loading, appointments, signOut } = usePatientDashboard();

  const renderListHeader = () => (
    <>
      <Title>Minhas Consultas</Title>
      <Button
        title="Agendar Nova Consulta"
        onPress={() => navigation.navigate('CreateAppointment')}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />
      <Button
        title="Meu Perfil"
        onPress={() => navigation.navigate('Profile')}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />
      <Button
        title="Configurações"
        onPress={() => navigation.navigate('Settings')}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.settingsButton}
      />
    </>
  );

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingText>Carregando consultas...</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppointmentInfoCard appointment={item} />}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={<EmptyText>Nenhuma consulta agendada</EmptyText>}
        ListFooterComponent={
          <Button
            title="Sair"
            onPress={signOut}
            containerStyle={styles.button as ViewStyle}
            buttonStyle={styles.logoutButton}
          />
        }
      />
    </Container>
  );
};

export default PatientDashboardScreen;