import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { typography } from '../typography';

const { width } = Dimensions.get('window');

export interface ProjectsSectionProps {
  theme?: 'light' | 'dark';
}

// Native-optimized icon components (simplified for performance)
const OTPIcon = ({ size = 48, color }: { size?: number; color: string }) => (
  <View style={[{
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 8,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  }]}>
    <View style={{
      width: size * 0.6,
      height: size * 0.4,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 4,
    }}>
      <View style={{ width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2 }} />
      <View style={{ width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2 }} />
      <View style={{ width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2 }} />
    </View>
  </View>
);

const KafkaIcon = ({ size = 48, color }: { size?: number; color: string }) => (
  <View style={[{
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 8,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  }]}>
    <View style={{
      width: size * 0.7,
      height: size * 0.7,
      borderWidth: 2,
      borderColor: '#fff',
      borderRadius: size * 0.35,
      position: 'relative',
    }}>
      <View style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -3,
        marginLeft: -3,
        width: 6,
        height: 6,
        backgroundColor: '#fff',
        borderRadius: 3,
      }} />
    </View>
  </View>
);

const DesignSystemIcon = ({ size = 48, color }: { size?: number; color: string }) => (
  <View style={[{
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 8,
    opacity: 0.8,
    padding: size * 0.15,
  }]}>
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <View style={{ width: size * 0.25, height: size * 0.25, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 2, marginRight: 4 }} />
      <View style={{ width: size * 0.25, height: size * 0.25, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2, marginRight: 4 }} />
      <View style={{ width: size * 0.15, height: size * 0.25, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <View style={{ width: size * 0.4, height: size * 0.15, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 2, marginRight: 4 }} />
      <View style={{ width: size * 0.3, height: size * 0.15, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
    </View>
    <View style={{ flexDirection: 'row' }}>
      <View style={{ width: size * 0.2, height: size * 0.2, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: size * 0.1, marginRight: 4 }} />
      <View style={{ width: size * 0.25, height: size * 0.2, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 2, marginRight: 4 }} />
      <View style={{ width: size * 0.2, height: size * 0.15, backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
    </View>
  </View>
);

const HealthcareIcon = ({ size = 48, color }: { size?: number; color: string }) => (
  <View style={[{
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: size / 8,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  }]}>
    <View style={{
      width: size * 0.6,
      height: size * 0.6,
      position: 'relative',
    }}>
      {/* Cross symbol */}
      <View style={{
        position: 'absolute',
        top: '25%',
        left: '40%',
        width: '20%',
        height: '50%',
        backgroundColor: '#fff',
        borderRadius: 2,
      }} />
      <View style={{
        position: 'absolute',
        top: '40%',
        left: '25%',
        width: '50%',
        height: '20%',
        backgroundColor: '#fff',
        borderRadius: 2,
      }} />
    </View>
  </View>
);

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme = 'light' }) => {
  const themeColors = theme === 'light' ? colors.light : colors.dark;

  const projects = [
    {
      id: 'otp-service',
      title: 'Enterprise OTP Service',
      description: 'Scalable OTP generation and verification system with 99.9% delivery rate and enterprise-grade security.',
      techStack: ['Node.js', 'Redis', 'MongoDB', 'AWS SES'],
      icon: OTPIcon,
      accentColor: themeColors.primaryAccent,
    },
    {
      id: 'kafka-platform',
      title: 'Real-time Data Pipeline',
      description: 'High-throughput Kafka-based streaming platform processing 1M+ events per second with fault tolerance.',
      techStack: ['Apache Kafka', 'Spring Boot', 'PostgreSQL', 'Docker'],
      icon: KafkaIcon,
      accentColor: themeColors.secondaryAccent,
    },
    {
      id: 'design-system',
      title: 'Cross-Platform Design System',
      description: 'Unified component library supporting React, React Native, and Vue with automated documentation.',
      techStack: ['TypeScript', 'Storybook', 'Figma API', 'Lerna'],
      icon: DesignSystemIcon,
      accentColor: '#4ECDC4',
    },
    {
      id: 'healthcare-platform',
      title: 'Healthcare Data Platform',
      description: 'HIPAA-compliant patient data management system with ML-powered analytics and real-time monitoring.',
      techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
      icon: HealthcareIcon,
      accentColor: '#FF6B9D',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColors.secondaryBackground,
      paddingVertical: spacing[12],
      paddingHorizontal: spacing[4],
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[8],
    },
    title: {
      fontSize: typography.fontSizes['4xl'],
      fontWeight: typography.fontWeights.bold,
      color: themeColors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
    },
    subtitle: {
      fontSize: typography.fontSizes.lg,
      color: themeColors.textSecondary,
      textAlign: 'center',
      maxWidth: width * 0.8,
      lineHeight: typography.fontSizes.lg * 1.5,
    },
    projectsGrid: {
      paddingHorizontal: spacing[2],
    },
    projectCard: {
      backgroundColor: themeColors.surfaceBackground,
      borderRadius: 20,
      padding: spacing[6],
      marginHorizontal: spacing[2],
      width: width * 0.85,
      shadowColor: themeColors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: themeColors.glassBorder,
    },
    projectHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[4],
    },
    projectIcon: {
      marginRight: spacing[4],
    },
    projectTitle: {
      fontSize: typography.fontSizes['xl'],
      fontWeight: typography.fontWeights.bold,
      color: themeColors.textPrimary,
      flex: 1,
    },
    projectDescription: {
      fontSize: typography.fontSizes.base,
      color: themeColors.textSecondary,
      lineHeight: typography.fontSizes.base * 1.6,
      marginBottom: spacing[4],
    },
    techStack: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: spacing[2],
    },
    techTag: {
      backgroundColor: themeColors.glassBackground,
      borderWidth: 1,
      borderColor: themeColors.glassBorder,
      borderRadius: 12,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[1],
      marginRight: spacing[2],
      marginBottom: spacing[2],
    },
    techTagText: {
      fontSize: typography.fontSizes.sm,
      color: themeColors.textSecondary,
      fontWeight: typography.fontWeights.medium,
    },
    viewAllButton: {
      backgroundColor: themeColors.primaryAccent,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[4],
      borderRadius: 12,
      alignSelf: 'center',
      marginTop: spacing[8],
      shadowColor: themeColors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    viewAllButtonText: {
      color: '#FFFFFF',
      fontSize: typography.fontSizes.base,
      fontWeight: typography.fontWeights.semibold,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Featured{' '}
          <Text style={{ color: themeColors.primaryAccent }}>Projects</Text>
        </Text>
        <Text style={styles.subtitle}>
          Explore our portfolio of cutting-edge solutions that drive digital transformation and deliver measurable business value.
        </Text>
      </View>

      {/* Projects Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.projectsGrid}
        snapToInterval={width * 0.85 + spacing[4]}
        decelerationRate="fast"
      >
        {projects.map((project) => {
          const IconComponent = project.icon;
          return (
            <TouchableOpacity key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <View style={styles.projectIcon}>
                  <IconComponent size={48} color={project.accentColor} />
                </View>
                <Text style={styles.projectTitle}>{project.title}</Text>
              </View>

              <Text style={styles.projectDescription}>{project.description}</Text>

              <View style={styles.techStack}>
                {project.techStack.map((tech, index) => (
                  <View key={index} style={styles.techTag}>
                    <Text style={styles.techTagText}>{tech}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllButtonText}>View All Projects</Text>
      </TouchableOpacity>
    </View>
  );
};