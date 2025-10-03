import React, { useState, useEffect, useRef } from 'react';
import { colors, spacing, typography } from '..';

interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface ContextualSuggestion {
  id: string;
  text: string;
  icon: string;
  action: () => void;
  condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => boolean;
}

interface AdaptiveLumenNavProps {
  items: NavItem[];
  logo?: React.ReactNode | string;
  onItemClick?: (item: NavItem) => void;
  onSearch?: (query: string) => void;
  contextualSuggestions?: ContextualSuggestion[];
  className?: string;
  themeColors?: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  themeToggle?: React.ReactNode;
}

export const AdaptiveLumenNav: React.FC<AdaptiveLumenNavProps> = ({
  items,
  logo,
  onItemClick,
  onSearch,
  contextualSuggestions = [],
  className = '',
  themeColors,
  themeToggle,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeContextualSuggestion, setActiveContextualSuggestion] = useState<ContextualSuggestion | null>(null);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [logoGlow, setLogoGlow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      // Trigger logo glow on fast scrolling
      if (Math.abs(position - scrollPosition) > 50) {
        setLogoGlow(true);
        setTimeout(() => setLogoGlow(false), 1000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check for contextual suggestions based on user behavior
    const currentPage = window.location.pathname;
    const suggestion = contextualSuggestions.find(s =>
      s.condition(scrollPosition, timeOnPage, currentPage)
    );
    setActiveContextualSuggestion(suggestion || null);
  }, [scrollPosition, timeOnPage, contextualSuggestions]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemClick = (item: NavItem) => {
    onItemClick?.(item);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const getNavOpacity = () => {
    if (scrollPosition < 100) return 0.7;
    if (scrollPosition < 300) return 0.7 + (scrollPosition - 100) * 0.002;
    return 0.95;
  };

  const getBackdropBlur = () => {
    if (scrollPosition < 100) return 'blur(4px)';
    if (scrollPosition < 300) return `blur(${4 + (scrollPosition - 100) * 0.02}px)`;
    return 'blur(8px)';
  };

  const shouldShowLightRim = () => scrollPosition > 200;

  return (
    <nav
      ref={navRef}
      className={`adaptive-lumen-nav ${className}`}
      style={{
        position: 'fixed',
        top: spacing[4],
        left: spacing[4],
        right: spacing[4],
        zIndex: 1000,
        backgroundColor: themeColors?.backgroundColor || `rgba(240, 248, 255, ${getNavOpacity()})`,
        backdropFilter: getBackdropBlur(),
        WebkitBackdropFilter: getBackdropBlur(),
        border: shouldShowLightRim() ? `1px solid ${themeColors?.borderColor || 'rgba(102, 153, 255, 0.2)'}` : '1px solid rgba(102, 153, 255, 0.1)',
        borderRadius: '50px',
        boxShadow: shouldShowLightRim() ? '0 8px 32px rgba(102, 153, 255, 0.15)' : '0 4px 20px rgba(102, 153, 255, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: `${spacing[3]}px ${spacing[6]}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => window.location.href = '/'}
        >
          {typeof logo === 'string' ? (
            <span
              style={{
                fontFamily: typography.fonts.heading,
                fontSize: `${typography.fontSizes['2xl']}px`,
                fontWeight: typography.fontWeights.bold,
                color: themeColors?.textColor || colors.textDark,
                transition: 'color 0.3s ease',
                textShadow: logoGlow ? `0 0 20px rgba(153, 102, 204, 0.6)` : 'none',
              }}
            >
              {logo}
            </span>
          ) : (
            logo
          )}

          {logoGlow && (
            <div
              style={{
                position: 'absolute',
                inset: '-15px',
                background: 'radial-gradient(ellipse, rgba(153, 102, 204, 0.3) 0%, transparent 70%)',
                borderRadius: '20px',
                animation: 'pulse 1s ease-out',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Search Interface */}
        {isSearchOpen ? (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              backgroundColor: 'rgba(240, 248, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: `0 ${spacing[6]}px`,
              animation: 'searchExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '600px' }}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search our expertise, projects, or insights..."
                style={{
                  width: '100%',
                  padding: `${spacing[3]}px ${spacing[4]}px`,
                  border: '2px solid rgba(102, 153, 255, 0.3)',
                  borderRadius: '25px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 0 rgba(102, 153, 255, 0.3)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(102, 153, 255, 0.6)';
                  e.target.style.boxShadow = '0 0 20px rgba(102, 153, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(102, 153, 255, 0.3)';
                  e.target.style.boxShadow = '0 0 0 rgba(102, 153, 255, 0.3)';
                }}
              />
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              style={{
                marginLeft: spacing[4],
                padding: spacing[2],
                background: 'none',
                border: 'none',
                color: themeColors?.textColor || colors.textDark,
                fontSize: '24px',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(102, 153, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            {/* Navigation Items - Hidden on mobile */}
            {!isMobile && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[6],
                }}
              >
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item);
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    fontFamily: typography.fonts.body,
                    fontSize: `${typography.fontSizes.base}px`,
                    color: item.active ? colors.primaryAccent : (themeColors?.textColor || colors.textDark),
                    textDecoration: 'none',
                    fontWeight: item.active ? typography.fontWeights.semibold : typography.fontWeights.medium,
                    position: 'relative',
                    padding: `${spacing[2]}px 0`,
                    transition: 'color 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}

                  {/* Liquid Glow Underline */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      height: '2px',
                      backgroundColor: colors.primaryAccent,
                      borderRadius: '1px',
                      transform: 'translateX(-50%)',
                      width: item.active ? '100%' : (hoveredItem === item.id ? '100%' : '0%'),
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: item.active || hoveredItem === item.id ? `0 0 8px rgba(102, 153, 255, 0.6)` : 'none',
                    }}
                  />

                  {/* Hover Ripple Effect */}
                  {hoveredItem === item.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '120%',
                        height: '120%',
                        background: 'radial-gradient(circle, rgba(102, 153, 255, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'ripple 0.6s ease-out',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </a>
              ))}
              </div>
            )}

            {/* Right Side Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
              }}
            >
              {/* Contextual Orb - Hidden on mobile */}
              {!isMobile && activeContextualSuggestion && (
                <div
                  onClick={activeContextualSuggestion.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[2],
                    padding: `${spacing[2]}px ${spacing[3]}px`,
                    backgroundColor: 'rgba(153, 102, 204, 0.1)',
                    border: '1px solid rgba(153, 102, 204, 0.3)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(153, 102, 204, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(153, 102, 204, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ fontSize: '14px' }}>{activeContextualSuggestion.icon}</span>
                  <span
                    style={{
                      fontFamily: typography.fonts.body,
                      fontSize: `${typography.fontSizes.sm}px`,
                      color: colors.primaryAccent,
                      fontWeight: typography.fontWeights.medium,
                    }}
                  >
                    {activeContextualSuggestion.text}
                  </span>
                </div>
              )}

              {/* Theme Toggle */}
              {themeToggle && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {themeToggle}
                </div>
              )}

              {/* Search Icon - Hidden on mobile */}
              {!isMobile && (
                <button
                onClick={() => setIsSearchOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: themeColors?.textColor || colors.textDark,
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: spacing[2],
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(102, 153, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                🔍
              </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes searchExpand {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes ripple {
          from {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(0.5);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        .adaptive-lumen-nav input::placeholder {
          color: rgba(60, 74, 92, 0.6);
        }

        .adaptive-lumen-nav input:focus::placeholder {
          color: rgba(60, 74, 92, 0.4);
        }
      `}</style>
    </nav>
  );
};