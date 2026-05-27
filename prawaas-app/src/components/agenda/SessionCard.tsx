import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Session } from '../../types';

interface SessionCardProps {
  session: Session;
}

const typeIcons: Record<string, { icon: string; color: string }> = {
  plenary: { icon: 'megaphone-outline', color: '#6366F1' },
  parallel: { icon: 'git-branch-outline', color: '#3B82F6' },
  break: { icon: 'cafe-outline', color: '#F59E0B' },
  ceremony: { icon: 'ribbon-outline', color: '#EF4444' },
  networking: { icon: 'people-outline', color: '#10B981' },
};

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const theme = useTheme();
  const typeConfig = typeIcons[session.type || 'plenary'];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderLeftColor: typeConfig.color,
        },
      ]}
    >
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: theme.textSecondary }]}>
          {session.time}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Ionicons
            name={typeConfig.icon as any}
            size={16}
            color={typeConfig.color}
            style={styles.icon}
          />
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {session.title}
          </Text>
        </View>
        {session.hall && (
          <View style={styles.hallRow}>
            <Ionicons name="location-outline" size={13} color={theme.textLight} />
            <Text style={[styles.hall, { color: theme.textLight }]}>
              {session.hall}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  timeContainer: {
    width: 90,
    justifyContent: 'center',
  },
  time: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 6,
    marginTop: 1,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  hallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 22,
  },
  hall: {
    fontSize: 11,
    marginLeft: 4,
  },
});
