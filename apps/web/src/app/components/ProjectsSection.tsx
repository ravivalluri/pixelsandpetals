"use client";
import React from "react";
import { GlassCard } from "@/app/components/GlassCard";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './ProjectsSection/ProjectsSection.module.css';

// SVG Icons for projects
const OTPIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
    <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="20" cy="32" r="3" fill="currentColor"/>
    <circle cx="32" cy="32" r="3" fill="currentColor"/>
    <circle cx="44" cy="32" r="3" fill="currentColor"/>
    <rect x="16" y="40" width="32" height="2" rx="1" fill="currentColor" opacity="0.6"/>
    <path d="M32 8L36 12H28L32 8Z" fill="currentColor"/>
    <rect x="30" y="52" width="4" height="8" rx="2" fill="currentColor" opacity="0.7"/>
  </svg>
);

const KafkaIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="16" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="48" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="16" cy="44" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="48" cy="44" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="32" r="4" fill="currentColor"/>
    <path d="M22 20L26 32M38 20L36 32M22 44L26 32M38 44L36 32" stroke="currentColor" strokeWidth="2"/>
    <rect x="12" y="16" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
    <rect x="44" y="16" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
    <rect x="12" y="40" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
    <rect x="44" y="40" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
  </svg>
);

const DesignSystemIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="8" width="16" height="16" rx="3" fill="currentColor" opacity="0.8"/>
    <rect x="28" y="8" width="16" height="16" rx="3" fill="currentColor" opacity="0.6"/>
    <rect x="48" y="8" width="8" height="16" rx="3" fill="currentColor" opacity="0.4"/>
    <rect x="8" y="28" width="24" height="8" rx="2" fill="currentColor" opacity="0.7"/>
    <rect x="36" y="28" width="20" height="8" rx="2" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="48" r="6" fill="currentColor" opacity="0.6"/>
    <rect x="28" y="42" width="12" height="12" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="44" y="44" width="12" height="8" rx="2" fill="currentColor" opacity="0.4"/>
  </svg>
);

const HealthcareIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="12" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 24L20 28L28 20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="36" y="20" width="16" height="4" rx="1" fill="currentColor" opacity="0.6"/>
    <rect x="36" y="26" width="12" height="4" rx="1" fill="currentColor" opacity="0.4"/>
    <circle cx="20" cy="38" r="3" fill="currentColor" opacity="0.7"/>
    <rect x="28" y="35" width="8" height="6" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="40" y="36" width="12" height="4" rx="1" fill="currentColor" opacity="0.6"/>
    <path d="M32 4V8M32 8L28 12M32 8L36 12" stroke="currentColor" strokeWidth="2"/>
    <rect x="20" y="52" width="24" height="2" rx="1" fill="currentColor" opacity="0.5"/>
  </svg>
);

const EcommerceIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="12" y="8" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="28" y="16" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="24" cy="12" r="1" fill="currentColor"/>
    <circle cx="40" cy="20" r="1" fill="currentColor"/>
    <rect x="16" y="20" width="16" height="8" rx="2" fill="currentColor" opacity="0.3"/>
    <rect x="32" y="28" width="16" height="8" rx="2" fill="currentColor" opacity="0.5"/>
    <rect x="16" y="32" width="8" height="2" rx="1" fill="currentColor" opacity="0.6"/>
    <rect x="26" y="32" width="6" height="2" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="32" y="40" width="8" height="2" rx="1" fill="currentColor" opacity="0.7"/>
    <rect x="42" y="40" width="6" height="2" rx="1" fill="currentColor" opacity="0.5"/>
  </svg>
);

const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
    <circle cx="32" cy="32" r="3" fill="currentColor"/>
    <path d="M32 8V16M32 48V56M8 32H16M48 32H56" stroke="currentColor" strokeWidth="2"/>
    <path d="M19.6 19.6L25.2 25.2M38.8 38.8L44.4 44.4M44.4 19.6L38.8 25.2M25.2 38.8L19.6 44.4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="32" cy="16" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="32" cy="48" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.6"/>
  </svg>
);

export const ProjectsSection: React.FC = () => {
  const { colors } = useTheme();

  const projects = [
    {
      title: "OTP Widget",
      subtitle: "Secure authentication microservice",
      icon: <OTPIcon className={styles.projectIcon} />,
      tags: ["React", "AWS", "Cognito"],
      color: "#FF6B6B", // Coral Red - Security/Authentication
    },
    {
      title: "EKS Kafka Pipeline",
      subtitle: "High-volume event streaming",
      icon: <KafkaIcon className={styles.projectIcon} />,
      tags: ["Java", "Kafka", "EKS"],
      color: "#4ECDC4", // Teal - Data Streaming
    },
    {
      title: "Design System",
      subtitle: "Pixels & Petals UI kit with React and React Native",
      icon: <DesignSystemIcon className={styles.projectIcon} />,
      tags: ["React", "Figma", "Storybook"],
      color: "#45B7D1", // Sky Blue - Design/UI
    },
    {
      title: "Healthcare Dashboard",
      subtitle: "Patient data visualization platform",
      icon: <HealthcareIcon className={styles.projectIcon} />,
      tags: ["React", "D3", "TypeScript"],
      color: "#96CEB4", // Mint Green - Healthcare/Wellness
    },
    {
      title: "E-commerce Mobile App",
      subtitle: "Cross-platform shopping experience",
      icon: <EcommerceIcon className={styles.projectIcon} />,
      tags: ["React Native", "Redux", "Node.js"],
      color: "#FECA57", // Golden Yellow - Commerce/Shopping
    },
    {
      title: "AI Content Generator",
      subtitle: "Automated content creation tool",
      icon: <AIIcon className={styles.projectIcon} />,
      tags: ["Python", "TensorFlow", "FastAPI"],
      color: "#A55EEA", // Purple - AI/Machine Learning
    },
  ];

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
      id="projects-section" 
      className={styles.section}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "120px 20px 80px 20px",
        transition: 'background 0.3s ease',
      }}
    >
      <div className={styles.container}>
        <h2 
          className={styles.title}
          style={{
            ...typography.heading,
            fontSize: "2.5rem",
            fontWeight: 700,
            margin: "0 0 16px 0",
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          Our Solutions
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
          Explore our portfolio of full-stack development, system design, and cloud engineering—real-world implementations that solve complex business challenges.
        </p>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <GlassCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};