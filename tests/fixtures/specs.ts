import { LandingPageSpec } from '../../src/types/index';

/**
 * Complete landing page specification for a SaaS productivity tool.
 * Represents a modern, feature-rich product with multiple CTAs.
 */
export const saasProductSpec: LandingPageSpec = {
  businessName: 'TaskFlow Pro',
  tagline: 'AI-powered task management for distributed teams',
  description:
    'TaskFlow Pro is the all-in-one task management platform that helps remote teams collaborate seamlessly. Powered by AI, it automatically prioritizes your work, predicts deadlines, and keeps your team in sync.',

  hero: {
    headline: 'Work Smarter, Not Harder',
    subheadline:
      'Let AI handle task organization while you focus on what matters most. Join 50,000+ teams already boosting productivity.',
    cta: {
      text: 'Start Free Trial',
      url: 'https://taskflow.example.com/signup',
      style: 'primary',
    },
    imageUrl: 'https://images.example.com/hero-taskflow.png',
  },

  features: [
    {
      title: 'AI Task Prioritization',
      description:
        'Automatically sorts your tasks based on urgency, dependencies, and deadlines using advanced machine learning.',
      icon: '🤖',
    },
    {
      title: 'Real-time Collaboration',
      description:
        'Work together seamlessly with instant updates, comments, and @mentions across your entire team.',
      icon: '👥',
    },
    {
      title: 'Smart Deadlines',
      description:
        'AI predicts optimal deadline dates based on team velocity and project complexity.',
      icon: '📅',
    },
    {
      title: 'Native Integrations',
      description:
        'Connect with Slack, Microsoft Teams, GitHub, Jira, and 100+ other tools your team already uses.',
      icon: '🔗',
    },
    {
      title: 'Advanced Analytics',
      description:
        'Get actionable insights into team productivity, velocity trends, and bottlenecks.',
      icon: '📊',
    },
    {
      title: 'Enterprise Security',
      description:
        'SOC 2 certified with end-to-end encryption, SSO, and role-based access controls.',
      icon: '🔒',
    },
  ],

  about: {
    title: 'Why Choose TaskFlow Pro?',
    content:
      'Founded in 2022, TaskFlow Pro was built by team leaders frustrated with outdated project management tools. We believe that great collaboration tools should be intuitive, powerful, and intelligent. Our AI engine learns from your team\'s patterns to provide personalized recommendations that actually improve how you work together.',
  },

  contact: {
    email: 'support@taskflow.example.com',
    phone: '+1-555-0123',
    address: '123 Innovation Drive, San Francisco, CA 94105',
    social: {
      twitter: 'https://twitter.com/taskflowpro',
      linkedin: 'https://linkedin.com/company/taskflowpro',
      github: 'https://github.com/taskflowpro',
    },
  },

  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937',
  },

  font: 'modern',
  template: 'bold',

  meta: {
    title: 'TaskFlow Pro - AI-Powered Task Management for Teams',
    description:
      'Boost team productivity with AI-powered task management. Automatic prioritization, smart deadlines, and seamless collaboration for distributed teams.',
    keywords: [
      'task management',
      'team collaboration',
      'project management',
      'AI productivity',
      'remote work',
    ],
  },
};

/**
 * E-commerce product specification for an online fashion retailer.
 * Demonstrates extensive features and heavy emphasis on visual appeal.
 */
