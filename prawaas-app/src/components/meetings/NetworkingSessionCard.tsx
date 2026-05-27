import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { NetworkingSession } from '../../types/meetings';

interface Props {
  session: NetworkingSession;
  onBook: (session: NetworkingSession) => void;
}

export const NetworkingSessionCard: React.FC<Props> = ({ session, onBook }) => {
  const theme = useTheme();
  const seatsLeft = session.totalSeats - session.bookedSeats;
  const isFull = seatsLeft <= 0;
  const fillPercent = Math.round((session.bookedSeats / session.totalSeats) * 100);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {session.title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: isFull ? theme.error + '18' : theme.success + '18' }]}>
          <Text style={[styles.statusText, { color: isFull ? theme.error : theme.success }]}>
            {isFull ? 'FULL' : `${seatsLeft} seats left`}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, { color: theme.textSecondary }]} numberOfLines={2}>
        {session.description}
      </Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={theme.textLight} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {formatDate(session.date)}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={theme.textLight} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {session.startTime} - {session.endTime}
          </Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={theme.textLight} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {session.venue}
          </Text>
        </View>
      </View>

      <View style={styles.hostRow}>
        <Avatar name={session.host.name} size={28} />
        <Text style={[styles.hostName, { color: theme.text }]}>
          {session.host.name}
        </Text>
        <Text style={[styles.hostOrg, { color: theme.textLight }]}>
          {session.host.organization}
        </Text>
      </View>

      <View style={styles.progressSection}>
        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${fillPercent}%` as any,
                backgroundColor: isFull ? theme.error : fillPercent > 75 ? theme.warning : theme.success,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: theme.textLight }]}>
          {session.bookedSeats}/{session.totalSeats} booked
        </Text>
      </View>

      <View style={styles.tagsRow}>
        {session.tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: theme.primary + '10' }]}>
            <Text style={[styles.tagText, { color: theme.primary }]}>{tag}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          { backgroundColor: isFull ? theme.border : theme.primary },
        ]}
        onPress={() => onBook(session)}
        disabled={isFull}
        activeOpacity={0.8}
      >
        <Ionicons name={isFull ? 'hourglass-outline' : 'bookmark-outline'} size={18} color={isFull ? theme.textLight : '#FFF'} />
        <Text style={[styles.bookText, { color: isFull ? theme.textLight : '#FFFFFF' }]}>
          {isFull ? 'Join Waitlist' : 'Book Seat'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16, marginBottom: 14, borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  titleRow: { flex: 1, marginRight: 10 },
  title: { fontSize: 16, fontWeight: '700', lineHeight: 22 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: '700' },
  description: { fontSize: 13, lineHeight: 19, marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 16, marginBottom: 6 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12 },
  hostRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10, marginBottom: 10 },
  hostName: { fontSize: 13, fontWeight: '600' },
  hostOrg: { fontSize: 12 },
  progressSection: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  progressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 11 },
  tagsRow: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: '600' },
  bookButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 10, gap: 6,
  },
  bookText: { fontSize: 14, fontWeight: '700' },
});
