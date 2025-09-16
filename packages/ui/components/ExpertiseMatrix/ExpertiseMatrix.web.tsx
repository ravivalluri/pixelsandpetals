import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../tokens';

export interface InsightShard {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ExpertiseNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  valueProp: string;
  methodologies: string[];
  technologies: string[];
  proficiencyLevel: number; // 0-100
  insights: InsightShard[];
  connections: string[]; // IDs of connected expertise
  caseStudies?: string[];
  certifications?: string[];
}

export interface ExpertiseMatrixProps {
  expertiseAreas: ExpertiseNode[];
  onExpertiseClick?: (expertise: ExpertiseNode) => void;
  onCompareExpertise?: (selectedNodes: ExpertiseNode[]) => void;
  style?: React.CSSProperties;
}

export const ExpertiseMatrix: React.FC<ExpertiseMatrixProps> = ({
  expertiseAreas,
  onExpertiseClick,
  onCompareExpertise,
  style,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<ExpertiseNode | null>(null);
  const [spotlightExpertise, setSpotlightExpertise] = useState<ExpertiseNode | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for neural network effects
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

  // Generate deterministic node positions for matrix layout
  const nodePositions = React.useMemo(() => {
    return expertiseAreas.map((_, index) => {
      const seed = index * 41 + 283;
      const pseudo1 = (seed * 9301 + 49297) % 233280 / 233280;
      const pseudo2 = ((seed + 13) * 9301 + 49297) % 233280 / 233280;

      // Create strategic matrix positioning
      const cols = Math.ceil(Math.sqrt(expertiseAreas.length));
      const row = Math.floor(index / cols);
      const col = index % cols;

      // Add organic variation to grid
      const baseX = (col / (cols - 1)) * 80 + 10;
      const baseY = (row / Math.ceil(expertiseAreas.length / cols)) * 70 + 15;

      return {
        x: Math.max(5, Math.min(95, baseX + (pseudo1 - 0.5) * 15)),
        y: Math.max(5, Math.min(95, baseY + (pseudo2 - 0.5) * 15)),
        size: 80 + pseudo1 * 40, // Varied node sizes
        intensity: 0.6 + pseudo2 * 0.4, // Varied glow intensity
      };
    });
  }, [expertiseAreas.length]);

  const handleNodeClick = (expertise: ExpertiseNode) => {
    if (compareMode) {
      const newSelected = new Set(selectedForComparison);
      if (newSelected.has(expertise.id)) {
        newSelected.delete(expertise.id);
      } else if (newSelected.size < 3) {
        newSelected.add(expertise.id);
      }
      setSelectedForComparison(newSelected);

      if (newSelected.size >= 2 && onCompareExpertise) {
        const selectedExpertise = expertiseAreas.filter(e => newSelected.has(e.id));
        onCompareExpertise(selectedExpertise);
      }
    } else {
      setSelectedNode(expertise);
      onExpertiseClick?.(expertise);
    }
  };

  const getConnectedNodes = (nodeId: string) => {
    const node = expertiseAreas.find(e => e.id === nodeId);
    return node?.connections || [];
  };

  const renderNeuralNetworkBackground = () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 25% 25%, rgba(102, 153, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(153, 102, 204, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(217, 232, 245, 0.03) 0%, transparent 60%)
        `,
        animation: 'neuralPulse 20s ease-in-out infinite',
      }}
    >
      {/* Neural network grid */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
        }}
      >
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.1 }} />
            <stop offset="50%" style={{ stopColor: colors.secondaryAccent, stopOpacity: 0.05 }} />
            <stop offset="100%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <line
              x1={`${i * 20}%`}
              y1="0%"
              x2={`${i * 20}%`}
              y2="100%"
              stroke="url(#neuralGradient)"
              strokeWidth="0.5"
              style={{ animation: `neuralFlow 15s ease-in-out infinite ${i * 0.5}s` }}
            />
            <line
              x1="0%"
              y1={`${i * 20}%`}
              x2="100%"
              y2={`${i * 20}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="0.5"
              style={{ animation: `neuralFlow 15s ease-in-out infinite ${i * 0.7}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );

  const renderKnowledgeConduits = () => {
    if (!hoveredNode && !selectedNode) return null;

    const activeNodeId = hoveredNode || selectedNode?.id;
    if (!activeNodeId) return null;

    const activeIndex = expertiseAreas.findIndex(e => e.id === activeNodeId);
    const connectedIds = getConnectedNodes(activeNodeId);

    return connectedIds.map(connectedId => {
      const connectedIndex = expertiseAreas.findIndex(e => e.id === connectedId);
      if (connectedIndex === -1) return null;

      const start = nodePositions[activeIndex];
      const end = nodePositions[connectedIndex];

      return (
        <svg
          key={`${activeNodeId}-${connectedId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          <defs>
            <linearGradient id={`conduitGradient-${activeNodeId}-${connectedId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: colors.secondaryAccent, stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path
            d={`M ${start.x}% ${start.y}% Q ${(start.x + end.x) / 2}% ${(start.y + end.y) / 2 - 5}% ${end.x}% ${end.y}%`}
            stroke={`url(#conduitGradient-${activeNodeId}-${connectedId})`}
            strokeWidth="2"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(102, 153, 255, 0.4))',
              animation: 'conduitPulse 3s ease-in-out infinite',
            }}
          />
          {/* Knowledge flow particles */}
          <circle
            cx={`${start.x}%`}
            cy={`${start.y}%`}
            r="3"
            fill={colors.primaryAccent}
            style={{
              animation: `knowledgeFlow-${activeNodeId}-${connectedId} 4s linear infinite`,
            }}
          />
        </svg>
      );
    });
  };

  const renderExpertiseNodes = () => {
    return expertiseAreas.map((expertise, index) => {
      const position = nodePositions[index];
      const isHovered = hoveredNode === expertise.id;
      const isSelected = selectedNode?.id === expertise.id;
      const isSelectedForComparison = selectedForComparison.has(expertise.id);

      const nodeStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${position.size * (isHovered ? 1.2 : 1)}px`,
        height: `${position.size * (isHovered ? 1.2 : 1)}px`,
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 30% 30%,
            rgba(240, 248, 255, ${position.intensity}) 0%,
            rgba(102, 153, 255, ${0.4 * position.intensity}) 50%,
            rgba(153, 102, 204, ${0.3 * position.intensity}) 100%
          )
        `,
        backdropFilter: 'blur(15px) saturate(150%)',
        border: `2px solid ${
          isSelectedForComparison
            ? colors.secondaryAccent
            : isSelected || isHovered
              ? colors.primaryAccent
              : 'rgba(102, 153, 255, 0.3)'
        }`,
        boxShadow: `
          0 0 ${isHovered ? '30px' : '15px'} rgba(102, 153, 255, ${isHovered ? 0.6 : 0.3}),
          inset 0 0 ${isHovered ? '15px' : '8px'} rgba(255, 255, 255, 0.2)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `translate(-50%, -50%) scale(${isHovered || isSelected ? 1.1 : 1})`,
        zIndex: isHovered || isSelected ? 20 : 15,
        animation: `nodeGlow 6s ease-in-out infinite ${index * 0.5}s`,
        textAlign: 'center',
        padding: '12px',
      };

      return (
        <div key={expertise.id}>
          <div
            style={nodeStyle}
            onMouseEnter={() => setHoveredNode(expertise.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => handleNodeClick(expertise)}
          >
            <div
              style={{
                fontSize: '24px',
                marginBottom: '4px',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              {expertise.icon}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: colors.textDark,
                lineHeight: 1.2,
                textAlign: 'center',
                maxWidth: '80px',
              }}
            >
              {expertise.title}
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
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid rgba(102, 153, 255, 0.3)`,
                borderRadius: '12px',
                padding: '12px 16px',
                maxWidth: '220px',
                zIndex: 25,
                fontSize: '12px',
                color: colors.textDark,
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(102, 153, 255, 0.2)',
                animation: 'nodeTooltip 0.3s ease-out',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{expertise.title}</div>
              <div style={{ color: colors.textSubtle, fontSize: '11px' }}>
                {expertise.valueProp}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const renderKnowledgeCascade = () => {
    if (!selectedNode) return null;

    const nodeIndex = expertiseAreas.findIndex(e => e.id === selectedNode.id);
    const position = nodePositions[nodeIndex];

    return (
      <div
        style={{
          position: 'absolute',
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 30,
          animation: 'cascadeAppear 0.5s ease-out',
        }}
      >
        {selectedNode.insights.map((insight, index) => {
          const angle = (index * 2 * Math.PI) / selectedNode.insights.length;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={insight.id}
              style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '60px',
                background: `
                  linear-gradient(135deg,
                    rgba(240, 248, 255, 0.9) 0%,
                    rgba(217, 232, 245, 0.8) 100%
                  )
                `,
                backdropFilter: 'blur(15px) saturate(150%)',
                border: `1px solid rgba(102, 153, 255, 0.4)`,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 600,
                color: colors.textDark,
                textAlign: 'center',
                padding: '6px',
                boxShadow: '0 4px 16px rgba(102, 153, 255, 0.15)',
                animation: `shardFloat 4s ease-in-out infinite ${index * 0.3}s`,
                transition: 'all 0.3s ease',
              }}
              onClick={() => setSpotlightExpertise(selectedNode)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 153, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(102, 153, 255, 0.15)';
              }}
            >
              {insight.icon && (
                <div style={{ fontSize: '14px', marginBottom: '2px' }}>
                  {insight.icon}
                </div>
              )}
              <div>{insight.title}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderComparisonVisualizer = () => {
    if (!compareMode || selectedForComparison.size < 2) return null;

    const selectedExpertise = expertiseAreas.filter(e => selectedForComparison.has(e.id));

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
          backdropFilter: 'blur(25px) saturate(180%)',
          border: `2px solid ${colors.primaryAccent}`,
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '500px',
          zIndex: 35,
          textAlign: 'center',
          boxShadow: '0 12px 32px rgba(102, 153, 255, 0.3)',
          animation: 'comparisonSlideIn 0.5s ease-out',
        }}
      >
        <h3 style={{ color: colors.textDark, marginBottom: '16px', fontSize: '18px' }}>
          Expertise Synergy Analysis
        </h3>
        <div style={{ marginBottom: '16px' }}>
          {selectedExpertise.map((exp, index) => (
            <span
              key={exp.id}
              style={{
                display: 'inline-block',
                background: colors.primaryAccent,
                color: colors.pureWhite,
                borderRadius: '6px',
                padding: '4px 8px',
                margin: '2px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              {exp.title}
            </span>
          ))}
        </div>
        <p style={{ color: colors.textSubtle, fontSize: '14px', lineHeight: 1.4, marginBottom: '16px' }}>
          This powerful combination creates synergistic solutions by leveraging{' '}
          {selectedExpertise.map(e => e.title.toLowerCase()).join(' + ')} for maximum innovation impact.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button
            style={{
              background: colors.primaryAccent,
              color: colors.pureWhite,
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            Explore This Combination
          </button>
          <button
            style={{
              background: 'transparent',
              color: colors.textSubtle,
              border: `1px solid ${colors.textSubtle}`,
              borderRadius: '8px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
            onClick={() => {
              setCompareMode(false);
              setSelectedForComparison(new Set());
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  };

  const renderExpertiseSpotlight = () => {
    if (!spotlightExpertise) return null;

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spotlightOpen 0.6s ease-out',
        }}
        onClick={() => setSpotlightExpertise(null)}
      >
        <div
          style={{
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            background: `
              linear-gradient(135deg,
                rgba(240, 248, 255, 0.98) 0%,
                rgba(217, 232, 245, 0.95) 100%
              )
            `,
            backdropFilter: 'blur(30px) saturate(180%)',
            border: `2px solid rgba(102, 153, 255, 0.3)`,
            borderRadius: '20px',
            padding: '32px',
            overflowY: 'auto',
            animation: 'spotlightExpand 0.6s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: colors.textSubtle,
              padding: '8px',
            }}
            onClick={() => setSpotlightExpertise(null)}
          >
            ×
          </button>

          {/* Expertise header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '32px' }}>{spotlightExpertise.icon}</span>
              <h1 style={{
                color: colors.textDark,
                fontSize: '28px',
                fontWeight: 'bold',
                margin: 0,
              }}>
                {spotlightExpertise.title}
              </h1>
            </div>
            <p style={{
              color: colors.textSubtle,
              fontSize: '16px',
              lineHeight: 1.5,
              margin: 0,
            }}>
              {spotlightExpertise.description}
            </p>
          </div>

          {/* Proficiency visualization */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Expertise Level
            </h3>
            <div style={{
              background: 'rgba(102, 153, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div
                style={{
                  width: `${spotlightExpertise.proficiencyLevel}%`,
                  height: '8px',
                  background: `linear-gradient(90deg, ${colors.primaryAccent} 0%, ${colors.secondaryAccent} 100%)`,
                  borderRadius: '4px',
                  animation: 'liquidFill 2s ease-out',
                }}
              />
              <div style={{
                marginTop: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: colors.primaryAccent,
              }}>
                {spotlightExpertise.proficiencyLevel}% Proficiency
              </div>
            </div>
          </div>

          {/* Methodologies */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Methodologies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {spotlightExpertise.methodologies.map(method => (
                <span
                  key={method}
                  style={{
                    background: colors.primaryAccent,
                    color: colors.pureWhite,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Key Technologies
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {spotlightExpertise.technologies.map(tech => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(153, 102, 204, 0.1)',
                    color: colors.secondaryAccent,
                    border: `1px solid rgba(153, 102, 204, 0.3)`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
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
            Consult Our Experts on This
          </button>
        </div>
      </div>
    );
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '700px',
    background: `
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
          @keyframes neuralPulse {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          @keyframes neuralFlow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
          @keyframes nodeGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.1); }
          }
          @keyframes conduitPulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes nodeTooltip {
            from { opacity: 0; transform: translate(-50%, -90%); }
            to { opacity: 1; transform: translate(-50%, -100%); }
          }
          @keyframes cascadeAppear {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
          @keyframes shardFloat {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
            50% { transform: translate(-50%, -50%) translateY(-5px); }
          }
          @keyframes comparisonSlideIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
          @keyframes spotlightOpen {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(8px); }
          }
          @keyframes spotlightExpand {
            from { transform: scale(0.8) rotate(5deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes liquidFill {
            from { width: 0%; }
            to { width: ${spotlightExpertise?.proficiencyLevel || 0}%; }
          }
        `}
      </style>

      <div ref={containerRef} style={containerStyles}>
        {/* Neural network background */}
        {renderNeuralNetworkBackground()}

        {/* Knowledge conduits */}
        {renderKnowledgeConduits()}

        {/* Expertise nodes */}
        {renderExpertiseNodes()}

        {/* Knowledge cascade */}
        {renderKnowledgeCascade()}

        {/* Comparison visualizer */}
        {renderComparisonVisualizer()}

        {/* Controls */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            gap: '12px',
            zIndex: 25,
          }}
        >
          <button
            style={{
              background: compareMode ? colors.secondaryAccent : colors.primaryAccent,
              color: colors.pureWhite,
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(102, 153, 255, 0.3)',
            }}
            onClick={() => {
              setCompareMode(!compareMode);
              setSelectedForComparison(new Set());
              setSelectedNode(null);
            }}
          >
            {compareMode ? 'Exit Compare' : '🔬 Compare Expertise'}
          </button>
        </div>

        {/* Title */}
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
            Expertise Matrix
          </h2>
          <p
            style={{
              color: colors.textSubtle,
              fontSize: '14px',
              maxWidth: '300px',
            }}
          >
            {compareMode
              ? 'Select expertise nodes to analyze their synergistic potential'
              : 'Explore our interconnected network of technical capabilities'
            }
          </p>
        </div>

        {/* Instructions */}
        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(240, 248, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '12px',
              color: colors.textDark,
              zIndex: 10,
            }}
          >
            Click insight shards to dive deeper • Click outside to close cascade
          </div>
        )}
      </div>

      {/* Expertise spotlight */}
      {renderExpertiseSpotlight()}
    </>
  );
};