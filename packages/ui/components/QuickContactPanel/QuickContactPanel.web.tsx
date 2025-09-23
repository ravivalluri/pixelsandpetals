import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius } from '../../tokens';
import { Button } from '../Button/Button.web';

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export interface QuickContactPanelProps {
  contactInfo?: ContactInfo;
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  style?: React.CSSProperties;
  position?: 'left' | 'right';
}

export const QuickContactPanel: React.FC<QuickContactPanelProps> = ({
  contactInfo,
  onSubmit,
  style,
  position = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
      setFormData({ name: '', email: '', message: '' });
      setIsOpen(false);
    }
  };

  const triggerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    [position]: 0,
    transform: 'translateY(-50%)',
    backgroundColor: colors.accentPop,
    color: colors.white,
    border: 'none',
    padding: `${spacing[4]}px ${spacing[2]}px`,
    borderRadius: position === 'right' ? `${borderRadius.lg}px 0 0 ${borderRadius.lg}px` : `0 ${borderRadius.lg}px ${borderRadius.lg}px 0`,
    cursor: 'pointer',
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    writingMode: 'vertical-lr',
    textOrientation: 'mixed',
    boxShadow: `0 4px 20px ${colors.accentPop}40`,
    transition: 'all 0.3s ease',
    zIndex: 1000,
    // ':hover' pseudo-selector is not supported in inline styles.
    // Hover effects are handled via onMouseEnter and onMouseLeave below.
  };

  const panelStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    [position]: isOpen ? 0 : -400,
    width: 400,
    height: '100vh',
    backgroundColor: colors.background,
    boxShadow: `0 0 50px ${colors.darkGray}30`,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    ...style,
  };

  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  };

  const headerStyles: React.CSSProperties = {
    padding: spacing[6],
    borderBottom: `1px solid ${colors.lightGray}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    padding: spacing[6],
    overflowY: 'auto',
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: spacing[3],
    border: `1px solid ${colors.lightGray}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSizes.base,
    marginBottom: spacing[4],
    transition: 'border-color 0.3s ease',
    // Focus styles should be handled via CSS class or styled-components
  };

  const textareaStyles: React.CSSProperties = {
    ...inputStyles,
    minHeight: 120,
    resize: 'vertical',
    fontFamily: typography.fonts.body,
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        style={triggerStyles}
        onClick={() => setIsOpen(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) translateX(-4px)';
          e.currentTarget.style.boxShadow = `0 6px 30px ${colors.accentPop}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%)';
          e.currentTarget.style.boxShadow = `0 4px 20px ${colors.accentPop}40`;
        }}
      >
        Contact Us
      </button>

      {/* Overlay */}
      <div
        style={overlayStyles}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <div style={panelStyles}>
        {/* Header */}
        <div style={headerStyles}>
          <h3 style={{
            fontSize: typography.fontSizes.xl,
            fontWeight: typography.fontWeights.bold,
            color: colors.coreDark,
            margin: 0,
          }}>
            Quick Contact
          </h3>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: typography.fontSizes.xl,
              color: colors.mediumGray,
              cursor: 'pointer',
              padding: spacing[1],
            }}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={contentStyles}>
          {/* Contact Info */}
          {contactInfo && (
            <div style={{ marginBottom: spacing[6] }}>
              <h4 style={{
                fontSize: typography.fontSizes.base,
                fontWeight: typography.fontWeights.semibold,
                color: colors.coreDark,
                marginBottom: spacing[3],
              }}>
                Get in Touch
              </h4>

              {contactInfo.phone && (
                <div style={{ marginBottom: spacing[2] }}>
                  <span style={{ color: colors.accentPop, marginRight: spacing[2] }}>📞</span>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    style={{
                      color: colors.darkGray,
                      textDecoration: 'none',
                      fontSize: typography.fontSizes.sm,
                    }}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}

              {contactInfo.email && (
                <div style={{ marginBottom: spacing[2] }}>
                  <span style={{ color: colors.accentPop, marginRight: spacing[2] }}>✉️</span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      color: colors.darkGray,
                      textDecoration: 'none',
                      fontSize: typography.fontSizes.sm,
                    }}
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}

              {contactInfo.address && (
                <div style={{ marginBottom: spacing[2] }}>
                  <span style={{ color: colors.accentPop, marginRight: spacing[2] }}>📍</span>
                  <span style={{
                    color: colors.darkGray,
                    fontSize: typography.fontSizes.sm,
                  }}>
                    {contactInfo.address}
                  </span>
                </div>
              )}

              {contactInfo.hours && (
                <div style={{ marginBottom: spacing[2] }}>
                  <span style={{ color: colors.accentPop, marginRight: spacing[2] }}>🕒</span>
                  <span style={{
                    color: colors.darkGray,
                    fontSize: typography.fontSizes.sm,
                  }}>
                    {contactInfo.hours}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <h4 style={{
              fontSize: typography.fontSizes.base,
              fontWeight: typography.fontWeights.semibold,
              color: colors.coreDark,
              marginBottom: spacing[4],
            }}>
              Send us a Message
            </h4>

            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={inputStyles}
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={inputStyles}
              required
            />

            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={textareaStyles}
              required
            />

            <Button
              title="Send Message"
              onPress={() => {}}
              style={{
                width: '100%',
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};