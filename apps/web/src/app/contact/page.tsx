"use client";
import React from "react";
import EnhancedHeader from "../components/EnhancedHeader";
import { ContactSection } from "../components/ContactSection";

export default function ContactPage() {
  return (
    <>
      <EnhancedHeader />
      <div style={{ paddingTop: '80px' }}>
        <ContactSection />
      </div>
    </>
  );
}