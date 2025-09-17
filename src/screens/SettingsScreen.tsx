import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, Alert, Share, ActivityIndicator } from 'react-native';
import { Button, ListItem, Switch } from 'react-native-elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';
import { storageService } from '../services/storage';
import Header from '../components/Header';
import theme from '../styles/theme';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

interface AppSettings {
  notifications: boolean;
  autoBackup: boolean;
  theme: 'light' | 'dark';
  language: string;
}

interface StorageInfo {
  cacheSize: number;
  totalKeys: number;
}

const SettingsScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<SettingsScreenProps['navigation']>();

  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    autoBackup: true,
    theme: 'light',
    language: 'pt-BR',
  });
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);

  const loadSettings = async () => {
    try {
      const saved = await storageService.getAppSettings();
      setSettings(saved);

      const info = await storageService.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      await storageService.updateAppSettings({ [key]: value });
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a configuração');
    }
  };

  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      const backup = await storageService.createBackup();
      const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;

      await Share.share({
        message: backup,
        title: `Backup do App - ${fileName}`,
      });

      Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
    } catch {
      Alert.alert('Erro', 'Não foi possível criar o backup');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    Alert.alert('Limpar Cache', 'Tem certeza que deseja limpar o cache?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: async () => {
          try {
            await storageService.clearCache();
            await loadSettings();
            Alert.alert('Sucesso', 'Cache limpo!');
          } catch {
            Alert.alert('Erro', 'Não foi possível limpar o cache');
          }
        },
      },
    ]);
  };

  const handleClearAllData = async () => {
    Alert.alert('Apagar Todos os Dados', 'Essa ação não pode ser desfeita!', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'APAGAR',
        style: 'destructive',
        onPress: async () => {
          try {
            await storageService.clearAll();
            Alert.alert('Concluído', 'Todos os dados foram apagados.', [
              { text: 'OK', onPress: () => signOut() },
            ]);
          } catch {
            Alert.alert('Erro', 'Não foi possível apagar os dados');
          }
        },
      },
    ]);
  };

  const renderLoading = () => (
    <View style={stylesSettings.loading}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={stylesSettings.loadingText}>Carregando configurações...</Text>
    </View>
  );

  const renderPreferences = () => (
    <View style={stylesSettings.card}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Notificações</ListItem.Title>
          <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={settings.notifications}
          onValueChange={(v) => updateSetting('notifications', v)}
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
          onValueChange={(v) => updateSetting('autoBackup', v)}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
        />
      </ListItem>
    </View>
  );

  const renderStorageInfo = () =>
    storageInfo && (
      <View style={stylesSettings.card}>
        <View style={stylesSettings.infoRow}>
          <Text style={stylesSettings.infoLabel}>Itens no Cache:</Text>
          <Text style={stylesSettings.infoValue}>{storageInfo.cacheSize}</Text>
        </View>
        <View style={stylesSettings.infoRow}>
          <Text style={stylesSettings.infoLabel}>Total de Chaves:</Text>
          <Text style={stylesSettings.infoValue}>{storageInfo.totalKeys}</Text>
        </View>
      </View>
    );

  if (loading) {
    return (
      <View style={stylesSettings.container}>
        <Header />
        {renderLoading()}
      </View>
    );
  }

  return (
    <View style={stylesSettings.container}>
      <Header />
      <ScrollView contentContainerStyle={stylesSettings.scroll}>
        <Text style={stylesSettings.title}>Configurações</Text>

        <Text style={stylesSettings.section}>Preferências</Text>
        {renderPreferences()}

        <Text style={stylesSettings.section}>Dados e Armazenamento</Text>
        {renderStorageInfo()}

        <Button
          title="Criar Backup"
          onPress={handleCreateBackup}
          containerStyle={stylesSettings.button}
          buttonStyle={stylesSettings.successButton}
          loading={loading}
        />

        <Button
          title="Limpar Cache"
          onPress={handleClearCache}
          containerStyle={stylesSettings.button}
          buttonStyle={stylesSettings.warningButton}
          loading={loading}
        />

        <Text style={stylesSettings.section}>Ações Perigosas</Text>
        <Button
          title="Apagar Todos os Dados"
          onPress={handleClearAllData}
          containerStyle={stylesSettings.button}
          buttonStyle={stylesSettings.dangerButton}
          loading={loading}
        />

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={stylesSettings.button}
          buttonStyle={stylesSettings.primaryButton}
        />
      </ScrollView>
    </View>
  );
};

const baseButton = {
  paddingVertical: 12,
};

const stylesSettings = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    padding: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  loadingText: {
    marginTop: 10,
    color: theme.colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    marginBottom: 20,
    color: theme.colors.text,
  },
  section: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginTop: 20,
    marginBottom: 10,
    color: theme.colors.text,
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: theme.colors.primary,
  },
  button: {
    marginBottom: 15,
    width: '100%',
  },
  primaryButton: {
    ...baseButton,
    backgroundColor: theme.colors.primary,
  },
  successButton: {
    ...baseButton,
    backgroundColor: theme.colors.success,
  },
  warningButton: {
    ...baseButton,
    backgroundColor: theme.colors.warning,
  },
  dangerButton: {
    ...baseButton,
    backgroundColor: theme.colors.error,
  },
};

export default SettingsScreen;

