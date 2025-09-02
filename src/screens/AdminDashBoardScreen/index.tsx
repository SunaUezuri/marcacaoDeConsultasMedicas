// src/screens/AdminDashBoardScreen/index.tsx
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAdminDashboard } from './hooks/useAdminDashboard';
import { StatisticsSection } from './components/StatisticsSection';
import { AppointmentList } from './components/AppointmentList';
import { ActionButtons } from './components/ActionButtons';
import {
  Container,
  ScrollContent,
  Title,
} from './styles';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ navigation }) => {
  const {
    appointments,
    loading,
    statistics,
    handleUpdateStatus,
  } = useAdminDashboard();

  return (
    <Container>
      <ScrollContent>
        <Title>Painel Administrativo</Title>

        <ActionButtons />

        {statistics && <StatisticsSection statistics={statistics} />}

        <AppointmentList
          appointments={appointments}
          loading={loading}
          onUpdateStatus={handleUpdateStatus}
        />
      </ScrollContent>
    </Container>
  );
};

export default AdminDashboardScreen;