"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './AboutSection/AboutSection.module.css';
import { useContentItem } from "@/lib/hooks/useContent";

// Interactive Tech Journey Component
const InteractiveTechJourney: React.FC = () => {
  const { theme } = useTheme();
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
      className={`${styles.techJourney} ${theme === 'dark' ? styles.techJourneyDark : styles.techJourneyLight}`}
    >
      {/* Animated Background Grid */}
      <div
        className={`${styles.techGrid} ${styles.techGridBackground} ${theme === 'dark' ? styles.techGridDark : styles.techGridLight}`}
      />

      {/* SVG for connections */}
      <svg className={styles.techJourneySvg}>
        {connections.map((conn, index) => {
          const fromNode = techNodes.find(n => n.id === conn.from);
          const toNode = techNodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          const isActive = index === animationPhase;

          return (
            <line
              key={`${conn.from}-${conn.to}`}
              className={`${styles.techConnectionLine} ${isActive ? styles.techConnectionLineActive : styles.techConnectionLineInactive}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke={isActive ? '#6699ff' : (theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)')}
              strokeWidth={isActive ? "3" : "1"}
              strokeOpacity={isActive ? 0.8 : 0.3}
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
            className={`${styles.techNodeContainer} ${isHovered ? styles.techNodeContainerHovered : ''}`}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
          >
            {/* Node Circle */}
            <div
              className={`${styles.techNodeCircle} ${
                isHovered ? styles.techNodeCircleHovered :
                isAnimated ? styles.techNodeCircleAnimated :
                styles.techNodeCircleBase
              } ${
                isHovered || isAnimated ? styles.techNodeCircleHoveredShadow : styles.techNodeCircleBaseShadow
              }`}
              style={{
                background: theme === 'dark'
                  ? `linear-gradient(135deg, ${node.color}40, #6699ff20)`
                  : `linear-gradient(135deg, ${node.color}30, #6699ff15)`,
                borderColor: isHovered || isAnimated ? node.color : '#6699ff',
                ...(isHovered || isAnimated ? {
                  boxShadow: `0 8px 32px ${node.color}40, 0 0 20px ${node.color}30`
                } : {})
              }}
            >
              <span
                className={`${styles.techNodeLabel} ${isHovered ? styles.techNodeLabelHovered : styles.techNodeLabelBase}`}
                style={{
                  color: isHovered || isAnimated ? node.color : (theme === 'dark' ? '#ffffff' : '#1a1a1a'),
                }}
              >
                {node.label}
              </span>
            </div>

            {/* Tooltip */}
            {isHovered && (
              <div
                className={`${styles.techTooltipContainer} ${theme === 'dark' ? styles.techTooltipDark : styles.techTooltipLight} ${styles.techTooltipBoxShadow}`}
                style={{
                  borderColor: node.color,
                  boxShadow: `0 4px 20px ${node.color}30`,
                }}
              >
                {node.tech}
                <div
                  className={`${styles.techTooltipArrow} ${styles.techTooltipArrowBorder}`}
                  style={{
                    borderTopColor: node.color,
                  }}
                />
              </div>
            )}

            {/* Pulse Animation */}
            {isAnimated && (
              <div
                className={`${styles.techPulseRing} ${styles.techPulseRingBorder}`}
                style={{
                  borderColor: node.color,
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
          className={`${styles.techParticle} ${theme === 'dark' ? styles.techParticleDark : styles.techParticleLight}`}
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
            animation: `float${i % 3} ${3 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Title Overlay */}
      <div
        className={`${styles.techTitle} ${theme === 'dark' ? styles.techTitleDark : styles.techTitleLight} ${
          hoveredNode ? styles.techTitleHovered : styles.techTitleBase
        }`}
      >
        Our Tech Stack • Interactive Journey
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const { content: aboutContent, loading, error } = useContentItem(undefined, 'about', 'page');

  // Fallback data if API fails
  const fallbackTeamMembers = [
    {
      name: "Ravi Valluri",
      role: "Founder & CEO",
      bio: "15+ years in software architecture and product development",
      image: "/images/team/ravi.jpg",
      memoji: "👨🏽‍💻", // Male brown memoji
      social: {
        website: "https://ravivalluri.com",
        github: "https://github.com/ravivalluri",
        linkedin: "https://www.linkedin.com/in/ravivalluri/"
      }
    },
    {
      name: "Maia Valluri",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 10+ years",
      image: "/images/team/maia.jpg",
      memoji: "👩🏻‍🎨", // Female white memoji for design
      social: {
        linkedin: "#",
        behance: "#"
      }
    },
  ];

  const fallbackValues = [
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

  // Get dynamic content or use fallbacks
  const sectionTitle = aboutContent?.content?.hero?.title || "About Us";
  const sectionSubtitle = aboutContent?.content?.hero?.subtitle || "Engineering scalable software. Designing seamless digital experiences.";
  const storyTitle = aboutContent?.content?.story?.title || "Our Story";
  const storyContent = aboutContent?.content?.story?.content || [
    'Founded in 2018, Pixels & Petals started as a small team of developers and designers united by a vision: to build digital products that are both high-performing and elegantly designed.',
    'Today, we\'ve grown into a cross-functional team of engineers, architects, and UX specialists, delivering web and mobile applications, cloud-native architectures, and scalable platforms. We collaborate with startups and enterprises across industries, turning complex technical challenges into innovative, user-centered solutions.'
  ];

  // Always use fallback team members to ensure social links are present
  const teamMembers = fallbackTeamMembers;

  const values = aboutContent?.content?.values || fallbackValues;
  const teamTitle = aboutContent?.content?.team?.title || "Meet Our Team";
  const teamSubtitle = aboutContent?.content?.team?.subtitle || "Our team of engineers, designers, and cloud architects brings together deep technical expertise and creative problem-solving. We collaborate closely to deliver scalable, high-performance software solutions that drive real-world impact.";

  if (loading) {
    return (
      <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
        <div className={styles.container} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px'
        }}>
          <div style={{ color: theme === 'dark' ? '#ffffff' : '#1a1a1a', fontSize: '1.2rem' }}>Loading about content...</div>
        </div>
      </section>
    );
  }

  if (error) {
    console.warn('Failed to load about content, using fallback:', error);
  }


  return (
    <section
      id="about-section"
      className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}
    >
      <div className={styles.container}>
        <h2
          className={`${styles.sectionHeading} ${theme === 'dark' ? styles.sectionHeadingDark : styles.sectionHeadingLight}`}
        >
          {sectionTitle}
        </h2>
        <p
          className={`${styles.subtitle} ${styles.sectionSubtitle} ${theme === 'dark' ? styles.sectionSubtitleDark : styles.sectionSubtitleLight}`}
        >
          {sectionSubtitle}
        </p>
        
        <div className={styles.contentGrid}>
          <div className={styles.storyContent}>
            <h3
              className={`${styles.storyHeading} ${theme === 'dark' ? styles.storyHeadingDark : styles.storyHeadingLight}`}
            >
              {storyTitle}
            </h3>
            {storyContent.map((paragraph: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, index: React.Key | null | undefined) => (
              <p
                key={index}
                className={`${styles.storyParagraph} ${theme === 'dark' ? styles.storyParagraphDark : styles.storyParagraphLight}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className={styles.storyImage}>
            <InteractiveTechJourney />
          </div>
        </div>
        
        <h3
          className={`${styles.sectionHeading} ${styles.sectionSubheading} ${theme === 'dark' ? styles.sectionHeadingDark : styles.sectionHeadingLight}`}
        >
          Our Values
        </h3>
        <div className={styles.valuesGrid}>
          {values.map((value: { color: any; icon: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => {
            return (
              <div
                key={index}
                className={`${styles.valueCard} ${styles.valueCardTransition} ${styles.valueCardBoxShadow} ${theme === 'dark' ? styles.glassCardDark : styles.glassCardLight}`}
                style={{
                  borderColor: `${value.color}40`,
                  boxShadow: theme === 'dark'
                    ? `0 12px 48px ${value.color}25`
                    : `0 12px 48px ${value.color}35`,
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
                  className={`${styles.valueBackground} ${styles.valueBackgroundBase}`}
                  style={{
                    background: `linear-gradient(135deg, ${value.color}20, transparent)`,
                  }}
                />

                {/* Icon */}
                <div
                  className={`${styles.valueIcon} ${styles.valueIconBase} ${styles.valueIconBackground}`}
                  style={{
                    background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
                    borderColor: `${value.color}40`,
                  }}
                >
                  {value.icon}
                </div>

                <h4
                  className={`${styles.valueHeading} ${theme === 'dark' ? styles.valueHeadingDark : styles.valueHeadingLight}`}
                >
                  {value.title}
                </h4>
                <p
                  className={`${styles.valueDescription} ${theme === 'dark' ? styles.valueDescriptionDark : styles.valueDescriptionLight}`}
                >
                  {value.description}
                </p>

                {/* Subtle accent line */}
                <div
                  className={`${styles.valueAccentLine} ${styles.valueAccentLineBase}`}
                  style={{
                    background: `linear-gradient(90deg, ${value.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
        
        <h3
          className={`${styles.teamHeading} ${theme === 'dark' ? styles.teamHeadingDark : styles.teamHeadingLight}`}
        >
          {teamTitle}
        </h3>
        <p
          className={`${styles.teamSubheadline} ${theme === 'dark' ? styles.teamSubheadlineDark : styles.teamSubheadlineLight}`}
        >
          {teamSubtitle}
        </p>
        <div className={styles.teamGrid}>
          {teamMembers.map((member: any, index: React.Key | null | undefined) => (
            <div
              key={index}
              className={`${styles.teamMember} ${styles.teamMemberCard} ${theme === 'dark' ? styles.glassCardDark : styles.glassCardLight}`}
            >
              <div className={styles.logoPlaceholder}>
                <div
                  className={`${styles.memberAvatar} ${theme === 'dark' ? styles.memberAvatarDark : styles.memberAvatarLight}`}
                >
                  {member.memoji}
                </div>
              </div>
              <div className={styles.memberInfo}>
                {member.social?.website ? (
                  <a
                    href={member.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.memberNameLink}
                  >
                    <h4
                      className={`${styles.memberName} ${styles.memberNameWithLink} ${theme === 'dark' ? styles.memberNameDark : styles.memberNameLight}`}
                    >
                      {member.name}
                      <svg
                        className={styles.linkIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                    </h4>
                  </a>
                ) : (
                  <h4
                    className={`${styles.memberName} ${theme === 'dark' ? styles.memberNameDark : styles.memberNameLight}`}
                  >
                    {member.name}
                  </h4>
                )}
                <p
                  className={`${styles.memberRole} ${theme === 'dark' ? styles.memberRoleDark : styles.memberRoleLight}`}
                >
                  {member.role}
                </p>
                <p
                  className={`${styles.memberBio} ${theme === 'dark' ? styles.memberBioDark : styles.memberBioLight}`}
                >
                  {member.bio}
                </p>
                {member.social && (
                  <div className={styles.memberSocial}>
                    {member.social.website && (
                      <a
                        href={member.social.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialLink} ${theme === 'dark' ? styles.socialLinkDark : styles.socialLinkLight}`}
                        aria-label="Visit website"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="2" y1="12" x2="22" y2="12"/>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialLink} ${theme === 'dark' ? styles.socialLinkDark : styles.socialLinkLight}`}
                        aria-label="Visit GitHub profile"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialLink} ${theme === 'dark' ? styles.socialLinkDark : styles.socialLinkLight}`}
                        aria-label="Visit LinkedIn profile"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.behance && (
                      <a
                        href={member.social.behance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.socialLink} ${theme === 'dark' ? styles.socialLinkDark : styles.socialLinkLight}`}
                        aria-label="Visit Behance profile"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};