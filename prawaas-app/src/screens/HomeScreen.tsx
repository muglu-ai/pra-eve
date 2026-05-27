import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useEvent } from '../hooks/useConfig';
import { useAuth } from '../auth/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { quickActions } from '../data/mockData';
import { eventStats, liveUpdates, transportInfo, impactMetrics, aiRecommendations, evShowcase, sponsorTiers } from '../data/transportData';

const { width: SW } = Dimensions.get('window');

export const HomeScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const theme = useTheme();
  const event = useEvent();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header Bar ── */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <View style={styles.headerLeft}>
            <Avatar name={user?.name || 'Guest'} size={40} />
            <View style={styles.headerText}>
              <Text style={[styles.hGreet, { color: theme.textSecondary }]}>Welcome back</Text>
              <Text style={[styles.hName, { color: theme.text }]}>{user?.name || 'Guest'} 👋</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.hBtn, { backgroundColor: theme.background }]} accessibilityLabel="Notifications">
              <Ionicons name="notifications-outline" size={20} color={theme.text} />
              <View style={[styles.hDot, { backgroundColor: theme.error }]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.hBtn, { backgroundColor: theme.background }]}
              accessibilityLabel="Sign out"
              onPress={() => Alert.alert('Sign Out', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
              ])}
            >
              <Ionicons name="log-out-outline" size={20} color={theme.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Hero Banner ── */}
        <View style={[styles.hero, { backgroundColor: theme.primary }]}>
          <View style={styles.heroDecor}><Text style={styles.heroE1}>🚌</Text><Text style={styles.heroE2}>🚇</Text></View>
          <Text style={styles.heroTitle}>{event.name}</Text>
          <View style={styles.heroBar} />
          <Text style={styles.heroTag}>{event.tagline}</Text>
          <View style={styles.heroChips}>
            <HeroChip icon="calendar" text={fmtRange(event.startDate, event.endDate)} />
            <HeroChip icon="location" text={`${event.venue.city}, ${event.venue.state}`} />
          </View>
          <View style={styles.countdown}>
            <CDBox v="42" l="Days" /><CDBox v="08" l="Hrs" /><CDBox v="15" l="Min" />
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <Sec>
          <View style={styles.bento}>
            {quickActions.map((a) => (
              <TouchableOpacity
                key={a.id}
                style={[styles.bentoCard, { backgroundColor: a.variant === 'filled' ? theme.primary : theme.surface, borderColor: a.variant === 'filled' ? theme.primary : theme.border }]}
                activeOpacity={0.7}
                onPress={() => Alert.alert(a.label, `${a.label} coming soon!`)}
                accessibilityRole="button" accessibilityLabel={a.label}
              >
                <View style={[styles.bentoIco, { backgroundColor: a.variant === 'filled' ? 'rgba(255,255,255,0.15)' : theme.primary + '10' }]}>
                  <Ionicons name={a.icon as any} size={22} color={a.variant === 'filled' ? '#FFF' : theme.primary} />
                </View>
                <Text style={[styles.bentoLbl, { color: a.variant === 'filled' ? '#FFF' : theme.text }]}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Sec>

        {/* ── AI Recommendations (Swapcard-style) ── */}
        <Sec>
          <View style={styles.secRow}>
            <Text style={[styles.secTitle, { color: theme.text }]}>Recommended for You</Text>
            <View style={[styles.aiBadge, { backgroundColor: '#7C3AED18' }]}><Text style={styles.aiLabel}>✨ AI</Text></View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {aiRecommendations.map((r) => (
              <TouchableOpacity key={r.id} style={[styles.recCard, { backgroundColor: theme.surface }]} activeOpacity={0.7}>
                <View style={[styles.recIcon, { backgroundColor: r.color + '14' }]}>
                  <Ionicons name={r.icon as any} size={18} color={r.color} />
                </View>
                <Text style={[styles.recTitle, { color: theme.text }]} numberOfLines={1}>{r.title}</Text>
                <Text style={[styles.recReason, { color: theme.textLight }]} numberOfLines={2}>{r.reason}</Text>
                <View style={[styles.recType, { backgroundColor: r.color + '14' }]}>
                  <Text style={[styles.recTypeText, { color: r.color }]}>{r.type.toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Sec>

        {/* ── My Upcoming (Whova / Google I/O-style) ── */}
        <Sec>
          <Text style={[styles.secTitle, { color: theme.text }]}>Your Next Session</Text>
          <TouchableOpacity style={[styles.upcomingCard, { backgroundColor: theme.surface }]} activeOpacity={0.7}>
            <View style={[styles.upLive, { backgroundColor: '#DC262618' }]}>
              <View style={[styles.livePulse, { backgroundColor: theme.error }]} />
              <Text style={[styles.upLiveText, { color: theme.error }]}>COMING UP</Text>
            </View>
            <Text style={[styles.upTitle, { color: theme.text }]}>Inauguration of Prawaas 5.0 Exhibition</Text>
            <View style={styles.upMeta}>
              <View style={styles.upChip}><Ionicons name="time-outline" size={13} color={theme.textLight} /><Text style={[styles.upChipText, { color: theme.textSecondary }]}>11:00 AM</Text></View>
              <View style={styles.upChip}><Ionicons name="location-outline" size={13} color={theme.textLight} /><Text style={[styles.upChipText, { color: theme.textSecondary }]}>Main Hall</Text></View>
            </View>
            <View style={[styles.upProgress, { backgroundColor: theme.border }]}><View style={[styles.upProgressFill, { backgroundColor: theme.accent, width: '65%' as any }]} /></View>
            <Text style={[styles.upTime, { color: theme.textLight }]}>Starting in 45 minutes</Text>
          </TouchableOpacity>
        </Sec>

        {/* ── Desh Ki Raftaar — Impact Dashboard ── */}
        <Sec>
          <Text style={[styles.secTitle, { color: theme.text }]}>Desh Ki Raftaar — Impact</Text>
          <Text style={[styles.secSub, { color: theme.textSecondary }]}>Driving India's transport transformation</Text>
          <View style={styles.impactGrid}>
            {impactMetrics.map((m, i) => (
              <View key={i} style={[styles.impactCard, { backgroundColor: theme.surface }]}>
                <Text style={styles.impactEmoji}>{m.icon}</Text>
                <Text style={[styles.impactVal, { color: m.color }]}>{m.value}</Text>
                <Text style={[styles.impactLbl, { color: theme.textSecondary }]}>{m.label}</Text>
              </View>
            ))}
          </View>
        </Sec>

        {/* ── EV Showcase (Transport-Sector Unique) ── */}
        <Sec>
          <View style={styles.secRow}>
            <Text style={[styles.secTitle, { color: theme.text }]}>EV Showcase</Text>
            <TouchableOpacity><Text style={[styles.seeAll, { color: theme.secondary }]}>See All →</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {evShowcase.filter(e => e.highlight).map((ev) => (
              <View key={ev.id} style={[styles.evCard, { backgroundColor: theme.surface }]}>
                <View style={[styles.evBadge, { backgroundColor: '#05966918' }]}><Text style={[styles.evBadgeT, { color: '#059669' }]}>{ev.type}</Text></View>
                <Text style={[styles.evName, { color: theme.text }]}>{ev.name}</Text>
                <Text style={[styles.evExhibitor, { color: theme.textSecondary }]}>{ev.exhibitor} · {ev.hall}</Text>
                <View style={styles.evSpecs}>
                  <Spec icon="🔋" label={ev.range} theme={theme} />
                  <Spec icon="⚡" label={ev.charging} theme={theme} />
                  <Spec icon="💺" label={ev.capacity} theme={theme} />
                </View>
              </View>
            ))}
          </ScrollView>
        </Sec>

        {/* ── Event at a Glance ── */}
        <Sec>
          <Text style={[styles.secTitle, { color: theme.text }]}>Event at a Glance</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {eventStats.map((s, i) => (
              <View key={i} style={[styles.statCard, { backgroundColor: theme.surface }]}>
                <View style={[styles.statIco, { backgroundColor: s.color + '14' }]}><Ionicons name={s.icon as any} size={18} color={s.color} /></View>
                <Text style={[styles.statVal, { color: theme.text }]}>{s.value}</Text>
                <Text style={[styles.statLbl, { color: theme.textSecondary }]}>{s.label}</Text>
              </View>
            ))}
          </ScrollView>
        </Sec>

        {/* ── Live Updates ── */}
        <Sec>
          <View style={styles.secRow}>
            <Text style={[styles.secTitle, { color: theme.text }]}>Live Updates</Text>
            <View style={[styles.liveBadge, { backgroundColor: theme.success }]} /><Text style={[styles.liveText, { color: theme.success }]}>LIVE</Text>
          </View>
          {liveUpdates.slice(0, 3).map((u) => (
            <View key={u.id} style={[styles.updateRow, { backgroundColor: theme.surface, borderLeftColor: prioColor(u.priority, theme) }]}>
              <View style={[styles.updIcon, { backgroundColor: prioColor(u.priority, theme) + '14' }]}>
                <Ionicons name={u.icon as any} size={16} color={prioColor(u.priority, theme)} />
              </View>
              <View style={styles.updBody}>
                <Text style={[styles.updTitle, { color: theme.text }]}>{u.title}</Text>
                <Text style={[styles.updMsg, { color: theme.textSecondary }]} numberOfLines={2}>{u.message}</Text>
              </View>
            </View>
          ))}
        </Sec>

        {/* ── Getting Here ── */}
        <Sec>
          <Text style={[styles.secTitle, { color: theme.text }]}>Getting Here</Text>
          <Text style={[styles.secSub, { color: theme.textSecondary }]}>Transport to {event.venue.name}</Text>
          {transportInfo.map((t) => (
            <View key={t.id} style={[styles.transCard, { backgroundColor: theme.surface }]}>
              <View style={[styles.transIco, { backgroundColor: transColor(t.type) + '14' }]}>
                <Ionicons name={transIcon(t.type) as any} size={18} color={transColor(t.type)} />
              </View>
              <View style={styles.transBody}>
                <View style={styles.transTop}>
                  <Text style={[styles.transName, { color: theme.text }]}>{t.name}</Text>
                  <View style={[styles.statusPill, { backgroundColor: t.status === 'running' ? theme.success + '18' : theme.warning + '18' }]}>
                    <View style={[styles.statusDot, { backgroundColor: t.status === 'running' ? theme.success : theme.warning }]} />
                    <Text style={[styles.statusTxt, { color: t.status === 'running' ? theme.success : theme.warning }]}>{t.status === 'running' ? 'Active' : 'Delayed'}</Text>
                  </View>
                </View>
                <Text style={[styles.transDesc, { color: theme.textSecondary }]}>{t.description}</Text>
                {t.schedule && <Text style={[styles.transSched, { color: theme.textLight }]}>{t.schedule}</Text>}
              </View>
            </View>
          ))}
        </Sec>

        {/* ── Sponsors ── */}
        <Sec>
          <Text style={[styles.secTitle, { color: theme.text }]}>Sponsors & Partners</Text>
          {sponsorTiers.map((tier) => (
            <View key={tier.tier} style={styles.tierSection}>
              <Text style={[styles.tierLabel, { color: theme.textLight }]}>{tier.tier}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tierRow}>
                {tier.sponsors.map((s) => (
                  <View key={s.id} style={[styles.sponsorCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                    <Avatar name={s.name} size={36} />
                    <Text style={[styles.sponsorName, { color: theme.text }]} numberOfLines={1}>{s.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </Sec>

        {/* ── Venue ── */}
        <Sec>
          <View style={[styles.venueCard, { backgroundColor: theme.primary }]}>
            <View style={styles.venueBody}>
              <Text style={styles.venueLabel}>VENUE</Text>
              <Text style={styles.venueName}>{event.venue.name}</Text>
              <Text style={styles.venueAddr}>{event.venue.address}, {event.venue.city}, {event.venue.state} {event.venue.pincode}</Text>
            </View>
            <TouchableOpacity style={styles.mapBtn} accessibilityLabel="View directions">
              <Ionicons name="navigate" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Sec>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

/* ── tiny helpers ── */
const Sec: React.FC<{ children: React.ReactNode }> = ({ children }) => <View style={styles.sec}>{children}</View>;
const HeroChip: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.heroChip}><Ionicons name={icon as any} size={13} color="#FFF" /><Text style={styles.heroChipT}>{text}</Text></View>
);
const CDBox: React.FC<{ v: string; l: string }> = ({ v, l }) => (
  <View style={styles.cdBox}><Text style={styles.cdVal}>{v}</Text><Text style={styles.cdLbl}>{l}</Text></View>
);
const Spec: React.FC<{ icon: string; label: string; theme: any }> = ({ icon, label, theme }) => (
  <View style={styles.specItem}><Text style={styles.specIco}>{icon}</Text><Text style={[styles.specLbl, { color: theme.textSecondary }]}>{label}</Text></View>
);

function fmtRange(s: string, e: string) {
  const sd = new Date(s), ed = new Date(e);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${sd.getDate()}-${ed.getDate()} ${m[sd.getMonth()]} ${sd.getFullYear()}`;
}
function prioColor(p: string, t: any) { return p === 'urgent' ? t.error : p === 'high' ? t.accent : p === 'medium' ? t.secondary : t.textSecondary; }
function transIcon(t: string) { return t === 'shuttle' ? 'bus-outline' : t === 'metro' ? 'train-outline' : t === 'parking' ? 'car-sport-outline' : 'navigate-outline'; }
function transColor(t: string) { return t === 'shuttle' ? '#2563EB' : t === 'metro' ? '#7C3AED' : t === 'parking' ? '#0D9488' : '#64748B'; }

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerText: { marginLeft: 10 },
  hGreet: { fontSize: 11, fontWeight: '500' },
  hName: { fontSize: 16, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 8 },
  hBtn: { width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  hDot: { position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 4 },

  hero: { marginHorizontal: 16, borderRadius: 20, padding: 24, overflow: 'hidden', position: 'relative' },
  heroDecor: { position: 'absolute', right: 10, top: 10, opacity: 0.1 },
  heroE1: { fontSize: 60 }, heroE2: { fontSize: 50, marginTop: 10 },
  heroTitle: { fontSize: 30, fontWeight: '800', color: '#FFF', letterSpacing: .5 },
  heroBar: { width: 36, height: 3.5, backgroundColor: '#F97316', borderRadius: 2, marginVertical: 10 },
  heroTag: { fontSize: 13, color: 'rgba(255,255,255,.8)', fontWeight: '500', lineHeight: 19, marginBottom: 16 },
  heroChips: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  heroChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,255,255,.12)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  heroChipT: { color: '#FFF', fontSize: 12, fontWeight: '500' },
  countdown: { flexDirection: 'row', gap: 10 },
  cdBox: { backgroundColor: 'rgba(255,255,255,.15)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center', minWidth: 56 },
  cdVal: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  cdLbl: { color: 'rgba(255,255,255,.7)', fontSize: 10, fontWeight: '600', marginTop: 2 },

  sec: { marginTop: 20, paddingHorizontal: 16 },
  secRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  secTitle: { fontSize: 18, fontWeight: '700' },
  secSub: { fontSize: 12, marginTop: 2, marginBottom: 10 },
  seeAll: { fontSize: 13, fontWeight: '600' },
  aiBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  aiLabel: { fontSize: 11, fontWeight: '700', color: '#7C3AED' },
  liveBadge: { width: 8, height: 8, borderRadius: 4, marginLeft: 4 },
  liveText: { fontSize: 11, fontWeight: '700' },

  bento: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bentoCard: { width: (SW - 42) / 2, borderRadius: 14, padding: 16, borderWidth: 1, alignItems: 'flex-start' },
  bentoIco: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  bentoLbl: { fontSize: 14, fontWeight: '600' },

  hScroll: { gap: 10, paddingVertical: 10 },
  recCard: { width: 160, borderRadius: 14, padding: 14, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .04, shadowRadius: 3 },
  recIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  recTitle: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  recReason: { fontSize: 11, lineHeight: 15, marginBottom: 8 },
  recType: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  recTypeText: { fontSize: 9, fontWeight: '800', letterSpacing: .5 },

  upcomingCard: { borderRadius: 16, padding: 18, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .05, shadowRadius: 4 },
  upLive: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
  livePulse: { width: 7, height: 7, borderRadius: 4 },
  upLiveText: { fontSize: 10, fontWeight: '800', letterSpacing: .5 },
  upTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  upMeta: { flexDirection: 'row', gap: 14, marginBottom: 12 },
  upChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  upChipText: { fontSize: 12 },
  upProgress: { height: 4, borderRadius: 2, marginBottom: 6 },
  upProgressFill: { height: '100%', borderRadius: 2 },
  upTime: { fontSize: 11 },

  impactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  impactCard: { width: (SW - 42) / 2, borderRadius: 14, padding: 16, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .04, shadowRadius: 3 },
  impactEmoji: { fontSize: 28, marginBottom: 6 },
  impactVal: { fontSize: 22, fontWeight: '800' },
  impactLbl: { fontSize: 11, textAlign: 'center', marginTop: 2 },

  evCard: { width: 200, borderRadius: 14, padding: 16, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .04, shadowRadius: 3 },
  evBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 8 },
  evBadgeT: { fontSize: 10, fontWeight: '700' },
  evName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  evExhibitor: { fontSize: 11, marginBottom: 10 },
  evSpecs: { flexDirection: 'row', gap: 8 },
  specItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  specIco: { fontSize: 12 },
  specLbl: { fontSize: 10 },

  statCard: { width: 110, borderRadius: 14, padding: 14, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: .04, shadowRadius: 3 },
  statIco: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  statVal: { fontSize: 16, fontWeight: '800' },
  statLbl: { fontSize: 10, textAlign: 'center', marginTop: 2 },

  updateRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 12, marginBottom: 8, borderLeftWidth: 3 },
  updIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  updBody: { flex: 1 },
  updTitle: { fontSize: 13, fontWeight: '600', marginBottom: 2 },
  updMsg: { fontSize: 12, lineHeight: 17 },

  transCard: { flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 12, marginBottom: 8 },
  transIco: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  transBody: { flex: 1 },
  transTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  transName: { fontSize: 14, fontWeight: '600' },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontSize: 10, fontWeight: '700' },
  transDesc: { fontSize: 12, marginBottom: 2 },
  transSched: { fontSize: 11 },

  tierSection: { marginTop: 12 },
  tierLabel: { fontSize: 11, fontWeight: '700', letterSpacing: .8, textTransform: 'uppercase', marginBottom: 8 },
  tierRow: { gap: 10 },
  sponsorCard: { alignItems: 'center', borderRadius: 12, padding: 12, borderWidth: 1, minWidth: 90 },
  sponsorName: { fontSize: 10, fontWeight: '600', marginTop: 6, textAlign: 'center' },

  venueCard: { borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center' },
  venueBody: { flex: 1 },
  venueLabel: { color: 'rgba(255,255,255,.6)', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  venueName: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  venueAddr: { color: 'rgba(255,255,255,.7)', fontSize: 12, lineHeight: 18 },
  mapBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,.15)', justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
});
