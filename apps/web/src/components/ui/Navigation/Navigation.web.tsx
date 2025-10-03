import React, { useState } from 'react';
import { typography, spacing } from '..';
import { Button } from '../Button/Button.web';


export interface NavigationItem {
  label: string;
  onPress: () => void;
  active?: boolean;
}

export interface NavigationProps {
  logo?: string;
  items: NavigationItem[];
  ctaButton?: {
    title: string;
    onPress: () => void;
  };
  style?: React.CSSProperties;
}

export const Navigation: React.FC<NavigationProps> = ({
  logo = 'Pixels & Petals',
  items,
  ctaButton,
  style,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing[4]}px ${spacing[6]}px`,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px) saturate(1.8)',
    WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    height: 80,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    ...style,
  };

  const logoStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const navItemsStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[6],
  };

  const navItemStyles: React.CSSProperties = {
    padding: `${spacing[2]}px ${spacing[3]}px`,
    fontSize: typography.fontSizes.base,
    fontFamily: typography.fonts.body,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: typography.fontWeights.medium,
    textDecoration: 'none',
    cursor: 'none',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  const activeNavItemStyles: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.95)',
    background: 'rgba(102, 153, 255, 0.2)',
    border: '1px solid rgba(102, 153, 255, 0.3)',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 16px rgba(102, 153, 255, 0.2)',
  };

  // Prevent unused variable warnings
  // These are kept for future mobile implementation
  void mobileMenuOpen;
  void toggleMobileMenu;

  return (
    <nav style={containerStyles}>
      {/* Top highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        }}
      />
      <h1 style={logoStyles}>{logo}</h1>

      <div style={navItemsStyles}>
        {items.map((item, index) => (
          <Button
            key={index}
            title={item.label}
            onPress={item.onPress}
            variant="subtle"
            size="sm"
            style={{
              ...navItemStyles,
              ...(item.active ? activeNavItemStyles : {}),
            }}
          />
        ))}

        {ctaButton && (
          <Button
            title={ctaButton.title}
            onPress={ctaButton.onPress}
            variant="primary"
            size="sm"
          />
        )}
      </div>
    </nav>
  );
};