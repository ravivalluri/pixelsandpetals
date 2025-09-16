import React from 'react';
import { colors, typography, spacing, borderRadius } from '../../tokens';

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
    borderRadius: borderRadius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: typography.fonts.body,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.accentPop,
      borderColor: colors.accentPop,
      color: colors.white,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: colors.accentPop,
      color: colors.accentPop,
    },
    subtle: {
      backgroundColor: colors.lightGray,
      borderColor: colors.lightGray,
      color: colors.darkGray,
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
      style={buttonStyle}
      onClick={onPress}
      disabled={disabled || loading}
    >
      <span style={finalTextStyle}>
        {loading ? 'Loading...' : title}
      </span>
    </button>
  );
};