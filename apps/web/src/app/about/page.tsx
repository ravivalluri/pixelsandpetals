"use client";
import React from "react";
import Header from "../components/Header";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "10+ years in software architecture and product development",
      image: "/images/team/alex.jpg",
    },
    {
      name: "Taylor Kim",
      role: "CTO",
      bio: "Specializes in cloud infrastructure and distributed systems",
      image: "/images/team/taylor.jpg",
    },
    {
      name: "Jordan Smith",
      role: "Design Director",
      bio: "Creating beautiful and functional user experiences for 8+ years",
      image: "/images/team/jordan.jpg",
    },
    {
      name: "Riley Johnson",
      role: "Lead Developer",
      bio: "Full-stack expert with focus on React and Node.js ecosystems",
      image: "/images/team/riley.jpg",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions"
    },
    {
      title: "Quality",
      description: "We maintain the highest standards in code quality and user experience"
    },
    {
      title: "Collaboration",
      description: "We believe the best results come from working closely with our clients"
    },
    {
      title: "Sustainability",
      description: "We build solutions that are maintainable and scalable for the long term"
    }
  ];

  return (
    <>
      <Header />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>About Us</h1>
          <p style={styles.heroSubtitle}>
            Crafting exceptional digital experiences with passion and precision
          </p>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.contentGrid}>
            <div style={styles.textBlock}>
              <h2 style={styles.sectionTitle}>Our Story</h2>
              <p style={styles.paragraph}>
                Founded in 2018, Pixels & Petals began as a small team of passionate developers 
                and designers with a shared vision: to create digital products that are both 
                beautiful and functional.
              </p>
              <p style={styles.paragraph}>
                Today, we've grown into a diverse team of experts specializing in web and mobile 
                development, cloud architecture, and user experience design. We've partnered with 
                startups and enterprises across various industries to bring their digital visions 
                to life.
              </p>
            </div>
            <div style={styles.imageBlock}>
              <div style={styles.placeholderImage} />
            </div>
          </div>
        </div>
      </section>

      <section style={styles.sectionLight}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleCenter}>Our Values</h2>
          <div style={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} style={styles.valueCard}>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitleCenter}>Meet Our Team</h2>
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.teamCard}>
                <div style={styles.memberImage}>
                  <div style={styles.imagePlaceholder} />
                </div>
                <div style={styles.memberInfo}>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberRole}>{member.role}</p>
                  <p style={styles.memberBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
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
  section: {
    background: "#08111A",
    padding: "80px 20px",
  },
  sectionLight: {
    background: "rgba(8, 17, 26, 0.7)",
    padding: "80px 20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    margin: "0 0 24px 0",
    color: "#E6EEF3",
  },
  sectionTitleCenter: {
    fontSize: "2rem",
    fontWeight: 600,
    margin: "0 0 48px 0",
    color: "#E6EEF3",
    textAlign: "center",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "48px",
    alignItems: "center",
  },
  textBlock: {
    
  },
  imageBlock: {
    
  },
  placeholderImage: {
    width: "100%",
    height: "300px",
    background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(110,231,183,0.2))",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  paragraph: {
    fontSize: "1.1rem",
    color: "#cfeaf1",
    lineHeight: 1.7,
    marginBottom: "24px",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "32px",
  },
  valueCard: {
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    backdropFilter: "blur(8px) saturate(120%)",
    WebkitBackdropFilter: "blur(8px) saturate(120%)",
  },
  valueTitle: {
    fontSize: "1.4rem",
    fontWeight: 600,
    margin: "0 0 16px 0",
    color: "#E6EEF3",
  },
  valueDescription: {
    fontSize: "1rem",
    color: "#cfeaf1",
    lineHeight: 1.6,
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "32px",
  },
  teamCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    backdropFilter: "blur(8px) saturate(120%)",
    WebkitBackdropFilter: "blur(8px) saturate(120%)",
  },
  memberImage: {
    marginBottom: "24px",
  },
  imagePlaceholder: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(124,92,255,0.3), rgba(110,231,183,0.3))",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  memberInfo: {
    textAlign: "center",
  },
  memberName: {
    fontSize: "1.4rem",
    fontWeight: 600,
    margin: "0 0 8px 0",
    color: "#E6EEF3",
  },
  memberRole: {
    fontSize: "1rem",
    color: "#6EE7B7",
    margin: "0 0 16px 0",
  },
  memberBio: {
    fontSize: "0.95rem",
    color: "#cfeaf1",
    lineHeight: 1.6,
  },
  "@media (max-width: 768px)": {
    contentGrid: {
      gridTemplateColumns: "1fr",
      gap: "32px",
    },
    section: {
      padding: "60px 15px",
    },
    sectionLight: {
      padding: "60px 15px",
    },
    valuesGrid: {
      gap: "20px",
    },
    valueCard: {
      padding: "24px",
    },
    teamGrid: {
      gap: "20px",
    },
    teamCard: {
      padding: "24px",
    },
  },
};