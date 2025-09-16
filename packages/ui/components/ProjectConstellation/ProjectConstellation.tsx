import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, Animated } from 'react-native';
import { colors, typography, spacing } from '../../tokens';

export interface ProjectStar {
  id: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  impactMetric: {
    label: string;
    value: string;
    icon: string;
  };
  description: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  imageUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  technologies: string[];
  connections: string[]; // IDs of connected projects
}

export interface ProjectConstellationProps {
  projects: ProjectStar[];
  onProjectClick?: (project: ProjectStar) => void;
  onFilterChange?: (filters: any) => void;
  style?: any;
}

export const ProjectConstellation: React.FC<ProjectConstellationProps> = ({
  projects,
  onProjectClick,
  onFilterChange,
  style,
}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    services: [] as string[],
    industries: [] as string[],
  });
  const [deepDiveProject, setDeepDiveProject] = useState<ProjectStar | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [quickViewProject, setQuickViewProject] = useState<ProjectStar | null>(null);

  // Filter projects based on selected filters
  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const serviceMatch = selectedFilters.services.length === 0 ||
        selectedFilters.services.some(service => project.services.includes(service));
      const industryMatch = selectedFilters.industries.length === 0 ||
        selectedFilters.industries.includes(project.industry);
      return serviceMatch && industryMatch;
    });
  }, [projects, selectedFilters]);

  // Get all unique filter options
  const filterOptions = React.useMemo(() => {
    const services = [...new Set(projects.flatMap(p => p.services))];
    const industries = [...new Set(projects.map(p => p.industry))];
    return { services, industries };
  }, [projects]);

  const handleFilterToggle = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      const newFilters = { ...prev, [category]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleProjectPress = (project: ProjectStar) => {
    setDeepDiveProject(project);
    onProjectClick?.(project);
  };

  const handleProjectLongPress = (project: ProjectStar) => {
    setQuickViewProject(project);
  };

  const renderProjectTile = (project: ProjectStar, index: number) => {
    return (
      <TouchableOpacity
        key={project.id}
        style={[
          styles.projectTile,
          { marginBottom: spacing[4] }
        ]}
        onPress={() => handleProjectPress(project)}
        onLongPress={() => handleProjectLongPress(project)}
        activeOpacity={0.8}
      >
        {/* Nebula background effect */}
        <View style={styles.nebulaBackground} />

        <View style={styles.tileContent}>
          {/* Project header */}
          <View style={styles.projectHeader}>
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectClient}>Client: {project.client}</Text>
              <Text style={styles.projectIndustry}>{project.industry}</Text>
            </View>
          </View>

          {/* Impact metric */}
          <View style={styles.impactMetric}>
            <Text style={styles.impactIcon}>{project.impactMetric.icon}</Text>
            <View style={styles.impactText}>
              <Text style={styles.impactValue}>{project.impactMetric.value}</Text>
              <Text style={styles.impactLabel}>{project.impactMetric.label}</Text>
            </View>
          </View>

          {/* Services */}
          <View style={styles.servicesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {project.services.slice(0, 3).map(service => (
                <View key={service} style={styles.serviceTag}>
                  <Text style={styles.serviceTagText}>{service}</Text>
                </View>
              ))}
              {project.services.length > 3 && (
                <View style={styles.serviceTag}>
                  <Text style={styles.serviceTagText}>+{project.services.length - 3}</Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Quick preview description */}
          <Text style={styles.projectDescription} numberOfLines={2}>
            {project.description}
          </Text>

          {/* Explore button */}
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => handleProjectPress(project)}
          >
            <Text style={styles.exploreButtonText}>Explore Project</Text>
          </TouchableOpacity>
        </View>

        {/* Glass overlay effect */}
        <View style={styles.tileGlassOverlay} />
      </TouchableOpacity>
    );
  };

  const renderFilterModal = () => (
    <Modal
      visible={filterModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.filterModalContainer}>
        <View style={styles.filterModalHeader}>
          <Text style={styles.filterModalTitle}>🌌 Galaxy Filter</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.filterModalContent}>
          {/* Services Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Services</Text>
            <View style={styles.filterOptions}>
              {filterOptions.services.map(service => (
                <TouchableOpacity
                  key={service}
                  style={[
                    styles.filterOption,
                    selectedFilters.services.includes(service) && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterToggle('services', service)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters.services.includes(service) && styles.filterOptionTextSelected
                  ]}>
                    {service}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Industries Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Industries</Text>
            <View style={styles.filterOptions}>
              {filterOptions.industries.map(industry => (
                <TouchableOpacity
                  key={industry}
                  style={[
                    styles.filterOption,
                    selectedFilters.industries.includes(industry) && styles.filterOptionSelected
                  ]}
                  onPress={() => handleFilterToggle('industries', industry)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters.industries.includes(industry) && styles.filterOptionTextSelected
                  ]}>
                    {industry}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Clear Filters */}
          <TouchableOpacity
            style={styles.clearFiltersButton}
            onPress={() => {
              setSelectedFilters({ services: [], industries: [] });
              onFilterChange?.({ services: [], industries: [] });
            }}
          >
            <Text style={styles.clearFiltersText}>Clear All Filters</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderQuickView = () => {
    if (!quickViewProject) return null;

    return (
      <Modal
        visible={!!quickViewProject}
        transparent
        animationType="fade"
        onRequestClose={() => setQuickViewProject(null)}
      >
        <TouchableOpacity
          style={styles.quickViewOverlay}
          activeOpacity={1}
          onPress={() => setQuickViewProject(null)}
        >
          <View style={styles.quickViewContainer}>
            <View style={styles.quickViewContent}>
              <Text style={styles.quickViewTitle}>{quickViewProject.title}</Text>
              <View style={styles.quickViewMetric}>
                <Text style={styles.quickViewIcon}>{quickViewProject.impactMetric.icon}</Text>
                <Text style={styles.quickViewValue}>
                  {quickViewProject.impactMetric.value} {quickViewProject.impactMetric.label}
                </Text>
              </View>
              <Text style={styles.quickViewClient}>
                Client: {quickViewProject.client} • {quickViewProject.industry}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const renderProjectPortal = () => {
    if (!deepDiveProject) return null;

    return (
      <Modal
        visible={!!deepDiveProject}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setDeepDiveProject(null)}
      >
        <View style={styles.portalContainer}>
          {/* Nebula background */}
          <View style={styles.portalBackground} />

          <View style={styles.portalHeader}>
            <TouchableOpacity
              style={styles.portalCloseButton}
              onPress={() => setDeepDiveProject(null)}
            >
              <Text style={styles.portalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.portalContent}>
            {/* Project title and metrics */}
            <View style={styles.portalTitleSection}>
              <Text style={styles.portalTitle}>{deepDiveProject.title}</Text>
              <View style={styles.portalSubInfo}>
                <Text style={styles.portalClient}>Client: {deepDiveProject.client}</Text>
                <Text style={styles.portalIndustry}>Industry: {deepDiveProject.industry}</Text>
              </View>
              <View style={styles.portalImpactMetric}>
                <Text style={styles.portalImpactIcon}>{deepDiveProject.impactMetric.icon}</Text>
                <Text style={styles.portalImpactValue}>
                  {deepDiveProject.impactMetric.value} {deepDiveProject.impactMetric.label}
                </Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.portalSection}>
              <Text style={styles.portalSectionTitle}>Project Overview</Text>
              <Text style={styles.portalDescription}>{deepDiveProject.description}</Text>
            </View>

            {/* Services */}
            <View style={styles.portalSection}>
              <Text style={styles.portalSectionTitle}>Services Delivered</Text>
              <View style={styles.portalServicesContainer}>
                {deepDiveProject.services.map(service => (
                  <View key={service} style={styles.portalServiceTag}>
                    <Text style={styles.portalServiceText}>{service}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Technologies */}
            <View style={styles.portalSection}>
              <Text style={styles.portalSectionTitle}>Technologies Used</Text>
              <View style={styles.portalTechContainer}>
                {deepDiveProject.technologies.map(tech => (
                  <View key={tech} style={styles.portalTechTag}>
                    <Text style={styles.portalTechText}>{tech}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Testimonial */}
            {deepDiveProject.testimonial && (
              <View style={styles.portalSection}>
                <Text style={styles.portalSectionTitle}>Client Testimonial</Text>
                <View style={styles.testimonialContainer}>
                  <Text style={styles.testimonialQuote}>
                    "{deepDiveProject.testimonial.quote}"
                  </Text>
                  <Text style={styles.testimonialAuthor}>
                    — {deepDiveProject.testimonial.author}, {deepDiveProject.testimonial.role}
                  </Text>
                </View>
              </View>
            )}

            {/* CTA */}
            <View style={styles.portalCTASection}>
              <TouchableOpacity style={styles.portalCTAButton}>
                <Text style={styles.portalCTAText}>Start Your Project Journey</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Nebula background */}
      <View style={styles.backgroundNebula} />

      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Project Constellation</Text>
          <Text style={styles.subtitle}>
            Explore our galaxy of successful projects and their interconnected impact
          </Text>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>🌌 Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Results counter */}
      <View style={styles.resultsCounter}>
        <Text style={styles.resultsText}>
          Showing {filteredProjects.length} of {projects.length} projects
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredProjects.map((project, index) => renderProjectTile(project, index))}
      </ScrollView>

      {/* Filter modal */}
      {renderFilterModal()}

      {/* Quick view modal */}
      {renderQuickView()}

      {/* Project portal */}
      {renderProjectPortal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    position: 'relative',
  },

  backgroundNebula: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryBackground,
    opacity: 0.8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing[6],
    paddingBottom: spacing[4],
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    marginBottom: spacing[2],
  },

  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    lineHeight: typography.lineHeights.relaxed,
    maxWidth: '80%',
  },

  filterButton: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 12,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    shadowColor: colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  filterButtonText: {
    color: colors.pureWhite,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
  },

  resultsCounter: {
    paddingHorizontal: spacing[6],
    marginBottom: spacing[4],
  },

  resultsText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSubtle,
    backgroundColor: colors.glassBlur,
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    alignSelf: 'flex-start',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[20],
  },

  projectTile: {
    backgroundColor: colors.glassBlur,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryAccent + '30',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  nebulaBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryAccent + '05',
    opacity: 0.6,
  },

  tileContent: {
    padding: spacing[4],
    zIndex: 2,
  },

  projectHeader: {
    marginBottom: spacing[3],
  },

  projectInfo: {
    flex: 1,
  },

  projectTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    marginBottom: spacing[1],
  },

  projectClient: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    marginBottom: spacing[1],
  },

  projectIndustry: {
    fontSize: typography.fontSizes.xs,
    color: colors.primaryAccent,
    fontWeight: typography.fontWeights.medium,
  },

  impactMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryAccent + '10',
    borderRadius: 12,
    padding: spacing[3],
    marginBottom: spacing[3],
  },

  impactIcon: {
    fontSize: typography.fontSizes.xl,
    marginRight: spacing[2],
  },

  impactText: {
    flex: 1,
  },

  impactValue: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.bold,
    color: colors.primaryAccent,
  },

  impactLabel: {
    fontSize: typography.fontSizes.xs,
    color: colors.textSubtle,
  },

  servicesContainer: {
    marginBottom: spacing[3],
  },

  serviceTag: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 6,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
    marginRight: spacing[2],
  },

  serviceTagText: {
    fontSize: typography.fontSizes.xs,
    color: colors.pureWhite,
    fontWeight: typography.fontWeights.medium,
  },

  projectDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textDark,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[4],
  },

  exploreButton: {
    backgroundColor: colors.secondaryAccent + '20',
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    alignSelf: 'flex-start',
  },

  exploreButtonText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.secondaryAccent,
  },

  tileGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.glassGlow,
    opacity: 0.1,
    borderRadius: 16,
  },

  // Filter Modal Styles
  filterModalContainer: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryAccent + '20',
  },

  filterModalTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textSubtle + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSubtle,
    fontWeight: typography.fontWeights.bold,
  },

  filterModalContent: {
    flex: 1,
    padding: spacing[6],
  },

  filterSection: {
    marginBottom: spacing[6],
  },

  filterSectionTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    marginBottom: spacing[3],
  },

  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },

  filterOption: {
    backgroundColor: colors.primaryAccent + '10',
    borderWidth: 1,
    borderColor: colors.primaryAccent + '30',
    borderRadius: 6,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },

  filterOptionSelected: {
    backgroundColor: colors.primaryAccent,
    borderColor: colors.primaryAccent,
  },

  filterOptionText: {
    fontSize: typography.fontSizes.xs,
    color: colors.textDark,
  },

  filterOptionTextSelected: {
    color: colors.pureWhite,
  },

  clearFiltersButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.textSubtle,
    borderRadius: 8,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    alignItems: 'center',
  },

  clearFiltersText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
  },

  // Quick View Styles
  quickViewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quickViewContainer: {
    backgroundColor: colors.glassBlur,
    borderRadius: 16,
    padding: spacing[4],
    margin: spacing[6],
    maxWidth: '80%',
  },

  quickViewContent: {
    alignItems: 'center',
  },

  quickViewTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing[2],
  },

  quickViewMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },

  quickViewIcon: {
    fontSize: typography.fontSizes.xl,
    marginRight: spacing[2],
  },

  quickViewValue: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primaryAccent,
  },

  quickViewClient: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    textAlign: 'center',
  },

  // Portal Styles
  portalContainer: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  portalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryBackground,
    opacity: 0.9,
  },

  portalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: spacing[4],
    paddingTop: spacing[12],
  },

  portalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textSubtle + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },

  portalCloseText: {
    fontSize: typography.fontSizes.xl,
    color: colors.textSubtle,
    fontWeight: typography.fontWeights.bold,
  },

  portalContent: {
    flex: 1,
    padding: spacing[6],
  },

  portalTitleSection: {
    marginBottom: spacing[6],
  },

  portalTitle: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    marginBottom: spacing[2],
  },

  portalSubInfo: {
    marginBottom: spacing[4],
  },

  portalClient: {
    fontSize: typography.fontSizes.base,
    color: colors.textSubtle,
    marginBottom: spacing[1],
  },

  portalIndustry: {
    fontSize: typography.fontSizes.base,
    color: colors.textSubtle,
  },

  portalImpactMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryAccent + '10',
    borderRadius: 12,
    padding: spacing[4],
  },

  portalImpactIcon: {
    fontSize: typography.fontSizes['2xl'],
    marginRight: spacing[3],
  },

  portalImpactValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.primaryAccent,
  },

  portalSection: {
    marginBottom: spacing[6],
  },

  portalSectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    marginBottom: spacing[3],
  },

  portalDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.textDark,
    lineHeight: typography.lineHeights.relaxed,
  },

  portalServicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },

  portalServiceTag: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 6,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },

  portalServiceText: {
    fontSize: typography.fontSizes.sm,
    color: colors.pureWhite,
    fontWeight: typography.fontWeights.medium,
  },

  portalTechContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },

  portalTechTag: {
    backgroundColor: colors.secondaryAccent + '10',
    borderWidth: 1,
    borderColor: colors.secondaryAccent + '30',
    borderRadius: 6,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },

  portalTechText: {
    fontSize: typography.fontSizes.sm,
    color: colors.secondaryAccent,
  },

  testimonialContainer: {
    backgroundColor: colors.primaryAccent + '05',
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryAccent,
    borderRadius: 8,
    padding: spacing[4],
  },

  testimonialQuote: {
    fontSize: typography.fontSizes.base,
    color: colors.textDark,
    fontStyle: 'italic',
    marginBottom: spacing[2],
    lineHeight: typography.lineHeights.relaxed,
  },

  testimonialAuthor: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
  },

  portalCTASection: {
    marginTop: spacing[6],
    alignItems: 'center',
  },

  portalCTAButton: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 12,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[8],
    shadowColor: colors.primaryAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  portalCTAText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.pureWhite,
  },
});