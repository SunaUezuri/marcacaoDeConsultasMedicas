import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { appointmentService } from '../../../services/appointmentService';
import { Appointment } from '../../../types/appointments';

export const usePatientDashboard = () => {
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const userAppointments = await appointmentService.getPatientAppointments(user.id);
      setAppointments(userAppointments);
    } catch (error) {
      console.error('Falha ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, []),
  );


  return {
    loading,
    appointments,
    user,
    signOut,
  };
};