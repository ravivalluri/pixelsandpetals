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
import { useContentItem } from "@/lib/hooks/useContent";

export default function Home() {
  const { colors } = useTheme();
  const { content: homeContent, loading, error } = useContentItem(undefined, 'home', 'page');

  // Apply theme to body
  React.useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`;
    document.body.style.transition = 'background 0.3s ease';
    document.body.style.minHeight = '100vh';
  }, [colors]);

  // Update document title and meta description from content
  React.useEffect(() => {
    if (homeContent?.content) {
      document.title = homeContent.content.hero?.title || 'Pixels & Petals';

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && homeContent.content.meta?.description) {
        metaDescription.setAttribute('content', homeContent.content.meta.description);
      }
    }
  }, [homeContent]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`
      }}>
        <div style={{ color: colors.textPrimary, fontSize: '1.2rem' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    console.warn('Failed to load home content, falling back to static content:', error);
  }

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
