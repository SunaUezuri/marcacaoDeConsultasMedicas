import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { PropsStorageInfo } from '../types/types';


const StorageInfoSection: React.FC<PropsStorageInfo> = ({ info }) => {
  if (!info) return null;

  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Itens no Cache:</Text>
        <Text style={styles.infoValue}>{info.cacheSize}</Text>
      </View>
      <View style={[styles.infoRow, styles.infoRowLast]}>
        <Text style={styles.infoLabel}>Total de Chaves:</Text>
        <Text style={styles.infoValue}>{info.totalKeys}</Text>
      </View>
    </View>
  );
};

export default StorageInfoSection;