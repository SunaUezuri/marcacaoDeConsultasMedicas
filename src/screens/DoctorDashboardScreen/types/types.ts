import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Statistics } from "../../../services/statistics";
import { Appointment } from "../../../types/appointments";
import { RootStackParamList } from "../../../types/navigation";

export type DoctorDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DoctorDashboard'>;
};

export interface StatisticsDisplayProps {
  statistics: Statistics | null;
}

export interface AppointmentCardItemProps {
  appointment: Appointment;
  onAction: (appointment: Appointment, action: 'confirm' | 'cancel') => void;
}