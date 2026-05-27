import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { MeetingRequest } from '../../types/meetings';

interface Props {
  meeting: MeetingRequest;
  currentUserId: string;
  onAccept?: (meeting: MeetingRequest) => void;
  onDecline?: (meeting: MeetingRequest) => void;
  onChat?: (meeting: MeetingRequest) => void;
}

const statusConfig: Record<string, { color: string; icon: string; label: string }> = {
  pending: { color: '#F59E0B', icon: 'hourglass-outline', label: 'Pending' },
  accepted: { color: '#10B981', icon: 'checkmark-circle-outline', label: 'Accepted' },
  declined: { color: '#EF4444', icon: 'close-circle-outline', label: 'Declined' },
  cancelled: { color: '#6B7280', icon: 'ban-outline', label: 'Cancelled' },
  completed: { color: '#6366F1', icon: 'flag-outline', label: 'Completed' },
};

export const MeetingRequestCard: React.FC<Props> = ({
  meeting, currentUserId, onAccept, onDecline, onChat,
}) => {
  const theme = useTheme();
  const isIncoming = meeting.toUserId === currentUserId;
  const otherUser = isIncoming ? meeting.fromUser : meeting.toUser;
  const config = statusConfig[meeting.status];

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.topRow}>
        <Avatar name={otherUser.name} size={44} />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.text }]}>{otherUser.name}</Text>
          <Badge label={otherUser.category} />
          {otherUser.designation && (
            <Text style={[styles.userDetail, { color: theme.textLight }]}>
              {otherUser.designation} · {otherUser.organization}
            </Text>
          )}
        </View>
        <View style={[styles.directionBadge, { backgroundColor: isIncoming ? '#3B82F618' : '#6366F118' }]}>
          <Ionicons
            name={isIncoming ? 'arrow-down' : 'arrow-up'}
            size={12}
            color={isIncoming ? '#3B82F6' : '#6366F1'}
          />
          <Text style={[styles.directionText, { color: isIncoming ? '#3B82F6' : '#6366F1' }]}>
            {isIncoming ? 'Incoming' : 'Sent'}
          </Text>
        </View>
      </View>

      <Text style={[styles.topic, { color: theme.text }]}>{meeting.topic}</Text>
      {meeting.message && (
        <Text style={[styles.message, { color: theme.textSecondary }]} numberOfLines={2}>
          {meeting.message}
        </Text>
      )}

      <View style={styles.detailsRow}>
        <View style={styles.detail}>
          <Ionicons name="calendar-outline" size={14} color={theme.textLight} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {formatDate(meeting.proposedDate)}
          </Text>
        </View>
        <View style={styles.detail}>
          <Ionicons name="time-outline" size={14} color={theme.textLight} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {meeting.proposedTime} ({meeting.duration}min)
          </Text>
        </View>
      </View>

      <View style={[styles.statusRow, { borderTopColor: theme.border }]}>
        <View style={[styles.statusBadge, { backgroundColor: config.color + '18' }]}>
          <Ionicons name={config.icon as any} size={14} color={config.color} />
          <Text style={[styles.statusLabel, { color: config.color }]}>{config.label}</Text>
        </View>

        <View style={styles.actions}>
          {meeting.status === 'pending' && isIncoming && (
            <>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: theme.success }]}
                onPress={() => onAccept?.(meeting)}
              >
                <Ionicons name="checkmark" size={16} color="#FFF" />
                <Text style={styles.actionText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: theme.error }]}
                onPress={() => onDecline?.(meeting)}
              >
                <Ionicons name="close" size={16} color="#FFF" />
                <Text style={styles.actionText}>Decline</Text>
              </TouchableOpacity>
            </>
          )}
          {(meeting.status === 'accepted' || meeting.status === 'pending') && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.secondary }]}
              onPress={() => onChat?.(meeting)}
            >
              <Ionicons name="chatbubble-outline" size={14} color="#FFF" />
              <Text style={styles.actionText}>Chat</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16, marginBottom: 12, borderRadius: 14, padding: 16,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  userInfo: { flex: 1, marginLeft: 12, gap: 2 },
  userName: { fontSize: 15, fontWeight: '700' },
  userDetail: { fontSize: 11, marginTop: 2 },
  directionBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
  },
  directionText: { fontSize: 10, fontWeight: '700' },
  topic: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  message: { fontSize: 12, lineHeight: 18, marginBottom: 10 },
  detailsRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  detail: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: 12 },
  statusRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderTopWidth: 1, paddingTop: 12,
  },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  statusLabel: { fontSize: 12, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8,
  },
  actionText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
});
