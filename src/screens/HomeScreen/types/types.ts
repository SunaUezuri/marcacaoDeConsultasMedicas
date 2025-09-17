import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Appointment } from "../../../types/appointments";
import { RootStackParamList } from "../../../types/navigation";

export interface AppointmentItemProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
}

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};