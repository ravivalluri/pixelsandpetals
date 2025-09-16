import React, { useState, useEffect } from 'react';
import { colors, typography, spacing } from '../../tokens';

export interface NavigationItem {
  label: string;
  onPress: () => void;
  active?: boolean;
}

export interface LiquidGlassNavProps {
  logo?: string;
  items: NavigationItem[];
  ctaButton?: {
    title: string;
    onPress: () => void;
  };
  style?: React.CSSProperties;
}

export const LiquidGlassNav: React.FC<LiquidGlassNavProps> = ({
  logo = 'Pixels & Petals',
  items,
  ctaButton,
  style,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Show/hide based on scroll direction (optional)
      setIsVisible(currentScrollY < 100 || currentScrollY < scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  const navStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: scrollY > 50
      ? `rgba(240, 248, 255, 0.8)`
      : `rgba(217, 232, 245, 0.4)`,
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderBottom: `1px solid rgba(102, 153, 255, ${scrollY > 50 ? 0.2 : 0.1})`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: `translateY(${isVisible ? 0 : -100}%)`,
    ...style,
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing[4]}px ${spacing[6]}px`,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const logoStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    background: `linear-gradient(135deg, ${colors.textDark} 0%, ${colors.primaryAccent} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const navItemsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[6],
  };

  const getNavItemStyles = (isActive: boolean): React.CSSProperties => ({
    position: 'relative',
    padding: `${spacing[2]}px ${spacing[4]}px`,
    fontSize: typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: isActive ? colors.primaryAccent : colors.textDark,
    fontWeight: isActive ? typography.fontWeights.semibold : typography.fontWeights.medium,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
  });

  const getActiveIndicatorStyles = (): React.CSSProperties => ({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${colors.primaryAccent}, transparent)`,
    borderRadius: '1px',
  });

  const ctaButtonStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primaryAccent} 0%, ${colors.secondaryAccent} 100%)`,
    border: 'none',
    borderRadius: '12px',
    padding: `${spacing[2]}px ${spacing[4]}px`,
    color: colors.pureWhite,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 4px 16px ${colors.glassGlow}`,
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <h1
          style={logoStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = `drop-shadow(0 0 10px ${colors.glassGlow})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'none';
          }}
        >
          {logo}
        </h1>

        <div style={navItemsStyles}>
          {items.map((item, index) => (
            <button
              key={index}
              style={getNavItemStyles(item.active || false)}
              onClick={item.onPress}
              onMouseEnter={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = colors.glassBlur;
                  e.currentTarget.style.color = colors.primaryAccent;
                }
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                if (!item.active) {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = colors.textDark;
                }
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item.label}
              {item.active && <div style={getActiveIndicatorStyles()} />}

              {/* Liquid flow effect on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${colors.glassGlow}, transparent)`,
                transition: 'left 0.5s ease',
                pointerEvents: 'none',
              }} />
            </button>
          ))}

          {ctaButton && (
            <button
              style={ctaButtonStyles}
              onClick={ctaButton.onPress}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${colors.glassGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${colors.glassGlow}`;
              }}
            >
              {ctaButton.title}

              {/* Glimmer effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shimmer 3s infinite',
                pointerEvents: 'none',
              }} />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </nav>
  );
};