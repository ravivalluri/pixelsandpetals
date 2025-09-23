"use client";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './ClientsSection/ClientsSection.module.css';

// Client Logo Components
const CapitalOneLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.1"/>
    <path d="M20 24h24v4H20v-4zm0 8h24v4H20v-4zm0 8h16v4H20v-4z" fill="currentColor" opacity="0.8"/>
    <circle cx="48" cy="20" r="8" fill="currentColor" opacity="0.6"/>
    <path d="M44 20h8M48 16v8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const WalmartLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.1"/>
    <path d="M32 16l4 8h8l-6 6 2 8-8-4-8 4 2-8-6-6h8l4-8z" fill="currentColor" opacity="0.8"/>
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.4"/>
    <path d="M16 20h32M16 44h32" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const RackspaceLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
    <circle cx="20" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="44" cy="32" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M14 24h36M14 40h36" stroke="currentColor" strokeWidth="1"/>
    <rect x="18" y="28" width="4" height="8" fill="currentColor" opacity="0.6"/>
    <rect x="30" y="28" width="4" height="8" fill="currentColor" opacity="0.6"/>
    <rect x="42" y="28" width="4" height="8" fill="currentColor" opacity="0.6"/>
  </svg>
);

const BlueCrossLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.1"/>
    <path d="M32 12v40M12 32h40" stroke="currentColor" strokeWidth="4"/>
    <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M24 24h16v16H24V24z" fill="currentColor" opacity="0.3"/>
    <circle cx="32" cy="32" r="4" fill="currentColor"/>
  </svg>
);

const WellsFargoLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect x="8" y="20" width="48" height="24" rx="4" fill="currentColor" opacity="0.1"/>
    <path d="M16 28h8v8h-8v-8zm12 0h8v8h-8v-8zm12 0h8v8h-8v-8z" fill="currentColor" opacity="0.6"/>
    <circle cx="20" cy="32" r="2" fill="currentColor"/>
    <circle cx="32" cy="32" r="2" fill="currentColor"/>
    <circle cx="44" cy="32" r="2" fill="currentColor"/>
    <path d="M12 16h40l-4 4H16l-4-4z" fill="currentColor" opacity="0.4"/>
    <path d="M16 48h32l4-4H12l4 4z" fill="currentColor" opacity="0.4"/>
  </svg>
);

const MotorolaLogo = ({ className }: { className?: string }) => (
  <svg className={className} width="64" height="64" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.1"/>
    <rect x="20" y="20" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.4"/>
    <path d="M32 16v32M16 32h32" stroke="currentColor" strokeWidth="1"/>
    <circle cx="32" cy="20" r="2" fill="currentColor"/>
    <circle cx="32" cy="44" r="2" fill="currentColor"/>
    <circle cx="20" cy="32" r="2" fill="currentColor"/>
    <circle cx="44" cy="32" r="2" fill="currentColor"/>
  </svg>
);

