import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../../../types/appointments';

export class HomeAppointmentService {
  private static readonly STORAGE_KEY = 'appointments';

  static async loadAppointments(): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (storedAppointments) {
        return JSON.parse(storedAppointments);
      }
      return [];
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      return [];
    }
  }

  static async saveAppointments(appointments: Appointment[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error('Erro ao salvar consultas:', error);
      throw error;
    }
  }

  static async deleteAppointment(appointmentId: string): Promise<Appointment[]> {
    try {
      const appointments = await this.loadAppointments();
      const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
      await this.saveAppointments(updatedAppointments);
      return updatedAppointments;
    } catch (error) {
      console.error('Erro ao deletar consulta:', error);
      throw error;
    }
  }
}