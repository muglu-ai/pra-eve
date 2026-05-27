import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { Conversation } from '../../types/chat';

interface Props {
  conversation: Conversation;
  currentUserId: string;
  onPress: (conversation: Conversation) => void;
}

export const ConversationItem: React.FC<Props> = ({ conversation, currentUserId, onPress }) => {
  const theme = useTheme();
  const otherParticipant = conversation.participants.find((p) => p.id !== currentUserId)
    || conversation.participants[0];

  const timeStr = conversation.lastMessage
    ? formatTime(conversation.lastMessage.timestamp)
    : '';

  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: theme.border }]}
      onPress={() => onPress(conversation)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Avatar name={otherParticipant.name} size={48} />
        {otherParticipant.isOnline && (
          <View style={[styles.onlineDot, { backgroundColor: '#10B981', borderColor: theme.surface }]} />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
            {otherParticipant.name}
          </Text>
          <Text style={[styles.time, { color: theme.textLight }]}>{timeStr}</Text>
        </View>
        {conversation.lastMessage && (
          <View style={styles.messageRow}>
            <Text
              style={[
                styles.message,
                {
                  color: conversation.unreadCount > 0 ? theme.text : theme.textSecondary,
                  fontWeight: conversation.unreadCount > 0 ? '600' : '400',
                },
              ]}
              numberOfLines={1}
            >
              {conversation.lastMessage.type === 'meeting_invite'
                ? '📅 Meeting invite'
                : conversation.lastMessage.senderId === currentUserId
                  ? `You: ${conversation.lastMessage.text}`
                  : conversation.lastMessage.text}
            </Text>
            {conversation.unreadCount > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: theme.primary }]}>
                <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

function formatTime(timestamp: string): string {
  const d = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()];
  }
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1,
  },
  avatarContainer: { position: 'relative' },
  onlineDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 12, height: 12, borderRadius: 6, borderWidth: 2,
  },
  content: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 15, fontWeight: '700', flex: 1, marginRight: 8 },
  time: { fontSize: 11 },
  messageRow: { flexDirection: 'row', alignItems: 'center' },
  message: { flex: 1, fontSize: 13, marginRight: 8 },
  unreadBadge: {
    minWidth: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5,
  },
  unreadText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
});
