import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useEvent } from '../../hooks/useConfig';

export const EventInfo: React.FC = () => {
  const theme = useTheme();
  const event = useEvent();

  const formattedDate = formatDateRange(event.startDate, event.endDate);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{event.name}</Text>
        <TouchableOpacity
          onPress={() => {
            if (event.venue.mapUrl) Linking.openURL(event.venue.mapUrl);
          }}
        >
          <Text style={[styles.directions, { color: theme.secondary }]}>
            View Directions ↗
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={18} color={theme.textSecondary} />
        <Text style={[styles.detail, { color: theme.text }]}>{formattedDate}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={18} color={theme.textSecondary} />
        <Text style={[styles.detail, { color: theme.text }]}>
          {event.venue.city}, {event.venue.country}
        </Text>
      </View>
    </View>
  );
};

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[s.getDay()]} ${s.getDate()} ${months[s.getMonth()]} ${s.getFullYear()} - ${days[e.getDay()]} ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  directions: {
    fontSize: 13,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginLeft: 8,
  },
});
