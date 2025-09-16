"use client";
import React from "react";

export const AboutSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "10+ years in software architecture and product development",
      image: "/images/team/alex.jpg",
    },
    {
      name: "Taylor Kim",
      role: "CTO",
      bio: "Specializes in cloud infrastructure and distributed systems",
      image: "/images/team/taylor.jpg",
    },
    {
      name: "Jordan Smith",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 8+ years",
      image: "/images/team/jordan.jpg",
    },
    {
      name: "Riley Johnson",
      role: "Lead Developer",
      bio: "Full-stack expert with focus on React and Node.js ecosystems",
      image: "/images/team/riley.jpg",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions"
    },
    {
      title: "Quality",
      description: "We maintain the highest standards in code quality and user experience"
    },
    {
      title: "Collaboration",
      description: "We believe the best results come from working closely with our clients"
    },
    {
      title: "Sustainability",
      description: "We build solutions that are maintainable and scalable for the long term"
    }
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
    <section id="about-section" style={{
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
        }}>About Us</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.2rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          Crafting exceptional digital experiences with passion and precision
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center",
          marginTop: "32px",
        }}>
          <div>
            <h3 style={{
              ...typography.heading,
              fontSize: "1.8rem",
              fontWeight: 600,
              margin: "0 0 24px 0",
              color: colors.text,
            }}>Our Story</h3>
            <p style={{
              ...typography.body,
              fontSize: "1.1rem",
              color: colors.textLight,
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
              Founded in 2018, Pixels & Petals began as a small team of passionate developers 
              and designers with a shared vision: to create digital products that are both 
              beautiful and functional.
            </p>
            <p style={{
              ...typography.body,
              fontSize: "1.1rem",
              color: colors.textLight,
              lineHeight: 1.7,
              marginBottom: "24px",
            }}>
              Today, we've grown into a diverse team of experts specializing in web and mobile 
              development, cloud architecture, and user experience design. We've partnered with 
              startups and enterprises across various industries to bring their digital visions 
              to life.
            </p>
          </div>
          <div>
            <div style={{
              width: "100%",
              height: "300px",
              background: `linear-gradient(135deg, ${colors.primary}30, ${colors.secondary}30)`,
              borderRadius: "12px",
              border: `1px solid ${colors.primary}20`,
            }} />
          </div>
        </div>
        
        <h3 style={{
          ...typography.heading,
          fontSize: "1.8rem",
          fontWeight: 600,
          margin: "64px 0 24px 0",
          textAlign: "center",
          color: colors.text,
        }}>Our Values</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "32px",
          marginTop: "32px",
        }}>
          {values.map((value, index) => (
            <div 
              key={index} 
              style={{
                ...glassEnhanced,
                padding: "32px",
                borderRadius: "16px",
              }}
            >
              <h4 style={{
                ...typography.heading,
                fontSize: "1.4rem",
                fontWeight: 600,
                margin: "0 0 16px 0",
                color: colors.text,
              }}>{value.title}</h4>
              <p style={{
                ...typography.body,
                fontSize: "1rem",
                color: colors.textLight,
                lineHeight: 1.6,
              }}>{value.description}</p>
            </div>
          ))}
        </div>
        
        <h3 style={{
          ...typography.heading,
          fontSize: "1.8rem",
          fontWeight: 600,
          margin: "64px 0 24px 0",
          textAlign: "center",
          color: colors.text,
        }}>Meet Our Team</h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          marginTop: "32px",
        }}>
          {teamMembers.map((member, index) => (
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
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`,
                  border: `1px solid ${colors.primary}20`,
                }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{
                  ...typography.heading,
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  margin: "0 0 8px 0",
                  color: colors.text,
                }}>{member.name}</h4>
                <p style={{
                  ...typography.caption,
                  fontSize: "1rem",
                  color: colors.secondary,
                  margin: "0 0 16px 0",
                }}>{member.role}</p>
                <p style={{
                  ...typography.body,
                  fontSize: "0.95rem",
                  color: colors.textLight,
                  lineHeight: 1.6,
                }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};