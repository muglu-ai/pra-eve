import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useConfig';
import { TabSelector } from '../components/common/TabSelector';
import { AgendaCard } from '../components/agenda/AgendaCard';
import { SessionCard } from '../components/agenda/SessionCard';
import { FilterChips } from '../components/common/FilterChips';
import { agendaDays } from '../data/mockData';

const agendaTabs = [
  { key: 'agenda', label: 'Agenda' },
  { key: 'sessions', label: 'Sessions' },
];

export const AgendaScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('agenda');
  const [activeDay, setActiveDay] = useState('day1');

  const dayFilters = agendaDays.map((d) => ({
    key: d.id,
    label: d.date,
  }));

  const selectedDay = agendaDays.find((d) => d.id === activeDay);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Agenda</Text>
      <TabSelector tabs={agendaTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'agenda' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {agendaDays.map((day) => (
              <AgendaCard key={day.id} day={day} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.flex}>
          <FilterChips
            filters={dayFilters}
            activeFilter={activeDay}
            onFilterChange={setActiveDay}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.sessions}>
              {selectedDay?.sessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </View>
          </ScrollView>
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
    paddingBottom: 8,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 80,
  },
  sessions: {
    paddingTop: 8,
    paddingBottom: 80,
  },
});
