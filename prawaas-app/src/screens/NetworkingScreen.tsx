import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useEvent } from '../hooks/useConfig';
import { TabSelector } from '../components/common/TabSelector';
import { SearchBar } from '../components/common/SearchBar';
import { FilterChips } from '../components/common/FilterChips';
import { PersonCard } from '../components/networking/PersonCard';
import { MeetingsButton } from '../components/networking/MeetingsButton';
import { people, networkingFilters } from '../data/mockData';

const networkingTabs = [
  { key: 'people', label: 'People' },
  { key: 'wallet', label: 'My Wallet' },
];

interface Props {
  navigation?: any;
}

export const NetworkingScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const event = useEvent();
  const [activeTab, setActiveTab] = useState('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPeople = useMemo(() => {
    let result = people;

    if (activeFilter !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.organization && p.organization.toLowerCase().includes(query))
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Networking</Text>

      {event.features.enableMyMeetings && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: theme.primary }]}
            onPress={() => navigation?.navigate?.('MyMeetings')}
          >
            <Ionicons name="link-outline" size={18} color={theme.primary} />
            <Text style={[styles.actionBtnText, { color: theme.primary }]}>My Meetings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: theme.secondary }]}
            onPress={() => navigation?.navigate?.('NetworkingSessions')}
          >
            <Ionicons name="people-outline" size={18} color={theme.secondary} />
            <Text style={[styles.actionBtnText, { color: theme.secondary }]}>Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, { borderColor: theme.accent }]}
            onPress={() => navigation?.navigate?.('Conversations')}
          >
            <Ionicons name="chatbubble-outline" size={18} color={theme.accent} />
            <Text style={[styles.actionBtnText, { color: theme.accent }]}>Chat</Text>
          </TouchableOpacity>
        </View>
      )}

      <TabSelector tabs={networkingTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'people' ? (
        <View style={styles.flex}>
          <SearchBar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FilterChips
            filters={networkingFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredPeople.map((person) => (
              <PersonCard
                key={person.id}
                person={person}
                onPress={() => {
                  Alert.alert(
                    person.name,
                    `${person.designation || ''}\n${person.organization || ''}`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Request Meeting',
                        onPress: () => navigation?.navigate?.('RequestMeeting', { person }),
                      },
                      {
                        text: 'Send Message',
                        onPress: () => navigation?.navigate?.('ChatScreen', {
                          recipientId: person.id,
                          recipientName: person.name,
                        }),
                      },
                    ],
                  );
                }}
              />
            ))}
            {filteredPeople.length === 0 && (
              <View style={styles.empty}>
                <Text style={[styles.emptyText, { color: theme.textLight }]}>
                  No people found matching your criteria.
                </Text>
              </View>
            )}
            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      ) : (
        <View style={styles.walletContainer}>
          <Ionicons name="wallet-outline" size={48} color={theme.textLight} />
          <Text style={[styles.walletText, { color: theme.textSecondary }]}>
            My Wallet feature coming soon!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22, fontWeight: '700',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginVertical: 10,
  },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderRadius: 10, paddingVertical: 10, gap: 6,
  },
  actionBtnText: { fontSize: 12, fontWeight: '600' },
  flex: { flex: 1 },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 14 },
  walletContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  walletText: { fontSize: 15 },
});
