"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";
import styles from './ExpertiseMatrix/ExpertiseMatrix.module.css';

interface ExpertiseNode {
  id: string;
  title: string;
  description: string;
  icon: string;
  shards: {
    id: string;
    title: string;
    description: string;
  }[];
}

const expertiseData: ExpertiseNode[] = [
  {
    id: "ai-strategy",
    title: "AI Strategy",
    description: "Guiding businesses from concept to intelligent execution",
    icon: "🧠",
    shards: [
      {
        id: "ml",
        title: "Machine Learning",
        description: "Implementing predictive models for data-driven decisions"
      },
      {
        id: "ethical-ai",
        title: "Ethical AI",
        description: "Ensuring responsible and unbiased AI implementations"
      },
      {
        id: "data-governance",
        title: "Data Governance",
        description: "Establishing frameworks for data quality and compliance"
      }
    ]
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description: "Designing scalable and resilient cloud solutions",
    icon: "☁️",
    shards: [
      {
        id: "aws",
        title: "AWS Ecosystem",
        description: "Leveraging Amazon's comprehensive cloud services"
      },
      {
        id: "microservices",
        title: "Microservices",
        description: "Building modular, independently deployable services"
      },
      {
        id: "devops",
        title: "DevOps Integration",
        description: "Streamlining development and operations workflows"
      }
    ]
  },
  {
    id: "ui-ux-innovation",
    title: "UI/UX Innovation",
    description: "Creating intuitive and engaging user experiences",
    icon: "🎨",
    shards: [
      {
        id: "design-systems",
        title: "Design Systems",
        description: "Building consistent and scalable design languages"
      },
      {
        id: "user-research",
        title: "User Research",
        description: "Understanding user needs through qualitative analysis"
      },
      {
        id: "accessibility",
        title: "Accessibility",
        description: "Ensuring inclusive experiences for all users"
      }
    ]
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Transforming data into actionable business insights",
    icon: "📊",
    shards: [
      {
        id: "bi-tools",
        title: "BI Tools",
        description: "Implementing visualization platforms for data storytelling"
      },
      {
        id: "big-data",
        title: "Big Data Processing",
        description: "Handling large-scale data with distributed computing"
      },
      {
        id: "predictive-modeling",
        title: "Predictive Modeling",
        description: "Forecasting trends and behaviors with statistical models"
      }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Protecting digital assets with comprehensive security strategies",
    icon: "🔒",
    shards: [
      {
        id: "threat-assessment",
        title: "Threat Assessment",
        description: "Identifying and mitigating potential security risks"
      },
      {
        id: "compliance",
        title: "Compliance Frameworks",
        description: "Ensuring adherence to industry security standards"
      },
      {
        id: "incident-response",
        title: "Incident Response",
        description: "Rapid detection and containment of security breaches"
      }
    ]
  }
];

export const ExpertiseMatrix: React.FC = () => {
  const { theme, colors } = useTheme();
  const [selectedNode, setSelectedNode] = useState<ExpertiseNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [connections, setConnections] = useState<{from: string, to: string}[]>([]);

  // Generate deterministic connections between nodes
  useEffect(() => {
    const conns = [];
    for (let i = 0; i < expertiseData.length; i++) {
      for (let j = i + 1; j < expertiseData.length; j++) {
        // Use deterministic pseudo-random based on indices
        const seed = i * 31 + j * 17;
        if ((seed % 3) !== 0) {
          conns.push({from: expertiseData[i].id, to: expertiseData[j].id});
        }
      }
    }
    setConnections(conns);
  }, []);

  // Glass effect styles that adapt to theme
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

  return (
    <section 
      className={styles.expertiseMatrix}
      style={{
        background: theme === 'dark' ? colors.primaryBackground : colors.surfaceBackground,
        padding: "60px 30px",
        borderRadius: "20px",
        margin: "40px 0",
        position: "relative",
        transition: 'background 0.3s ease',
      }}
    >
      <div className={styles.header} style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <h2 
          className={styles.title}
          style={{
            ...typography.heading,
            fontSize: "2rem",
            fontWeight: 700,
            margin: "0 0 16px 0",
            textAlign: "center",
            color: colors.textPrimary,
          }}
        >
          Expertise Matrix
        </h2>
        <p 
          className={styles.subtitle}
          style={{
            ...typography.body,
            fontSize: "1.1rem",
            color: colors.textSubtle,
            marginTop: "16px",
            maxWidth: "600px",
            margin: "0 auto 48px",
            textAlign: "center",
          }}
        >
          Interactive network of our core capabilities and methodologies
        </p>
        
        <div 
          className={styles.matrixContainer}
          style={{
            position: "relative",
            minHeight: "500px",
            background: theme === 'dark' ? colors.surfaceBackground : 'rgba(255, 255, 255, 0.7)',
            borderRadius: "20px",
            border: `1px solid ${colors.glassBorder}`,
            backdropFilter: "blur(10px)",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div 
            className={styles.nodesGrid}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
              zIndex: 2,
              position: "relative",
              width: "100%",
            }}
          >
            {expertiseData.map((node) => (
              <motion.div
                key={node.id}
                className={styles.nodeCard}
                style={{
                  ...glassEnhanced,
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  ...(hoveredNode === node.id ? {
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.5)' : "rgba(255, 255, 255, 0.2)",
                    boxShadow: `0 12px 40px ${colors.primaryAccent}60`,
                    transform: "scale(1.05)",
                  } : {}),
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
                onPointerEnter={() => setTooltipNode(node.id)}
                onPointerLeave={() => setTooltipNode(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{node.icon}</div>
                <h3 
                  style={{
                    ...typography.heading,
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    margin: "0 0 12px 0",
                  }}
                >
                  {node.title}
                </h3>
                
                {/* Tooltip */}
                <AnimatePresence>
                  {tooltipNode === node.id && (
                    <motion.div
                      className={styles.tooltip}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 10px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: theme === 'dark' ? 'rgba(42, 47, 62, 0.9)' : "rgba(255, 255, 255, 0.9)",
                        color: colors.textPrimary,
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        boxShadow: theme === 'dark' 
                          ? "0 4px 20px rgba(102, 153, 255, 0.2)" 
                          : "0 4px 20px rgba(60, 74, 92, 0.15)",
                        border: `1px solid ${colors.glassBorder}`,
                        backdropFilter: "blur(10px)",
                        zIndex: 10,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      {node.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Insight Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className={styles.modalOverlay}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme === 'dark' 
                ? "rgba(10, 15, 25, 0.7)" 
                : "rgba(60, 74, 92, 0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className={styles.modalContent}
              style={{
                ...glassEnhanced,
                borderRadius: "20px",
                padding: "32px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                border: `1px solid ${colors.glassBorder}`,
                boxShadow: theme === 'dark' 
                  ? "0 20px 50px rgba(102, 153, 255, 0.2)" 
                  : "0 20px 50px rgba(60, 74, 92, 0.2)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className={styles.modalHeader}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "24px",
                  position: "relative",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginRight: "16px" }}>{selectedNode.icon}</div>
                <h2 
                  className={styles.title}
                  style={{
                    ...typography.heading,
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: colors.textPrimary,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {selectedNode.title}
                </h2>
                <button 
                  className={styles.closeButton}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "2rem",
                    color: colors.textSubtle,
                    cursor: "pointer",
                    padding: "0",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    transition: "background 0.2s",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </button>
              </div>
              
              <p 
                style={{
                  ...typography.body,
                  fontSize: "1.1rem",
                  color: colors.textPrimary,
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                {selectedNode.description}
              </p>
              
              <div style={{ marginBottom: "32px" }}>
                <h3 
                  style={{
                    ...typography.heading,
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: colors.textPrimary,
                    margin: "0 0 24px 0",
                  }}
                >
                  Key Focus Areas
                </h3>
                <div 
                  className={styles.shardsGrid}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginBottom: "32px",
                  }}
                >
                  {selectedNode.shards.map((shard) => (
                    <motion.div
                      key={shard.id}
                      className={styles.shardCard}
                      style={{
                        ...glassSubtle,
                        borderRadius: "14px",
                        padding: "20px",
                        border: `1px solid ${colors.glassBorder}`,
                        transition: "all 0.3s ease",
                      }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <h4 
                        style={{
                          ...typography.heading,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: colors.textPrimary,
                          margin: "0 0 12px 0",
                        }}
                      >
                        {shard.title}
                      </h4>
                      <p 
                        style={{
                          ...typography.body,
                          fontSize: "0.95rem",
                          color: colors.textSubtle,
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {shard.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div 
                className={styles.modalActions}
                style={{
                  display: "flex",
                  gap: "16px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button 
                  className={styles.primaryButton}
                  style={{
                    padding: "14px 28px",
                    background: `linear-gradient(90deg, ${colors.primaryAccent}, ${colors.secondaryAccent})`,
                    color: colors.textPrimary,
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Consult Our Experts
                </button>
                <button 
                  className={styles.secondaryButton}
                  style={{
                    padding: "14px 28px",
                    background: theme === 'dark' ? 'rgba(42, 47, 62, 0.7)' : "rgba(255, 255, 255, 0.7)",
                    color: colors.textPrimary,
                    border: `1px solid ${colors.glassBorder}`,
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.9)' : "rgba(255, 255, 255, 0.9)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(42, 47, 62, 0.7)' : "rgba(255, 255, 255, 0.7)";
                  }}
                >
                  View Related Projects
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};