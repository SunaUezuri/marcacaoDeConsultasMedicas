import { User } from "../../../types/auth";

export interface ProfileFormData {
  name: string;
  email: string;
  specialty: string;
  profileImage: string;
}

export interface ProfileFormProps {
  user: User | null;
  formData: ProfileFormData;
  loading: boolean;
  onFieldChange: <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => void;
  onImageSelected: (uri: string) => void;
  onSave: () => void;
  onCancel: () => void;
}