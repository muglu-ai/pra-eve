import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useConfig';

interface BadgeProps {
  label: string;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color }) => {
  const theme = useTheme();
  const badgeColor = color || theme.badgeColors[label.toUpperCase()] || theme.badgeColors.DEFAULT;

  return (
    <View style={[styles.container, { backgroundColor: badgeColor + '18' }]}>
      <Text style={[styles.text, { color: badgeColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
