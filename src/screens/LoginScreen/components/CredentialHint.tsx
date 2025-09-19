import React from 'react';
import { Text } from 'react-native-elements';
import { styles } from '../styles';

const CredentialsHint: React.FC = () => (
  <>
    <Text style={styles.hint}>Use as credenciais de exemplo:</Text>
    <Text style={styles.credentials}>
      Admin: admin@example.com / 123456{'\n'}
      Médicos: joao@example.com, maria@example.com / 123456
    </Text>
  </>
);

export default CredentialsHint;