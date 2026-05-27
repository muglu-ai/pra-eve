import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { useAuth } from '../../auth/AuthContext';
import { TabSelector } from '../../components/common/TabSelector';
import { MeetingRequestCard } from '../../components/meetings/MeetingRequestCard';
import { meetingRequests } from '../../data/meetingsData';

const tabs = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'pending', label: 'Pending' },
  { key: 'past', label: 'Past' },
];

interface Props {
  navigation: any;
}

export const MyMeetingsScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');

  const currentUserId = user?.id || 'u1';

  const filtered = meetingRequests.filter((m) => {
    const isMyMeeting = m.fromUserId === currentUserId || m.toUserId === currentUserId;
    if (!isMyMeeting) return false;

    switch (activeTab) {
      case 'upcoming':
        return m.status === 'accepted';
      case 'pending':
        return m.status === 'pending';
      case 'past':
        return m.status === 'completed' || m.status === 'declined' || m.status === 'cancelled';
      default:
        return true;
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: theme.text }]}>My Meetings</Text>
      </View>

      <TabSelector tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filtered.map((meeting) => (
            <MeetingRequestCard
              key={meeting.id}
              meeting={meeting}
              currentUserId={currentUserId}
              onAccept={(m) => Alert.alert('Accepted', `Meeting with ${m.fromUser.name} accepted!`)}
              onDecline={(m) => Alert.alert('Declined', `Meeting with ${m.fromUser.name} declined.`)}
              onChat={(m) => {
                navigation.navigate('ChatScreen', {
                  recipientId: m.fromUserId === currentUserId ? m.toUserId : m.fromUserId,
                  recipientName: m.fromUserId === currentUserId ? m.toUser.name : m.fromUser.name,
                });
              }}
            />
          ))}
          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                No {activeTab} meetings.
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
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  title: { fontSize: 22, fontWeight: '700' },
  content: { paddingTop: 14, paddingBottom: 80 },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 14 },
});
