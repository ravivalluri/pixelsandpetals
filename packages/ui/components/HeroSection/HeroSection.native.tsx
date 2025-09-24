import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';

export interface HeroSectionProps {
  theme?: 'light' | 'dark';
}

interface UseCase {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  accentColor: string;
}

const { width } = Dimensions.get('window');

export const HeroSection: React.FC<HeroSectionProps> = ({ theme = 'light' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use theme-aware colors
  const themeColors = theme === 'light' ? colors.light : colors.dark;

  const useCases: UseCase[] = [
    {
      id: 'data-pipelines',
      title: 'Automate Data Pipelines',
      description: 'Streamline your data workflows with intelligent automation that processes, transforms, and delivers insights in real-time.',
      benefits: ['95% faster processing', 'Zero manual errors', 'Real-time insights'],
      accentColor: themeColors.primaryAccent,
    },
    {
      id: 'ai-dashboards',
      title: 'AI-Powered Dashboards',
      description: 'Transform raw data into intelligent, predictive dashboards that anticipate trends and recommend actions.',
      benefits: ['Predictive analytics', 'Smart recommendations', 'Interactive visualizations'],
      accentColor: themeColors.secondaryAccent,
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'Automate complex business processes with intelligent workflows that adapt and optimize themselves.',
      benefits: ['80% time savings', 'Seamless integration', 'Self-optimizing'],
      accentColor: themeColors.primaryAccent,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.primaryBackground,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingTop: spacing[16],
    },
    heroContent: {
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[12],
      alignItems: 'center',
    },
    heroTitle: {
      fontSize: typography.fontSizes['4xl'],
      fontWeight: typography.fontWeights.bold,
      color: themeColors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
      lineHeight: typography.fontSizes['4xl'] * typography.lineHeights.tight,
    },
    heroSubtitle: {
      fontSize: typography.fontSizes.lg,
      color: themeColors.textSecondary,
      textAlign: 'center',
      marginBottom: spacing[8],
      lineHeight: typography.fontSizes.lg * typography.lineHeights.normal,
      maxWidth: width * 0.9,
    },
    ctaContainer: {
      flexDirection: 'row',
      gap: spacing[4],
      marginBottom: spacing[12],
    },
    ctaButton: {
      backgroundColor: themeColors.primaryAccent,
      paddingHorizontal: spacing[6],
      paddingVertical: spacing[4],
      borderRadius: 12,
      shadowColor: themeColors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    ctaButtonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: themeColors.primaryAccent,
    },
    ctaButtonText: {
      color: '#FFFFFF',
      fontSize: typography.fontSizes.base,
      fontWeight: typography.fontWeights.semibold,
      textAlign: 'center',
    },
    ctaButtonTextSecondary: {
      color: themeColors.primaryAccent,
    },
    useCasesContainer: {
      paddingHorizontal: spacing[4],
    },
    useCaseCard: {
      backgroundColor: themeColors.surfaceBackground,
      marginHorizontal: spacing[2],
      padding: spacing[6],
      borderRadius: 16,
      width: width * 0.85,
      shadowColor: themeColors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
      borderWidth: 1,
      borderColor: themeColors.glassBorder,
    },
    useCaseTitle: {
      fontSize: typography.fontSizes['2xl'],
      fontWeight: typography.fontWeights.bold,
      color: themeColors.textPrimary,
      marginBottom: spacing[3],
    },
    useCaseDescription: {
      fontSize: typography.fontSizes.base,
      color: themeColors.textSecondary,
      lineHeight: typography.fontSizes.base * typography.lineHeights.relaxed,
      marginBottom: spacing[4],
    },
    benefitsList: {
      marginTop: spacing[2],
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[2],
    },
    benefitDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: spacing[3],
    },
    benefitText: {
      fontSize: typography.fontSizes.sm,
      color: themeColors.textSecondary,
      fontWeight: typography.fontWeights.medium,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing[6],
      paddingHorizontal: spacing[4],
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: spacing[1],
      backgroundColor: themeColors.textSubtle,
    },
    paginationDotActive: {
      backgroundColor: themeColors.primaryAccent,
      width: 24,
    },
  });

  const currentUseCase = useCases[currentIndex];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Content */}
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Transform Your Business with{' '}
            <Text style={{ color: themeColors.primaryAccent }}>AI Intelligence</Text>
          </Text>
          
          <Text style={styles.heroSubtitle}>
            Unlock the power of artificial intelligence to automate workflows,
            gain predictive insights, and accelerate your digital transformation.
          </Text>

          {/* CTA Buttons */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Start Your Project</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonSecondary]}>
              <Text style={[styles.ctaButtonText, styles.ctaButtonTextSecondary]}>View Portfolio</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Use Case Carousel */}
        <View style={styles.useCasesContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.85 + spacing[4]));
              setCurrentIndex(newIndex);
            }}
            contentContainerStyle={{ paddingHorizontal: spacing[2] }}
          >
            {useCases.map((useCase, index) => (
              <View key={useCase.id} style={styles.useCaseCard}>
                <Text style={styles.useCaseTitle}>{useCase.title}</Text>
                <Text style={styles.useCaseDescription}>{useCase.description}</Text>
                
                <View style={styles.benefitsList}>
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <View key={benefitIndex} style={styles.benefitItem}>
                      <View 
                        style={[
                          styles.benefitDot, 
                          { backgroundColor: useCase.accentColor }
                        ]} 
                      />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {useCases.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex && styles.paginationDotActive,
                ]}
                onPress={() => setCurrentIndex(index)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};