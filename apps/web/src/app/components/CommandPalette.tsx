"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './CommandPalette.module.css';

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


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          style={{
            background: theme === 'dark'
              ? "rgba(10, 15, 25, 0.6)"
              : "rgba(60, 74, 92, 0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`${styles.palette} ${theme === 'dark' ? styles.paletteDark : styles.paletteLight}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <input
              type="text"
              placeholder="Type to search…"
              autoFocus
              className={`${styles.searchInput} ${theme === 'dark' ? styles.searchInputDark : styles.searchInputLight}`}
              style={{
                color: colors.textPrimary,
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <ul className={styles.resultsList}>
              {filtered.map((item) => (
                <li key={item.id || item.href}>
                  {item.id ? (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={styles.resultItem}
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className={styles.resultItem}
                      style={{
                        color: colors.textPrimary,
                      }}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
              {filtered.length === 0 && (
                <li
                  className={styles.noResults}
                  style={{
                    color: colors.textSubtle,
                  }}
                >
                  No results
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};