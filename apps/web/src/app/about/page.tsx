"use client";
import React from "react";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { theme, colors } = useTheme();

  const teamMembers = [
    {
      name: "Ravi Valluri",
      role: "Founder & CEO",
      bio: "15+ years in software architecture and product development",
      image: "/images/team/ravi.jpg",
    },
    {
      name: "Maia Valluri",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 10+ years",
      image: "/images/team/maia.jpg",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We anticipate technology trends and leverage modern frameworks, cloud architectures, and best practices to deliver cutting-edge solutions."
    },
    {
      title: "Quality",
      description: "We uphold the highest standards in code integrity, performance, and user experience, ensuring reliable and maintainable software."
    },
    {
      title: "Collaboration",
      description: "We achieve the best outcomes by partnering closely with clients, integrating feedback, and aligning technical solutions with business goals."
    },
    {
      title: "Sustainability",
      description: "We design systems that are scalable, maintainable, and future-proof, ensuring long-term value for every project."
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
    <div 
      className={styles.page}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "120px 20px 60px",
        minHeight: "100vh",
        transition: 'background 0.3s ease',
      }}
    >
      <Header />
      
      <div className={styles.container}>
        <h1 
          className={styles.title}
          style={{
            ...typography.heading,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            margin: "0 0 16px 0",
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          About Us
        </h1>
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
            lineHeight: 1.6,
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
            <div 
              className={styles.imagePlaceholder}
              style={{
                width: "100%",
                height: "300px",
                background: `linear-gradient(135deg, ${colors.primaryAccent}30, ${colors.secondaryAccent}30)`,
                borderRadius: "12px",
                border: `1px solid ${colors.primaryAccent}20`,
              }} 
            />
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
          {values.map((value, index) => (
            <div 
              key={index} 
              className={styles.valueCard}
              style={{
                ...glassEnhanced,
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <h4 
                className={styles.valueHeading}
                style={{
                  ...typography.heading,
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  color: colors.textPrimary,
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
                }}
              >
                {value.description}
              </p>
            </div>
          ))}
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
          Meet Our Team
        </h3>
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
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primaryAccent}40, ${colors.secondaryAccent}40)`,
                    border: `1px solid ${colors.primaryAccent}20`,
                  }} 
                />
              </div>
              <div className={styles.memberInfo} style={{ textAlign: "center" }}>
                <h4 
                  className={styles.memberName}
                  style={{
                    ...typography.heading,
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    margin: "0 0 8px 0",
                    color: colors.textPrimary,
                  }}
                >
                  {member.name}
                </h4>
                <p 
                  className={styles.memberRole}
                  style={{
                    ...typography.caption,
                    fontSize: "1rem",
                    color: colors.secondaryAccent,
                    margin: "0 0 16px 0",
                  }}
                >
                  {member.role}
                </p>
                <p 
                  className={styles.memberBio}
                  style={{
                    ...typography.body,
                    fontSize: "0.95rem",
                    color: colors.textSubtle,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}