export const ecommerceSpec: LandingPageSpec = {
  businessName: 'StyleHub',
  tagline: 'Sustainable fashion delivered to your door',
  description:
    'StyleHub curates the finest sustainable and ethical fashion brands from around the world. Shop conscious fashion that looks great and does good.',

  hero: {
    headline: 'Fashion That Feels Good',
    subheadline:
      'Discover ethically-made clothes from 200+ independent designers. Free shipping on orders over $50.',
    cta: {
      text: 'Shop Now',
      url: 'https://stylehub.example.com/shop',
      style: 'primary',
    },
    imageUrl: 'https://images.example.com/hero-fashion.png',
  },

  features: [
    {
      title: 'Ethically Sourced',
      description:
        'Every piece is made with fair wages, safe working conditions, and sustainable materials.',
      icon: '🌿',
    },
    {
      title: 'Designer Curation',
      description:
        'Our style experts hand-pick emerging and established sustainable brands just for you.',
      icon: '✨',
    },
    {
      title: 'Free Returns',
      description:
        'Shop risk-free with 30-day returns and free return shipping on all orders.',
      icon: '↩️',
    },
    {
      title: 'Size Inclusive',
      description:
        'Our brands range from XS to 4XL, celebrating beauty in all sizes and shapes.',
      icon: '👗',
    },
    {
      title: 'Personal Styling',
      description:
        'Book a free session with our stylists to get personalized recommendations.',
      icon: '👩‍🦰',
    },
    {
      title: 'Carbon Neutral Shipping',
      description:
        'We offset 100% of shipping emissions to keep our environmental impact minimal.',
      icon: '🌍',
    },
  ],

  about: {
    title: 'About StyleHub',
    content:
      'Founded by sustainable fashion advocates in 2021, StyleHub exists because we believe fashion should never come at the cost of people or the planet. We partner directly with ethical brands that share our values, making conscious fashion accessible and affordable for everyone.',
  },

  contact: {
    email: 'hello@stylehub.example.com',
    phone: '+1-555-0456',
    address: '456 Green Street, Portland, OR 97204',
    social: {
      instagram: 'https://instagram.com/stylehub',
      twitter: 'https://twitter.com/stylehub',
      facebook: 'https://facebook.com/stylehub',
    },
  },

  colors: {
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#10B981',
    background: '#FFF5FA',
    text: '#374151',
  },

  font: 'playful',
  template: 'minimal',

  meta: {
    title: 'StyleHub - Sustainable Fashion from Ethical Brands',
    description:
      'Shop ethical, sustainable fashion from 200+ independent designers. Free shipping, free returns, size inclusive. Fashion that feels good.',
    keywords: [
      'sustainable fashion',
      'ethical clothing',
      'eco-friendly',
      'fair trade',
      'independent designers',
    ],
  },
};

/**
 * Professional services specification for a consulting firm.
 * Emphasizes expertise, case studies, and professional trust.
 */
export const professionalServicesSpec: LandingPageSpec = {
  businessName: 'Stratosphere Consulting',
  tagline: 'Digital transformation for enterprise organizations',
  description:
    'We help Fortune 500 companies modernize their operations and unlock growth through strategic technology implementation. With 15+ years of experience and 98% client satisfaction rate.',

  hero: {
    headline: 'Transform Your Business Through Strategic Technology',
    subheadline:
      'Proven digital transformation solutions for enterprise clients. 50+ successful implementations across Fortune 500 companies.',
    cta: {
      text: 'Schedule a Consultation',
      url: 'https://stratosphere.example.com/contact',
      style: 'primary',
    },
    imageUrl: 'https://images.example.com/hero-consulting.png',
  },

  features: [
    {
      title: 'Strategic Planning',
      description:
        'We develop comprehensive digital transformation roadmaps aligned with your business objectives.',
      icon: '📋',
    },
    {
      title: 'Enterprise Implementation',
      description:
        'End-to-end implementation of complex systems with minimal disruption to operations.',
      icon: '🏗️',
    },
    {
      title: 'Change Management',
      description:
        'Expert guidance on organizational change, training, and adoption strategies.',
      icon: '🔄',
    },
    {
      title: 'Expert Team',
      description:
        'Access to industry veterans with average 12+ years of experience in your vertical.',
      icon: '👔',
    },
    {
      title: 'Measurable Results',
      description:
        'Average 35% cost reduction and 42% efficiency improvement within 12 months.',
      icon: '📈',
    },
    {
      title: 'Ongoing Support',
      description: 'Dedicated support team and quarterly business reviews ensure long-term success.',
      icon: '🤝',
    },
  ],

  about: {
    title: 'About Stratosphere',
    content:
      'Founded in 2008, Stratosphere Consulting has guided over 150 enterprises through successful digital transformations. Our team combines deep technical expertise with business acumen, ensuring that technology investments deliver real business value. We pride ourselves on building long-term partnerships, not just completing projects.',
  },

  contact: {
    email: 'inquiry@stratosphere.example.com',
    phone: '+1-555-0789',
    address: '789 Corporate Plaza, New York, NY 10017',
    social: {
      linkedin: 'https://linkedin.com/company/stratosphere-consulting',
      twitter: 'https://twitter.com/stratosphere',
    },
  },

  colors: {
    primary: '#1E40AF',
    secondary: '#0369A1',
    accent: '#F59E0B',
    background: '#F8FAFC',
    text: '#0F172A',
  },

  font: 'professional',
  template: 'minimal',

  meta: {
    title: 'Stratosphere Consulting - Digital Transformation for Enterprise',
    description:
      'Strategic technology consulting for Fortune 500 companies. 50+ successful implementations, 98% satisfaction rate. Digital transformation experts.',
    keywords: [
      'consulting',
      'digital transformation',
      'enterprise technology',
      'strategic planning',
      'business technology',
    ],
  },
};

