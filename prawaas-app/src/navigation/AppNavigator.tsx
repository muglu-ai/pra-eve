import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useConfig';
import { useAuth } from '../auth/AuthContext';
import { bottomTabs } from '../config/navigationConfig';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OtpScreen } from '../screens/auth/OtpScreen';

import { HomeScreen } from '../screens/HomeScreen';
import { AgendaScreen } from '../screens/AgendaScreen';
import { CommunityScreen } from '../screens/CommunityScreen';
import { NetworkingScreen } from '../screens/NetworkingScreen';
import { ExhibitorsScreen } from '../screens/ExhibitorsScreen';

import { MyMeetingsScreen } from '../screens/meetings/MyMeetingsScreen';
import { NetworkingSessionsScreen } from '../screens/meetings/NetworkingSessionsScreen';
import { RequestMeetingScreen } from '../screens/meetings/RequestMeetingScreen';
import { ConversationsScreen } from '../screens/chat/ConversationsScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabScreenMap: Record<string, React.FC<any>> = {
  Home: HomeScreen,
  Agenda: AgendaScreen,
  Community: CommunityScreen,
  Networking: NetworkingScreen,
  Exhibitors: ExhibitorsScreen,
};

const MainTabs: React.FC = () => {
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
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      {bottomTabs.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.key}
          component={tabScreenMap[tab.key]}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ focused, color }) => (
              <View>
                {focused && (
                  <View style={[styles.activeIndicator, { backgroundColor: theme.tabBarActive }]} />
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

const AuthStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OtpVerification" component={OtpScreen} />
  </Stack.Navigator>
);

const MainStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MyMeetings" component={MyMeetingsScreen} />
    <Stack.Screen name="NetworkingSessions" component={NetworkingSessionsScreen} />
    <Stack.Screen name="RequestMeeting" component={RequestMeetingScreen} />
    <Stack.Screen name="Conversations" component={ConversationsScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return isAuthenticated ? <MainStack /> : <AuthStack />;
};

const styles = StyleSheet.create({
  activeIndicator: {
    position: 'absolute',
    top: -8, left: -4, right: -4,
    height: 2.5, borderRadius: 1,
  },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});
