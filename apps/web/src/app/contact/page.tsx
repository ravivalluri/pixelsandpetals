"use client";
import React, { useState } from "react";
import Header from "../components/Header";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      title: "Email",
      value: "hello@pixelsandpetals.com",
      icon: "✉️"
    },
    {
      title: "Phone",
      value: "+1 (555) 123-4567",
      icon: "📞"
    },
    {
      title: "Office",
      value: "123 Innovation Blvd, San Francisco, CA",
      icon: "🏢"
    }
  ];

  return (
    <>
      <Header />
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Get In Touch</h1>
          <p style={styles.heroSubtitle}>
            Have a project in mind? Let's work together to bring your vision to life.
          </p>
        </div>
      </section>

      <section style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div style={styles.contactInfo}>
              <h2 style={styles.sectionTitle}>Contact Information</h2>
              <p style={styles.contactText}>
                We're here to answer any questions you may have about our services. 
                Reach out to us and we'll respond as soon as we can.
              </p>
              
              <div style={styles.contactMethods}>
                {contactMethods.map((method, index) => (
                  <div key={index} style={styles.contactMethod}>
                    <div style={styles.contactIcon}>{method.icon}</div>
                    <div>
                      <h3 style={styles.contactMethodTitle}>{method.title}</h3>
                      <p style={styles.contactMethodValue}>{method.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.socialLinks}>
                <h3 style={styles.socialTitle}>Follow Us</h3>
                <div style={styles.socialIcons}>
                  <a href="#" style={styles.socialLink}>𝕏</a>
                  <a href="#" style={styles.socialLink}>💼</a>
                  <a href="#" style={styles.socialLink}>📷</a>
                  <a href="#" style={styles.socialLink}>▶️</a>
                </div>
              </div>
            </div>
            
            <div style={styles.contactForm}>
              <h2 style={styles.sectionTitle}>Send Us a Message</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="subject" style={styles.label}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label htmlFor="message" style={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={styles.textarea}
                  />
                </div>
                
                <button type="submit" style={styles.submitButton}>
                  Send Message
                </button>
              </form>
            </div>
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
  contactSection: {
    background: "#08111A",
    padding: "40px 20px 80px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "64px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 600,
    margin: "0 0 24px 0",
    color: "#E6EEF3",
  },
  contactInfo: {
    
  },
  contactText: {
    fontSize: "1.1rem",
    color: "#cfeaf1",
    lineHeight: 1.7,
    marginBottom: "32px",
  },
  contactMethods: {
    marginBottom: "40px",
  },
  contactMethod: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  contactIcon: {
    fontSize: "1.5rem",
    marginRight: "16px",
    marginTop: "4px",
  },
  contactMethodTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: "0 0 4px 0",
    color: "#E6EEF3",
  },
  contactMethodValue: {
    fontSize: "1rem",
    color: "#cfeaf1",
    margin: 0,
  },
  socialLinks: {
    
  },
  socialTitle: {
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: "0 0 16px 0",
    color: "#E6EEF3",
  },
  socialIcons: {
    display: "flex",
    gap: "16px",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#E6EEF3",
    fontSize: "1.2rem",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  contactForm: {
    
  },
  form: {
    
  },
  formGroup: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#E6EEF3",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#E6EEF3",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#E6EEF3",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    resize: "vertical",
    fontFamily: "inherit",
  },
  submitButton: {
    padding: "14px 28px",
    background: "linear-gradient(90deg, #7C5CFF, #6EE7B7)",
    color: "#041018",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  "@media (max-width: 768px)": {
    contactGrid: {
      gridTemplateColumns: "1fr",
      gap: "40px",
    },
    contactSection: {
      padding: "40px 15px 60px",
    },
  },
};