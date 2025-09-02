// src/screens/AdminDashBoardScreen/components/AppointmentList.tsx
import React from 'react';
import { Button, ListItem, Text } from 'react-native-elements';
import { ViewStyle, TextStyle, View } from 'react-native';
import {
  AppointmentCard,
  SectionTitle,
  LoadingText,
  EmptyText,
  StatusBadge,
  StatusText,
} from '../styles';

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
  onUpdateStatus: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    default:
      return '#FF9800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

export const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  loading,
  onUpdateStatus,
}) => {
  if (loading) {
    return <LoadingText>Carregando dados...</LoadingText>;
  }

  if (appointments.length === 0) {
    return <EmptyText>Nenhuma consulta agendada</EmptyText>;
  }

  return (
    <>
      <SectionTitle>Últimas Consultas</SectionTitle>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id}>
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' } as TextStyle}>
              {appointment.doctorName}
            </ListItem.Title>
            <ListItem.Subtitle style={{ fontSize: 14, color: '#666' } as TextStyle}>
              {appointment.specialty}
            </ListItem.Subtitle>
            <Text style={{ fontSize: 14, color: '#333', marginTop: 4 } as TextStyle}>
              {appointment.date} às {appointment.time}
            </Text>
            <StatusBadge status={appointment.status}>
              <StatusText status={appointment.status}>
                {getStatusText(appointment.status)}
              </StatusText>
            </StatusBadge>
            {appointment.status === 'pending' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                <Button
                  title="Confirmar"
                  onPress={() => onUpdateStatus(appointment.id, 'confirmed')}
                  containerStyle={{ marginRight: 8 } as ViewStyle}
                  buttonStyle={{ backgroundColor: '#4CAF50' }}
                />
                <Button
                  title="Cancelar"
                  onPress={() => onUpdateStatus(appointment.id, 'cancelled')}
                  buttonStyle={{ backgroundColor: '#F44336' }}
                />
              </View>
            )}
          </ListItem.Content>
        </AppointmentCard>
      ))}
    </>
  );
};
