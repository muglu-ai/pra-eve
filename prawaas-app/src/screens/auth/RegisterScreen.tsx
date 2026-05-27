import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { useTheme, useEvent } from '../../hooks/useConfig';
import { networkingFilters } from '../../data/mockData';

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const event = useEvent();
  const { register, isLoading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [category, setCategory] = useState('DELEGATE');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const categories = networkingFilters.filter((f) => f.key !== 'all');

  const handleRegister = async () => {
    setLocalError('');
    clearError();

    if (!name.trim()) { setLocalError('Please enter your name'); return; }
    if (!email.trim()) { setLocalError('Please enter your email'); return; }
    if (!phone.trim()) { setLocalError('Please enter your phone number'); return; }
    if (password.length < 6) { setLocalError('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { setLocalError('Passwords do not match'); return; }

    try {
      const registeredEmail = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        category,
        designation: designation.trim() || undefined,
        organization: organization.trim() || undefined,
      });
      navigation.navigate('OtpVerification', { email: registeredEmail });
    } catch {
      // error handled by context
    }
  };

  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSub}>Join {event.name}</Text>
        </View>

        <View style={styles.form}>
          {displayError ? (
            <View style={[styles.errorBox, { backgroundColor: theme.error + '15' }]}>
              <Ionicons name="alert-circle" size={18} color={theme.error} />
              <Text style={[styles.errorText, { color: theme.error }]}>{displayError}</Text>
            </View>
          ) : null}

          <InputField label="Full Name *" icon="person-outline" value={name} onChangeText={setName} theme={theme} />
          <InputField label="Email *" icon="mail-outline" value={email} onChangeText={setEmail} theme={theme} keyboardType="email-address" />
          <InputField label="Phone *" icon="call-outline" value={phone} onChangeText={setPhone} theme={theme} keyboardType="phone-pad" />

          <Text style={[styles.label, { color: theme.text }]}>Category *</Text>
          <TouchableOpacity
            style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.surface }]}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Ionicons name="ribbon-outline" size={20} color={theme.textLight} style={styles.inputIcon} />
            <Text style={[styles.inputText, { color: theme.text }]}>{category}</Text>
            <Ionicons name={showCategories ? 'chevron-up' : 'chevron-down'} size={20} color={theme.textLight} />
          </TouchableOpacity>
          {showCategories && (
            <View style={[styles.dropdown, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.key}
                  style={[styles.dropdownItem, category === cat.label.toUpperCase() && { backgroundColor: theme.primary + '12' }]}
                  onPress={() => { setCategory(cat.label.toUpperCase()); setShowCategories(false); }}
                >
                  <Text style={[styles.dropdownText, { color: theme.text }]}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <InputField label="Organization" icon="business-outline" value={organization} onChangeText={setOrganization} theme={theme} />
          <InputField label="Designation" icon="briefcase-outline" value={designation} onChangeText={setDesignation} theme={theme} />

          <Text style={[styles.label, { color: theme.text }]}>Password *</Text>
          <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.surface }]}>
            <Ionicons name="lock-closed-outline" size={20} color={theme.textLight} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Min. 6 characters"
              placeholderTextColor={theme.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.textLight} />
            </TouchableOpacity>
          </View>

          <InputField label="Confirm Password *" icon="lock-closed-outline" value={confirmPassword} onChangeText={setConfirmPassword} theme={theme} secureTextEntry />

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: theme.primary }]}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={[styles.loginText, { color: theme.textSecondary }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.loginLink, { color: theme.secondary }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField: React.FC<{
  label: string; icon: string; value: string; onChangeText: (t: string) => void;
  theme: any; keyboardType?: any; secureTextEntry?: boolean;
}> = ({ label, icon, value, onChangeText, theme, keyboardType, secureTextEntry }) => (
  <>
    <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    <View style={[styles.inputContainer, { borderColor: theme.border, backgroundColor: theme.surface }]}>
      <Ionicons name={icon as any} size={20} color={theme.textLight} style={styles.inputIcon} />
      <TextInput
        style={[styles.input, { color: theme.text }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'}
        placeholderTextColor={theme.textLight}
      />
    </View>
  </>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  header: {
    paddingTop: 20, paddingBottom: 30, paddingHorizontal: 24,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
  },
  backButton: { marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  form: { padding: 24 },
  errorBox: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderRadius: 10, marginBottom: 16, gap: 8,
  },
  errorText: { fontSize: 13, flex: 1 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, padding: 0 },
  inputText: { flex: 1, fontSize: 15 },
  dropdown: {
    borderWidth: 1, borderRadius: 10, marginTop: -10, marginBottom: 14, overflow: 'hidden',
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 11 },
  dropdownText: { fontSize: 14 },
  registerButton: {
    paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 8, marginBottom: 20,
  },
  registerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 30 },
  loginText: { fontSize: 14 },
  loginLink: { fontSize: 14, fontWeight: '700' },
});
