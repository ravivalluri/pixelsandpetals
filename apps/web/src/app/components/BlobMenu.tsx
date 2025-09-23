"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './BlobMenu/BlobMenu.module.css';

const navItems = [
  { label: "Home", id: "home-section" },
  { label: "Solutions", id: "projects-section" },
  { label: "Clients", id: "clients-section" },
  { label: "About", id: "about-section" },
  { label: "Contact", id: "contact-section" },
];

export const BlobMenu: React.FC = () => {
  const { theme, colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile viewport
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
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
    <div className={styles.container}>
      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className={styles.menuButton}
        style={{
          ...glassEnhanced,
          width: isMobile ? 64 : 56,
          height: isMobile ? 64 : 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: theme === 'dark'
            ? "0 6px 20px rgba(0,0,0,0.6)"
            : "0 6px 20px rgba(0,0,0,0.4)",
          border: isMobile
            ? `2px solid ${theme === 'dark' ? 'rgba(102, 153, 255, 0.4)' : 'rgba(102, 153, 255, 0.3)'}`
            : glassEnhanced.border,
        }}
        whileTap={{ scale: 0.9 }}
        aria-label="Menu"
        whileHover={{ 
          background: theme === 'dark' 
            ? "rgba(42, 47, 62, 0.5)" 
            : "rgba(255, 255, 255, 0.18)",
          boxShadow: theme === 'dark' 
            ? "0 8px 24px rgba(0,0,0,0.7)" 
            : "0 8px 24px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{
          fontSize: isMobile ? 26 : 22,
          color: colors.textPrimary,
          fontWeight: isMobile ? 'bold' : 'normal',
        }}>☰</span>
      </motion.button>

      {/* Blob Reveal Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.menuContent}
            style={{
              position: "fixed",
              inset: 0,
              background: theme === 'dark'
                ? "rgba(10, 15, 25, 0.8)"
                : "rgba(60, 74, 92, 0.6)",
              backdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* Close Button - Fixed position in the corner */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                top: "32px",
                right: "32px",
                background: theme === 'dark'
                  ? "rgba(42, 47, 62, 0.8)"
                  : "rgba(255, 255, 255, 0.9)",
                border: `1px solid ${theme === 'dark' ? 'rgba(102, 153, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
                color: colors.textPrimary,
                fontSize: "20px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: theme === 'dark'
                  ? "0 4px 20px rgba(0, 0, 0, 0.4)"
                  : "0 4px 20px rgba(0, 0, 0, 0.15)",
                zIndex: 10001,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme === 'dark'
                  ? "rgba(42, 47, 62, 1)"
                  : "rgba(255, 255, 255, 1)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme === 'dark'
                  ? "rgba(42, 47, 62, 0.8)"
                  : "rgba(255, 255, 255, 0.9)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label="Close menu"
            >
              ✕
            </button>

            <motion.div
              className={styles.blobMenu}
              style={{
                width: "100vw",
                height: "100vh",
                maxWidth: "none",
                maxHeight: "none",
                borderRadius: "0",
                padding: "80px 40px 40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: theme === 'dark'
                  ? "rgba(10, 15, 25, 0.95)"
                  : "rgba(245, 245, 245, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "none",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >

              <ul
                className={styles.menuList}
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={styles.menuItem}
                      style={{
                        ...typography.heading,
                        color: colors.textPrimary,
                        fontSize: "2rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        textAlign: "center",
                        background: "none",
                        border: `2px solid transparent`,
                        cursor: "pointer",
                        padding: "20px 40px",
                        borderRadius: "16px",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        width: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark'
                          ? "rgba(102, 153, 255, 0.1)"
                          : "rgba(102, 153, 255, 0.08)";
                        e.currentTarget.style.borderColor = colors.primaryAccent;
                        e.currentTarget.style.color = colors.primaryAccent;
                        e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                        e.currentTarget.style.boxShadow = theme === 'dark'
                          ? "0 8px 32px rgba(102, 153, 255, 0.3)"
                          : "0 8px 32px rgba(102, 153, 255, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color = colors.textPrimary;
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Add a subtle footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.15 + 0.5 }}
                style={{
                  marginTop: "auto",
                  paddingTop: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{
                  ...typography.caption,
                  fontSize: "0.9rem",
                  color: colors.textSubtle,
                  margin: 0,
                }}>
                  Pixels & Petals • Engineering Excellence
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};