"use client";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './GlassCard/GlassCard.module.css';

interface GlassCardProps {
  title: string;
  subtitle: string;
  image?: string;
  icon?: React.ReactNode;
  tags?: string[];
  color?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  image,
  icon,
  tags = [],
  color,
}) => {
  const { theme, colors } = useTheme();

  // Check if mobile viewport
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Glass effect styles that adapt to theme and color
  const glassEnhanced = {
    background: theme === 'dark'
      ? 'rgba(42, 47, 62, 0.3)'
      : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: color
      ? `1px solid ${color}40`
      : theme === 'dark'
        ? '1px solid rgba(102, 153, 255, 0.2)'
        : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: color
      ? theme === 'dark'
        ? `0 12px 48px ${color}25`
        : `0 12px 48px ${color}35`
      : theme === 'dark'
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
    <article
      className={styles.card}
      style={{
        ...glassEnhanced,
        width: isMobile ? "100%" : 320,
        maxWidth: isMobile ? "none" : 320,
        minHeight: isMobile ? 320 : 280,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        if (color) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? `0 16px 56px ${color}35`
            : `0 16px 56px ${color}45`;
          e.currentTarget.style.borderColor = `${color}60`;
        }
      }}
      onMouseLeave={(e) => {
        if (color) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? `0 12px 48px ${color}25`
            : `0 12px 48px ${color}35`;
          e.currentTarget.style.borderColor = `${color}40`;
        }
      }}
    >
      {/* Background accent for color theme */}
      {color && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "120px",
            height: "120px",
            background: `linear-gradient(135deg, ${color}15, transparent)`,
            borderRadius: "0 16px 0 120px",
            pointerEvents: "none",
          }}
        />
      )}

      <div
        className={styles.image}
        style={{
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: icon
            ? color
              ? `linear-gradient(135deg, ${color}20, ${color}10)`
              : `linear-gradient(135deg, ${colors.primaryAccent}20, ${colors.secondaryAccent}20)`
            : undefined,
          backgroundSize: image ? "cover" : undefined,
          backgroundPosition: image ? "center" : undefined,
          backgroundImage: image ? `url(${image})` : undefined,
          position: "relative",
        }}
        role="img"
        aria-label={title}
      >
        {icon && (
          <div style={{
            color: color || colors.primaryAccent,
            transform: 'scale(1.2)',
            filter: `drop-shadow(0 2px 8px ${color || colors.primaryAccent}40)`,
          }}>
            {icon}
          </div>
        )}
      </div>
      <div
        className={styles.content}
        style={{
          padding: isMobile ? 20 : 16,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            className={styles.title}
            style={{
              ...typography.heading,
              margin: 0,
              fontSize: isMobile ? 20 : 18,
              color: colors.textPrimary,
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <p
            className={styles.subtitle}
            style={{
              ...typography.caption,
              marginTop: isMobile ? 12 : 8,
              fontSize: isMobile ? 15 : 13,
              lineHeight: 1.5,
              color: colors.textSubtle,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div
          className={styles.tags}
          style={{
            marginTop: isMobile ? 16 : 12,
            display: "flex",
            gap: isMobile ? 10 : 8,
            flexWrap: "wrap",
          }}
        >
          {tags.map((t) => (
            <span
              key={t}
              className={styles.tag}
              style={{
                ...glassSubtle,
                padding: isMobile ? "6px 12px" : "4px 8px",
                borderRadius: isMobile ? 10 : 8,
                fontSize: isMobile ? 12 : 11,
                color: colors.textSubtle,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        {color && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${color}, transparent)`,
              borderRadius: "0 0 16px 16px",
            }}
          />
        )}
      </div>
    </article>
  );
};
