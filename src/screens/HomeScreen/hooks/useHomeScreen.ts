import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Appointment } from '../../../types/appointments';
import { HomeAppointmentService } from '../services/appointmentService';

export const useHomeScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadAppointments = async () => {
    try {
      const loadedAppointments = await HomeAppointmentService.loadAppointments();
      setAppointments(loadedAppointments);
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const updatedAppointments = await HomeAppointmentService.deleteAppointment(appointmentId);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
    }
  };

  const handleEditAppointment = (appointment: Appointment) => {
    // Lógica para editar consulta será implementada posteriormente
    console.log('Editar consulta:', appointment);
  };

  return {
    appointments,
    refreshing,
    onRefresh,
    handleDeleteAppointment,
    handleEditAppointment,
  };
};