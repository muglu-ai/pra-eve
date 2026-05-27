import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useConfig';
import { SearchBar } from '../components/common/SearchBar';
import { FilterChips } from '../components/common/FilterChips';
import { Avatar } from '../components/common/Avatar';
import { exhibitors } from '../data/mockData';
import { floorMapZones } from '../data/transportData';

const categoryFilters = [
  { key: 'all', label: 'All' },
  { key: 'oem', label: 'OEM' },
  { key: 'ev', label: 'EV' },
  { key: 'technology', label: 'Technology' },
];

export const ExhibitorsScreen: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFloorMap, setShowFloorMap] = useState(false);

  const filtered = useMemo(() => {
    let result = exhibitors;
    if (activeCategory !== 'all') {
      result = result.filter((e) => e.category?.toLowerCase() === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) => e.name.toLowerCase().includes(q) || e.category?.toLowerCase().includes(q));
    }
    return result;
  }, [searchQuery, activeCategory]);

  const exhibitorCount = filtered.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Exhibitors</Text>
        <TouchableOpacity
          style={[styles.mapToggle, { backgroundColor: showFloorMap ? theme.primary : theme.surface, borderColor: theme.primary }]}
          onPress={() => setShowFloorMap(!showFloorMap)}
          accessibilityLabel="Toggle floor map"
        >
          <Ionicons name="map-outline" size={16} color={showFloorMap ? '#FFF' : theme.primary} />
          <Text style={[styles.mapToggleText, { color: showFloorMap ? '#FFF' : theme.primary }]}>Floor Map</Text>
        </TouchableOpacity>
      </View>

      <SearchBar placeholder="Search exhibitors..." value={searchQuery} onChangeText={setSearchQuery} />
      <FilterChips filters={categoryFilters} activeFilter={activeCategory} onFilterChange={setActiveCategory} />

      {showFloorMap ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.floorMapContainer}>
            {floorMapZones.map((zone) => (
              <TouchableOpacity
                key={zone.id}
                style={[styles.zoneCard, { backgroundColor: theme.surface }]}
                onPress={() => Alert.alert(zone.name, zone.description || '')}
              >
                <View style={[styles.zoneIcon, { backgroundColor: getZoneColor(zone.type) + '14' }]}>
                  <Ionicons name={getZoneIcon(zone.type) as any} size={20} color={getZoneColor(zone.type)} />
                </View>
                <View style={styles.zoneInfo}>
                  <Text style={[styles.zoneName, { color: theme.text }]}>{zone.name}</Text>
                  {zone.exhibitorCount && (
                    <Text style={[styles.zoneCount, { color: theme.textSecondary }]}>{zone.exhibitorCount} exhibitors</Text>
                  )}
                  {zone.description && (
                    <Text style={[styles.zoneDesc, { color: theme.textLight }]} numberOfLines={1}>{zone.description}</Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.resultCount, { color: theme.textSecondary }]}>
            {exhibitorCount} exhibitor{exhibitorCount !== 1 ? 's' : ''} found
          </Text>
          <View style={styles.exhibitorList}>
            {filtered.map((exhibitor) => (
              <TouchableOpacity
                key={exhibitor.id}
                style={[styles.exhibitorCard, { backgroundColor: theme.surface }]}
                onPress={() => Alert.alert(exhibitor.name, `${exhibitor.description}\n\n📍 ${exhibitor.hall} - Booth ${exhibitor.booth}`)}
                activeOpacity={0.7}
              >
                <View style={[styles.exLogoWrap, { backgroundColor: theme.primary + '08' }]}>
                  <Avatar name={exhibitor.name} size={48} />
                </View>
                <View style={styles.exInfo}>
                  <Text style={[styles.exName, { color: theme.text }]} numberOfLines={1}>{exhibitor.name}</Text>
                  <View style={styles.exLocationRow}>
                    <Ionicons name="location-outline" size={13} color={theme.textSecondary} />
                    <Text style={[styles.exLocation, { color: theme.textSecondary }]}>
                      {exhibitor.hall} · Booth {exhibitor.booth}
                    </Text>
                  </View>
                  {exhibitor.category && (
                    <View style={[styles.exCatBadge, { backgroundColor: getCategoryColor(exhibitor.category) + '14' }]}>
                      <Text style={[styles.exCatText, { color: getCategoryColor(exhibitor.category) }]}>{exhibitor.category}</Text>
                    </View>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textLight} />
              </TouchableOpacity>
            ))}
            {filtered.length === 0 && (
              <View style={styles.empty}>
                <Ionicons name="search-outline" size={40} color={theme.textLight} />
                <Text style={[styles.emptyText, { color: theme.textLight }]}>No exhibitors found.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

function getZoneColor(type: string): string {
  const colors: Record<string, string> = {
    hall: '#2563EB', conference: '#7C3AED', lounge: '#059669',
    food: '#D97706', registration: '#0D9488', parking: '#64748B',
    restroom: '#94A3B8', info: '#0284C7',
  };
  return colors[type] || '#64748B';
}

function getZoneIcon(type: string): string {
  const icons: Record<string, string> = {
    hall: 'business-outline', conference: 'mic-outline', lounge: 'cafe-outline',
    food: 'restaurant-outline', registration: 'document-text-outline',
    parking: 'car-sport-outline', restroom: 'water-outline', info: 'information-circle-outline',
  };
  return icons[type] || 'location-outline';
}

function getCategoryColor(cat: string): string {
  const colors: Record<string, string> = {
    OEM: '#0891B2', EV: '#059669', Technology: '#6366F1',
  };
  return colors[cat] || '#64748B';
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4,
  },
  screenTitle: { fontSize: 22, fontWeight: '700' },
  mapToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1.5,
  },
  mapToggleText: { fontSize: 12, fontWeight: '600' },

  resultCount: { fontSize: 12, paddingHorizontal: 16, marginBottom: 6 },
  exhibitorList: { paddingBottom: 80 },
  exhibitorCard: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8,
    padding: 14, borderRadius: 14, elevation: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3,
  },
  exLogoWrap: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  exInfo: { flex: 1, marginLeft: 14 },
  exName: { fontSize: 15, fontWeight: '600', marginBottom: 3 },
  exLocationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  exLocation: { fontSize: 12 },
  exCatBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  exCatText: { fontSize: 10, fontWeight: '700' },

  floorMapContainer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 80 },
  zoneCard: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 12, marginBottom: 8,
  },
  zoneIcon: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  zoneInfo: { flex: 1 },
  zoneName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  zoneCount: { fontSize: 11, fontWeight: '500' },
  zoneDesc: { fontSize: 11, marginTop: 1 },

  empty: { padding: 50, alignItems: 'center', gap: 10 },
  emptyText: { fontSize: 14 },
});
