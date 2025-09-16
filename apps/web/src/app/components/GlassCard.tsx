import React from "react";

interface GlassCardProps {
  title: string;
  subtitle: string;
  image: string;
  tags?: string[];
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  image,
  tags = [],
}) => {
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
    <article style={{
      ...glassEnhanced,
      width: 320,
      borderRadius: 16,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      <div
        style={{
          height: 160,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${image})`,
        }}
        role="img"
        aria-label={title}
      />
      <div style={{ padding: 16 }}>
        <h3 style={{
          ...typography.heading,
          margin: 0,
          fontSize: 18,
        }}>{title}</h3>
        <p style={{
          ...typography.caption,
          marginTop: 8,
          fontSize: 13,
          lineHeight: 1.5,
        }}>{subtitle}</p>
        <div style={{ 
          marginTop: 12, 
          display: "flex", 
          gap: 8, 
          flexWrap: "wrap" 
        }}>
          {tags.map((t) => (
            <span 
              key={t} 
              style={{
                ...glassSubtle,
                padding: "4px 8px",
                borderRadius: 8,
                fontSize: 11,
                color: colors.textLight,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};
