import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useState } from 'react';
import { colors, spacing } from '@pixelsandpetals/ui';
import { ProjectsSection } from '@pixelsandpetals/ui/components/ProjectsSection';
import { LiquidGlassHeader } from './components/LiquidGlassHeader';

const { width } = Dimensions.get('window');

// Sophisticated Hero Section Component with full web app features
const SophisticatedHeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use cases matching the web app exactly
  const useCases = [
    {
      id: 'data-pipelines',
      title: 'Automate Data Pipelines',
      description: 'Streamline your data workflows with intelligent automation that processes, transforms, and delivers insights in real-time.',
      benefits: ['95% faster processing', 'Zero manual errors', 'Real-time insights'],
      accentColor: colors.light.primaryAccent,
    },
    {
      id: 'ai-dashboards',
      title: 'AI-Powered Dashboards',
      description: 'Transform raw data into intelligent, predictive dashboards that anticipate trends and recommend actions.',
      benefits: ['Predictive analytics', 'Smart recommendations', 'Interactive visualizations'],
      accentColor: colors.light.secondaryAccent,
    },
    {
      id: 'security-modules',
      title: 'Enterprise Security Modules',
      description: 'Deploy bulletproof security frameworks with advanced threat detection, encryption, and compliance monitoring.',
      benefits: ['99.9% threat prevention', 'Compliance ready', 'Zero-trust architecture'],
      accentColor: '#FF6B9D',
    },
    {
      id: 'cloud-infrastructure',
      title: 'Scalable Cloud Infrastructure',
      description: 'Build resilient, auto-scaling cloud architectures that grow with your business and optimize costs.',
      benefits: ['Auto-scaling', '99.99% uptime', '60% cost reduction'],
      accentColor: '#4ECDC4',
    },
  ];

  const heroStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.light.primaryBackground,
      paddingVertical: spacing[12],
    },
    heroContent: {
      paddingHorizontal: spacing[6],
      alignItems: 'center',
      marginBottom: spacing[8],
    },
    heroTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.light.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
      lineHeight: 42,
    },
    heroSubtitle: {
      fontSize: 18,
      color: colors.light.textSecondary,
      textAlign: 'center',
      marginBottom: spacing[8],
      lineHeight: 26,
      maxWidth: width * 0.9,
    },
    ctaContainer: {
      flexDirection: 'row',
      gap: spacing[4],
      marginBottom: spacing[10],
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    ctaButton: {
      backgroundColor: colors.light.primaryAccent,
      paddingHorizontal: spacing[8],
      paddingVertical: spacing[4],
      borderRadius: 12,
      shadowColor: colors.light.shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
    ctaButtonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.light.primaryAccent,
    },
    ctaButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    ctaButtonTextSecondary: {
      color: colors.light.primaryAccent,
    },
    carouselContainer: {
      paddingLeft: spacing[4],
    },
    useCaseCard: {
      backgroundColor: colors.light.surfaceBackground,
      marginHorizontal: spacing[2],
      padding: spacing[6],
      borderRadius: 20,
      width: width * 0.8,
      shadowColor: colors.light.shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
      borderWidth: 1,
      borderColor: colors.light.glassBorder,
    },
    useCaseTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.light.textPrimary,
      marginBottom: spacing[3],
    },
    useCaseDescription: {
      fontSize: 16,
      color: colors.light.textSecondary,
      lineHeight: 24,
      marginBottom: spacing[4],
    },
    benefitsList: {
      marginTop: spacing[2],
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[3],
    },
    benefitDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: spacing[3],
    },
    benefitText: {
      fontSize: 14,
      color: colors.light.textSecondary,
      fontWeight: '500',
      flex: 1,
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing[6],
      paddingHorizontal: spacing[4],
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: spacing[1],
      backgroundColor: colors.light.textSubtle,
    },
    paginationDotActive: {
      backgroundColor: colors.light.primaryAccent,
      width: 24,
    },
  });

  const renderUseCase = ({ item }: { item: any }) => (
    <View style={heroStyles.useCaseCard}>
      <Text style={heroStyles.useCaseTitle}>{item.title}</Text>
      <Text style={heroStyles.useCaseDescription}>{item.description}</Text>

      <View style={heroStyles.benefitsList}>
        {item.benefits.map((benefit: string, benefitIndex: number) => (
          <View key={benefitIndex} style={heroStyles.benefitItem}>
            <View
              style={[
                heroStyles.benefitDot,
                { backgroundColor: item.accentColor }
              ]}
            />
            <Text style={heroStyles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={heroStyles.container}>
      {/* Hero Content */}
      <View style={heroStyles.heroContent}>
        <Text style={heroStyles.heroTitle}>
          Transform Your Business with{' '}
          <Text style={{ color: colors.light.primaryAccent }}>AI Intelligence</Text>
        </Text>

        <Text style={heroStyles.heroSubtitle}>
          Unlock the power of artificial intelligence to automate workflows, gain predictive insights, and accelerate your digital transformation.
        </Text>

        {/* CTA Buttons */}
        <View style={heroStyles.ctaContainer}>
          <TouchableOpacity style={heroStyles.ctaButton}>
            <Text style={heroStyles.ctaButtonText}>Start Your Project</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[heroStyles.ctaButton, heroStyles.ctaButtonSecondary]}>
            <Text style={[heroStyles.ctaButtonText, heroStyles.ctaButtonTextSecondary]}>View Portfolio</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Use Case Carousel */}
      <FlatList
        data={useCases}
        renderItem={renderUseCase}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width * 0.8 + spacing[4]));
          setCurrentIndex(newIndex);
        }}
        contentContainerStyle={heroStyles.carouselContainer}
        snapToInterval={width * 0.8 + spacing[4]}
        decelerationRate="fast"
      />

      {/* Pagination Dots */}
      <View style={heroStyles.pagination}>
        {useCases.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              heroStyles.paginationDot,
              index === currentIndex && heroStyles.paginationDotActive,
            ]}
            onPress={() => setCurrentIndex(index)}
          />
        ))}
      </View>
    </View>
  );
};

