import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation'; 
import StatisticsCard from '../components/StatisticsCard';
import { statisticsService, Statistics } from '../services/statistics';
import theme from '../styles/theme';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AdminDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AdminDashboard'>;
};

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

interface StyledProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

const AdminDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AdminDashboardScreenProps['navigation']>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

    const [statistics, setStatistics] = useState<Statistics | null>(null);

  const loadData = async () => {
    try {
      // Carrega consultas
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        setAppointments(allAppointments);
      }

      // Carrega usuários
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        setUsers(allUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }

      // Carrega estatísticas
      const stats = await statisticsService.getGeneralStatistics();
      setStatistics(stats);
  };

  // Carrega os dados quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleUpdateStatus = async (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const updatedAppointments = allAppointments.map(appointment => {
          if (appointment.id === appointmentId) {
            return { ...appointment, status: newStatus };
          }
          return appointment;
        });
        await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(updatedAppointments));
        loadData(); // Recarrega os dados
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Painel Administrativo</Title>

        <Button
          title="Gerenciar Usuários"
          onPress={() => navigation.navigate('UserManagement')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <SectionTitle>Estatísticas Gerais</SectionTitle>
        {statistics && (
          <StatisticsGrid>
            <StatisticsCard
              title="Total de Consultas"
              value={statistics.totalAppointments}
              color={theme.colors.primary}
              subtitle="Todas as consultas"
            />
            <StatisticsCard
              title="Consultas Confirmadas"
              value={statistics.confirmedAppointments}
              color={theme.colors.success}
              subtitle={`${statistics.statusPercentages.confirmed.toFixed(1)}% do total`}
            />
            <StatisticsCard
              title="Pacientes Ativos"
              value={statistics.totalPatients}
              color={theme.colors.secondary}
              subtitle="Pacientes únicos"
            />
            <StatisticsCard
              title="Médicos Ativos"
              value={statistics.totalDoctors}
              color={theme.colors.warning}
              subtitle="Médicos com consultas"
            />
          </StatisticsGrid>
        )}

        <SectionTitle>Especialidades Mais Procuradas</SectionTitle>
        {statistics && Object.entries(statistics.specialties).length > 0 && (
          <SpecialtyContainer>
            {Object.entries(statistics.specialties)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 3)
              .map(([specialty, count]) => (
                <SpecialtyItem key={specialty}>
                  <SpecialtyName>{specialty}</SpecialtyName>
                  <SpecialtyCount>{count} consultas</SpecialtyCount>
                </SpecialtyItem>
              ))
            }
          </SpecialtyContainer>
        )}

        <SectionTitle>Últimas Consultas</SectionTitle>
        {loading ? (
          <LoadingText>Carregando dados...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.doctorName as TextStyle}>
                  {appointment.doctorName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </ListItem.Subtitle>
                <Text style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </Text>
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
                {appointment.status === 'pending' && (
                  <ButtonContainer>
                    <Button
                      title="Confirmar"
                      onPress={() => handleUpdateStatus(appointment.id, 'confirmed')}
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.confirmButton}
                    />
                    <Button
                      title="Cancelar"
                      onPress={() => handleUpdateStatus(appointment.id, 'cancelled')}
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.cancelButton}
                    />
                  </ButtonContainer>
                )}
              </ListItem.Content>
            </AppointmentCard>
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  margin-top: 10px;
`;

const AppointmentCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const StatisticsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SpecialtyContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const SpecialtyItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border}20;
`;

const SpecialtyName = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
`;

const SpecialtyCount = styled.Text`
  font-size: 14px;
  color: ${theme.colors.primary};
  font-weight: 600;
`;

export default AdminDashboardScreen;