import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useConfig';
import { TabSelector } from '../components/common/TabSelector';
import { PostCard } from '../components/community/PostCard';
import { communityPosts } from '../data/mockData';

const communityTabs = [
  { key: 'feed', label: 'Feed' },
  { key: 'polls', label: 'Polls' },
  { key: 'announcements', label: 'Updates' },
];

export const CommunityScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('feed');

  const filteredPosts = communityPosts.filter((post) => {
    if (activeTab === 'polls') return post.type === 'poll';
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.screenTitle, { color: theme.text }]}>Community</Text>

      {/* Compose Box */}
      <View style={[styles.composeBox, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={[styles.composeAvatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.composeAvatarText}>T</Text>
        </View>
        <TouchableOpacity style={[styles.composeInput, { backgroundColor: theme.background, borderColor: theme.border }]}>
          <Text style={[styles.composePlaceholder, { color: theme.textLight }]}>Share something with the community...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.composeBtn, { backgroundColor: theme.primary }]} accessibilityLabel="Create post">
          <Ionicons name="send" size={16} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TabSelector tabs={communityTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="chatbubbles-outline" size={44} color={theme.textLight} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>No {activeTab} yet</Text>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                Check back soon for updates!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  screenTitle: { fontSize: 22, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  composeBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginHorizontal: 16, marginVertical: 10, padding: 12, borderRadius: 14, borderWidth: 1,
  },
  composeAvatar: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  composeAvatarText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  composeInput: { flex: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  composePlaceholder: { fontSize: 13 },
  composeBtn: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  content: { paddingTop: 12, paddingBottom: 80 },
  empty: { padding: 50, alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '600' },
  emptyText: { fontSize: 13, textAlign: 'center' },
});
