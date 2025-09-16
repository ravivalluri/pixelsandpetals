"use client";
import React from "react";
import { GlassCard } from "@/app/components/GlassCard";
import Header from "../components/Header";

export default function ProjectsPage() {
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

  return (
    <>
      <Header />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Our Projects</h1>
          <p style={styles.heroSubtitle}>
            A showcase of our recent work and technical expertise
          </p>
        </div>
      </section>

      <section style={styles.projectsGrid}>
        {projects.map((project, index) => (
          <GlassCard key={index} {...project} />
        ))}
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    background: "#08111A",
    padding: "120px 20px 60px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 700,
    margin: 0,
    background: "linear-gradient(90deg, #7C5CFF, #6EE7B7, #FF7A90)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#cfeaf1",
    marginTop: "16px",
    maxWidth: "600px",
    margin: "16px auto 0",
  },
  projectsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
    justifyContent: "center",
    padding: "40px 20px 80px",
    background: "#08111A",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  "@media (max-width: 768px)": {
    projectsGrid: {
      gap: "20px",
      padding: "40px 15px 60px",
    },
  },
};