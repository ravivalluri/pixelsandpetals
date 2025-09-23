import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing } from '../../tokens';
import { Button } from '../Button';

export interface NavigationItem {
  label: string;
  onPress: () => void;
  active?: boolean;
}

export interface NavigationProps {
  logo?: string;
  items: NavigationItem[];
  ctaButton?: {
    title: string;
    onPress: () => void;
  };
  style?: any;
}

export const Navigation: React.FC<NavigationProps> = ({
  logo = 'Pixels & Petals',
  items,
  ctaButton,
  style,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (Platform.OS !== 'web') {
    // Mobile Navigation
    return (
      <View style={[styles.mobileContainer, style]}>
        <View style={styles.mobileHeader}>
          <Text style={styles.logo}>{logo}</Text>

          <TouchableOpacity
            style={styles.hamburger}
            onPress={toggleMobileMenu}
          >
            <View style={[styles.hamburgerLine, mobileMenuOpen && styles.hamburgerLineRotated]} />
            <View style={[styles.hamburgerLine, mobileMenuOpen && styles.hamburgerLineHidden]} />
            <View style={[styles.hamburgerLine, mobileMenuOpen && styles.hamburgerLineRotated]} />
          </TouchableOpacity>
        </View>

        {mobileMenuOpen && (
          <View style={styles.mobileMenu}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.mobileNavItem, item.active && styles.mobileNavItemActive]}
                onPress={() => {
                  item.onPress();
                  setMobileMenuOpen(false);
                }}
              >
                <Text style={[styles.mobileNavText, item.active && styles.mobileNavTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            {ctaButton && (
              <View style={styles.mobileCTA}>
                <Button
                  title={ctaButton.title}
                  onPress={() => {
                    ctaButton.onPress();
                    setMobileMenuOpen(false);
                  }}
                  size="lg"
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }

  // Web Navigation
  return (
    <View style={[styles.webContainer, style]}>
      <Text style={styles.logo}>{logo}</Text>

      <View style={styles.webNavItems}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.webNavItem, item.active && styles.webNavItemActive]}
            onPress={item.onPress}
          >
            <Text style={[styles.webNavText, item.active && styles.webNavTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        {ctaButton && (
          <Button
            title={ctaButton.title}
            onPress={ctaButton.onPress}
            style={styles.webCTA}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Web styles
  webContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    height: 80,
  },

  // Mobile styles
  mobileContainer: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  mobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    height: 64,
  },

  logo: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
  },

  // Web navigation items
  webNavItems: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: spacing.6, // 'gap' is not supported in React Native
  },

  webNavItem: {
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
  },

  webNavItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.accentPop,
  },

  webNavText: {
    fontSize: typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: colors.darkGray,
    fontWeight: typography.fontWeights.medium,
  },

  webNavTextActive: {
    color: colors.accentPop,
  },

  webCTA: {
    marginLeft: spacing[4],
  },

  // Mobile hamburger menu
  hamburger: {
    width: 24,
    height: 24,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },

  hamburgerLine: {
    width: 24,
    height: 2,
    backgroundColor: colors.darkGray,
    borderRadius: 1,
  },

  hamburgerLineRotated: {
    transform: [{ rotate: '45deg' }],
  },

  hamburgerLineHidden: {
    opacity: 0,
  },

  // Mobile menu
  mobileMenu: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingVertical: spacing[4],
  },

  mobileNavItem: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },

  mobileNavItemActive: {
    backgroundColor: colors.lightGray,
    borderLeftWidth: 4,
    borderLeftColor: colors.accentPop,
  },

  mobileNavText: {
    fontSize: typography.fontSizes.lg,
    fontFamily: typography.fonts.body,
    color: colors.darkGray,
    fontWeight: typography.fontWeights.medium,
  },

  mobileNavTextActive: {
    color: colors.accentPop,
    fontWeight: typography.fontWeights.semibold,
  },

  mobileCTA: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
  },
});