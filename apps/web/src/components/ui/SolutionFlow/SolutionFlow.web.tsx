import React, { useState, useRef, useEffect } from 'react';
import { colors } from '..';

export interface ServiceOrb {
  id: string;
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  oneLiner: string;
  caseStudies?: string[];
  connections: string[]; // IDs of connected services
}

export interface SolutionFlowProps {
  services: ServiceOrb[];
  onServiceClick?: (service: ServiceOrb) => void;
  onSolutionBuilt?: (selectedServices: ServiceOrb[]) => void;
  style?: React.CSSProperties;
}

export const SolutionFlow: React.FC<SolutionFlowProps> = ({
  services,
  onServiceClick,
  onSolutionBuilt,
  style,
}) => {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);
  const [selectedOrbs, setSelectedOrbs] = useState<Set<string>>(new Set());
  const [deepDiveService, setDeepDiveService] = useState<ServiceOrb | null>(null);
  const [solutionBuilderActive, setSolutionBuilderActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for flow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Generate deterministic orb positions
  const orbPositions = React.useMemo(() => {
    return services.map((_, index) => {
      const angle = (index * 2 * Math.PI) / services.length + Math.PI / 4;
      const radius = 200 + (index % 2) * 60; // Varied radius for organic feel
      const centerX = 50;
      const centerY = 50;

      return {
        x: centerX + (Math.cos(angle) * radius) / 8, // Scale to percentage
        y: centerY + (Math.sin(angle) * radius) / 8,
      };
    });
  }, [services.length]);

  const handleOrbClick = (service: ServiceOrb) => {
    if (solutionBuilderActive) {
      const newSelected = new Set(selectedOrbs);
      if (newSelected.has(service.id)) {
        newSelected.delete(service.id);
      } else if (newSelected.size < 3) {
        newSelected.add(service.id);
      }
      setSelectedOrbs(newSelected);

      if (newSelected.size >= 2 && onSolutionBuilt) {
        const selectedServices = services.filter(s => newSelected.has(s.id));
        onSolutionBuilt(selectedServices);
      }
    } else {
      setDeepDiveService(service);
      onServiceClick?.(service);
    }
  };

  const getConnectedServices = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service?.connections || [];
  };

  const renderFlowLines = () => {
    if (!hoveredOrb) return null;

    const hoveredIndex = services.findIndex(s => s.id === hoveredOrb);
    const connectedIds = getConnectedServices(hoveredOrb);

    return connectedIds.map(connectedId => {
      const connectedIndex = services.findIndex(s => s.id === connectedId);
      if (connectedIndex === -1) return null;

      const start = orbPositions[hoveredIndex];
      const end = orbPositions[connectedIndex];

      return (
        <svg
          key={`${hoveredOrb}-${connectedId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <defs>
            <linearGradient id={`flowGradient-${hoveredOrb}-${connectedId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: colors.secondaryAccent, stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path
            d={`M ${start.x}% ${start.y}% Q ${(start.x + end.x) / 2}% ${(start.y + end.y) / 2 - 5}% ${end.x}% ${end.y}%`}
            stroke={`url(#flowGradient-${hoveredOrb}-${connectedId})`}
            strokeWidth="2"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 4px rgba(102, 153, 255, 0.6))',
              animation: 'flowPulse 2s ease-in-out infinite',
            }}
          />
          {/* Flow particles */}
          <circle
            cx={`${start.x}%`}
            cy={`${start.y}%`}
            r="3"
            fill={colors.primaryAccent}
            style={{
              animation: `flowParticle-${hoveredOrb}-${connectedId} 3s linear infinite`,
            }}
          />
        </svg>
      );
    });
  };

  const renderServiceOrbs = () => {
    return services.map((service, index) => {
      const position = orbPositions[index];
      const isHovered = hoveredOrb === service.id;
      const isSelected = selectedOrbs.has(service.id);

      const orbStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: isHovered ? '160px' : '140px',
        height: isHovered ? '160px' : '140px',
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 30% 30%,
            ${colors.secondaryBackground} 0%,
            rgba(240, 248, 255, 0.7) 50%,
            rgba(102, 153, 255, 0.2) 100%
          )
        `,
        backdropFilter: 'blur(20px) saturate(180%)',
        border: `2px solid ${isSelected ? colors.secondaryAccent : isHovered ? colors.primaryAccent : 'rgba(102, 153, 255, 0.3)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1}) ${isSelected ? 'rotate(5deg)' : ''}`,
        zIndex: isHovered ? 10 : 5,
        boxShadow: `
          0 8px 32px rgba(102, 153, 255, ${isHovered ? 0.4 : 0.1}),
          inset 0 1px 0 rgba(255, 255, 255, 0.2),
          inset 0 -1px 0 rgba(102, 153, 255, 0.1)
        `,
        textAlign: 'center',
        padding: '20px',
      };

      return (
        <div key={service.id}>
          <div
            style={orbStyle}
            onMouseEnter={() => setHoveredOrb(service.id)}
            onMouseLeave={() => setHoveredOrb(null)}
            onClick={() => handleOrbClick(service)}
          >
            <div
              style={{
                fontSize: '28px',
                marginBottom: '8px',
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
              }}
            >
              {service.icon}
            </div>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: colors.textDark,
                lineHeight: 1.2,
              }}
            >
              {service.title}
            </div>
          </div>

          {/* Hover tooltip */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y - 12}%`,
                transform: 'translate(-50%, -100%)',
                background: `
                  linear-gradient(135deg,
                    rgba(240, 248, 255, 0.95) 0%,
                    rgba(217, 232, 245, 0.9) 100%
                  )
                `,
                backdropFilter: 'blur(15px) saturate(150%)',
                border: `1px solid rgba(102, 153, 255, 0.3)`,
                borderRadius: '12px',
                padding: '12px 16px',
                maxWidth: '200px',
                zIndex: 15,
                fontSize: '12px',
                color: colors.textDark,
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(102, 153, 255, 0.2)',
                animation: 'tooltipFadeIn 0.3s ease-out',
              }}
            >
              {service.oneLiner}
            </div>
          )}
        </div>
      );
    });
  };

  const renderSolutionBuilder = () => {
    if (!solutionBuilderActive || selectedOrbs.size < 2) return null;

    const selectedServices = services.filter(s => selectedOrbs.has(s.id));
    const combinationTitle = selectedServices.map(s => s.title).join(' + ');

    return (
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `
            linear-gradient(135deg,
              rgba(240, 248, 255, 0.95) 0%,
              rgba(217, 232, 245, 0.9) 100%
            )
          `,
          backdropFilter: 'blur(20px) saturate(180%)',
          border: `2px solid ${colors.primaryAccent}`,
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '400px',
          zIndex: 20,
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(102, 153, 255, 0.3)',
          animation: 'solutionBuilderSlideIn 0.5s ease-out',
        }}
      >
        <h3 style={{ color: colors.textDark, marginBottom: '12px', fontSize: '18px' }}>
          {combinationTitle}
        </h3>
        <p style={{ color: colors.textSubtle, fontSize: '14px', lineHeight: 1.4 }}>
          This powerful combination creates {selectedServices.length === 2 ? 'synergistic solutions' : 'comprehensive solutions'} that leverage {selectedServices.map(s => s.title.toLowerCase()).join(', ')} for maximum impact.
        </p>
        <button
          style={{
            marginTop: '16px',
            background: colors.primaryAccent,
            color: colors.pureWhite,
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
          onClick={() => {
            setSolutionBuilderActive(false);
            setSelectedOrbs(new Set());
          }}
        >
          Build This Solution
        </button>
      </div>
    );
  };

  const renderDeepDivePanel = () => {
    if (!deepDiveService) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'flex-end',
        }}
        onClick={() => setDeepDiveService(null)}
      >
        <div
          style={{
            width: '100%',
            maxHeight: '70vh',
            background: `
              linear-gradient(135deg,
                rgba(240, 248, 255, 0.98) 0%,
                rgba(217, 232, 245, 0.95) 100%
              )
            `,
            backdropFilter: 'blur(25px) saturate(180%)',
            border: `1px solid rgba(102, 153, 255, 0.3)`,
            borderRadius: '16px 16px 0 0',
            padding: '32px',
            overflowY: 'auto',
            animation: 'panelSlideUp 0.4s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h2 style={{ color: colors.textDark, fontSize: '28px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '32px' }}>{deepDiveService.icon}</span>
                {deepDiveService.title}
              </h2>
              <p style={{ color: colors.textSubtle, fontSize: '16px', lineHeight: 1.5 }}>
                {deepDiveService.description}
              </p>
            </div>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: colors.textSubtle,
                padding: '8px',
              }}
              onClick={() => setDeepDiveService(null)}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', marginBottom: '12px' }}>Key Benefits</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
              {deepDiveService.benefits.map((benefit, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(102, 153, 255, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    color: colors.textDark,
                  }}
                >
                  • {benefit}
                </div>
              ))}
            </div>
          </div>

          <button
            style={{
              background: colors.primaryAccent,
              color: colors.pureWhite,
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: `0 4px 16px rgba(102, 153, 255, 0.3)`,
            }}
          >
            Get a Quote for {deepDiveService.title}
          </button>
        </div>
      </div>
    );
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '600px',
    background: `
      radial-gradient(circle at 20% 80%, rgba(102, 153, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(153, 102, 204, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)
    `,
    overflow: 'hidden',
    borderRadius: '24px',
    ...style,
  };

  return (
    <>
      <style>
        {`
          @keyframes flowPulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes tooltipFadeIn {
            from { opacity: 0; transform: translate(-50%, -90%); }
            to { opacity: 1; transform: translate(-50%, -100%); }
          }
          @keyframes solutionBuilderSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          @keyframes panelSlideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>

      <div ref={containerRef} style={containerStyles}>
        {/* Animated background flow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(45deg, transparent 30%, rgba(102, 153, 255, 0.05) 50%, transparent 70%)
            `,
            animation: 'backgroundFlow 20s linear infinite',
            transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`,
          }}
        />

        {/* Flow lines */}
        {renderFlowLines()}

        {/* Service orbs */}
        {renderServiceOrbs()}

        {/* Solution builder panel */}
        {renderSolutionBuilder()}

        {/* Build solution button */}
        <button
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            background: solutionBuilderActive ? colors.secondaryAccent : colors.primaryAccent,
            color: colors.pureWhite,
            border: 'none',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0 4px 16px rgba(102, 153, 255, 0.3)',
            zIndex: 15,
            transition: 'all 0.3s ease',
          }}
          onClick={() => {
            setSolutionBuilderActive(!solutionBuilderActive);
            setSelectedOrbs(new Set());
          }}
        >
          {solutionBuilderActive ? '×' : '⚡'}
        </button>

        {/* Title overlay */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            zIndex: 10,
          }}
        >
          <h2
            style={{
              color: colors.textDark,
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            Solution Flow
          </h2>
          <p
            style={{
              color: colors.textSubtle,
              fontSize: '14px',
              maxWidth: '300px',
            }}
          >
            {solutionBuilderActive
              ? 'Select services to build your custom solution'
              : 'Explore our interconnected services and capabilities'
            }
          </p>
        </div>
      </div>

      {/* Deep dive panel */}
      {renderDeepDivePanel()}

      <style>
        {`
          @keyframes backgroundFlow {
            0% { transform: translateX(-100px) translateY(-100px) rotate(0deg); }
            100% { transform: translateX(100px) translateY(100px) rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};