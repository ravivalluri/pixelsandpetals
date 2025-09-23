"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import { spacing, typography } from '@pixelsandpetals/ui';

// Define reliable color palette for data veins that adapts to theme
const veinColors = (
  theme: 'light' | 'dark',
  themeColors: {
    primaryAccent: string;
    secondaryAccent: string;
    textPrimary: string;
    primaryBackground: string;
  }
) => ({
  blue: themeColors.primaryAccent,
  purple: themeColors.secondaryAccent,
  white: theme === 'dark' ? '#FFFFFF' : '#FFFFFF',
  text: themeColors.textPrimary
});

interface DataVein {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX1: number;
  controlY1: number;
  controlX2: number;
  controlY2: number;
  energy: number;
  maxEnergy: number;
  pulsation: number;
  color: string;
  bloom: InsightBloom;
}

interface InsightBloom {
  id: string;
  x: number;
  y: number;
  size: number;
  petals: BloomPetal[];
  content: BloomContent;
  isHovered: boolean;
  animationPhase: number;
  dissolved: boolean;
  pulseIntensity: number;
}

interface BloomPetal {
  angle: number;
  length: number;
  opacity: number;
  color: string;
  animationOffset: number;
}

interface BloomContent {
  text: string;
  icon: string;
  category: 'technology' | 'value' | 'metric' | 'expertise';
  description: string;
}

interface KineticDataVeinsProps {
  coreX: number;
  coreY: number;
  dimensions: { width: number; height: number };
  onBloomInteraction?: (bloom: InsightBloom) => void;
}

