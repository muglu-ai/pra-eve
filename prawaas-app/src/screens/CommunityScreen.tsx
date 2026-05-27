import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useTheme } from '../hooks/useConfig';
import { TabSelector } from '../components/common/TabSelector';
import { PostCard } from '../components/community/PostCard';
import { communityPosts } from '../data/mockData';

const communityTabs = [
  { key: 'posts', label: 'Posts' },
  { key: 'polls', label: 'Polls' },
];

export const CommunityScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  const filteredPosts = communityPosts.filter((post) => {
    if (activeTab === 'polls') return post.type === 'poll';
    return true;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Community</Text>
      <TabSelector tabs={communityTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {filteredPosts.length === 0 && (
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: theme.textLight }]}>
                No {activeTab} yet. Check back soon!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 80,
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});
