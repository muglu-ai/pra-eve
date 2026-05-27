import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { useAuth } from '../../auth/AuthContext';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { Avatar } from '../../components/common/Avatar';
import { chatMessages } from '../../data/meetingsData';
import { ChatMessage } from '../../types/chat';

interface Props {
  navigation: any;
  route: any;
}

export const ChatScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { user } = useAuth();
  const currentUserId = user?.id || 'u1';
  const conversationId = route.params?.conversationId || 'c1';
  const recipientName = route.params?.recipientName || 'User';

  const [messages, setMessages] = useState<ChatMessage[]>(
    chatMessages[conversationId] || []
  );
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      text: inputText.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        conversationId,
        senderId: 'auto',
        text: getAutoReply(inputText.trim()),
        timestamp: new Date().toISOString(),
        status: 'delivered',
        type: 'text',
      };
      setMessages((prev) => [...prev, reply]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Avatar name={recipientName} size={36} />
        <View style={styles.headerInfo}>
          <Text style={[styles.headerName, { color: theme.text }]}>{recipientName}</Text>
          <Text style={[styles.headerStatus, { color: theme.success }]}>Online</Text>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="calendar-outline" size={22} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-vertical" size={22} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatBubble message={item} isOwn={item.senderId === currentUserId} />
        )}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={[styles.inputBar, { backgroundColor: theme.surface, borderTopColor: theme.border }]}>
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="add-circle-outline" size={26} color={theme.textSecondary} />
        </TouchableOpacity>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
          placeholder="Type a message..."
          placeholderTextColor={theme.textLight}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: inputText.trim() ? theme.primary : theme.border }]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={18} color={inputText.trim() ? '#FFFFFF' : theme.textLight} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('meet') || lower.includes('schedule')) {
    return "Sure! Let's set up a meeting. What time works best for you?";
  }
  if (lower.includes('hello') || lower.includes('hi')) {
    return "Hello! Great to connect with you at Prawaas 5.0! How can I help?";
  }
  if (lower.includes('thanks') || lower.includes('thank')) {
    return "You're welcome! Looking forward to connecting at the event.";
  }
  return "Thanks for your message! I'll get back to you shortly. See you at Prawaas 5.0! 🚌";
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderBottomWidth: 1, gap: 10,
  },
  backBtn: { padding: 4 },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 16, fontWeight: '700' },
  headerStatus: { fontSize: 11 },
  headerAction: { padding: 6 },
  messagesList: { padding: 8, paddingBottom: 16 },
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', padding: 10,
    borderTopWidth: 1, gap: 8,
  },
  attachBtn: { padding: 4, marginBottom: 4 },
  textInput: {
    flex: 1, borderWidth: 1, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
    maxHeight: 100, minHeight: 42,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 1,
  },
});
