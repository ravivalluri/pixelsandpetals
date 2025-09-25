import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, FlatList, Platform } from 'react-native';
import { useState, useRef } from 'react';
import { spacing } from '@pixelsandpetals/ui';
import { LiquidGlassHeader } from './components/LiquidGlassHeader';
import SolutionsSection from './components/SolutionsSection';
import QuickROICalculator from './components/QuickROICalculator';
import ClientsSection from './components/ClientsSection';
import AboutSection from './components/AboutSection';
import ConnectionNexus from './components/ConnectionNexus';
import { LiquidGlassView } from './components/LiquidGlassView';
import { LiquidGlassButton } from './components/LiquidGlassButton';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Sophisticated Hero Section Component with full web app features
const SophisticatedHeroSection = () => {
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Real-world solutions matching the web app exactly
  const useCases = [
    {
      id: 'data-pipelines',
      title: 'Automate Data Pipelines',
      description: 'Streamline your data workflows with intelligent automation that processes, transforms, and delivers insights in real-time.',
      benefits: ['95% faster processing', 'Zero manual errors', 'Real-time insights'],
      accentColor: colors.primaryAccent,
    },
    {
      id: 'ai-dashboards',
      title: 'AI-Powered Dashboards',
      description: 'Transform raw data into intelligent, predictive dashboards that anticipate trends and recommend actions.',
      benefits: ['Predictive analytics', 'Smart recommendations', 'Interactive visualizations'],
      accentColor: colors.secondaryAccent,
    },
    {
      id: 'security-modules',
      title: 'Enterprise Security Modules',
      description: 'Deploy bulletproof security frameworks with advanced threat detection, encryption, and compliance monitoring.',
      benefits: ['99.9% threat prevention', 'Compliance ready', 'Zero-trust architecture'],
      accentColor: colors.tertiaryAccent,
    },
    {
      id: 'cloud-infrastructure',
      title: 'Scalable Cloud Infrastructure',
      description: 'Build resilient, auto-scaling cloud architectures that grow with your business and optimize costs.',
      benefits: ['Auto-scaling', '99.99% uptime', '60% cost reduction'],
      accentColor: colors.quaternaryAccent,
    },
    {
      id: 'mobile-apps',
      title: 'Cross-Platform Mobile Apps',
      description: 'Develop native-quality mobile experiences that work seamlessly across iOS, Android, and web platforms.',
      benefits: ['Native performance', 'Single codebase', 'Faster deployment'],
      accentColor: colors.quinaryAccent,
    },
    {
      id: 'api-integration',
      title: 'Seamless API Integration',
      description: 'Connect and orchestrate multiple services with robust API gateways, webhooks, and real-time synchronization.',
      benefits: ['Real-time sync', 'Error resilience', 'Scalable architecture'],
      accentColor: colors.senaryAccent,
    },
  ];

  const heroStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryBackground,
      paddingVertical: spacing[12],
      paddingTop: Platform.OS === 'ios' ? 112 + spacing[8] : 100 + spacing[10],
    },
    heroContent: {
      paddingHorizontal: spacing[6],
      alignItems: 'center',
      marginBottom: spacing[8],
    },
    heroTitle: {
      fontSize: 36,
      fontWeight: 'bold',
      color: colors.textPrimary,
      textAlign: 'center',
      marginBottom: spacing[4],
      lineHeight: 42,
    },
    heroSubtitle: {
      fontSize: 18,
      color: colors.textSecondary,
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
    carouselContainer: {
      paddingLeft: spacing[4],
    },
    useCaseCard: {
      marginHorizontal: spacing[2],
      width: width * 0.8,
    },
    cardContent: {
      padding: spacing[6],
    },
    useCaseTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: spacing[3],
    },
    useCaseDescription: {
      fontSize: 16,
      color: colors.textSecondary,
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
      color: colors.textSecondary,
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
      backgroundColor: colors.textSubtle,
    },
    paginationDotActive: {
      backgroundColor: colors.primaryAccent,
      width: 24,
    },
  });

  const renderUseCase = ({ item }: { item: any }) => (
    <LiquidGlassView
      style={heroStyles.useCaseCard}
      variant={Platform.OS === 'ios' ? 'regular' : 'light'}
      intensity={Platform.OS === 'ios' ? 70 : 50}
      borderRadius={24}
      showBorder={true}
      showShadow={true}
    >
      <View style={heroStyles.cardContent}>
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
    </LiquidGlassView>
  );

  return (
    <View style={heroStyles.container}>
      {/* Hero Content */}
      <View style={heroStyles.heroContent}>
        <Text style={heroStyles.heroTitle}>
          <Text style={{ color: colors.primaryAccent }}>Real-World Solutions</Text>
        </Text>

        <Text style={heroStyles.heroSubtitle}>
          From system design to cloud deployment, we deliver cutting-edge software that solves complex business challenges at scale.
        </Text>

        {/* CTA Buttons */}
        <View style={heroStyles.ctaContainer}>
          <LiquidGlassButton
            title='Start Your Project'
            variant='primary'
            size='medium'
            blurIntensity={60}
            onPress={() => console.log('Start Your Project pressed')}
          />

          <LiquidGlassButton
            title='View Portfolio'
            variant='secondary'
            size='medium'
            blurIntensity={40}
            onPress={() => console.log('View Portfolio pressed')}
          />
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

const AppContent = () => {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const scrollViewRef = useRef<ScrollView>(null);

  // Refs for each section
  const sectionRefs = {
    home: useRef<View>(null),
    projects: useRef<View>(null),
    calculator: useRef<View>(null),
    clients: useRef<View>(null),
    about: useRef<View>(null),
    contact: useRef<View>(null),
  };

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === 'home') {
      // Scroll to top for home
      scrollViewRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      return;
    }

    // Scroll to the appropriate section
    const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (sectionRef?.current && scrollViewRef.current) {
      sectionRef.current.measure((_, __, ___, ____, _____, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY - 120, // Offset for header
          animated: true,
        });
      });
    }
  };

  // Navigation items matching web app structure
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      onPress: () => handleNavigation('home'),
      active: activeSection === 'home',
      icon: '🏠',
    },
    {
      id: 'projects',
      label: 'Solutions',
      onPress: () => handleNavigation('projects'),
      active: activeSection === 'projects',
      icon: '🚀',
    },
    {
      id: 'calculator',
      label: 'ROI Calculator',
      onPress: () => handleNavigation('calculator'),
      active: activeSection === 'calculator',
      icon: '📊',
    },
    {
      id: 'clients',
      label: 'Clients',
      onPress: () => handleNavigation('clients'),
      active: activeSection === 'clients',
      icon: '🤝',
    },
    {
      id: 'about',
      label: 'About',
      onPress: () => handleNavigation('about'),
      active: activeSection === 'about',
      icon: '👥',
    },
    {
      id: 'contact',
      label: 'Contact',
      onPress: () => handleNavigation('contact'),
      active: activeSection === 'contact',
      icon: '📧',
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primaryBackground,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Liquid Glass Header */}
      <LiquidGlassHeader items={navItems} activeSection={activeSection} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - Full sophisticated UI matching web app */}
        <View ref={sectionRefs.home}>
          <SophisticatedHeroSection />
        </View>

        {/* Solutions Section - Mobile-optimized version from web app */}
        <View ref={sectionRefs.projects}>
          <SolutionsSection />
        </View>

        {/* Quick ROI Calculator */}
        <View ref={sectionRefs.calculator}>
          <QuickROICalculator />
        </View>

        {/* Our Clients Section */}
        <View ref={sectionRefs.clients}>
          <ClientsSection />
        </View>

        {/* About Section */}
        <View ref={sectionRefs.about}>
          <AboutSection />
        </View>

        {/* Connection Nexus */}
        <View ref={sectionRefs.contact}>
          <ConnectionNexus />
        </View>
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
