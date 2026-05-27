import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';

export const MeetingsButton: React.FC = () => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: theme.primary }]}
      activeOpacity={0.7}
      onPress={() => Alert.alert('My Meetings', 'Meetings feature coming soon!')}
    >
      <Ionicons name="link-outline" size={18} color={theme.primary} style={styles.icon} />
      <Text style={[styles.label, { color: theme.primary }]}>My Meetings</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