export const ClientsSection: React.FC = () => {
  const { theme, colors } = useTheme();

  const clients = [
    {
      name: "Capital One",
      industry: "Software Development",
      testimonial: "Pixels & Petals elevated our digital platforms with innovative engineering, seamless integrations, and a design-forward approach that aligned with our enterprise goals.",
      logo: <CapitalOneLogo className={styles.clientLogo} />,
      color: "#FF6B6B", // Coral Red - Banking/Finance
    },
    {
      name: "Walmart",
      industry: "Retail",
      testimonial: "Pixels & Petals' expertise in scalable eCommerce platforms helped us optimize operations and deliver a seamless shopping experience for millions of customers.",
      logo: <WalmartLogo className={styles.clientLogo} />,
      color: "#4ECDC4", // Teal - Retail/Commerce
    },
    {
      name: "Rackspace Technology",
      industry: "Cloud Computing",
      testimonial: "Pixels & Petals' expertise in cloud architecture and scalable solutions has been instrumental in optimizing our infrastructure and delivering reliable, high-performance services.",
      logo: <RackspaceLogo className={styles.clientLogo} />,
      color: "#45B7D1", // Sky Blue - Cloud/Technology
    },
    {
      name: "Blue Cross Blue Shield",
      industry: "Healthcare",
      testimonial: "Pixels & Petals' UX improvements on our digital platforms significantly enhanced member engagement and streamlined user workflows, driving measurable results across our services.",
      logo: <BlueCrossLogo className={styles.clientLogo} />,
      color: "#96CEB4", // Mint Green - Healthcare/Wellness
    },
    {
      name: "Wells Fargo",
      industry: "Financial Services",
      testimonial: "Pixels & Petals' platform solutions have helped us enhance our digital services, improving accessibility, efficiency, and user engagement across our customer base.",
      logo: <WellsFargoLogo className={styles.clientLogo} />,
      color: "#FECA57", // Golden Yellow - Financial Services
    },
    {
      name: "Motorola Solutions",
      industry: "Enterprise Technology",
      testimonial: "Pixels & Petals' custom platform solutions have streamlined our operational workflows, significantly improving efficiency and reducing deployment times across our teams.",
      logo: <MotorolaLogo className={styles.clientLogo} />,
      color: "#A55EEA", // Purple - Enterprise Technology
    },
  ];




  return (
    <section 
      id="clients-section" 
      className={styles.section}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
      }}
    >
      <div className={styles.container}>
        <h2
          className={`${styles.title} ${styles.sectionTitle}`}
          style={{
            color: colors.textPrimary,
          }}
        >
          Our Clients
        </h2>
        <p
          className={`${styles.subtitle} ${styles.sectionSubtitle}`}
          style={{
            color: colors.textSubtle,
          }}
        >
          Partnering with industry leaders and disruptors to engineer cloud-native platforms, enterprise integrations, and mission-critical applications.
        </p>
        <div className={styles.grid}>
          {clients.map((client, index) => {
            return (
              <div
                key={index}
                className={`${styles.clientCard} ${theme === 'dark' ? styles.clientCardDark : styles.clientCardLight}`}
                style={{
                  border: `1px solid ${client.color}40`,
                  boxShadow: theme === 'dark'
                    ? `0 12px 48px ${client.color}25`
                    : `0 12px 48px ${client.color}35`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? `0 16px 56px ${client.color}35`
                    : `0 16px 56px ${client.color}45`;
                  e.currentTarget.style.borderColor = `${client.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? `0 12px 48px ${client.color}25`
                    : `0 12px 48px ${client.color}35`;
                  e.currentTarget.style.borderColor = `${client.color}40`;
                }}
              >
                {/* Background gradient accent */}
                <div
                  className={styles.clientBackground}
                  style={{
                    background: `linear-gradient(135deg, ${client.color}20, transparent)`,
                  }}
                />

                <div className={styles.logoContainer}>
                  {/* Logo background circle */}
                  <div
                    className={styles.logoBackground}
                    style={{
                      background: `linear-gradient(135deg, ${client.color}20, ${client.color}10)`,
                      border: `2px solid ${client.color}40`,
                    }}
                  >
                    <div
                      className={styles.logoInner}
                      style={{
                        color: client.color,
                        filter: `drop-shadow(0 2px 8px ${client.color}40)`,
                      }}
                    >
                      {client.logo}
                    </div>
                  </div>
                </div>
                <div className={styles.clientInfo}>
                  <h3
                    className={styles.clientName}
                    style={{
                      color: colors.textPrimary,
                    }}
                  >
                    {client.name}
                  </h3>
                  <p
                    className={styles.clientIndustry}
                    style={{
                      color: client.color,
                    }}
                  >
                    {client.industry}
                  </p>
                  <p
                    className={styles.clientTestimonial}
                    style={{
                      color: colors.textSubtle,
                    }}
                  >
                    &quot;{client.testimonial}&quot;
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={styles.clientAccentLine}
                  style={{
                    background: `linear-gradient(90deg, ${client.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};