// src/screens/AdminDashBoardScreen/components/StatisticsSection.tsx
import React from 'react';
import { Statistics } from '../../../services/statistics';
import StatisticsCard from '../../../components/StatisticsCard';
import theme from '../../../styles/theme';
import {
  StatisticsGrid,
  SectionTitle,
  SpecialtyContainer,
  SpecialtyItem,
  SpecialtyName,
  SpecialtyCount,
} from '../styles';

interface StatisticsSectionProps {
  statistics: Statistics;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ statistics }) => {
  return (
    <>
      <SectionTitle>Estatísticas Gerais</SectionTitle>
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

      <SectionTitle>Especialidades Mais Procuradas</SectionTitle>
      {Object.entries(statistics.specialties).length > 0 && (
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
    </>
  );
};
