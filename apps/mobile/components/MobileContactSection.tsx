import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { Button } from '../../../packages/ui/components/Button/Button.native';
import { useTheme } from '../contexts/ThemeContext';

export const MobileContactSection: React.FC = () => {
  const { colors } = useTheme();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you would typically send the form data to your backend
    Alert.alert(
      'Thank You!',
      'Your message has been sent. We\'ll get back to you soon!',
      [{ text: 'OK', onPress: () => setForm({ name: '', email: '', message: '' }) }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Let's Connect</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSubtle }]}>
          Ready to bring your ideas to life? Get in touch with us.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📧</Text>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSubtle }]}>Email</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>hello@pixelsandpetals.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📱</Text>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSubtle }]}>Phone</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>+1 (555) 123-4567</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🌍</Text>
            <View style={styles.contactDetails}>
              <Text style={[styles.contactLabel, { color: colors.textSubtle }]}>Location</Text>
              <Text style={[styles.contactValue, { color: colors.textPrimary }]}>San Francisco, CA</Text>
            </View>
          </View>
        </View>

        <View style={[styles.formContainer, {
          backgroundColor: colors.glassBackground,
          borderColor: colors.glassBorder
        }]}>
          <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Send us a message</Text>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Name</Text>
            <TextInput
              style={[styles.textInput, {
                backgroundColor: colors.surfaceBackground,
                color: colors.textPrimary,
                borderColor: colors.glassBorder
              }]}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              placeholder="Your name"
              placeholderTextColor={colors.textSubtle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
            <TextInput
              style={[styles.textInput, {
                backgroundColor: colors.surfaceBackground,
                color: colors.textPrimary,
                borderColor: colors.glassBorder
              }]}
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.textSubtle}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Message</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput, {
                backgroundColor: colors.surfaceBackground,
                color: colors.textPrimary,
                borderColor: colors.glassBorder
              }]}
              value={form.message}
              onChangeText={(text) => setForm({ ...form, message: text })}
              placeholder="Tell us about your project..."
              placeholderTextColor={colors.textSubtle}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <Button
            title="Send Message"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            style={styles.submitButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing[12],
    paddingHorizontal: spacing[6],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  content: {
    alignItems: 'stretch',
  },
  contactInfo: {
    marginBottom: spacing[10],
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[6],
    paddingHorizontal: spacing[4],
  },
  contactIcon: {
    fontSize: 24,
    marginRight: spacing[4],
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing[1],
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  formContainer: {
    borderRadius: 16,
    padding: spacing[6],
    borderWidth: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  inputContainer: {
    marginBottom: spacing[5],
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing[2],
  },
  textInput: {
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
    borderWidth: 1,
    minHeight: 48,
  },
  messageInput: {
    minHeight: 120,
    paddingTop: spacing[3],
  },
  submitButton: {
    marginTop: spacing[4],
  },
});