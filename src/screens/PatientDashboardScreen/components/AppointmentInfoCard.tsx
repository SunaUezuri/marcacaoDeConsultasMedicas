import React from 'react';
import { ListItem, Text } from 'react-native-elements';
import { TextStyle } from 'react-native';
import { AppointmentCard, StatusBadge, StatusText, styles } from '../styles';
import { AppointmentInfoCardProps } from '../Types/types';
import { getStatusText } from '../../../utils/statusUtils';

const AppointmentInfoCard: React.FC<AppointmentInfoCardProps> = ({ appointment }) => {
  return (
    <AppointmentCard>
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
      </ListItem.Content>
    </AppointmentCard>
  );
};

export default AppointmentInfoCard;