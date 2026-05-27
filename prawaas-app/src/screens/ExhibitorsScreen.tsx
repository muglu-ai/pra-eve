import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { useTheme } from '../hooks/useConfig';
import { SearchBar } from '../components/common/SearchBar';
import { ExhibitorCard } from '../components/exhibitors/ExhibitorCard';
import { exhibitors } from '../data/mockData';

export const ExhibitorsScreen: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExhibitors = useMemo(() => {
    if (!searchQuery.trim()) return exhibitors;
    const query = searchQuery.toLowerCase();
    return exhibitors.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        (e.category && e.category.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Exhibitors</Text>

      <SearchBar
        placeholder="Search company name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filteredExhibitors.map((exhibitor) => (
            <ExhibitorCard
              key={exhibitor.id}
              exhibitor={exhibitor}
              onPress={() =>
                Alert.alert(exhibitor.name, `${exhibitor.description || ''}\n${exhibitor.hall} - Booth ${exhibitor.booth}`)
              }
            />
          ))}
          {filteredExhibitors.length === 0 && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                No exhibitors found matching "{searchQuery}".
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  content: {
    paddingTop: 8,
    paddingBottom: 80,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});
