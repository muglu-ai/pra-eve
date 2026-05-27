import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useConfig';
import { FilterChip as FilterChipType } from '../../types';

interface FilterChipsProps {
  filters: FilterChipType[];
  activeFilter: string;
  onFilterChange: (key: string) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = filter.key === activeFilter;
        return (
          <TouchableOpacity
            key={filter.key}
            onPress={() => onFilterChange(filter.key)}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? theme.primary : theme.surface,
                borderColor: isActive ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                { color: isActive ? '#FFFFFF' : theme.text },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
