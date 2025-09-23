"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './AboutSection/AboutSection.module.css';

// Interactive Tech Journey Component
const InteractiveTechJourney: React.FC = () => {
  const { theme, colors } = useTheme();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{left: number, top: number}>>([]);

  const techNodes = [
    { id: 1, label: "Frontend", tech: "React, Next.js", x: 20, y: 30, color: "#61DAFB" },
    { id: 2, label: "Backend", tech: "Node.js, Python", x: 80, y: 30, color: "#339933" },
    { id: 3, label: "Cloud", tech: "AWS, Azure", x: 50, y: 70, color: "#FF9900" },
    { id: 4, label: "Mobile", tech: "React Native", x: 20, y: 70, color: "#0088CC" },
    { id: 5, label: "DevOps", tech: "Docker, K8s", x: 80, y: 70, color: "#326CE5" },
    { id: 6, label: "Design", tech: "Figma, UX", x: 50, y: 30, color: "#F24E1E" },
  ];

  const connections = [
    { from: 1, to: 6 }, { from: 6, to: 2 }, { from: 1, to: 4 },
    { from: 2, to: 3 }, { from: 3, to: 5 }, { from: 4, to: 3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Initialize particle positions on client side only
  useEffect(() => {
    const positions = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <div
      className={styles.techJourney}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryAccent}15, ${colors.secondaryAccent}15)`,
        border: `1px solid ${colors.primaryAccent}20`,
      }}
    >
      {/* Animated Background Grid */}
      <div
        className={styles.techGrid}
        style={{
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(${colors.primaryAccent} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primaryAccent} 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          animation: "pulse 4s ease-in-out infinite",
        }}
      />

      {/* SVG for connections */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {connections.map((conn, index) => {
          const fromNode = techNodes.find(n => n.id === conn.from);
          const toNode = techNodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const isActive = index === animationPhase;

          return (
            <line
              key={`${conn.from}-${conn.to}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isActive ? colors.primaryAccent : colors.textSubtle}
              strokeWidth={isActive ? "3" : "1"}
              strokeOpacity={isActive ? 0.8 : 0.3}
              style={{
                transition: "all 0.5s ease",
                filter: isActive ? `drop-shadow(0 0 6px ${colors.primaryAccent})` : "none"
              }}
            />
          );
        })}
      </svg>

      {/* Tech Nodes */}
      {techNodes.map((node, index) => {
        const isHovered = hoveredNode === node.id;
        const isAnimated = index === animationPhase;

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              position: "absolute",
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isHovered ? 10 : 2,
            }}
          >
            {/* Node Circle */}
            <div
              style={{
                width: isHovered ? "80px" : isAnimated ? "70px" : "60px",
                height: isHovered ? "80px" : isAnimated ? "70px" : "60px",
                borderRadius: "50%",
                background: theme === 'dark'
                  ? `linear-gradient(135deg, ${node.color}40, ${colors.primaryAccent}20)`
                  : `linear-gradient(135deg, ${node.color}30, ${colors.primaryAccent}15)`,
                border: `2px solid ${isHovered || isAnimated ? node.color : colors.primaryAccent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isHovered || isAnimated
                  ? `0 8px 32px ${node.color}40, 0 0 20px ${node.color}30`
                  : `0 4px 16px ${colors.primaryAccent}20`,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  fontSize: isHovered ? "1rem" : "0.8rem",
                  fontWeight: "600",
                  color: isHovered || isAnimated ? node.color : colors.textPrimary,
                  transition: "all 0.3s ease",
                  textAlign: "center",
                }}
              >
                {node.label}
              </span>
            </div>

            {/* Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: theme === 'dark'
                    ? "rgba(42, 47, 62, 0.95)"
                    : "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${node.color}`,
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "0.8rem",
                  color: colors.textPrimary,
                  whiteSpace: "nowrap",
                  boxShadow: `0 4px 20px ${node.color}30`,
                  zIndex: 20,
                  animation: "fadeInUp 0.3s ease",
                }}
              >
                {node.tech}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `6px solid ${node.color}`,
                  }}
                />
              </div>
            )}

            {/* Pulse Animation */}
            {isAnimated && (
              <div
                style={{
                  position: "absolute",
                  inset: "-10px",
                  borderRadius: "50%",
                  border: `2px solid ${node.color}`,
                  opacity: 0.5,
                  animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
            )}
          </div>
        );
      })}

      {/* Floating Particles */}
      {particlePositions.map((position, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: colors.primaryAccent,
            left: `${position.left}%`,
            top: `${position.top}%`,
            opacity: 0.6,
            animation: `float${i % 3} ${3 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Title Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          color: colors.textSubtle,
          fontSize: "0.9rem",
          fontWeight: "500",
          opacity: hoveredNode ? 0.5 : 0.8,
          transition: "opacity 0.3s ease",
        }}
      >
        Our Tech Stack • Interactive Journey
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { theme, colors } = useTheme();

  const teamMembers = [
    {
      name: "Ravi Valluri",
      role: "Founder & CEO",
      bio: "15+ years in software architecture and product development",
      image: "/images/team/ravi.jpg",
      memoji: "👨🏽‍💻", // Male brown memoji
    },
    {
      name: "Maia Valluri",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 10+ years",
      image: "/images/team/maia.jpg",
      memoji: "👩🏻‍🎨", // Female white memoji for design
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We anticipate technology trends and leverage modern frameworks, cloud architectures, and best practices to deliver cutting-edge solutions.",
      color: "#FF6B6B", // Coral Red
      icon: "🚀"
    },
    {
      title: "Quality",
      description: "We uphold the highest standards in code integrity, performance, and user experience, ensuring reliable and maintainable software.",
      color: "#4ECDC4", // Teal
      icon: "✨"
    },
    {
      title: "Collaboration",
      description: "We achieve the best outcomes by partnering closely with clients, integrating feedback, and aligning technical solutions with business goals.",
      color: "#45B7D1", // Sky Blue
      icon: "🤝"
    },
    {
      title: "Sustainability",
      description: "We design systems that are scalable, maintainable, and future-proof, ensuring long-term value for every project.",
      color: "#96CEB4", // Mint Green
      icon: "🌱"
    }
  ];

  // Glass effect styles that adapt to theme
  const glassEnhanced = {
    background: theme === 'dark' 
      ? 'rgba(42, 47, 62, 0.3)' 
      : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.2)'
      : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: theme === 'dark'
      ? '0 12px 48px rgba(102, 153, 255, 0.25)'
      : '0 12px 48px rgba(31, 38, 135, 0.45)',
  };
  
  const glassSubtle = {
    background: theme === 'dark'
      ? 'rgba(42, 47, 62, 0.2)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: theme === 'dark'
      ? '0 4px 24px rgba(102, 153, 255, 0.15)'
      : '0 4px 24px rgba(31, 38, 135, 0.25)',
  };

  const typography = {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: colors.textPrimary,
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textPrimary,
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textSubtle,
    }
  };

  return (
    <section 
      id="about-section" 
      className={styles.section}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "80px 20px",
        transition: 'background 0.3s ease',
      }}
    >
      <div className={styles.container}>
        <h2
          className={styles.sectionHeading}
          style={{
            color: colors.textPrimary,
          }}
        >
          About Us
        </h2>
        <p 
          className={styles.subtitle}
          style={{
            ...typography.body,
            fontSize: "1.2rem",
            color: colors.textSubtle,
            marginTop: "16px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            textAlign: "center",
          }}
        >
          Engineering scalable software. Designing seamless digital experiences.
        </p>
        
        <div className={styles.contentGrid}>
          <div className={styles.storyContent}>
            <h3 
              className={styles.storyHeading}
              style={{
                ...typography.heading,
                fontSize: "1.8rem",
                fontWeight: 600,
                margin: "0 0 24px 0",
                color: colors.textPrimary,
              }}
            >
              Our Story
            </h3>
            <p 
              className={styles.storyParagraph}
              style={{
                ...typography.body,
                fontSize: "1.1rem",
                color: colors.textSubtle,
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Founded in 2018, Pixels & Petals started as a small team of developers and designers united by a vision: to build digital products that are both high-performing and elegantly designed.
            </p>
            <p 
              className={styles.storyParagraph}
              style={{
                ...typography.body,
                fontSize: "1.1rem",
                color: colors.textSubtle,
                lineHeight: 1.7,
                marginBottom: "24px",
              }}
            >
              Today, we’ve grown into a cross-functional team of engineers, architects, and UX specialists, delivering web and mobile applications, cloud-native architectures, and scalable platforms. We collaborate with startups and enterprises across industries, turning complex technical challenges into innovative, user-centered solutions.
            </p>
          </div>
          <div className={styles.storyImage}>
            <InteractiveTechJourney />
          </div>
        </div>
        
        <h3 
          className={styles.sectionHeading}
          style={{
            ...typography.heading,
            fontSize: "1.8rem",
            fontWeight: 600,
            margin: "64px 0 24px 0",
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          Our Values
        </h3>
        <div className={styles.valuesGrid}>
          {values.map((value, index) => {
            // Create custom glass effect with value's color
            const customGlassEnhanced = {
              background: theme === 'dark'
                ? `rgba(42, 47, 62, 0.3)`
                : `rgba(255, 255, 255, 0.12)`,
              backdropFilter: 'blur(16px) saturate(200%)',
              WebkitBackdropFilter: 'blur(16px) saturate(200%)',
              border: `1px solid ${value.color}40`,
              borderRadius: '20px',
              boxShadow: theme === 'dark'
                ? `0 12px 48px ${value.color}25`
                : `0 12px 48px ${value.color}35`,
              position: 'relative' as const,
              overflow: 'hidden' as const,
            };

            return (
              <div
                key={index}
                className={styles.valueCard}
                style={{
                  ...customGlassEnhanced,
                  borderRadius: "20px",
                  padding: "32px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? `0 16px 56px ${value.color}35`
                    : `0 16px 56px ${value.color}45`;
                  e.currentTarget.style.borderColor = `${value.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? `0 12px 48px ${value.color}25`
                    : `0 12px 48px ${value.color}35`;
                  e.currentTarget.style.borderColor = `${value.color}40`;
                }}
              >
                {/* Background gradient accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background: `linear-gradient(135deg, ${value.color}20, transparent)`,
                    borderRadius: "0 20px 0 100px",
                    pointerEvents: "none",
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
                    border: `2px solid ${value.color}40`,
                    marginBottom: "20px",
                    fontSize: "1.5rem",
                  }}
                >
                  {value.icon}
                </div>

                <h4
                  className={styles.valueHeading}
                  style={{
                    ...typography.heading,
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    margin: "0 0 16px 0",
                    color: colors.textPrimary,
                    position: "relative",
                  }}
                >
                  {value.title}
                </h4>
                <p
                  className={styles.valueDescription}
                  style={{
                    ...typography.body,
                    fontSize: "1rem",
                    color: colors.textSubtle,
                    lineHeight: 1.6,
                    margin: 0,
                    position: "relative",
                  }}
                >
                  {value.description}
                </p>

                {/* Subtle accent line */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${value.color}, transparent)`,
                    borderRadius: "0 0 20px 20px",
                  }}
                />
              </div>
            );
          })}
        </div>
        
        <h3
          className={styles.teamHeading}
          style={{
            color: colors.textPrimary,
          }}
        >
          Meet Our Team
        </h3>
        <p
          className={styles.teamSubheadline}
          style={{
            color: colors.textSubtle,
          }}
        >
          Our team of engineers, designers, and cloud architects brings together deep technical expertise and creative problem-solving.
          We collaborate closely to deliver scalable, high-performance software solutions that drive real-world impact.
        </p>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={styles.teamMember}
              style={{
                ...glassEnhanced,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px",
                borderRadius: "16px",
              }}
            >
              <div className={styles.logoPlaceholder} style={{ marginBottom: "24px" }}>
                <div
                  className={styles.memberAvatar}
                  style={{
                    background: `linear-gradient(135deg, ${colors.primaryAccent}40, ${colors.secondaryAccent}40)`,
                    border: `1px solid ${colors.primaryAccent}20`,
                  }}
                >
                  {member.memoji}
                </div>
              </div>
              <div className={styles.memberInfo} style={{ textAlign: "center" }}>
                <h4
                  className={styles.memberName}
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {member.name}
                </h4>
                <p
                  className={styles.memberRole}
                  style={{
                    color: colors.secondaryAccent,
                  }}
                >
                  {member.role}
                </p>
                <p
                  className={styles.memberBio}
                  style={{
                    color: colors.textSubtle,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};