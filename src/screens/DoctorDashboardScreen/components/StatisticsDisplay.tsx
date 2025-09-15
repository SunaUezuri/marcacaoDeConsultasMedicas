import React from 'react';
import StatisticsCard from '../../../components/StatisticsCard';
import theme from '../../../styles/theme';
import { SectionTitle, StatisticsGrid } from '../../AdminDashBoardScreen/styles';
import { StatisticsDisplayProps } from '../types/types';


const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ statistics }) => {
  if (!statistics) {
    return null;
  }

  return (
    <>
      <SectionTitle>Minhas Estatísticas</SectionTitle>
      <StatisticsGrid>
        <StatisticsCard
          title="Total de Consultas"
          value={statistics.totalAppointments || 0}
          color={theme.colors.primary}
        />
        <StatisticsCard
          title="Consultas Confirmadas"
          value={statistics.confirmedAppointments || 0}
          color={theme.colors.success}
          subtitle={`${statistics.statusPercentages?.confirmed?.toFixed(1) || 0}% do total`}
        />
        <StatisticsCard
          title="Consultas Pendentes"
          value={statistics.pendingAppointments || 0}
          color={theme.colors.warning}
          subtitle={`${statistics.statusPercentages?.pending?.toFixed(1) || 0}% do total`}
        />
        <StatisticsCard
          title="Pacientes Atendidos"
          value={statistics.totalPatients || 0}
          color={theme.colors.secondary}
        />
      </StatisticsGrid>
    </>
  );
};

export default StatisticsDisplay;