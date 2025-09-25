import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const projects = [
  {
    id: 'ai-innovation',
    title: 'AI & Innovation',
    description: 'Cutting-edge AI solutions that transform businesses',
    icon: '🤖',
    features: ['Machine Learning', 'Natural Language Processing', 'Computer Vision'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that users love',
    icon: '🎨',
    features: ['User Research', 'Wireframing', 'Interactive Design'],
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Cross-platform mobile apps that perform',
    icon: '📱',
    features: ['React Native', 'iOS & Android', 'Cross-Platform'],
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Modern web applications built for scale',
    icon: '🌐',
    features: ['React & Next.js', 'Full-Stack', 'Performance Optimization'],
  },
];

export const MobileProjectsSection: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Our Solutions</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSubtle }]}>
          Comprehensive digital services tailored to your needs
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.projectsContainer}
        style={styles.projectsScroll}
      >
        {projects.map((project) => (
          <View key={project.id} style={[styles.projectCard, {
            backgroundColor: colors.surfaceBackground,
            borderColor: colors.glassBorder,
            shadowColor: colors.shadowColor
          }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.projectIcon}>{project.icon}</Text>
              <Text style={[styles.projectTitle, { color: colors.textPrimary }]}>{project.title}</Text>
            </View>

            <Text style={[styles.projectDescription, { color: colors.textSubtle }]}>
              {project.description}
            </Text>

            <View style={styles.featuresContainer}>
              {project.features.map((feature, index) => (
                <View key={index} style={[styles.featureTag, {
                  backgroundColor: `${colors.primaryAccent}15`
                }]}>
                  <Text style={[styles.featureText, { color: colors.primaryAccent }]}>{feature}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <Text style={[styles.learnMore, { color: colors.primaryAccent }]}>Learn More →</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  projectsScroll: {
    flexGrow: 0,
  },
  projectsContainer: {
    paddingLeft: spacing[6],
    paddingRight: spacing[2],
  },
  projectCard: {
    width: 280,
    borderRadius: 16,
    padding: spacing[6],
    marginRight: spacing[4],
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  projectIcon: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  projectDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing[6],
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  featureTag: {
    borderRadius: 12,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    margin: spacing[1],
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardFooter: {
    alignItems: 'center',
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '600',
  },
});