import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

interface CalculatorResults {
  costReduction: number;
  speedImprovement: number;
  qualityScore: number;
  monthlyROI: number;
}

interface SliderInputs {
  currentBudget: number;
  teamSize: number;
  projectComplexity: number;
}

const QuickROICalculator: React.FC = () => {
  const { colors } = useTheme();
  const [inputs, setInputs] = useState<SliderInputs>({
    currentBudget: 50000,
    teamSize: 5,
    projectComplexity: 3
  });

  const [results, setResults] = useState<CalculatorResults>({
    costReduction: 0,
    speedImprovement: 0,
    qualityScore: 0,
    monthlyROI: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate ROI based on inputs
  const calculateROI = (inputData: SliderInputs): CalculatorResults => {
    const { currentBudget, teamSize, projectComplexity } = inputData;

    // Base calculations (simplified ROI model)
    const baseCostReduction = Math.min(40, (currentBudget / 10000) * 8 + teamSize * 2);
    const baseSpeedImprovement = Math.min(60, teamSize * 8 + (6 - projectComplexity) * 5);
    const baseQualityScore = Math.min(95, 70 + teamSize * 3 + (6 - projectComplexity) * 2);
    const monthlyROI = (currentBudget * (baseCostReduction / 100)) / 12;

    return {
      costReduction: Math.round(baseCostReduction),
      speedImprovement: Math.round(baseSpeedImprovement),
      qualityScore: Math.round(baseQualityScore),
      monthlyROI: Math.round(monthlyROI)
    };
  };

  // Update results when inputs change
  useEffect(() => {
    setIsAnimating(true);
    const newResults = calculateROI(inputs);

    const timer = setTimeout(() => {
      setResults(newResults);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputs]);

  const handleSliderChange = (key: keyof SliderInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const complexityLabels = ['Simple', 'Basic', 'Moderate', 'Complex', 'Advanced', 'Enterprise'];

  // Custom increment/decrement handlers
  const handleBudgetChange = (increment: boolean) => {
    const step = 5000;
    const newValue = increment
      ? Math.min(500000, inputs.currentBudget + step)
      : Math.max(10000, inputs.currentBudget - step);
    handleSliderChange('currentBudget', newValue);
  };

  const handleTeamSizeChange = (increment: boolean) => {
    const newValue = increment
      ? Math.min(20, inputs.teamSize + 1)
      : Math.max(1, inputs.teamSize - 1);
    handleSliderChange('teamSize', newValue);
  };

  const handleComplexityChange = (increment: boolean) => {
    const newValue = increment
      ? Math.min(6, inputs.projectComplexity + 1)
      : Math.max(1, inputs.projectComplexity - 1);
    handleSliderChange('projectComplexity', newValue);
  };

  const handleGetRecommendations = () => {
    Alert.alert(
      'Custom Recommendations',
      `Based on your inputs:\n• Budget: ${formatCurrency(inputs.currentBudget)}\n• Team: ${inputs.teamSize} developers\n• Complexity: ${complexityLabels[inputs.projectComplexity - 1]}\n\nWe'll contact you with personalized solutions!`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleDownloadReport = () => {
    Alert.alert(
      'Download Report',
      'Your ROI analysis report will be emailed to you shortly.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.glassBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      marginHorizontal: spacing[6],
      marginVertical: spacing[8],
      overflow: 'hidden',
    },
    scrollContent: {
      padding: spacing[6],
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[8],
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[3],
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.8,
    },
    sliderGroup: {
      marginBottom: spacing[6],
    },
    sliderLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
      marginBottom: spacing[3],
    },
    controlsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surfaceBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      paddingHorizontal: spacing[4],
      paddingVertical: spacing[3],
    },
    controlButton: {
      backgroundColor: colors.primaryAccent,
      borderRadius: 8,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      minWidth: 40,
      alignItems: 'center',
    },
    controlButtonText: {
      color: colors.surfaceBackground,
      fontSize: 18,
      fontWeight: '700',
    },
    valueDisplay: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: spacing[4],
    },
    valueText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    resultsGrid: {
      marginVertical: spacing[8],
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[4],
    },
    resultCard: {
      width: (width - spacing[6] * 2 - spacing[6] * 2 - spacing[3]) / 2,
      backgroundColor: colors.surfaceBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[4],
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 100,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    resultValue: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: spacing[1],
    },
    resultLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textPrimary,
      textAlign: 'center',
      lineHeight: 16,
    },
    actions: {
      gap: spacing[4],
    },
    primaryButton: {
      backgroundColor: colors.primaryAccent,
      borderRadius: 16,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      alignItems: 'center',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.surfaceBackground,
    },
    secondaryButton: {
      borderWidth: 2,
      borderColor: colors.primaryAccent,
      backgroundColor: 'transparent',
      borderRadius: 16,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      alignItems: 'center',
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primaryAccent,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Quick ROI Calculator</Text>
          <Text style={styles.subtitle}>
            See what you could save with our development solutions
          </Text>
        </View>

        {/* Input Controls */}
        <View style={styles.sliderGroup}>
          <Text style={styles.sliderLabel}>
            Annual Development Budget
          </Text>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => handleBudgetChange(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.valueDisplay}>
              <Text style={styles.valueText}>
                {formatCurrency(inputs.currentBudget)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => handleBudgetChange(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sliderGroup}>
          <Text style={styles.sliderLabel}>
            Team Size
          </Text>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: colors.secondaryAccent }]}
              onPress={() => handleTeamSizeChange(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.valueDisplay}>
              <Text style={styles.valueText}>
                {inputs.teamSize} developers
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: colors.secondaryAccent }]}
              onPress={() => handleTeamSizeChange(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sliderGroup}>
          <Text style={styles.sliderLabel}>
            Project Complexity
          </Text>
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: '#ff6f61' }]}
              onPress={() => handleComplexityChange(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>

            <View style={styles.valueDisplay}>
              <Text style={styles.valueText}>
                {complexityLabels[inputs.projectComplexity - 1]}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: '#ff6f61' }]}
              onPress={() => handleComplexityChange(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Grid */}
        <View style={styles.resultsGrid}>
          {/* First Row */}
          <View style={styles.resultRow}>
            {/* Cost Reduction */}
            <View style={[styles.resultCard, {
              transform: [{ scale: isAnimating ? 0.95 : 1 }],
              borderColor: `${colors.primaryAccent}40`
            }]}>
              <Text style={[styles.resultValue, { color: colors.primaryAccent }]}>
                {results.costReduction}%
              </Text>
              <Text style={styles.resultLabel}>Cost Reduction</Text>
            </View>

            {/* Speed Improvement */}
            <View style={[styles.resultCard, {
              transform: [{ scale: isAnimating ? 0.95 : 1 }],
              borderColor: `${colors.secondaryAccent}40`
            }]}>
              <Text style={[styles.resultValue, { color: colors.secondaryAccent }]}>
                {results.speedImprovement}%
              </Text>
              <Text style={styles.resultLabel}>Speed Improvement</Text>
            </View>
          </View>

          {/* Second Row */}
          <View style={styles.resultRow}>
            {/* Quality Score */}
            <View style={[styles.resultCard, {
              transform: [{ scale: isAnimating ? 0.95 : 1 }],
              borderColor: '#ff6f6140'
            }]}>
              <Text style={[styles.resultValue, { color: '#ff6f61' }]}>
                {results.qualityScore}
              </Text>
              <Text style={styles.resultLabel}>Quality Score</Text>
            </View>

            {/* Monthly ROI */}
            <View style={[styles.resultCard, {
              transform: [{ scale: isAnimating ? 0.95 : 1 }],
              borderColor: '#4caf5040'
            }]}>
              <Text style={[styles.resultValue, { color: '#4caf50', fontSize: 20 }]}>
                {formatCurrency(results.monthlyROI)}
              </Text>
              <Text style={styles.resultLabel}>Monthly Savings</Text>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetRecommendations}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Custom Recommendations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleDownloadReport}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Download Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default QuickROICalculator;