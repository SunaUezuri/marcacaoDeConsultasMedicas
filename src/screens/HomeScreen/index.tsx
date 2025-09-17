import React from 'react';
import { RefreshControl } from 'react-native';
import { Appointment } from '../../types/appointments';
import { useHomeScreen } from './hooks/useHomeScreen';
import { AppointmentItem } from './components/AppointmentItem';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Content,
  AppointmentList,
  EmptyText,
} from './styles';
import CreateAppointmentButton from './components/CreateAppointmentButton';
import { HomeScreenProps } from './types/types';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    appointments,
    refreshing,
    onRefresh,
    handleDeleteAppointment,
    handleEditAppointment,
  } = useHomeScreen();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentItem
      appointment={item}
      onEdit={handleEditAppointment}
      onDelete={handleDeleteAppointment}
    />
  );

  const handleCreateAppointment = () => {
    navigation.navigate('CreateAppointment');
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Minhas Consultas</HeaderTitle>
      </HeaderContainer>

      <Content>
        <CreateAppointmentButton onPress={handleCreateAppointment} />

        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          }
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;