import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { FilterChips } from '../../components/common/FilterChips';
import { NetworkingSessionCard } from '../../components/meetings/NetworkingSessionCard';
import { networkingSessions } from '../../data/meetingsData';

const dayFilters = [
  { key: 'all', label: 'All Days' },
  { key: '2026-07-09', label: '9 July' },
  { key: '2026-07-10', label: '10 July' },
  { key: '2026-07-11', label: '11 July' },
];

export const NetworkingSessionsScreen: React.FC = () => {
  const theme = useTheme();
  const [activeDay, setActiveDay] = useState('all');

  const filtered = activeDay === 'all'
    ? networkingSessions
    : networkingSessions.filter((s) => s.date === activeDay);

  const handleBook = (session: typeof networkingSessions[0]) => {
    const seatsLeft = session.totalSeats - session.bookedSeats;
    if (seatsLeft <= 0) {
      Alert.alert(
        'Session Full',
        `"${session.title}" is fully booked. Would you like to join the waitlist?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Join Waitlist', onPress: () => Alert.alert('Added!', 'You\'ve been added to the waitlist.') },
        ],
      );
    } else {
      Alert.alert(
        'Confirm Booking',
        `Book a seat for "${session.title}"?\n\n📅 ${session.date}\n⏰ ${session.startTime} - ${session.endTime}\n📍 ${session.venue}\n\n${seatsLeft} seats remaining.`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Book Now', onPress: () => Alert.alert('Booked!', 'Your seat has been confirmed. Check My Meetings for details.') },
        ],
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Networking Sessions</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Dedicated sessions with limited seats. Book early!
      </Text>

      <FilterChips filters={dayFilters} activeFilter={activeDay} onFilterChange={setActiveDay} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filtered.map((session) => (
            <NetworkingSessionCard key={session.id} session={session} onBook={handleBook} />
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                No sessions on this day.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12 },
  subtitle: { fontSize: 13, paddingHorizontal: 16, marginBottom: 4, marginTop: 2 },
  content: { paddingTop: 10, paddingBottom: 80 },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 14 },
});
