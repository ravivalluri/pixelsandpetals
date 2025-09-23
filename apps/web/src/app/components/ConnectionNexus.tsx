"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './ConnectionNexus/ConnectionNexus.module.css';

export const ConnectionNexus: React.FC = () => {
  const { theme, colors } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1500);
  };

  // Glass effect styles that adapt to theme
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

  const contactMethods = [
    {
      title: "Email",
      value: "hello@pixelsandpetals.com",
      icon: "✉️",
      action: "mailto:hello@pixelsandpetals.com"
    },
    {
      title: "Phone",
      value: "+1 (555) 123-4567",
      icon: "📞",
      action: "tel:+15551234567"
    },
    {
      title: "Office",
      value: "123 Innovation Blvd, San Francisco, CA",
      icon: "🏢",
      action: "#"
    }
  ];

  return (
    <section 
      id="connection-nexus" 
      className={styles.section}
      style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "80px 20px",
        borderRadius: "20px",
        margin: "40px 0",
        position: "relative",
        transition: 'background 0.3s ease',
      }}
    >
      <div className={styles.container} style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}>
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
          Connection Nexus
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
          Open a direct, transparent channel for communication
        </p>
        
        <div className={styles.grid} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          {/* Liquid Glass Communication Hub */}
          <div 
            className={styles.formContainer}
            style={{
              ...glassEnhanced,
              borderRadius: "20px",
              padding: "32px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup} style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                  className={`${styles.formInput} ${focusedField === "name" ? styles.focused : ""}`}
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textSubtle}`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: colors.textPrimary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "name" ? {
                      borderColor: colors.primaryAccent,
                      boxShadow: `0 0 0 3px ${colors.primaryAccent}40`,
                    } : {}),
                  }}
                />
                <label 
                  htmlFor="name" 
                  className={styles.formLabel}
                  style={{
                    position: "absolute",
                    top: formData.name || focusedField === "name" ? "8px" : "16px",
                    left: "16px",
                    fontSize: formData.name || focusedField === "name" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "name" ? colors.primaryAccent : colors.textSubtle,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Your Name
                </label>
              </div>

              <div className={styles.formGroup} style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  className={`${styles.formInput} ${focusedField === "email" ? styles.focused : ""}`}
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textSubtle}`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: colors.textPrimary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "email" ? {
                      borderColor: colors.primaryAccent,
                      boxShadow: `0 0 0 3px ${colors.primaryAccent}40`,
                    } : {}),
                  }}
                />
                <label 
                  htmlFor="email" 
                  className={styles.formLabel}
                  style={{
                    position: "absolute",
                    top: formData.email || focusedField === "email" ? "8px" : "16px",
                    left: "16px",
                    fontSize: formData.email || focusedField === "email" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "email" ? colors.primaryAccent : colors.textSubtle,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Email Address
                </label>
              </div>

              <div className={styles.formGroup} style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={handleBlur}
                  required
                  className={`${styles.formInput} ${focusedField === "subject" ? styles.focused : ""}`}
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textSubtle}`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: colors.textPrimary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "subject" ? {
                      borderColor: colors.primaryAccent,
                      boxShadow: `0 0 0 3px ${colors.primaryAccent}40`,
                    } : {}),
                  }}
                />
                <label 
                  htmlFor="subject" 
                  className={styles.formLabel}
                  style={{
                    position: "absolute",
                    top: formData.subject || focusedField === "subject" ? "8px" : "16px",
                    left: "16px",
                    fontSize: formData.subject || focusedField === "subject" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "subject" ? colors.primaryAccent : colors.textSubtle,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Subject
                </label>
              </div>

              <div className={styles.formGroup} style={{ position: "relative", marginBottom: "24px" }}>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className={`${styles.formInput} ${styles.formTextarea} ${focusedField === "message" ? styles.focused : ""}`}
                  style={{
                    width: "100%",
                    padding: "18px 16px 28px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textSubtle}`,
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                    color: colors.textPrimary,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    resize: "vertical",
                    fontFamily: 'inherit',
                    ...(focusedField === "message" ? {
                      borderColor: colors.primaryAccent,
                      boxShadow: `0 0 0 3px ${colors.primaryAccent}40`,
                    } : {}),
                  }}
                />
                <label 
                  htmlFor="message" 
                  className={styles.formLabel}
                  style={{
                    position: "absolute",
                    top: formData.message || focusedField === "message" ? "8px" : "16px",
                    left: "16px",
                    fontSize: formData.message || focusedField === "message" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "message" ? colors.primaryAccent : colors.textSubtle,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Your Message
                </label>
                <div style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "16px",
                  fontSize: "0.8rem",
                  color: colors.textSubtle,
                }}>
                  {formData.message.length}/500
                </div>
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                style={{
                  ...glassEnhanced,
                  width: "100%",
                  padding: "16px",
                  background: `linear-gradient(90deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
                  color: colors.textPrimary,
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  ...(submitStatus === "success" ? {
                    background: "linear-gradient(90deg, #28a745, #218838)",
                  } : {}),
                  ...(submitStatus === "error" ? {
                    background: "linear-gradient(90deg, #FF6F61, #e0554d)",
                  } : {}),
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ height: "4px", width: "100%", position: "relative" }}>
                      <motion.div
                        style={{
                          height: "4px",
                          background: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "2px",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                        animate={{ 
                          width: ["0%", "100%"],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity 
                        }}
                      />
                    </div>
                  </div>
                ) : submitStatus === "success" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  >
                    ✓
                  </motion.div>
                ) : (
                  "Send Message"
                )}
              </motion.button>
              
              {/* Status message */}
              {submitStatus !== "idle" && (
                <div 
                  className={styles.statusMessage}
                  style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backdropFilter: "blur(10px)",
                    background: submitStatus === "success" 
                      ? theme === 'dark' 
                        ? 'rgba(39, 167, 69, 0.2)' 
                        : 'rgba(39, 167, 69, 0.15)'
                      : theme === 'dark' 
                        ? 'rgba(220, 53, 69, 0.2)' 
                        : 'rgba(220, 53, 69, 0.15)',
                    color: submitStatus === "success" ? '#28a745' : '#dc3545',
                    border: `1px solid ${submitStatus === "success" ? '#28a745' : '#dc3545'}40`,
                  }}
                >
                  {submitStatus === "success" 
                    ? "Message sent successfully!" 
                    : "There was an error sending your message. Please try again."}
                </div>
              )}
            </form>
          </div>

          {/* Direct Channel Information */}
          <div className={styles.infoContainer} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <h3 
                style={{
                  ...typography.heading,
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  color: colors.textPrimary,
                }}
              >
                Direct Channels
              </h3>
              <div className={styles.contactMethods} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    className={styles.methodCard}
                    style={{
                      ...glassEnhanced,
                      borderRadius: "16px",
                      padding: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div style={{ fontSize: "1.8rem" }}>{method.icon}</div>
                    <div style={{ textAlign: "center" }}>
                      <h4 
                        className={styles.methodTitle}
                        style={{
                          ...typography.heading,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          margin: "0 0 4px 0",
                          color: colors.textPrimary,
                        }}
                      >
                        {method.title}
                      </h4>
                      <p 
                        className={styles.methodValue}
                        style={{
                          ...typography.body,
                          fontSize: "0.95rem",
                          color: colors.textSubtle,
                          margin: 0,
                        }}
                      >
                        {method.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location Orb */}
            <div>
              <h3 
                style={{
                  ...typography.heading,
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  margin: "0 0 16px 0",
                  color: colors.textPrimary,
                }}
              >
                Our Location
              </h3>
              <motion.div 
                className={styles.locationOrb}
                style={{
                  ...glassEnhanced,
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📍</div>
                  <p 
                    style={{
                      ...typography.body,
                      color: colors.textSubtle,
                      fontSize: "1rem",
                      margin: 0,
                    }}
                  >
                    Interactive Map
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};