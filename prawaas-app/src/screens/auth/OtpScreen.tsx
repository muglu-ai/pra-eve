import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { useTheme, useEvent } from '../../hooks/useConfig';

interface OtpScreenProps {
  navigation: any;
  route: any;
}

const OTP_LENGTH = 6;

export const OtpScreen: React.FC<OtpScreenProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const event = useEvent();
  const { verifyOtp, isLoading, error, clearError } = useAuth();
  const email = route.params?.email || '';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    clearError();
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) return;

    try {
      await verifyOtp({ email, otp: code });
    } catch {
      // error handled by context
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
  };

  const otpComplete = otp.every((d) => d !== '');

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify Email</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: theme.primary + '12' }]}>
          <Ionicons name="shield-checkmark" size={40} color={theme.primary} />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>OTP Verification</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          We've sent a 6-digit code to{'\n'}
          <Text style={{ fontWeight: '700', color: theme.text }}>{email}</Text>
        </Text>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: theme.error + '15' }]}>
            <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(r) => { inputRefs.current[idx] = r; }}
              style={[
                styles.otpInput,
                {
                  borderColor: digit ? theme.primary : theme.border,
                  backgroundColor: theme.surface,
                  color: theme.text,
                },
              ]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.demoHint}>
          <Text style={[styles.demoText, { color: theme.textLight }]}>
            Demo OTP: 123456
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.verifyButton,
            { backgroundColor: otpComplete ? theme.primary : theme.border },
          ]}
          onPress={handleVerify}
          disabled={!otpComplete || isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[styles.verifyText, { color: otpComplete ? '#FFFFFF' : theme.textLight }]}>
              Verify & Continue
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={[styles.resendText, { color: theme.textSecondary }]}>
            Didn't receive the code?{' '}
          </Text>
          <TouchableOpacity onPress={handleResend} disabled={resendTimer > 0}>
            <Text style={[styles.resendLink, { color: resendTimer > 0 ? theme.textLight : theme.secondary }]}>
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 20, paddingBottom: 24, paddingHorizontal: 24,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
  },
  backButton: { marginBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  content: { padding: 24, alignItems: 'center' },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 10,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  errorBox: {
    padding: 12, borderRadius: 10, marginBottom: 16, width: '100%', alignItems: 'center',
  },
  errorText: { fontSize: 13 },
  otpRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  otpInput: {
    width: 46, height: 52, borderWidth: 2, borderRadius: 12,
    textAlign: 'center', fontSize: 22, fontWeight: '700',
  },
  demoHint: { marginBottom: 24 },
  demoText: { fontSize: 12 },
  verifyButton: {
    paddingVertical: 15, borderRadius: 12, alignItems: 'center', width: '100%', marginBottom: 20,
  },
  verifyText: { fontSize: 16, fontWeight: '700' },
  resendRow: { flexDirection: 'row' },
  resendText: { fontSize: 13 },
  resendLink: { fontSize: 13, fontWeight: '700' },
});
