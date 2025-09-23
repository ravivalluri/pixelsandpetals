import React from 'react';
import { colors, typography, spacing, borderRadius } from '../../tokens';

export interface CardProps {
  title: string;
  description?: string;
  imageSource?: { uri: string } | string;
  onPress?: () => void;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  variant?: 'default' | 'portfolio' | 'service' | 'testimonial';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSource,
  onPress,
  footer,
  style,
  titleStyle,
  descriptionStyle,
  imageStyle,
  variant = 'default',
}) => {
  const baseStyles: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: variant === 'portfolio' ? spacing[6] : spacing[4],
    cursor: onPress ? 'none' : 'default',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  // Removed hoverStyles as inline styles do not support pseudo-selectors
  // Hover effects are handled via onMouseEnter/onMouseLeave below

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: variant === 'portfolio' ? 250 : variant === 'service' ? 120 : 200,
    objectFit: 'cover' as const,
    display: 'block',
    ...imageStyle,
  };

  const contentStyles: React.CSSProperties = {
    padding: variant === 'service' || variant === 'testimonial' ? spacing[4] : spacing[4],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: variant === 'portfolio' ? typography.fontSizes.xl : typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    fontFamily: typography.fonts.heading,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing[2],
    textAlign: variant === 'service' || variant === 'testimonial' ? 'center' : 'left',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    ...titleStyle,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: variant === 'service' ? typography.fontSizes.sm : typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[3],
    textAlign: variant === 'service' || variant === 'testimonial' ? 'center' : 'left',
    fontStyle: variant === 'testimonial' ? 'italic' : 'normal',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    ...descriptionStyle,
  };

  const footerStyles: React.CSSProperties = {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  };

  const handleClick = () => {
    if (onPress) onPress();
  };

  return (
    <div
      className={onPress ? "interactive" : ""}
      style={{ ...baseStyles, ...style }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (onPress) {
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(102, 153, 255, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (onPress) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Animated border gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '16px',
          padding: '1px',
          background: 'linear-gradient(45deg, rgba(102, 153, 255, 0.3), rgba(153, 102, 204, 0.3), rgba(217, 232, 245, 0.3))',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease infinite',
          zIndex: -1,
        }}
      >
        <div
          style={{
            borderRadius: '15px',
            background: 'rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {imageSource && (
        <img
          src={typeof imageSource === 'string' ? imageSource : imageSource.uri}
          alt={title}
          style={imageStyles}
        />
      )}

      <div style={contentStyles}>
        <h3 style={titleStyles}>
          {title}
        </h3>

        {description && (
          <p style={descriptionStyles}>
            {description}
          </p>
        )}

        {footer && (
          <div style={footerStyles}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Add gradient animation to global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
}