export const KineticDataVeins: React.FC<KineticDataVeinsProps> = ({
  coreX,
  coreY,
  dimensions,
  onBloomInteraction
}) => {
  const { theme, colors: themeColors } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const lastRippleTime = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const dataVeinsRef = useRef<DataVein[]>([]);
  const [hoveredBloom, setHoveredBloom] = useState<string | null>(null);
  const coreRipplesRef = useRef<Array<{ x: number; y: number; radius: number; opacity: number; time: number }>>([]);

  // Content library for Insight Blooms
  const bloomContents: BloomContent[] = [
    {
      text: "ROI Focused",
      icon: "📈",
      category: "metric",
      description: "Measurable returns on every investment"
    },
    {
      text: "Scalable AI",
      icon: "🧠",
      category: "technology",
      description: "Intelligent solutions that grow with you"
    },
    {
      text: "Design Excellence",
      icon: "✨",
      category: "value",
      description: "Beauty meets functionality in every detail"
    },
    {
      text: "Cloud Native",
      icon: "☁️",
      category: "technology",
      description: "Built for infinite scale and reliability"
    },
    {
      text: "User Centered",
      icon: "👤",
      category: "value",
      description: "Every decision driven by user needs"
    },
    {
      text: "Performance",
      icon: "⚡",
      category: "metric",
      description: "Lightning-fast, optimized experiences"
    },
    {
      text: "Innovation",
      icon: "🚀",
      category: "expertise",
      description: "Pushing boundaries of what's possible"
    },
    {
      text: "Security First",
      icon: "🔒",
      category: "value",
      description: "Enterprise-grade protection built-in"
    }
  ];

  // Generate bloom petals
  const generateBloomPetals = (count: number = 8): BloomPetal[] => {
    const veinColorsObj = veinColors(theme, themeColors);
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      length: 15 + Math.random() * 10,
      opacity: 0.6 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? veinColorsObj.blue : veinColorsObj.purple,
      animationOffset: Math.random() * Math.PI * 2
    }));
  };

  // Initialize data veins and blooms
  const initializeDataVeins = useCallback(() => {
    const veins: DataVein[] = [];
    const centerX = coreX;
    const centerY = coreY;
    const veinCount = 8;

    const veinColorsObj = veinColors(theme, themeColors);

    for (let i = 0; i < veinCount; i++) {
      const angle = (i / veinCount) * Math.PI * 2 + Math.random() * 0.3;
      const distance = 150 + Math.random() * 100;

      const endX = centerX + Math.cos(angle) * distance;
      const endY = centerY + Math.sin(angle) * distance;

      // Create curved control points for organic flow
      const controlDistance = distance * 0.6;
      const controlAngle1 = angle + (Math.random() - 0.5) * 0.8;
      const controlAngle2 = angle + (Math.random() - 0.5) * 0.8;

      const controlX1 = centerX + Math.cos(controlAngle1) * controlDistance * 0.5;
      const controlY1 = centerY + Math.sin(controlAngle1) * controlDistance * 0.5;
      const controlX2 = centerX + Math.cos(controlAngle2) * controlDistance;
      const controlY2 = centerY + Math.sin(controlAngle2) * controlDistance;

      const bloom: InsightBloom = {
        id: `bloom-${i}`,
        x: endX,
        y: endY,
        size: 25 + Math.random() * 15,
        petals: generateBloomPetals(),
        content: bloomContents[i % bloomContents.length],
        isHovered: false,
        animationPhase: Math.random() * Math.PI * 2,
        dissolved: false,
        pulseIntensity: 0
      };

      veins.push({
        id: `vein-${i}`,
        startX: centerX,
        startY: centerY,
        endX,
        endY,
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        energy: Math.random(),
        maxEnergy: 1,
        pulsation: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? veinColorsObj.blue : veinColorsObj.purple,
        bloom
      });
    }

    dataVeinsRef.current = veins;
  }, [coreX, coreY, theme, themeColors, bloomContents]);

  // Initialize audio context for interaction sounds
  const initializeAudio = useCallback(() => {
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  }, []);

  // Play interaction sound
  const playInteractionSound = (frequency: number = 440, duration: number = 200) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration / 1000);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000);
  };

  // Create core ripple effect
  const createCoreRipple = (intensity: number = 1) => {
    const newRipple = {
      x: coreX,
      y: coreY,
      radius: 0,
      opacity: 0.8 * intensity,
      time: timeRef.current
    };

    coreRipplesRef.current = [...coreRipplesRef.current.slice(-2), newRipple]; // Keep only last 3 ripples
  };

  // Render data vein with energy flow
  const renderDataVein = (ctx: CanvasRenderingContext2D, vein: DataVein) => {
    const { startX, startY, endX, endY, controlX1, controlY1, controlX2, controlY2 } = vein;
    const veinColorsObj = veinColors(theme, themeColors);

    ctx.save();

    // Main vein path
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

    // Vein glow
    ctx.lineWidth = 3;
    ctx.strokeStyle = vein.color + '40';
    ctx.shadowColor = vein.color;
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Core vein line
    ctx.lineWidth = 1;
    ctx.strokeStyle = vein.color + '80';
    ctx.shadowBlur = 5;
    ctx.stroke();

    // Energy flow animation
    const energyPosition = (vein.energy + Math.sin(vein.pulsation) * 0.1) % 1;
    const t = energyPosition;

    // Calculate position along bezier curve
    const x = Math.pow(1-t, 3) * startX +
              3 * Math.pow(1-t, 2) * t * controlX1 +
              3 * (1-t) * Math.pow(t, 2) * controlX2 +
              Math.pow(t, 3) * endX;
    const y = Math.pow(1-t, 3) * startY +
              3 * Math.pow(1-t, 2) * t * controlY1 +
              3 * (1-t) * Math.pow(t, 2) * controlY2 +
              Math.pow(t, 3) * endY;

    // Energy particle
    const energyGradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
    energyGradient.addColorStop(0, vein.color + 'FF');
    energyGradient.addColorStop(0.5, vein.color + '88');
    energyGradient.addColorStop(1, vein.color + '00');

    ctx.fillStyle = energyGradient;
    ctx.beginPath();
    ctx.arc(x, y, 4 + Math.sin(timeRef.current * 0.01) * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Render insight bloom
  const renderInsightBloom = (ctx: CanvasRenderingContext2D, bloom: InsightBloom) => {
    if (bloom.dissolved) return;

    const veinColorsObj = veinColors(theme, themeColors);

    ctx.save();
    ctx.translate(bloom.x, bloom.y);

    const scale = 1 + Math.sin(bloom.animationPhase) * 0.1;
    const pulseScale = 1 + bloom.pulseIntensity * 0.3;
    ctx.scale(scale * pulseScale, scale * pulseScale);

    // Render petals
    bloom.petals.forEach((petal) => {
      ctx.save();
      ctx.rotate(petal.angle + Math.sin(timeRef.current * 0.002 + petal.animationOffset) * 0.1);

      // Petal gradient
      const petalGradient = ctx.createLinearGradient(0, 0, petal.length, 0);
      petalGradient.addColorStop(0, petal.color + Math.floor(petal.opacity * 255).toString(16).padStart(2, '0'));
      petalGradient.addColorStop(0.7, petal.color + '60');
      petalGradient.addColorStop(1, petal.color + '00');

      // Petal shape
      ctx.fillStyle = petalGradient;
      ctx.beginPath();
      ctx.ellipse(petal.length/2, 0, petal.length/2, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    // Central bloom core
    const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, bloom.size/2);
    coreGradient.addColorStop(0, veinColorsObj.white + '80');
    coreGradient.addColorStop(0.4, bloom.petals[0].color + '60');
    coreGradient.addColorStop(1, bloom.petals[0].color + '20');

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(0, 0, bloom.size/2, 0, Math.PI * 2);
    ctx.fill();

    // Content icon/text
    if (bloom.isHovered) {
      ctx.font = `${typography.fontWeights.bold} ${typography.fontSizes.xs}px ${typography.fonts.body}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = veinColorsObj.text;
      ctx.fillText(bloom.content.text, 0, 0);
    } else {
      ctx.font = `${typography.fontSizes.lg}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bloom.content.icon, 0, 0);
    }

    ctx.restore();
  };

  // Render core ripples
  const renderCoreRipples = (ctx: CanvasRenderingContext2D) => {
    const veinColorsObj = veinColors(theme, themeColors);
    coreRipplesRef.current.forEach(ripple => {
      const age = timeRef.current - ripple.time;
      const maxAge = 1000; // 1 second

      if (age > maxAge) return;

      const progress = age / maxAge;
      const currentRadius = ripple.radius + progress * 50;
      const currentOpacity = ripple.opacity * (1 - progress);

      ctx.save();
      ctx.globalAlpha = currentOpacity;
      ctx.strokeStyle = veinColorsObj.blue + '60';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  };

  // Handle mouse interaction
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let foundHover = false;

    dataVeinsRef.current = dataVeinsRef.current.map(vein => {
      const bloom = vein.bloom;
      const distance = Math.sqrt(
        Math.pow(mouseX - bloom.x, 2) + Math.pow(mouseY - bloom.y, 2)
      );

      const isHovered = distance < bloom.size;

      if (isHovered && !bloom.isHovered) {
        foundHover = true;
        setHoveredBloom(bloom.id);

        // Trigger interaction effects
        playInteractionSound(440 + Math.random() * 200, 150);
        createCoreRipple(0.8);

        return {
          ...vein,
          bloom: { ...bloom, isHovered: true, pulseIntensity: 1 },
          pulsation: vein.pulsation + Math.PI * 0.5 // Phase shift for stronger pulsation
        };
      } else if (!isHovered && bloom.isHovered) {
        return {
          ...vein,
          bloom: { ...bloom, isHovered: false, pulseIntensity: 0 }
        };
      }

      return vein;
    });

    if (!foundHover) {
      setHoveredBloom(null);
    }
  };

  // Handle bloom click
  const handleBloomClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    dataVeinsRef.current.forEach(vein => {
      const bloom = vein.bloom;
      const distance = Math.sqrt(
        Math.pow(mouseX - bloom.x, 2) + Math.pow(mouseY - bloom.y, 2)
      );

      if (distance < bloom.size) {
        // Trigger dissolution and reformation animation
        playInteractionSound(660, 300);
        createCoreRipple(1.2);

        dataVeinsRef.current = dataVeinsRef.current.map(v => {
          if (v.id === vein.id) {
            return {
              ...v,
              bloom: { ...v.bloom, dissolved: true }
            };
          }
          return v;
        });

        // Reform bloom after 500ms
        setTimeout(() => {
          dataVeinsRef.current = dataVeinsRef.current.map(v => {
            if (v.id === vein.id) {
              return {
                ...v,
                bloom: {
                  ...v.bloom,
                  dissolved: false,
                  petals: generateBloomPetals(),
                  animationPhase: 0
                }
              };
            }
            return v;
          });
        }, 500);

        onBloomInteraction?.(bloom);
      }
    });
  };

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    timeRef.current += 16;

    // Clear canvas with theme-appropriate background
    ctx.fillStyle = theme === 'dark' ? themeColors.primaryBackground : '#FFFFFF';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Update vein energy and bloom animations
    dataVeinsRef.current = dataVeinsRef.current.map(vein => ({
      ...vein,
      energy: (vein.energy + 0.01) % 1,
      pulsation: vein.pulsation + 0.05,
      bloom: {
        ...vein.bloom,
        animationPhase: vein.bloom.animationPhase + 0.02,
        pulseIntensity: Math.max(0, vein.bloom.pulseIntensity - 0.02)
      }
    }));

    // Render core ripples
    renderCoreRipples(ctx);

    // Render data veins
    dataVeinsRef.current.forEach(vein => {
      renderDataVein(ctx, vein);
    });

    // Render insight blooms
    dataVeinsRef.current.forEach(vein => {
      renderInsightBloom(ctx, vein.bloom);
    });

    // Clean up old ripples
    coreRipplesRef.current = coreRipplesRef.current.filter(ripple => timeRef.current - ripple.time < 1000);

    animationRef.current = requestAnimationFrame(animate);
  }, [theme, themeColors, dimensions]);

  // Initialize on mount
  useEffect(() => {
    initializeDataVeins();
    initializeAudio();
  }, [initializeDataVeins, initializeAudio]);

  // Setup canvas with proper pixel dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && dimensions.width > 0 && dimensions.height > 0) {
      // Set actual canvas resolution to match the CSS size
      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = dimensions.width * devicePixelRatio;
      canvas.height = dimensions.height * devicePixelRatio;

      // Scale the context back to match CSS pixels
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
  }, [dimensions]);

  // Start animation
  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px', // Account for navbar height
        left: 0,
        width: '100%',
        height: 'calc(100vh - 80px)', // Match main canvas height
        pointerEvents: 'auto',
        zIndex: 1.5, // Behind hero content but above main canvas
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleBloomClick}
        style={{
          width: '100%',
          height: '100%',
          display: 'block', // Remove inline spacing
          cursor: hoveredBloom ? 'pointer' : 'default',
          position: 'relative',
          zIndex: 2, // Ensure this canvas is above the background canvas
        }}
      />

      {/* Bloom tooltip */}
      {hoveredBloom && (
        <div
          style={{
            position: 'absolute',
            bottom: spacing[4],
            left: '50%',
            transform: 'translateX(-50%)',
            background: theme === 'dark' ? 'rgba(42, 47, 62, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            color: themeColors.textPrimary,
            padding: `${spacing[2]}px ${spacing[4]}px`,
            borderRadius: '8px',
            boxShadow: theme === 'dark' 
              ? '0 4px 20px rgba(102, 153, 255, 0.2)' 
              : '0 4px 20px rgba(102, 153, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}
        >
          {dataVeinsRef.current.find(v => v.bloom.id === hoveredBloom)?.bloom.content.description}
        </div>
      )}
    </div>
  );
};