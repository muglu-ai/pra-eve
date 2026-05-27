import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
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

export const NetworkingScreen: React.FC = () => {
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

      {event.features.enableMyMeetings && <MeetingsButton />}

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
                onPress={() => Alert.alert(person.name, `${person.designation || ''}\n${person.organization || ''}`)}
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
          <Text style={[styles.walletText, { color: theme.textSecondary }]}>
            My Wallet feature coming soon!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  flex: {
    flex: 1,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
  walletContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletText: {
    fontSize: 15,
  },
});
