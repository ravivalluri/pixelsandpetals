import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, StatusBar } from 'react-native';

export type Theme = 'light' | 'dark';

interface ThemeColors {
  // Backgrounds
  primaryBackground: string;
  secondaryBackground: string;
  surfaceBackground: string;

  // Accents
  primaryAccent: string;
  secondaryAccent: string;
  tertiaryAccent?: string;
  quaternaryAccent?: string;
  quinaryAccent?: string;
  senaryAccent?: string;

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
  cardShadow: string;
  buttonShadow: string;
}

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primaryBackground: '#F0F8FF',      // Alice Blue
  secondaryBackground: '#D9E8F5',    // Light Blue-Gray
  surfaceBackground: '#FFFFFF',      // Pure White

  primaryAccent: '#6699FF',          // Bright Blue
  secondaryAccent: '#9966CC',        // Purple
  tertiaryAccent: '#FF6B9D',
  quaternaryAccent: '#4ECDC4',
  quinaryAccent: '#45B7D1',
  senaryAccent: '#96CEB4',

  textPrimary: '#1a1a1a',           // Near Black
  textSecondary: '#3C4A5C',         // Deep Slate Blue
  textSubtle: '#8DA3B5',            // Cool Gray-Blue

  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',

  shadowColor: 'rgba(102, 153, 255, 0.3)',
  dropShadow: '0 10px 30px rgba(102, 153, 255, 0.3)',
  cardShadow: '0 12px 48px rgba(102, 153, 255, 0.35)',
  buttonShadow: '0 4px 20px rgba(102, 153, 255, 0.4)',
};

const darkColors: ThemeColors = {
  primaryBackground: '#0f1419',      // Dark Blue-Gray
  secondaryBackground: '#1a1f2e',    // Darker Blue-Gray
  surfaceBackground: '#2a2f3e',      // Surface Gray

  primaryAccent: '#88AADD',          // Lighter Blue for dark mode
  secondaryAccent: '#B399DD',        // Lighter Purple for dark mode
  tertiaryAccent: '#FF8FB8',
  quaternaryAccent: '#6EE0D8',
  quinaryAccent: '#67C5D9',
  senaryAccent: '#AEE0C8',

  textPrimary: '#FFFFFF',           // White
  textSecondary: '#E2E8F0',         // Light Gray
  textSubtle: '#94A3B8',            // Medium Gray

  glassBackground: 'rgba(42, 47, 62, 0.3)',
  glassBorder: 'rgba(102, 153, 255, 0.2)',

  shadowColor: 'rgba(102, 153, 255, 0.4)',
  dropShadow: '0 10px 30px rgba(102, 153, 255, 0.4)',
  cardShadow: '0 12px 48px rgba(102, 153, 255, 0.25)',
  buttonShadow: '0 4px 20px rgba(102, 153, 255, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme') as Theme | null;
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          // Check system preference
          const systemTheme = Appearance.getColorScheme();
          setTheme(systemTheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.log('Error loading theme:', error);
        // Fallback to system preference
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      }
    };

    loadTheme();

    // Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only update if user hasn't manually set a theme
      AsyncStorage.getItem('theme').then((savedTheme) => {
        if (!savedTheme && colorScheme) {
          setTheme(colorScheme === 'dark' ? 'dark' : 'light');
        }
      });
    });

    return () => subscription?.remove();
  }, []);

  // Update AsyncStorage and status bar when theme changes
  useEffect(() => {
    AsyncStorage.setItem('theme', theme);

    // Update status bar style based on theme
    StatusBar.setBarStyle(
      theme === 'dark' ? 'light-content' : 'dark-content',
      true
    );
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  const value: ThemeContextType = {
    theme,
    colors,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};