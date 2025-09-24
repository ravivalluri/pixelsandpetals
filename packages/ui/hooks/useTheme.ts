import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';

// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeColors {
  // Backgrounds
  primaryBackground: string;
  secondaryBackground: string;
  surfaceBackground: string;

  // Accents
  primaryAccent: string;
  secondaryAccent: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textSubtle: string;

  // Glass effects
  glassBackground: string;
  glassBorder: string;

  // Shadows
  shadowColor: string;
  dropShadow: string;
}

export interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  typography: typeof typography;
  spacing: typeof spacing;
  toggleTheme?: () => void; // Optional for mobile
}

// Hook to get theme colors based on current theme
export const useTheme = (theme: Theme = 'light'): ThemeContextType => {
  const themeColors = theme === 'light' ? colors.light : colors.dark;

  return {
    theme,
    colors: themeColors,
    typography,
    spacing,
  };
};

// Default export for easier imports
export default useTheme;