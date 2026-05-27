import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../common/Avatar';
import { CommunityPost } from '../../types';

interface PostCardProps {
  post: CommunityPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const theme = useTheme();

  const timeAgo = getTimeAgo(post.timestamp);

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <Avatar name={post.author.name} uri={post.author.avatar || undefined} size={40} />
        <View style={styles.authorInfo}>
          <Text style={[styles.authorName, { color: theme.text }]}>
            {post.author.name}
          </Text>
          <Text style={[styles.timestamp, { color: theme.textLight }]}>
            {timeAgo}
          </Text>
        </View>
      </View>

      <Text style={[styles.content, { color: theme.text }]}>{post.content}</Text>

      {post.type === 'poll' && post.pollOptions && (
        <View style={styles.pollContainer}>
          {post.pollOptions.map((option) => {
            const totalVotes = post.pollOptions!.reduce((sum, o) => sum + o.votes, 0);
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            return (
              <TouchableOpacity key={option.id} style={[styles.pollOption, { borderColor: theme.border }]}>
                <View
                  style={[
                    styles.pollBar,
                    {
                      backgroundColor: theme.primary + '15',
                      width: `${percentage}%` as any,
                    },
                  ]}
                />
                <Text style={[styles.pollText, { color: theme.text }]}>
                  {option.text}
                </Text>
                <Text style={[styles.pollPercent, { color: theme.textSecondary }]}>
                  {percentage}%
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <View style={styles.reactions}>
          {post.reactions.map((reaction, idx) => (
            <TouchableOpacity key={idx} style={styles.reactionButton}>
              <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.commentBadge, { backgroundColor: theme.primary }]}>
          <Text style={styles.commentCount}>{post.commentCount}</Text>
          <Ionicons name="chatbubble-outline" size={14} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
};

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    marginLeft: 10,
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 1,
  },
  content: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  pollContainer: {
    marginBottom: 12,
    gap: 6,
  },
  pollOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  pollBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 8,
  },
  pollText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    zIndex: 1,
  },
  pollPercent: {
    fontSize: 12,
    fontWeight: '600',
    zIndex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  reactions: {
    flexDirection: 'row',
    gap: 4,
  },
  reactionButton: {
    paddingHorizontal: 4,
  },
  reactionEmoji: {
    fontSize: 22,
  },
  commentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  commentCount: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
