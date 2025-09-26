"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './ConnectionNexus/ConnectionNexus.module.css';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaMedium, FaStackOverflow, FaNewspaper, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { useContentItem } from "@/lib/hooks/useContent";

export const ConnectionNexus: React.FC = () => {
  const { theme, colors } = useTheme();
  const { content: contactContent, loading, error } = useContentItem(undefined, 'contact', 'page');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
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

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
      setErrorMessage("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  // Icon mapping for contact methods
  const iconMap: Record<string, React.ReactNode> = {
    'email': <FaEnvelope />,
    'phone': <FaPhone />,
    'building': <FaBuilding />
  };

  const socialIconMap: Record<string, React.ReactNode> = {
    'linkedin': <FaLinkedin />,
    'github': <FaGithub />,
    'medium': <FaMedium />,
    'newsletter': <FaNewspaper />,
    'stackoverflow': <FaStackOverflow />
  };

  // Fallback data
  const fallbackContactMethods = [
    {
      title: "Email",
      value: "info@pixelspetals.com",
      icon: <FaEnvelope />,
      action: "mailto:info@pixelspetals.com"
    },
    {
      title: "Phone",
      value: "+1 (619) 609-6099",
      icon: <FaPhone />,
      action: "tel:+1 (619) 609-6099"
    },
    {
      title: "Office",
      value: "San Diego, CA",
      icon: <FaBuilding />,
      action: "#"
    }
  ];

  const fallbackSocialLinks = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ravivalluri/" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/ravivalluri" },
    { name: "Medium", icon: <FaMedium />, url: "https://medium.com/@ravivalluri" },
    { name: "SubStack", icon: <FaNewspaper />, url: "https://substack.com/@bloodfeather?"},
    { name: "StackOverflow", icon: <FaStackOverflow />, url: "https://stackoverflow.com/users/10908679/compileravi"}
  ];

  // Get dynamic content or use fallbacks
  const sectionTitle = contactContent?.content?.hero?.title || "Connection Nexus";
  const sectionSubtitle = contactContent?.content?.hero?.subtitle || "Open a direct, transparent channel for communication";

  const directChannelsTitle = contactContent?.content?.directChannels?.title || "Direct Channels";
  const locationTitle = contactContent?.content?.location?.title || "Our Location";
  const socialTitle = contactContent?.content?.socialLinks?.title || "Connect";

  // Transform API data to component format
  const contactMethods = contactContent?.content?.directChannels?.methods?.map(method => ({
    title: method.title,
    value: method.value,
    icon: iconMap[method.icon] || <FaEnvelope />,
    action: method.action
  })) || fallbackContactMethods;

  const socialLinks = contactContent?.content?.socialLinks?.links?.map(link => ({
    name: link.name,
    icon: socialIconMap[link.icon] || <FaLinkedin />,
    url: link.url
  })) || fallbackSocialLinks;

  if (loading) {
    return (
      <section className={styles.section} style={{
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`,
        padding: "80px 20px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}>
        <div style={{ color: colors.textPrimary, fontSize: '1.2rem' }}>Loading contact information...</div>
      </section>
    );
  }

  if (error) {
    console.warn('Failed to load contact content, using fallback:', error);
  }

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
          {sectionTitle}
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
          {sectionSubtitle}
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
              
              {submitStatus === 'error' && errorMessage && (
                <div
                  className={`${styles.statusMessage} ${styles.statusMessageError}`}
                  style={{
                    color: theme === 'dark' ? '#f87171' : '#dc2626',
                  }}
                >
                    {errorMessage}
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
                {directChannelsTitle}
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
                    <div style={{ textAlign: "left" }}>
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
                      <a
                        href={method.action}
                        className={styles.methodValue}
                        style={{
                          ...typography.body,
                          fontSize: "0.95rem",
                          color: colors.textSubtle,
                          margin: 0,
                          textDecoration: 'none'
                        }}
                      >
                        {method.value}
                      </a>
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
                {locationTitle}
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429158.3724717658!2d-117.389534!3d32.8245525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1678886358539!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  style={{ border:0, borderRadius: '12px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3
                style={{
                  ...typography.heading,
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  margin: "16px 0 16px 0",
                  color: colors.textPrimary,
                }}
              >
                {socialTitle}
              </h3>
              <div className={styles.socialLinksContainer} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLinkItem}
                    style={{
                      ...glassSubtle,
                      padding: '12px',
                      borderRadius: '12px',
                      color: colors.textPrimary,
                      display: 'inline-block',
                      fontSize: '1.5rem',
                    }}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
