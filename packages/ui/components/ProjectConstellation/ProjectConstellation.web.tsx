import React, { useState, useRef, useEffect } from 'react';
import { colors } from '../../tokens';

export interface ProjectStar {
  id: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  impactMetric: {
    label: string;
    value: string;
    icon: string;
  };
  description: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  imageUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  technologies: string[];
  connections: string[]; // IDs of connected projects
}

export interface FilterOptions {
  services: string[];
  industries: string[];
  metrics: string[];
}

export interface ProjectConstellationProps {
  projects: ProjectStar[];
  onProjectClick?: (project: ProjectStar) => void;
  onFilterChange?: (filters: any) => void;
  style?: React.CSSProperties;
}

export const ProjectConstellation: React.FC<ProjectConstellationProps> = ({
  projects,
  onProjectClick,
  onFilterChange,
  style,
}) => {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    services: [] as string[],
    industries: [] as string[],
    metrics: [] as string[],
  });
  const [deepDiveProject, setDeepDiveProject] = useState<ProjectStar | null>(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for gravitational effects
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

  // Generate deterministic star positions with organic distribution
  const starPositions = React.useMemo(() => {
    return projects.map((_, index) => {
      const seed = index * 23 + 157;
      const pseudo1 = (seed * 9301 + 49297) % 233280 / 233280;
      const pseudo2 = ((seed + 7) * 9301 + 49297) % 233280 / 233280;

      // Create more organic, galaxy-like distribution
      const angle = pseudo1 * 2 * Math.PI;
      const radius = 20 + pseudo2 * 60; // Varied distances from center
      const centerX = 50;
      const centerY = 50;

      return {
        x: Math.max(10, Math.min(90, centerX + Math.cos(angle) * radius / 100 * 80)),
        y: Math.max(10, Math.min(90, centerY + Math.sin(angle) * radius / 100 * 80)),
        size: 12 + pseudo1 * 8, // Varied star sizes
        brightness: 0.6 + pseudo2 * 0.4, // Varied brightness
      };
    });
  }, [projects.length]);

  // Filter projects based on selected filters
  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const serviceMatch = selectedFilters.services.length === 0 ||
        selectedFilters.services.some(service => project.services.includes(service));
      const industryMatch = selectedFilters.industries.length === 0 ||
        selectedFilters.industries.includes(project.industry);
      return serviceMatch && industryMatch;
    });
  }, [projects, selectedFilters]);

  // Get all unique filter options
  const filterOptions = React.useMemo(() => {
    const services = [...new Set(projects.flatMap(p => p.services))];
    const industries = [...new Set(projects.map(p => p.industry))];
    const metrics = [...new Set(projects.map(p => p.impactMetric.label))];
    return { services, industries, metrics };
  }, [projects]);

  const handleFilterToggle = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

      const newFilters = { ...prev, [category]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const getConnectedProjects = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.connections || [];
  };

  const renderNebulaBackground = () => (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, rgba(102, 153, 255, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(153, 102, 204, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 40% 60%, rgba(217, 232, 245, 0.05) 0%, transparent 50%)
        `,
        animation: 'nebulaFloat 30s ease-in-out infinite',
      }}
    />
  );

  const renderImpactLines = () => {
    if (!hoveredStar) return null;

    const hoveredIndex = projects.findIndex(p => p.id === hoveredStar);
    const connectedIds = getConnectedProjects(hoveredStar);

    return connectedIds.map(connectedId => {
      const connectedIndex = projects.findIndex(p => p.id === connectedId);
      if (connectedIndex === -1 || !filteredProjects.find(p => p.id === connectedId)) return null;

      const start = starPositions[hoveredIndex];
      const end = starPositions[connectedIndex];

      return (
        <svg
          key={`${hoveredStar}-${connectedId}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <defs>
            <linearGradient id={`impactGradient-${hoveredStar}-${connectedId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: colors.secondaryAccent, stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: colors.primaryAccent, stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          <path
            d={`M ${start.x}% ${start.y}% Q ${(start.x + end.x) / 2}% ${(start.y + end.y) / 2 - 3}% ${end.x}% ${end.y}%`}
            stroke={`url(#impactGradient-${hoveredStar}-${connectedId})`}
            strokeWidth="1.5"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(102, 153, 255, 0.5))',
              animation: 'impactPulse 2.5s ease-in-out infinite',
            }}
          />
          {/* Impact particles flowing along the line */}
          <circle
            cx={`${start.x}%`}
            cy={`${start.y}%`}
            r="2"
            fill={colors.primaryAccent}
            style={{
              animation: `impactFlow-${hoveredStar}-${connectedId} 4s linear infinite`,
            }}
          />
        </svg>
      );
    });
  };

  const renderProjectStars = () => {
    return projects.map((project, index) => {
      const position = starPositions[index];
      const isHovered = hoveredStar === project.id;
      const isFiltered = filteredProjects.find(p => p.id === project.id);
      const opacity = isFiltered ? 1 : 0.3;

      const starStyle: React.CSSProperties = {
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${position.size * (isHovered ? 1.5 : 1)}px`,
        height: `${position.size * (isHovered ? 1.5 : 1)}px`,
        borderRadius: '50%',
        background: `
          radial-gradient(circle at 30% 30%,
            rgba(240, 248, 255, ${position.brightness * opacity}) 0%,
            rgba(102, 153, 255, ${0.6 * opacity}) 50%,
            rgba(153, 102, 204, ${0.4 * opacity}) 100%
          )
        `,
        boxShadow: `
          0 0 ${isHovered ? '20px' : '10px'} rgba(102, 153, 255, ${0.6 * opacity}),
          inset 0 0 ${isHovered ? '8px' : '4px'} rgba(255, 255, 255, ${0.3 * opacity})
        `,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.2 : 1})`,
        zIndex: isHovered ? 15 : 10,
        animation: `starPulse 4s ease-in-out infinite ${index * 0.3}s`,
        opacity: opacity,
      };

      return (
        <div key={project.id}>
          <div
            style={starStyle}
            onMouseEnter={() => setHoveredStar(project.id)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => {
              setDeepDiveProject(project);
              onProjectClick?.(project);
            }}
          />

          {/* Hover tooltip */}
          {isHovered && (
            <div
              style={{
                position: 'absolute',
                left: `${position.x}%`,
                top: `${position.y - 8}%`,
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
                maxWidth: '250px',
                zIndex: 20,
                fontSize: '12px',
                color: colors.textDark,
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(102, 153, 255, 0.2)',
                animation: 'tooltipAppear 0.3s ease-out',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{project.title}</div>
              <div style={{ color: colors.textSubtle, fontSize: '11px', marginBottom: '6px' }}>
                Client: {project.client}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                color: colors.primaryAccent,
                fontWeight: 600,
              }}>
                <span>{project.impactMetric.icon}</span>
                <span>{project.impactMetric.value} {project.impactMetric.label}</span>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const renderGalaxyFilter = () => (
    <div
      style={{
        position: 'absolute',
        right: filterPanelOpen ? '0' : '-320px',
        top: '20px',
        width: '300px',
        height: 'calc(100% - 40px)',
        background: `
          linear-gradient(135deg,
            rgba(240, 248, 255, 0.95) 0%,
            rgba(217, 232, 245, 0.9) 100%
          )
        `,
        backdropFilter: 'blur(25px) saturate(180%)',
        border: `1px solid rgba(102, 153, 255, 0.3)`,
        borderRadius: '16px 0 0 16px',
        padding: '24px',
        overflowY: 'auto',
        zIndex: 30,
        transition: 'right 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '-4px 0 24px rgba(102, 153, 255, 0.1)',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          color: colors.textDark,
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          🌌 Galaxy Filter
        </h3>

        {/* Services Filter */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: colors.textDark, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            Services
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {filterOptions.services.map(service => (
              <button
                key={service}
                style={{
                  background: selectedFilters.services.includes(service)
                    ? colors.primaryAccent
                    : 'rgba(102, 153, 255, 0.1)',
                  color: selectedFilters.services.includes(service)
                    ? colors.pureWhite
                    : colors.textDark,
                  border: `1px solid ${selectedFilters.services.includes(service)
                    ? colors.primaryAccent
                    : 'rgba(102, 153, 255, 0.3)'}`,
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleFilterToggle('services', service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Industries Filter */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: colors.textDark, fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            Industries
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {filterOptions.industries.map(industry => (
              <button
                key={industry}
                style={{
                  background: selectedFilters.industries.includes(industry)
                    ? colors.secondaryAccent
                    : 'rgba(153, 102, 204, 0.1)',
                  color: selectedFilters.industries.includes(industry)
                    ? colors.pureWhite
                    : colors.textDark,
                  border: `1px solid ${selectedFilters.industries.includes(industry)
                    ? colors.secondaryAccent
                    : 'rgba(153, 102, 204, 0.3)'}`,
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleFilterToggle('industries', industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          style={{
            background: 'transparent',
            color: colors.textSubtle,
            border: `1px solid ${colors.textSubtle}`,
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '12px',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.3s ease',
          }}
          onClick={() => {
            setSelectedFilters({ services: [], industries: [], metrics: [] });
            onFilterChange?.({ services: [], industries: [], metrics: [] });
          }}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  const renderProjectPortal = () => {
    if (!deepDiveProject) return null;

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
          animation: 'portalOpen 0.6s ease-out',
        }}
        onClick={() => setDeepDiveProject(null)}
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
            animation: 'portalExpand 0.6s ease-out',
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
            onClick={() => setDeepDiveProject(null)}
          >
            ×
          </button>

          {/* Project header */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              color: colors.textDark,
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              {deepDiveProject.title}
            </h1>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{ color: colors.textSubtle }}>Client: {deepDiveProject.client}</span>
              <span style={{ color: colors.textSubtle }}>Industry: {deepDiveProject.industry}</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(102, 153, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '18px',
              fontWeight: 600,
              color: colors.primaryAccent,
            }}>
              <span>{deepDiveProject.impactMetric.icon}</span>
              <span>{deepDiveProject.impactMetric.value} {deepDiveProject.impactMetric.label}</span>
            </div>
          </div>

          {/* Project description */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{
              color: colors.textDark,
              fontSize: '16px',
              lineHeight: 1.6
            }}>
              {deepDiveProject.description}
            </p>
          </div>

          {/* Services used */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Services Delivered
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {deepDiveProject.services.map(service => (
                <span
                  key={service}
                  style={{
                    background: colors.primaryAccent,
                    color: colors.pureWhite,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: colors.textDark, fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
              Technologies Used
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {deepDiveProject.technologies.map(tech => (
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

          {/* Testimonial */}
          {deepDiveProject.testimonial && (
            <div style={{
              background: 'rgba(102, 153, 255, 0.05)',
              borderLeft: `4px solid ${colors.primaryAccent}`,
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
            }}>
              <p style={{
                color: colors.textDark,
                fontSize: '14px',
                fontStyle: 'italic',
                marginBottom: '8px',
              }}>
                "{deepDiveProject.testimonial.quote}"
              </p>
              <div style={{ color: colors.textSubtle, fontSize: '12px' }}>
                — {deepDiveProject.testimonial.author}, {deepDiveProject.testimonial.role}
              </div>
            </div>
          )}

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
            Start Your Project Journey
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
          @keyframes nebulaFloat {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0.6; }
            25% { transform: translateX(20px) translateY(-10px) rotate(90deg); opacity: 0.8; }
            50% { transform: translateX(-10px) translateY(20px) rotate(180deg); opacity: 1; }
            75% { transform: translateX(-20px) translateY(-15px) rotate(270deg); opacity: 0.7; }
          }
          @keyframes starPulse {
            0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
          }
          @keyframes impactPulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes tooltipAppear {
            from { opacity: 0; transform: translate(-50%, -90%); }
            to { opacity: 1; transform: translate(-50%, -100%); }
          }
          @keyframes portalOpen {
            from { opacity: 0; backdrop-filter: blur(0px); }
            to { opacity: 1; backdrop-filter: blur(8px); }
          }
          @keyframes portalExpand {
            from { transform: scale(0.8) rotate(5deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}
      </style>

      <div ref={containerRef} style={containerStyles}>
        {/* Nebula background */}
        {renderNebulaBackground()}

        {/* Impact lines */}
        {renderImpactLines()}

        {/* Project stars */}
        {renderProjectStars()}

        {/* Galaxy filter panel */}
        {renderGalaxyFilter()}

        {/* Filter toggle button */}
        <button
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: colors.primaryAccent,
            color: colors.pureWhite,
            border: 'none',
            borderRadius: '12px',
            padding: '12px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            zIndex: 25,
            boxShadow: '0 4px 16px rgba(102, 153, 255, 0.3)',
          }}
          onClick={() => setFilterPanelOpen(!filterPanelOpen)}
        >
          🌌 {filterPanelOpen ? 'Close' : 'Filter'} Galaxy
        </button>

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
            Project Constellation
          </h2>
          <p
            style={{
              color: colors.textSubtle,
              fontSize: '14px',
              maxWidth: '300px',
            }}
          >
            Explore our galaxy of successful projects and their interconnected impact
          </p>
        </div>

        {/* Results counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            background: 'rgba(240, 248, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '12px',
            color: colors.textDark,
            zIndex: 10,
          }}
        >
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Project portal */}
      {renderProjectPortal()}
    </>
  );
};