"use client";
import React, { CSSProperties, ReactNode } from 'react';

// Base liquid glass styles
const getBaseGlassStyles = (intensity: 'light' | 'medium' | 'heavy' = 'medium'): CSSProperties => {
  const intensityMap = {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px) saturate(1.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(12px) saturate(1.4)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    heavy: {
      background: 'rgba(255, 255, 255, 0.12)',
      backdropFilter: 'blur(16px) saturate(1.6)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  };

  return {
    ...intensityMap[intensity],
    WebkitBackdropFilter: intensityMap[intensity].backdropFilter,
    borderRadius: '16px',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  };
};

// Liquid Glass Button Component
interface LiquidGlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' },
  };

  const variantStyles = {
    primary: {
      ...getBaseGlassStyles('medium'),
      background: 'linear-gradient(135deg, rgba(102, 153, 255, 0.2) 0%, rgba(153, 102, 204, 0.2) 100%)',
    },
    secondary: {
      ...getBaseGlassStyles('light'),
      background: 'rgba(255, 255, 255, 0.08)',
    },
    ghost: {
      ...getBaseGlassStyles('light'),
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`interactive ${className}`}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
        cursor: 'none',
        border: variantStyles[variant].border,
        outline: 'none',
        opacity: disabled ? 0.5 : 1,
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'translateY(-2px) translateZ(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 153, 255, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) translateZ(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Shimmer effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: 'shimmer 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  );
};

// Liquid Glass Card Component
interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  padding?: string;
  hover?: boolean;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  intensity = 'medium',
  padding = '24px',
  hover = true,
}) => {
  return (
    <div
      className={`interactive ${className}`}
      style={{
        ...getBaseGlassStyles(intensity),
        padding,
        cursor: hover ? 'none' : 'default',
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(102, 153, 255, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Animated border gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '16px',
          padding: '1px',
          background: 'linear-gradient(45deg, rgba(102, 153, 255, 0.3), rgba(153, 102, 204, 0.3), rgba(217, 232, 245, 0.3))',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 4s ease infinite',
          zIndex: -1,
        }}
      >
        <div
          style={{
            borderRadius: '15px',
            background: 'rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      {children}
    </div>
  );
};

// Liquid Glass Navigation Component
interface LiquidGlassNavProps {
  children: ReactNode;
  className?: string;
  position?: 'fixed' | 'sticky' | 'relative';
}

export const LiquidGlassNav: React.FC<LiquidGlassNavProps> = ({
  children,
  className = '',
  position = 'fixed',
}) => {
  return (
    <nav
      className={className}
      style={{
        ...getBaseGlassStyles('heavy'),
        position,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '0',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        padding: '16px 24px',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        }}
      />
      {children}
    </nav>
  );
};

// Liquid Glass Modal/Dialog Component
interface LiquidGlassModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const LiquidGlassModal: React.FC<LiquidGlassModalProps> = ({
  children,
  isOpen,
  onClose,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        className={className}
        style={{
          ...getBaseGlassStyles('heavy'),
          maxWidth: '90vw',
          maxHeight: '90vh',
          padding: '32px',
          animation: 'slideUp 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Global styles for animations
export const LiquidGlassStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Custom scrollbar for glass elements */
    .liquid-glass-scroll::-webkit-scrollbar {
      width: 8px;
    }

    .liquid-glass-scroll::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }

    .liquid-glass-scroll::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      backdrop-filter: blur(8px);
    }

    .liquid-glass-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}</style>
);