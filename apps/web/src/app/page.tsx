"use client";
import React from "react";
import { CrystallineCoreNexus } from "@/app/components/CrystallineCore/CrystallineCoreNexus";
import { useTheme } from "@/app/context/ThemeContext";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { ClientsSection } from "@/app/components/ClientsSection";
import { AboutSection } from "@/app/components/AboutSection";
import { ConnectionNexus } from "@/app/components/ConnectionNexus";
import EnhancedHeader from "./components/EnhancedHeader";
import { HeroCTA } from "@/app/components/HeroCTA/HeroCTA";
import { LiquidGlassCursor } from "@/app/components/LiquidGlassCursor/LiquidGlassCursor";
import { SectionWrapper } from "@/app/components/SectionBackgrounds/SectionBackgrounds";
import { LiquidGlassStyles } from "@/app/components/LiquidGlass/LiquidGlassComponents";

export default function Home() {
  const { colors } = useTheme();

  // Apply theme to body
  React.useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`;
    document.body.style.transition = 'background 0.3s ease';
    document.body.style.minHeight = '100vh';
  }, [colors]);

  return (
    <>
      {/* Global liquid glass styles */}
      <LiquidGlassStyles />

      {/* Custom liquid glass cursor */}
      <LiquidGlassCursor />

      <EnhancedHeader />

      <SectionWrapper section="hero" id="home-section">
        <CrystallineCoreNexus />
      </SectionWrapper>

      <SectionWrapper section="projects" id="projects-section">
        <ProjectsSection />
      </SectionWrapper>

      {/* Hero CTA after projects */}
      <HeroCTA />

      <SectionWrapper section="clients" id="clients-section">
        <ClientsSection />
      </SectionWrapper>

      <SectionWrapper section="about" id="about-section">
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper section="contact" id="contact-section">
        <ConnectionNexus />
      </SectionWrapper>
    </>
  );
}
