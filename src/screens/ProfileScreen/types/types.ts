import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { User } from "../../../types/auth";
import { RootStackParamList } from "../../../types/navigation";

export interface ProfileDetailsCardProps {
  user: User | null;
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Profile'>;