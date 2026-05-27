import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { ChatMessage } from '../../types/chat';

interface Props {
  message: ChatMessage;
  isOwn: boolean;
}

export const ChatBubble: React.FC<Props> = ({ message, isOwn }) => {
  const theme = useTheme();

  if (message.type === 'meeting_invite' && message.meetingInvite) {
    const invite = message.meetingInvite;
    const statusColor = invite.status === 'accepted' ? '#10B981'
      : invite.status === 'declined' ? '#EF4444' : '#F59E0B';

    return (
      <View style={[styles.bubbleRow, isOwn && styles.ownRow]}>
        <View style={[styles.meetingBubble, { backgroundColor: theme.primary + '10', borderColor: theme.primary + '30' }]}>
          <View style={styles.meetingHeader}>
            <Ionicons name="calendar" size={18} color={theme.primary} />
            <Text style={[styles.meetingTitle, { color: theme.primary }]}>Meeting Invite</Text>
          </View>
          <Text style={[styles.meetingTopic, { color: theme.text }]}>{invite.topic}</Text>
          <View style={styles.meetingDetails}>
            <Text style={[styles.meetingDetail, { color: theme.textSecondary }]}>
              📅 {invite.date}  ⏰ {invite.time}
            </Text>
          </View>
          <View style={[styles.meetingStatus, { backgroundColor: statusColor + '18' }]}>
            <Text style={[styles.meetingStatusText, { color: statusColor }]}>
              {invite.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.bubbleRow, isOwn && styles.ownRow]}>
      <View
        style={[
          styles.bubble,
          isOwn
            ? { backgroundColor: theme.primary, borderBottomRightRadius: 4 }
            : { backgroundColor: theme.surface, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.text, { color: isOwn ? '#FFFFFF' : theme.text }]}>
          {message.text}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.time, { color: isOwn ? 'rgba(255,255,255,0.7)' : theme.textLight }]}>
            {formatTime(message.timestamp)}
          </Text>
          {isOwn && (
            <Ionicons
              name={message.status === 'read' ? 'checkmark-done' : message.status === 'delivered' ? 'checkmark-done' : 'checkmark'}
              size={14}
              color={message.status === 'read' ? '#60A5FA' : 'rgba(255,255,255,0.6)'}
              style={styles.checkIcon}
            />
          )}
        </View>
      </View>
    </View>
  );
};

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

const styles = StyleSheet.create({
  bubbleRow: { flexDirection: 'row', marginBottom: 6, paddingHorizontal: 16 },
  ownRow: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '78%', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10,
  },
  text: { fontSize: 14, lineHeight: 20 },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 4 },
  time: { fontSize: 10 },
  checkIcon: { marginLeft: 4 },
  meetingBubble: {
    maxWidth: '85%', borderRadius: 14, padding: 14, borderWidth: 1,
  },
  meetingHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  meetingTitle: { fontSize: 13, fontWeight: '700' },
  meetingTopic: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  meetingDetails: { marginBottom: 8 },
  meetingDetail: { fontSize: 12 },
  meetingStatus: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  meetingStatusText: { fontSize: 11, fontWeight: '700' },
});
