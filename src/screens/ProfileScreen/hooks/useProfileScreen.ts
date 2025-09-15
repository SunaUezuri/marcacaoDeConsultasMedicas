import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/types';

export const useProfileScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return {
    user,
    signOut,
    handleEditProfile,
    handleGoBack,
  };
};
