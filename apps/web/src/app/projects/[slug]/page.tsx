'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';
import { useContentItem } from '@/lib/hooks/useContent';
import styles from './ProjectDetail.module.css';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { theme, colors } = useTheme();
  const { content: projectContent, loading, error } = useContentItem(undefined, slug as string, 'project');

  // Apply theme to body
  React.useEffect(() => {
    document.body.style.background = `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`;
    document.body.style.transition = 'background 0.3s ease';
    document.body.style.minHeight = '100vh';
  }, [colors]);

  // Update document title
  React.useEffect(() => {
    if (projectContent?.title) {
      document.title = `${projectContent.title} - Pixels & Petals`;
    }
  }, [projectContent]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`
      }}>
        <div style={{ color: colors.textPrimary, fontSize: '1.2rem' }}>Loading project...</div>
      </div>
    );
  }

  if (error || !projectContent) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primaryBackground} 0%, ${colors.secondaryBackground} 100%)`
      }}>
        <div style={{ color: colors.textPrimary, fontSize: '1.5rem', marginBottom: '1rem' }}>Project Not Found</div>
        <div style={{ color: colors.textSubtle, fontSize: '1rem' }}>The project "{slug}" could not be found.</div>
        <a
          href="/"
          style={{
            color: colors.primaryAccent,
            textDecoration: 'underline',
            marginTop: '2rem',
            fontSize: '1.1rem'
          }}
        >
          ← Back to Home
        </a>
      </div>
    );
  }

  const content = projectContent.content;

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.containerDark : styles.containerLight}`}>
      {/* Hero Section */}
      <section className={`${styles.hero} ${theme === 'dark' ? styles.heroDark : styles.heroLight}`}>
        <div className={styles.heroContent}>
          <h1
            className={`${styles.title} ${theme === 'dark' ? styles.titleDark : styles.titleLight}`}
          >
            {content?.hero?.title || projectContent.title}
          </h1>
          <p
            className={`${styles.subtitle} ${theme === 'dark' ? styles.subtitleDark : styles.subtitleLight}`}
          >
            {content?.hero?.subtitle}
          </p>

          {content?.hero && (
            <div className={`${styles.projectMeta} ${theme === 'dark' ? styles.projectMetaDark : styles.projectMetaLight}`}>
              {content.hero.status && (
                <div className={styles.metaItem}>
                  <strong>Status:</strong> {content.hero.status}
                </div>
              )}
              {content.hero.client && (
                <div className={styles.metaItem}>
                  <strong>Client:</strong> {content.hero.client}
                </div>
              )}
              {content.hero.duration && (
                <div className={styles.metaItem}>
                  <strong>Duration:</strong> {content.hero.duration}
                </div>
              )}
              {content.hero.team && (
                <div className={styles.metaItem}>
                  <strong>Team:</strong> {content.hero.team}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Overview Section */}
      {content?.overview && (
        <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`}>
              Overview
            </h2>

            {content.overview.description && (
              <div className={styles.subsection}>
                <p className={`${styles.description} ${theme === 'dark' ? styles.descriptionDark : styles.descriptionLight}`}>
                  {content.overview.description}
                </p>
              </div>
            )}

            {content.overview.challenge && (
              <div className={styles.subsection}>
                <h3 className={`${styles.subsectionTitle} ${theme === 'dark' ? styles.subsectionTitleDark : styles.subsectionTitleLight}`}>
                  Challenge
                </h3>
                <p className={`${styles.description} ${theme === 'dark' ? styles.descriptionDark : styles.descriptionLight}`}>
                  {content.overview.challenge}
                </p>
              </div>
            )}

            {content.overview.solution && (
              <div className={styles.subsection}>
                <h3 className={`${styles.subsectionTitle} ${theme === 'dark' ? styles.subsectionTitleDark : styles.subsectionTitleLight}`}>
                  Solution
                </h3>
                <p className={`${styles.description} ${theme === 'dark' ? styles.descriptionDark : styles.descriptionLight}`}>
                  {content.overview.solution}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Technologies Section */}
      {content?.technologies && (
        <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`}>
              Technologies
            </h2>
            <div className={`${styles.techGrid} ${theme === 'dark' ? styles.techGridDark : styles.techGridLight}`}>
              {content.technologies.map((tech: string, index: number) => (
                <div
                  key={index}
                  className={`${styles.techTag} ${theme === 'dark' ? styles.techTagDark : styles.techTagLight}`}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {content?.features && (
        <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`}>
              Key Features
            </h2>
            <ul className={`${styles.featureList} ${theme === 'dark' ? styles.featureListDark : styles.featureListLight}`}>
              {content.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className={`${styles.featureItem} ${theme === 'dark' ? styles.featureItemDark : styles.featureItemLight}`}
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Results Section */}
      {content?.results?.metrics && (
        <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`}>
              Results & Impact
            </h2>
            <div className={`${styles.metricsGrid} ${theme === 'dark' ? styles.metricsGridDark : styles.metricsGridLight}`}>
              {content.results.metrics.map((metric: any, index: number) => (
                <div
                  key={index}
                  className={`${styles.metricCard} ${theme === 'dark' ? styles.metricCardDark : styles.metricCardLight}`}
                >
                  <div className={`${styles.metricLabel} ${theme === 'dark' ? styles.metricLabelDark : styles.metricLabelLight}`}>
                    {metric.label}
                  </div>
                  <div className={`${styles.metricValue} ${theme === 'dark' ? styles.metricValueDark : styles.metricValueLight}`}>
                    {metric.value}
                  </div>
                  {metric.improvement && (
                    <div className={styles.metricImprovement}>
                      {metric.improvement}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {content?.gallery && (
        <section className={`${styles.section} ${theme === 'dark' ? styles.sectionDark : styles.sectionLight}`}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${theme === 'dark' ? styles.sectionTitleDark : styles.sectionTitleLight}`}>
              Gallery
            </h2>
            <div className={styles.gallery}>
              {content.gallery.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`${styles.galleryItem} ${theme === 'dark' ? styles.galleryItemDark : styles.galleryItemLight}`}
                >
                  <img
                    src={image}
                    alt={`${projectContent.title} screenshot ${index + 1}`}
                    className={styles.galleryImage}
                    onError={(e) => {
                      // Hide broken images
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className={`${styles.navigation} ${theme === 'dark' ? styles.navigationDark : styles.navigationLight}`}>
        <a
          href="/#projects-section"
          className={`${styles.backButton} ${theme === 'dark' ? styles.backButtonDark : styles.backButtonLight}`}
        >
          ← Back to Projects
        </a>
      </section>
    </div>
  );
}