"use client";
import React, { useState, useEffect } from "react";
import { AdaptiveLumenNav } from "@pixelsandpetals/ui";
import { BlobMenu } from "@/app/components/BlobMenu";
import { CommandPalette } from "@/app/components/CommandPalette";
import { PixelsPetalsLogo } from "@/app/components/PixelsPetalsLogo";
import { ThemeToggle } from "@/app/components/ThemeToggle/ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './EnhancedHeader/EnhancedHeader.module.css';

const navItems = [
  { id: "home", label: "Home", href: "#home-section" },
  { id: "projects", label: "Solutions", href: "#projects-section" },
  { id: "clients", label: "Partners", href: "#clients-section" },
  { id: "about", label: "About", href: "#about-section" },
  { id: "contact", label: "Connect", href: "#contact-section" },
  { id: "resume", label: "Resume", href: "/resume.pdf" },
];

const contextualSuggestions = [
  {
    id: "start-project",
    text: "Start Your Project?",
    icon: "🚀",
    action: () => {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      return timeOnPage > 30 || scrollPosition > 1500;
    }
  },
  {
    id: "explore-expertise",
    text: "Explore All Expertise",
    icon: "🧠",
    action: () => {
      document.getElementById("about-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      return scrollPosition > 2000;
    }
  },
  {
    id: "view-case-studies",
    text: "View Case Studies",
    icon: "📊",
    action: () => {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: 'smooth' });
    },
    condition: (scrollPosition: number, timeOnPage: number, currentPage: string) => {
      return scrollPosition > 2500 && scrollPosition < 3500;
    }
  }
];

export default function EnhancedHeader() {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState("home");

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.href.substring(1))
      }));

      let currentSection = "home";

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Create nav items with active state
  const navItemsWithActive = navItems.map(item => ({
    ...item,
    active: activeSection === item.id
  }));

  type NavItem = typeof navItems[number];

  const handleItemClick = (item: NavItem) => {
    const element = document.getElementById(item.href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);

    // Simple search logic
    const searchTerm = query.toLowerCase();
    if (searchTerm.includes("project") || searchTerm.includes("portfolio") || searchTerm.includes("work")) {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (searchTerm.includes("contact") || searchTerm.includes("hire") || searchTerm.includes("get in touch")) {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (searchTerm.includes("about") || searchTerm.includes("team") || searchTerm.includes("company")) {
      document.getElementById("about-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (searchTerm.includes("client") || searchTerm.includes("testimonial") || searchTerm.includes("review")) {
      document.getElementById("clients-section")?.scrollIntoView({ behavior: 'smooth' });
    } else if (searchTerm.includes("service") || searchTerm.includes("expertise") || searchTerm.includes("skill")) {
      document.getElementById("about-section")?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Default to projects if no specific match
      document.getElementById("projects-section")?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AdaptiveLumenNav
        items={navItemsWithActive}
        logo={<PixelsPetalsLogo width={320} height={84} />}
        onItemClick={handleItemClick}
        onSearch={handleSearch}
        contextualSuggestions={contextualSuggestions}
        className={styles.enhancedLumenNav}
        themeColors={{
          backgroundColor: `${colors.glassBackground}`,
          textColor: colors.textPrimary,
          borderColor: colors.glassBorder,
        }}
        themeToggle={<ThemeToggle />}
      />

      <BlobMenu />
      <CommandPalette />
    </>
  );
};