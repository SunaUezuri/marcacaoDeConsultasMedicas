import React from 'react';
import { ViewStyle } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useRegisterScreen } from './hooks/useRegisterScreen';
import { ErrorText } from '../CreateAppointmentScreen/styles';
import { Container, Title, styles } from './styles';

const RegisterScreen: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleRegister,
    handleGoToLogin,
  } = useRegisterScreen();

  return (
    <Container>
      <Title>Crie sua Conta</Title>
      
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        containerStyle={styles.input}
        leftIcon={{ type: 'ionicon', name: 'person-outline', color: '#888' }}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
        leftIcon={{ type: 'ionicon', name: 'mail-outline', color: '#888' }}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
        leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: '#888' }}
      />

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Já tem uma conta? Faça login"
        onPress={handleGoToLogin}
        containerStyle={styles.backButton as ViewStyle}
        buttonStyle={styles.backButtonStyle}
        type="clear"
      />
    </Container>
  );
};

export default RegisterScreen;