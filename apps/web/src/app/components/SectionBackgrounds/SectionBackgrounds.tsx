"use client";
import React, { CSSProperties } from 'react';
import { useTheme } from '../../context/ThemeContext';

// Animated gradient backgrounds for different sections
export const sectionBackgrounds = {
  hero: {
    background: `
      radial-gradient(circle at 20% 80%, rgba(102, 153, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(153, 102, 204, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(217, 232, 245, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)
    `,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  projects: {
    background: `
      radial-gradient(circle at 10% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 80%, rgba(78, 84, 200, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(142, 68, 173, 0.08) 0%, transparent 50%),
      linear-gradient(45deg, #0f0c29 0%, #302b63 50%, #24243e 100%)
    `,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  clients: {
    background: `
      radial-gradient(circle at 70% 30%, rgba(34, 193, 195, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 30% 70%, rgba(253, 187, 45, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, rgba(131, 58, 180, 0.08) 0%, transparent 50%),
      linear-gradient(225deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
    `,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  about: {
    background: `
      radial-gradient(circle at 40% 20%, rgba(72, 85, 99, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(41, 128, 185, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 20% 60%, rgba(142, 68, 173, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #9b59b6 100%)
    `,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },

  contact: {
    background: `
      radial-gradient(circle at 60% 10%, rgba(46, 204, 113, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 20% 90%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 90% 50%, rgba(155, 89, 182, 0.08) 0%, transparent 50%),
      linear-gradient(45deg, #16a085 0%, #f39c12 50%, #d35400 100%)
    `,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
  },
};

// Animated particles overlay component
interface AnimatedParticlesProps {
  density?: 'light' | 'medium' | 'heavy';
  color?: string;
}

export const AnimatedParticles: React.FC<AnimatedParticlesProps> = ({
  density = 'medium',
  color = 'rgba(255, 255, 255, 0.1)',
}) => {
  const particleCount = {
    light: 20,
    medium: 40,
    heavy: 60,
  };

  // Create deterministic particles based on index to avoid hydration issues
  const particles = Array.from({ length: particleCount[density] }, (_, i) => ({
    id: i,
    // Use deterministic values based on index to ensure SSR/CSR consistency
    size: (i * 3.7) % 4 + 1,
    left: (i * 13.7) % 100,
    animationDelay: (i * 2.3) % 20,
    animationDuration: (i * 5.7) % 20 + 20,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.left}%`,
            top: '100%',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: 0.6,
            animation: `floatUp ${particle.animationDuration}s ease-in-out ${particle.animationDelay}s infinite`,
            backdropFilter: 'blur(1px)',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Mesh gradient overlay component
interface MeshGradientProps {
  colors?: string[];
  opacity?: number;
}

export const MeshGradient: React.FC<MeshGradientProps> = ({
  colors = undefined,
  opacity = 0.1,
}) => {
  const { theme, colors: themeColors } = useTheme();
  
  // Use theme colors if no colors are provided
  const meshColors = colors || [
    themeColors.primaryAccent,
    themeColors.secondaryAccent,
    themeColors.primaryBackground
  ];
  
  // Create individual background properties to avoid conflicts
  const backgroundImages = `
    radial-gradient(circle at 20% 20%, ${meshColors[0]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, ${meshColors[1]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
    radial-gradient(circle at 20% 80%, ${meshColors[2]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, ${meshColors[0]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')} 0%, transparent 50%)
  `;
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundImage: backgroundImages,
        backgroundSize: '200% 200%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 0%, 100% 0%, 0% 100%, 100% 100%',
        animation: 'meshMove 15s ease infinite',
      }}
    >
      <style jsx>{`
        @keyframes meshMove {
          0%, 100% {
            background-position: 0% 0%, 100% 0%, 0% 100%, 100% 100%;
          }
          25% {
            background-position: 100% 0%, 0% 100%, 100% 0%, 0% 100%;
          }
          50% {
            background-position: 100% 100%, 0% 0%, 100% 100%, 0% 0%;
          }
          75% {
            background-position: 0% 100%, 100% 0%, 0% 0%, 100% 100%;
          }
        }
      `}</style>
    </div>
  );
};

// Section wrapper component with background
interface SectionWrapperProps {
  children: React.ReactNode;
  section: keyof typeof sectionBackgrounds;
  particles?: boolean;
  mesh?: boolean;
  className?: string;
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  section,
  particles = true,
  mesh = true,
  className = '',
  id,
}) => {
  const { colors } = useTheme();

  // Create theme-aware background instead of hardcoded dark backgrounds
  const themeBackground = {
    background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
    minHeight: '100vh',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'background 0.3s ease',
  };

  return (
    <section
      id={id}
      className={className}
      style={themeBackground}
    >
      {mesh && <MeshGradient />}
      {particles && <AnimatedParticles />}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
};