import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useConfig';
import { bottomTabs } from '../config/navigationConfig';

import { HomeScreen } from '../screens/HomeScreen';
import { AgendaScreen } from '../screens/AgendaScreen';
import { CommunityScreen } from '../screens/CommunityScreen';
import { NetworkingScreen } from '../screens/NetworkingScreen';
import { ExhibitorsScreen } from '../screens/ExhibitorsScreen';

const Tab = createBottomTabNavigator();

const screenMap: Record<string, React.FC> = {
  Home: HomeScreen,
  Agenda: AgendaScreen,
  Community: CommunityScreen,
  Networking: NetworkingScreen,
  Exhibitors: ExhibitorsScreen,
};

export const AppNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {bottomTabs.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.key}
          component={screenMap[tab.key]}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ focused, color, size }) => (
              <View>
                {focused && (
                  <View
                    style={[
                      styles.activeIndicator,
                      { backgroundColor: theme.tabBarActive },
                    ]}
                  />
                )}
                <Ionicons
                  name={(focused ? tab.activeIcon : tab.icon) as any}
                  size={22}
                  color={color}
                />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeIndicator: {
    position: 'absolute',
    top: -8,
    left: -4,
    right: -4,
    height: 2.5,
    borderRadius: 1,
  },
});
