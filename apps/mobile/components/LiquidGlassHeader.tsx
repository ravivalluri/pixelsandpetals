import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { PixelsPetalsLogo } from './PixelsPetalsLogo';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
  id: string;
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: string;
}

interface LiquidGlassHeaderProps {
  items: NavItem[];
  activeSection?: string;
  onScroll?: (scrollY: number) => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

export const LiquidGlassHeader: React.FC<LiquidGlassHeaderProps> = ({
  items,
  activeSection = 'home',
  onScroll,
}) => {
  const { theme, colors } = useTheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const menuAnimation = useRef(new Animated.Value(0)).current;
  const hamburgerAnimation = useRef(new Animated.Value(0)).current;
  const logoGlowAnimation = useRef(new Animated.Value(0)).current;

  // Update scroll position
  useEffect(() => {
    if (onScroll) {
      onScroll(scrollPosition);
    }
  }, [scrollPosition, onScroll]);

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

  const getGlassOpacity = () => {
    if (scrollPosition < 100) return 0.85;
    if (scrollPosition < 300) return 0.85 + (scrollPosition - 100) * 0.0005;
    return 0.95;
  };

  const getBlurIntensity = () => {
    if (scrollPosition < 100) return 0.1;
    if (scrollPosition < 300) return 0.1 + (scrollPosition - 100) * 0.002;
    return 0.5;
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
              backgroundColor: colors.textSecondary,
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
              backgroundColor: colors.textSecondary,
              opacity: line2Opacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.hamburgerLine,
            {
              backgroundColor: colors.textSecondary,
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
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={closeMenu}
          >
            <Animated.View
              style={[
                styles.modalBackgroundOverlay,
                {
                  opacity: backgroundOpacity,
                },
              ]}
            />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.liquidGlassDrawer,
              {
                backgroundColor: theme === 'dark' ? 'rgba(15, 20, 25, 0.95)' : 'rgba(240, 248, 255, 0.95)',
                transform: [{ translateX: drawerTranslateX }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <PixelsPetalsLogo width={220} height={55} theme={theme} />
              <TouchableOpacity
                onPress={closeMenu}
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: colors.glassBackground,
                    borderColor: colors.glassBorder,
                  },
                ]}
              >
                <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.drawerContent} showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleItemPress(item)}
                  style={[
                    styles.drawerItem,
                    item.active && styles.drawerItemActive,
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.drawerItemContent}>
                    {item.icon && (
                      <Text style={styles.drawerItemIcon}>{item.icon}</Text>
                    )}
                    <Text
                      style={[
                        styles.drawerItemText,
                        {
                          color: item.active ? colors.primaryAccent : colors.textSecondary,
                        },
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
            backgroundColor: theme === 'dark'
              ? `rgba(15, 20, 25, ${getGlassOpacity()})`
              : `rgba(240, 248, 255, ${getGlassOpacity()})`,
            borderBottomWidth: scrollPosition > 200 ? 1 : 0,
            borderBottomColor: colors.glassBorder,
          },
        ]}
      >
        {/* Glass blur overlay effect */}
        <View
          style={[
            styles.glassOverlay,
            {
              backgroundColor: theme === 'dark' ? 'rgba(136, 170, 221, 0.05)' : 'rgba(102, 153, 255, 0.05)',
              opacity: getBlurIntensity(),
            },
          ]}
        />

        <View style={styles.navContent}>
          {/* Logo */}
          <TouchableOpacity
            onPress={() => {
              triggerLogoGlow();
            }}
            style={styles.logoContainer}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.logoGlow,
                {
                  opacity: logoGlowAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.6],
                  }),
                },
              ]}
            />
            <PixelsPetalsLogo width={240} height={60} theme={theme} />
          </TouchableOpacity>

          {/* Actions Container */}
          <View style={styles.actionsContainer}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Menu Button */}
            <TouchableOpacity
              onPress={menuVisible ? closeMenu : openMenu}
              style={[
                styles.menuButton,
                {
                  backgroundColor: colors.glassBackground,
                  borderColor: colors.glassBorder,
                },
              ]}
              activeOpacity={0.8}
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
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 0,
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
    width: 260,
    height: 75,
    backgroundColor: '#6699FF',
    borderRadius: 38,
    opacity: 0,
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
  },

  hamburgerContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },

  hamburgerLine: {
    width: 24,
    height: 2,
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
  },

  modalBackgroundOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  liquidGlassDrawer: {
    width: screenWidth * 0.85,
    height: screenHeight,
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(102, 153, 255, 0.2)',
    shadowColor: '#6699FF',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 25,
  },

  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: statusBarHeight + 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 153, 255, 0.2)',
  },

  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    borderWidth: 1,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  drawerContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  drawerItem: {
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(102, 153, 255, 0.05)',
  },

  drawerItemActive: {
    backgroundColor: 'rgba(102, 153, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(102, 153, 255, 0.3)',
  },

  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  drawerItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },

  drawerItemText: {
    fontSize: 16,
    color: '#E2E8F0',
    fontWeight: '500',
    flex: 1,
  },

  drawerItemTextActive: {
    color: '#6699FF',
    fontWeight: '600',
  },

  activeIndicator: {
    position: 'absolute',
    right: 16,
    top: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6699FF',
    transform: [{ translateY: -3 }],
    shadowColor: '#6699FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 6,
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
});
