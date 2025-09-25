import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
} from 'react-native-svg';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// SVG Icons adapted from web app
const OTPIcon = ({ size = 48, color = '#FF6B6B' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="8" y="12" width="48" height="40" rx="4" fill={color} opacity="0.1"/>
    <Rect x="12" y="16" width="40" height="32" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="20" cy="32" r="3" fill={color}/>
    <Circle cx="32" cy="32" r="3" fill={color}/>
    <Circle cx="44" cy="32" r="3" fill={color}/>
    <Rect x="16" y="40" width="32" height="2" rx="1" fill={color} opacity="0.6"/>
    <Path d="M32 8L36 12H28L32 8Z" fill={color}/>
    <Rect x="30" y="52" width="4" height="8" rx="2" fill={color} opacity="0.7"/>
  </Svg>
);

const KafkaIcon = ({ size = 48, color = '#4ECDC4' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="16" cy="20" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="48" cy="20" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="16" cy="44" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="48" cy="44" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="32" cy="32" r="4" fill={color}/>
    <Path d="M22 20L26 32M38 20L36 32M22 44L26 32M38 44L36 32" stroke={color} strokeWidth="2"/>
    <Rect x="12" y="16" width="8" height="8" rx="2" fill={color} opacity="0.3"/>
    <Rect x="44" y="16" width="8" height="8" rx="2" fill={color} opacity="0.3"/>
    <Rect x="12" y="40" width="8" height="8" rx="2" fill={color} opacity="0.3"/>
    <Rect x="44" y="40" width="8" height="8" rx="2" fill={color} opacity="0.3"/>
  </Svg>
);

const DesignSystemIcon = ({ size = 48, color = '#45B7D1' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="8" y="8" width="16" height="16" rx="3" fill={color} opacity="0.8"/>
    <Rect x="28" y="8" width="16" height="16" rx="3" fill={color} opacity="0.6"/>
    <Rect x="48" y="8" width="8" height="16" rx="3" fill={color} opacity="0.4"/>
    <Rect x="8" y="28" width="24" height="8" rx="2" fill={color} opacity="0.7"/>
    <Rect x="36" y="28" width="20" height="8" rx="2" fill={color} opacity="0.5"/>
    <Circle cx="16" cy="48" r="6" fill={color} opacity="0.6"/>
    <Rect x="28" y="42" width="12" height="12" rx="2" fill={color} opacity="0.8"/>
    <Rect x="44" y="44" width="12" height="8" rx="2" fill={color} opacity="0.4"/>
  </Svg>
);

const HealthcareIcon = ({ size = 48, color = '#96CEB4' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="8" y="12" width="48" height="36" rx="4" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M16 24L20 28L28 20" stroke={color} strokeWidth="2" fill="none"/>
    <Rect x="36" y="20" width="16" height="4" rx="1" fill={color} opacity="0.6"/>
    <Rect x="36" y="26" width="12" height="4" rx="1" fill={color} opacity="0.4"/>
    <Circle cx="20" cy="38" r="3" fill={color} opacity="0.7"/>
    <Rect x="28" y="35" width="8" height="6" rx="1" fill={color} opacity="0.5"/>
    <Rect x="40" y="36" width="12" height="4" rx="1" fill={color} opacity="0.6"/>
    <Path d="M32 4V8M32 8L28 12M32 8L36 12" stroke={color} strokeWidth="2"/>
    <Rect x="20" y="52" width="24" height="2" rx="1" fill={color} opacity="0.5"/>
  </Svg>
);

const EcommerceIcon = ({ size = 48, color = '#FECA57' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="12" y="8" width="24" height="40" rx="4" stroke={color} strokeWidth="2" fill="none"/>
    <Rect x="28" y="16" width="24" height="40" rx="4" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="24" cy="12" r="1" fill={color}/>
    <Circle cx="40" cy="20" r="1" fill={color}/>
    <Rect x="16" y="20" width="16" height="8" rx="2" fill={color} opacity="0.3"/>
    <Rect x="32" y="28" width="16" height="8" rx="2" fill={color} opacity="0.5"/>
    <Rect x="16" y="32" width="8" height="2" rx="1" fill={color} opacity="0.6"/>
    <Rect x="26" y="32" width="6" height="2" rx="1" fill={color} opacity="0.4"/>
    <Rect x="32" y="40" width="8" height="2" rx="1" fill={color} opacity="0.7"/>
    <Rect x="42" y="40" width="6" height="2" rx="1" fill={color} opacity="0.5"/>
  </Svg>
);

const AIIcon = ({ size = 48, color = '#A55EEA' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="16" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="32" cy="32" r="8" fill={color} opacity="0.3"/>
    <Circle cx="32" cy="32" r="3" fill={color}/>
    <Path d="M32 8V16M32 48V56M8 32H16M48 32H56" stroke={color} strokeWidth="2"/>
    <Path d="M19.6 19.6L25.2 25.2M38.8 38.8L44.4 44.4M44.4 19.6L38.8 25.2M25.2 38.8L19.6 44.4" stroke={color} strokeWidth="1.5"/>
    <Circle cx="32" cy="16" r="2" fill={color} opacity="0.6"/>
    <Circle cx="32" cy="48" r="2" fill={color} opacity="0.6"/>
    <Circle cx="16" cy="32" r="2" fill={color} opacity="0.6"/>
    <Circle cx="48" cy="32" r="2" fill={color} opacity="0.6"/>
  </Svg>
);

interface Solution {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  color: string;
}

interface SolutionCardProps extends Solution {
  onPress?: () => void;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  subtitle,
  icon,
  tags,
  color,
  onPress,
}) => {
  const { colors } = useTheme();

  const cardStyles = StyleSheet.create({
    card: {
      width: (width - spacing[6] * 2 - spacing[4]) / 2,
      backgroundColor: colors.surfaceBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      overflow: 'hidden',
      position: 'relative',
    },
    backgroundAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.5,
    },
    iconSection: {
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.glassBorder,
    },
    content: {
      padding: spacing[6],
      position: 'relative',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: spacing[2],
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: spacing[4],
    },
    tags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[2],
      marginBottom: spacing[3],
    },
    tag: {
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      borderRadius: 12,
      borderWidth: 1,
      backgroundColor: colors.surfaceBackground,
      borderColor: colors.glassBorder,
    },
    tagText: {
      fontSize: 12,
      color: colors.textSubtle,
      fontWeight: '500',
    },
    bottomAccent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
    },
  });

  return (
    <TouchableOpacity
      style={[
        cardStyles.card,
        {
          shadowColor: color,
          borderColor: `${color}40`,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Background gradient accent */}
      <View
        style={[
          cardStyles.backgroundAccent,
          {
            backgroundColor: `${color}15`,
          },
        ]}
      />

      {/* Icon section */}
      <View
        style={[
          cardStyles.iconSection,
          {
            backgroundColor: `${color}20`,
          },
        ]}
      >
        {icon}
      </View>

      {/* Content section */}
      <View style={cardStyles.content}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.subtitle}>{subtitle}</Text>

        {/* Tags */}
        <View style={cardStyles.tags}>
          {tags.map((tag, index) => (
            <View key={index} style={cardStyles.tag}>
              <Text style={cardStyles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Bottom accent line */}
        <View
          style={[
            cardStyles.bottomAccent,
            {
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const SolutionsSection: React.FC = () => {
  const { colors } = useTheme();

  const solutions: Solution[] = [
    {
      title: 'OTP Widget',
      subtitle: 'Secure authentication microservice',
      icon: <OTPIcon size={48} color="#FF6B6B" />,
      tags: ['React', 'AWS', 'Cognito'],
      color: '#FF6B6B',
    },
    {
      title: 'EKS Kafka Pipeline',
      subtitle: 'High-volume event streaming',
      icon: <KafkaIcon size={48} color="#4ECDC4" />,
      tags: ['Java', 'Kafka', 'EKS'],
      color: '#4ECDC4',
    },
    {
      title: 'Design System',
      subtitle: 'Pixels & Petals UI kit with React and React Native',
      icon: <DesignSystemIcon size={48} color="#45B7D1" />,
      tags: ['React', 'Figma', 'Storybook'],
      color: '#45B7D1',
    },
    {
      title: 'Healthcare Dashboard',
      subtitle: 'Patient data visualization platform',
      icon: <HealthcareIcon size={48} color="#96CEB4" />,
      tags: ['React', 'D3', 'TypeScript'],
      color: '#96CEB4',
    },
    {
      title: 'E-commerce Mobile App',
      subtitle: 'Cross-platform shopping experience',
      icon: <EcommerceIcon size={48} color="#FECA57" />,
      tags: ['React Native', 'Redux', 'Node.js'],
      color: '#FECA57',
    },
    {
      title: 'AI Content Generator',
      subtitle: 'Automated content creation tool',
      icon: <AIIcon size={48} color="#A55EEA" />,
      tags: ['Python', 'TensorFlow', 'FastAPI'],
      color: '#A55EEA',
    },
  ];

  const handleSolutionPress = (title: string) => {
    // eslint-disable-next-line no-console
    console.log(`Tapped solution: ${title}`);
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
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.9,
    },
    scrollContainer: {
      paddingBottom: spacing[6],
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: spacing[4],
    },
  });

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Our Solutions</Text>
        <Text style={styles.sectionSubtitle}>
          Explore our portfolio of full-stack development, system design, and cloud engineering—real-world implementations that solve complex business challenges.
        </Text>
      </View>

      {/* Solutions Grid */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              {...solution}
              onPress={() => handleSolutionPress(solution.title)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SolutionsSection;
