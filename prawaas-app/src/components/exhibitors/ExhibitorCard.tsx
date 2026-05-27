import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { Exhibitor } from '../../types';

interface ExhibitorCardProps {
  exhibitor: Exhibitor;
  onPress?: () => void;
}

export const ExhibitorCard: React.FC<ExhibitorCardProps> = ({ exhibitor, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: theme.surface }]}
    >
      <View style={[styles.logoContainer, { backgroundColor: theme.primary + '10' }]}>
        {exhibitor.logo ? (
          <Avatar name={exhibitor.name} uri={exhibitor.logo} size={52} />
        ) : (
          <Avatar name={exhibitor.name} size={52} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
          {exhibitor.name}
        </Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.location, { color: theme.textSecondary }]}>
            Location: {exhibitor.hall} - Booth {exhibitor.booth}
          </Text>
        </View>
        {exhibitor.category && (
          <View style={[styles.categoryBadge, { backgroundColor: theme.primary + '12' }]}>
            <Text style={[styles.categoryText, { color: theme.primary }]}>
              {exhibitor.category}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
