"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "@/app/context/ThemeContext";
import styles from './UseCaseCarousel.module.css';

interface UseCase {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
}

export const UseCaseCarousel: React.FC = () => {
  const { theme, colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Use case data with SVG icons
  const useCases: UseCase[] = [
    {
      id: 'data-pipelines',
      title: 'Automate Data Pipelines',
      description: 'Streamline your data workflows with intelligent automation that processes, transforms, and delivers insights in real-time.',
      benefits: ['95% faster processing', 'Zero manual errors', 'Real-time insights'],
      gradient: `linear-gradient(135deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
      accentColor: colors.primaryAccent,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="8" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
          <rect x="4" y="20" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
          <rect x="4" y="32" width="8" height="8" rx="2" fill="currentColor" opacity="0.4"/>
          <rect x="20" y="14" width="8" height="8" rx="2" fill="currentColor"/>
          <rect x="20" y="26" width="8" height="8" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="36" y="20" width="8" height="8" rx="2" fill="currentColor"/>
          <path d="M12 12L20 18M12 24L20 18M12 36L20 30M28 18L36 24M28 30L36 24" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        </svg>
      )
    },
    {
      id: 'ai-dashboards',
      title: 'AI-Powered Dashboards',
      description: 'Transform raw data into intelligent, predictive dashboards that anticipate trends and recommend actions.',
      benefits: ['Predictive analytics', 'Smart recommendations', 'Interactive visualizations'],
      gradient: `linear-gradient(135deg, ${colors.secondaryAccent}, #FF6B9D)`,
      accentColor: colors.secondaryAccent,
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="15" cy="18" r="3" fill="currentColor" opacity="0.8"/>
          <circle cx="24" cy="15" r="2" fill="currentColor"/>
          <circle cx="33" cy="21" r="2.5" fill="currentColor" opacity="0.6"/>
          <path d="M12 18L21 15L27 21L36 12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="10" y="34" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="18" y="36" width="4" height="6" rx="1" fill="currentColor"/>
          <rect x="26" y="32" width="4" height="10" rx="1" fill="currentColor" opacity="0.8"/>
          <rect x="34" y="35" width="4" height="7" rx="1" fill="currentColor" opacity="0.6"/>
        </svg>
      )
    },
    {
      id: 'security-modules',
      title: 'Enterprise Security Modules',
      description: 'Deploy bulletproof security frameworks with advanced threat detection, encryption, and compliance monitoring.',
      benefits: ['99.9% threat prevention', 'Compliance ready', 'Zero-trust architecture'],
      gradient: `linear-gradient(135deg, #FF6B9D, #4ECDC4)`,
      accentColor: '#FF6B9D',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L36 10V22C36 32 30 40 24 44C18 40 12 32 12 22V10L24 4Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M21 20L23 22L27 18" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="20" y="28" width="8" height="4" rx="1" fill="currentColor" opacity="0.7"/>
          <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="32" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="18" cy="32" r="1" fill="currentColor" opacity="0.4"/>
          <circle cx="30" cy="32" r="1" fill="currentColor" opacity="0.4"/>
        </svg>
      )
    },
    {
      id: 'cloud-infrastructure',
      title: 'Scalable Cloud Infrastructure',
      description: 'Build resilient, auto-scaling cloud architectures that grow with your business and optimize costs.',
      benefits: ['Auto-scaling', '99.99% uptime', '60% cost reduction'],
      gradient: `linear-gradient(135deg, #4ECDC4, #45B7D1)`,
      accentColor: '#4ECDC4',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <ellipse cx="24" cy="28" rx="16" ry="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
          <ellipse cx="24" cy="20" rx="12" ry="6" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8"/>
          <ellipse cx="24" cy="12" rx="8" ry="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="18" cy="20" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="30" cy="20" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="15" cy="28" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="24" cy="28" r="1.5" fill="currentColor" opacity="0.5"/>
          <circle cx="33" cy="28" r="1.5" fill="currentColor" opacity="0.5"/>
          <path d="M24 8V16M24 16V24M24 24V32" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        </svg>
      )
    },
    {
      id: 'mobile-apps',
      title: 'Cross-Platform Mobile Apps',
      description: 'Develop native-quality mobile experiences that work seamlessly across iOS, Android, and web platforms.',
      benefits: ['Native performance', 'Single codebase', 'Faster deployment'],
      gradient: `linear-gradient(135deg, #45B7D1, #96CEB4)`,
      accentColor: '#45B7D1',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="4" width="18" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="22" y="12" width="18" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="17" cy="8" r="1" fill="currentColor"/>
          <circle cx="31" cy="16" r="1" fill="currentColor"/>
          <rect x="11" y="12" width="12" height="8" rx="2" fill="currentColor" opacity="0.3"/>
          <rect x="25" y="20" width="12" height="8" rx="2" fill="currentColor" opacity="0.5"/>
          <rect x="11" y="22" width="5" height="2" rx="1" fill="currentColor" opacity="0.6"/>
          <rect x="18" y="22" width="5" height="2" rx="1" fill="currentColor" opacity="0.4"/>
          <rect x="25" y="30" width="5" height="2" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="32" y="30" width="5" height="2" rx="1" fill="currentColor" opacity="0.5"/>
        </svg>
      )
    },
    {
      id: 'api-integration',
      title: 'Seamless API Integration',
      description: 'Connect and orchestrate multiple services with robust API gateways, webhooks, and real-time synchronization.',
      benefits: ['Real-time sync', 'Error resilience', 'Scalable architecture'],
      gradient: `linear-gradient(135deg, #96CEB4, #FFEAA7)`,
      accentColor: '#96CEB4',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="36" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="24" r="4" fill="currentColor"/>
          <path d="M18 12L20 24M30 12L28 24M18 36L20 24M30 36L28 24" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="36" cy="12" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="12" cy="36" r="2" fill="currentColor" opacity="0.7"/>
          <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.7"/>
        </svg>
      )
    }
  ];

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [useCases.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % useCases.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  // Create a dark mode compatible background for the cards
  const getCardBackground = (gradient: string) => {
    if (theme === 'dark') {
      // Darken the gradient for dark mode
      return gradient.replace(/rgb(a?)\([^)]+\)/g, (match) => {
        // If it's already a gradient, we'll darken it
        return match.replace(/(\d+),\s*(\d+),\s*(\d+)/g, (rgb) => {
          const [r, g, b] = rgb.split(',').map(Number);
          // Darken the color by reducing brightness
          return `${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}`;
        });
      });
    }
    return gradient;
  };

  return (
    <div
      ref={carouselRef}
      className={`${styles.container} ${isVisible ? '' : styles.hidden}`}
    >
      {/* Header */}
      <div className={styles.header}>
        <h2
          className={`${styles.title} ${theme === 'dark' ? styles.titleDark : styles.titleLight}`}
        >
          Real-World Solutions
        </h2>
        <p
          className={`${styles.subtitle} ${theme === 'dark' ? styles.subtitleDark : styles.subtitleLight}`}
        >
         From system design to cloud deployment, we deliver cutting-edge software that solves complex business challenges at scale.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className={styles.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards */}
        <div
          className={styles.cardsWrapper}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className={styles.card}
              style={{
                background: getCardBackground(useCase.gradient),
              }}
              onClick={() => {
                // Handle card click for more details
                console.log(`Viewing details for: ${useCase.title}`);
              }}
            >
              {/* Card Content */}
              <div
                className={`${styles.cardContent} ${theme === 'dark' ? styles.cardContentDark : styles.cardContentLight}`}
              >
                {/* Top Section */}
                <div>
                  {/* Icon */}
                  <div
                    className={`${styles.iconWrapper} ${index === currentIndex ? styles.iconActive : styles.iconInactive}`}
                  >
                    {useCase.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={`${styles.titleWrapper} ${index === currentIndex ? styles.titleActive : styles.titleInactive}`}
                  >
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`${styles.descriptionWrapper} ${index === currentIndex ? styles.descriptionActive : styles.descriptionInactive}`}
                  >
                    {useCase.description}
                  </p>
                </div>

                {/* Benefits */}
                <div>
                  <div
                    className={styles.benefitsContainer}
                  >
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <span
                        key={benefit}
                        className={`${styles.benefitTag} ${theme === 'dark' ? styles.benefitTagDark : styles.benefitTagLight} ${index === currentIndex ? styles.benefitTagActive : styles.benefitTagInactive}`}
                        style={{
                          transition: `all 0.6s ease ${0.2 + benefitIndex * 0.1}s`,
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className={`${styles.ctaButton} ${theme === 'dark' ? styles.ctaButtonDark : styles.ctaButtonLight} ${index === currentIndex ? styles.ctaButtonActive : styles.ctaButtonInactive}`}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className={`${styles.arrowButton} ${styles.prevButton} ${theme === 'dark' ? styles.arrowButtonDark : styles.arrowButtonLight}`}
        >
          ←
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className={`${styles.arrowButton} ${styles.nextButton} ${theme === 'dark' ? styles.arrowButtonDark : styles.arrowButtonLight}`}
        >
          →
        </button>
      </div>

      {/* Dots Indicator */}
      <div
        className={styles.dotsContainer}
      >
        {useCases.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dotButton} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            title={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};