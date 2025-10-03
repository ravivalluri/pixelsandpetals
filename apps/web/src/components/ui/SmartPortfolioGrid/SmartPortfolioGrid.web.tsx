import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius } from '..';
import { Button } from '../Button/Button.web';

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageSource?: { uri: string } | string;
  client?: string;
  industry?: string;
  result?: string;
  metrics?: Array<{
    label: string;
    value: string;
    icon?: string;
  }>;
  tags?: string[];
  onPress?: () => void;
}

export interface SmartPortfolioGridProps {
  projects: PortfolioProject[];
  columns?: number;
  style?: React.CSSProperties;
  onProjectClick?: (project: PortfolioProject) => void;
}

export const SmartPortfolioGrid: React.FC<SmartPortfolioGridProps> = ({
  projects,
  columns = 3,
  style,
  onProjectClick,
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${300}px, 1fr))`,
    gap: spacing[6],
    padding: spacing[4],
    ...style,
  };

  const getProjectCardStyles = (project: PortfolioProject): React.CSSProperties => {
    const isHovered = hoveredProject === project.id;

    return {
      position: 'relative',
      backgroundColor: colors.background,
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      boxShadow: isHovered
        ? `0 20px 40px ${colors.darkGray}20, 0 0 0 2px ${colors.accentPop}`
        : `0 4px 20px ${colors.darkGray}10`,
    };
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  };

  const getImageHoverStyles = (project: PortfolioProject): React.CSSProperties => {
    const isHovered = hoveredProject === project.id;
    return {
      ...imageStyles,
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    };
  };

  const contentStyles: React.CSSProperties = {
    padding: spacing[5],
  };

  const titleStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    marginBottom: spacing[2],
    lineHeight: typography.lineHeights.tight,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.sm,
    color: colors.mediumGray,
    lineHeight: typography.lineHeights.relaxed,
    marginBottom: spacing[4],
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const getOverlayStyles = (project: PortfolioProject): React.CSSProperties => {
    const isHovered = hoveredProject === project.id;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, ${colors.background}F5 0%, ${colors.accentPop}20 100%)`,
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[6],
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: isHovered ? 'auto' : 'none',
    };
  };

  const contextualInfoStyles: React.CSSProperties = {
    backgroundColor: `${colors.background}F8`,
    borderRadius: borderRadius.md,
    padding: spacing[4],
    border: `2px solid ${colors.accentPop}`,
    textAlign: 'center',
    maxWidth: '90%',
  };

  const quickStatsStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: spacing[4],
    flexWrap: 'wrap',
    gap: spacing[2],
  };

  const statItemStyles: React.CSSProperties = {
    textAlign: 'center',
    minWidth: '60px',
  };

  const statLabelStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.xs,
    color: colors.mediumGray,
    fontWeight: typography.fontWeights.medium,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const statValueStyles: React.CSSProperties = {
    fontSize: typography.fontSizes.sm,
    color: colors.accentPop,
    fontWeight: typography.fontWeights.bold,
    marginTop: spacing[1],
  };

  const tagsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
    marginTop: spacing[3],
  };

  const tagStyles: React.CSSProperties = {
    backgroundColor: `${colors.accentPop}15`,
    color: colors.accentPop,
    fontSize: typography.fontSizes.xs,
    padding: `${spacing[1]}px ${spacing[2]}px`,
    borderRadius: borderRadius.sm,
    fontWeight: typography.fontWeights.medium,
  };

  const handleProjectClick = (project: PortfolioProject) => {
    if (project.onPress) {
      project.onPress();
    }
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  return (
    <div style={gridStyles}>
      {projects.map((project) => (
        <div
          key={project.id}
          style={getProjectCardStyles(project)}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          onClick={() => handleProjectClick(project)}
        >
          {/* Project Image */}
          {project.imageSource && (
            <div style={{ overflow: 'hidden' }}>
              <img
                src={typeof project.imageSource === 'string' ? project.imageSource : project.imageSource.uri}
                alt={project.title}
                style={getImageHoverStyles(project)}
              />
            </div>
          )}

          {/* Content */}
          <div style={contentStyles}>
            <h3 style={titleStyles}>
              {project.title}
            </h3>

            <p style={descriptionStyles}>
              {project.description}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div style={tagsContainerStyles}>
                {project.tags.map((tag, index) => (
                  <span key={index} style={tagStyles}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Contextual Preview Overlay */}
          <div style={getOverlayStyles(project)}>
            <div style={contextualInfoStyles}>
              {/* Quick Stats */}
              {project.metrics && project.metrics.length > 0 && (
                <div style={quickStatsStyles}>
                  {project.metrics.map((metric, index) => (
                    <div key={index} style={statItemStyles}>
                      <div style={statLabelStyles}>
                        {metric.icon && <span style={{ marginRight: '2px' }}>{metric.icon}</span>}
                        {metric.label}
                      </div>
                      <div style={statValueStyles}>
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Details */}
              {(project.client || project.industry || project.result) && (
                <div style={{ marginBottom: spacing[4] }}>
                  {project.client && (
                    <div style={{ marginBottom: spacing[1] }}>
                      <span style={{ fontSize: typography.fontSizes.xs, color: colors.mediumGray }}>Client: </span>
                      <span style={{ fontSize: typography.fontSizes.sm, color: colors.coreDark, fontWeight: typography.fontWeights.medium }}>
                        {project.client}
                      </span>
                    </div>
                  )}

                  {project.industry && (
                    <div style={{ marginBottom: spacing[1] }}>
                      <span style={{ fontSize: typography.fontSizes.xs, color: colors.mediumGray }}>Industry: </span>
                      <span style={{ fontSize: typography.fontSizes.sm, color: colors.coreDark }}>
                        {project.industry}
                      </span>
                    </div>
                  )}

                  {project.result && (
                    <div style={{ marginBottom: spacing[2] }}>
                      <span style={{ fontSize: typography.fontSizes.xs, color: colors.mediumGray }}>Result: </span>
                      <span style={{ fontSize: typography.fontSizes.sm, color: colors.accentPop, fontWeight: typography.fontWeights.semibold }}>
                        📈 {project.result}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <Button
                title="View Details"
                onPress={() => handleProjectClick(project)}
                size="sm"
                style={{ minWidth: 120 }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};