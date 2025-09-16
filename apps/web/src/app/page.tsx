import React from "react";
import { CrystallineCoreNexus } from "@/app/components/CrystallineCore/CrystallineCoreNexus";
import { ProjectsSection } from "@/app/components/ProjectsSection";
import { ClientsSection } from "@/app/components/ClientsSection";
import { AboutSection } from "@/app/components/AboutSection";
import { ContactSection } from "@/app/components/ContactSection";
import EnhancedHeader from "./components/EnhancedHeader";

export default function Home() {
  return (
    <>
      <EnhancedHeader />
      <div id="home-section">
        <CrystallineCoreNexus />
      </div>
      <div id="projects-section">
        <ProjectsSection />
      </div>
      <div id="clients-section">
        <ClientsSection />
      </div>
      <div id="about-section">
        <AboutSection />
      </div>
      <div id="contact-section">
        <ContactSection />
      </div>
    </>
  );
}
