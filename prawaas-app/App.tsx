import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ConfigProvider } from './src/hooks/useConfig';
import { AppNavigator } from './src/navigation/AppNavigator';
import { eventConfig } from './src/config/eventConfig';

export default function App() {
  return (
    <ConfigProvider config={eventConfig}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5FA' }} edges={['top']}>
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ConfigProvider>
  );
}
