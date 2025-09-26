import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';
import { useContent, useContentItem } from '../hooks/useContent';

// Fallback projects if API fails
const fallbackProjects = [
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

// Icon mapping for projects from API
const projectIconMap: Record<string, string> = {
  'otp-widget': '🔐',
  'eks-kafka-pipeline': '⚡',
  'design-system': '🎨',
  'healthcare-dashboard': '🏥',
  'e-commerce-mobile-app': '🛒',
  'ai-content-generator': '🤖',
};

export const MobileProjectsSection: React.FC = () => {
  const { colors } = useTheme();
  const { content: projectsContent, loading: sectionLoading, error: sectionError } = useContentItem(undefined, 'projects', 'page');
  const { content: projectItems, loading: projectsLoading, error: projectsError } = useContent({ type: 'project', status: 'published' });

  // Transform API projects to mobile format
  const dynamicProjects = projectItems?.map(project => {
    const content = project.content;
    return {
      id: project.slug,
      title: project.title,
      description: content?.hero?.subtitle || content?.overview?.description || project.title,
      icon: projectIconMap[project.slug] || '📱',
      features: content?.technologies?.slice(0, 3) || content?.features?.slice(0, 3) || ['Technology', 'Innovation', 'Design'],
    };
  }) || [];

  // Use dynamic projects if available, otherwise fallback
  const projects = dynamicProjects.length > 0 ? dynamicProjects : fallbackProjects;

  // Get dynamic content or use fallbacks
  const sectionTitle = projectsContent?.content?.hero?.title || "Our Solutions";
  const sectionSubtitle = projectsContent?.content?.hero?.subtitle || "Comprehensive digital services tailored to your needs";

  const isLoading = sectionLoading || projectsLoading;
  const hasError = sectionError || projectsError;

  if (hasError) {
    console.warn('Mobile projects section error:', hasError);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{sectionTitle}</Text>
        <Text style={[styles.sectionSubtitle, { color: colors.textSubtle }]}>
          {sectionSubtitle}
        </Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={colors.primaryAccent}
            style={styles.loadingIndicator}
          />
        )}
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
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
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
  loadingIndicator: {
    marginTop: spacing[3],
  },
});