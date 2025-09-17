import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { ButtonProps } from '../types/types';



const ActionButtons: React.FC<ButtonProps> = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <Text style={styles.section}>Dados e Armazenamento</Text>
      <Button
        title="Criar Backup"
        onPress={props.onCreateBackup}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.successButton}
        loading={props.loading}
      />
      <Button
        title="Limpar Cache"
        onPress={props.onClearCache}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.warningButton}
        loading={props.loading}
      />

      <Text style={styles.section}>Ações Perigosas</Text>
      <Button
        title="Apagar Todos os Dados"
        onPress={props.onClearAllData}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.dangerButton}
        loading={props.loading}
      />
      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.primaryButton}
      />
    </>
  );
};

export default ActionButtons;