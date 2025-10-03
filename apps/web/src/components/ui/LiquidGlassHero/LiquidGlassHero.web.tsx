import React, { useState, useEffect, useRef } from 'react';
import { colors, typography, spacing } from '..';
import { Button, ButtonProps } from '../Button/Button.web';

export interface LiquidGlassHeroProps {
  title: string;
  subtitle?: string;
  primaryAction?: Omit<ButtonProps, 'style'>;
  secondaryAction?: Omit<ButtonProps, 'style'>;
  backgroundImage?: string;
  style?: React.CSSProperties;
}

export const LiquidGlassHero: React.FC<LiquidGlassHeroProps> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  backgroundImage,
  style,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 50%, ${colors.glassFrost} 100%)`,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  // Dynamic gradient based on mouse position
  const dynamicGradientStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors.glassGlow} 0%, transparent 50%)`,
    transition: 'background 0.3s ease',
    zIndex: 1,
  };

  // Animated background particles
  const particleContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  };

  // Frosted glass main panel
  const glassPanelStyles: React.CSSProperties = {
    position: 'relative',
    background: `linear-gradient(135deg, ${colors.glassBlur} 0%, ${colors.glassFrost} 100%)`,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid rgba(102, 153, 255, 0.2)`,
    borderRadius: '24px',
    padding: `${spacing[12]}px ${spacing[8]}px`,
    maxWidth: '800px',
    textAlign: 'center',
    boxShadow: `
      0 8px 32px ${colors.glassGlow},
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      0 0 0 1px rgba(102, 153, 255, 0.1)
    `,
    transform: `translateY(${scrollY * 0.1}px)`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 10,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    background: `linear-gradient(135deg, ${colors.textDark} 0%, ${colors.primaryAccent} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: spacing[6],
    lineHeight: typography.lineHeights.tight,
    textShadow: `0 0 20px ${colors.glassGlow}`,
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.xl,
    fontFamily: typography.fonts.body,
    color: colors.textDark,
    marginBottom: spacing[8],
    lineHeight: typography.lineHeights.relaxed,
    opacity: 0.9,
  };

  const actionsStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const glassButtonStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primaryAccent} 0%, ${colors.secondaryAccent} 100%)`,
    border: 'none',
    borderRadius: '12px',
    padding: `${spacing[3]}px ${spacing[6]}px`,
    color: colors.pureWhite,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 4px 20px ${colors.glassGlow}`,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    minWidth: '150px',
  };

  const secondaryButtonStyles: React.CSSProperties = {
    background: `rgba(102, 153, 255, 0.1)`,
    border: `2px solid ${colors.primaryAccent}`,
    borderRadius: '12px',
    padding: `${spacing[3]}px ${spacing[6]}px`,
    color: colors.primaryAccent,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    minWidth: '150px',
  };

  // Floating glass orbs
  const renderFloatingOrbs = () => {
    const orbs = [];
    for (let i = 0; i < 6; i++) {
      orbs.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors.glassGlow} 0%, ${colors.glassAmethyst} 70%, transparent 100%)`,
            backdropFilter: 'blur(10px)',
            top: `${20 + i * 15}%`,
            left: `${10 + i * 12}%`,
            animation: `float${i} ${8 + i * 2}s ease-in-out infinite`,
            zIndex: 3,
          }}
        />
      );
    }
    return orbs;
  };

  return (
    <div ref={heroRef} style={containerStyles}>
      {/* Dynamic gradient overlay */}
      <div style={dynamicGradientStyles} />

      {/* Floating glass orbs */}
      <div style={particleContainerStyles}>
        {renderFloatingOrbs()}
      </div>

      {/* Main frosted glass panel */}
      <div
        style={glassPanelStyles}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = `translateY(${scrollY * 0.1 - 4}px) scale(1.02)`;
          e.currentTarget.style.boxShadow = `
            0 12px 48px ${colors.glassGlow},
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            0 0 0 1px rgba(102, 153, 255, 0.2)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = `translateY(${scrollY * 0.1}px) scale(1)`;
          e.currentTarget.style.boxShadow = `
            0 8px 32px ${colors.glassGlow},
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 0 1px rgba(102, 153, 255, 0.1)
          `;
        }}
      >
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
              <button
                style={glassButtonStyles}
                onClick={primaryAction.onPress}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${colors.glassGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${colors.glassGlow}`;
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {primaryAction.title}
                </span>
                {/* Glimmer effect */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'shimmer 2s infinite',
                }} />
              </button>
            )}

            {secondaryAction && (
              <button
                style={secondaryButtonStyles}
                onClick={secondaryAction.onPress}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `rgba(102, 153, 255, 0.2)`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `rgba(102, 153, 255, 0.1)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {secondaryAction.title}
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(-90deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(270deg); }
        }
        @keyframes float5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(-270deg); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};