import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated, PanGestureHandler, State } from 'react-native';
import { colors, typography, spacing } from '../../tokens';

export interface DataNode {
  id: string;
  title: string;
  description: string;
  icon?: string;
  onInteract: () => void;
}

export interface ProjectPortalQuestProps {
  title?: string;
  subtitle?: string;
  dataNodes: DataNode[];
  onBeginQuest: () => void;
  style?: any;
}

const { width, height } = Dimensions.get('window');

export const ProjectPortalQuest: React.FC<ProjectPortalQuestProps> = ({
  title = "Crafting Digital Futures",
  subtitle = "Tap to begin your quest.",
  dataNodes,
  onBeginQuest,
  style,
}) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [portalPulse] = useState(new Animated.Value(1));
  const [liquidSwirl] = useState(new Animated.Value(0));
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    // Portal pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(portalPulse, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(portalPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Liquid swirl animation
    const swirlAnimation = Animated.loop(
      Animated.timing(liquidSwirl, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    );

    pulseAnimation.start();
    swirlAnimation.start();

    return () => {
      pulseAnimation.stop();
      swirlAnimation.stop();
    };
  }, []);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const nodeIndex = Math.round(contentOffset / (width * 0.8));
    setActiveNodeIndex(nodeIndex);
  };

  const swirlRotation = liquidSwirl.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      {/* Animated Background */}
      <View style={styles.backgroundOverlay} />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Central Portal */}
        <Animated.View
          style={[
            styles.portal,
            {
              transform: [{ scale: portalPulse }],
            },
          ]}
        >
          {/* Liquid Swirl */}
          <Animated.View
            style={[
              styles.liquidSwirl,
              {
                transform: [{ rotate: swirlRotation }],
              },
            ]}
          />

          {/* Quest Button */}
          <TouchableOpacity
            style={styles.questButton}
            onPress={onBeginQuest}
            activeOpacity={0.8}
          >
            <Text style={styles.questButtonText}>Begin Quest</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Swipable Data Nodes */}
        <View style={styles.nodesContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={width * 0.8}
            contentContainerStyle={styles.nodesContent}
          >
            {dataNodes.map((node, index) => (
              <TouchableOpacity
                key={node.id}
                style={[
                  styles.dataNode,
                  index === activeNodeIndex && styles.activeDataNode,
                ]}
                onPress={node.onInteract}
                activeOpacity={0.9}
              >
                <View style={styles.nodeContent}>
                  {node.icon && (
                    <Text style={styles.nodeIcon}>{node.icon}</Text>
                  )}
                  <Text style={styles.nodeTitle}>{node.title}</Text>
                  <Text style={styles.nodeDescription} numberOfLines={2}>
                    {node.description}
                  </Text>
                </View>

                {/* Glass overlay effect */}
                <View style={styles.nodeGlassOverlay} />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Node Indicators */}
          <View style={styles.indicators}>
            {dataNodes.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === activeNodeIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Quest Progress */}
        <View style={styles.questProgress}>
          <Text style={styles.progressText}>
            Explore {dataNodes.length} Areas of Expertise
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    position: 'relative',
  },

  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryBackground,
    opacity: 0.9,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[12],
  },

  title: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    fontFamily: typography.fonts.heading,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing[4],
    lineHeight: typography.lineHeights.tight,
  },

  subtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSubtle,
    textAlign: 'center',
    marginBottom: spacing[12],
    lineHeight: typography.lineHeights.relaxed,
    paddingHorizontal: spacing[4],
  },

  portal: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.glassBlur,
    borderWidth: 2,
    borderColor: colors.primaryAccent + '50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[12],
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },

  liquidSwirl: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    borderRadius: 100,
    backgroundColor: colors.primaryAccent + '20',
    borderWidth: 1,
    borderColor: colors.primaryAccent + '30',
  },

  questButton: {
    backgroundColor: colors.primaryAccent,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: 12,
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 2,
  },

  questButtonText: {
    color: colors.pureWhite,
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    textAlign: 'center',
  },

  nodesContainer: {
    width: '100%',
    marginBottom: spacing[8],
  },

  nodesContent: {
    paddingHorizontal: width * 0.1,
  },

  dataNode: {
    width: width * 0.8,
    marginHorizontal: spacing[2],
    backgroundColor: colors.glassBlur,
    borderRadius: 16,
    padding: spacing[6],
    borderWidth: 1,
    borderColor: colors.primaryAccent + '30',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: colors.primaryAccent,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    transform: [{ scale: 0.95 }],
  },

  activeDataNode: {
    borderColor: colors.primaryAccent + '60',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    transform: [{ scale: 1 }],
  },

  nodeContent: {
    alignItems: 'center',
    zIndex: 2,
  },

  nodeIcon: {
    fontSize: typography.fontSizes['3xl'],
    marginBottom: spacing[3],
  },

  nodeTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: spacing[2],
  },

  nodeDescription: {
    fontSize: typography.fontSizes.base,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: typography.lineHeights.relaxed,
  },

  nodeGlassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.glassGlow,
    opacity: 0.1,
    borderRadius: 16,
  },

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSubtle + '50',
    marginHorizontal: spacing[1],
  },

  activeIndicator: {
    backgroundColor: colors.primaryAccent,
    width: 24,
  },

  questProgress: {
    alignItems: 'center',
  },

  progressText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSubtle,
    textAlign: 'center',
    fontWeight: typography.fontWeights.medium,
  },
});