"use client";
import React, { useEffect, useRef, useState } from 'react';
import { colors, spacing, typography } from '@pixelsandpetals/ui';
import { CrystallineCore } from './CrystallineCore';
import { KineticDataVeins } from './KineticDataVeins';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  opacity: number;
  originalX: number;
  originalY: number;
}

interface Wave {
  x: number;
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  speed: number;
  opacity: number;
  color: string;
}

export const CrystallineCoreNexus: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const timeRef = useRef(0);
  const coreInteractionRef = useRef({ intensity: 0, ripples: [] as Array<{ x: number; y: number; radius: number; opacity: number; time: number }> });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  // Aether-Field Configuration
  const config = {
    particleCount: 150,
    waveCount: 8,
    mouseInfluence: 120,
    dispersionStrength: 0.3,
    returnForce: 0.02,
    colors: {
      particles: [
        'rgba(217, 232, 245, 0.6)', // #D9E8F5
        'rgba(102, 153, 255, 0.4)', // #6699FF
        'rgba(153, 102, 204, 0.5)', // #9966CC
        'rgba(240, 248, 255, 0.3)', // #F0F8FF
      ],
      waves: [
        'rgba(102, 153, 255, 0.15)', // #6699FF
        'rgba(153, 102, 204, 0.12)', // #9966CC
        'rgba(217, 232, 245, 0.08)', // #D9E8F5
      ]
    }
  };

  // Initialize particles in 3D space
  const initializeParticles = (width: number, height: number) => {
    const particles: Particle[] = [];

    for (let i = 0; i < config.particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const z = Math.random() * 100 - 50;

      particles.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.2,
        life: Math.random() * 1000,
        maxLife: 1000 + Math.random() * 2000,
        size: 1 + Math.random() * 3,
        color: config.colors.particles[Math.floor(Math.random() * config.colors.particles.length)],
        opacity: 0.3 + Math.random() * 0.7,
      });
    }

    particlesRef.current = particles;
  };

  // Initialize ethereal waves
  const initializeWaves = (width: number, height: number) => {
    const waves: Wave[] = [];

    for (let i = 0; i < config.waveCount; i++) {
      waves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        amplitude: 20 + Math.random() * 40,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        opacity: 0.1 + Math.random() * 0.15,
        color: config.colors.waves[Math.floor(Math.random() * config.colors.waves.length)],
      });
    }

    wavesRef.current = waves;
  };

  // Check WebGL support
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  };

  // Update particles with mouse interaction
  const updateParticles = (mouseX: number, mouseY: number, isMouseMoving: boolean) => {
    particlesRef.current.forEach((particle) => {
      // Calculate distance to mouse
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Mouse influence (dispersion effect)
      if (isMouseMoving && distance < config.mouseInfluence) {
        const force = (config.mouseInfluence - distance) / config.mouseInfluence;
        const angle = Math.atan2(dy, dx);

        particle.vx += Math.cos(angle) * force * config.dispersionStrength;
        particle.vy += Math.sin(angle) * force * config.dispersionStrength;
      }

      // Return to original position (gentle drift back)
      const returnDx = particle.originalX - particle.x;
      const returnDy = particle.originalY - particle.y;

      particle.vx += returnDx * config.returnForce;
      particle.vy += returnDy * config.returnForce;

      // Apply velocity with damping
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;

      // Damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.vz *= 0.99;

      // Life cycle
      particle.life += 1;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.opacity = 0.3 + Math.random() * 0.7;
      }

      // Breathing effect
      const breathe = Math.sin(particle.life * 0.01) * 0.2 + 0.8;
      particle.size = (1 + Math.random() * 3) * breathe;

      // Z-depth oscillation
      particle.z += Math.sin(timeRef.current * 0.001 + particle.life * 0.01) * 0.1;
    });
  };

  // Update ethereal waves
  const updateWaves = () => {
    wavesRef.current.forEach((wave) => {
      wave.phase += wave.speed;
      wave.x += Math.sin(wave.phase) * 0.5;
      wave.y += Math.cos(wave.phase * 0.7) * 0.3;

      // Gentle opacity breathing
      wave.opacity = (0.1 + Math.random() * 0.15) * (Math.sin(timeRef.current * 0.002 + wave.phase) * 0.3 + 0.7);
    });
  };

  // Render particles with depth
  const renderParticles = (ctx: CanvasRenderingContext2D) => {
    particlesRef.current.forEach((particle) => {
      const depth = (particle.z + 50) / 100; // Normalize z to 0-1
      const size = particle.size * (0.5 + depth * 0.5);
      const opacity = particle.opacity * (0.3 + depth * 0.7);

      ctx.save();
      ctx.globalAlpha = opacity;

      // Create radial gradient for luminous effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, size * 2
      );

      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  };

  // Render core interaction ripples
  const renderCoreInteractionRipples = (ctx: CanvasRenderingContext2D) => {
    coreInteractionRef.current.ripples.forEach(ripple => {
      const age = timeRef.current - ripple.time;
      const maxAge = 1000; // 1 second

      if (age > maxAge) return;

      const progress = age / maxAge;
      const currentRadius = ripple.radius + progress * 100;
      const currentOpacity = ripple.opacity * (1 - progress);

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.strokeStyle = colors.blue + '80';
      ctx.lineWidth = 3;
      ctx.shadowColor = colors.blue;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Inner ripple
      ctx.globalAlpha = currentOpacity * 0.5;
      ctx.strokeStyle = colors.purple + '60';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    });
  };

  // Render ethereal waves
  const renderWaves = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    wavesRef.current.forEach((wave) => {
      ctx.save();
      ctx.globalAlpha = wave.opacity;
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2;

      ctx.beginPath();

      for (let x = 0; x < width; x += 10) {
        const y = wave.y +
          Math.sin(x * wave.frequency + wave.phase) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.5 + wave.phase * 1.3) * (wave.amplitude * 0.3);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.restore();
    });
  };

  // Main animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;

    // Clear canvas with subtle gradient background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#F0F8FF');
    bgGradient.addColorStop(0.5, '#D9E8F5');
    bgGradient.addColorStop(1, '#F0F8FF');

    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Update time
    timeRef.current += 16; // ~60fps

    // Update and render waves
    updateWaves();
    renderWaves(ctx, width, height);

    // Update and render particles
    updateParticles(mouseRef.current.x, mouseRef.current.y, mouseRef.current.isMoving);
    renderParticles(ctx);

    // Render core interaction ripples
    renderCoreInteractionRipples(ctx);

    // Update core interaction intensity
    coreInteractionRef.current.intensity = Math.max(0, coreInteractionRef.current.intensity - 0.02);

    // Clean up old ripples
    coreInteractionRef.current.ripples = coreInteractionRef.current.ripples.filter(
      ripple => timeRef.current - ripple.time < 1000
    );

    // Reset mouse movement flag
    mouseRef.current.isMoving = false;

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isMoving: true,
    };
  };

  // Handle window resize
  const handleResize = () => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 80, // Account for navbar height
      });
    }
  };

  // Initialize on mount
  useEffect(() => {
    setIsWebGLSupported(checkWebGLSupport());
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize particles and waves when dimensions change
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      initializeParticles(dimensions.width, dimensions.height);
      initializeWaves(dimensions.width, dimensions.height);
    }
  }, [dimensions]);

  // Start animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && dimensions.width > 0 && dimensions.height > 0) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
    }
  }, [dimensions]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        paddingTop: '80px', // Account for navbar height
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${colors.backgroundLight} 0%, ${colors.background} 50%, ${colors.backgroundLight} 100%)`,
      }}
    >
      {/* Aether-Field Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)', // Account for navbar padding
          cursor: 'none',
          zIndex: 1,
        }}
      />

      {/* Kinetic Data Veins Layer */}
      <KineticDataVeins
        coreX={dimensions.width / 2}
        coreY={(dimensions.height / 2) + 40} // Slightly lower to center with content
        dimensions={dimensions}
        onBloomInteraction={(bloom) => {
          // Trigger core interaction effects
          coreInteractionRef.current.intensity = 1.0;

          // Add core ripple
          const newRipple = {
            x: dimensions.width / 2,
            y: dimensions.height / 2,
            radius: 0,
            opacity: 0.8,
            time: timeRef.current
          };
          coreInteractionRef.current.ripples.push(newRipple);

          // Pulse all particles toward center briefly
          particlesRef.current.forEach(particle => {
            const dx = (dimensions.width / 2) - particle.x;
            const dy = (dimensions.height / 2) - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = 0.3;

            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          });

          console.log('Bloom interaction triggered core response:', bloom.content);
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: 'calc(100vh - 80px)', // Account for navbar
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: `${spacing[8]}px ${spacing[6]}px`,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Central Crystalline Core */}
        <div
          style={{
            marginBottom: spacing[8],
            position: 'relative',
            zIndex: 3,
          }}
        >
          <CrystallineCore />
        </div>

        <p
          style={{
            fontFamily: typography.fonts.body,
            fontSize: `${typography.fontSizes['2xl']}px`,
            fontWeight: typography.fontWeights.normal,
            color: colors.textLight,
            marginBottom: spacing[8],
            maxWidth: '800px',
            lineHeight: typography.lineHeights.relaxed,
            textAlign: 'center',
          }}
        >
          Experience the intelligent, adaptive nature of our design-forward engineering through an interactive crystalline environment
        </p>

        <div
          style={{
            display: 'flex',
            gap: spacing[4],
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              padding: `${spacing[4]}px ${spacing[6]}px`,
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.purple})`,
              color: colors.white,
              border: 'none',
              borderRadius: '12px',
              fontFamily: typography.fonts.body,
              fontSize: `${typography.fontSizes.lg}px`,
              fontWeight: typography.fontWeights.semibold,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(102, 153, 255, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 153, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 153, 255, 0.3)';
            }}
          >
            Explore Our Nexus
          </button>

          <button
            style={{
              padding: `${spacing[4]}px ${spacing[6]}px`,
              background: 'rgba(255, 255, 255, 0.1)',
              color: colors.text,
              border: `2px solid ${colors.blue}`,
              borderRadius: '12px',
              fontFamily: typography.fonts.body,
              fontSize: `${typography.fontSizes.lg}px`,
              fontWeight: typography.fontWeights.semibold,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(102, 153, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View Our Work
          </button>
        </div>
      </div>

      {/* Fallback for non-WebGL browsers */}
      {!isWebGLSupported && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 30% 20%, rgba(102, 153, 255, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 70% 80%, rgba(153, 102, 204, 0.1) 0%, transparent 50%)`,
            zIndex: 0,
          }}
        />
      )}
    </div>
  );
};