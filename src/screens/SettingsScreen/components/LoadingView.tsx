import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles';
import theme from '../../../styles/theme';

const LoadingView: React.FC = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={theme.colors.primary} />
    <Text style={styles.loadingText}>Carregando configurações...</Text>
  </View>
);

export default LoadingView;