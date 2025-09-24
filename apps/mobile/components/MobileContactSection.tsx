import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing } from '@pixelsandpetals/ui';
import { Button } from '../../../packages/ui/components/Button/Button.native';

export const MobileContactSection: React.FC = () => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Let's Connect</Text>
        <Text style={styles.sectionSubtitle}>
          Ready to bring your ideas to life? Get in touch with us.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📧</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>hello@pixelsandpetals.com</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📱</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+1 (555) 123-4567</Text>
            </View>
          </View>

          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🌍</Text>
            <View style={styles.contactDetails}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>San Francisco, CA</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Send us a message</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
              placeholder="Your name"
              placeholderTextColor={colors.mediumGray}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.mediumGray}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.textInput, styles.messageInput]}
              value={form.message}
              onChangeText={(text) => setForm({ ...form, message: text })}
              placeholder="Tell us about your project..."
              placeholderTextColor={colors.mediumGray}
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
    backgroundColor: colors.coreDark,
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
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.lightGray,
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
    color: colors.lightGray,
    marginBottom: spacing[1],
  },
  contactValue: {
    fontSize: 16,
    color: colors.background,
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: `${colors.background}10`,
    borderRadius: 16,
    padding: spacing[6],
    borderWidth: 1,
    borderColor: `${colors.lightGray}20`,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  inputContainer: {
    marginBottom: spacing[5],
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.lightGray,
    marginBottom: spacing[2],
  },
  textInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    fontSize: 16,
    color: colors.coreDark,
    borderWidth: 1,
    borderColor: `${colors.lightGray}30`,
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