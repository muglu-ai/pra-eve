import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Person } from '../../types';

interface PersonCardProps {
  person: Person;
  onPress?: () => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, { borderBottomColor: theme.border }]}
    >
      <Avatar name={person.name} uri={person.avatar || undefined} size={48} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]}>{person.name}</Text>
        <Badge label={person.category} />
        {person.designation && (
          <Text style={[styles.detail, { color: theme.textSecondary }]} numberOfLines={1}>
            {person.designation}{person.organization ? ` · ${person.organization}` : ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  detail: {
    fontSize: 12,
    marginTop: 1,
  },
});
