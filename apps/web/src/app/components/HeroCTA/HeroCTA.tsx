"use client";
import React from 'react';
import { spacing, typography } from '@pixelsandpetals/ui';
import { useTheme } from '../../context/ThemeContext';
import styles from './HeroCTA.module.css';

export const HeroCTA: React.FC = () => {
  const { theme, colors } = useTheme();

  // Create theme-adaptive styles
  const glassEnhanced = {
    background: theme === 'dark' 
      ? 'rgba(42, 47, 62, 0.3)' 
      : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.2)'
      : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: theme === 'dark'
      ? '0 12px 48px rgba(102, 153, 255, 0.25)'
      : '0 12px 48px rgba(31, 38, 135, 0.45)',
  };
  
  const glassSubtle = {
    background: theme === 'dark'
      ? 'rgba(42, 47, 62, 0.2)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: theme === 'dark'
      ? '0 4px 24px rgba(102, 153, 255, 0.15)'
      : '0 4px 24px rgba(31, 38, 135, 0.25)',
  };

  const localTypography = {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: colors.textPrimary,
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textPrimary,
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textSubtle,
    }
  };

  return (
    <div
      className={styles.heroCTA}
      style={{
        textAlign: 'center',
        padding: `${spacing[8]}px ${spacing[4]}px`,
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <p
        className={styles.description}
        style={{
          fontFamily: localTypography.body.fontFamily,
          fontSize: '20px',
          fontWeight: '400',
          color: colors.textPrimary,
          marginBottom: spacing[6],
          maxWidth: '700px',
          margin: `0 auto ${spacing[6]}px auto`,
          lineHeight: '1.6',
          textAlign: 'center',
        }}
      >
        Experience the intelligent, adaptive nature of our design-forward engineering through an interactive crystalline environment
      </p>

      <div
        className={styles.buttonGroup}
        style={{
          display: 'flex',
          gap: spacing[4],
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          type="button"
          className={styles.primaryButton}
          style={{
            padding: `${spacing[4]}px ${spacing[6]}px`,
            background: `linear-gradient(135deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
            color: colors.textPrimary,
            border: 'none',
            borderRadius: '12px',
            fontFamily: localTypography.body.fontFamily,
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: theme === 'dark'
              ? '0 4px 20px rgba(102, 153, 255, 0.25)'
              : '0 4px 20px rgba(102, 153, 255, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme === 'dark' 
              ? '0 8px 30px rgba(102, 153, 255, 0.35)' 
              : '0 8px 30px rgba(102, 153, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme === 'dark' 
              ? '0 4px 20px rgba(102, 153, 255, 0.25)' 
              : '0 4px 20px rgba(102, 153, 255, 0.3)';
          }}
        >
          Explore Our Nexus
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          style={{
            padding: `${spacing[4]}px ${spacing[6]}px`,
            background: theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            color: colors.textPrimary,
            border: `2px solid ${colors.primaryAccent}`,
            borderRadius: '12px',
            fontFamily: localTypography.body.fontFamily,
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(102, 153, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          View Our Work
        </button>
      </div>
    </div>
  );
};