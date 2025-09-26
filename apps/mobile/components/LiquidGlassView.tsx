import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../contexts/ThemeContext';

interface LiquidGlassViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  variant?: 'light' | 'dark' | 'prominent' | 'regular' | 'extraLight';
  borderRadius?: number;
  showBorder?: boolean;
  showShadow?: boolean;
  shadowType?: 'card' | 'button';
}

export const LiquidGlassView: React.FC<LiquidGlassViewProps> = ({
  children,
  style,
  intensity = 50,
  variant = 'light',
  borderRadius = 16,
  showBorder = true,
  showShadow = true,
  shadowType = 'card',
}) => {
  const { colors, theme } = useTheme();

  // Determine blur type based on theme and variant
  const getBlurType = () => {
    if (Platform.OS !== 'ios') return 'light';

    if (theme === 'dark') {
      switch (variant) {
        case 'light': return 'xlight';
        case 'dark': return 'dark';
        case 'prominent': return 'light';
        case 'regular': return 'dark';
        case 'extraLight': return 'xlight';
        default: return 'dark';
      }
    } else { // light theme
      switch (variant) {
        case 'light': return 'light';
        case 'dark': return 'dark';
        case 'prominent': return 'light';
        case 'regular': return 'light';
        case 'extraLight': return 'xlight';
        default: return 'light';
      }
    }
  };

  // Determine shadow values based on shadowType
  const getShadowStyle = () => {
    if (!showShadow) return {};

    const isCardShadow = shadowType === 'card';
    
    // For card shadows
    if (isCardShadow) {
      return theme === 'dark' 
        ? {
            shadowColor: '#6699FF',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 8,
          }
        : {
            shadowColor: '#6699FF',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.35,
            shadowRadius: 16,
            elevation: 8,
          };
    } 
    // For button shadows
    else {
      return theme === 'dark'
        ? {
            shadowColor: '#6699FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 6,
          }
        : {
            shadowColor: '#6699FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 6,
          };
    }
  };

  // Fallback styles for Android
  const androidFallbackStyle = {
    backgroundColor: theme === 'dark'
      ? 'rgba(42, 47, 62, 0.85)'
      : 'rgba(255, 255, 255, 0.85)',
    borderColor: theme === 'dark'
      ? 'rgba(102, 153, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.3)',
  };

  const baseStyle = [
    styles.container,
    {
      borderRadius,
      borderWidth: showBorder ? 1 : 0,
      overflow: 'hidden' as const,
    },
    getShadowStyle(),
    Platform.OS === 'android' && androidFallbackStyle,
  ].filter(Boolean);

  if (Platform.OS === 'ios') {
    return (
      <View style={style ? [baseStyle, style] : baseStyle}>
        <BlurView
          style={styles.blurView}
          blurType={getBlurType()}
          blurAmount={intensity}
          reducedTransparencyFallbackColor={colors.glassBackground}
        />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    );
  }

  // Android fallback with manual glass effect
  return (
    <View style={style ? [baseStyle, style] : baseStyle}>
      {/* Glass overlay for Android */}
      <View
        style={[
          styles.androidGlassOverlay,
          {
            backgroundColor: theme === 'dark'
              ? 'rgba(102, 153, 255, 0.08)'
              : 'rgba(255, 255, 255, 0.15)',
            borderRadius,
          }
        ]}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  shadow: {
    shadowColor: '#6699FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  androidGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});