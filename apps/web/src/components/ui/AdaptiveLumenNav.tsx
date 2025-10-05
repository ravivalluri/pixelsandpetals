"use client";
import React from 'react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface AdaptiveLumenNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
  onItemClick?: (item: NavItem) => void;
  onSearch?: (query: string) => void;
  contextualSuggestions?: any[];
  className?: string;
  themeColors?: any;
  themeToggle?: React.ReactNode;
}

export const AdaptiveLumenNav: React.FC<AdaptiveLumenNavProps> = ({
  items,
  logo,
  onItemClick,
  themeToggle,
}) => {
  const handleClick = (e: React.MouseEvent, item: NavItem) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(item.href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    onItemClick?.(item);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo}
          </div>

          {/* Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                className={`text-sm font-medium transition-colors hover:text-[#ff6f61] ${
                  item.active ? 'text-[#ff6f61]' : 'text-gray-700'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center">
            {themeToggle}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Open navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
