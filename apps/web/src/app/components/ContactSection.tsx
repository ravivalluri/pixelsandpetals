"use client";
import React, { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import emailjs from '@emailjs/browser';
import styles from './ContactSection/ContactSection.module.css';

export const ContactSection: React.FC = () => {
  const { theme, colors } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  // EmailJS configuration - Replace with your actual values
  const EMAILJS_SERVICE_ID = "service_YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "template_YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  // Glass effect styles
  const glassEnhanced = {
    background: theme === 'dark' 
      ? 'rgba(42, 47, 62, 0.3)' 
      : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: theme === 'dark'
      ? '1px solid rgba(102, 153, 255, 0.2)'
      : '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: theme === 'dark'
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

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      content: ["hello@pixelsandpetals.com"],
      type: "email"
    },
    {
      icon: "📞",
      title: "Phone",
      content: ["+1 (555) 123-4567"],
      type: "phone"
    },
    {
      icon: "🏢",
      title: "Office",
      content: [
        "123 Innovation Blvd",
        "San Francisco, CA 94107",
        "United States"
      ],
      type: "address"
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" },
    { name: "GitHub", icon: "💻", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
          to_name: "Pixels & Petals",
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="contact-section" 
      className={styles.section}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "80px 20px",
        transition: 'background 0.3s ease',
      }}
    >
      <div className={styles.container}>
        <h2 
          className={styles.title}
          style={{
            ...typography.heading,
            fontSize: "2.5rem",
            fontWeight: 700,
            margin: "0 0 16px 0",
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          Get In Touch
        </h2>
        <p 
          className={styles.subtitle}
          style={{
            ...typography.body,
            fontSize: "1.2rem",
            color: colors.textSubtle,
            marginTop: "16px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            textAlign: "center",
          }}
        >
          Have a technical challenge or digital initiative? Let’s collaborate to build scalable, high-performance solutions that turn your vision into reality.
        </p>
        
        <div className={styles.contentGrid}>
          {/* Contact Form */}
          <div 
            className={styles.contactForm}
            style={{
              ...glassEnhanced,
              borderRadius: "20px",
              padding: "32px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label 
                  className={styles.formLabel}
                  style={{
                    ...typography.heading,
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: "8px",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`${styles.formInput} ${styles.formInputName}`}
                  title="Name"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label 
                  className={styles.formLabel}
                  style={{
                    ...typography.heading,
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: "8px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  style={{
                    ...glassSubtle,
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    color: colors.textPrimary,
                    border: `1px solid ${colors.textSubtle}30`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label 
                  className={styles.formLabel}
                  style={{
                    ...typography.heading,
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: "8px",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                  style={{
                    ...glassSubtle,
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    color: colors.textPrimary,
                    border: `1px solid ${colors.textSubtle}30`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label 
                  className={styles.formLabel}
                  style={{
                    ...typography.heading,
                    display: "block",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    marginBottom: "8px",
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${styles.formInput} ${styles.formTextarea}`}
                  style={{
                    ...glassSubtle,
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    color: colors.textPrimary,
                    border: `1px solid ${colors.textSubtle}30`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    minHeight: "120px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div
                  style={{
                    ...glassSubtle,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    border: `1px solid rgba(34, 197, 94, 0.3)`,
                    background: theme === 'dark'
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'rgba(34, 197, 94, 0.05)',
                  }}
                >
                  <p style={{
                    ...typography.body,
                    fontSize: "0.9rem",
                    color: theme === 'dark' ? '#4ade80' : '#16a34a',
                    margin: 0,
                    textAlign: "center",
                  }}>
                    ✅ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && errorMessage && (
                <div
                  style={{
                    ...glassSubtle,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    border: `1px solid rgba(239, 68, 68, 0.3)`,
                    background: theme === 'dark'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(239, 68, 68, 0.05)',
                  }}
                >
                  <p style={{
                    ...typography.body,
                    fontSize: "0.9rem",
                    color: theme === 'dark' ? '#f87171' : '#dc2626',
                    margin: 0,
                    textAlign: "center",
                  }}>
                    ❌ {errorMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
                style={{
                  ...glassEnhanced,
                  width: "100%",
                  padding: "16px",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: colors.textPrimary,
                  background: isLoading
                    ? `rgba(${theme === 'dark' ? '102, 153, 255' : '31, 38, 135'}, 0.3)`
                    : `linear-gradient(135deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  opacity: isLoading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 8px 30px rgba(102, 153, 255, 0.4)'
                      : '0 8px 30px rgba(31, 38, 135, 0.6)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 4px 20px rgba(102, 153, 255, 0.25)'
                      : '0 4px 20px rgba(31, 38, 135, 0.45)';
                  }
                }}
              >
                {isLoading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid transparent",
                      borderTop: "2px solid currentColor",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }} />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div 
            className={styles.infoCard}
            style={{
              ...glassEnhanced,
              borderRadius: "20px",
              padding: "32px",
            }}
          >
            <h3 
              style={{
                ...typography.heading,
                fontSize: "1.8rem",
                fontWeight: 600,
                margin: "0 0 32px 0",
                color: colors.textPrimary,
              }}
            >
              Contact Information
            </h3>
            
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className={styles.infoItem}
              >
                <div 
                  className={styles.infoIcon}
                  style={{
                    ...glassSubtle,
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    marginRight: "16px",
                    flexShrink: 0,
                    background: `linear-gradient(135deg, ${colors.primaryAccent}20, ${colors.secondaryAccent}20)`,
                    border: `1px solid ${colors.primaryAccent}30`,
                  }}
                >
                  {info.icon}
                </div>
                <div className={styles.infoContent}>
                  <h4 
                    style={{
                      ...typography.heading,
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      margin: "0 0 8px 0",
                      color: colors.textPrimary,
                    }}
                  >
                    {info.title}
                  </h4>
                  {info.content.map((line, lineIndex) => (
                    info.type === "email" || info.type === "phone" ? (
                      <a
                        key={lineIndex}
                        href={`${info.type}:${line}`}
                        style={{
                          ...typography.body,
                          fontSize: "1rem",
                          color: colors.secondaryAccent,
                          margin: "0 0 4px 0",
                          textDecoration: "none",
                          display: "block",
                        }}
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={lineIndex}
                        style={{
                          ...typography.body,
                          fontSize: "1rem",
                          color: colors.textSubtle,
                          margin: "0 0 4px 0",
                        }}
                      >
                        {line}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
            
            <div 
              className={styles.socialLinks}
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={styles.socialLink}
                  style={{
                    ...glassSubtle,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    background: `linear-gradient(135deg, ${colors.primaryAccent}20, ${colors.secondaryAccent}20)`,
                    border: `1px solid ${colors.primaryAccent}30`,
                    color: colors.textPrimary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primaryAccent}30, ${colors.secondaryAccent}30)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${colors.primaryAccent}20, ${colors.secondaryAccent}20)`;
                  }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};