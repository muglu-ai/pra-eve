import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useConfig';
import { TabSelector } from '../components/common/TabSelector';
import { FilterChips } from '../components/common/FilterChips';
import { agendaDays } from '../data/mockData';
import { Session } from '../types';

const agendaTabs = [
  { key: 'agenda', label: 'Agenda' },
  { key: 'sessions', label: 'Sessions' },
];

const typeColors: Record<string, { bg: string; fg: string; icon: string }> = {
  plenary: { bg: '#7C3AED18', fg: '#7C3AED', icon: 'megaphone' },
  parallel: { bg: '#2563EB18', fg: '#2563EB', icon: 'git-branch' },
  break: { bg: '#D9770618', fg: '#D97706', icon: 'cafe' },
  ceremony: { bg: '#DC262618', fg: '#DC2626', icon: 'ribbon' },
  networking: { bg: '#05966918', fg: '#059669', icon: 'people' },
};

export const AgendaScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('agenda');
  const [activeDay, setActiveDay] = useState('day1');
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  const dayFilters = agendaDays.map((d) => ({ key: d.id, label: d.date }));
  const selectedDay = agendaDays.find((d) => d.id === activeDay);

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.screenTitle, { color: theme.text }]}>Agenda</Text>
      <TabSelector tabs={agendaTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'agenda' ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {agendaDays.map((day, dayIdx) => (
              <View key={day.id} style={styles.daySection}>
                <View style={styles.dayHeader}>
                  <View style={[styles.dayBadge, { backgroundColor: theme.primary }]}>
                    <Text style={styles.dayBadgeText}>DAY {dayIdx + 1}</Text>
                  </View>
                  <View style={styles.dayInfo}>
                    <Text style={[styles.dayDate, { color: theme.text }]}>{day.date}</Text>
                    <Text style={[styles.dayTitle, { color: theme.textSecondary }]}>{day.title}</Text>
                  </View>
                </View>
                <Text style={[styles.dayDesc, { color: theme.textSecondary }]} numberOfLines={3}>
                  {day.description}
                </Text>
                <View style={styles.sessionPreview}>
                  {day.sessions.slice(0, 3).map((s) => {
                    const tc = typeColors[s.type || 'plenary'];
                    return (
                      <View key={s.id} style={[styles.miniSession, { backgroundColor: tc.bg }]}>
                        <Ionicons name={tc.icon as any} size={12} color={tc.fg} />
                        <Text style={[styles.miniSessionText, { color: tc.fg }]} numberOfLines={1}>
                          {s.title}
                        </Text>
                      </View>
                    );
                  })}
                  {day.sessions.length > 3 && (
                    <Text style={[styles.moreText, { color: theme.secondary }]}>
                      +{day.sessions.length - 3} more sessions
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.flex}>
          <FilterChips filters={dayFilters} activeFilter={activeDay} onFilterChange={setActiveDay} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.timeline}>
              {selectedDay?.sessions.map((session, idx) => (
                <TimelineSession
                  key={session.id}
                  session={session}
                  isLast={idx === (selectedDay?.sessions.length || 0) - 1}
                  isBookmarked={bookmarked.has(session.id)}
                  onToggleBookmark={() => toggleBookmark(session.id)}
                  theme={theme}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const TimelineSession: React.FC<{
  session: Session; isLast: boolean; isBookmarked: boolean;
  onToggleBookmark: () => void; theme: any;
}> = ({ session, isLast, isBookmarked, onToggleBookmark, theme }) => {
  const tc = typeColors[session.type || 'plenary'];

  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLeft}>
        <Text style={[styles.timeText, { color: theme.textSecondary }]}>{session.time.split(' - ')[0]}</Text>
        <View style={[styles.timelineDot, { backgroundColor: tc.fg }]} />
        {!isLast && <View style={[styles.timelineLine, { backgroundColor: theme.border }]} />}
      </View>
      <View style={[styles.sessionCard, { backgroundColor: theme.surface }]}>
        <View style={styles.sessionTop}>
          <View style={[styles.typePill, { backgroundColor: tc.bg }]}>
            <Ionicons name={tc.icon as any} size={12} color={tc.fg} />
            <Text style={[styles.typeLabel, { color: tc.fg }]}>
              {(session.type || 'session').charAt(0).toUpperCase() + (session.type || 'session').slice(1)}
            </Text>
          </View>
          <TouchableOpacity onPress={onToggleBookmark} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}>
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={18} color={isBookmarked ? theme.accent : theme.textLight} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.sessionTitle, { color: theme.text }]}>{session.title}</Text>
        <View style={styles.sessionMeta}>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={12} color={theme.textLight} />
            <Text style={[styles.metaText, { color: theme.textLight }]}>{session.time}</Text>
          </View>
          {session.hall && (
            <View style={styles.metaChip}>
              <Ionicons name="location-outline" size={12} color={theme.textLight} />
              <Text style={[styles.metaText, { color: theme.textLight }]}>{session.hall}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { fontSize: 22, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  flex: { flex: 1 },
  content: { paddingTop: 16, paddingBottom: 80 },

  daySection: {
    marginHorizontal: 16, marginBottom: 16, backgroundColor: '#FFF',
    borderRadius: 16, padding: 18, elevation: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dayBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginRight: 12 },
  dayBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
  dayInfo: { flex: 1 },
  dayDate: { fontSize: 16, fontWeight: '700' },
  dayTitle: { fontSize: 12, marginTop: 1 },
  dayDesc: { fontSize: 13, lineHeight: 19, marginBottom: 12 },
  sessionPreview: { gap: 6 },
  miniSession: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8,
  },
  miniSessionText: { fontSize: 12, fontWeight: '500', flex: 1 },
  moreText: { fontSize: 12, fontWeight: '600', marginTop: 4 },

  timeline: { paddingTop: 8, paddingBottom: 80 },
  timelineRow: { flexDirection: 'row', paddingHorizontal: 16 },
  timelineLeft: { width: 60, alignItems: 'center', paddingTop: 6 },
  timeText: { fontSize: 11, fontWeight: '600', marginBottom: 6 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, zIndex: 1 },
  timelineLine: { width: 2, flex: 1, marginTop: -1 },
  sessionCard: {
    flex: 1, borderRadius: 14, padding: 14, marginBottom: 10, marginLeft: 10,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3,
  },
  sessionTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  typePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  typeLabel: { fontSize: 10, fontWeight: '700' },
  sessionTitle: { fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: 8 },
  sessionMeta: { flexDirection: 'row', gap: 12 },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11 },
});
