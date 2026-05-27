import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ActionButton } from '../common/ActionButton';
import { useEvent } from '../../hooks/useConfig';
import { QuickAction } from '../../types';

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const event = useEvent();

  const visibleActions = actions.filter((action) => {
    switch (action.id) {
      case 'myqr':
        return event.features.enableQR;
      case 'scanqr':
        return event.features.enableScanQR;
      case 'resources':
        return event.features.enableResources;
      case 'contact':
        return event.features.enableContactUs;
      default:
        return true;
    }
  });

  const rows: QuickAction[][] = [];
  for (let i = 0; i < visibleActions.length; i += 2) {
    rows.push(visibleActions.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, idx) => (
        <View key={idx} style={styles.row}>
          {row.map((action) => (
            <ActionButton
              key={action.id}
              label={action.label}
              icon={action.icon}
              variant={action.variant}
              onPress={() => Alert.alert(action.label, `${action.label} feature coming soon!`)}
              style={styles.button}
            />
          ))}
          {row.length === 1 && <View style={styles.button} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
  },
});
