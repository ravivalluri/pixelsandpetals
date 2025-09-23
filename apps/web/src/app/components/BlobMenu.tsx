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

  


  return (
    <div className={styles.container}>
      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className={`${styles.menuButton} ${theme === 'dark' ? styles.menuButtonDark : styles.menuButtonLight} ${isMobile ? styles.menuButtonMobile : ''}`}
        style={{
          boxShadow: theme === 'dark'
            ? "0 6px 20px rgba(0,0,0,0.6)"
            : "0 6px 20px rgba(0,0,0,0.4)",
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
        <span
          className={styles.menuIcon}
          style={{
            color: colors.textPrimary,
          }}
        >☰</span>
      </motion.button>

      {/* Blob Reveal Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`${styles.menuContent} ${theme === 'dark' ? styles.menuContentDark : styles.menuContentLight}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* Close Button - Fixed position in the corner */}
            <button
              onClick={() => setOpen(false)}
              className={`${styles.closeButton} ${theme === 'dark' ? styles.closeButtonDark : styles.closeButtonLight}`}
              style={{
                color: colors.textPrimary,
              }}
              aria-label="Close menu"
            >
              ✕
            </button>

            <motion.div
              className={`${styles.blobMenu} ${styles.fullScreenMenu} ${theme === 'dark' ? styles.blobMenuDark : styles.blobMenuLight}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >

              <ul className={`${styles.menuList} ${styles.menuListContainer}`}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.2 }}
                    className={styles.menuListItem}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`${styles.menuItem} ${theme === 'dark' ? styles.menuItemDark : styles.menuItemLight}`}
                      style={{
                        color: colors.textPrimary,
                      }}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Add a subtle footer */}
              <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.15 + 0.5 }}
              >
                <p
                  className={styles.footerText}
                  style={{
                    color: colors.textSubtle,
                  }}
                >
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