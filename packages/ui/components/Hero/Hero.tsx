import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography, spacing } from '../../tokens';
import { Button, ButtonProps } from '../Button';

export interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: { uri: string } | number;
  backgroundColor?: string;
  primaryAction?: Omit<ButtonProps, 'style'>;
  secondaryAction?: Omit<ButtonProps, 'style'>;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  overlay?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = colors.background,
  primaryAction,
  secondaryAction,
  style,
  titleStyle,
  subtitleStyle,
  overlay = true,
}) => {
  const content = (
    <>
      {overlay && backgroundImage && <View style={styles.overlay} />}

      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]}>
          {title}
        </Text>

        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        )}

        {(primaryAction || secondaryAction) && (
          <View style={styles.actions}>
            {primaryAction && (
              <Button
                {...primaryAction}
                style={[styles.primaryButton, primaryAction.style]}
              />
            )}

            {secondaryAction && (
              <Button
                {...secondaryAction}
                variant="secondary"
                style={[styles.secondaryButton, secondaryAction.style]}
              />
            )}
          </View>
        )}
      </View>
    </>
  );

  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={[styles.container, style]}
        imageStyle={styles.backgroundImage}
      >
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  backgroundImage: {
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.6,
    paddingVertical: spacing.12,
    maxWidth: 800,
    zIndex: 1,
  },

  title: {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    textAlign: 'center',
    marginBottom: spacing.4,
    lineHeight: typography.lineHeights.tight,
  },

  subtitle: {
    fontSize: typography.fontSizes.xl,
    fontFamily: typography.fonts.body,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: spacing.8,
    lineHeight: typography.lineHeights.relaxed,
    maxWidth: 600,
  },

  actions: {
    flexDirection: 'row',
    gap: spacing.4,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  primaryButton: {
    minWidth: 150,
  },

  secondaryButton: {
    minWidth: 150,
  },
});