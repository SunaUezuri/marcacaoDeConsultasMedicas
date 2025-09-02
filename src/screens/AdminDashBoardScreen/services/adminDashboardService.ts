// src/screens/AdminDashBoardScreen/services/adminDashboardService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { statisticsService, Statistics } from '../../../services/statistics';

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

interface DashboardData {
  appointments: Appointment[];
  users: User[];
  statistics: Statistics;
}

export class AdminDashboardService {
  private static readonly APPOINTMENTS_STORAGE_KEY = '@MedicalApp:appointments';
  private static readonly USERS_STORAGE_KEY = '@MedicalApp:users';

  static async loadData(): Promise<DashboardData> {
    try {
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem(this.APPOINTMENTS_STORAGE_KEY);
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem(this.USERS_STORAGE_KEY);
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Carrega estatísticas
      const statistics = await statisticsService.getGeneralStatistics();

      return {
        appointments,
        users,
        statistics,
      };
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      throw error;
    }
  }

  static async updateAppointmentStatus(appointmentId: string, newStatus: 'confirmed' | 'cancelled'): Promise<Appointment[]> {
    try {
      const storedAppointments = await AsyncStorage.getItem(this.APPOINTMENTS_STORAGE_KEY);
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem(this.APPOINTMENTS_STORAGE_KEY, JSON.stringify(updatedAppointments));
        return updatedAppointments;
      }
      return [];
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }
}
