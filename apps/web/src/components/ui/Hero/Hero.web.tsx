import React from 'react';
import { colors, typography, spacing } from '..';
import { Button, ButtonProps } from '../Button/Button.web';

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: { uri: string } | string;
  backgroundColor?: string;
  primaryAction?: Omit<ButtonProps, 'style'>;
  secondaryAction?: Omit<ButtonProps, 'style'>;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
  overlay?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = colors.background,
  primaryAction,
  secondaryAction,
  style,
  titleStyle,
  subtitleStyle,
  overlay = true,
}) => {
  const containerStyles: React.CSSProperties = {
    minHeight: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor,
    backgroundImage: backgroundImage
      ? `url(${typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.uri})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    ...style,
  };

  const overlayStyles: React.CSSProperties = overlay && backgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  } : {};

  const contentStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing[12]}px ${spacing[6]}px`,
    maxWidth: 800,
    zIndex: 1,
    textAlign: 'center',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: backgroundImage ? colors.white : colors.coreDark,
    marginBottom: spacing[4],
    lineHeight: typography.lineHeights.tight,
    ...titleStyle,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.xl,
    fontFamily: typography.fonts.body,
    color: backgroundImage ? colors.white : colors.mediumGray,
    marginBottom: spacing[8],
    lineHeight: typography.lineHeights.relaxed,
    maxWidth: 600,
    ...subtitleStyle,
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const buttonStyles: React.CSSProperties = {
    minWidth: 150,
  };

  return (
    <div style={containerStyles}>
      {overlay && backgroundImage && <div style={overlayStyles} />}

      <div style={contentStyles}>
        <h1 style={titleStyles}>
          {title}
        </h1>

        {subtitle && (
          <p style={subtitleStyles}>
            {subtitle}
          </p>
        )}

        {(primaryAction || secondaryAction) && (
          <div style={actionsStyles}>
            {primaryAction && (
              <Button
                {...primaryAction}
                style={buttonStyles}
              />
            )}

            {secondaryAction && (
              <Button
                {...secondaryAction}
                variant="secondary"
                style={buttonStyles}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};