// Theme-aware color tokens from web app
export const colors = {
  light: {
    // Backgrounds
    primaryBackground: '#F0F8FF',      // Alice Blue
    secondaryBackground: '#D9E8F5',    // Light Blue-Gray
    surfaceBackground: '#FFFFFF',      // Pure White

    // Accents
    primaryAccent: '#6699FF',          // Bright Blue
    secondaryAccent: '#9966CC',        // Purple

    // Text
    textPrimary: '#1a1a1a',           // Near Black
    textSecondary: '#3C4A5C',         // Deep Slate Blue
    textSubtle: '#8DA3B5',            // Cool Gray-Blue

    // Glass effects
    glassBackground: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',

    // Shadows
    shadowColor: 'rgba(102, 153, 255, 0.3)',
    dropShadow: '0 10px 30px rgba(102, 153, 255, 0.3)',
  },

  dark: {
    // Backgrounds
    primaryBackground: '#0f1419',      // Dark Blue-Gray
    secondaryBackground: '#1a1f2e',    // Darker Blue-Gray
    surfaceBackground: '#2a2f3e',      // Surface Gray

    // Accents
    primaryAccent: '#6699FF',          // Bright Blue (same)
    secondaryAccent: '#9966CC',        // Purple (same)

    // Text
    textPrimary: '#FFFFFF',           // White
    textSecondary: '#E2E8F0',         // Light Gray
    textSubtle: '#94A3B8',            // Medium Gray

    // Glass effects
    glassBackground: 'rgba(42, 47, 62, 0.3)',
    glassBorder: 'rgba(102, 153, 255, 0.2)',

    // Shadows
    shadowColor: 'rgba(102, 153, 255, 0.4)',
    dropShadow: '0 10px 30px rgba(102, 153, 255, 0.4)',
  },

  // Legacy single-color system for backward compatibility
  legacy: {
    primaryBackground: '#D9E8F5',    // Very Light Sky Blue
    secondaryBackground: '#F0F8FF',  // Alice Blue
    primaryAccent: '#6699FF',        // Vibrant Cerulean Blue
    secondaryAccent: '#9966CC',      // Soft Amethyst Purple
    textDark: '#3C4A5C',            // Deep Slate Blue
    textSubtle: '#8DA3B5',          // Cool Gray-Blue
    pureWhite: '#FFFFFF',           // Pure White

    // Glass effect variants
    glassBlur: 'rgba(240, 248, 255, 0.8)',
    glassFrost: 'rgba(217, 232, 245, 0.6)',
    glassGlow: 'rgba(102, 153, 255, 0.3)',
    glassAmethyst: 'rgba(153, 102, 204, 0.2)',

    // State colors
    error: '#FF6B9D',
    success: '#4ECDC4',
    warning: '#FFD93D',
    info: '#6699FF',
  }
} as const;

export type ColorKeys = keyof typeof colors;