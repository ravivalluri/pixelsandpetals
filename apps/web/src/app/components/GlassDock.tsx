"use client";
import React, { useState, useEffect } from "react";

const navItems = [
  { label: "Home", id: "home-section" },
  { label: "Projects", id: "projects-section" },
  { label: "Clients", id: "clients-section" },
  { label: "About", id: "about-section" },
  { label: "Contact", id: "contact-section" },
];

export const GlassDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home-section");
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track active section and scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      // Get all section elements
      const sections = navItems.map(item => document.getElementById(item.id));
      
      // Find the section that is currently in view
      let currentSection = "home-section";
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section is in viewport (top of section is above middle of screen)
          if (rect.top <= window.innerHeight / 2) {
            currentSection = navItems[i].id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Glass effect styles
  const glassBase = {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(31, 38, 135, 0.45)',
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

  // Dynamic text color based on scroll position
  const getTextColor = () => {
    // If we're in the hero section (top ~100px), use white text
    if (scrollPosition < 100) {
      return '#FFFFFF';
    }
    // Otherwise use the default dark text
    return colors.text;
  };

  const getNavOpacity = () => {
    if (scrollPosition < 100) return 0.3;
    if (scrollPosition < 300) return 0.5 + (scrollPosition - 100) * 0.002;
    return 0.9;
  };

  return (
    <div style={{
      position: "sticky",
      top: 20,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      padding: "0 20px",
    }}>
      <nav style={{
        ...glassBase,
        background: `rgba(255, 255, 255, ${getNavOpacity() * 0.12})`,
        padding: "8px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
      <ul style={{
        listStyle: "none",
        display: "flex",
        gap: 28,
        margin: 0,
        padding: 0,
      }}>
        {navItems.map((item) => (
          <li key={item.id} style={{ position: "relative" }}>
            <button 
              onClick={() => scrollToSection(item.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "8px",
                color: activeSection === item.id ? colors.primary : getTextColor(),
                fontSize: "0.95rem",
                fontWeight: activeSection === item.id ? 600 : 500,
                transition: "all 0.3s ease",
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(31, 38, 135, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <span style={{
                  display: "block",
                  height: "2px",
                  width: "100%",
                  marginTop: "4px",
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  borderRadius: "2px",
                  transition: "width 0.3s ease, opacity 0.3s ease",
                }} />
              )}
            </button>
          </li>
        ))}
      </ul>
      </nav>
    </div>
  );
};