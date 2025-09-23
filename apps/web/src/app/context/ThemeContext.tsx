"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeColors {
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

  textPrimary: '#1a1a1a',           // Near Black
  textSecondary: '#3C4A5C',         // Deep Slate Blue
  textSubtle: '#8DA3B5',            // Cool Gray-Blue

  glassBackground: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.2)',

  shadowColor: 'rgba(102, 153, 255, 0.3)',
  dropShadow: '0 10px 30px rgba(102, 153, 255, 0.3)',
};

const darkColors: ThemeColors = {
  primaryBackground: '#0f1419',      // Dark Blue-Gray
  secondaryBackground: '#1a1f2e',    // Darker Blue-Gray
  surfaceBackground: '#2a2f3e',      // Surface Gray

  primaryAccent: '#6699FF',          // Bright Blue (same)
  secondaryAccent: '#9966CC',        // Purple (same)

  textPrimary: '#FFFFFF',           // White
  textSecondary: '#E2E8F0',         // Light Gray
  textSubtle: '#94A3B8',            // Medium Gray

  glassBackground: 'rgba(42, 47, 62, 0.3)',
  glassBorder: 'rgba(102, 153, 255, 0.2)',

  shadowColor: 'rgba(102, 153, 255, 0.4)',
  dropShadow: '0 10px 30px rgba(102, 153, 255, 0.4)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f1419' : '#F0F8FF');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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