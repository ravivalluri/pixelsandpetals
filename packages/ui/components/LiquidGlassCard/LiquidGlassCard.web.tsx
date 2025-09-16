import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius } from '../../tokens';

export interface LiquidGlassCardProps {
  title: string;
  description?: string;
  imageSource?: { uri: string } | string;
  onPress?: () => void;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
  variant?: 'default' | 'portfolio' | 'service' | 'feature';
  glassIntensity?: 'light' | 'medium' | 'heavy';
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  title,
  description,
  imageSource,
  onPress,
  footer,
  style,
  variant = 'default',
  glassIntensity = 'medium',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const getGlassEffect = () => {
    switch (glassIntensity) {
      case 'light':
        return {
          background: colors.glassBlur,
          backdropFilter: 'blur(10px) saturate(150%)',
          border: `1px solid rgba(102, 153, 255, 0.1)`,
        };
      case 'heavy':
        return {
          background: `linear-gradient(135deg, ${colors.glassBlur} 0%, ${colors.glassFrost} 100%)`,
          backdropFilter: 'blur(30px) saturate(200%)',
          border: `1px solid rgba(102, 153, 255, 0.3)`,
        };
      default:
        return {
          background: `linear-gradient(135deg, ${colors.glassBlur} 0%, rgba(217, 232, 245, 0.4) 100%)`,
          backdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid rgba(102, 153, 255, 0.2)`,
        };
    }
  };

  const cardStyles: React.CSSProperties = {
    position: 'relative',
    borderRadius: variant === 'feature' ? '24px' : '16px',
    padding: variant === 'service' ? spacing[6] : spacing[5],
    cursor: onPress ? 'pointer' : 'default',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered
      ? `0 20px 60px ${colors.glassGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
      : `0 8px 32px rgba(102, 153, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    overflow: 'hidden',
    marginBottom: spacing[4],
    ...getGlassEffect(),
    ...style,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: variant === 'feature' ? typography.fontSizes['2xl'] : typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    fontFamily: typography.fonts.heading,
    color: colors.textDark,
    marginBottom: spacing[3],
    lineHeight: typography.lineHeights.tight,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.base,
    color: colors.textSubtle,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: footer ? spacing[4] : 0,
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: variant === 'portfolio' ? '250px' : '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: spacing[4],
    transition: 'transform 0.4s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  const reflectionOverlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: `${mousePosition.x - 50}%`,
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, transparent 0%, ${colors.glassGlow} 50%, transparent 100%)`,
    transform: 'rotate(45deg)',
    opacity: isHovered ? 0.6 : 0,
    transition: 'all 0.3s ease',
    pointerEvents: 'none',
    filter: 'blur(20px)',
  };

  const chromaticAberrationStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    filter: isHovered ? 'url(#chromatic-aberration)' : 'none',
    transition: 'filter 0.3s ease',
    pointerEvents: 'none',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onPress}
    >
      {/* SVG Filter for Chromatic Aberration */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="chromatic-aberration">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red"/>
            <feOffset in="red" dx="1" dy="0" result="red-offset"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green"/>
            <feOffset in="green" dx="-1" dy="0" result="green-offset"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue"/>
            <feBlend mode="screen" in="red-offset" in2="green-offset" result="temp"/>
            <feBlend mode="screen" in="temp" in2="blue"/>
          </filter>
        </defs>
      </svg>

      {/* Reflection overlay */}
      <div style={reflectionOverlayStyles} />

      {/* Chromatic aberration overlay */}
      <div style={chromaticAberrationStyles} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {imageSource && (
          <img
            src={typeof imageSource === 'string' ? imageSource : imageSource.uri}
            alt={title}
            style={imageStyles}
          />
        )}

        <h3 style={titleStyles}>
          {title}
        </h3>

        {description && (
          <p style={descriptionStyles}>
            {description}
          </p>
        )}

        {footer && (
          <div style={{
            paddingTop: spacing[3],
            borderTop: `1px solid rgba(102, 153, 255, 0.1)`,
          }}>
            {footer}
          </div>
        )}
      </div>

      {/* Liquid glimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: isHovered ? '100%' : '-100%',
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, ${colors.glassGlow}, transparent)`,
        transform: 'skewX(-20deg)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
    </div>
  );
};