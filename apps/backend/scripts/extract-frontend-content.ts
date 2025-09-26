import { contentService } from '../src/services/contentService';
import { CreateContentItem } from '../src/types/content';

// Extracted content from frontend components
const extractedContent: CreateContentItem[] = [
  // Home Page Hero Section (from CrystallineCoreNexus)
  {
    type: 'page',
    title: 'Home',
    slug: 'home',
    content: {
      hero: {
        title: 'Pixels & Petals',
        subtitle: 'Engineering scalable software. Designing seamless digital experiences.',
        description: 'We build digital products that are both high-performing and elegantly designed.',
        backgroundType: 'animated-canvas',
        cta: {
          primary: 'Get Started',
          secondary: 'View Portfolio'
        }
      },
      sections: ['hero', 'projects', 'hero-cta', 'clients', 'about', 'contact'],
      meta: {
        description: 'Pixels & Petals - Full-stack development, system design, and cloud engineering solutions',
        keywords: ['web development', 'mobile apps', 'cloud architecture', 'UI/UX design']
      }
    },
    status: 'published'
  },

  // Projects Section Content
  {
    type: 'page',
    title: 'Our Solutions',
    slug: 'projects',
    content: {
      hero: {
        title: 'Our Solutions',
        subtitle: 'Explore our portfolio of full-stack development, system design, and cloud engineering—real-world implementations that solve complex business challenges.'
      },
      projects: [
        {
          title: 'OTP Widget',
          subtitle: 'Secure authentication microservice',
          description: 'Advanced multi-factor authentication system with SMS and email verification',
          tags: ['React', 'AWS', 'Cognito'],
          color: '#FF6B6B',
          category: 'authentication',
          features: ['Multi-factor authentication', 'SMS & Email OTP', 'Cognito integration', 'Custom UI components'],
          technologies: ['React', 'AWS Cognito', 'Lambda', 'API Gateway']
        },
        {
          title: 'EKS Kafka Pipeline',
          subtitle: 'High-volume event streaming',
          description: 'Enterprise-grade event streaming platform for real-time data processing',
          tags: ['Java', 'Kafka', 'EKS'],
          color: '#4ECDC4',
          category: 'data-streaming',
          features: ['Real-time processing', 'Auto-scaling', 'Fault tolerance', 'Monitoring dashboard'],
          technologies: ['Apache Kafka', 'Kubernetes', 'Java Spring Boot', 'AWS EKS']
        },
        {
          title: 'Design System',
          subtitle: 'Pixels & Petals UI kit with React and React Native',
          description: 'Comprehensive design system with reusable components for web and mobile',
          tags: ['React', 'Figma', 'Storybook'],
          color: '#45B7D1',
          category: 'design-system',
          features: ['Cross-platform components', 'Design tokens', 'Documentation', 'Accessibility compliant'],
          technologies: ['React', 'React Native', 'Storybook', 'Figma']
        },
        {
          title: 'Healthcare Dashboard',
          subtitle: 'Patient data visualization platform',
          description: 'HIPAA-compliant dashboard for healthcare providers with advanced analytics',
          tags: ['React', 'D3', 'TypeScript'],
          color: '#96CEB4',
          category: 'healthcare',
          features: ['HIPAA compliance', 'Real-time analytics', 'Patient tracking', 'Custom reporting'],
          technologies: ['React', 'TypeScript', 'D3.js', 'Node.js']
        },
        {
          title: 'E-commerce Mobile App',
          subtitle: 'Cross-platform shopping experience',
          description: 'Feature-rich mobile commerce platform with payment integration',
          tags: ['React Native', 'Redux', 'Node.js'],
          color: '#FECA57',
          category: 'e-commerce',
          features: ['Product catalog', 'Payment processing', 'Order tracking', 'Push notifications'],
          technologies: ['React Native', 'Redux', 'Node.js', 'Stripe']
        },
        {
          title: 'AI Content Generator',
          subtitle: 'Automated content creation tool',
          description: 'AI-powered platform for generating marketing content and copy',
          tags: ['Python', 'TensorFlow', 'FastAPI'],
          color: '#A55EEA',
          category: 'ai-ml',
          features: ['Natural language generation', 'Multi-format output', 'Brand consistency', 'API integration'],
          technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI GPT']
        }
      ]
    },
    status: 'published'
  },

  // About Section Content
  {
    type: 'page',
    title: 'About Us',
    slug: 'about',
    content: {
      hero: {
        title: 'About Us',
        subtitle: 'Engineering scalable software. Designing seamless digital experiences.'
      },
      story: {
        title: 'Our Story',
        content: [
          'Founded in 2018, Pixels & Petals started as a small team of developers and designers united by a vision: to build digital products that are both high-performing and elegantly designed.',
          'Today, we\'ve grown into a cross-functional team of engineers, architects, and UX specialists, delivering web and mobile applications, cloud-native architectures, and scalable platforms. We collaborate with startups and enterprises across industries, turning complex technical challenges into innovative, user-centered solutions.'
        ]
      },
      techStack: {
        title: 'Our Tech Stack • Interactive Journey',
        nodes: [
          { id: 1, label: 'Frontend', tech: 'React, Next.js', color: '#61DAFB', category: 'frontend' },
          { id: 2, label: 'Backend', tech: 'Node.js, Python', color: '#339933', category: 'backend' },
          { id: 3, label: 'Cloud', tech: 'AWS, Azure', color: '#FF9900', category: 'infrastructure' },
          { id: 4, label: 'Mobile', tech: 'React Native', color: '#0088CC', category: 'mobile' },
          { id: 5, label: 'DevOps', tech: 'Docker, K8s', color: '#326CE5', category: 'devops' },
          { id: 6, label: 'Design', tech: 'Figma, UX', color: '#F24E1E', category: 'design' }
        ]
      },
      values: [
        {
          title: 'Innovation',
          description: 'We anticipate technology trends and leverage modern frameworks, cloud architectures, and best practices to deliver cutting-edge solutions.',
          color: '#FF6B6B',
          icon: '🚀'
        },
        {
          title: 'Quality',
          description: 'We uphold the highest standards in code integrity, performance, and user experience, ensuring reliable and maintainable software.',
          color: '#4ECDC4',
          icon: '✨'
        },
        {
          title: 'Collaboration',
          description: 'We achieve the best outcomes by partnering closely with clients, integrating feedback, and aligning technical solutions with business goals.',
          color: '#45B7D1',
          icon: '🤝'
        },
        {
          title: 'Sustainability',
          description: 'We design systems that are scalable, maintainable, and future-proof, ensuring long-term value for every project.',
          color: '#96CEB4',
          icon: '🌱'
        }
      ],
      team: {
        title: 'Meet Our Team',
        subtitle: 'Our team of engineers, designers, and cloud architects brings together deep technical expertise and creative problem-solving. We collaborate closely to deliver scalable, high-performance software solutions that drive real-world impact.',
        members: [
          {
            name: 'Ravi Valluri',
            role: 'Founder & CEO',
            bio: '15+ years in software architecture and product development',
            image: '/images/team/ravi.jpg',
            memoji: '👨🏽‍💻',
            skills: ['Software Architecture', 'Cloud Engineering', 'Product Strategy', 'Team Leadership'],
            social: {
              linkedin: 'https://www.linkedin.com/in/ravivalluri/',
              github: 'https://github.com/ravivalluri'
            }
          },
          {
            name: 'Maia Valluri',
            role: 'Design Director',
            bio: 'Creating beautiful and functional user experiences for 10+ years',
            image: '/images/team/maia.jpg',
            memoji: '👩🏻‍🎨',
            skills: ['UI/UX Design', 'Design Systems', 'User Research', 'Prototyping'],
            social: {
              linkedin: '#',
              behance: '#'
            }
          }
        ]
      }
    },
    status: 'published'
  },

  // Contact Section Content
  {
    type: 'page',
    title: 'Connection Nexus',
    slug: 'contact',
    content: {
      hero: {
        title: 'Connection Nexus',
        subtitle: 'Open a direct, transparent channel for communication'
      },
      contactForm: {
        fields: [
          { name: 'name', label: 'Your Name', type: 'text', required: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'subject', label: 'Subject', type: 'text', required: true },
          { name: 'message', label: 'Your Message', type: 'textarea', required: true, maxLength: 500 }
        ],
        submitText: 'Send Message',
        successMessage: 'Message sent successfully!',
        errorMessage: 'Failed to send message. Please try again.'
      },
      directChannels: {
        title: 'Direct Channels',
        methods: [
          {
            title: 'Email',
            value: 'info@pixelspetals.com',
            icon: 'email',
            action: 'mailto:info@pixelspetals.com'
          },
          {
            title: 'Phone',
            value: '+1 (619) 609-6099',
            icon: 'phone',
            action: 'tel:+16196096099'
          },
          {
            title: 'Office',
            value: 'San Diego, CA',
            icon: 'building',
            action: '#'
          }
        ]
      },
      location: {
        title: 'Our Location',
        address: 'San Diego, CA',
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d429158.3724717658!2d-117.389534!3d32.8245525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9530fad921e4b%3A0xd3a21fdfd15df79!2sSan%20Diego%2C%20CA!5e0!3m2!1sen!2sus!4v1678886358539!5m2!1sen!2sus'
      },
      socialLinks: {
        title: 'Connect',
        links: [
          { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/ravivalluri/' },
          { name: 'GitHub', icon: 'github', url: 'https://github.com/ravivalluri' },
          { name: 'Medium', icon: 'medium', url: 'https://medium.com/@ravivalluri' },
          { name: 'SubStack', icon: 'newsletter', url: 'https://substack.com/@bloodfeather?' },
          { name: 'StackOverflow', icon: 'stackoverflow', url: 'https://stackoverflow.com/users/10908679/compileravi' }
        ]
      }
    },
    status: 'published'
  },

  // Individual Project Pages
  {
    type: 'project',
    title: 'OTP Widget - Secure Authentication',
    slug: 'otp-widget',
    content: {
      hero: {
        title: 'OTP Widget',
        subtitle: 'Secure authentication microservice',
        image: '/projects/otp-widget/hero.jpg',
        status: 'Completed',
        client: 'Enterprise Security Platform',
        duration: '3 months',
        team: '2 developers, 1 designer'
      },
      overview: {
        description: 'Advanced multi-factor authentication system with SMS and email verification, built as a reusable microservice for enterprise applications.',
        challenge: 'The client needed a secure, scalable authentication solution that could be integrated across multiple applications while maintaining consistent user experience.',
        solution: 'We developed a comprehensive OTP system using AWS Cognito, Lambda functions, and a React-based widget that can be embedded in any application.'
      },
      technologies: ['React', 'AWS Cognito', 'Lambda', 'API Gateway', 'DynamoDB', 'SES', 'SNS'],
      features: [
        'Multi-factor authentication with SMS and email OTP',
        'Customizable UI components with theme support',
        'Rate limiting and security controls',
        'Analytics and monitoring dashboard',
        'Easy integration with existing applications',
        'WCAG accessibility compliance'
      ],
      results: {
        metrics: [
          { label: 'Authentication Speed', value: '< 2 seconds', improvement: '+150%' },
          { label: 'Security Incidents', value: '0', improvement: '-100%' },
          { label: 'User Satisfaction', value: '4.8/5', improvement: '+40%' },
          { label: 'Integration Time', value: '< 1 day', improvement: '-80%' }
        ]
      },
      gallery: [
        '/projects/otp-widget/login-flow.jpg',
        '/projects/otp-widget/sms-verification.jpg',
        '/projects/otp-widget/email-verification.jpg',
        '/projects/otp-widget/admin-dashboard.jpg'
      ]
    },
    metadata: {
      category: 'authentication',
      tags: ['security', 'microservice', 'aws', 'react'],
      featured: true
    },
    status: 'published'
  },

  {
    type: 'project',
    title: 'EKS Kafka Pipeline - Event Streaming',
    slug: 'eks-kafka-pipeline',
    content: {
      hero: {
        title: 'EKS Kafka Pipeline',
        subtitle: 'High-volume event streaming platform',
        image: '/projects/kafka-pipeline/hero.jpg',
        status: 'Completed',
        client: 'Financial Technology Company',
        duration: '6 months',
        team: '3 backend engineers, 1 DevOps engineer'
      },
      overview: {
        description: 'Enterprise-grade event streaming platform for real-time data processing, capable of handling millions of events per day with fault tolerance and auto-scaling.',
        challenge: 'The client needed to process financial transactions in real-time across multiple services while ensuring data consistency and regulatory compliance.',
        solution: 'We architected a Kafka-based streaming platform on AWS EKS with custom operators for auto-scaling and comprehensive monitoring.'
      },
      technologies: ['Apache Kafka', 'Kubernetes', 'Java Spring Boot', 'AWS EKS', 'Helm', 'Prometheus', 'Grafana'],
      features: [
        'Real-time event processing with sub-second latency',
        'Automatic scaling based on queue depth',
        'Dead letter queues for error handling',
        'Comprehensive monitoring and alerting',
        'Multi-region disaster recovery',
        'Compliance with financial regulations'
      ],
      results: {
        metrics: [
          { label: 'Events Processed/Day', value: '5M+', improvement: '+500%' },
          { label: 'Processing Latency', value: '< 100ms', improvement: '+300%' },
          { label: 'System Uptime', value: '99.99%', improvement: '+25%' },
          { label: 'Infrastructure Cost', value: '-40%', improvement: '-40%' }
        ]
      }
    },
    metadata: {
      category: 'data-streaming',
      tags: ['kafka', 'kubernetes', 'aws', 'real-time'],
      featured: true
    },
    status: 'published'
  },

  // Services
  {
    type: 'service',
    title: 'Full-Stack Web Development',
    slug: 'web-development',
    content: {
      hero: {
        title: 'Full-Stack Web Development',
        subtitle: 'Modern web applications built with cutting-edge technologies',
        icon: 'web-development'
      },
      overview: {
        description: 'We create scalable, high-performance web applications using modern frameworks and cloud-native architectures. From concept to deployment, we handle every aspect of web development.',
        approach: 'Our development process emphasizes user experience, performance optimization, and maintainable code architecture.'
      },
      technologies: {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        backend: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL'],
        database: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis'],
        cloud: ['AWS', 'Vercel', 'Docker', 'Kubernetes']
      },
      services: [
        {
          title: 'Frontend Development',
          description: 'Responsive, interactive user interfaces with modern frameworks',
          features: ['React/Next.js applications', 'Mobile-first responsive design', 'Performance optimization', 'Accessibility compliance']
        },
        {
          title: 'Backend Development',
          description: 'Scalable APIs and server-side applications',
          features: ['RESTful and GraphQL APIs', 'Database design and optimization', 'Authentication and security', 'Cloud integration']
        },
        {
          title: 'DevOps & Deployment',
          description: 'Automated deployment pipelines and infrastructure',
          features: ['CI/CD pipelines', 'Container orchestration', 'Monitoring and logging', 'Auto-scaling infrastructure']
        }
      ],
      pricing: {
        starting: '$5,000',
        timeline: '6-12 weeks',
        includes: ['Full-stack development', 'Testing and QA', 'Deployment', '3 months support']
      }
    },
    status: 'published'
  },

  {
    type: 'service',
    title: 'Mobile App Development',
    slug: 'mobile-development',
    content: {
      hero: {
        title: 'Mobile App Development',
        subtitle: 'Cross-platform mobile applications with native performance',
        icon: 'mobile-development'
      },
      overview: {
        description: 'We develop high-quality mobile applications for iOS and Android using React Native, ensuring consistent user experience across platforms while maintaining native performance.',
        approach: 'Our mobile development process focuses on user-centric design, performance optimization, and seamless integration with existing systems.'
      },
      technologies: {
        framework: ['React Native', 'Expo'],
        navigation: ['React Navigation', 'Native Stack'],
        state: ['Redux Toolkit', 'Zustand', 'React Query'],
        ui: ['NativeBase', 'React Native Elements', 'Custom Components'],
        backend: ['Firebase', 'AWS Amplify', 'Custom APIs']
      },
      services: [
        {
          title: 'Cross-Platform Development',
          description: 'Single codebase for iOS and Android applications',
          features: ['React Native development', 'Platform-specific optimizations', 'Native module integration', 'App store deployment']
        },
        {
          title: 'UI/UX Design',
          description: 'Beautiful, intuitive mobile interfaces',
          features: ['Mobile-first design', 'Platform design guidelines', 'Gesture-based interactions', 'Dark mode support']
        },
        {
          title: 'Backend Integration',
          description: 'Seamless API integration and data synchronization',
          features: ['RESTful API integration', 'Real-time data sync', 'Offline functionality', 'Push notifications']
        }
      ],
      pricing: {
        starting: '$8,000',
        timeline: '8-16 weeks',
        includes: ['Cross-platform app', 'UI/UX design', 'Backend integration', 'App store submission']
      }
    },
    status: 'published'
  },

  // Company Information
  {
    type: 'page',
    title: 'Company Information',
    slug: 'company-info',
    content: {
      company: {
        name: 'Pixels & Petals',
        founded: '2018',
        location: 'San Diego, CA',
        industry: 'Software Development & Design',
        size: '2-10 employees',
        type: 'LLC'
      },
      mission: 'To build digital products that are both high-performing and elegantly designed, helping businesses transform their ideas into scalable, user-centered solutions.',
      vision: 'To be the trusted technology partner for innovative companies, delivering cutting-edge software solutions that drive real-world impact.',
      expertise: [
        'Full-stack web development',
        'Mobile app development',
        'Cloud architecture and DevOps',
        'UI/UX design and research',
        'System integration and APIs',
        'Database design and optimization'
      ],
      certifications: [
        'AWS Certified Solutions Architect',
        'Google Cloud Professional Developer',
        'Certified Kubernetes Administrator'
      ],
      contact: {
        email: 'info@pixelspetals.com',
        phone: '+1 (619) 609-6099',
        address: 'San Diego, CA',
        timezone: 'Pacific Time (PT)'
      }
    },
    status: 'published'
  }
];

async function extractAndPushContent() {
  console.log('🔍 Starting frontend content extraction and migration...');

  try {
    console.log(`📦 Extracting ${extractedContent.length} content items from frontend components...`);

    // Clear existing content (optional)
    console.log('⚠️  Note: This will add content to the existing database');

    const createdItems = await contentService.bulkCreateContent(extractedContent);

    console.log(`✅ Successfully migrated ${createdItems.length} content items from frontend:`);

    // Group by type for summary
    const summary = createdItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(summary).forEach(([type, count]) => {
      console.log(`  - ${count} ${type}${count > 1 ? 's' : ''}`);
    });

    console.log('\n🎉 Frontend content migration completed successfully!');
    console.log('\n📋 Migrated content includes:');
    console.log('  ✨ Complete homepage with hero, projects, about, and contact sections');
    console.log('  🔐 Detailed project pages (OTP Widget, Kafka Pipeline, etc.)');
    console.log('  🛠️  Service pages (Web Development, Mobile Development)');
    console.log('  👥 Team member profiles and company information');
    console.log('  📞 Contact methods and social links');
    console.log('  🎨 Design system and tech stack information');

    console.log('\n🚀 Your content is now ready to be consumed via API:');
    console.log('  - GET /api/content?type=page&status=published');
    console.log('  - GET /api/content?type=project&status=published');
    console.log('  - GET /api/content?type=service&status=published');
    console.log('  - GET /api/content/slug/home');

  } catch (error) {
    console.error('❌ Error extracting and pushing content:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Only run if this file is executed directly
if (require.main === module) {
  extractAndPushContent();
}