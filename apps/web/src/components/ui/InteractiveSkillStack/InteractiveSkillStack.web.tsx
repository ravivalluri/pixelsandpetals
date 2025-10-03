import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, borderRadius } from '..';

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  description?: string;
  projectCount?: number;
  yearsExperience?: number;
  icon?: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
  icon?: string;
  color?: string;
}

export interface InteractiveSkillStackProps {
  categories: SkillCategory[];
  layout?: 'grid' | 'cloud' | 'progress-bars';
  style?: React.CSSProperties;
  onSkillClick?: (skill: Skill) => void;
}

export const InteractiveSkillStack: React.FC<InteractiveSkillStackProps> = ({
  categories,
  layout = 'grid',
  style,
  onSkillClick,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    // Animate progress bars on mount
    if (layout === 'progress-bars') {
      const timer = setTimeout(() => {
        const values: { [key: string]: number } = {};
        categories.forEach(category =>
          category.skills.forEach(skill => {
            values[skill.id] = skill.proficiency;
          })
        );
        setAnimatedValues(values);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [categories, layout]);

  const containerStyles: React.CSSProperties = {
    padding: spacing[6],
    ...style,
  };

  const renderGridLayout = () => {
    return (
      <div style={containerStyles}>
        {categories.map((category) => (
          <div key={category.id} style={{ marginBottom: spacing[8] }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: spacing[6],
              cursor: 'pointer',
            }}
            onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            >
              {category.icon && (
                <span style={{
                  fontSize: typography.fontSizes['2xl'],
                  marginRight: spacing[3]
                }}>
                  {category.icon}
                </span>
              )}
              <h3 style={{
                fontSize: typography.fontSizes.xl,
                fontWeight: typography.fontWeights.bold,
                color: colors.coreDark,
                margin: 0,
              }}>
                {category.name}
              </h3>
              <span style={{
                marginLeft: spacing[2],
                fontSize: typography.fontSizes.sm,
                color: colors.mediumGray,
                transform: activeCategory === category.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}>
                ▼
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: spacing[4],
              maxHeight: activeCategory === category.id || activeCategory === null ? 'none' : '0',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}>
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    backgroundColor: hoveredSkill === skill.id ? `${skill.color || colors.accentPop}15` : colors.background,
                    border: `2px solid ${hoveredSkill === skill.id ? (skill.color || colors.accentPop) : colors.lightGray}`,
                    borderRadius: borderRadius.lg,
                    padding: spacing[4],
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredSkill === skill.id ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: hoveredSkill === skill.id
                      ? `0 8px 32px ${skill.color || colors.accentPop}30`
                      : `0 2px 8px ${colors.darkGray}10`,
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => onSkillClick?.(skill)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: spacing[2],
                  }}>
                    {skill.icon && (
                      <span style={{
                        fontSize: typography.fontSizes.lg,
                        marginRight: spacing[2]
                      }}>
                        {skill.icon}
                      </span>
                    )}
                    <span style={{
                      fontSize: typography.fontSizes.base,
                      fontWeight: typography.fontWeights.semibold,
                      color: colors.coreDark,
                    }}>
                      {skill.name}
                    </span>
                  </div>

                  {/* Proficiency Bar */}
                  <div style={{
                    width: '100%',
                    height: 6,
                    backgroundColor: colors.lightGray,
                    borderRadius: 3,
                    marginBottom: spacing[2],
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${skill.proficiency}%`,
                      height: '100%',
                      backgroundColor: skill.color || colors.accentPop,
                      borderRadius: 3,
                      transition: 'width 1s ease-out',
                    }} />
                  </div>

                  {hoveredSkill === skill.id && (
                    <div style={{
                      fontSize: typography.fontSizes.sm,
                      color: colors.mediumGray,
                      lineHeight: typography.lineHeights.snug,
                      opacity: 1,
                      animation: 'fadeIn 0.3s ease-in-out',
                    }}>
                      {skill.description && <p style={{ margin: `${spacing[1]}px 0` }}>{skill.description}</p>}
                      {skill.yearsExperience && <p style={{ margin: `${spacing[1]}px 0` }}>Experience: {skill.yearsExperience} years</p>}
                      {skill.projectCount && <p style={{ margin: `${spacing[1]}px 0` }}>Projects: {skill.projectCount}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCloudLayout = () => {
    const allSkills = categories.flatMap(cat => cat.skills);

    return (
      <div style={{
        ...containerStyles,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing[3],
        minHeight: 400,
      }}>
        {allSkills.map((skill, index) => {
          const fontSize = Math.max(
            typography.fontSizes.sm,
            typography.fontSizes.base + (skill.proficiency / 100) * typography.fontSizes.lg
          );

          return (
            <div
              key={skill.id}
              style={{
                display: 'inline-block',
                fontSize,
                fontWeight: hoveredSkill === skill.id ? typography.fontWeights.bold : typography.fontWeights.medium,
                color: hoveredSkill === skill.id ? (skill.color || colors.accentPop) : colors.darkGray,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredSkill === skill.id ? 'scale(1.2)' : 'scale(1)',
                padding: spacing[2],
                borderRadius: borderRadius.md,
                backgroundColor: hoveredSkill === skill.id ? `${skill.color || colors.accentPop}10` : 'transparent',
                animation: `float 3s ease-in-out infinite ${index * 0.2}s`,
              }}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => onSkillClick?.(skill)}
              title={skill.description}
            >
              {skill.icon && <span style={{ marginRight: spacing[1] }}>{skill.icon}</span>}
              {skill.name}
            </div>
          );
        })}

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  };

  const renderProgressBarsLayout = () => {
    return (
      <div style={containerStyles}>
        {categories.map((category) => (
          <div key={category.id} style={{ marginBottom: spacing[8] }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: spacing[6],
            }}>
              {category.icon && (
                <span style={{
                  fontSize: typography.fontSizes['2xl'],
                  marginRight: spacing[3]
                }}>
                  {category.icon}
                </span>
              )}
              <h3 style={{
                fontSize: typography.fontSizes.xl,
                fontWeight: typography.fontWeights.bold,
                color: colors.coreDark,
                margin: 0,
              }}>
                {category.name}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    cursor: 'pointer',
                    padding: spacing[3],
                    borderRadius: borderRadius.md,
                    backgroundColor: hoveredSkill === skill.id ? `${skill.color || colors.accentPop}05` : 'transparent',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => onSkillClick?.(skill)}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing[2],
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      {skill.icon && (
                        <span style={{
                          fontSize: typography.fontSizes.base,
                          marginRight: spacing[2]
                        }}>
                          {skill.icon}
                        </span>
                      )}
                      <span style={{
                        fontSize: typography.fontSizes.base,
                        fontWeight: typography.fontWeights.medium,
                        color: colors.coreDark,
                      }}>
                        {skill.name}
                      </span>
                    </div>
                    <span style={{
                      fontSize: typography.fontSizes.sm,
                      color: skill.color || colors.accentPop,
                      fontWeight: typography.fontWeights.semibold,
                    }}>
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Animated Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: 12,
                    backgroundColor: colors.lightGray,
                    borderRadius: 6,
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div style={{
                      width: `${animatedValues[skill.id] || 0}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${skill.color || colors.accentPop}, ${skill.color || colors.accentPop}80)`,
                      borderRadius: 6,
                      transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Shimmer effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        animation: hoveredSkill === skill.id ? 'shimmer 1.5s infinite' : 'none',
                      }} />
                    </div>
                  </div>

                  {hoveredSkill === skill.id && skill.description && (
                    <div style={{
                      marginTop: spacing[2],
                      fontSize: typography.fontSizes.sm,
                      color: colors.mediumGray,
                      opacity: 1,
                      animation: 'fadeIn 0.3s ease-in-out',
                    }}>
                      {skill.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <style jsx>{`
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  };

  switch (layout) {
    case 'cloud':
      return renderCloudLayout();
    case 'progress-bars':
      return renderProgressBarsLayout();
    default:
      return renderGridLayout();
  }
};