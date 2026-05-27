import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme, useEvent } from '../../hooks/useConfig';

const { width } = Dimensions.get('window');

export const EventBanner: React.FC = () => {
  const theme = useTheme();
  const event = useEvent();

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View style={styles.overlay}>
        <Text style={styles.eventName}>{event.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>{event.tagline}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>
              {formatDateRange(event.startDate, event.endDate)}
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>
              {event.venue.city}, {event.venue.state}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${s.getDate()} - ${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 160,
  },
  overlay: {
    padding: 20,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#FF6B35',
    borderRadius: 2,
    marginVertical: 10,
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 14,
    lineHeight: 18,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  infoIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});
