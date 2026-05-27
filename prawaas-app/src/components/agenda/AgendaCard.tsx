import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { AgendaDay } from '../../types';

interface AgendaCardProps {
  day: AgendaDay;
}

export const AgendaCard: React.FC<AgendaCardProps> = ({ day }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.imagePlaceholder, { backgroundColor: theme.primary + '12' }]}>
        <Text style={[styles.placeholderEmoji]}>🚌</Text>
        <Text style={[styles.placeholderText, { color: theme.primary }]}>
          {day.title}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.date, { color: theme.text }]}>
          {day.date} · {day.title}
        </Text>
        <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={4}>
          {day.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
});
