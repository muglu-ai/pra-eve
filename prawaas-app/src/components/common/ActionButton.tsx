import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';

interface ActionButtonProps {
  label: string;
  icon: string;
  variant?: 'filled' | 'outlined';
  onPress?: () => void;
  style?: ViewStyle;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  variant = 'filled',
  onPress,
  style,
}) => {
  const theme = useTheme();
  const isFilled = variant === 'filled';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: isFilled ? theme.primary : theme.surface,
          borderColor: isFilled ? theme.primary : theme.primary,
          borderWidth: 1.5,
        },
        style,
      ]}
    >
      <Ionicons
        name={icon as any}
        size={18}
        color={isFilled ? '#FFFFFF' : theme.primary}
        style={styles.icon}
      />
      <Text
        style={[
          styles.label,
          { color: isFilled ? '#FFFFFF' : theme.primary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
