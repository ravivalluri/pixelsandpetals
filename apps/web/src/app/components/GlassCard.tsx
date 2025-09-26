"use client";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './GlassCard.module.css';

interface GlassCardProps {
  title: string;
  subtitle: string;
  image?: string;
  icon?: React.ReactNode;
  tags?: string[];
  color?: string;
  slug?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  image,
  icon,
  tags = [],
  color,
  slug,
  onClick,
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

  // Update CSS variables when theme changes
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--card-shadow-light',
      colors.cardShadow
    );
    document.documentElement.style.setProperty(
      '--card-shadow-dark',
      colors.cardShadow
    );
    document.documentElement.style.setProperty(
      '--card-shadow-hover-light',
      theme === 'dark' 
        ? `0 16px 56px ${colors.primaryAccent}55` 
        : `0 16px 56px ${colors.primaryAccent}70`
    );
    document.documentElement.style.setProperty(
      '--card-shadow-hover-dark',
      `0 16px 56px ${colors.primaryAccent}55`
    );
    document.documentElement.style.setProperty(
      '--button-shadow-light',
      colors.buttonShadow
    );
    document.documentElement.style.setProperty(
      '--button-shadow-dark',
      colors.buttonShadow
    );
  }, [theme, colors]);

  const getCardClass = () => {
    let classes = `${styles.card} ${theme === 'dark' ? styles.glassEnhancedDark : styles.glassEnhancedLight}`;
    if (isMobile) {
      classes += ` ${styles.cardMobile}`;
    }
    return classes;
  };

  const getTagClass = () => {
    let classes = `${styles.tag} ${theme === 'dark' ? styles.glassSubtleDark : styles.glassSubtleLight}`;
    if (isMobile) {
      classes += ` ${styles.tagMobile}`;
    }
    return classes;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (color) {
      const card = e.currentTarget;
      card.classList.add(theme === 'dark' ? styles.cardHoverDark : styles.cardHoverLight);
      
      // Update border color
      if (theme === 'dark') {
        card.style.borderColor = `${color}60`;
      } else {
        card.style.borderColor = `${color}60`;
      }
      
      // Update box shadow
      if (theme === 'dark') {
        card.style.boxShadow = `0 16px 56px ${color}35`;
      } else {
        card.style.boxShadow = `0 16px 56px ${color}45`;
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (color) {
      const card = e.currentTarget;
      card.classList.remove(theme === 'dark' ? styles.cardHoverDark : styles.cardHoverLight);
      
      // Reset border color
      if (theme === 'dark') {
        card.style.borderColor = `${color}40`;
      } else {
        card.style.borderColor = `${color}40`;
      }
      
      // Reset box shadow
      if (theme === 'dark') {
        card.style.boxShadow = `0 12px 48px ${color}25`;
      } else {
        card.style.boxShadow = `0 12px 48px ${color}35`;
      }
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (slug) {
      window.location.href = `/projects/${slug}`;
    }
  };

  const cardElement = (
    <article
      className={`${getCardClass()} ${(onClick || slug) ? styles.clickable : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{ cursor: (onClick || slug) ? 'pointer' : 'default' }}
    >
      {/* Background accent for color theme */}
      {color && (
        <div
          className={styles.backgroundAccent}
          style={{
            background: `linear-gradient(135deg, ${color}15, transparent)`,
          }}
        />
      )}

      <div
        className={styles.image}
        style={{
          ...(icon && !image ? {
            backgroundImage: color
              ? `linear-gradient(135deg, ${color}20, ${color}10)`
              : `linear-gradient(135deg, ${colors.primaryAccent}20, ${colors.secondaryAccent}20)`
          } : {}),
          ...(image ? {
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          } : {}),
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
        className={`${styles.content} ${isMobile ? styles.contentMobile : ''}`}
      >
        <div>
          <h3
            className={`${styles.title} ${isMobile ? styles.titleMobile : ''}`}
            style={{
              color: colors.textPrimary,
            }}
          >
            {title}
          </h3>
          <p
            className={`${styles.subtitle} ${isMobile ? styles.subtitleMobile : ''}`}
            style={{
              color: colors.textSubtle,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div
          className={`${styles.tags} ${isMobile ? styles.tagsMobile : ''}`}
        >
          {tags.map((t) => (
            <span
              key={t}
              className={getTagClass()}
              style={{
                color: colors.textSubtle,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom accent line */}
        {color && (
          <div
            className={styles.bottomAccent}
            style={{
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />
        )}
      </div>
    </article>
  );

  return cardElement;
};
