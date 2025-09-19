import React from 'react';
import { ViewStyle } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles, ErrorText } from '../styles';
import { LoginFormProps } from '../types/types';

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onNavigateToRegister,
}) => (
  <>
    <Input
      placeholder="Email"
      value={email}
      onChangeText={onEmailChange}
      autoCapitalize="none"
      keyboardType="email-address"
      containerStyle={styles.input}
      leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#888' }}
    />
    <Input
      placeholder="Senha"
      value={password}
      onChangeText={onPasswordChange}
      secureTextEntry
      containerStyle={styles.input}
      leftIcon={{ type: 'font-awesome', name: 'lock', color: '#888' }}
    />

    {error ? <ErrorText>{error}</ErrorText> : null}

    <Button
      title="Entrar"
      onPress={onSubmit}
      loading={loading}
      containerStyle={styles.button as ViewStyle}
      buttonStyle={styles.buttonStyle}
    />
    <Button
      title="Cadastrar Novo Paciente"
      type="outline"
      onPress={onNavigateToRegister}
      containerStyle={styles.registerButton as ViewStyle}
      buttonStyle={styles.registerButtonStyle}
      titleStyle={{ color: '#fff' }}
      disabled={loading}
    />
  </>
);

export default LoginForm;