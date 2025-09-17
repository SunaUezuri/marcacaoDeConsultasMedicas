import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";
import { Statistics } from "../../../services/statistics";

export type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
  onUpdateStatus: (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => void;
}

export interface StatisticsSectionProps {
  statistics: Statistics;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

export interface DashboardData {
  appointments: Appointment[];
  users: User[];
  statistics: Statistics;
}