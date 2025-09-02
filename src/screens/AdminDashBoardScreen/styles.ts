// src/screens/AdminDashBoardScreen/styles.ts
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollContent = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing.large}px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-top: ${theme.spacing.large}px;
  margin-bottom: ${theme.spacing.medium}px;
`;

export const StatisticsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.large}px;
`;

export const SpecialtyContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

export const SpecialtyItem = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.small}px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

export const SpecialtyName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

export const SpecialtyCount = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-top: 4px;
`;

export const AppointmentCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
  font-size: 16px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
  font-size: 16px;
`;

export const StatusBadge = styled.View<{ status: string }>`
  background-color: ${(props: { status: string }) => {
    switch (props.status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.warning;
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const StatusText = styled.Text<{ status: string }>`
  color: ${theme.colors.white};
  font-size: 12px;
  font-weight: bold;
`;

export const ButtonContainer = styled.View`
  margin-top: ${theme.spacing.medium}px;
`;
