import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius } from '..';
import { Button } from '../Button';

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageSource?: { uri: string } | number;
  client?: string;
  industry?: string;
  result?: string;
  metrics?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  tags?: string[];
  onPress?: () => void;
}

export interface SmartPortfolioGridProps {
  projects: PortfolioProject[];
  columns?: number;
  style?: any;
  onProjectClick?: (project: PortfolioProject) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing[8]) / 2 - spacing[2];

export const SmartPortfolioGrid: React.FC<SmartPortfolioGridProps> = ({
  projects,
  columns = 2,
  style,
  onProjectClick,
}) => {
  const [quickViewProject, setQuickViewProject] = useState<PortfolioProject | null>(null);

  const handleQuickView = (project: PortfolioProject) => {
    setQuickViewProject(project);
  };

  const handleProjectPress = (project: PortfolioProject) => {
    if (project.onPress) {
      project.onPress();
    }
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  const closeQuickView = () => {
    setQuickViewProject(null);
  };

  const renderProject = (project: PortfolioProject) => (
    <TouchableOpacity
      key={project.id}
      style={styles.projectCard}
      onPress={() => handleProjectPress(project)}
      onLongPress={() => handleQuickView(project)}
      activeOpacity={0.9}
    >
      {/* Project Image */}
      {project.imageSource && (
        <Image
          source={project.imageSource}
          style={styles.projectImage}
          resizeMode="cover"
        />
      )}

      {/* Content */}
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle} numberOfLines={2}>
          {project.title}
        </Text>

        <Text style={styles.projectDescription} numberOfLines={3}>
          {project.description}
        </Text>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsContainer}
            contentContainerStyle={styles.tagsContent}
          >
            {project.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {project.tags.length > 3 && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>+{project.tags.length - 3}</Text>
              </View>
            )}
          </ScrollView>
        )}

        {/* Quick View Button */}
        <TouchableOpacity
          style={styles.quickViewButton}
          onPress={() => handleQuickView(project)}
        >
          <Text style={styles.quickViewText}>Quick View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderQuickViewModal = () => {
    if (!quickViewProject) return null;

    return (
      <Modal
        visible={!!quickViewProject}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeQuickView}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Project Details</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeQuickView}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Project Image */}
            {quickViewProject.imageSource && (
              <Image
                source={quickViewProject.imageSource}
                style={styles.modalImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.modalDetails}>
              <Text style={styles.modalProjectTitle}>
                {quickViewProject.title}
              </Text>

              <Text style={styles.modalProjectDescription}>
                {quickViewProject.description}
              </Text>

              {/* Quick Stats */}
              {quickViewProject.metrics && quickViewProject.metrics.length > 0 && (
                <View style={styles.metricsContainer}>
                  <Text style={styles.metricsTitle}>Key Metrics</Text>
                  <View style={styles.metricsGrid}>
                    {quickViewProject.metrics.map((metric, index) => (
                      <View key={index} style={styles.metricItem}>
                        <Text style={styles.metricLabel}>
                          {metric.icon && <Text>{metric.icon} </Text>}
                          {metric.label}
                        </Text>
                        <Text style={styles.metricValue}>
                          {metric.value}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Project Info */}
              <View style={styles.projectInfo}>
                {quickViewProject.client && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Client:</Text>
                    <Text style={styles.infoValue}>{quickViewProject.client}</Text>
                  </View>
                )}

                {quickViewProject.industry && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Industry:</Text>
                    <Text style={styles.infoValue}>{quickViewProject.industry}</Text>
                  </View>
                )}

                {quickViewProject.result && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Result:</Text>
                    <Text style={styles.resultValue}>📈 {quickViewProject.result}</Text>
                  </View>
                )}
              </View>

              {/* All Tags */}
              {quickViewProject.tags && quickViewProject.tags.length > 0 && (
                <View style={styles.allTagsContainer}>
                  <Text style={styles.tagsTitle}>Technologies</Text>
                  <View style={styles.allTagsGrid}>
                    {quickViewProject.tags.map((tag, index) => (
                      <View key={index} style={styles.modalTag}>
                        <Text style={styles.modalTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <Button
                title="View Full Project"
                onPress={() => {
                  closeQuickView();
                  handleProjectPress(quickViewProject);
                }}
                style={styles.fullProjectButton}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.grid}>
        {projects.map(renderProject)}
      </View>
      {renderQuickViewModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing[4],
    justifyContent: 'space-between',
  },

  projectCard: {
    width: cardWidth,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginBottom: spacing[4],
    overflow: 'hidden',
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  projectImage: {
    width: '100%',
    height: 140,
  },

  projectContent: {
    padding: spacing[4],
  },

  projectTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    marginBottom: spacing[2],
    lineHeight: typography.lineHeights.tight,
  },

  projectDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[3],
  },

  tagsContainer: {
    marginBottom: spacing[3],
  },

  tagsContent: {
    flexDirection: 'row',
  },

  tag: {
    backgroundColor: `${colors.accentPop}15`,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
    marginRight: spacing[1],
  },

  tagText: {
    fontSize: typography.fontSizes.xs,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.medium,
  },

  quickViewButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing[1],
  },

  quickViewText: {
    fontSize: typography.fontSizes.xs,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.medium,
    textDecorationLine: 'underline',
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: typography.fontSizes.base,
    color: colors.darkGray,
  },

  modalContent: {
    flex: 1,
  },

  modalImage: {
    width: '100%',
    height: 200,
  },

  modalDetails: {
    padding: spacing[6],
  },

  modalProjectTitle: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    marginBottom: spacing[3],
  },

  modalProjectDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[6],
  },

  metricsContainer: {
    marginBottom: spacing[6],
  },

  metricsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
    marginBottom: spacing[3],
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  metricItem: {
    width: '48%',
    backgroundColor: `${colors.accentPop}10`,
    padding: spacing[3],
    borderRadius: borderRadius.md,
    marginBottom: spacing[2],
    alignItems: 'center',
  },

  metricLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.mediumGray,
    fontWeight: typography.fontWeights.medium,
    textAlign: 'center',
    marginBottom: spacing[1],
  },

  metricValue: {
    fontSize: typography.fontSizes.lg,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.bold,
    textAlign: 'center',
  },

  projectInfo: {
    marginBottom: spacing[6],
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
    paddingVertical: spacing[1],
  },

  infoLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    fontWeight: typography.fontWeights.medium,
  },

  infoValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.coreDark,
    fontWeight: typography.fontWeights.medium,
    flex: 1,
    textAlign: 'right',
  },

  resultValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.semibold,
    flex: 1,
    textAlign: 'right',
  },

  allTagsContainer: {
    marginBottom: spacing[6],
  },

  tagsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
    marginBottom: spacing[3],
  },

  allTagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  modalTag: {
    backgroundColor: `${colors.accentPop}15`,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.md,
    margin: spacing[1],
  },

  modalTagText: {
    fontSize: typography.fontSizes.sm,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.medium,
  },

  fullProjectButton: {
    marginTop: spacing[4],
  },
});