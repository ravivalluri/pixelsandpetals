import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

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

export const HeroSection: React.FC<HeroSectionProps> = ({ theme = 'light' }) => {
  const { colors, spacing, typography } = useTheme(theme);
  const [currentIndex, setCurrentIndex] = useState(0);

  const useCases: UseCase[] = [
    {
      id: 'data-pipelines',
      title: 'Automate Data Pipelines',
      description: 'Streamline your data workflows with intelligent automation that processes, transforms, and delivers insights in real-time.',
      benefits: ['95% faster processing', 'Zero manual errors', 'Real-time insights'],
      accentColor: colors.primaryAccent,
    },
    {
      id: 'ai-dashboards',
      title: 'AI-Powered Dashboards', 
      description: 'Transform raw data into intelligent, predictive dashboards that anticipate trends and recommend actions.',
      benefits: ['Predictive analytics', 'Smart recommendations', 'Interactive visualizations'],
      accentColor: colors.secondaryAccent,
    },
    {
      id: 'workflow-automation',
      title: 'Workflow Automation',
      description: 'Automate complex business processes with intelligent workflows that adapt and optimize themselves.',
      benefits: ['80% time savings', 'Seamless integration', 'Self-optimizing'],
      accentColor: colors.primaryAccent,
    },
  ];

  const containerStyles: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: colors.primaryBackground,
    background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: spacing[16],
    paddingBottom: spacing[24],
  };

  const heroContentStyles: React.CSSProperties = {
    textAlign: 'center',
    maxWidth: '1200px',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    marginBottom: spacing[12],
  };

  const heroTitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[4],
    lineHeight: typography.lineHeights.tight,
  };

  const heroSubtitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.xl,
    color: colors.textSecondary,
    marginBottom: spacing[8],
    lineHeight: typography.lineHeights.normal,
    maxWidth: '800px',
    margin: '0 auto',
    marginBottom: spacing[8],
  };

  const ctaContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing[12],
  };

  const ctaButtonStyles: React.CSSProperties = {
    backgroundColor: colors.primaryAccent,
    color: '#FFFFFF',
    padding: `${spacing[4]}px ${spacing[6]}px`,
    borderRadius: '12px',
    border: 'none',
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    boxShadow: colors.dropShadow,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const ctaButtonSecondaryStyles: React.CSSProperties = {
    ...ctaButtonStyles,
    backgroundColor: 'transparent',
    color: colors.primaryAccent,
    border: `2px solid ${colors.primaryAccent}`,
  };

  const useCasesContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[6],
    maxWidth: '1400px',
    overflowX: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    scrollSnapType: 'x mandatory',
  };

  const useCaseCardStyles: React.CSSProperties = {
    backgroundColor: colors.surfaceBackground,
    padding: spacing[6],
    borderRadius: '16px',
    minWidth: '350px',
    maxWidth: '400px',
    flex: '0 0 auto',
    boxShadow: colors.dropShadow,
    border: `1px solid ${colors.glassBorder}`,
    scrollSnapAlign: 'center',
    backdropFilter: 'blur(10px)',
    background: `linear-gradient(135deg, ${colors.glassBackground}, ${colors.surfaceBackground})`,
  };

  const useCaseTitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing[3],
  };

  const useCaseDescriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[4],
  };

  const benefitsListStyles: React.CSSProperties = {
    marginTop: spacing[2],
  };

  const benefitItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing[2],
  };

  const benefitDotStyles = (accentColor: string): React.CSSProperties => ({
    width: '6px',
    height: '6px',
    borderRadius: '3px',
    backgroundColor: accentColor,
    marginRight: spacing[3],
    flexShrink: 0,
  });

  const benefitTextStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.medium,
  };

  return (
    <div style={containerStyles}>
      {/* Hero Content */}
      <div style={heroContentStyles}>
        <h1 style={heroTitleStyles}>
          Transform Your Business with{' '}
          <span style={{ color: colors.primaryAccent }}>AI Intelligence</span>
        </h1>
        
        <p style={heroSubtitleStyles}>
          Unlock the power of artificial intelligence to automate workflows,
          gain predictive insights, and accelerate your digital transformation.
        </p>

        {/* CTA Buttons */}
        <div style={ctaContainerStyles}>
          <button 
            style={ctaButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 15px 35px ${colors.shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = colors.dropShadow;
            }}
          >
            Start Your Project
          </button>
          
          <button 
            style={ctaButtonSecondaryStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = colors.primaryAccent;
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.primaryAccent;
            }}
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Use Case Carousel */}
      <div style={useCasesContainerStyles}>
        {useCases.map((useCase, index) => (
          <div key={useCase.id} style={useCaseCardStyles}>
            <h3 style={useCaseTitleStyles}>{useCase.title}</h3>
            <p style={useCaseDescriptionStyles}>{useCase.description}</p>
            
            <div style={benefitsListStyles}>
              {useCase.benefits.map((benefit, benefitIndex) => (
                <div key={benefitIndex} style={benefitItemStyles}>
                  <div style={benefitDotStyles(useCase.accentColor)} />
                  <span style={benefitTextStyles}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};