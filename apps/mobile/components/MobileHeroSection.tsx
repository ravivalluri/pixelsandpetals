import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, spacing } from '@pixelsandpetals/ui';
import { Button } from '../../../packages/ui/components/Button/Button.native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const MobileHeroSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Background Gradient Effect */}
      <View style={styles.backgroundGradient} />

      {/* Hero Content */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>
            Pixels & Petals
          </Text>
          <Text style={styles.subtitle}>
            Digital Solutions
          </Text>
          <Text style={styles.tagline}>
            Crafting beautiful digital experiences that bloom
          </Text>
        </View>

        <View style={styles.ctaContainer}>
          <Button
            title="Start Your Project"
            onPress={() => console.log('Start project pressed')}
            variant="primary"
            size="lg"
            style={styles.primaryCta}
          />
          <Button
            title="View Portfolio"
            onPress={() => console.log('View portfolio pressed')}
            variant="secondary"
            size="lg"
            style={styles.secondaryCta}
          />
        </View>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={[styles.floatingCard, styles.card1]} />
        <View style={[styles.floatingCard, styles.card2]} />
        <View style={[styles.floatingCard, styles.card3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: screenHeight * 0.85,
    backgroundColor: colors.coreDark,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    opacity: 0.6,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[12],
    zIndex: 2,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing[10],
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing[2],
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.accentPop,
    textAlign: 'center',
    marginBottom: spacing[4],
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 280,
  },
  ctaContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing[4],
  },
  primaryCta: {
    width: '100%',
    maxWidth: 280,
  },
  secondaryCta: {
    width: '100%',
    maxWidth: 280,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  floatingCard: {
    position: 'absolute',
    backgroundColor: `${colors.accentPop}15`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.accentPop}30`,
  },
  card1: {
    width: 120,
    height: 80,
    top: '20%',
    left: '10%',
    transform: [{ rotate: '15deg' }],
  },
  card2: {
    width: 100,
    height: 60,
    top: '60%',
    right: '15%',
    transform: [{ rotate: '-10deg' }],
  },
  card3: {
    width: 80,
    height: 100,
    bottom: '30%',
    left: '20%',
    transform: [{ rotate: '8deg' }],
  },
});