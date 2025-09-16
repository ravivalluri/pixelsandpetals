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
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.lightGray}`,
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(136, 136, 136, 0.1)',
    marginBottom: variant === 'portfolio' ? spacing[6] : spacing[4],
    cursor: onPress ? 'pointer' : 'default',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const hoverStyles: React.CSSProperties = onPress ? {
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(136, 136, 136, 0.15)',
    }
  } : {};

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
    color: colors.coreDark,
    marginBottom: spacing[2],
    textAlign: variant === 'service' || variant === 'testimonial' ? 'center' : 'left',
    ...titleStyle,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: variant === 'service' ? typography.fontSizes.sm : typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: variant === 'testimonial' ? colors.darkGray : colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[3],
    textAlign: variant === 'service' || variant === 'testimonial' ? 'center' : 'left',
    fontStyle: variant === 'testimonial' ? 'italic' : 'normal',
    ...descriptionStyle,
  };

  const footerStyles: React.CSSProperties = {
    marginTop: spacing[3],
    paddingTop: spacing[3],
    borderTop: `1px solid ${colors.lightGray}`,
  };

  const handleClick = () => {
    if (onPress) onPress();
  };

  return (
    <div
      style={{ ...baseStyles, ...hoverStyles, ...style }}
      onClick={handleClick}
    >
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