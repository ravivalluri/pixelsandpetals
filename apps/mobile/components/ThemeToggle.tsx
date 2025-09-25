import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [animatedValue] = React.useState(new Animated.Value(theme === 'dark' ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme === 'dark' ? 1 : 0,
      duration: 400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [theme, animatedValue]);

  const handleToggle = () => {
    toggleTheme();
  };

  const SunIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <G>
        <Circle cx="12" cy="12" r="4" stroke={colors.textPrimary} strokeWidth="2" fill="none"/>
        <Path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41"
          stroke={colors.textPrimary}
          strokeWidth="2"
        />
      </G>
    </Svg>
  );

  const MoonIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke={colors.textPrimary}
        strokeWidth="2"
        fill={colors.textPrimary}
        fillOpacity="0.2"
      />
    </Svg>
  );

  const sunTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const sunRotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const sunOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const moonTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const moonRotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '0deg'],
  });

  const moonOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const backgroundScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.glassBackground,
          borderColor: colors.glassBorder,
        },
      ]}
      onPress={handleToggle}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Animated background circle */}
      <Animated.View
        style={[
          styles.backgroundCircle,
          {
            backgroundColor: theme === 'light'
              ? 'rgba(255, 193, 7, 0.2)'
              : 'rgba(102, 153, 255, 0.2)',
            transform: [{ scale: backgroundScale }],
          },
        ]}
      />

      {/* Sun Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              { translateY: sunTranslateY },
              { rotate: sunRotate },
            ],
            opacity: sunOpacity,
          },
        ]}
      >
        <SunIcon />
      </Animated.View>

      {/* Moon Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              { translateY: moonTranslateY },
              { rotate: moonRotate },
            ],
            opacity: moonOpacity,
          },
        ]}
      >
        <MoonIcon />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});