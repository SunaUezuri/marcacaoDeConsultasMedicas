import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { AppointmentCard, ButtonContainer, StatusBadge, StatusText, stylesItem } from '../styles';
import { AppointmentCardItemProps } from '../types/types';
import { getStatusText } from '../../../utils/statusUtils';

const AppointmentCardItem: React.FC<AppointmentCardItemProps> = ({ appointment, onAction }) => {
  return (
    <AppointmentCard>
      <ListItem.Content>
        <ListItem.Title style={stylesItem.patientName as TextStyle}>
          Paciente: {appointment.patientName || 'Nome não disponível'}
        </ListItem.Title>
        <ListItem.Subtitle style={stylesItem.dateTime as TextStyle}>
          {appointment.date} às {appointment.time}
        </ListItem.Subtitle>
        <Text style={stylesItem.specialty as TextStyle}>{appointment.specialty}</Text>
        <StatusBadge status={appointment.status}>
          <StatusText status={appointment.status}>
            {getStatusText(appointment.status)}
          </StatusText>
        </StatusBadge>
        {appointment.status === 'pending' && (
          <ButtonContainer>
            <Button
              title="Confirmar"
              onPress={() => onAction(appointment, 'confirm')}
              containerStyle={stylesItem.actionButton as ViewStyle}
              buttonStyle={stylesItem.confirmButton}
            />
            <Button
              title="Cancelar"
              onPress={() => onAction(appointment, 'cancel')}
              containerStyle={stylesItem.actionButton as ViewStyle}
              buttonStyle={stylesItem.cancelButton}
            />
          </ButtonContainer>
        )}
      </ListItem.Content>
    </AppointmentCard>
  );
};

export default AppointmentCardItem;