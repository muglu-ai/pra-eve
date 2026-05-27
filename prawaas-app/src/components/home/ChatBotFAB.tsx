import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useTheme, useEvent } from '../../hooks/useConfig';

export const ChatBotFAB: React.FC = () => {
  const theme = useTheme();
  const event = useEvent();

  if (!event.features.enableChatBot) return null;

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: theme.secondary }]}
      activeOpacity={0.8}
      onPress={() => Alert.alert('Chat Bot', 'Chat feature coming soon!')}
    >
      <Text style={styles.icon}>🤖</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 24,
  },
});
