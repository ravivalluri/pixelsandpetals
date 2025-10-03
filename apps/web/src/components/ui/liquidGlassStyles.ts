// Liquid Glass Design System
// Shared styles for consistent liquid glass aesthetic

export const liquidGlassStyles = {
  // Base glass effect
  base: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  },
  
  // Enhanced glass effect
  enhanced: {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(31, 38, 135, 0.45)',
  },
  
  // Subtle glass effect
  subtle: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(31, 38, 135, 0.25)',
  },
  
  // Glass with gradient
  gradient: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
  },
  
  // Hover states
  hover: {
    base: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 12px 40px rgba(31, 38, 135, 0.5)',
      transform: 'translateY(-2px)',
    },
    enhanced: {
      background: 'rgba(255, 255, 255, 0.18)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      boxShadow: '0 16px 50px rgba(31, 38, 135, 0.6)',
      transform: 'translateY(-3px)',
    }
  },
  
  // Active states
  active: {
    base: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
      transform: 'translateY(0)',
    }
  },
  
  // Focus states
  focus: {
    base: {
      border: '1px solid rgba(102, 153, 255, 0.8)',
      boxShadow: '0 0 0 3px rgba(102, 153, 255, 0.3)',
    }
  },
  
  // Color palette
  colors: {
    primary: '#6699FF',
    secondary: '#9966CC',
    accent: '#FF6F61',
    text: '#3C4A5C',
    textLight: '#8DA3B5',
    background: '#D9E8F5',
    backgroundLight: '#F0F8FF',
  },
  
  // Typography
  typography: {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: '#3C4A5C',
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#3C4A5C',
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#8DA3B5',
    }
  }
};