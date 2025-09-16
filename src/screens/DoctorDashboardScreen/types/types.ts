import { Statistics } from "../../../services/statistics";
import { Appointment } from "../../../types/appointments";

export interface StatisticsDisplayProps {
  statistics: Statistics | null;
}

export interface AppointmentCardItemProps {
  appointment: Appointment;
  onAction: (appointment: Appointment, action: 'confirm' | 'cancel') => void;
}