"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './GlassDock/GlassDock.module.css';

export const GlassDock: React.FC = () => {
  const { theme, colors } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", href: "#home-section" },
    { id: "projects", label: "Solutions", href: "#projects-section" },
    { id: "clients", label: "Partners", href: "#clients-section" },
    { id: "about", label: "About", href: "#about-section" },
    { id: "contact", label: "Connect", href: "#contact-section" },
    { id: "resume", label: "Resume", href: "/resume.pdf" },
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.href.substring(1))
      }));

      let currentSection = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Glass effect styles that adapt to theme
  const glassEnhanced = {
    background: theme === 'dark' 
      ? 'rgba(42, 47, 62, 0.3)' 
      : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.2)'
      : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: theme === 'dark'
      ? '0 12px 48px rgba(102, 153, 255, 0.25)'
      : '0 12px 48px rgba(31, 38, 135, 0.45)',
  };
  
  const glassSubtle = {
    background: theme === 'dark'
      ? 'rgba(42, 47, 62, 0.2)'
      : 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.15)'
      : '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: theme === 'dark'
      ? '0 4px 24px rgba(102, 153, 255, 0.15)'
      : '0 4px 24px rgba(31, 38, 135, 0.25)',
  };

  const typography = {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: colors.textPrimary,
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textPrimary,
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: colors.textSubtle,
    }
  };

  return (
    <nav 
      className={styles.glassDock}
      style={{
        position: "sticky",
        top: "20px",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "0 20px",
      }}
    >
      <div 
        className={styles.navContainer}
        style={{
          ...glassEnhanced,
          backdropFilter: "blur(16px) saturate(200%)",
          WebkitBackdropFilter: "blur(16px) saturate(200%)",
          border: theme === 'dark'
            ? "1px solid rgba(102, 153, 255, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "20px",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "fit-content",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <ul 
          className={styles.navList}
          style={{
            listStyle: "none",
            display: "flex",
            gap: "28px",
            margin: 0,
            padding: 0,
          }}
        >
          {navItems.map((item) => (
            <li 
              key={item.id} 
              className={styles.navItem}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                className={`${styles.navButton} ${activeSection === item.id ? styles.active : ""}`}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  color: colors.textPrimary,
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  ...(activeSection === item.id ? {
                    color: colors.primaryAccent,
                  } : {}),
                }}
                onClick={() => scrollToSection(item.id.substring(1))}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme === 'dark' 
                    ? "rgba(255, 255, 255, 0.15)" 
                    : "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <span 
                    className={styles.activeIndicator}
                    style={{
                      display: "block",
                      height: "2px",
                      width: "100%",
                      marginTop: "4px",
                      background: `linear-gradient(90deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
                      borderRadius: "2px",
                      transition: "width 0.3s ease, opacity 0.3s ease",
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};