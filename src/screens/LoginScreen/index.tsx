import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from './hooks/useLogin';
import { Container, Title } from './styles';
import LoginForm from './components/LoginForm';
import { LoginScreenProps } from './types/types';
import CredentialsHint from './components/CredentialHint';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenProps>();
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <LoginForm
        email={email}
        password={password}
        loading={loading}
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        onNavigateToRegister={() => navigation.navigate('Register')}
      />
      <CredentialsHint />
    </Container>
  );
};

export default LoginScreen;