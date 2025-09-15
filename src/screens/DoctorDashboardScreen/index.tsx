import React from 'react';
import { ScrollView, ViewStyle, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import AppointmentActionModal from '../../components/AppointmentActionModal';
import StatisticsDisplay from './components/StatisticsDisplay';
import { Title, LoadingText } from '../AdminDashBoardScreen/styles';
import AppointmentCardItem from './components/AppointmentItem';
import { useDoctorDashboard } from './hooks/useDoctorDashboardScreen';
import { Container, EmptyText, styles } from './styles';

type DoctorDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorDashboard'>;
};

const DoctorDashboardScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>();
  const {
    loading,
    appointments,
    statistics,
    modalVisible,
    selectedAppointment,
    actionType,
    handleOpenModal,
    handleCloseModal,
    handleConfirmAction,
  } = useDoctorDashboard();

  const renderListHeader = () => (
    <>
      <Title>Minhas Consultas</Title>
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
      <StatisticsDisplay statistics={statistics} />
    </>
  );

  return (
    <Container>
      <Header />
      {loading ? (
        <LoadingText>Carregando consultas...</LoadingText>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCardItem appointment={item} onAction={handleOpenModal} />
          )}
          contentContainerStyle={styles.scrollContent}
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
      )}

      {selectedAppointment && (
        <AppointmentActionModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onConfirm={handleConfirmAction}
          actionType={actionType}
          appointmentDetails={{
            patientName: selectedAppointment.patientName,
            doctorName: selectedAppointment.doctorName,
            date: selectedAppointment.date,
            time: selectedAppointment.time,
            specialty: selectedAppointment.specialty,
          }}
        />
      )}
    </Container>
  );
};

export default DoctorDashboardScreen;