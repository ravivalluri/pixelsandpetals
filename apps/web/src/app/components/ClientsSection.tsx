"use client";
import React from "react";

export const ClientsSection: React.FC = () => {
  const clients = [
    {
      name: "TechFlow Inc.",
      industry: "Software Development",
      testimonial: "Pixels & Petals transformed our digital presence with their innovative solutions and attention to detail.",
      logo: "/images/clients/techflow.png",
    },
    {
      name: "Global Finance Group",
      industry: "Financial Services",
      testimonial: "Their expertise in secure financial applications helped us streamline operations and improve customer experience.",
      logo: "/images/clients/global-finance.png",
    },
    {
      name: "HealthPlus Solutions",
      industry: "Healthcare Technology",
      testimonial: "The healthcare dashboard they developed has become essential to our patient care operations.",
      logo: "/images/clients/healthplus.png",
    },
    {
      name: "EcoRetail Enterprises",
      industry: "E-commerce",
      testimonial: "Our mobile app conversion rates increased by 45% after implementing their UX recommendations.",
      logo: "/images/clients/ecoretail.png",
    },
    {
      name: "EduTech Innovations",
      industry: "Education Technology",
      testimonial: "Their learning platform solution has enabled us to reach students in over 50 countries effectively.",
      logo: "/images/clients/edutech.png",
    },
    {
      name: "MediaWave Studios",
      industry: "Entertainment",
      testimonial: "The content management system they built for us has reduced our publishing time by 60%.",
      logo: "/images/clients/mediawave.png",
    },
  ];

  // Glass effect styles
  const glassEnhanced = {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(31, 38, 135, 0.45)',
  };
  
  const glassSubtle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(31, 38, 135, 0.25)',
  };

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
    <section id="clients-section" style={{
      background: colors.backgroundLight,
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
        }}>Our Clients</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.2rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          Trusted by industry leaders and innovative startups
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "32px",
        }}>
          {clients.map((client, index) => (
            <div 
              key={index} 
              style={{
                ...glassEnhanced,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px",
                borderRadius: "16px",
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: colors.backgroundLight,
                }}>
                  {client.name.charAt(0)}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{
                  ...typography.heading,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  margin: "0 0 8px 0",
                  color: colors.text,
                }}>{client.name}</h3>
                <p style={{
                  ...typography.caption,
                  fontSize: "0.9rem",
                  color: colors.secondary,
                  margin: "0 0 16px 0",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>{client.industry}</p>
                <p style={{
                  ...typography.body,
                  fontSize: "1rem",
                  color: colors.textLight,
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}>"{client.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};