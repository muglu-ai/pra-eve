import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useConfig';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { FilterChips } from '../../components/common/FilterChips';
import { availableSlots } from '../../data/meetingsData';

interface Props {
  navigation: any;
  route: any;
}

const durationOptions = [
  { key: '15', label: '15 min' },
  { key: '20', label: '20 min' },
  { key: '30', label: '30 min' },
];

export const RequestMeetingScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const person = route.params?.person;

  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [sending, setSending] = useState(false);

  const uniqueDates = [...new Set(availableSlots.map((s) => s.date))];
  const dateFilters = uniqueDates.map((d) => ({
    key: d,
    label: formatShortDate(d),
  }));

  const slotsForDate = availableSlots.filter(
    (s) => s.date === selectedDate && s.isAvailable
  );

  const handleSend = async () => {
    if (!topic.trim()) { Alert.alert('Required', 'Please enter a meeting topic.'); return; }
    if (!selectedDate) { Alert.alert('Required', 'Please select a date.'); return; }
    if (!selectedTime) { Alert.alert('Required', 'Please select a time slot.'); return; }

    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);

    Alert.alert(
      'Meeting Request Sent!',
      `Your meeting request has been sent to ${person?.name || 'the attendee'}. You'll be notified when they respond.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Request Meeting</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {person && (
          <View style={[styles.personCard, { backgroundColor: theme.surface }]}>
            <Avatar name={person.name} size={44} />
            <View style={styles.personInfo}>
              <Text style={[styles.personName, { color: theme.text }]}>{person.name}</Text>
              <Badge label={person.category} />
              {person.designation && (
                <Text style={[styles.personDetail, { color: theme.textLight }]}>
                  {person.designation} · {person.organization}
                </Text>
              )}
            </View>
          </View>
        )}

        <Text style={[styles.sectionLabel, { color: theme.text }]}>Topic *</Text>
        <TextInput
          style={[styles.input, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]}
          placeholder="e.g., Business partnership discussion"
          placeholderTextColor={theme.textLight}
          value={topic}
          onChangeText={setTopic}
        />

        <Text style={[styles.sectionLabel, { color: theme.text }]}>Message (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea, { borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }]}
          placeholder="Add a brief note about what you'd like to discuss..."
          placeholderTextColor={theme.textLight}
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <Text style={[styles.sectionLabel, { color: theme.text }]}>Duration</Text>
        <FilterChips filters={durationOptions} activeFilter={duration} onFilterChange={setDuration} />

        <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Date *</Text>
        <FilterChips filters={dateFilters} activeFilter={selectedDate} onFilterChange={(d) => { setSelectedDate(d); setSelectedTime(''); }} />

        {selectedDate && (
          <>
            <Text style={[styles.sectionLabel, { color: theme.text }]}>Select Time Slot *</Text>
            {slotsForDate.length > 0 ? (
              <View style={styles.slotsGrid}>
                {slotsForDate.map((slot) => (
                  <TouchableOpacity
                    key={slot.time}
                    style={[
                      styles.slotChip,
                      {
                        backgroundColor: selectedTime === slot.time ? theme.primary : theme.surface,
                        borderColor: selectedTime === slot.time ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setSelectedTime(slot.time)}
                  >
                    <Text style={[
                      styles.slotText,
                      { color: selectedTime === slot.time ? '#FFFFFF' : theme.text },
                    ]}>
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={[styles.noSlots, { color: theme.textLight }]}>
                No available slots on this date.
              </Text>
            )}
          </>
        )}

        <TouchableOpacity
          style={[styles.sendButton, { backgroundColor: theme.primary }]}
          onPress={handleSend}
          disabled={sending}
          activeOpacity={0.8}
        >
          {sending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="send" size={18} color="#FFFFFF" />
              <Text style={styles.sendText}>Send Request</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 16, paddingBottom: 20, paddingHorizontal: 16,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  backBtn: { marginBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  scroll: { padding: 16, paddingBottom: 40 },
  personCard: {
    flexDirection: 'row', alignItems: 'center', padding: 14,
    borderRadius: 12, marginBottom: 20,
  },
  personInfo: { flex: 1, marginLeft: 12, gap: 2 },
  personName: { fontSize: 16, fontWeight: '700' },
  personDetail: { fontSize: 11, marginTop: 2 },
  sectionLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12 },
  input: {
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 12, fontSize: 15,
  },
  textArea: { minHeight: 80 },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  slotChip: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, borderWidth: 1,
  },
  slotText: { fontSize: 14, fontWeight: '600' },
  noSlots: { fontSize: 13, padding: 10 },
  sendButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 15, borderRadius: 12, gap: 8, marginTop: 24,
  },
  sendText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});