/**
 * Minimal specification edge case - absolute minimum required fields.
 * Tests the baseline spec that still validates against the schema.
 */
export const minimalSpec: LandingPageSpec = {
  businessName: 'MiniApp',
  tagline: 'Simple and effective',
  description: 'A minimal application with essential features.',

  hero: {
    headline: 'Get Started',
    subheadline: 'Join us today',
    cta: {
      text: 'Sign Up',
      url: 'https://example.com/signup',
      style: 'primary',
    },
  },

  features: [
    {
      title: 'Feature One',
      description: 'This is the first feature.',
    },
    {
      title: 'Feature Two',
      description: 'This is the second feature.',
    },
    {
      title: 'Feature Three',
      description: 'This is the third feature.',
    },
  ],

  colors: {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#666666',
  },

  font: 'modern',
  template: 'minimal',

  meta: {
    title: 'MiniApp',
    description: 'A minimal application.',
  },
};

/**
 * Maximal specification - demonstrates all optional fields and complete customization.
 * Tests the upper bounds of configuration options.
 */
export const maximalSpec: LandingPageSpec = {
  businessName: 'TechVenture Analytics',
  tagline: 'Real-time intelligence for data-driven enterprises',
  description:
    'TechVenture Analytics provides cutting-edge business intelligence and advanced analytics solutions. Our platform processes petabytes of data daily, delivering actionable insights to power strategic decisions. Trusted by industry leaders in finance, retail, healthcare, and technology sectors.',

  hero: {
    headline: 'Unlock Hidden Opportunities in Your Data',
    subheadline:
      'Transform raw data into competitive advantage with AI-powered analytics. Real-time dashboards, predictive modeling, and automated reporting. Used by 10,000+ enterprises worldwide processing 5 petabytes of data daily.',
    cta: {
      text: 'Request Live Demo',
      url: 'https://techventure.example.com/demo',
      style: 'primary',
    },
    imageUrl: 'https://images.example.com/hero-techventure-analytics.png',
  },

  features: [
    {
      title: 'Real-Time Analytics Engine',
      description:
        'Process and analyze data in real-time with millisecond latency. Machine learning models automatically adjust to data patterns for optimal performance.',
      icon: '⚡',
    },
    {
      title: 'Advanced Visualization',
      description:
        'Interactive dashboards with 50+ chart types, custom metrics, and drill-down capabilities. Create reports in seconds, not days.',
      icon: '📊',
    },
    {
      title: 'Predictive Intelligence',
      description:
        'AI-powered forecasting, anomaly detection, and trend analysis. Identify opportunities and risks before competitors.',
      icon: '🔮',
    },
    {
      title: 'Enterprise Integration',
      description:
        'Native connectors for Salesforce, SAP, Oracle, Snowflake, and 200+ data sources. APIs and webhooks for custom integrations.',
      icon: '🔌',
    },
    {
      title: 'Governance & Compliance',
      description:
        'Row-level security, audit trails, and compliance with GDPR, HIPAA, SOC 2. Data governance tools for data stewardship.',
      icon: '🛡️',
    },
    {
      title: 'Scalable Infrastructure',
      description:
        'Auto-scaling cloud architecture handles billions of events per day. 99.99% uptime SLA with multi-region redundancy.',
      icon: '☁️',
    },
  ],

  about: {
    title: 'Why TechVenture Analytics Leads the Industry',
    content:
      'Since 2015, TechVenture Analytics has been at the forefront of enterprise analytics innovation. Our team of 500+ engineers, data scientists, and domain experts has pioneered breakthrough technologies in real-time data processing, machine learning at scale, and business intelligence. We serve customers across all major industries, with particular depth in financial services, e-commerce, and healthcare. Our customers report an average 45% improvement in decision-making speed and 38% increase in revenue from data-driven initiatives. We are committed to continuous innovation, security, and customer success, investing 20% of revenue back into R&D to ensure our platform remains at the cutting edge of analytics technology.',
  },

  contact: {
    email: 'enterprise@techventure.example.com',
    phone: '+1-800-555-0199',
    address: '1000 Innovation Boulevard, San Jose, CA 95110',
    social: {
      twitter: 'https://twitter.com/techventureio',
      linkedin: 'https://linkedin.com/company/techventure-analytics',
      github: 'https://github.com/techventure',
      facebook: 'https://facebook.com/techventureanalytics',
      instagram: 'https://instagram.com/techventure',
    },
  },

  colors: {
    primary: '#1F2937',
    secondary: '#6366F1',
    accent: '#EC4899',
    background: '#F9FAFB',
    text: '#111827',
  },

  font: 'professional',
  template: 'bold',

  meta: {
    title: 'TechVenture Analytics - Enterprise Analytics & BI Platform | Real-Time Intelligence',
    description:
      'Transform raw data into competitive advantage with TechVenture Analytics. Real-time dashboards, predictive modeling, AI-powered insights. Used by 10,000+ enterprises globally.',
    keywords: [
      'analytics',
      'business intelligence',
      'data analytics',
      'BI platform',
      'predictive analytics',
      'dashboard',
      'data visualization',
      'enterprise analytics',
      'real-time analytics',
      'machine learning',
    ],
  },
};

