import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { colors, typography, spacing } from '../../tokens';
import { Button, ButtonProps } from '../Button';

export interface SpotlightCard {
  id: string;
  title: string;
  description: string;
  stat?: string;
  icon?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface InteractiveHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: { uri: string } | number;
  backgroundColor?: string;
  primaryAction?: Omit<ButtonProps, 'style'>;
  secondaryAction?: Omit<ButtonProps, 'style'>;
  spotlightCards: SpotlightCard[];
  style?: any;
  titleStyle?: any;
  subtitleStyle?: any;
  overlay?: boolean;
}

const { width } = Dimensions.get('window');

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = colors.background,
  primaryAction,
  secondaryAction,
  spotlightCards,
  style,
  titleStyle,
  subtitleStyle,
  overlay = true,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(contentOffset / (width * 0.8));
    if (cardIndex !== activeCardIndex) {
      setActiveCardIndex(cardIndex);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleCardPress = (card: SpotlightCard) => {
    if (card.onCtaClick) {
      card.onCtaClick();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      {/* Animated Background Pattern */}
      <View style={styles.animatedBackground} />

      {overlay && backgroundImage && <View style={styles.overlay} />}

      <View style={styles.content}>
        <Animated.View style={[styles.titleContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.title, titleStyle]}>
            {title}
          </Text>

          {subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]}>
              {subtitle}
            </Text>
          )}
        </Animated.View>

        {/* Spotlight Cards Carousel */}
        <View style={styles.spotlightContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width * 0.8}
            contentContainerStyle={styles.carouselContent}
          >
            {spotlightCards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.spotlightCard,
                  index === activeCardIndex && styles.activeSpotlightCard
                ]}
                onPress={() => handleCardPress(card)}
                activeOpacity={0.9}
              >
                <View style={styles.cardHeader}>
                  {card.icon && (
                    <Text style={styles.cardIcon}>{card.icon}</Text>
                  )}
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </View>

                <Text style={styles.cardDescription}>
                  {card.description}
                </Text>

                {card.stat && (
                  <Text style={styles.cardStat}>
                    {card.stat}
                  </Text>
                )}

                {card.ctaText && (
                  <Text style={styles.cardCta}>
                    {card.ctaText} →
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {spotlightCards.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === activeCardIndex && styles.activePaginationDot
                ]}
              />
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        {(primaryAction || secondaryAction) && (
          <View style={styles.actions}>
            {primaryAction && (
              <Button
                {...primaryAction}
                style={[styles.actionButton, primaryAction.style]}
              />
            )}

            {secondaryAction && (
              <Button
                {...secondaryAction}
                variant="secondary"
                style={[styles.actionButton, secondaryAction.style]}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  animatedBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.accentPop}05`,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[12],
    zIndex: 1,
    width: '100%',
  },

  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },

  title: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    textAlign: 'center',
    marginBottom: spacing[4],
    lineHeight: typography.lineHeights.tight,
  },

  subtitle: {
    fontSize: typography.fontSizes.lg,
    fontFamily: typography.fonts.body,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed,
    paddingHorizontal: spacing[4],
  },

  spotlightContainer: {
    width: '100%',
    marginBottom: spacing[8],
  },

  carouselContent: {
    paddingHorizontal: width * 0.1,
  },

  spotlightCard: {
    width: width * 0.8,
    backgroundColor: `${colors.white}E6`,
    borderRadius: 16,
    padding: spacing[6],
    marginHorizontal: spacing[2],
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: colors.darkGray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 0.95 }],
  },

  activeSpotlightCard: {
    transform: [{ scale: 1 }],
    borderColor: colors.accentPop,
    shadowColor: colors.accentPop,
    shadowOpacity: 0.2,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },

  cardIcon: {
    fontSize: typography.fontSizes.lg,
    marginRight: spacing[2],
  },

  cardTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.coreDark,
    flex: 1,
  },

  cardDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[3],
  },

  cardStat: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.accentPop,
    marginBottom: spacing[2],
  },

  cardCta: {
    color: colors.accentPop,
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGray,
    marginHorizontal: spacing[1],
  },

  activePaginationDot: {
    backgroundColor: colors.accentPop,
    width: 24,
  },

  actions: {
    flexDirection: 'row',
    gap: spacing[4],
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  actionButton: {
    minWidth: 140,
  },
});