import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../tokens';

export interface CardProps {
  title: string;
  description?: string;
  imageSource?: { uri: string } | number;
  onPress?: () => void;
  footer?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  imageStyle?: ImageStyle;
  variant?: 'default' | 'portfolio' | 'service' | 'testimonial';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSource,
  onPress,
  footer,
  style,
  titleStyle,
  descriptionStyle,
  imageStyle,
  variant = 'default',
}) => {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.container, styles[variant], style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.9 : 1}
    >
      {imageSource && (
        <Image
          source={imageSource}
          style={[styles.image, styles[`${variant}Image`], imageStyle]}
          resizeMode="cover"
        />
      )}

      <View style={styles.content}>
        <Text style={[styles.title, styles[`${variant}Title`], titleStyle]}>
          {title}
        </Text>

        {description && (
          <Text style={[styles.description, styles[`${variant}Description`], descriptionStyle]}>
            {description}
          </Text>
        )}

        {footer && (
          <View style={styles.footer}>
            {footer}
          </View>
        )}
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.lightGray,
    overflow: 'hidden',
    shadowColor: colors.mediumGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Variants
  default: {
    marginBottom: spacing.4,
  },
  portfolio: {
    marginBottom: spacing.6,
  },
  service: {
    marginBottom: spacing.4,
    padding: spacing.4,
  },
  testimonial: {
    marginBottom: spacing.4,
    padding: spacing.6,
  },

  image: {
    width: '100%',
    height: 200,
  },

  defaultImage: {
    height: 200,
  },
  portfolioImage: {
    height: 250,
  },
  serviceImage: {
    height: 120,
    borderRadius: borderRadius.md,
    marginBottom: spacing.3,
  },
  testimonialImage: {
    height: 80,
    width: 80,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing.3,
  },

  content: {
    padding: spacing.4,
  },

  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    marginBottom: spacing.2,
  },

  defaultTitle: {
    fontSize: typography.fontSizes.lg,
  },
  portfolioTitle: {
    fontSize: typography.fontSizes.xl,
  },
  serviceTitle: {
    fontSize: typography.fontSizes.lg,
    textAlign: 'center',
  },
  testimonialTitle: {
    fontSize: typography.fontSizes.base,
    textAlign: 'center',
  },

  description: {
    fontSize: typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing.3,
  },

  defaultDescription: {
    fontSize: typography.fontSizes.base,
  },
  portfolioDescription: {
    fontSize: typography.fontSizes.base,
  },
  serviceDescription: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
  },
  testimonialDescription: {
    fontSize: typography.fontSizes.base,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.darkGray,
  },

  footer: {
    marginTop: spacing.3,
    paddingTop: spacing.3,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
});