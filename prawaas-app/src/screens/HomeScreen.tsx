import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useEvent } from '../hooks/useConfig';
import { useAuth } from '../auth/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { quickActions } from '../data/mockData';
import { eventStats, liveUpdates, transportInfo } from '../data/transportData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const theme = useTheme();
  const event = useEvent();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.headerBar, { backgroundColor: theme.surface }]}>
          <View style={styles.headerLeft}>
            <Avatar name={user?.name || 'Guest'} size={40} />
            <View style={styles.headerInfo}>
              <Text style={[styles.greetingSmall, { color: theme.textSecondary }]}>Welcome back</Text>
              <Text style={[styles.userName, { color: theme.text }]}>
                {user?.name || 'Guest'} 👋
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.background }]} accessibilityLabel="Notifications">
              <Ionicons name="notifications-outline" size={20} color={theme.text} />
              <View style={[styles.notifDot, { backgroundColor: theme.error }]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.background }]} onPress={handleLogout} accessibilityLabel="Sign out">
              <Ionicons name="log-out-outline" size={20} color={theme.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={[styles.heroBanner, { backgroundColor: theme.primary }]}>
          <View style={styles.heroPattern}>
            <Text style={styles.heroEmoji}>🚌</Text>
            <Text style={styles.heroEmoji2}>🚇</Text>
          </View>
          <Text style={styles.heroTitle}>{event.name}</Text>
          <View style={styles.heroAccent} />
          <Text style={styles.heroTagline}>{event.tagline}</Text>
          <View style={styles.heroChips}>
            <View style={styles.heroChip}>
              <Ionicons name="calendar" size={13} color="#FFF" />
              <Text style={styles.heroChipText}>{formatDateRange(event.startDate, event.endDate)}</Text>
            </View>
            <View style={styles.heroChip}>
              <Ionicons name="location" size={13} color="#FFF" />
              <Text style={styles.heroChipText}>{event.venue.city}, {event.venue.state}</Text>
            </View>
          </View>
          <View style={styles.heroCountdown}>
            <CountdownItem value="42" label="Days" theme={theme} />
            <CountdownItem value="08" label="Hrs" theme={theme} />
            <CountdownItem value="15" label="Min" theme={theme} />
          </View>
        </View>

        {/* Quick Actions Bento Grid */}
        <View style={styles.section}>
          <View style={styles.bentoGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.bentoCard,
                  {
                    backgroundColor: action.variant === 'filled' ? theme.primary : theme.surface,
                    borderColor: action.variant === 'filled' ? theme.primary : theme.border,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => Alert.alert(action.label, `${action.label} feature coming soon!`)}
                accessibilityRole="button"
                accessibilityLabel={action.label}
              >
                <View style={[styles.bentoIcon, { backgroundColor: action.variant === 'filled' ? 'rgba(255,255,255,0.15)' : theme.primary + '10' }]}>
                  <Ionicons name={action.icon as any} size={22} color={action.variant === 'filled' ? '#FFF' : theme.primary} />
                </View>
                <Text style={[styles.bentoLabel, { color: action.variant === 'filled' ? '#FFF' : theme.text }]}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Event Stats — Transport Sector Impact */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Event at a Glance</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
            {eventStats.map((stat, idx) => (
              <View key={idx} style={[styles.statCard, { backgroundColor: theme.surface }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '14' }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{stat.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Live Updates Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Live Updates</Text>
            <View style={[styles.liveDot, { backgroundColor: theme.success }]} />
          </View>
          {liveUpdates.slice(0, 3).map((update) => (
            <View key={update.id} style={[styles.updateCard, { backgroundColor: theme.surface, borderLeftColor: getPriorityColor(update.priority, theme) }]}>
              <View style={[styles.updateIcon, { backgroundColor: getPriorityColor(update.priority, theme) + '14' }]}>
                <Ionicons name={update.icon as any} size={18} color={getPriorityColor(update.priority, theme)} />
              </View>
              <View style={styles.updateContent}>
                <Text style={[styles.updateTitle, { color: theme.text }]}>{update.title}</Text>
                <Text style={[styles.updateMessage, { color: theme.textSecondary }]} numberOfLines={2}>{update.message}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Transport to Venue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Getting Here</Text>
          <Text style={[styles.sectionSub, { color: theme.textSecondary }]}>Transport options to {event.venue.name}</Text>
          {transportInfo.map((info) => (
            <View key={info.id} style={[styles.transportCard, { backgroundColor: theme.surface }]}>
              <View style={[styles.transportIcon, { backgroundColor: getTransportColor(info.type) + '14' }]}>
                <Ionicons name={getTransportIcon(info.type) as any} size={20} color={getTransportColor(info.type)} />
              </View>
              <View style={styles.transportInfo}>
                <View style={styles.transportNameRow}>
                  <Text style={[styles.transportName, { color: theme.text }]}>{info.name}</Text>
                  <View style={[styles.statusPill, { backgroundColor: info.status === 'running' ? theme.success + '18' : theme.warning + '18' }]}>
                    <View style={[styles.statusDot, { backgroundColor: info.status === 'running' ? theme.success : theme.warning }]} />
                    <Text style={[styles.statusText, { color: info.status === 'running' ? theme.success : theme.warning }]}>
                      {info.status === 'running' ? 'Active' : 'Delayed'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.transportDesc, { color: theme.textSecondary }]}>{info.description}</Text>
                {info.schedule && (
                  <Text style={[styles.transportSchedule, { color: theme.textLight }]}>{info.schedule}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Venue Info Card */}
        <View style={styles.section}>
          <View style={[styles.venueCard, { backgroundColor: theme.primary }]}>
            <View style={styles.venueRow}>
              <View style={styles.venueInfo}>
                <Text style={styles.venueLabel}>VENUE</Text>
                <Text style={styles.venueName}>{event.venue.name}</Text>
                <Text style={styles.venueAddress}>{event.venue.address}, {event.venue.city}, {event.venue.state} {event.venue.pincode}</Text>
              </View>
              <TouchableOpacity style={styles.mapButton} accessibilityLabel="View directions">
                <Ionicons name="navigate" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <View style={[styles.contactCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.contactOrg, { color: theme.text }]}>Event Secretariat</Text>
            <Text style={[styles.contactName, { color: theme.textSecondary }]}>{event.contactInfo.organization}</Text>
            <Text style={[styles.contactDetail, { color: theme.textLight }]}>{event.contactInfo.phone}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const CountdownItem: React.FC<{ value: string; label: string; theme: any }> = ({ value, label }) => (
  <View style={styles.countdownItem}>
    <Text style={styles.countdownValue}>{value}</Text>
    <Text style={styles.countdownLabel}>{label}</Text>
  </View>
);

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${s.getDate()}-${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
}

function getPriorityColor(priority: string, theme: any): string {
  switch (priority) {
    case 'urgent': return theme.error;
    case 'high': return theme.accent;
    case 'medium': return theme.secondary;
    default: return theme.textSecondary;
  }
}

function getTransportIcon(type: string): string {
  switch (type) {
    case 'shuttle': return 'bus-outline';
    case 'metro': return 'train-outline';
    case 'bus': return 'bus-outline';
    case 'taxi': return 'car-outline';
    case 'parking': return 'car-sport-outline';
    default: return 'navigate-outline';
  }
}

function getTransportColor(type: string): string {
  switch (type) {
    case 'shuttle': return '#2563EB';
    case 'metro': return '#7C3AED';
    case 'bus': return '#059669';
    case 'taxi': return '#D97706';
    case 'parking': return '#0D9488';
    default: return '#64748B';
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerInfo: { marginLeft: 10 },
  greetingSmall: { fontSize: 11, fontWeight: '500' },
  userName: { fontSize: 16, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', position: 'relative',
  },
  notifDot: {
    position: 'absolute', top: 6, right: 6,
    width: 7, height: 7, borderRadius: 3.5,
  },

  heroBanner: {
    marginHorizontal: 16, borderRadius: 20, padding: 24, overflow: 'hidden', position: 'relative',
  },
  heroPattern: { position: 'absolute', right: 10, top: 10, flexDirection: 'row', opacity: 0.12 },
  heroEmoji: { fontSize: 60 },
  heroEmoji2: { fontSize: 50, marginTop: 20 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: '#FFF', letterSpacing: 0.5 },
  heroAccent: { width: 36, height: 3.5, backgroundColor: '#F97316', borderRadius: 2, marginVertical: 10 },
  heroTagline: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 19, marginBottom: 16 },
  heroChips: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  heroChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  heroChipText: { color: '#FFF', fontSize: 12, fontWeight: '500' },
  heroCountdown: { flexDirection: 'row', gap: 10 },
  countdownItem: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center', minWidth: 56,
  },
  countdownValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  countdownLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: '600', marginTop: 2 },

  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSub: { fontSize: 12, marginTop: 2, marginBottom: 10 },
  liveDot: { width: 8, height: 8, borderRadius: 4 },

  bentoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bentoCard: {
    width: (SCREEN_WIDTH - 42) / 2, borderRadius: 14, padding: 16,
    borderWidth: 1, alignItems: 'flex-start',
  },
  bentoIcon: {
    width: 42, height: 42, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  bentoLabel: { fontSize: 14, fontWeight: '600' },

  statsScroll: { gap: 10, paddingVertical: 10 },
  statCard: {
    width: 120, borderRadius: 14, padding: 14, alignItems: 'center',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
  },
  statIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 11, textAlign: 'center', marginTop: 2, lineHeight: 15 },

  updateCard: {
    flexDirection: 'row', alignItems: 'flex-start', padding: 14,
    borderRadius: 12, marginBottom: 8, borderLeftWidth: 3,
  },
  updateIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  updateContent: { flex: 1 },
  updateTitle: { fontSize: 14, fontWeight: '600', marginBottom: 3 },
  updateMessage: { fontSize: 12, lineHeight: 18 },

  transportCard: {
    flexDirection: 'row', alignItems: 'flex-start', padding: 14,
    borderRadius: 12, marginBottom: 8,
  },
  transportIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  transportInfo: { flex: 1 },
  transportNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  transportName: { fontSize: 14, fontWeight: '600' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 10, fontWeight: '700' },
  transportDesc: { fontSize: 12, marginBottom: 2 },
  transportSchedule: { fontSize: 11 },

  venueCard: { borderRadius: 16, padding: 20 },
  venueRow: { flexDirection: 'row', alignItems: 'center' },
  venueInfo: { flex: 1 },
  venueLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  venueName: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  venueAddress: { color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 18 },
  mapButton: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center', marginLeft: 12,
  },

  contactCard: { borderRadius: 12, padding: 16, borderWidth: 1, alignItems: 'center' },
  contactOrg: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  contactName: { fontSize: 12, marginBottom: 2 },
  contactDetail: { fontSize: 12 },
});