/**
 * Healthcare provider specification - demonstrates professional services variant.
 * Shows how B2B service companies can be represented.
 */
export const healthcareProviderSpec: LandingPageSpec = {
  businessName: 'MedConnect Telemedicine',
  tagline: 'Healthcare at your fingertips, 24/7',
  description:
    'Connect with board-certified doctors and specialists via video consultation. Available 24/7 with average wait time under 5 minutes. HIPAA compliant and covered by most insurance plans.',

  hero: {
    headline: 'See a Doctor in Minutes, Not Weeks',
    subheadline:
      'Get quality healthcare from the comfort of your home. Board-certified doctors, prescriptions included, and insurance accepted.',
    cta: {
      text: 'Start a Visit',
      url: 'https://medconnect.example.com/visit',
      style: 'primary',
    },
    imageUrl: 'https://images.example.com/hero-medconnect.png',
  },

  features: [
    {
      title: '24/7 Availability',
      description: 'Access doctors anytime, even on holidays. Average wait time is under 5 minutes.',
      icon: '🕐',
    },
    {
      title: 'Board-Certified Doctors',
      description:
        'All physicians are verified, board-certified, and practicing in-state. Specialties available for complex cases.',
      icon: '👨‍⚕️',
    },
    {
      title: 'Prescription Delivery',
      description:
        'Medications sent directly to your pharmacy or home. Free shipping on home delivery orders.',
      icon: '💊',
    },
    {
      title: 'Insurance Accepted',
      description:
        'Covered by major insurance providers including Medicare and Medicaid. Pay only your copay.',
      icon: '🏥',
    },
    {
      title: 'Secure & HIPAA Compliant',
      description:
        'Military-grade encryption and full HIPAA compliance ensure your data is protected.',
      icon: '🔐',
    },
    {
      title: 'Medical Records Included',
      description:
        'All visit notes, records, and prescriptions stored securely in your account for easy access.',
      icon: '📋',
    },
  ],

  contact: {
    email: 'support@medconnect.example.com',
    phone: '+1-888-MEDCONNECT',
    address: '2000 Healthcare Drive, Atlanta, GA 30303',
    social: {
      facebook: 'https://facebook.com/medconnect',
      instagram: 'https://instagram.com/medconnect',
    },
  },

  colors: {
    primary: '#059669',
    secondary: '#0891B2',
    accent: '#DC2626',
    background: '#F0F9FF',
    text: '#1F2937',
  },

  font: 'professional',
  template: 'minimal',

  meta: {
    title: 'MedConnect Telemedicine - See a Doctor Online 24/7',
    description:
      'Connect with board-certified doctors via video 24/7. Prescriptions included, insurance accepted. See a doctor in minutes, not weeks.',
    keywords: [
      'telemedicine',
      'online doctor',
      'telehealth',
      'healthcare',
      'virtual visit',
      '24/7 doctor',
    ],
  },
};
