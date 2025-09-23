"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import { colors, spacing, typography } from '@pixelsandpetals/ui';

interface CrystalFacet {
  vertices: [number, number, number][];
  normal: [number, number, number];
  highlight: number;
  textProjection?: string;
  color: string;
  opacity: number;
}

interface AdaptiveContent {
  headline: string;
  subheadline: string;
  morphType: 'default' | 'ai' | 'mobile' | 'cloud' | 'design';
  timeContext?: 'morning' | 'afternoon' | 'evening' | 'night';
  locationHint?: string;
}

export const CrystallineCore: React.FC = () => {
  const { theme, colors: themeColors } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const timeRef = useRef(0);
  const lastFrameTime = useRef(0);

  // Define reliable color palette that adapts to theme
  const crystalColors = {
    blue: themeColors.primaryAccent,
    purple: themeColors.secondaryAccent,
    white: theme === 'dark' ? '#FFFFFF' : '#FFFFFF',
    background: theme === 'dark' ? themeColors.primaryBackground : themeColors.surfaceBackground,
    text: themeColors.textPrimary,
    textLight: themeColors.textSubtle
  };

  const [adaptiveContent, setAdaptiveContent] = useState<AdaptiveContent>({
    headline: "",
    subheadline: "",
    morphType: 'default'
  });

  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [facets, setFacets] = useState<CrystalFacet[]>([]);
  const [isHighPerformance, setIsHighPerformance] = useState(true);

  // Adaptive content configurations
  const contentLibrary = {
    default: {
      headline: "",
      subheadline: "",
      morphShape: 'classic'
    },
    ai: {
      headline: "Intelligent Solutions for Tomorrow",
      subheadline: "Empowering Decisions with AI",
      morphShape: 'angular'
    },
    mobile: {
      headline: "Mobile Experiences That Connect",
      subheadline: "Cross-Platform Excellence",
      morphShape: 'flowing'
    },
    cloud: {
      headline: "Scalable Cloud Architecture",
      subheadline: "Infrastructure for the Future",
      morphShape: 'geometric'
    },
    design: {
      headline: "Design-Forward Engineering",
      subheadline: "Beauty Meets Functionality",
      morphShape: 'organic'
    }
  };

  // Performance detection
  const detectPerformance = () => {
    if (typeof navigator === 'undefined') return true;

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check hardware concurrency (rough CPU indicator)
    const lowConcurrency = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return !isMobile && !prefersReducedMotion && !lowConcurrency;
  };

  // Generate crystal facets based on morph type
  const generateCrystalFacets = (morphType: string): CrystalFacet[] => {
    const baseFacets: CrystalFacet[] = [];
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const baseSize = 80;
    const facetCount = isHighPerformance ? 1 : 0.6; // Reduce facets on low-performance devices

    switch (morphType) {
      case 'angular': // AI-focused
        // More angular, circuit-like facets
        for (let i = 0; i < Math.floor(12 * facetCount); i++) {
          const angle = (i / 12) * Math.PI * 2;
          const radius = baseSize + Math.sin(i * 0.7) * 20;
          const height = 40 + Math.cos(i * 1.2) * 15;

          baseFacets.push({
            vertices: [
              [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 0],
              [centerX + Math.cos(angle + 0.5) * (radius * 0.7), centerY + Math.sin(angle + 0.5) * (radius * 0.7), height],
              [centerX + Math.cos(angle - 0.5) * (radius * 0.7), centerY + Math.sin(angle - 0.5) * (radius * 0.7), height],
            ],
            normal: [Math.cos(angle), Math.sin(angle), 0.5],
            highlight: Math.random() * 0.3,
            color: i % 2 === 0 ? crystalColors.blue : crystalColors.purple,
            opacity: 0.7 + Math.random() * 0.3
          });
        }
        break;

      case 'flowing': // Mobile-focused
        // More organic, flowing facets
        for (let i = 0; i < Math.floor(8 * facetCount); i++) {
          const angle = (i / 8) * Math.PI * 2;
          const radius = baseSize + Math.sin(i * 1.5) * 30;
          const waveOffset = Math.sin(timeRef.current * 0.001 + i) * 10;

          baseFacets.push({
            vertices: [
              [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius + waveOffset, 0],
              [centerX + Math.cos(angle + 0.8) * (radius * 0.6), centerY + Math.sin(angle + 0.8) * (radius * 0.6), 30],
              [centerX + Math.cos(angle - 0.8) * (radius * 0.6), centerY + Math.sin(angle - 0.8) * (radius * 0.6), 30],
            ],
            normal: [Math.cos(angle), Math.sin(angle), 0.3],
            highlight: Math.sin(timeRef.current * 0.002 + i) * 0.3 + 0.3,
            color: crystalColors.blue,
            opacity: 0.6 + Math.sin(timeRef.current * 0.003 + i) * 0.2
          });
        }
        break;

      case 'geometric': // Cloud-focused
        // Regular, systematic facets
        const gridSize = Math.floor(6 * Math.sqrt(facetCount));
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            const x = centerX + (i - 2.5) * 25;
            const y = centerY + (j - 2.5) * 25;
            const z = Math.sin(i * 0.5) * Math.cos(j * 0.5) * 20;

            baseFacets.push({
              vertices: [
                [x, y, z],
                [x + 20, y, z + 5],
                [x + 10, y + 20, z + 10],
              ],
              normal: [0, 0, 1],
              highlight: (i + j) % 2 * 0.2,
              color: crystalColors.purple,
              opacity: 0.5 + (i + j) * 0.05
            });
          }
        }
        break;

      case 'organic': // Design-focused
        // Organic, petal-like facets
        for (let i = 0; i < Math.floor(16 * facetCount); i++) {
          const angle = (i / 16) * Math.PI * 2;
          const radius = baseSize + Math.sin(i * 2) * 25;
          const petalHeight = 30 + Math.cos(i * 3) * 10;

          baseFacets.push({
            vertices: [
              [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 0],
              [centerX + Math.cos(angle + 0.3) * (radius * 0.8), centerY + Math.sin(angle + 0.3) * (radius * 0.8), petalHeight],
              [centerX + Math.cos(angle - 0.3) * (radius * 0.8), centerY + Math.sin(angle - 0.3) * (radius * 0.8), petalHeight],
            ],
            normal: [Math.cos(angle), Math.sin(angle), 0.6],
            highlight: Math.sin(timeRef.current * 0.001 + i * 0.5) * 0.4 + 0.3,
            color: i % 3 === 0 ? crystalColors.blue : i % 3 === 1 ? crystalColors.purple : crystalColors.background,
            opacity: 0.6 + Math.sin(timeRef.current * 0.002 + i * 0.3) * 0.3
          });
        }
        break;

      default: // Classic crystal
        for (let i = 0; i < Math.floor(10 * facetCount); i++) {
          const angle = (i / 10) * Math.PI * 2;
          const radius = baseSize;
          const height = 35;

          baseFacets.push({
            vertices: [
              [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 0],
              [centerX + Math.cos(angle + 0.6) * (radius * 0.7), centerY + Math.sin(angle + 0.6) * (radius * 0.7), height],
              [centerX + Math.cos(angle - 0.6) * (radius * 0.7), centerY + Math.sin(angle - 0.6) * (radius * 0.7), height],
            ],
            normal: [Math.cos(angle), Math.sin(angle), 0.4],
            highlight: Math.sin(timeRef.current * 0.001 + i) * 0.3 + 0.4,
            color: i % 2 === 0 ? crystalColors.blue : crystalColors.purple,
            opacity: 0.8
          });
        }
    }

    return baseFacets;
  };

  // Detect user context for adaptive content
  const detectUserContext = (): AdaptiveContent => {
    const hour = new Date().getHours();
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const referrer = typeof document !== 'undefined' ? document.referrer.toLowerCase() : '';

    let morphType: AdaptiveContent['morphType'] = 'default';
    let timeContext: AdaptiveContent['timeContext'] = 'afternoon';

    // Time-based adaptation
    if (hour >= 5 && hour < 12) timeContext = 'morning';
    else if (hour >= 12 && hour < 17) timeContext = 'afternoon';
    else if (hour >= 17 && hour < 21) timeContext = 'evening';
    else timeContext = 'night';

    // Context-based morphing
    if (referrer.includes('ai') || referrer.includes('machine') || referrer.includes('artificial')) {
      morphType = 'ai';
    } else if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
      morphType = 'mobile';
    } else if (referrer.includes('cloud') || referrer.includes('aws') || referrer.includes('azure')) {
      morphType = 'cloud';
    } else if (referrer.includes('design') || referrer.includes('ui') || referrer.includes('ux')) {
      morphType = 'design';
    }

    const content = contentLibrary[morphType];

    // Time-based headline modifications
    let headline = content.headline;
    if (timeContext === 'morning') {
      headline = headline.replace('Crafting', 'Starting').replace('Tomorrow', 'Today');
    } else if (timeContext === 'evening') {
      headline = headline.replace('Futures', 'Dreams').replace('Tomorrow', 'Tonight');
    }

    return {
      headline,
      subheadline: content.subheadline,
      morphType,
      timeContext
    };
  };

  // Render crystal facet with 3D projection
  const renderFacet = (ctx: CanvasRenderingContext2D, facet: CrystalFacet, rotation: { x: number, y: number, z: number }) => {
    const projectedVertices = facet.vertices.map(vertex => {
      // Simple 3D to 2D projection with rotation
      let [x, y, z] = vertex;

      // Apply rotation
      const cosX = Math.cos(rotation.x), sinX = Math.sin(rotation.x);
      const cosY = Math.cos(rotation.y), sinY = Math.sin(rotation.y);
      const cosZ = Math.cos(rotation.z), sinZ = Math.sin(rotation.z);

      // Rotate around Y axis
      const newX = x * cosY + z * sinY;
      const newZ = z * cosY - x * sinY;
      x = newX;
      z = newZ;

      // Rotate around X axis
      const newY = y * cosX - z * sinX;
      z = z * cosX + y * sinX;
      y = newY;

      // Project to 2D (simple perspective)
      const perspective = 300;
      const scale = perspective / (perspective + z);

      return [x * scale, y * scale];
    });

    // Calculate lighting based on facet normal and rotation
    const lightIntensity = Math.max(0.2,
      facet.normal[0] * 0.5 + facet.normal[1] * 0.3 + facet.normal[2] * 0.8
    );

    ctx.save();
    ctx.globalAlpha = facet.opacity * lightIntensity;

    // Create gradient for glass effect
    const centerX = projectedVertices.reduce((sum, v) => sum + v[0], 0) / projectedVertices.length;
    const centerY = projectedVertices.reduce((sum, v) => sum + v[1], 0) / projectedVertices.length;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    const baseColor = facet.color || crystalColors.blue;
    gradient.addColorStop(0, baseColor + 'AA');
    gradient.addColorStop(0.7, baseColor + '66');
    gradient.addColorStop(1, baseColor + '22');

    // Draw facet
    ctx.beginPath();
    ctx.moveTo(projectedVertices[0][0], projectedVertices[0][1]);
    projectedVertices.slice(1).forEach(vertex => {
      ctx.lineTo(vertex[0], vertex[1]);
    });
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    // Add highlight
    if (facet.highlight > 0.5) {
      ctx.globalAlpha = (facet.highlight - 0.5) * 0.6;
      ctx.fillStyle = crystalColors.white;
      ctx.fill();
    }

    // Add edge glow
    ctx.globalAlpha = 0.8;
    ctx.strokeStyle = baseColor + '88';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  };

  // Render text projection onto crystal
  const renderTextProjection = (ctx: CanvasRenderingContext2D) => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    ctx.save();

    // No text rendering - crystal only

    ctx.restore();
  };

  // Main animation loop
  const animate = (currentTime = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Frame rate limiting for performance
    const targetFPS = isHighPerformance ? 60 : 30;
    const frameInterval = 1000 / targetFPS;

    if (currentTime - lastFrameTime.current < frameInterval) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    lastFrameTime.current = currentTime;

    // Update time and rotation
    const deltaTime = isHighPerformance ? 16 : 32;
    timeRef.current += deltaTime;
    rotationRef.current.y += isHighPerformance ? 0.005 : 0.003; // Slower rotation on low-performance devices
    rotationRef.current.x = Math.sin(timeRef.current * 0.0003) * 0.1;
    rotationRef.current.z = Math.cos(timeRef.current * 0.0002) * 0.05;

    // Clear canvas with theme-appropriate background
    ctx.fillStyle = theme === 'dark' ? themeColors.primaryBackground : themeColors.surfaceBackground;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Update facets based on current morph type
    const currentFacets = generateCrystalFacets(adaptiveContent.morphType);

    // Sort facets by depth for proper rendering
    const sortedFacets = currentFacets.sort((a, b) => {
      const aDepth = a.vertices.reduce((sum, v) => sum + v[2], 0) / a.vertices.length;
      const bDepth = b.vertices.reduce((sum, v) => sum + v[2], 0) / b.vertices.length;
      return aDepth - bDepth; // Render back to front
    });

    // Render facets
    sortedFacets.forEach(facet => {
      renderFacet(ctx, facet, rotationRef.current);
    });

    // Render text projection
    renderTextProjection(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Initialize adaptive content and performance detection
  useEffect(() => {
    const context = detectUserContext();
    setAdaptiveContent(context);

    const performanceLevel = detectPerformance();
    setIsHighPerformance(performanceLevel);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: 500, height: 500 });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
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
  }, [adaptiveContent, dimensions, theme, themeColors]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
        minHeight: '600px',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          filter: theme === 'dark' 
            ? 'drop-shadow(0 10px 30px rgba(102, 153, 255, 0.2))' 
            : 'drop-shadow(0 10px 30px rgba(102, 153, 255, 0.3))',
          marginBottom: spacing[6],
        }}
      />
    </div>
  );
};