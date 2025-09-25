import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const skills = [
  { name: 'React Native', level: 95 },
  { name: 'Next.js', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'AI Integration', level: 80 },
];

const skillColors = [
  '#6699FF',  // React Native - primary accent
  '#61DAFB',  // Next.js
  '#3178C6',  // TypeScript
  '#FF6B6B',  // UI/UX Design
  '#4ECDC4',  // AI Integration
];

const SkillBar: React.FC<{ skill: typeof skills[0], color: string }> = ({ skill, color }) => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.skillContainer}>
      <View style={styles.skillHeader}>
        <Text style={[styles.skillName, { color: colors.textSecondary }]}>{skill.name}</Text>
        <Text style={[styles.skillLevel, { color: colors.textSubtle }]}>{skill.level}%</Text>
      </View>
      <View style={styles.skillBarContainer}>
        <View style={[styles.skillBarBackground, { backgroundColor: `${colors.textSubtle}30` }]} />
        <View
          style={[
            styles.skillBarFill,
            { width: `${skill.level}%`, backgroundColor: color }
          ]}
        />
      </View>
    </View>
  );
};

export const MobileAboutSection: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: `${colors.surfaceBackground}10` }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>About Us</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSubtle }]}>
          Passionate about creating digital experiences that make a difference
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            We are a team of dedicated professionals who believe in the power of
            technology to transform businesses and lives. Our approach combines
            cutting-edge technical expertise with thoughtful design to deliver
            solutions that truly make an impact.
          </Text>
        </View>

        <View style={styles.skillsContainer}>
          <Text style={[styles.skillsTitle, { color: colors.textPrimary }]}>Core Expertise</Text>
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} color={skillColors[index]} />
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primaryAccent }]}>50+</Text>
            <Text style={[styles.statLabel, { color: colors.textSubtle }]}>Projects Delivered</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primaryAccent }]}>5+</Text>
            <Text style={[styles.statLabel, { color: colors.textSubtle }]}>Years Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: colors.primaryAccent }]}>100%</Text>
            <Text style={[styles.statLabel, { color: colors.textSubtle }]}>Client Satisfaction</Text>
          </View>
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
  descriptionContainer: {
    marginBottom: spacing[10],
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
  skillsContainer: {
    marginBottom: spacing[10],
  },
  skillsTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  skillContainer: {
    marginBottom: spacing[4],
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  skillName: {
    fontSize: 16,
    fontWeight: '500',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: '600',
  },
  skillBarContainer: {
    position: 'relative',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  skillBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skillBarFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});