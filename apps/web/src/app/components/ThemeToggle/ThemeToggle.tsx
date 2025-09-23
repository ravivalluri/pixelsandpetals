"use client";
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      style={{
        background: colors.glassBackground,
        border: `1px solid ${colors.glassBorder}`,
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        color: colors.textPrimary,
        fontSize: '18px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `rgba(102, 153, 255, 0.1)`;
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.glassBackground;
        e.currentTarget.style.transform = 'scale(1)';
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon */}
      <div
        style={{
          position: 'absolute',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: theme === 'light' ? 'translateY(0) rotate(0deg)' : 'translateY(-50px) rotate(180deg)',
          opacity: theme === 'light' ? 1 : 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      {/* Moon Icon */}
      <div
        style={{
          position: 'absolute',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: theme === 'dark' ? 'translateY(0) rotate(0deg)' : 'translateY(50px) rotate(-180deg)',
          opacity: theme === 'dark' ? 1 : 0,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      </div>

      {/* Animated background circle */}
      <div
        style={{
          position: 'absolute',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: theme === 'light'
            ? 'radial-gradient(circle, rgba(255, 193, 7, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(102, 153, 255, 0.2) 0%, transparent 70%)',
          transition: 'all 0.4s ease',
          transform: `scale(${theme === 'light' ? 1 : 0.8})`,
          zIndex: -1,
        }}
      />
    </button>
  );
};