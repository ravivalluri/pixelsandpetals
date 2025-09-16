"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export const ConnectionNexus: React.FC = () => {
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
    <section style={{
      background: colors.backgroundLight,
      padding: "60px 30px",
      borderRadius: "20px",
      margin: "40px 0",
    }}>
      {/* Quantum Ripple Background */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: `1px solid ${colors.primary}40`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${100 + i * 20}%`,
              height: `${100 + i * 20}%`,
              top: `${-10 - i * 5}%`,
              left: `${-10 - i * 5}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          ...typography.heading,
          fontSize: "2rem",
          fontWeight: 700,
          margin: "0 0 16px 0",
          textAlign: "center",
          color: colors.text,
        }}>Connection Nexus</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.1rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          Open a direct, transparent channel for communication
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
        }}>
          {/* Liquid Glass Communication Hub */}
          <div style={{
            ...glassEnhanced,
            borderRadius: "20px",
            padding: "32px",
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textLight}`,
                    background: "rgba(255, 255, 255, 0.7)",
                    color: colors.text,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "name" ? {
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 3px ${colors.primary}40`,
                    } : {}),
                  }}
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  style={{
                    position: "absolute",
                    top: formData.name || focusedField === "name" ? "8px" : "16px",
                    left: "16px",
                    color: colors.textLight,
                    fontSize: formData.name || focusedField === "name" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "name" ? colors.primary : colors.textLight,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Your Name
                </label>
              </div>

              <div style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textLight}`,
                    background: "rgba(255, 255, 255, 0.7)",
                    color: colors.text,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "email" ? {
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 3px ${colors.primary}40`,
                    } : {}),
                  }}
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  style={{
                    position: "absolute",
                    top: formData.email || focusedField === "email" ? "8px" : "16px",
                    left: "16px",
                    color: colors.textLight,
                    fontSize: formData.email || focusedField === "email" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "email" ? colors.primary : colors.textLight,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Email Address
                </label>
              </div>

              <div style={{ position: "relative", marginBottom: "24px" }}>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus("subject")}
                  onBlur={handleBlur}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 16px 8px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textLight}`,
                    background: "rgba(255, 255, 255, 0.7)",
                    color: colors.text,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    ...(focusedField === "subject" ? {
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 3px ${colors.primary}40`,
                    } : {}),
                  }}
                  placeholder=" "
                />
                <label 
                  htmlFor="subject" 
                  style={{
                    position: "absolute",
                    top: formData.subject || focusedField === "subject" ? "8px" : "16px",
                    left: "16px",
                    color: colors.textLight,
                    fontSize: formData.subject || focusedField === "subject" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "subject" ? colors.primary : colors.textLight,
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Subject
                </label>
              </div>

              <div style={{ position: "relative", marginBottom: "24px" }}>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus("message")}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "18px 16px 28px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.textLight}`,
                    background: "rgba(255, 255, 255, 0.7)",
                    color: colors.text,
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    resize: "vertical",
                    fontFamily: 'inherit',
                    ...(focusedField === "message" ? {
                      borderColor: colors.primary,
                      boxShadow: `0 0 0 3px ${colors.primary}40`,
                    } : {}),
                  }}
                  placeholder=" "
                />
                <label 
                  htmlFor="message" 
                  style={{
                    position: "absolute",
                    top: formData.message || focusedField === "message" ? "8px" : "16px",
                    left: "16px",
                    color: colors.textLight,
                    fontSize: formData.message || focusedField === "message" ? "0.8rem" : "1rem",
                    pointerEvents: "none",
                    transition: "all 0.2s ease",
                    color: focusedField === "message" ? colors.primary : colors.textLight,
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
                  color: colors.textLight,
                }}>
                  {formData.message.length}/500
                </div>
              </div>

              <motion.button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px",
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.backgroundLight,
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
            </form>
          </div>

          {/* Direct Channel Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <h3 style={{
                ...typography.heading,
                fontSize: "1.5rem",
                fontWeight: 600,
                margin: "0 0 16px 0",
                color: colors.text,
              }}>Direct Channels</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
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
                    <div>
                      <h4 style={{
                        ...typography.heading,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        margin: "0 0 4px 0",
                        color: colors.text,
                      }}>{method.title}</h4>
                      <p style={{
                        ...typography.body,
                        fontSize: "0.95rem",
                        color: colors.textLight,
                        margin: 0,
                      }}>{method.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location Orb */}
            <div>
              <h3 style={{
                ...typography.heading,
                fontSize: "1.5rem",
                fontWeight: 600,
                margin: "0 0 16px 0",
                color: colors.text,
              }}>Our Location</h3>
              <motion.div 
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
                  <p style={{
                    ...typography.body,
                    color: colors.textLight,
                    fontSize: "1rem",
                    margin: 0,
                  }}>Interactive Map</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};