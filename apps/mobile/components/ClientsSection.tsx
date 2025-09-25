import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Svg, {
  Circle,
  Path,
  Rect,
} from 'react-native-svg';
import { spacing } from '@pixelsandpetals/ui';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Client Logo Components
const CapitalOneLogo = ({ size = 64, color = '#FF6B6B' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="28" fill={color} opacity="0.1"/>
    <Path d="M20 24h24v4H20v-4zm0 8h24v4H20v-4zm0 8h16v4H20v-4z" fill={color} opacity="0.8"/>
    <Circle cx="48" cy="20" r="8" fill={color} opacity="0.6"/>
    <Path d="M44 20h8M48 16v8" stroke={color} strokeWidth="2"/>
  </Svg>
);

const WalmartLogo = ({ size = 64, color = '#4ECDC4' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="28" fill={color} opacity="0.1"/>
    <Path d="M32 16l4 8h8l-6 6 2 8-8-4-8 4 2-8-6-6h8l4-8z" fill={color} opacity="0.8"/>
    <Circle cx="32" cy="32" r="6" fill={color} opacity="0.4"/>
    <Path d="M16 20h32M16 44h32" stroke={color} strokeWidth="2"/>
  </Svg>
);

const RackspaceLogo = ({ size = 64, color = '#45B7D1' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="8" y="16" width="48" height="32" rx="4" fill={color} opacity="0.1"/>
    <Circle cx="20" cy="32" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="32" cy="32" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="44" cy="32" r="6" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M14 24h36M14 40h36" stroke={color} strokeWidth="1"/>
    <Rect x="18" y="28" width="4" height="8" fill={color} opacity="0.6"/>
    <Rect x="30" y="28" width="4" height="8" fill={color} opacity="0.6"/>
    <Rect x="42" y="28" width="4" height="8" fill={color} opacity="0.6"/>
  </Svg>
);

const BlueCrossLogo = ({ size = 64, color = '#96CEB4' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="28" fill={color} opacity="0.1"/>
    <Path d="M32 12v40M12 32h40" stroke={color} strokeWidth="4"/>
    <Circle cx="32" cy="32" r="12" stroke={color} strokeWidth="2" fill="none"/>
    <Path d="M24 24h16v16H24V24z" fill={color} opacity="0.3"/>
    <Circle cx="32" cy="32" r="4" fill={color}/>
  </Svg>
);

const WellsFargoLogo = ({ size = 64, color = '#FECA57' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x="8" y="20" width="48" height="24" rx="4" fill={color} opacity="0.1"/>
    <Path d="M16 28h8v8h-8v-8zm12 0h8v8h-8v-8zm12 0h8v8h-8v-8z" fill={color} opacity="0.6"/>
    <Circle cx="20" cy="32" r="2" fill={color}/>
    <Circle cx="32" cy="32" r="2" fill={color}/>
    <Circle cx="44" cy="32" r="2" fill={color}/>
    <Path d="M12 16h40l-4 4H16l-4-4z" fill={color} opacity="0.4"/>
    <Path d="M16 48h32l4-4H12l4 4z" fill={color} opacity="0.4"/>
  </Svg>
);

const MotorolaLogo = ({ size = 64, color = '#A55EEA' }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="28" fill={color} opacity="0.1"/>
    <Rect x="20" y="20" width="24" height="24" rx="4" stroke={color} strokeWidth="2" fill="none"/>
    <Circle cx="32" cy="32" r="8" fill={color} opacity="0.4"/>
    <Path d="M32 16v32M16 32h32" stroke={color} strokeWidth="1"/>
    <Circle cx="32" cy="20" r="2" fill={color}/>
    <Circle cx="32" cy="44" r="2" fill={color}/>
    <Circle cx="20" cy="32" r="2" fill={color}/>
    <Circle cx="44" cy="32" r="2" fill={color}/>
  </Svg>
);

interface Client {
  name: string;
  industry: string;
  testimonial: string;
  logo: React.ReactNode;
  color: string;
}

const ClientsSection: React.FC = () => {
  const { colors } = useTheme();

  const clients: Client[] = [
    {
      name: "Capital One",
      industry: "Software Development",
      testimonial: "Pixels & Petals elevated our digital platforms with innovative engineering, seamless integrations, and a design-forward approach that aligned with our enterprise goals.",
      logo: <CapitalOneLogo size={48} color="#FF6B6B" />,
      color: "#FF6B6B",
    },
    {
      name: "Walmart",
      industry: "Retail",
      testimonial: "Pixels & Petals' expertise in scalable eCommerce platforms helped us optimize operations and deliver a seamless shopping experience for millions of customers.",
      logo: <WalmartLogo size={48} color="#4ECDC4" />,
      color: "#4ECDC4",
    },
    {
      name: "Rackspace Technology",
      industry: "Cloud Computing",
      testimonial: "Pixels & Petals' expertise in cloud architecture and scalable solutions has been instrumental in optimizing our infrastructure and delivering reliable, high-performance services.",
      logo: <RackspaceLogo size={48} color="#45B7D1" />,
      color: "#45B7D1",
    },
    {
      name: "Blue Cross Blue Shield",
      industry: "Healthcare",
      testimonial: "Pixels & Petals' UX improvements on our digital platforms significantly enhanced member engagement and streamlined user workflows, driving measurable results across our services.",
      logo: <BlueCrossLogo size={48} color="#96CEB4" />,
      color: "#96CEB4",
    },
    {
      name: "Wells Fargo",
      industry: "Financial Services",
      testimonial: "Pixels & Petals' platform solutions have helped us enhance our digital services, improving accessibility, efficiency, and user engagement across our customer base.",
      logo: <WellsFargoLogo size={48} color="#FECA57" />,
      color: "#FECA57",
    },
    {
      name: "Motorola Solutions",
      industry: "Enterprise Technology",
      testimonial: "Pixels & Petals' custom platform solutions have streamlined our operational workflows, significantly improving efficiency and reducing deployment times across our teams.",
      logo: <MotorolaLogo size={48} color="#A55EEA" />,
      color: "#A55EEA",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      paddingVertical: spacing[12],
      paddingHorizontal: spacing[6],
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[10],
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
    },
    sectionSubtitle: {
      fontSize: 16,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: width * 0.9,
    },
    scrollContainer: {
      paddingBottom: spacing[6],
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: spacing[4],
    },
    clientCard: {
      width: (width - spacing[6] * 2 - spacing[4]) / 2,
      backgroundColor: colors.surfaceBackground,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      padding: spacing[5],
      alignItems: 'center',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      overflow: 'hidden',
      position: 'relative',
      minHeight: 240,
    },
    backgroundAccent: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[4],
      position: 'relative',
    },
    logoBackground: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.glassBorder,
    },
    clientInfo: {
      alignItems: 'center',
      flex: 1,
    },
    clientName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[2],
    },
    clientIndustry: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: spacing[3],
    },
    clientTestimonial: {
      fontSize: 12,
      color: colors.textSubtle,
      textAlign: 'center',
      lineHeight: 18,
      flex: 1,
    },
    bottomAccent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
    },
  });

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Our Clients</Text>
        <Text style={styles.sectionSubtitle}>
          Partnering with industry leaders and disruptors to engineer cloud-native platforms, enterprise integrations, and mission-critical applications.
        </Text>
      </View>

      {/* Clients Grid */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {clients.map((client, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.clientCard,
                {
                  shadowColor: client.color,
                  borderColor: `${client.color}40`,
                },
              ]}
              activeOpacity={0.9}
            >
              {/* Background gradient accent */}
              <View
                style={[
                  styles.backgroundAccent,
                  {
                    backgroundColor: `${client.color}15`,
                  },
                ]}
              />

              {/* Logo container */}
              <View style={styles.logoContainer}>
                <View
                  style={[
                    styles.logoBackground,
                    {
                      backgroundColor: `${client.color}20`,
                      borderColor: `${client.color}40`,
                    },
                  ]}
                >
                  {client.logo}
                </View>
              </View>

              {/* Client info */}
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text
                  style={[
                    styles.clientIndustry,
                    {
                      color: client.color,
                    },
                  ]}
                >
                  {client.industry}
                </Text>
                <Text style={styles.clientTestimonial}>
                  "{client.testimonial}"
                </Text>
              </View>

              {/* Bottom accent line */}
              <View
                style={[
                  styles.bottomAccent,
                  {
                    backgroundColor: client.color,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ClientsSection;