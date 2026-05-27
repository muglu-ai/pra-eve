import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { useTheme, useEvent } from '../../hooks/useConfig';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const event = useEvent();
  const { login, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    setLocalError('');
    clearError();
    if (!email.trim()) { setLocalError('Please enter your email'); return; }
    if (!password.trim()) { setLocalError('Please enter your password'); return; }
    try {
      await login({ email: email.trim(), password });
    } catch { /* handled by context */ }
  };

  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: theme.primary }]}>
          <View style={styles.heroDecor}>
            <Text style={styles.heroEmoji}>🚌</Text>
            <Text style={styles.heroEmoji2}>🚇</Text>
          </View>
          <Text style={styles.heroName}>{event.name}</Text>
          <View style={styles.heroAccent} />
          <Text style={styles.heroTagline}>{event.tagline}</Text>
          <View style={styles.heroInfo}>
            <View style={styles.heroPill}>
              <Ionicons name="calendar" size={12} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroPillText}>{formatDate(event.startDate, event.endDate)}</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="location" size={12} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroPillText}>{event.venue.city}</Text>
            </View>
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.formTitle, { color: theme.text }]}>Welcome</Text>
          <Text style={[styles.formSub, { color: theme.textSecondary }]}>Sign in to access the event</Text>

          {displayError ? (
            <View style={[styles.errorBox, { backgroundColor: theme.error + '12' }]}>
              <Ionicons name="alert-circle" size={16} color={theme.error} />
              <Text style={[styles.errorText, { color: theme.error }]}>{displayError}</Text>
            </View>
          ) : null}

          <View style={[styles.inputWrap, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="mail-outline" size={18} color={theme.textLight} />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Email address"
              placeholderTextColor={theme.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Email"
            />
          </View>

          <View style={[styles.inputWrap, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="lock-closed-outline" size={18} color={theme.textLight} />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Password"
              placeholderTextColor={theme.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessibilityLabel="Password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={theme.textLight} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotLink}>
            <Text style={[styles.forgotText, { color: theme.secondary }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.signInBtn, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Sign In"
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.signInText}>Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View style={[styles.demoCard, { backgroundColor: theme.secondary + '08', borderColor: theme.secondary + '20' }]}>
            <Ionicons name="information-circle-outline" size={16} color={theme.secondary} />
            <View style={styles.demoInfo}>
              <Text style={[styles.demoLabel, { color: theme.secondary }]}>Demo Credentials</Text>
              <Text style={[styles.demoText, { color: theme.textSecondary }]}>demo@prawaas.com / demo1234</Text>
            </View>
          </View>

          <View style={styles.registerRow}>
            <Text style={[styles.registerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.registerLink, { color: theme.secondary }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

function formatDate(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${s.getDate()}-${e.getDate()} ${months[s.getMonth()]} ${s.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  hero: {
    paddingTop: 48, paddingBottom: 32, paddingHorizontal: 28,
    borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden', position: 'relative',
  },
  heroDecor: { position: 'absolute', right: 16, top: 20, opacity: 0.1 },
  heroEmoji: { fontSize: 56 },
  heroEmoji2: { fontSize: 44, marginTop: 8 },
  heroName: { fontSize: 34, fontWeight: '800', color: '#FFF', letterSpacing: 0.5 },
  heroAccent: { width: 36, height: 3.5, backgroundColor: '#F97316', borderRadius: 2, marginVertical: 10 },
  heroTagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500', lineHeight: 20, marginBottom: 16 },
  heroInfo: { flexDirection: 'row', gap: 8 },
  heroPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5,
  },
  heroPillText: { color: '#FFF', fontSize: 12, fontWeight: '500' },

  form: { padding: 24 },
  formTitle: { fontSize: 24, fontWeight: '700', marginBottom: 2 },
  formSub: { fontSize: 14, marginBottom: 20 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    padding: 12, borderRadius: 10, marginBottom: 16,
  },
  errorText: { fontSize: 13, flex: 1 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, marginBottom: 14,
  },
  input: { flex: 1, fontSize: 15, padding: 0 },
  forgotLink: { alignSelf: 'flex-end', marginBottom: 22 },
  forgotText: { fontSize: 13, fontWeight: '600' },
  signInBtn: { paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 18 },
  signInText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  demoCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 22,
  },
  demoInfo: { flex: 1 },
  demoLabel: { fontSize: 11, fontWeight: '700' },
  demoText: { fontSize: 12, marginTop: 1 },
  registerRow: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 },
  registerText: { fontSize: 14 },
  registerLink: { fontSize: 14, fontWeight: '700' },
});
