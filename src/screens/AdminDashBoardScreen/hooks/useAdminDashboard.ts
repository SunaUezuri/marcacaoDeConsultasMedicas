// src/screens/AdminDashBoardScreen/hooks/useAdminDashboard.ts
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { AdminDashboardService } from '../services/adminDashboardService';
import { Statistics } from '../../../services/statistics';

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

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export const useAdminDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  const loadData = async () => {
    try {
      const data = await AdminDashboardService.loadData();
      setAppointments(data.appointments);
      setUsers(data.users);
      setStatistics(data.statistics);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const updatedAppointments = await AdminDashboardService.updateAppointmentStatus(appointmentId, newStatus);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return {
    appointments,
    users,
    loading,
    statistics,
    handleUpdateStatus,
  };
};
