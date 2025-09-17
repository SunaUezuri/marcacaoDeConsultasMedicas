import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from '../../components/Header';
import LoadingView from './components/LoadingView';
import PreferencesSection from './components/PreferencesSection';
import StorageInfoSection from './components/StorageInfoSection';
import ActionButtons from './components/ActionButtons';
import { useSettings } from './hooks/useSettings';
import { styles } from './styles';

const SettingsScreen: React.FC = () => {
  const {
    loading,
    settings,
    storageInfo,
    updateSetting,
    handleCreateBackup,
    handleClearCache,
    handleClearAllData,
  } = useSettings();

  const renderContent = () => {
    if (loading && !storageInfo) {
      return <LoadingView />;
    }

    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Configurações</Text>

        <Text style={styles.section}>Preferências</Text>
        <PreferencesSection settings={settings} onUpdate={updateSetting} />
        
        <StorageInfoSection info={storageInfo} />

        <ActionButtons
          loading={loading}
          onCreateBackup={handleCreateBackup}
          onClearCache={handleClearCache}
          onClearAllData={handleClearAllData}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      {renderContent()}
    </View>
  );
};

export default SettingsScreen;