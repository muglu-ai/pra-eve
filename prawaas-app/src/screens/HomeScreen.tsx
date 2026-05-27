import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useEvent } from '../hooks/useConfig';
import { EventBanner } from '../components/home/EventBanner';
import { EventInfo } from '../components/home/EventInfo';
import { QuickActions } from '../components/home/QuickActions';
import { ChatBotFAB } from '../components/home/ChatBotFAB';
import { quickActions } from '../data/mockData';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const event = useEvent();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>G</Text>
            </View>
            <Text style={[styles.greetingText, { color: theme.text }]}>
              Hello, Guest 👋
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="notifications-outline" size={24} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bannerSection}>
          <EventBanner />
        </View>

        <View style={styles.dotsRow}>
          <View style={[styles.dot, { backgroundColor: theme.primary }]} />
          <View style={[styles.dot, { backgroundColor: theme.border }]} />
          <View style={[styles.dot, { backgroundColor: theme.border }]} />
        </View>

        <EventInfo />

        <QuickActions actions={quickActions} />

        {event.features.enableDigiyatra && (
          <TouchableOpacity style={[styles.digiyatraButton, { backgroundColor: theme.secondary }]}>
            <Text style={styles.digiyatraText}>
              Enter {event.name} with digiyatra 🟢
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <ChatBotFAB />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIcon: {
    padding: 4,
  },
  bannerSection: {
    marginTop: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  digiyatraButton: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  digiyatraText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 80,
  },
});
