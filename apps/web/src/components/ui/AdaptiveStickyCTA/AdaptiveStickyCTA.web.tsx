import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, borderRadius } from '..';
import { Button } from '../Button/Button.web';

export interface CTAConfig {
  id: string;
  title: string;
  description?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
}

export interface PageCTAMapping {
  [key: string]: CTAConfig;
}

export interface AdaptiveStickyCTAProps {
  currentPage: string;
  ctaMapping: PageCTAMapping;
  defaultCTA?: CTAConfig;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  style?: React.CSSProperties;
  collapsed?: boolean;
}

export const AdaptiveStickyCTA: React.FC<AdaptiveStickyCTAProps> = ({
  currentPage,
  ctaMapping,
  defaultCTA,
  position = 'bottom-right',
  style,
  collapsed = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(!collapsed);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCTA = ctaMapping[currentPage] || defaultCTA;

  if (!currentCTA || !isVisible) return null;

  const getPositionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 1000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (position) {
      case 'bottom-right':
        return {
          ...baseStyles,
          bottom: spacing[6],
          right: spacing[6],
        };
      case 'bottom-left':
        return {
          ...baseStyles,
          bottom: spacing[6],
          left: spacing[6],
        };
      case 'bottom-center':
        return {
          ...baseStyles,
          bottom: spacing[6],
          left: '50%',
          transform: 'translateX(-50%)',
        };
      default:
        return baseStyles;
    }
  };

  const containerStyles: React.CSSProperties = {
    ...getPositionStyles(),
    backgroundColor: colors.background,
    border: `2px solid ${colors.accentPop}`,
    borderRadius: borderRadius.xl,
    boxShadow: `0 8px 32px ${colors.darkGray}30`,
    overflow: 'hidden',
    cursor: 'pointer',
    maxWidth: isExpanded ? 300 : 60,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...style,
  };

  const collapsedStyles: React.CSSProperties = {
    width: 60,
    height: 60,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentPop,
    border: `3px solid ${colors.white}`,
    fontSize: typography.fontSizes.xl,
    color: colors.white,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const expandedContentStyles: React.CSSProperties = {
    padding: spacing[4],
    display: isExpanded ? 'block' : 'none',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
    marginBottom: currentCTA.description ? spacing[1] : spacing[3],
    lineHeight: typography.lineHeights.tight,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    marginBottom: spacing[3],
    lineHeight: typography.lineHeights.snug,
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (collapsed && !isExpanded) {
    return (
      <div
        style={collapsedStyles}
        onClick={toggleExpanded}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = `0 4px 20px ${colors.accentPop}50`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 8px 32px ${colors.darkGray}30`;
        }}
      >
        {currentCTA.icon || '💬'}
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      {collapsed && (
        <div
          style={{
            position: 'absolute',
            top: spacing[2],
            right: spacing[2],
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: colors.lightGray,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: typography.fontSizes.xs,
            color: colors.darkGray,
            zIndex: 1,
          }}
          onClick={toggleExpanded}
        >
          ✕
        </div>
      )}

      <div style={expandedContentStyles}>
        <div style={titleStyles}>
          {currentCTA.icon && (
            <span style={{ marginRight: spacing[2] }}>{currentCTA.icon}</span>
          )}
          {currentCTA.title}
        </div>

        {currentCTA.description && (
          <div style={descriptionStyles}>
            {currentCTA.description}
          </div>
        )}

        <Button
          title="Get Started"
          onPress={currentCTA.onPress}
          variant={currentCTA.variant || 'primary'}
          size="sm"
          style={{
            width: '100%',
            transition: 'all 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};