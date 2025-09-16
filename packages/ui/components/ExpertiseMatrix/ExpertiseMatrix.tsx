import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView, PanResponder, Animated } from 'react-native';
import { colors, spacing, typography } from '../../tokens';

export interface ExpertiseNode {
  id: string;
  title: string;
  category: 'technical' | 'design' | 'strategy' | 'leadership';
  proficiency: number;
  connections: string[];
  description: string;
  keyInsights: string[];
  technologies: string[];
  experience: string;
  position?: { x: number; y: number };
  color: string;
}

export interface InsightShard {
  id: string;
  text: string;
  category: string;
  orbit: number;
  angle: number;
  expertiseId: string;
}

export interface ExpertiseMatrixProps {
  nodes: ExpertiseNode[];
  title?: string;
  subtitle?: string;
  onNodePress?: (node: ExpertiseNode) => void;
  style?: any;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ExpertiseMatrix: React.FC<ExpertiseMatrixProps> = ({
  nodes,
  title = "Innovation Matrix",
  subtitle = "Tap nodes to explore expertise intersections",
  onNodePress,
  style,
}) => {
  const [selectedNode, setSelectedNode] = useState<ExpertiseNode | null>(null);
  const [compareNodes, setCompareNodes] = useState<ExpertiseNode[]>([]);
  const [activeInsights, setActiveInsights] = useState<InsightShard[]>([]);
  const [spotlightVisible, setSpotlightVisible] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: screenWidth - 40, height: 400 });

  const animatedValues = useRef(
    nodes.reduce((acc, node) => ({
      ...acc,
      [node.id]: {
        scale: new Animated.Value(1),
        glow: new Animated.Value(0),
        ripple: new Animated.Value(0),
      }
    }), {} as Record<string, { scale: Animated.Value; glow: Animated.Value; ripple: Animated.Value }>)
  ).current;

  const [positionedNodes, setPositionedNodes] = useState<ExpertiseNode[]>([]);

  useEffect(() => {
    const positioned = nodes.map((node, index) => {
      if (node.position) {
        return {
          ...node,
          position: {
            x: node.position.x * containerDimensions.width,
            y: node.position.y * containerDimensions.height,
          }
        };
      }

      const angle = (index / nodes.length) * 2 * Math.PI;
      const radius = Math.min(containerDimensions.width, containerDimensions.height) * 0.3;
      const centerX = containerDimensions.width / 2;
      const centerY = containerDimensions.height / 2;

      const organicOffset = {
        x: (index * 17 + 23) % 40 - 20,
        y: (index * 13 + 31) % 30 - 15,
      };

      return {
        ...node,
        position: {
          x: centerX + Math.cos(angle) * radius + organicOffset.x,
          y: centerY + Math.sin(angle) * radius + organicOffset.y,
        }
      };
    });
    setPositionedNodes(positioned);
  }, [nodes, containerDimensions]);

  const handleNodePress = (node: ExpertiseNode) => {
    onNodePress?.(node);

    if (selectedNode?.id === node.id) {
      setSelectedNode(null);
      setActiveInsights([]);
      animateNode(node.id, 'deselect');
    } else {
      if (selectedNode) {
        animateNode(selectedNode.id, 'deselect');
      }

      setSelectedNode(node);
      setSpotlightVisible(true);
      animateNode(node.id, 'select');

      const insights: InsightShard[] = node.keyInsights.map((insight, index) => ({
        id: `${node.id}-insight-${index}`,
        text: insight,
        category: node.category,
        orbit: 60 + index * 15,
        angle: (index * 72) % 360,
        expertiseId: node.id,
      }));
      setActiveInsights(insights);
    }
  };

  const animateNode = (nodeId: string, type: 'select' | 'deselect' | 'pulse') => {
    const animations = animatedValues[nodeId];
    if (!animations) return;

    switch (type) {
      case 'select':
        Animated.parallel([
          Animated.spring(animations.scale, { toValue: 1.2, useNativeDriver: true }),
          Animated.timing(animations.glow, { toValue: 1, duration: 300, useNativeDriver: false }),
          Animated.timing(animations.ripple, { toValue: 1, duration: 600, useNativeDriver: true }),
        ]).start();
        break;
      case 'deselect':
        Animated.parallel([
          Animated.spring(animations.scale, { toValue: 1, useNativeDriver: true }),
          Animated.timing(animations.glow, { toValue: 0, duration: 300, useNativeDriver: false }),
          Animated.timing(animations.ripple, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
        break;
      case 'pulse':
        Animated.sequence([
          Animated.timing(animations.scale, { toValue: 1.1, duration: 150, useNativeDriver: true }),
          Animated.timing(animations.scale, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
        break;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'technical': return colors.blue;
      case 'design': return colors.purple;
      case 'strategy': return colors.green;
      case 'leadership': return colors.orange;
      default: return colors.accentPop;
    }
  };

  const renderNode = (node: ExpertiseNode) => {
    if (!node.position) return null;

    const animations = animatedValues[node.id];
    const isSelected = selectedNode?.id === node.id;

    return (
      <Animated.View
        key={node.id}
        style={[
          styles.expertiseNode,
          {
            left: node.position.x - 30,
            top: node.position.y - 30,
            backgroundColor: getCategoryColor(node.category),
            transform: [{ scale: animations?.scale || 1 }],
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => handleNodePress(node)}
          style={styles.nodeButton}
          activeOpacity={0.8}
        >
          <Text style={styles.nodeText}>{node.title}</Text>
          <View style={styles.proficiencyGauge}>
            <View
              style={[
                styles.proficiencyFill,
                {
                  width: `${node.proficiency}%`,
                  backgroundColor: colors.white,
                }
              ]}
            />
          </View>
        </TouchableOpacity>

        {isSelected && (
          <Animated.View
            style={[
              styles.nodeRipple,
              {
                opacity: animations?.ripple || 0,
                transform: [
                  {
                    scale: animations?.ripple?.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 2],
                    }) || 1
                  }
                ],
              }
            ]}
          />
        )}
      </Animated.View>
    );
  };

  const renderConnections = () => {
    if (!selectedNode) return null;

    return positionedNodes
      .filter(node => selectedNode.connections.includes(node.id))
      .map((connectedNode) => {
        if (!selectedNode.position || !connectedNode.position) return null;

        return (
          <View
            key={`connection-${selectedNode.id}-${connectedNode.id}`}
            style={[
              styles.connection,
              {
                left: selectedNode.position.x,
                top: selectedNode.position.y,
                width: Math.sqrt(
                  Math.pow(connectedNode.position.x - selectedNode.position.x, 2) +
                  Math.pow(connectedNode.position.y - selectedNode.position.y, 2)
                ),
                transform: [
                  {
                    rotate: `${Math.atan2(
                      connectedNode.position.y - selectedNode.position.y,
                      connectedNode.position.x - selectedNode.position.x
                    )}rad`
                  }
                ],
              }
            ]}
          />
        );
      });
  };

  const renderBottomSheet = () => {
    if (!selectedNode) return null;

    return (
      <Modal
        visible={spotlightVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setSpotlightVisible(false);
          setSelectedNode(null);
          setActiveInsights([]);
        }}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>{selectedNode.title}</Text>
            <TouchableOpacity
              onPress={() => {
                setSpotlightVisible(false);
                setSelectedNode(null);
                setActiveInsights([]);
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.bottomSheetContent} showsVerticalScrollIndicator={false}>
            <View style={styles.expertiseOverview}>
              <Text style={styles.categoryLabel}>{selectedNode.category.toUpperCase()}</Text>
              <Text style={styles.description}>{selectedNode.description}</Text>

              <View style={styles.proficiencySection}>
                <Text style={styles.sectionTitle}>Proficiency Level</Text>
                <View style={styles.liquidGauge}>
                  <View
                    style={[
                      styles.liquidFill,
                      {
                        height: `${selectedNode.proficiency}%`,
                        backgroundColor: getCategoryColor(selectedNode.category),
                      }
                    ]}
                  />
                  <Text style={styles.proficiencyPercentage}>{selectedNode.proficiency}%</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <Text style={styles.sectionContent}>{selectedNode.experience}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Technologies</Text>
                <View style={styles.technologyGrid}>
                  {selectedNode.technologies.map((tech, index) => (
                    <View key={index} style={styles.technologyTag}>
                      <Text style={styles.technologyText}>{tech}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Insights</Text>
                {selectedNode.keyInsights.map((insight, index) => (
                  <View key={index} style={styles.insightItem}>
                    <View style={styles.insightBullet} />
                    <Text style={styles.insightText}>{insight}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View
        style={styles.matrixContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContainerDimensions({ width, height });
        }}
      >
        <View style={styles.neuralBackground}>
          {/* Neural network grid pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <View
              key={`h-line-${i}`}
              style={[
                styles.gridLine,
                {
                  top: (i * containerDimensions.height) / 7,
                  width: containerDimensions.width,
                  height: 1,
                }
              ]}
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <View
              key={`v-line-${i}`}
              style={[
                styles.gridLine,
                {
                  left: (i * containerDimensions.width) / 5,
                  height: containerDimensions.height,
                  width: 1,
                }
              ]}
            />
          ))}
        </View>

        {renderConnections()}
        {positionedNodes.map(renderNode)}
      </View>

      {renderBottomSheet()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[6],
  },

  header: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },

  title: {
    ...typography.heading.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing[2],
  },

  subtitle: {
    ...typography.body.large,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  matrixContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 400,
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    overflow: 'hidden',
  },

  neuralBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  gridLine: {
    position: 'absolute',
    backgroundColor: colors.border + '40',
  },

  expertiseNode: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: colors.accentPop,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  nodeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: spacing[1],
  },

  nodeText: {
    ...typography.body.small,
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 8,
  },

  proficiencyGauge: {
    width: 40,
    height: 4,
    backgroundColor: colors.white + '40',
    borderRadius: 2,
    marginTop: 2,
    overflow: 'hidden',
  },

  proficiencyFill: {
    height: '100%',
    borderRadius: 2,
  },

  nodeRipple: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: colors.accentPop + '60',
  },

  connection: {
    position: 'absolute',
    height: 2,
    backgroundColor: colors.accentPop + '80',
    transformOrigin: '0 50%',
  },

  bottomSheet: {
    flex: 1,
    backgroundColor: colors.background,
  },

  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },

  bottomSheetTitle: {
    ...typography.heading.h3,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },

  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    ...typography.body.large,
    color: colors.textSecondary,
  },

  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: spacing[4],
  },

  expertiseOverview: {
    paddingVertical: spacing[4],
  },

  categoryLabel: {
    ...typography.body.small,
    color: colors.accentPop,
    fontWeight: '600',
    marginBottom: spacing[2],
  },

  description: {
    ...typography.body.regular,
    color: colors.text,
    marginBottom: spacing[6],
    lineHeight: 24,
  },

  proficiencySection: {
    marginBottom: spacing[6],
  },

  sectionTitle: {
    ...typography.heading.h4,
    color: colors.text,
    marginBottom: spacing[3],
  },

  liquidGauge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.cardBackground,
    borderWidth: 3,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  liquidFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 50,
  },

  proficiencyPercentage: {
    ...typography.heading.h4,
    color: colors.text,
    fontWeight: '700',
    zIndex: 1,
  },

  section: {
    marginBottom: spacing[6],
  },

  sectionContent: {
    ...typography.body.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  technologyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },

  technologyTag: {
    backgroundColor: colors.accentPop + '20',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accentPop + '40',
  },

  technologyText: {
    ...typography.body.small,
    color: colors.accentPop,
    fontWeight: '500',
  },

  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },

  insightBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentPop,
    marginTop: 6,
    marginRight: spacing[3],
  },

  insightText: {
    ...typography.body.regular,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});