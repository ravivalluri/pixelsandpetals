import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Navigation, ProjectPortalQuest, SolutionFlow, ProjectConstellation, Card, Button, colors } from '@pixelsandpetals/ui';

export default function App() {
  const [activeNavItem, setActiveNavItem] = useState('home');

  const dataShards = [
    {
      id: 'ai-innovation',
      title: 'AI & Innovation',
      description: 'Cutting-edge AI solutions that transform businesses',
      icon: '🤖',
      onInteract: () => console.log('AI Innovation shard activated'),
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love',
      icon: '🎨',
      onInteract: () => console.log('UI/UX shard activated'),
    },
    {
      id: 'growth',
      title: 'Growth Strategy',
      description: 'Data-driven strategies for exponential growth',
      icon: '📈',
      onInteract: () => console.log('Growth shard activated'),
    },
    {
      id: 'mobile',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps that perform',
      icon: '📱',
      onInteract: () => console.log('Mobile shard activated'),
    },
    {
      id: 'web',
      title: 'Web Development',
      description: 'Modern web applications built for scale',
      icon: '🌐',
      onInteract: () => console.log('Web shard activated'),
    },
  ];

  const navigationItems = [
    {
      label: 'Home',
      onPress: () => setActiveNavItem('home'),
      active: activeNavItem === 'home',
    },
    {
      label: 'Services',
      onPress: () => setActiveNavItem('services'),
      active: activeNavItem === 'services',
    },
    {
      label: 'Portfolio',
      onPress: () => setActiveNavItem('portfolio'),
      active: activeNavItem === 'portfolio',
    },
    {
      label: 'About',
      onPress: () => setActiveNavItem('about'),
      active: activeNavItem === 'about',
    },
    {
      label: 'Contact',
      onPress: () => setActiveNavItem('contact'),
      active: activeNavItem === 'contact',
    },
  ];

  const serviceOrbs = [
    {
      id: 'ai-innovation',
      title: 'AI & Innovation',
      icon: '🤖',
      oneLiner: 'Cutting-edge AI solutions that transform businesses',
      description: 'Harness the power of artificial intelligence to automate processes, enhance decision-making, and create intelligent user experiences that adapt and evolve.',
      benefits: [
        'Machine Learning Integration',
        'Natural Language Processing',
        'Computer Vision Solutions',
        'Predictive Analytics',
        'Intelligent Automation',
        'AI-Powered Recommendations'
      ],
      connections: ['ui-ux', 'web-development'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: '🎨',
      oneLiner: 'Beautiful, intuitive interfaces that users love',
      description: 'Create stunning, user-centered designs that combine aesthetic excellence with optimal usability, ensuring every interaction delights and converts.',
      benefits: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Interactive Design Systems',
        'Accessibility Optimization',
        'Cross-Platform Consistency',
        'Conversion-Focused Design'
      ],
      connections: ['ai-innovation', 'mobile-development', 'web-development'],
    },
    {
      id: 'growth-strategy',
      title: 'Growth Strategy',
      icon: '📈',
      oneLiner: 'Data-driven strategies for exponential growth',
      description: 'Develop comprehensive growth strategies backed by data analytics, market research, and proven methodologies to scale your business effectively.',
      benefits: [
        'Market Analysis & Research',
        'Performance Optimization',
        'Conversion Rate Optimization',
        'Digital Marketing Strategy',
        'Analytics & Insights',
        'Scalability Planning'
      ],
      connections: ['ai-innovation', 'web-development'],
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      icon: '📱',
      oneLiner: 'Cross-platform mobile apps that perform',
      description: 'Build powerful, native-quality mobile applications using cutting-edge cross-platform technologies for iOS and Android deployment.',
      benefits: [
        'React Native Development',
        'Native iOS & Android',
        'Cross-Platform Solutions',
        'App Store Optimization',
        'Mobile Performance Tuning',
        'Offline-First Architecture'
      ],
      connections: ['ui-ux', 'web-development', 'cloud-infrastructure'],
    },
    {
      id: 'web-development',
      title: 'Web Development',
      icon: '🌐',
      oneLiner: 'Modern web applications built for scale',
      description: 'Develop high-performance, scalable web applications using modern frameworks and best practices for optimal user experience and business results.',
      benefits: [
        'React & Next.js Development',
        'Full-Stack Solutions',
        'Progressive Web Apps',
        'Performance Optimization',
        'SEO & Accessibility',
        'Modern Architecture'
      ],
      connections: ['ai-innovation', 'ui-ux', 'mobile-development', 'cloud-infrastructure'],
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud Infrastructure',
      icon: '☁️',
      oneLiner: 'Scalable, secure cloud solutions',
      description: 'Design and implement robust cloud infrastructure that scales with your business, ensuring security, reliability, and optimal performance.',
      benefits: [
        'AWS & Azure Solutions',
        'Microservices Architecture',
        'DevOps & CI/CD',
        'Security & Compliance',
        'Auto-Scaling Systems',
        'Cost Optimization'
      ],
      connections: ['web-development', 'mobile-development'],
    },
  ];

  const projectStars = [
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      client: 'RetailCorp',
      industry: 'E-commerce',
      services: ['Web Development', 'UI/UX Design', 'Cloud Infrastructure'],
      impactMetric: {
        label: 'Conversion Increase',
        value: '+150%',
        icon: '💰'
      },
      description: 'A comprehensive e-commerce solution that revolutionized online retail with modern design, seamless checkout, and intelligent product recommendations powered by AI.',
      challenges: [
        'Legacy system integration',
        'High traffic scalability',
        'Complex payment workflows',
        'Mobile optimization'
      ],
      solutions: [
        'Microservices architecture',
        'Auto-scaling infrastructure',
        'Streamlined checkout process',
        'Progressive web app implementation'
      ],
      outcomes: [
        '150% increase in conversion rate',
        '95% performance score',
        '10K+ monthly active users',
        '40% reduction in cart abandonment'
      ],
      testimonial: {
        quote: 'The new platform exceeded our expectations. Sales increased dramatically and customer satisfaction is at an all-time high.',
        author: 'Sarah Johnson',
        role: 'CEO, RetailCorp'
      },
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis', 'Docker'],
      connections: ['ai-recommendation', 'healthcare-system'],
    },
    {
      id: 'healthcare-system',
      title: 'Healthcare Management System',
      client: 'MedTech Solutions',
      industry: 'Healthcare',
      services: ['Mobile Development', 'AI & Innovation', 'Cloud Infrastructure'],
      impactMetric: {
        label: 'Admin Time Reduction',
        value: '-40%',
        icon: '⏱️'
      },
      description: 'A secure, HIPAA-compliant patient management system with real-time notifications, AI-powered diagnostics, and comprehensive analytics dashboard.',
      challenges: [
        'HIPAA compliance requirements',
        'Real-time data synchronization',
        'Integration with legacy systems',
        'Mobile accessibility for staff'
      ],
      solutions: [
        'End-to-end encryption',
        'Real-time Firebase integration',
        'Custom API bridges',
        'Cross-platform mobile app'
      ],
      outcomes: [
        '40% reduction in administrative time',
        '99.9% system uptime',
        '5K+ patients managed',
        '100% HIPAA compliance'
      ],
      testimonial: {
        quote: 'This system transformed our workflow. Doctors can now focus on patients instead of paperwork.',
        author: 'Dr. Michael Chen',
        role: 'Chief Medical Officer'
      },
      technologies: ['React Native', 'Firebase', 'Node.js', 'PostgreSQL', 'HIPAA', 'ML Kit'],
      connections: ['ecommerce-platform', 'fintech-dashboard'],
    },
    {
      id: 'fintech-dashboard',
      title: 'Financial Analytics Dashboard',
      client: 'FinanceFlow',
      industry: 'FinTech',
      services: ['Web Development', 'AI & Innovation', 'Growth Strategy'],
      impactMetric: {
        label: 'Decision Speed',
        value: '+60%',
        icon: '🚀'
      },
      description: 'An interactive financial analytics platform with real-time data visualization, predictive modeling, and automated reporting for investment decisions.',
      challenges: [
        'Complex data visualization',
        'Real-time market data',
        'Regulatory compliance',
        'High-frequency trading integration'
      ],
      solutions: [
        'Custom D3.js visualizations',
        'WebSocket streaming',
        'Compliance-first architecture',
        'Low-latency APIs'
      ],
      outcomes: [
        '60% faster decision making',
        '99.8% data accuracy',
        '1M+ data points processed',
        '24/7 real-time monitoring'
      ],
      testimonial: {
        quote: 'The insights we get from this dashboard have transformed our investment strategy.',
        author: 'Robert Kim',
        role: 'Portfolio Manager'
      },
      technologies: ['D3.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'TensorFlow'],
      connections: ['healthcare-system', 'ai-recommendation'],
    },
    {
      id: 'ai-recommendation',
      title: 'AI Recommendation Engine',
      client: 'StreamTech',
      industry: 'Entertainment',
      services: ['AI & Innovation', 'Web Development', 'Growth Strategy'],
      impactMetric: {
        label: 'Engagement Boost',
        value: '+85%',
        icon: '🎯'
      },
      description: 'A sophisticated AI-powered recommendation system that analyzes user behavior, preferences, and content metadata to deliver personalized experiences.',
      challenges: [
        'Cold start problem',
        'Real-time personalization',
        'Scalable ML infrastructure',
        'Content diversity balance'
      ],
      solutions: [
        'Hybrid recommendation algorithms',
        'Edge computing deployment',
        'Auto-scaling ML pipelines',
        'Exploration-exploitation optimization'
      ],
      outcomes: [
        '85% increase in user engagement',
        '3x longer session duration',
        '50M+ recommendations served',
        '92% recommendation accuracy'
      ],
      testimonial: {
        quote: 'User engagement skyrocketed after implementing this recommendation system.',
        author: 'Lisa Park',
        role: 'Head of Product'
      },
      technologies: ['TensorFlow', 'Python', 'Apache Kafka', 'Redis', 'Kubernetes', 'GraphQL'],
      connections: ['ecommerce-platform', 'fintech-dashboard'],
    },
  ];

  const portfolioItems = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with modern design and seamless checkout.',
    },
    {
      title: 'Healthcare App',
      description: 'Patient management system with real-time notifications and analytics.',
    },
    {
      title: 'Financial Dashboard',
      description: 'Interactive dashboard for financial data visualization and reporting.',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Navigation
        items={navigationItems}
        ctaButton={{
          title: 'Get Started',
          onPress: () => console.log('Get Started clicked'),
        }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProjectPortalQuest
          title="Crafting Digital Futures"
          subtitle="Tap to begin your quest through our expertise"
          dataNodes={dataShards}
          onBeginQuest={() => console.log('Quest began!')}
          style={styles.portalQuest}
        />

        {/* Solution Flow Section */}
        <SolutionFlow
          services={serviceOrbs}
          onServiceClick={(service) => {
            console.log(`${service.title} clicked for deep dive`);
          }}
          onSolutionBuilt={(selectedServices) => {
            console.log('Solution built with services:', selectedServices.map(s => s.title));
          }}
          style={styles.solutionFlow}
        />

        {/* Project Constellation Section */}
        <ProjectConstellation
          projects={projectStars}
          onProjectClick={(project) => {
            console.log(`Project star clicked: ${project.title}`);
          }}
          onFilterChange={(filters) => {
            console.log('Galaxy filters changed:', filters);
          }}
          style={styles.projectConstellation}
        />

        {/* Contact CTA Section */}
        <View style={styles.ctaSection}>
          <Button
            title="Contact Us Today"
            onPress={() => setActiveNavItem('contact')}
            variant="secondary"
            size="lg"
            style={styles.ctaButton}
            textStyle={styles.ctaButtonText}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  portfolioSection: {
    backgroundColor: colors.lightGray + '20', // 20% opacity
  },

  sectionContent: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },

  ctaSection: {
    backgroundColor: colors.accentPop,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  ctaButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    minWidth: 200,
  },

  ctaButtonText: {
    color: colors.accentPop,
  },

  portalQuest: {
    minHeight: 600,
  },

  solutionFlow: {
    minHeight: 500,
    marginVertical: spacing[4],
  },

  projectConstellation: {
    minHeight: 600,
    marginVertical: spacing[4],
  },
});
