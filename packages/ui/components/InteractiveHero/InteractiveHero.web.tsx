import React, { useState, useEffect } from 'react';
import { colors, typography, spacing } from '../../tokens';
import { Button, ButtonProps } from '../Button/Button.web';

export interface SpotlightCard {
  id: string;
  title: string;
  description: string;
  stat?: string;
  icon?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface InteractiveHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: { uri: string } | string;
  backgroundColor?: string;
  primaryAction?: Omit<ButtonProps, 'style'>;
  secondaryAction?: Omit<ButtonProps, 'style'>;
  spotlightCards: SpotlightCard[];
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
  overlay?: boolean;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = colors.background,
  primaryAction,
  secondaryAction,
  spotlightCards,
  style,
  titleStyle,
  subtitleStyle,
  overlay = true,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animationOffset, setAnimationOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerStyles: React.CSSProperties = {
    minHeight: 600,
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
    overflow: 'hidden',
    ...style,
  };

  const animatedBackground: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(45deg, ${colors.accentPop}15 25%, transparent 25%, transparent 75%, ${colors.accentPop}15 75%, ${colors.accentPop}15), linear-gradient(45deg, ${colors.accentPop}15 25%, transparent 25%, transparent 75%, ${colors.accentPop}15 75%, ${colors.accentPop}15)`,
    backgroundSize: '60px 60px',
    backgroundPosition: `${animationOffset}px ${animationOffset}px, ${animationOffset + 30}px ${animationOffset + 30}px`,
    opacity: 0.1,
    animation: 'float 20s ease-in-out infinite',
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
    maxWidth: 1200,
    zIndex: 2,
    textAlign: 'center',
    position: 'relative',
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

  const spotlightContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
  };

  const getSpotlightCardStyles = (card: SpotlightCard, index: number): React.CSSProperties => {
    const isHovered = hoveredCard === card.id;
    const positions = [
      { top: '20%', left: '10%' },
      { top: '15%', right: '15%' },
      { bottom: '25%', left: '8%' },
      { bottom: '20%', right: '12%' },
    ];

    const position = positions[index % positions.length];

    return {
      position: 'absolute',
      ...position,
      backgroundColor: `${colors.white}${isHovered ? 'CC' : '80'}`,
      borderRadius: '12px',
      padding: spacing[4],
      minWidth: 200,
      maxWidth: 280,
      pointerEvents: 'auto',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: `scale(${isHovered ? 1.05 : 1}) translateY(${Math.sin(animationOffset * 0.01 + index) * 5}px)`,
      boxShadow: isHovered
        ? `0 20px 40px ${colors.accentPop}40`
        : `0 8px 32px ${colors.darkGray}20`,
      backdropFilter: isHovered ? 'blur(10px)' : 'blur(5px)',
      border: `1px solid ${isHovered ? colors.accentPop : colors.lightGray}`,
    };
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing[8],
  };

  const buttonStyles: React.CSSProperties = {
    minWidth: 150,
    transition: 'all 0.3s ease',
  };

  return (
    <div style={containerStyles}>
      <div style={animatedBackground} />
      {overlay && backgroundImage && <div style={overlayStyles} />}

      {/* Floating Spotlight Cards */}
      <div style={spotlightContainerStyles}>
        {spotlightCards.map((card, index) => (
          <div
            key={card.id}
            style={getSpotlightCardStyles(card, index)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={card.onCtaClick}
          >
            <div style={{
              fontSize: typography.fontSizes.sm,
              fontWeight: typography.fontWeights.semibold,
              color: colors.coreDark,
              marginBottom: spacing[1],
            }}>
              {card.icon && <span style={{ marginRight: spacing[2] }}>{card.icon}</span>}
              {card.title}
            </div>

            <div style={{
              fontSize: typography.fontSizes.xs,
              color: colors.mediumGray,
              marginBottom: spacing[2],
              lineHeight: typography.lineHeights.snug,
            }}>
              {card.description}
            </div>

            {card.stat && (
              <div style={{
                fontSize: typography.fontSizes.lg,
                fontWeight: typography.fontWeights.bold,
                color: colors.accentPop,
                marginBottom: spacing[2],
              }}>
                {card.stat}
              </div>
            )}

            {hoveredCard === card.id && card.ctaText && (
              <div style={{
                color: colors.accentPop,
                fontSize: typography.fontSizes.xs,
                fontWeight: typography.fontWeights.medium,
                opacity: 1,
                animation: 'fadeIn 0.3s ease-in-out',
              }}>
                {card.ctaText} →
              </div>
            )}
          </div>
        ))}
      </div>

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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};