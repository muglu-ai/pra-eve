import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { useAuth } from '../../auth/AuthContext';
import { ConversationItem } from '../../components/chat/ConversationItem';
import { conversations } from '../../data/meetingsData';

interface Props {
  navigation: any;
}

export const ConversationsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const currentUserId = user?.id || 'u1';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Messages</Text>
        <TouchableOpacity style={[styles.composeBtn, { backgroundColor: theme.primary }]}>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            currentUserId={currentUserId}
            onPress={(c) => {
              const other = c.participants.find((p) => p.id !== currentUserId) || c.participants[0];
              navigation.navigate('ChatScreen', {
                conversationId: c.id,
                recipientId: other.id,
                recipientName: other.name,
              });
            }}
          />
        ))}
        {conversations.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="chatbubbles-outline" size={48} color={theme.textLight} />
            <Text style={[styles.emptyText, { color: theme.textLight }]}>
              No conversations yet.{'\n'}Start chatting with other attendees!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 10,
  },
  title: { fontSize: 22, fontWeight: '700' },
  composeBtn: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  empty: { padding: 60, alignItems: 'center', gap: 12 },
  emptyText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
