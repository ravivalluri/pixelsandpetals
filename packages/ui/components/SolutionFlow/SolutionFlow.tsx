import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Modal } from 'react-native';
import { colors, typography, spacing } from '../../tokens';

export interface ServiceOrb {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  oneLiner: string;
  caseStudies?: string[];
  connections: string[]; // IDs of connected services
}

export interface SolutionFlowProps {
  services: ServiceOrb[];
  onServiceClick?: (service: ServiceOrb) => void;
  onSolutionBuilt?: (selectedServices: ServiceOrb[]) => void;
  style?: any;
}

export const SolutionFlow: React.FC<SolutionFlowProps> = ({
  services,
  onServiceClick,
  onSolutionBuilt,
  style,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [deepDiveService, setDeepDiveService] = useState<ServiceOrb | null>(null);
  const [solutionBuilderActive, setSolutionBuilderActive] = useState(false);

  const handleCardPress = (service: ServiceOrb) => {
    if (solutionBuilderActive) {
      const newSelected = new Set(selectedServices);
      if (newSelected.has(service.id)) {
        newSelected.delete(service.id);
      } else if (newSelected.size < 3) {
        newSelected.add(service.id);
      }
      setSelectedServices(newSelected);

      if (newSelected.size >= 2 && onSolutionBuilt) {
        const selected = services.filter(s => newSelected.has(s.id));
        onSolutionBuilt(selected);
      }
    } else {
      setDeepDiveService(service);
      onServiceClick?.(service);
    }
  };

  const renderServiceCard = (service: ServiceOrb, index: number) => {
    const isExpanded = expandedCard === service.id;
    const isSelected = selectedServices.has(service.id);

    return (
      <TouchableOpacity
        key={service.id}
        style={[
          styles.serviceCard,
          isSelected && styles.selectedCard,
          { marginBottom: spacing[4] }
        ]}
        onPress={() => handleCardPress(service)}
        activeOpacity={0.8}
      >
        {/* Flow connector line */}
        {index < services.length - 1 && (
          <View style={styles.flowConnector} />
        )}

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.serviceIcon}>{service.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceOneLiner}>{service.oneLiner}</Text>
            </View>
          </View>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <Text style={styles.serviceDescription}>{service.description}</Text>

              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Key Benefits:</Text>
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                  <View key={idx} style={styles.benefitItem}>
                    <Text style={styles.benefitText}>• {benefit}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() => setDeepDiveService(service)}
              >
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Glass overlay effect */}
        <View style={styles.cardGlassOverlay} />
      </TouchableOpacity>
    );
  };

  const renderSolutionBuilderFAB = () => {
    return (
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: solutionBuilderActive ? colors.secondaryAccent : colors.primaryAccent }
        ]}
        onPress={() => {
          setSolutionBuilderActive(!solutionBuilderActive);
          setSelectedServices(new Set());
        }}
      >
        <Text style={styles.fabIcon}>
          {solutionBuilderActive ? '×' : '⚡'}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSolutionSummary = () => {
    if (!solutionBuilderActive || selectedServices.size < 2) return null;

    const selected = services.filter(s => selectedServices.has(s.id));
    const combinationTitle = selected.map(s => s.title).join(' + ');

    return (
      <View style={styles.solutionSummary}>
        <Text style={styles.solutionTitle}>{combinationTitle}</Text>
        <Text style={styles.solutionDescription}>
          This powerful combination creates synergistic solutions that leverage{' '}
          {selected.map(s => s.title.toLowerCase()).join(', ')} for maximum impact.
        </Text>
        <TouchableOpacity
          style={styles.buildSolutionButton}
          onPress={() => {
            setSolutionBuilderActive(false);
            setSelectedServices(new Set());
          }}
        >
          <Text style={styles.buildSolutionText}>Build This Solution</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDeepDiveModal = () => {
    return (
      <Modal
        visible={!!deepDiveService}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setDeepDiveService(null)}
      >
        {deepDiveService && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalIcon}>{deepDiveService.icon}</Text>
                <Text style={styles.modalTitle}>{deepDiveService.title}</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setDeepDiveService(null)}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.modalDescription}>{deepDiveService.description}</Text>

              <View style={styles.modalBenefitsContainer}>
                <Text style={styles.modalBenefitsTitle}>Key Benefits</Text>
                {deepDiveService.benefits.map((benefit, index) => (
                  <View key={index} style={styles.modalBenefitItem}>
                    <Text style={styles.modalBenefitText}>• {benefit}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.getQuoteButton}>
                <Text style={styles.getQuoteText}>Get a Quote for {deepDiveService.title}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Background flow effect */}
      <View style={styles.backgroundFlow} />

      <View style={styles.header}>
        <Text style={styles.title}>Solution Flow</Text>
        <Text style={styles.subtitle}>
          {solutionBuilderActive
            ? 'Select services to build your custom solution'
            : 'Explore our interconnected services and capabilities'
          }
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {services.map((service, index) => renderServiceCard(service, index))}

        {/* Solution summary */}
        {renderSolutionSummary()}
      </ScrollView>

      {/* Floating Action Button */}
      {renderSolutionBuilderFAB()}

      {/* Deep dive modal */}
      {renderDeepDiveModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    position: 'relative',
  },

  backgroundFlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryBackground,
    opacity: 0.5,
  },

  header: {
    padding: spacing[6],
    paddingBottom: spacing[4],
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
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[20],
  },

  serviceCard: {
    backgroundColor: colors.glassBlur,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryAccent + '30',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  selectedCard: {
    borderColor: colors.secondaryAccent + '60',
    shadowOpacity: 0.3,
    transform: [{ scale: 1.02 }],
  },

  flowConnector: {
    position: 'absolute',
    bottom: -spacing[4],
    left: '50%',
    width: 2,
    height: spacing[4],
    backgroundColor: colors.primaryAccent + '40',
    marginLeft: -1,
    zIndex: 1,
  },

  cardContent: {
    padding: spacing[4],
    zIndex: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  serviceIcon: {
    fontSize: typography.fontSizes['2xl'],
    marginRight: spacing[3],
  },

  cardText: {
    flex: 1,
  },

  serviceTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    marginBottom: spacing[1],
  },

  serviceOneLiner: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    lineHeight: typography.lineHeights.relaxed,
  },

  expandedContent: {
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.primaryAccent + '20',
  },

  serviceDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.textDark,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[4],
  },

  benefitsContainer: {
    marginBottom: spacing[4],
  },

  benefitsTitle: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    marginBottom: spacing[2],
  },

  benefitItem: {
    marginBottom: spacing[1],
  },

  benefitText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    lineHeight: typography.lineHeights.relaxed,
  },

  learnMoreButton: {
    backgroundColor: colors.primaryAccent + '20',
    borderRadius: 8,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    alignSelf: 'flex-start',
  },

  learnMoreText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.primaryAccent,
  },

  cardGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.glassGlow,
    opacity: 0.1,
    borderRadius: 16,
  },

  fab: {
    position: 'absolute',
    bottom: spacing[6],
    right: spacing[6],
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  fabIcon: {
    fontSize: typography.fontSizes.xl,
    color: colors.pureWhite,
    fontWeight: typography.fontWeights.bold,
  },

  solutionSummary: {
    backgroundColor: colors.glassBlur,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primaryAccent,
    padding: spacing[6],
    marginTop: spacing[4],
    marginBottom: spacing[4],
  },

  solutionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    marginBottom: spacing[2],
    textAlign: 'center',
  },

  solutionDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    lineHeight: typography.lineHeights.relaxed,
    textAlign: 'center',
    marginBottom: spacing[4],
  },

  buildSolutionButton: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 8,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[6],
    alignSelf: 'center',
  },

  buildSolutionText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.pureWhite,
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryAccent + '20',
  },

  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  modalIcon: {
    fontSize: typography.fontSizes['3xl'],
    marginRight: spacing[3],
  },

  modalTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.textDark,
    flex: 1,
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
    fontSize: typography.fontSizes.xl,
    color: colors.textSubtle,
    fontWeight: typography.fontWeights.bold,
  },

  modalContent: {
    flex: 1,
    padding: spacing[6],
  },

  modalDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.textDark,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[6],
  },

  modalBenefitsContainer: {
    marginBottom: spacing[6],
  },

  modalBenefitsTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    marginBottom: spacing[4],
  },

  modalBenefitItem: {
    backgroundColor: colors.primaryAccent + '10',
    borderRadius: 8,
    padding: spacing[3],
    marginBottom: spacing[2],
  },

  modalBenefitText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textDark,
    lineHeight: typography.lineHeights.relaxed,
  },

  modalFooter: {
    padding: spacing[6],
    borderTopWidth: 1,
    borderTopColor: colors.primaryAccent + '20',
  },

  getQuoteButton: {
    backgroundColor: colors.primaryAccent,
    borderRadius: 12,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  getQuoteText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.pureWhite,
    textAlign: 'center',
  },
});