import { contentService } from '../src/services/contentService';
import { CreateContentItem } from '../src/types/content';

const sampleContent: CreateContentItem[] = [
  // Pages
  {
    type: 'page',
    title: 'Home',
    slug: 'home',
    content: {
      hero: {
        title: 'Welcome to Pixels & Petals',
        subtitle: 'Creating beautiful digital experiences',
        cta: 'Get Started',
        backgroundImage: '/hero-bg.jpg'
      },
      sections: [
        {
          type: 'features',
          title: 'What We Do',
          items: [
            { title: 'Web Design', description: 'Beautiful, responsive websites', icon: 'design' },
            { title: 'Development', description: 'Modern web applications', icon: 'code' },
            { title: 'Branding', description: 'Complete brand identity', icon: 'brand' }
          ]
        }
      ]
    },
    status: 'published'
  },
  {
    type: 'page',
    title: 'About Us',
    slug: 'about',
    content: {
      hero: {
        title: 'About Pixels & Petals',
        subtitle: 'Passionate creators dedicated to digital excellence'
      },
      sections: [
        {
          type: 'text',
          content: 'We are a team of designers and developers who believe in the power of great digital experiences. Our mission is to help businesses grow through beautiful, functional websites and applications.'
        },
        {
          type: 'stats',
          items: [
            { label: 'Projects Completed', value: '150+' },
            { label: 'Happy Clients', value: '75+' },
            { label: 'Years Experience', value: '5+' }
          ]
        }
      ]
    },
    status: 'published'
  },
  {
    type: 'page',
    title: 'Contact',
    slug: 'contact',
    content: {
      hero: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your next project?'
      },
      contact: {
        email: 'hello@pixelsandpetals.com',
        phone: '+1 (555) 123-4567',
        address: '123 Creative Street, Design City, DC 12345'
      },
      form: {
        fields: ['name', 'email', 'message'],
        submitText: 'Send Message'
      }
    },
    status: 'published'
  },

  // Services
  {
    type: 'service',
    title: 'Web Design',
    slug: 'web-design',
    content: {
      description: 'Custom web design services that combine aesthetics with functionality',
      features: [
        'Responsive Design',
        'Modern UI/UX',
        'Cross-browser Compatible',
        'SEO Optimized',
        'Fast Loading'
      ],
      process: [
        { step: 1, title: 'Discovery', description: 'Understanding your business and goals' },
        { step: 2, title: 'Design', description: 'Creating wireframes and mockups' },
        { step: 3, title: 'Development', description: 'Building your website' },
        { step: 4, title: 'Launch', description: 'Going live and ongoing support' }
      ],
      pricing: {
        starting: '$2,500',
        timeline: '4-6 weeks'
      }
    },
    status: 'published'
  },
  {
    type: 'service',
    title: 'Web Development',
    slug: 'web-development',
    content: {
      description: 'Full-stack web development using modern technologies',
      features: [
        'React/Next.js',
        'Node.js/Express',
        'Database Integration',
        'API Development',
        'Cloud Deployment'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'AWS'],
      pricing: {
        starting: '$5,000',
        timeline: '6-10 weeks'
      }
    },
    status: 'published'
  },
  {
    type: 'service',
    title: 'Branding & Identity',
    slug: 'branding',
    content: {
      description: 'Complete brand identity design and development',
      features: [
        'Logo Design',
        'Brand Guidelines',
        'Marketing Materials',
        'Color Palette',
        'Typography System'
      ],
      deliverables: [
        'Logo variations',
        'Brand style guide',
        'Business card design',
        'Letterhead template',
        'Social media assets'
      ],
      pricing: {
        starting: '$1,500',
        timeline: '2-4 weeks'
      }
    },
    status: 'published'
  },

  // Projects
  {
    type: 'project',
    title: 'E-commerce Platform',
    slug: 'ecommerce-platform',
    content: {
      description: 'Modern e-commerce platform with advanced features',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      features: [
        'Product catalog',
        'Shopping cart',
        'Payment processing',
        'Order management',
        'Admin dashboard'
      ],
      images: [
        '/projects/ecommerce/home.jpg',
        '/projects/ecommerce/product.jpg',
        '/projects/ecommerce/checkout.jpg'
      ],
      link: 'https://demo-ecommerce.pixelsandpetals.com',
      client: 'Fashion Retailer',
      year: '2024'
    },
    status: 'published'
  },
  {
    type: 'project',
    title: 'Restaurant Website',
    slug: 'restaurant-website',
    content: {
      description: 'Beautiful restaurant website with online ordering',
      technologies: ['Next.js', 'Sanity CMS', 'Vercel'],
      features: [
        'Menu display',
        'Online reservations',
        'Location finder',
        'Photo gallery',
        'Contact forms'
      ],
      images: [
        '/projects/restaurant/home.jpg',
        '/projects/restaurant/menu.jpg',
        '/projects/restaurant/gallery.jpg'
      ],
      link: 'https://demo-restaurant.pixelsandpetals.com',
      client: 'Local Bistro',
      year: '2024'
    },
    status: 'published'
  },

  // Team Members
  {
    type: 'team-member',
    title: 'Sarah Johnson',
    slug: 'sarah-johnson',
    content: {
      role: 'Lead Designer',
      bio: 'Sarah brings 8+ years of experience in UI/UX design and has worked with startups and Fortune 500 companies.',
      skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
      image: '/team/sarah.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        dribbble: 'https://dribbble.com/sarahjohnson'
      }
    },
    status: 'published'
  },
  {
    type: 'team-member',
    title: 'Mike Chen',
    slug: 'mike-chen',
    content: {
      role: 'Full-Stack Developer',
      bio: 'Mike is a passionate developer who loves building scalable web applications using modern technologies.',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Database Design'],
      image: '/team/mike.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/mikechen',
        github: 'https://github.com/mikechen'
      }
    },
    status: 'published'
  },

  // Blog Posts
  {
    type: 'post',
    title: '10 Web Design Trends for 2024',
    slug: 'web-design-trends-2024',
    content: {
      excerpt: 'Discover the latest web design trends that will shape the digital landscape in 2024.',
      content: `
        <p>The world of web design continues to evolve rapidly, with new trends emerging that push the boundaries of creativity and user experience. Here are the top 10 trends we're seeing in 2024:</p>

        <h2>1. Minimalist Design with Bold Typography</h2>
        <p>Clean, minimalist layouts paired with striking typography create powerful visual impact while maintaining excellent usability.</p>

        <h2>2. Dark Mode Everything</h2>
        <p>Dark mode is no longer optional. Users expect it, and it's become a standard feature across all digital platforms.</p>

        <p>Stay tuned for more insights on modern web design trends!</p>
      `,
      author: 'Sarah Johnson',
      publishDate: '2024-01-15',
      tags: ['Design', 'Trends', 'Web Design'],
      featuredImage: '/blog/web-trends-2024.jpg'
    },
    status: 'published'
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    console.log(`📦 Creating ${sampleContent.length} content items...`);

    const createdItems = await contentService.bulkCreateContent(sampleContent);

    console.log(`✅ Successfully created ${createdItems.length} content items:`);

    // Group by type for summary
    const summary = createdItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(summary).forEach(([type, count]) => {
      console.log(`  - ${count} ${type}${count > 1 ? 's' : ''}`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Sample content created:');
    console.log('  - Home, About, Contact pages');
    console.log('  - Web Design, Development, Branding services');
    console.log('  - E-commerce and Restaurant project examples');
    console.log('  - Team member profiles');
    console.log('  - Sample blog post');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Only run if this file is executed directly
if (require.main === module) {
  seedDatabase();
}