"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

const navItems = [
  { label: "Home", id: "home-section" },
  { label: "Solutions", id: "projects-section" },
  { label: "Partners", id: "clients-section" },
  { label: "About", id: "about-section" },
  { label: "Connect", id: "contact-section" },
  { label: "Download Resume", href: "/resume.pdf" },
];

export const CommandPalette: React.FC = () => {
  const { theme, colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Filter items by query
  const filtered = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

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
    <AnimatePresence>
      {open && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            background: theme === 'dark' 
              ? "rgba(10, 15, 25, 0.6)" 
              : "rgba(60, 74, 92, 0.4)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "15vh",
            zIndex: 3000,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={{
              ...glassEnhanced,
              width: "min(600px, 90%)",
              borderRadius: 12,
              padding: "16px",
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <input
              type="text"
              placeholder="Type to search…"
              autoFocus
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 8,
                border: "none",
                outline: "none",
                background: theme === 'dark' 
                  ? "rgba(42, 47, 62, 0.5)" 
                  : "rgba(255, 255, 255, 0.08)",
                color: colors.textPrimary,
                fontSize: "1rem",
                marginBottom: "12px",
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              maxHeight: "300px",
              overflowY: "auto",
            }}>
              {filtered.map((item) => (
                <li key={item.id || item.href}>
                  {item.id ? (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px",
                        borderRadius: 6,
                        color: colors.textPrimary,
                        textDecoration: "none",
                        transition: "background 0.2s",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        font: "inherit",
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark' 
                          ? "rgba(255, 255, 255, 0.1)" 
                          : "rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px",
                        borderRadius: 6,
                        color: colors.textPrimary,
                        textDecoration: "none",
                        transition: "background 0.2s",
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                      onClick={() => setOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme === 'dark' 
                          ? "rgba(255, 255, 255, 0.1)" 
                          : "rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              {filtered.length === 0 && (
                <li style={{
                  padding: "10px",
                  color: colors.textSubtle,
                  fontSize: "0.9rem",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>No results</li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};