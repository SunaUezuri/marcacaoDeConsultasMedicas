import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import { NavigationProps } from '../types/types';

export const useRegisterScreen = () => {
  const { register } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = useCallback(async () => {
    setError('');
    if (!name.trim() || !email.trim() || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await register({ name, email, password });
      alert('Cadastro realizado com sucesso! Faça o login para continuar.');
      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [name, email, password, register, navigation]);

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return {
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
  };
};