// Mobile-specific components we'll keep for now (temporarily commented out to debug)
// import { MobileProjectsSection } from './components/MobileProjectsSection';
// import { MobileAboutSection } from './components/MobileAboutSection';
// import { MobileContactSection } from './components/MobileContactSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    console.log(`Navigating to: ${sectionId}`);
  };

  // Navigation items matching web app structure
  const navItems = [
    {
      id: "home",
      label: "Home",
      onPress: () => handleNavigation('home'),
      active: activeSection === 'home',
      icon: "🏠"
    },
    {
      id: "projects",
      label: "Solutions",
      onPress: () => handleNavigation('projects'),
      active: activeSection === 'projects',
      icon: "🚀"
    },
    {
      id: "clients",
      label: "Partners",
      onPress: () => handleNavigation('clients'),
      active: activeSection === 'clients',
      icon: "🤝"
    },
    {
      id: "about",
      label: "About",
      onPress: () => handleNavigation('about'),
      active: activeSection === 'about',
      icon: "👥"
    },
    {
      id: "contact",
      label: "Connect",
      onPress: () => handleNavigation('contact'),
      active: activeSection === 'contact',
      icon: "📧"
    },
    {
      id: "resume",
      label: "Resume",
      onPress: () => handleNavigation('resume'),
      active: activeSection === 'resume',
      icon: "📄"
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.legacy.textDark} />

      {/* Liquid Glass Header */}
      <LiquidGlassHeader items={navItems} activeSection={activeSection} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - Full sophisticated UI matching web app */}
        <SophisticatedHeroSection />

        {/* Projects Section - Now using shared cross-platform component */}
        <ProjectsSection theme="light" />

        {/* About Section - Temporarily commented out */}
        {/* <MobileAboutSection /> */}

        {/* Contact Section - Temporarily commented out */}
        {/* <MobileContactSection /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.legacy.textDark,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
