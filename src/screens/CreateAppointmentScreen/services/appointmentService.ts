import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../../../types/appointments';

const APPOINTMENTS_STORAGE_KEY = '@MedicalApp:appointments';

const createAppointment = async (newAppointment: Appointment): Promise<void> => {
  try {
    // Recupera a lista de agendamentos existentes
    const storedAppointments = await AsyncStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

    // Adiciona o novo agendamento
    appointments.push(newAppointment);

    // Salva a lista atualizada
    await AsyncStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Erro ao salvar o novo agendamento:', error);
    throw error; // Propaga o erro para ser tratado no hook
  }
};

export const appointmentService = {
  createAppointment,
};