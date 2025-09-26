import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { LiquidGlassView } from './LiquidGlassView';
import { useTheme } from '../contexts/ThemeContext';
import { spacing } from '@pixelsandpetals/ui';

interface LiquidGlassButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  blurIntensity?: number;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  blurIntensity = 50,
}) => {
  const { colors, theme } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[2],
          minHeight: spacing[10],
        };
      case 'large':
        return {
          paddingHorizontal: spacing[10],
          paddingVertical: spacing[5],
          minHeight: 56,
        };
      default: // medium
        return {
          paddingHorizontal: spacing[8],
          paddingVertical: spacing[4],
          minHeight: spacing[12],
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default: // medium
        return 16;
    }
  };

  const getVariantStyles = () => {
    let glassVariant: 'light' | 'dark' | 'prominent' | 'regular' | 'extraLight';
    if (variant === 'primary') {
      glassVariant = theme === 'dark' ? 'prominent' : 'light';
      return {
        glassProps: {
          variant: glassVariant,
          intensity: blurIntensity,
          showBorder: true,
          showShadow: true,
        },
        containerStyle: {
          backgroundColor: Platform.OS === 'ios'
            ? `${colors.primaryAccent}CC` // 80% opacity for iOS to ensure visibility
            : `${colors.primaryAccent}E6`, // 90% opacity fallback for Android
        },
        textColor: '#FFFFFF',
      };
    } else {
      glassVariant = theme === 'dark' ? 'regular' : 'extraLight';
      return {
        glassProps: {
          variant: glassVariant,
          intensity: blurIntensity * 0.7,
          showBorder: true,
          showShadow: true, // Enable shadow for both variants
        },
        containerStyle: {
          backgroundColor: Platform.OS === 'ios'
            ? 'transparent'
            : colors.glassBackground,
        },
        textColor: colors.primaryAccent,
      };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantConfig = getVariantStyles();

  const buttonStyle = [
    styles.button,
    sizeStyles,
    variantConfig.containerStyle,
    disabled && styles.disabled,
    style,
  ];

  const fontWeight: '600' | '500' = variant === 'primary' ? '600' : '500';

  const buttonTextStyle: (TextStyle | undefined)[] = [
    styles.text,
    {
      fontSize: getTextSize(),
      color: disabled ? colors.textSubtle : variantConfig.textColor,
      fontWeight,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={styles.touchable}
    >
      <LiquidGlassView
        {...variantConfig.glassProps}
        style={buttonStyle}
        borderRadius={size === 'small' ? 12 : size === 'large' ? 20 : 16}
      >
        <Text style={buttonTextStyle}>{title}</Text>
      </LiquidGlassView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignSelf: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});