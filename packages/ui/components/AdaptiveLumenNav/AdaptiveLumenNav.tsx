import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions, StatusBar, Platform } from 'react-native';
import { colors, spacing, typography } from '../../tokens';

interface NavItem {
  id: string;
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: string;
}

interface ContextualSuggestion {
  id: string;
  text: string;
  icon: string;
  action: () => void;
  condition: (scrollPosition: number, timeOnPage: number, currentSection: string) => boolean;
}

interface AdaptiveLumenNavProps {
  items: NavItem[];
  logo?: string;
  onMenuPress?: () => void;
  onSearch?: (query: string) => void;
  contextualSuggestions?: ContextualSuggestion[];
  currentSection?: string;
  style?: any;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export const AdaptiveLumenNav: React.FC<AdaptiveLumenNavProps> = ({
  items,
  logo = "PixelsAndPetals",
  onMenuPress,
  onSearch,
  contextualSuggestions = [],
  currentSection = 'home',
  style,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [activeContextualSuggestion, setActiveContextualSuggestion] = useState<ContextualSuggestion | null>(null);

  const menuAnimation = useRef(new Animated.Value(0)).current;
  const hamburgerAnimation = useRef(new Animated.Value(0)).current;
  const logoGlowAnimation = useRef(new Animated.Value(0)).current;
  const contextualOrbAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const suggestion = contextualSuggestions.find(s =>
      s.condition(scrollPosition, timeOnPage, currentSection)
    );

    if (suggestion !== activeContextualSuggestion) {
      setActiveContextualSuggestion(suggestion || null);

      Animated.sequence([
        Animated.timing(contextualOrbAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(contextualOrbAnimation, {
          toValue: suggestion ? 1 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [scrollPosition, timeOnPage, currentSection, contextualSuggestions, activeContextualSuggestion]);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(hamburgerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(hamburgerAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };

  const triggerLogoGlow = () => {
    Animated.sequence([
      Animated.timing(logoGlowAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(logoGlowAnimation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getNavOpacity = () => {
    if (scrollPosition < 100) return 0.3;
    if (scrollPosition < 300) return 0.5 + (scrollPosition - 100) * 0.002;
    return 0.9;
  };

  const handleItemPress = (item: NavItem) => {
    item.onPress();
    closeMenu();
    triggerLogoGlow();
  };

  const renderHamburgerIcon = () => {
    const line1Rotation = hamburgerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const line2Opacity = hamburgerAnimation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 0],
    });

    const line3Rotation = hamburgerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-45deg'],
    });

    const line1TranslateY = hamburgerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    });

    const line3TranslateY = hamburgerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8],
    });

    return (
      <View style={styles.hamburgerContainer}>
        <Animated.View
          style={[
            styles.hamburgerLine,
            {
              transform: [
                { translateY: line1TranslateY },
                { rotate: line1Rotation },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.hamburgerLine,
            {
              opacity: line2Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.hamburgerLine,
            {
              transform: [
                { translateY: line3TranslateY },
                { rotate: line3Rotation },
              ],
            },
          ]}
        />
      </View>
    );
  };

  const renderLiquidGlassDrawer = () => {
    const drawerTranslateX = menuAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, 0],
    });

    const backgroundOpacity = menuAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalBackground,
              {
                opacity: backgroundOpacity,
              },
            ]}
          />

          <Animated.View
            style={[
              styles.liquidGlassDrawer,
              {
                transform: [{ translateX: drawerTranslateX }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Navigation</Text>
              <TouchableOpacity
                onPress={closeMenu}
                style={styles.closeButton}
                accessibilityLabel="Close navigation menu"
                accessibilityRole="button"
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.drawerContent} showsVerticalScrollIndicator={false}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  style={[
                    styles.drawerItem,
                    item.active && styles.drawerItemActive,
                  ]}
                  activeOpacity={0.7}
                  accessibilityLabel={`Navigate to ${item.label}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item.active }}
                >
                  <View style={styles.drawerItemContent}>
                    {item.icon && (
                      <Text style={styles.drawerItemIcon}>{item.icon}</Text>
                    )}
                    <Text
                      style={[
                        styles.drawerItemText,
                        item.active && styles.drawerItemTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {item.active && (
                    <View style={styles.activeIndicator} />
                  )}

                  <View style={styles.liquidRipple} />
                </TouchableOpacity>
              ))}

              {activeContextualSuggestion && (
                <TouchableOpacity
                  onPress={() => {
                    activeContextualSuggestion.action();
                    closeMenu();
                  }}
                  style={styles.contextualSuggestionDrawer}
                  activeOpacity={0.8}
                  accessibilityLabel={activeContextualSuggestion.text}
                  accessibilityRole="button"
                  accessibilityHint="Contextual suggestion based on your activity"
                >
                  <Text style={styles.contextualSuggestionIcon}>
                    {activeContextualSuggestion.icon}
                  </Text>
                  <Text style={styles.contextualSuggestionText}>
                    {activeContextualSuggestion.text}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: `rgba(240, 248, 255, ${getNavOpacity()})`,
            borderBottomWidth: scrollPosition > 200 ? 1 : 0,
            borderBottomColor: 'rgba(102, 153, 255, 0.2)',
          },
          style,
        ]}
      >
        <View style={styles.navContent}>
          {/* Logo */}
          <TouchableOpacity
            onPress={() => {
              triggerLogoGlow();
              onMenuPress?.();
            }}
            style={styles.logoContainer}
            activeOpacity={0.8}
            accessibilityLabel="Home"
            accessibilityRole="button"
          >
            <Animated.View
              style={{
                opacity: logoGlowAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.6],
                }),
              }}
            >
              <View style={styles.logoGlow} />
            </Animated.View>
            <Text style={styles.logoText}>{logo}</Text>
          </TouchableOpacity>

          {/* Right Side Actions */}
          <View style={styles.actionsContainer}>
            {/* Contextual Orb */}
            {activeContextualSuggestion && (
              <Animated.View
                style={[
                  styles.contextualOrb,
                  {
                    opacity: contextualOrbAnimation,
                    transform: [
                      {
                        scale: contextualOrbAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={activeContextualSuggestion.action}
                  style={styles.contextualOrbButton}
                  activeOpacity={0.8}
                  accessibilityLabel={activeContextualSuggestion.text}
                  accessibilityRole="button"
                >
                  <Text style={styles.contextualOrbIcon}>
                    {activeContextualSuggestion.icon}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            {/* Menu Button */}
            <TouchableOpacity
              onPress={menuVisible ? closeMenu : openMenu}
              style={styles.menuButton}
              activeOpacity={0.8}
              accessibilityLabel={menuVisible ? "Close menu" : "Open menu"}
              accessibilityRole="button"
            >
              {renderHamburgerIcon()}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {renderLiquidGlassDrawer()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: statusBarHeight,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[3],
  },

  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },

  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 40,
    backgroundColor: colors.purple,
    borderRadius: 20,
    opacity: 0.3,
  },

  logoText: {
    ...typography.heading.h3,
    color: colors.text,
    fontWeight: '700',
    zIndex: 1,
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  contextualOrb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(153, 102, 204, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(153, 102, 204, 0.3)',
    shadowColor: colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  contextualOrbButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  contextualOrbIcon: {
    fontSize: 18,
  },

  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(102, 153, 255, 0.1)',
  },

  hamburgerContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },

  hamburgerLine: {
    width: 24,
    height: 2,
    backgroundColor: colors.text,
    borderRadius: 1,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  liquidGlassDrawer: {
    width: screenWidth * 0.85,
    height: screenHeight,
    backgroundColor: 'rgba(240, 248, 255, 0.95)',
    position: 'absolute',
    right: 0,
    top: 0,
    shadowColor: colors.blue,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
  },

  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    paddingTop: statusBarHeight + spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 153, 255, 0.2)',
  },

  drawerTitle: {
    ...typography.heading.h3,
    color: colors.text,
    fontWeight: '600',
  },

  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(102, 153, 255, 0.1)',
  },

  closeButtonText: {
    fontSize: 18,
    color: colors.text,
  },

  drawerContent: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
  },

  drawerItem: {
    marginBottom: spacing[2],
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },

  drawerItemActive: {
    backgroundColor: 'rgba(102, 153, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(102, 153, 255, 0.3)',
  },

  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },

  drawerItemIcon: {
    fontSize: 20,
    marginRight: spacing[3],
  },

  drawerItemText: {
    ...typography.body.large,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },

  drawerItemTextActive: {
    color: colors.blue,
    fontWeight: '600',
  },

  activeIndicator: {
    position: 'absolute',
    right: spacing[4],
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.blue,
    transform: [{ translateY: -3 }],
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },

  liquidRipple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(102, 153, 255, 0.1)',
    opacity: 0,
  },

  contextualSuggestionDrawer: {
    marginTop: spacing[6],
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    backgroundColor: 'rgba(153, 102, 204, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(153, 102, 204, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },

  contextualSuggestionIcon: {
    fontSize: 24,
  },

  contextualSuggestionText: {
    ...typography.body.regular,
    color: colors.purple,
    fontWeight: '600',
    flex: 1,
  },
});