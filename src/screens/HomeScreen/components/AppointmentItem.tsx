// src/screens/HomeScreen/components/AppointmentItem.tsx
import React from 'react';
import { Icon } from 'react-native-elements';
import { Appointment } from '../../../types/appointments';
import { getDoctorInfo } from '../models/doctors';
import theme from '../../../styles/theme';
import {
  AppointmentCard,
  DoctorImage,
  InfoContainer,
  DoctorName,
  DoctorSpecialty,
  DateTime,
  Description,
  Status,
  ActionButtons,
  ActionButton,
} from '../styles';

interface AppointmentItemProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onEdit,
  onDelete,
}) => {
  const doctor = getDoctorInfo(appointment.doctorId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(appointment);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(appointment.id);
    }
  };

  return (
    <AppointmentCard>
      <DoctorImage source={{ uri: doctor?.image || 'https://via.placeholder.com/100' }} />
      <InfoContainer>
        <DoctorName>{doctor?.name || 'Médico não encontrado'}</DoctorName>
        <DoctorSpecialty>{doctor?.specialty || 'Especialidade não encontrada'}</DoctorSpecialty>
        <DateTime>{new Date(appointment.date).toLocaleDateString()} - {appointment.time}</DateTime>
        <Description>{appointment.description}</Description>
        <Status status={appointment.status}>
          {appointment.status === 'pending' ? 'Pendente' : 'Confirmado'}
        </Status>
        <ActionButtons>
          <ActionButton onPress={handleEdit}>
            <Icon name="edit" type="material" size={20} color={theme.colors.primary} />
          </ActionButton>
          <ActionButton onPress={handleDelete}>
            <Icon name="delete" type="material" size={20} color={theme.colors.error} />
          </ActionButton>
        </ActionButtons>
      </InfoContainer>
    </AppointmentCard>
  );
};