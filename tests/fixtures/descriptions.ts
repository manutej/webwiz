/**
 * Test descriptions for various business types.
 * Used to test the spec generation with different input scenarios.
 */

/**
 * Short, concise business description.
 * Minimal context for testing edge case handling.
 */
export const shortDescription =
  'We make fitness tracking software for gyms.';

/**
 * Detailed business description with specific metrics and features.
 * Maximum context for comprehensive spec generation.
 */
export const detailedDescription = `
We are FitFlow, a comprehensive fitness management platform for boutique studios and gyms.
Our platform includes member management, class booking, payment processing, and performance analytics.

Key features:
- Real-time class scheduling and automatic waitlist management
- Payment integration with Stripe, Square, and PayPal
- Mobile app for members to book classes and track progress
- Staff management with shift scheduling
- Revenue analytics and member retention insights
- AI-powered class recommendations based on member preferences

Our customer base includes 500+ fitness studios across North America with 50,000+ active members.
We've been in operation for 5 years and have achieved 40% year-over-year growth.
Average NPS score: 72, Customer retention rate: 92%.

Target customers: Boutique fitness studios, CrossFit boxes, yoga studios, and personal training facilities.
Price point: $199-999/month based on studio size.
`;

/**
 * Long description emphasizing features and benefits.
 * Tests handling of verbose input with rich feature descriptions.
 */
export const longDescription =
  'TechFlow is an enterprise software-as-a-service platform designed for software development teams. We provide continuous integration and continuous deployment (CI/CD) solutions that automate testing, building, and deployment of applications. Our platform supports JavaScript, Python, Go, Rust, Java, and many other programming languages. We offer advanced features like automated rollbacks, canary deployments, A/B testing infrastructure, and comprehensive logging and monitoring. Our customers include Fortune 500 companies and fast-growing startups. We have 10,000+ active users and process over 1 million deployments per month. Our platform is built on Kubernetes and runs on AWS, GCP, and Azure.';

/**
 * Business description with emphasis on target audience and use cases.
 * Tests integration of audience information into spec generation.
 */
export const audienceFocusedDescription =
  'EduLearn is an online education platform for adult learners interested in professional development. We offer courses in data science, software engineering, product management, and design. Our courses are taught by industry experts and include hands-on projects, peer reviews, and career coaching. Target audience: Professionals looking to upskill or transition careers. Most students are 25-45 years old with college degrees working in tech or adjacent fields.';

/**
 * Minimal business description - only name and category.
 * Edge case for very sparse input.
 */
export const minimalDescription = 'CloudPro - cloud migration services';

/**
 * Description with specific business model details.
 * Tests comprehensiveness of spec generation with business model context.
 */
export const businessModelDescription = `
GreenPackage is a sustainable packaging company specializing in eco-friendly alternatives to plastic.
We manufacture compostable packaging from mushroom mycelium and plant-based materials.

Business model:
- B2B sales to e-commerce companies and subscription boxes
- Bulk ordering (minimum order 1000 units)
- Custom branding and printing available
- Recurring contracts with monthly delivery schedules

Current metrics:
- 200+ active B2B customers
- $5M ARR, growing 25% YoY
- Shipped over 50 million units in 2023
- Carbon negative operations certified

Value proposition: Companies reduce plastic waste while improving brand image. Our packaging is 40% cheaper than alternatives and 100% compostable.

Target markets: E-commerce platforms, subscription boxes, consumer goods brands, food delivery services.
`;

/**
 * Service-oriented business description.
 * Tests handling of services vs. products in spec generation.
 */
export const serviceDescription = `
Nexus Creative is a full-service digital marketing agency specializing in B2B technology companies.
We provide services including:
- Brand strategy and positioning
- Content marketing and thought leadership
- Paid advertising (Google, LinkedIn, Facebook)
- SEO and organic growth
- Marketing automation and CRM setup
- Analytics and reporting

We work with pre-seed through Series C startups, helping them establish market position and generate qualified leads.
Average engagement: 6 months to 2 years.
Average client retention rate: 85%.
`;

/**
 * Market-focused business description.
 * Emphasizes market positioning and competitive advantage.
 */
export const marketFocusedDescription = `
DataVault is a secure data storage and backup solution for small to medium businesses.
Unique features:
- End-to-end encryption with keys held only by customers
- Automatic hourly backups
- One-click restore functionality
- Multi-region redundancy
- Compliance with GDPR, CCPA, HIPAA

Positioned as the privacy-first alternative to Dropbox and OneDrive.
Customers primarily in healthcare, legal, and finance industries.
Pricing: $99-499/month depending on storage and team size.
`;

/**
 * Startup pitch-style description.
 * Tests handling of investor pitch format.
 */
export const startupPitchDescription =
  'CodeMentor is the Uber for software engineering mentorship. We connect junior developers with experienced engineers for hourly mentoring sessions. Revenue share: 70/30 split with mentors. Active in US market with 500+ mentors and 2000+ mentees. Monthly recurring revenue: $50k, growing 15% MoM. Target: $1M MRR by end of next year.';

/**
 * Ecommerce-focused description.
 * Detailed product and audience information.
 */
export const ecommerceDescription = `
VintageVibes is an online marketplace for vintage and retro home decor from the 1950s-1990s.
We curate items from estate sales, thrift stores, and individual collectors worldwide.

Product categories:
- Mid-century modern furniture
- Vintage kitchen appliances and cookware
- Retro lighting and lamps
- Collectible home accessories
- Authentic vintage art and posters

Our customers are interior designers, vintage enthusiasts, and collectors aged 25-65.
Average order value: $150
Monthly active buyers: 5000+
Repeat purchase rate: 35%

Competitive advantages:
- Authenticity guarantees and provenance verification
- Professional photography and detailed descriptions
- Fast shipping with 30-day returns
- Exclusive partnerships with estate sale companies
`;

/**
 * B2B SaaS focused description.
 * Technical and business context combined.
 */
export const saasDescription = `
TeamSync is a team communication platform combining chat, video, and document collaboration.
Built for remote and hybrid teams, it competes with Slack, Teams, and Zoom.

Key differentiators:
- Offline functionality with automatic sync when online
- End-to-end encrypted channels available
- Integrated project management and file storage
- AI-powered meeting transcription and action items
- Flat pricing model ($10/user/month) vs. per-feature pricing

Current traction:
- 500 paying customers
- 50K+ daily active users
- $200K MRR
- 20% MoM growth

Target: Enterprise adoption in 18-24 months, aiming for $100M ARR by 2026.
`;
