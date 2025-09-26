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
    },
    {
      name: "Maia Valluri",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 10+ years",
      image: "/images/team/maia.jpg",
      memoji: "👩🏻‍🎨", // Female white memoji for design
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

  const teamMembers = aboutContent?.content?.team?.members || fallbackTeamMembers;
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
          {teamMembers.map((member: { memoji: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; role: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; bio: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
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
                <h4
                  className={`${styles.memberName} ${theme === 'dark' ? styles.memberNameDark : styles.memberNameLight}`}
                >
                  {member.name}
                </h4>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};