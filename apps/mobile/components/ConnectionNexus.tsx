import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Linking,
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Rect,
} from 'react-native-svg';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Icon Components
const EmailIcon = ({ size = 24, color = '#6699FF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={color}/>
  </Svg>
);

const PhoneIcon = ({ size = 24, color = '#6699FF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill={color}/>
  </Svg>
);

const LocationIcon = ({ size = 24, color = '#6699FF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill={color}/>
  </Svg>
);

const LinkedInIcon = ({ size = 24, color = '#6699FF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill={color}/>
  </Svg>
);

const GitHubIcon = ({ size = 24, color = '#6699FF' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 6.84 9.49c.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2z" fill={color}/>
  </Svg>
);

interface ContactMethod {
  title: string;
  value: string;
  icon: React.ReactNode;
  action: string;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const ConnectionNexus: React.FC = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactMethods: ContactMethod[] = [
    {
      title: "Email",
      value: "info@pixelspetals.com",
      icon: <EmailIcon size={24} color={colors.primaryAccent} />,
      action: "mailto:info@pixelspetals.com"
    },
    {
      title: "Phone",
      value: "+1 (619) 609-6099",
      icon: <PhoneIcon size={24} color={colors.primaryAccent} />,
      action: "tel:+16196096099"
    },
    {
      title: "Office",
      value: "San Diego, CA",
      icon: <LocationIcon size={24} color={colors.primaryAccent} />,
      action: "#"
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: <LinkedInIcon size={24} color={colors.primaryAccent} />,
      url: "https://www.linkedin.com/in/ravivalluri/"
    },
    {
      name: "GitHub",
      icon: <GitHubIcon size={24} color={colors.primaryAccent} />,
      url: "https://github.com/ravivalluri"
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Compose email
    const subject = formData.subject || 'Contact Form Submission';
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const emailUrl = `mailto:info@pixelspetals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailUrl).then(() => {
      Alert.alert(
        'Thank You!',
        'Your message has been prepared. Please send it from your email app.',
        [{ text: 'OK', onPress: () => setFormData({ name: '', email: '', subject: '', message: '' }) }]
      );
    }).catch(() => {
      Alert.alert('Error', 'Unable to open email app. Please contact us directly at info@pixelspetals.com');
    });
  };

  const handleContactPress = (action: string) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      Linking.openURL(action).catch(() => {
        Alert.alert('Error', 'Unable to open link');
      });
    }
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open link');
    });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      paddingVertical: spacing[12],
      paddingHorizontal: spacing[6],
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[10],
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
    },
    sectionSubtitle: {
      fontSize: 16,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.9,
    },
    scrollContainer: {
      paddingBottom: spacing[6],
    },
    formContainer: {
      backgroundColor: colors.glassBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[6],
      marginBottom: spacing[8],
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
    },
    formGroup: {
      marginBottom: spacing[5],
      position: 'relative',
    },
    formLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: spacing[2],
    },
    textInput: {
      backgroundColor: colors.surfaceBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
      fontSize: 16,
      color: colors.textPrimary,
      minHeight: 48,
    },
    textInputFocused: {
      borderColor: colors.primaryAccent,
      shadowColor: colors.primaryAccent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    textArea: {
      minHeight: 120,
      textAlignVertical: 'top',
      paddingTop: spacing[3],
    },
    submitButton: {
      backgroundColor: colors.primaryAccent,
      borderRadius: 16,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      alignItems: 'center',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
      marginTop: spacing[4],
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.surfaceBackground,
    },
    contactSection: {
      marginBottom: spacing[8],
    },
    sectionHeading: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: spacing[6],
    },
    contactMethodCard: {
      backgroundColor: colors.surfaceBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[5],
      marginBottom: spacing[4],
      flexDirection: 'row',
      alignItems: 'center',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    contactMethodIcon: {
      marginRight: spacing[4],
      backgroundColor: colors.glassBackground,
      padding: spacing[3],
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    contactMethodInfo: {
      flex: 1,
    },
    contactMethodTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: spacing[1],
    },
    contactMethodValue: {
      fontSize: 14,
      color: colors.textSubtle,
    },
    socialSection: {
      marginBottom: spacing[8],
    },
    socialLinksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[4],
    },
    socialLinkItem: {
      backgroundColor: colors.surfaceBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[4],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 56,
      minHeight: 56,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Connection Nexus</Text>
          <Text style={styles.sectionSubtitle}>
            Open a direct, transparent channel for communication
          </Text>
        </View>

        {/* Contact Form */}
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Your Name</Text>
            <TextInput
              style={[
                styles.textInput,
                focusedField === 'name' && styles.textInputFocused
              ]}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSubtle}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextInput
              style={[
                styles.textInput,
                focusedField === 'email' && styles.textInputFocused
              ]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSubtle}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Subject (Optional)</Text>
            <TextInput
              style={[
                styles.textInput,
                focusedField === 'subject' && styles.textInputFocused
              ]}
              value={formData.subject}
              onChangeText={(value) => handleInputChange('subject', value)}
              onFocus={() => setFocusedField('subject')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter subject"
              placeholderTextColor={colors.textSubtle}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Your Message</Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textArea,
                focusedField === 'message' && styles.textInputFocused
              ]}
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell us about your project..."
              placeholderTextColor={colors.textSubtle}
              multiline
              numberOfLines={5}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Direct Contact Methods */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionHeading}>Direct Channels</Text>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactMethodCard}
              onPress={() => handleContactPress(method.action)}
              activeOpacity={0.8}
            >
              <View style={styles.contactMethodIcon}>
                {method.icon}
              </View>
              <View style={styles.contactMethodInfo}>
                <Text style={styles.contactMethodTitle}>
                  {method.title}
                </Text>
                <Text style={styles.contactMethodValue}>
                  {method.value}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Links */}
        <View style={styles.socialSection}>
          <Text style={styles.sectionHeading}>Connect</Text>
          <View style={styles.socialLinksContainer}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialLinkItem}
                onPress={() => handleSocialPress(link.url)}
                activeOpacity={0.8}
              >
                {link.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ConnectionNexus;