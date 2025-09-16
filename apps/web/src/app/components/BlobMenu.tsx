"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", id: "home-section" },
  { label: "Projects", id: "projects-section" },
  { label: "Clients", id: "clients-section" },
  { label: "About", id: "about-section" },
  { label: "Contact", id: "contact-section" },
];

export const BlobMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

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
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 2000,
    }}>
      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        style={{
          ...glassEnhanced,
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        aria-label="Menu"
        whileHover={{ 
          background: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ 
          fontSize: 22, 
          color: colors.text 
        }}>☰</span>
      </motion.button>

      {/* Blob Reveal Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(60, 74, 92, 0.6)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={{
                background: `linear-gradient(135deg, ${colors.primary}80, ${colors.secondary}80, ${colors.accent}80)`,
                borderRadius: "40%",
                padding: "60px 80px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <ul style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        ...typography.heading,
                        color: colors.backgroundLight,
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        textAlign: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};