"use client";
import React from "react";
import { GlassCard } from "@/app/components/GlassCard";

export const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "OTP Widget",
      subtitle: "Secure authentication microservice",
      image: "/images/otp-widget.png",
      tags: ["React", "AWS", "Cognito"],
    },
    {
      title: "EKS Kafka Pipeline",
      subtitle: "High-volume event streaming",
      image: "/images/kafka-pipeline.png",
      tags: ["Java", "Kafka", "EKS"],
    },
    {
      title: "Design System",
      subtitle: "Pixels & Petals UI kit",
      image: "/images/design-system.png",
      tags: ["Figma", "Storybook"],
    },
    {
      title: "Healthcare Dashboard",
      subtitle: "Patient data visualization platform",
      image: "/images/healthcare-dashboard.png",
      tags: ["React", "D3", "TypeScript"],
    },
    {
      title: "E-commerce Mobile App",
      subtitle: "Cross-platform shopping experience",
      image: "/images/ecommerce-app.png",
      tags: ["React Native", "Redux", "Node.js"],
    },
    {
      title: "AI Content Generator",
      subtitle: "Automated content creation tool",
      image: "/images/ai-content.png",
      tags: ["Python", "TensorFlow", "FastAPI"],
    },
  ];

  // Glass effect styles
  const colors = {
    primary: '#6699FF',
    secondary: '#9966CC',
    accent: '#FF6F61',
    text: '#3C4A5C',
    textLight: '#8DA3B5',
    background: '#D9E8F5',
    backgroundLight: '#F0F8FF',
  };

  const typography = {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: '#3C4A5C',
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#3C4A5C',
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#8DA3B5',
    }
  };

  return (
    <section id="projects-section" style={{
      background: colors.background,
      padding: "80px 20px",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
      }}>
        <h2 style={{
          ...typography.heading,
          fontSize: "2.5rem",
          fontWeight: 700,
          margin: "0 0 16px 0",
          textAlign: "center",
          color: colors.text,
        }}>Our Projects</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.2rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          A showcase of our recent work and technical expertise
        </p>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center",
          marginTop: "32px",
        }}>
          {projects.map((project, index) => (
            <GlassCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};