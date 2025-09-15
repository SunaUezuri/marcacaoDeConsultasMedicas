import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { statisticsService, Statistics } from '../../../services/statistics';
import { notificationService } from '../../../services/notifications';
import { Appointment } from '../../../types/appointments';
import { appointmentService } from '../services/doctorDashboardService';

export const useDoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [actionType, setActionType] = useState<'confirm' | 'cancel'>('confirm');

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [allAppointments, stats] = await Promise.all([
        appointmentService.getAllAppointments(),
        statisticsService.getDoctorStatistics(user.id),
      ]);
      
      const doctorAppointments = allAppointments.filter(app => app.doctorId === user.id);
      setAppointments(doctorAppointments);
      setStatistics(stats);

    } catch (error) {
      console.error('Erro ao carregar os dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleOpenModal = (appointment: Appointment, action: 'confirm' | 'cancel') => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const handleConfirmAction = async (reason?: string) => {
    if (!selectedAppointment) return;

    try {
      const newStatus = actionType === 'confirm' ? 'confirmed' : 'cancelled';
      await appointmentService.updateAppointmentStatus(selectedAppointment.id, newStatus, reason);

      if (newStatus === 'confirmed') {
        await notificationService.notifyAppointmentConfirmed(selectedAppointment.patientId, selectedAppointment);
      } else {
        await notificationService.notifyAppointmentCancelled(selectedAppointment.patientId, selectedAppointment, reason);
      }
      
      handleCloseModal();
      await loadData();

    } catch (error) {
      console.error('Falha ao confirmar ação:', error);
    }
  };
  
  return {
    loading,
    appointments,
    statistics,
    modalVisible,
    selectedAppointment,
    actionType,
    handleOpenModal,
    handleCloseModal,
    handleConfirmAction,
  };
};