import React from 'react';
import { View } from 'react-native';
import { ListItem, Switch } from 'react-native-elements';
import { styles } from '../styles';
import theme from '../../../styles/theme';
import { Props } from '../types/types';

const PreferencesSection: React.FC<Props> = ({ settings, onUpdate }) => (
  <View style={styles.card}>
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>Notificações</ListItem.Title>
        <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
      </ListItem.Content>
      <Switch
        value={settings.notifications}
        onValueChange={(v) => onUpdate('notifications', v)}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      />
    </ListItem>
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>Backup Automático</ListItem.Title>
        <ListItem.Subtitle>Criar backups automaticamente</ListItem.Subtitle>
      </ListItem.Content>
      <Switch
        value={settings.autoBackup}
        onValueChange={(v) => onUpdate('autoBackup', v)}
        trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
      />
    </ListItem>
  </View>
);

export default PreferencesSection;