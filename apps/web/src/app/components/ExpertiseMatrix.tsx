"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Glass effect styles
  const glassEnhanced = {
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(16px) saturate(200%)',
    WebkitBackdropFilter: 'blur(16px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    boxShadow: '0 12px 48px rgba(31, 38, 135, 0.45)',
  };
  
  const glassSubtle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px) saturate(150%)',
    WebkitBackdropFilter: 'blur(8px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(31, 38, 135, 0.25)',
  };

  const colors = {
    primary: '#6699FF',
    secondary: '#9966CC',
    accent: '#FF6F61',
    text: '#3C4A5C',
    textLight: '#8DA3B5',
    background: '#D9E8F5',
    backgroundLight: '#F0F8FF',
  };

  const typography = {
    heading: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '700',
      color: '#3C4A5C',
    },
    body: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#3C4A5C',
    },
    caption: {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '400',
      color: '#8DA3B5',
    }
  };

  return (
    <section style={{
      background: colors.backgroundLight,
      padding: "60px 30px",
      borderRadius: "20px",
      margin: "40px 0",
    }}>
      <div style={{
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
        <h2 style={{
          ...typography.heading,
          fontSize: "2rem",
          fontWeight: 700,
          margin: "0 0 16px 0",
          textAlign: "center",
          color: colors.text,
        }}>Expertise Matrix</h2>
        <p style={{
          ...typography.body,
          fontSize: "1.1rem",
          color: colors.textLight,
          marginTop: "16px",
          maxWidth: "600px",
          margin: "0 auto 48px",
          textAlign: "center",
        }}>
          Interactive network of our core capabilities and methodologies
        </p>
        
        <div style={{
          position: "relative",
          minHeight: "500px",
          background: "rgba(255, 255, 255, 0.3)",
          borderRadius: "20px",
          border: `1px solid ${colors.textLight}30`,
          backdropFilter: "blur(10px)",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* Neural Network Background */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}>
            {connections.map((conn, index) => (
              <svg 
                key={index} 
                style={{
                  position: "absolute",
                  width: "100%", 
                  height: "100%",
                }}
                width="100%" 
                height="100%"
              >
                <line 
                  x1="0" 
                  y1="0" 
                  x2="100%" 
                  y2="100%" 
                  stroke={colors.textLight} 
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </svg>
            ))}
            
            {/* Animated dots */}
            {[...Array(20)].map((_, i) => {
              // Deterministic positioning using a pseudo-random function
              const pseudoRandom = (seed: number) => {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
              };

              const leftPos = pseudoRandom(i * 23 + 17) * 100;
              const topPos = pseudoRandom(i * 37 + 29) * 100;
              const duration = 3 + pseudoRandom(i * 41 + 13) * 2;
              const delay = pseudoRandom(i * 47 + 31) * 2;

              return (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    boxShadow: `0 0 10px ${colors.primary}80`,
                    left: `${leftPos}%`,
                    top: `${topPos}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    delay,
                  }}
                />
              );
            })}
          </div>
          
          {/* Expertise Nodes */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            zIndex: 2,
            position: "relative",
            width: "100%",
          }}>
            {expertiseData.map((node) => (
              <motion.div
                key={node.id}
                style={{
                  ...glassEnhanced,
                  borderRadius: "16px",
                  padding: "24px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  ...(hoveredNode === node.id ? {
                    background: "rgba(255, 255, 255, 0.2)",
                    boxShadow: `0 12px 40px ${colors.primary}60`,
                    transform: "scale(1.05)",
                  } : {}),
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{node.icon}</div>
                <h3 style={{
                  ...typography.heading,
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: colors.text,
                  margin: "0 0 12px 0",
                }}>{node.title}</h3>
                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 10px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(255, 255, 255, 0.9)",
                        color: colors.text,
                        padding: "12px 16px",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        whiteSpace: "nowrap",
                        boxShadow: "0 4px 20px rgba(60, 74, 92, 0.15)",
                        border: `1px solid ${colors.textLight}30`,
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
      
      {/* Insight Shards Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(60, 74, 92, 0.7)",
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
              style={{
                ...glassEnhanced,
                borderRadius: "20px",
                padding: "32px",
                maxWidth: "800px",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                border: `1px solid ${colors.textLight}50`,
                boxShadow: "0 20px 50px rgba(60, 74, 92, 0.2)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
                position: "relative",
              }}>
                <div style={{ fontSize: "2.5rem", marginRight: "16px" }}>{selectedNode.icon}</div>
                <h2 style={{
                  ...typography.heading,
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: colors.text,
                  margin: 0,
                  flex: 1,
                }}>{selectedNode.title}</h2>
                <button 
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "2rem",
                    color: colors.textLight,
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
              
              <p style={{
                ...typography.body,
                fontSize: "1.1rem",
                color: colors.text,
                lineHeight: 1.7,
                marginBottom: "32px",
              }}>{selectedNode.description}</p>
              
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{
                  ...typography.heading,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: colors.text,
                  margin: "0 0 24px 0",
                }}>Key Focus Areas</h3>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "20px",
                }}>
                  {selectedNode.shards.map((shard) => (
                    <motion.div
                      key={shard.id}
                      style={{
                        ...glassSubtle,
                        borderRadius: "14px",
                        padding: "20px",
                        border: `1px solid ${colors.textLight}30`,
                        transition: "all 0.3s ease",
                      }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <h4 style={{
                        ...typography.heading,
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: colors.text,
                        margin: "0 0 12px 0",
                      }}>{shard.title}</h4>
                      <p style={{
                        ...typography.body,
                        fontSize: "0.95rem",
                        color: colors.textLight,
                        lineHeight: 1.6,
                        margin: 0,
                      }}>{shard.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}>
                <button style={{
                  padding: "14px 28px",
                  background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                  color: colors.backgroundLight,
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
                  Consult Our Experts
                </button>
                <button style={{
                  padding: "14px 28px",
                  background: "rgba(255, 255, 255, 0.7)",
                  color: colors.text,
                  border: `1px solid ${colors.textLight}50`,
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}>
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