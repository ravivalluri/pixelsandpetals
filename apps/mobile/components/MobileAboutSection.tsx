import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@pixelsandpetals/ui';

const skills = [
  { name: 'React Native', level: 95, color: colors.accentPop },
  { name: 'Next.js', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 88, color: '#3178C6' },
  { name: 'UI/UX Design', level: 85, color: '#FF6B6B' },
  { name: 'AI Integration', level: 80, color: '#4ECDC4' },
];

const SkillBar: React.FC<{ skill: typeof skills[0] }> = ({ skill }) => (
  <View style={styles.skillContainer}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <Text style={styles.skillLevel}>{skill.level}%</Text>
    </View>
    <View style={styles.skillBarContainer}>
      <View style={styles.skillBarBackground} />
      <View
        style={[
          styles.skillBarFill,
          { width: `${skill.level}%`, backgroundColor: skill.color }
        ]}
      />
    </View>
  </View>
);

export const MobileAboutSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.sectionSubtitle}>
          Passionate about creating digital experiences that make a difference
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            We are a team of dedicated professionals who believe in the power of
            technology to transform businesses and lives. Our approach combines
            cutting-edge technical expertise with thoughtful design to deliver
            solutions that truly make an impact.
          </Text>
        </View>

        <View style={styles.skillsContainer}>
          <Text style={styles.skillsTitle}>Core Expertise</Text>
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Projects Delivered</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5+</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Client Satisfaction</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.lightGray}10`,
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
    color: colors.coreDark,
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.mediumGray,
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
    color: colors.darkGray,
    lineHeight: 26,
    textAlign: 'center',
  },
  skillsContainer: {
    marginBottom: spacing[10],
  },
  skillsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.coreDark,
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
    color: colors.darkGray,
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mediumGray,
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
    backgroundColor: `${colors.lightGray}30`,
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
    color: colors.accentPop,
    marginBottom: spacing[1],
  },
  statLabel: {
    fontSize: 12,
    color: colors.mediumGray,
    textAlign: 'center',
    fontWeight: '500',
  },
});