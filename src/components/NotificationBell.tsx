import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { notificationService } from '../services/notifications';
import theme from '../styles/theme';

const NotificationBell: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = async () => {
    if (!user?.id) return;
    
    try {
      const count = await notificationService.getUnreadCount(user.id);
      setUnreadCount(count);
    } catch (error) {
      console.error('Erro ao carregar contador de notificações:', error);
    }
  };

  useEffect(() => {
    loadUnreadCount();
    
    // Recarrega o contador a cada 30 segundos
    const interval = setInterval(loadUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, [user?.id]);

  // Atualiza quando a tela volta ao foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUnreadCount);
    return unsubscribe;
  }, [navigation, user?.id]);

  const handlePress = () => {
    navigation.navigate('Notifications' as never);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <BellContainer>
        <BellIcon>🔔</BellIcon>
        {unreadCount > 0 && (
          <Badge
            value={unreadCount > 99 ? '99+' : unreadCount.toString()}
            status="error"
            containerStyle={styles.badge}
            textStyle={styles.badgeText}
          />
        )}
      </BellContainer>
    </TouchableOpacity>
  );
};

const styles = {
  badge: {
    position: 'absolute' as const,
    top: -8,
    right: -8,
  },
  badgeText: {
    fontSize: 10,
  },
};

const BellContainer = styled.View`
  position: relative;
  padding: 8px;
`;

const BellIcon = styled.Text`
  font-size: 24px;
  color: ${theme.colors.white};
`;

export default NotificationBell;