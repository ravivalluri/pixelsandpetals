import React, { useState } from 'react';
import { colors, typography, spacing } from '../../tokens';
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
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.lightGray}`,
    height: 80,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    ...style,
  };

  const logoStyles: React.CSSProperties = {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.coreDark,
    margin: 0,
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
    color: colors.darkGray,
    fontWeight: typography.fontWeights.medium,
    textDecoration: 'none',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease',
  };

  const activeNavItemStyles: React.CSSProperties = {
    color: colors.accentPop,
    borderBottomColor: colors.accentPop,
  };

  const ctaStyles: React.CSSProperties = {
    marginLeft: spacing[4],
  };

  // Mobile styles (hidden on desktop)
  const mobileMenuStyles: React.CSSProperties = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  };

  return (
    <nav style={containerStyles}>
      <h1 style={logoStyles}>{logo}</h1>

      <div style={navItemsStyles}>
        {items.map((item, index) => (
          <button
            key={index}
            style={{
              ...navItemStyles,
              ...(item.active ? activeNavItemStyles : {}),
              background: 'none',
              border: 'none',
            }}
            onClick={item.onPress}
          >
            {item.label}
          </button>
        ))}

        {ctaButton && (
          <Button
            title={ctaButton.title}
            onPress={ctaButton.onPress}
            style={ctaStyles}
          />
        )}
      </div>
    </nav>
  );
};