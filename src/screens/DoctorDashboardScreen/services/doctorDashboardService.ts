import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../../../types/appointments';

const APPOINTMENTS_STORAGE_KEY = '@MedicalApp:appointments';

const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const storedAppointments = await AsyncStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
    return [];
  }
};

const updateAppointmentStatus = async (
  appointmentId: string,
  newStatus: 'confirmed' | 'cancelled',
  reason?: string
): Promise<Appointment[]> => {
  try {
    const allAppointments = await getAllAppointments();
    const updatedAppointments = allAppointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return {
          ...appointment,
          status: newStatus,
          ...(reason && { cancelReason: reason }),
        };
      }
      return appointment;
    });

    await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
    return updatedAppointments;
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error);
    throw error;
  }
};

export const appointmentService = {
  getAllAppointments,
  updateAppointmentStatus,
};