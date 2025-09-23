import React from 'react';
import { typography, spacing } from '../../tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const baseStyles: React.CSSProperties = {
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    cursor: disabled ? 'not-allowed' : 'none',
    fontFamily: typography.fonts.body,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    opacity: disabled ? 0.5 : 1,
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(12px) saturate(1.4)',
    WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
    transform: 'translateZ(0)', // Force GPU acceleration
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg, rgba(102, 153, 255, 0.2) 0%, rgba(153, 102, 204, 0.2) 100%)',
      border: '1px solid rgba(102, 153, 255, 0.3)',
      color: 'rgba(255, 255, 255, 0.9)',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    subtle: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  };

  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      paddingLeft: spacing[4],
      paddingRight: spacing[4],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      minHeight: 36,
      fontSize: typography.fontSizes.sm,
    },
    md: {
      paddingLeft: spacing[6],
      paddingRight: spacing[6],
      paddingTop: spacing[3],
      paddingBottom: spacing[3],
      minHeight: 44,
      fontSize: typography.fontSizes.base,
    },
    lg: {
      paddingLeft: spacing[8],
      paddingRight: spacing[8],
      paddingTop: spacing[4],
      paddingBottom: spacing[4],
      minHeight: 52,
      fontSize: typography.fontSizes.lg,
    },
  };

  const buttonStyle: React.CSSProperties = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  const finalTextStyle: React.CSSProperties = {
    ...textStyle,
  };

  return (
    <button
      className="interactive"
      style={buttonStyle}
      onClick={onPress}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px) translateZ(0)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 153, 255, 0.3)';
          } else {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.1)';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Shimmer effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: 'shimmer 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, ...finalTextStyle }}>
        {loading ? 'Loading...' : title}
      </span>
    </button>
  );
};

// Add shimmer animation to global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `;
  document.head.appendChild(style);
}