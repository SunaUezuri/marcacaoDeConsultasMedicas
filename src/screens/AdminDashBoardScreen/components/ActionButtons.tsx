// src/screens/AdminDashBoardScreen/components/ActionButtons.tsx
import React from 'react';
import { Button } from 'react-native-elements';
import { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useAuth } from '../../../contexts/AuthContext';


type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

export const ActionButtons: React.FC = () => {
  const navigation = useNavigation<AdminDashboardScreenProps['navigation']>();
  const { signOut } = useAuth();

  return (
    <>
      <Button
        title="Gerenciar Usuários"
        onPress={() => navigation.navigate('UserManagement')}
        containerStyle={{ marginBottom: 12 } as ViewStyle}
        buttonStyle={{ backgroundColor: '#2196F3' }}
      />

      <Button
        title="Meu Perfil"
        onPress={() => navigation.navigate('Profile')}
        containerStyle={{ marginBottom: 12 } as ViewStyle}
        buttonStyle={{ backgroundColor: '#FF9800' }}
      />

      <Button
        title="Sair"
        onPress={signOut}
        containerStyle={{ marginBottom: 12 } as ViewStyle}
        buttonStyle={{ backgroundColor: '#F44336' }}
      />
    </>
  );
};
