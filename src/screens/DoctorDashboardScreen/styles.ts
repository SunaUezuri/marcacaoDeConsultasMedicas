import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import theme from '../../styles/theme';
import { StyledProps } from './types/types';
import { getStatusColor } from './utils/statusUtils';
import { ListItem } from 'react-native-elements';

export const styles = {
  button: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonStyle: {
    backgroundColor: '#1976d2',
  },
  settingsButton: {
    backgroundColor: '#388e3c',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
  },
  scrollContent: {
    paddingBottom: 24,
  },
};

export const stylesItem = {
  patientName: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  dateTime: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  specialty: { fontSize: 14, fontWeight: '500', color: theme.colors.text },
  actionButton: { 
    width: '48%',
  },
  confirmButton: { 
    backgroundColor: theme.colors.success, 
    paddingVertical: 8 
  },
  cancelButton: { 
    backgroundColor: theme.colors.error, 
    paddingVertical: 8 
  },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const AppointmentCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const StatisticsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;