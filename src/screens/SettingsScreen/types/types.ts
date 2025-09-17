import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

export type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

export interface AppSettings {
  notifications: boolean;
  autoBackup: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface StorageInfo {
  cacheSize: number;
  totalKeys: number;
}

export const INITIAL_SETTINGS: AppSettings = {
  notifications: true,
  autoBackup: true,
  theme: 'light',
  language: 'pt-BR',
};

export type Props = {
  settings: AppSettings;
  onUpdate: (key: keyof AppSettings, value: boolean) => void;
};

export type PropsStorageInfo = {
  info: StorageInfo | null;
};

export type ButtonProps = {
  loading: boolean;
  onCreateBackup: () => void;
  onClearCache: () => void;
  onClearAllData: () => void;
};
