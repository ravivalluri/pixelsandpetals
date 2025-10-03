import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleSheet, View } from 'react-native';
import { colors, typography, spacing, borderRadius } from '..';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
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
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={textStyles}>Loading...</Text>
        </View>
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
  },

  // Variants
  primary: {
    backgroundColor: colors.accentPop,
    borderColor: colors.accentPop,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.accentPop,
  },
  subtle: {
    backgroundColor: colors.lightGray,
    borderColor: colors.lightGray,
  },

  // Sizes
  sm: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minHeight: 36,
  },
  md: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    minHeight: 44,
  },
  lg: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    minHeight: 52,
  },

  // Disabled state
  disabled: {
    opacity: 0.6,
  },

  // Text styles
  baseText: {
    fontFamily: typography.fonts.body,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },

  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.accentPop,
  },
  subtleText: {
    color: colors.darkGray,
  },

  smText: {
    fontSize: typography.fontSizes.sm,
  },
  mdText: {
    fontSize: typography.fontSizes.base,
  },
  lgText: {
    fontSize: typography.fontSizes.lg,
  },

  disabledText: {
    opacity: 0.6,
  },

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});