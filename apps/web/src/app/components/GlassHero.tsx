"use client";
import React from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";

export const GlassHero: React.FC = () => {
  // Glass effect styles
  const glassBase = {
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
    <section id="home-section" style={{
      position: "relative",
      minHeight: "72vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: colors.background,
      overflow: "hidden",
      padding: "64px 20px",
      color: colors.text,
    }}>
      {/* Background blob */}
      <svg
        style={{
          position: "absolute",
          right: "-10%",
          top: "-20%",
          width: "120%",
          height: "120%",
          transform: "rotate(10deg)",
          zIndex: 0,
          opacity: 0.9,
          filter: "blur(28px)",
        }}
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
          <filter id="f1">
            <feGaussianBlur stdDeviation="40" />
          </filter>
        </defs>
        <g filter="url(#f1)" opacity="0.9">
          <path
            fill="url(#g1)"
            d="M410,40 C520,20 680,70 736,173 C792,276 740,358 688,444 C636,530 490,560 376,520 C262,480 120,420 120,300 C120,180 300,60 410,40 Z"
          />
        </g>
      </svg>

      <div style={{
        position: "relative",
        zIndex: 5,
        width: "min(1100px, 95%)",
      }}>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            ...glassBase,
            padding: "40px",
            borderRadius: "16px",
          }}>
            <h1 style={{
              ...typography.heading,
              margin: 0,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Pixels &amp; Petals</h1>
            <p style={{
              ...typography.body,
              marginTop: 10,
              color: colors.textLight,
              fontSize: "1.05rem",
            }}>
              Design-forward engineering for modern web &amp; mobile products.
            </p>

            <div style={{ 
              marginTop: 22, 
              display: "flex", 
              gap: 16, 
              alignItems: "center" 
            }}>
              <a 
                href="#projects-section" 
                style={{
                  padding: "10px 18px",
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.backgroundLight,
                  borderRadius: 10,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: `0 6px 18px rgba(102, 153, 255, 0.3)`,
                  transition: "all 0.3s ease",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(102, 153, 255, 0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 6px 18px rgba(102, 153, 255, 0.3)`;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('projects-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See Projects
              </a>

              <div style={{ marginLeft: 8 }} aria-hidden>
                <div style={{
                  ...glassSubtle,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 8,
                }}>
                  <QRCodeSVG
                    value="https://ravivalluri.com/resume.pdf"
                    size={72}
                    bgColor="transparent"
                    fgColor={colors.textLight}
                  />
                  <small style={{
                    ...typography.caption,
                    fontSize: 12,
                    color: colors.textLight,
                    marginTop: 6,
                  }}>Scan resume</small>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
