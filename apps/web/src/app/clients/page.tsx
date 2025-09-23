"use client";
import React from "react";
import EnhancedHeader from "../components/EnhancedHeader";
import { ClientsSection } from "../components/ClientsSection";

export default function ClientsPage() {
  return (
    <>
      <EnhancedHeader />
      <div style={{ paddingTop: '80px' }}>
        <ClientsSection />
      </div>
    </>
  );
}