"use client";
import React from "react";
import EnhancedHeader from "../components/EnhancedHeader";
import { ProjectsSection } from "../components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <>
      <EnhancedHeader />
      <div style={{ paddingTop: '80px' }}>
        <ProjectsSection />
      </div>
    </>
  );
}