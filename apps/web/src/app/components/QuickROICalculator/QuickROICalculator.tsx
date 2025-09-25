"use client";
import React, { useState, useEffect } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import { typography } from '@pixelsandpetals/ui';
import styles from './QuickROICalculator.module.css';

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

export const QuickROICalculator: React.FC = () => {
  const { theme, colors } = useTheme();
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

  // Create dark mode compatible background
  const getBackground = () => {
    return theme === 'dark' 
      ? 'rgba(42, 47, 62, 0.8)' 
      : 'rgba(255, 255, 255, 0.95)';
  };

  // Create dark mode compatible border
  const getBorder = () => {
    return theme === 'dark' 
      ? `1px solid rgba(102, 153, 255, 0.2)` 
      : `1px solid rgba(102, 153, 255, 0.1)`;
  };

  // Create dark mode compatible box shadow
  const getBoxShadow = () => {
    return theme === 'dark' 
      ? '0 20px 60px rgba(102, 153, 255, 0.1)' 
      : '0 20px 60px rgba(102, 153, 255, 0.2)';
  };

  // Create dark mode compatible slider background
  const getSliderBackground = (accentColor: string, percentage: number) => {
    const trackColor = theme === 'dark' ? '#2a2f3e' : '#e2e8f0';
    return `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`;
  };

  // Create theme-appropriate result card background
  const getResultCardBackground = () => {
    return theme === 'dark'
      ? 'rgba(42, 47, 62, 0.8)'  // Dark background
      : 'rgba(255, 255, 255, 0.9)'; // Light background
  };

  // Get text color based on theme
  const getTextColor = (isSubtle: boolean = false) => {
    return isSubtle ? colors.textSubtle : colors.textPrimary;
  };

  return (
    <div
      className={styles.container}
      style={{
        background: getBackground(),
        backdropFilter: 'blur(20px)',
        border: getBorder(),
        boxShadow: getBoxShadow(),
      }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h3
          className={styles.title}
          style={{
            fontSize: `${typography.fontSizes['2xl']}px`,
            color: getTextColor(),
          }}
        >
          Quick ROI Calculator
        </h3>
        <p
          className={styles.subtitle}
          style={{
            fontSize: `${typography.fontSizes.base}px`,
            color: getTextColor(true),
          }}
        >
          See what you could save with our development solutions
        </p>
      </div>

      {/* Input Sliders */}
      <div className={styles.sliderGroup}>
        {/* Current Budget */}
        <div className={styles.sliderGroup}>
          <label
            className={styles.sliderLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
            }}
          >
            Annual Development Budget: {formatCurrency(inputs.currentBudget)}
          </label>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={inputs.currentBudget}
            onChange={(e) => handleSliderChange('currentBudget', parseInt(e.target.value))}
            className={styles.sliderInput}
            style={{
              background: getSliderBackground(colors.primaryAccent, ((inputs.currentBudget - 10000) / (500000 - 10000)) * 100),
            }}
          />
        </div>

        {/* Team Size */}
        <div className={styles.sliderGroup}>
          <label
            className={styles.sliderLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
            }}
          >
            Team Size: {inputs.teamSize} developers
          </label>
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={inputs.teamSize}
            onChange={(e) => handleSliderChange('teamSize', parseInt(e.target.value))}
            className={styles.sliderInput}
            style={{
              background: getSliderBackground(colors.secondaryAccent, ((inputs.teamSize - 1) / (20 - 1)) * 100),
            }}
          />
        </div>

        {/* Project Complexity */}
        <div className={styles.sliderGroup}>
          <label
            className={styles.sliderLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
            }}
          >
            Project Complexity: {['Simple', 'Basic', 'Moderate', 'Complex', 'Advanced', 'Enterprise'][inputs.projectComplexity - 1]}
          </label>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={inputs.projectComplexity}
            onChange={(e) => handleSliderChange('projectComplexity', parseInt(e.target.value))}
            className={styles.sliderInput}
            style={{
              background: getSliderBackground('#ff6f61', ((inputs.projectComplexity - 1) / (6 - 1)) * 100),
            }}
          />
        </div>
      </div>

      {/* Results Grid */}
      <div
        className={styles.resultsGrid}
      >
        {/* Cost Reduction */}
        <div
          className={styles.resultCard}
          style={{
            background: getResultCardBackground(),
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            border: theme === 'dark' ? '1px solid rgba(102, 153, 255, 0.2)' : '1px solid rgba(102, 153, 255, 0.1)',
          }}
        >
          <div
            className={styles.resultValue}
            style={{
              fontSize: `${typography.fontSizes['3xl']}px`,
              color: colors.primaryAccent,
              fontWeight: '700',
            }}
          >
            {results.costReduction}%
          </div>
          <div
            className={styles.resultLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
              fontWeight: '600',
            }}
          >
            Cost Reduction
          </div>
        </div>

        {/* Speed Improvement */}
        <div
          className={styles.resultCard}
          style={{
            background: getResultCardBackground(),
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            border: theme === 'dark' ? '1px solid rgba(153, 102, 204, 0.2)' : '1px solid rgba(153, 102, 204, 0.1)',
          }}
        >
          <div
            className={styles.resultValue}
            style={{
              fontSize: `${typography.fontSizes['3xl']}px`,
              color: colors.secondaryAccent,
              fontWeight: '700',
            }}
          >
            {results.speedImprovement}%
          </div>
          <div
            className={styles.resultLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
              fontWeight: '600',
            }}
          >
            Speed Improvement
          </div>
        </div>

        {/* Quality Score */}
        <div
          className={styles.resultCard}
          style={{
            background: getResultCardBackground(),
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            border: theme === 'dark' ? '1px solid rgba(255, 111, 97, 0.2)' : '1px solid rgba(255, 111, 97, 0.1)',
          }}
        >
          <div
            className={styles.resultValue}
            style={{
              fontSize: `${typography.fontSizes['3xl']}px`,
              color: '#ff6f61',
              fontWeight: '700',
            }}
          >
            {results.qualityScore}
          </div>
          <div
            className={styles.resultLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
              fontWeight: '600',
            }}
          >
            Quality Score
          </div>
        </div>

        {/* Monthly ROI */}
        <div
          className={styles.resultCard}
          style={{
            background: getResultCardBackground(),
            transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
            border: theme === 'dark' ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(76, 175, 80, 0.1)',
          }}
        >
          <div
            className={styles.resultValue}
            style={{
              fontSize: `${typography.fontSizes['2xl']}px`,
              color: '#4caf50',
              fontWeight: '700',
            }}
          >
            {formatCurrency(results.monthlyROI)}
          </div>
          <div
            className={styles.resultLabel}
            style={{
              fontSize: `${typography.fontSizes.sm}px`,
              color: getTextColor(),
              fontWeight: '600',
            }}
          >
            Monthly Savings
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryButton}
          style={{
            background: `linear-gradient(135deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
            color: colors.textPrimary,
            boxShadow: theme === 'dark' 
              ? '0 4px 20px rgba(102, 153, 255, 0.2)' 
              : '0 4px 20px rgba(102, 153, 255, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme === 'dark' 
              ? '0 8px 30px rgba(102, 153, 255, 0.3)' 
              : '0 8px 30px rgba(102, 153, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme === 'dark' 
              ? '0 4px 20px rgba(102, 153, 255, 0.2)' 
              : '0 4px 20px rgba(102, 153, 255, 0.3)';
          }}
        >
          Get Custom Recommendations
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          style={{
            background: theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            color: getTextColor(),
            border: `2px solid ${colors.primaryAccent}`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(102, 153, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Download Report
        </button>
      </div>
    </div>
  );
};