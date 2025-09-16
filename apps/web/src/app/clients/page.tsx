"use client";
import React from "react";
import Header from "../components/Header";

export default function ClientsPage() {
  const clients = [
    {
      name: "TechFlow Inc.",
      industry: "Software Development",
      testimonial: "Pixels & Petals transformed our digital presence with their innovative solutions and attention to detail.",
      logo: "/images/clients/techflow.png",
    },
    {
      name: "Global Finance Group",
      industry: "Financial Services",
      testimonial: "Their expertise in secure financial applications helped us streamline operations and improve customer experience.",
      logo: "/images/clients/global-finance.png",
    },
    {
      name: "HealthPlus Solutions",
      industry: "Healthcare Technology",
      testimonial: "The healthcare dashboard they developed has become essential to our patient care operations.",
      logo: "/images/clients/healthplus.png",
    },
    {
      name: "EcoRetail Enterprises",
      industry: "E-commerce",
      testimonial: "Our mobile app conversion rates increased by 45% after implementing their UX recommendations.",
      logo: "/images/clients/ecoretail.png",
    },
    {
      name: "EduTech Innovations",
      industry: "Education Technology",
      testimonial: "Their learning platform solution has enabled us to reach students in over 50 countries effectively.",
      logo: "/images/clients/edutech.png",
    },
    {
      name: "MediaWave Studios",
      industry: "Entertainment",
      testimonial: "The content management system they built for us has reduced our publishing time by 60%.",
      logo: "/images/clients/mediawave.png",
    },
  ];

  return (
    <>
      <Header />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Our Clients</h1>
          <p style={styles.heroSubtitle}>
            Trusted by industry leaders and innovative startups
          </p>
        </div>
      </section>

      <section style={styles.clientsSection}>
        <div style={styles.clientsGrid}>
          {clients.map((client, index) => (
            <div key={index} style={styles.clientCard}>
              <div style={styles.clientLogo}>
                <div style={styles.logoPlaceholder}>{client.name.charAt(0)}</div>
              </div>
              <div style={styles.clientInfo}>
                <h3 style={styles.clientName}>{client.name}</h3>
                <p style={styles.clientIndustry}>{client.industry}</p>
                <p style={styles.clientTestimonial}>"{client.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    background: "#08111A",
    padding: "120px 20px 60px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 700,
    margin: 0,
    background: "linear-gradient(90deg, #7C5CFF, #6EE7B7, #FF7A90)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#cfeaf1",
    marginTop: "16px",
    maxWidth: "600px",
    margin: "16px auto 0",
  },
  clientsSection: {
    background: "#08111A",
    padding: "40px 20px 80px",
  },
  clientsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  clientCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    backdropFilter: "blur(8px) saturate(120%)",
    WebkitBackdropFilter: "blur(8px) saturate(120%)",
    boxShadow: "0 8px 30px rgba(3,9,20,0.6)",
  },
  clientLogo: {
    marginBottom: "24px",
  },
  logoPlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7C5CFF, #6EE7B7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#041018",
  },
  clientInfo: {
    textAlign: "center",
  },
  clientName: {
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: "0 0 8px 0",
    color: "#E6EEF3",
  },
  clientIndustry: {
    fontSize: "0.9rem",
    color: "#6EE7B7",
    margin: "0 0 16px 0",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  clientTestimonial: {
    fontSize: "1rem",
    color: "#cfeaf1",
    fontStyle: "italic",
    lineHeight: 1.6,
  },
  "@media (max-width: 768px)": {
    clientsGrid: {
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
    clientCard: {
      padding: "24px",
    },
  },
};