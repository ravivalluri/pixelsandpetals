import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius } from '..';
import { Button } from '../Button';

export interface CTAConfig {
  id: string;
  title: string;
  description?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  icon?: string;
}

export interface PageCTAMapping {
  [key: string]: CTAConfig;
}

export interface AdaptiveStickyCTAProps {
  currentPage: string;
  ctaMapping: PageCTAMapping;
  defaultCTA?: CTAConfig;
  style?: any;
}

const { width } = Dimensions.get('window');

export const AdaptiveStickyCTA: React.FC<AdaptiveStickyCTAProps> = ({
  currentPage,
  ctaMapping,
  defaultCTA,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const slideAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const currentCTA = ctaMapping[currentPage] || defaultCTA;

  if (!currentCTA) return null;

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismiss}
        >
          <Text style={styles.dismissButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.ctaContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {currentCTA.icon && (
                <Text style={styles.icon}>{currentCTA.icon} </Text>
              )}
              {currentCTA.title}
            </Text>

            {currentCTA.description && (
              <Text style={styles.description}>
                {currentCTA.description}
              </Text>
            )}
          </View>

          <Button
            title="Get Started"
            onPress={currentCTA.onPress}
            variant={currentCTA.variant || 'primary'}
            size="sm"
            style={styles.ctaButton}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 2,
    borderTopColor: colors.accentPop,
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
  },

  content: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    paddingBottom: spacing[6], // Account for safe area
  },

  dismissButton: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[4],
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  dismissButtonText: {
    fontSize: typography.fontSizes.xs,
    color: colors.darkGray,
    fontWeight: typography.fontWeights.medium,
  },

  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing[8], // Space for dismiss button
  },

  textContainer: {
    flex: 1,
    marginRight: spacing[4],
  },

  title: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
    marginBottom: spacing[1],
    lineHeight: typography.lineHeights.tight,
  },

  icon: {
    fontSize: typography.fontSizes.lg,
  },

  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.snug,
  },

  ctaButton: {
    minWidth: 100,
    paddingHorizontal: spacing[4],
  },
});