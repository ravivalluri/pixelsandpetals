import React, { useState, useEffect, useRef } from 'react';
import { colors, typography, spacing } from '..';

export interface DataShard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  position: { x: number; y: number };
  size: number;
  onInteract: () => void;
}

export interface ProjectPortalQuestProps {
  title?: string;
  subtitle?: string;
  dataShards: DataShard[];
  onBeginQuest: () => void;
  onQuestComplete?: () => void;
  style?: React.CSSProperties;
}

export const ProjectPortalQuest: React.FC<ProjectPortalQuestProps> = ({
  title = "Crafting Digital Futures",
  subtitle = "Embark on a quest to explore our innovative solutions and impactful projects.",
  dataShards,
  onBeginQuest,
  onQuestComplete,
  style,
}) => {
  const [hoveredShard, setHoveredShard] = useState<string | null>(null);
  const [interactedShards, setInteractedShards] = useState<Set<string>>(new Set());
  const [portalActive, setPortalActive] = useState(false);
  const [questProgress, setQuestProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const progress = (interactedShards.size / dataShards.length) * 100;
    setQuestProgress(progress);

    if (progress === 100 && onQuestComplete) {
      onQuestComplete();
    }
  }, [interactedShards, dataShards.length, onQuestComplete]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    minHeight: '100vh',
    background: `
      radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
        rgba(102, 153, 255, 0.1) 0%,
        rgba(153, 102, 204, 0.05) 30%,
        transparent 60%
      ),
      linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)
    `,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  // Animated background particles
  const backgroundParticlesStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  };

  // Central portal styles
  const portalStyles: React.CSSProperties = {
    position: 'relative',
    width: portalActive ? '400px' : '300px',
    height: portalActive ? '400px' : '300px',
    borderRadius: '50%',
    background: `
      radial-gradient(circle at center,
        rgba(240, 248, 255, 0.8) 0%,
        rgba(240, 248, 255, 0.4) 40%,
        rgba(102, 153, 255, 0.2) 70%,
        transparent 100%
      )
    `,
    backdropFilter: 'blur(20px) saturate(180%)',
    border: `2px solid rgba(102, 153, 255, ${portalActive ? 0.6 : 0.3})`,
    boxShadow: `
      0 0 60px rgba(102, 153, 255, ${portalActive ? 0.8 : 0.3}),
      inset 0 0 30px rgba(240, 248, 255, 0.3)
    `,
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: portalActive ? 'scale(1.1)' : 'scale(1)',
  };

  // Liquid swirl animation inside portal
  const liquidSwirlStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    borderRadius: '50%',
    background: `
      conic-gradient(from 0deg at center,
        transparent 0deg,
        rgba(102, 153, 255, 0.3) 90deg,
        rgba(153, 102, 204, 0.2) 180deg,
        rgba(102, 153, 255, 0.1) 270deg,
        transparent 360deg
      )
    `,
    animation: 'liquidSwirl 8s linear infinite',
    filter: 'blur(2px)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    background: `linear-gradient(135deg, ${colors.textDark} 0%, ${colors.primaryAccent} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    marginBottom: spacing[4],
    zIndex: 2,
    position: 'relative',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.lg,
    color: colors.textSubtle,
    textAlign: 'center',
    marginBottom: spacing[8],
    maxWidth: '600px',
    lineHeight: typography.lineHeights.relaxed,
    zIndex: 2,
    position: 'relative',
  };

  const questButtonStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${colors.primaryAccent} 0%, ${colors.secondaryAccent} 100%)`,
    border: 'none',
    borderRadius: '12px',
    padding: `${spacing[3]}px ${spacing[6]}px`,
    color: colors.pureWhite,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 8px 32px rgba(102, 153, 255, 0.4)`,
    transition: 'all 0.3s ease',
    zIndex: 3,
  };

  const getShardStyles = (shard: DataShard): React.CSSProperties => {
    const isHovered = hoveredShard === shard.id;
    const isInteracted = interactedShards.has(shard.id);

    // Use deterministic values instead of Date.now() to prevent hydration issues
    const timeSeed = shard.id.charCodeAt(0) || 1;
    const rotation = Math.sin(timeSeed * 0.1 + shard.position.x) * 5;
    const translateY = Math.sin(timeSeed * 0.2 + shard.position.y) * 10;

    return {
      position: 'absolute',
      left: `${shard.position.x}%`,
      top: `${shard.position.y}%`,
      width: `${shard.size}px`,
      height: `${shard.size * 0.8}px`,
      background: `
        linear-gradient(135deg,
          rgba(240, 248, 255, ${isHovered ? 0.8 : 0.5}) 0%,
          rgba(217, 232, 245, ${isHovered ? 0.6 : 0.3}) 100%
        )
      `,
      backdropFilter: 'blur(15px) saturate(150%)',
      border: `1px solid rgba(102, 153, 255, ${isInteracted ? 0.8 : isHovered ? 0.5 : 0.2})`,
      borderRadius: '12px',
      transform: `
        rotate(${rotation}deg)
        scale(${isHovered ? 1.1 : 1})
        translateY(${translateY}px)
      `,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing[3],
      boxShadow: isHovered
        ? `0 12px 40px rgba(102, 153, 255, 0.3)`
        : `0 4px 16px rgba(102, 153, 255, 0.1)`,
      opacity: isInteracted ? 0.8 : 1,
    };
  };

  const questLogStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: spacing[2],
    zIndex: 10,
  };

  const questDotStyles = (index: number): React.CSSProperties => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: index < interactedShards.size
      ? `linear-gradient(135deg, ${colors.primaryAccent} 0%, ${colors.secondaryAccent} 100%)`
      : `rgba(102, 153, 255, 0.2)`,
    border: `1px solid rgba(102, 153, 255, 0.3)`,
    transition: 'all 0.3s ease',
    boxShadow: index < interactedShards.size
      ? `0 0 12px rgba(102, 153, 255, 0.5)`
      : 'none',
  });

  const handleShardInteract = (shard: DataShard) => {
    setInteractedShards(prev => new Set([...prev, shard.id]));
    shard.onInteract();

    // Animate portal reaction
    setPortalActive(true);
    setTimeout(() => setPortalActive(false), 1000);
  };

  // Create deterministic particle data for SSR compatibility
  const particleData = React.useMemo(() => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      // Use deterministic values based on index instead of Math.random()
      const seed = i * 17 + 42; // Simple seed function
      const pseudo1 = (seed * 9301 + 49297) % 233280 / 233280;
      const pseudo2 = ((seed + 1) * 9301 + 49297) % 233280 / 233280;
      const pseudo3 = ((seed + 2) * 9301 + 49297) % 233280 / 233280;
      const pseudo4 = ((seed + 3) * 9301 + 49297) % 233280 / 233280;
      const pseudo5 = ((seed + 4) * 9301 + 49297) % 233280 / 233280;

      particles.push({
        id: i,
        width: pseudo1 * 6 + 2,
        height: pseudo2 * 6 + 2,
        opacity: pseudo3 * 0.3 + 0.1,
        left: pseudo4 * 100,
        top: pseudo5 * 100,
        duration: pseudo1 * 10 + 8,
        animationType: i % 3,
      });
    }
    return particles;
  }, []);

  const renderFloatingParticles = () => {
    return particleData.map((particle) => (
      <div
        key={particle.id}
        style={{
          position: 'absolute',
          width: `${particle.width}px`,
          height: `${particle.height}px`,
          borderRadius: '50%',
          background: `rgba(102, 153, 255, ${particle.opacity})`,
          left: `${particle.left}%`,
          top: `${particle.top}%`,
          animation: `floatParticle${particle.animationType} ${particle.duration}s ease-in-out infinite`,
          filter: 'blur(1px)',
        }}
      />
    ));
  };

  return (
    <div ref={containerRef} style={containerStyles}>
      {/* Animated background particles */}
      <div style={backgroundParticlesStyles}>
        {renderFloatingParticles()}
      </div>

      {/* Title and subtitle */}
      <h1 style={titleStyles}>{title}</h1>
      <p style={subtitleStyles}>{subtitle}</p>

      {/* Central Portal */}
      <div
        style={portalStyles}
        onClick={onBeginQuest}
        onMouseEnter={() => setPortalActive(true)}
        onMouseLeave={() => setPortalActive(false)}
      >
        {/* Liquid swirl animation */}
        <div style={liquidSwirlStyles} />

        {/* Quest button */}
        <button
          style={questButtonStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 48px rgba(102, 153, 255, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 153, 255, 0.4)';
          }}
        >
          Begin Your Quest

          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: 'shimmer 3s infinite',
          }} />
        </button>
      </div>

      {/* Floating Data Shards */}
      {dataShards.map((shard) => (
        <div
          key={shard.id}
          style={getShardStyles(shard)}
          onMouseEnter={() => setHoveredShard(shard.id)}
          onMouseLeave={() => setHoveredShard(null)}
          onClick={() => handleShardInteract(shard)}
        >
          {shard.icon && (
            <div style={{
              fontSize: typography.fontSizes.xl,
              marginBottom: spacing[1],
            }}>
              {shard.icon}
            </div>
          )}
          <div style={{
            fontSize: typography.fontSizes.sm,
            fontWeight: typography.fontWeights.semibold,
            color: colors.textDark,
            textAlign: 'center',
            lineHeight: typography.lineHeights.tight,
          }}>
            {shard.title}
          </div>

          {hoveredShard === shard.id && (
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: `rgba(240, 248, 255, 0.95)`,
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(102, 153, 255, 0.3)`,
              borderRadius: '8px',
              padding: `${spacing[2]}px ${spacing[3]}px`,
              fontSize: typography.fontSizes.xs,
              color: colors.textDark,
              whiteSpace: 'nowrap',
              zIndex: 100,
              animation: 'fadeInUp 0.3s ease-out',
            }}>
              Explore {shard.title}
            </div>
          )}
        </div>
      ))}

      {/* Quest Log Progress */}
      <div style={questLogStyles}>
        {dataShards.map((_, index) => (
          <div key={index} style={questDotStyles(index)} />
        ))}
      </div>

      <style jsx>{`
        @keyframes liquidSwirl {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes floatParticle0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(-40px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-20px) translateX(5px); opacity: 0.6; }
        }

        @keyframes floatParticle1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-30px) translateX(-15px); opacity: 0.7; }
          66% { transform: translateY(-15px) translateX(20px); opacity: 0.5; }
        }

        @keyframes floatParticle2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { transform: translateY(-25px) translateX(8px); opacity: 0.9; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};