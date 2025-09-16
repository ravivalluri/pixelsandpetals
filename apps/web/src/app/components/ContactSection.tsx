"use client";
import React from "react";
import { ExpertiseMatrix } from "./ExpertiseMatrix";
import { ConnectionNexus } from "./ConnectionNexus";

export const ContactSection: React.FC = () => {
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
    <section id="contact-section" style={{
      background: colors.background,
      padding: "80px 20px",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          ...typography.heading,
          fontSize: "2.5rem",
          fontWeight: 700,
          margin: "0 0 16px 0",
          textAlign: "center",
          color: colors.text,
        }}>Get In Touch</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.2rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          Have a project in mind? Let's work together to bring your vision to life.
        </p>
        
        <ConnectionNexus />
        
        <ExpertiseMatrix />
      </div>
    </section>
  );
};