import { z } from 'zod';

/**
 * Color scheme for the landing page
 */
export const ColorSchemeSchema = z.object({
  primary: z.string().describe('Primary brand color (hex)'),
  secondary: z.string().describe('Secondary color (hex)'),
  accent: z.string().describe('Accent color for CTAs (hex)'),
  background: z.string().optional().describe('Background color (hex)'),
  text: z.string().optional().describe('Text color (hex)'),
});

/**
 * Call-to-action button configuration
 */
export const CTASchema = z.object({
  text: z.string().describe('Button text'),
  url: z.string().describe('Button URL or action'),
  style: z.enum(['primary', 'secondary', 'outline']).default('primary'),
});

/**
 * Feature/benefit item
 */
export const FeatureSchema = z.object({
  title: z.string().describe('Feature title'),
  description: z.string().describe('Feature description'),
  icon: z.string().optional().describe('Icon name or emoji'),
});

/**
 * Social media links
 */
export const SocialLinksSchema = z.object({
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

/**
 * Complete landing page specification
 */
export const LandingPageSpecSchema = z.object({
  // Business Information
  businessName: z.string().describe('Business or product name'),
  tagline: z.string().describe('Short, catchy tagline'),
  description: z.string().describe('Brief description of the business/product'),

  // Hero Section
  hero: z.object({
    headline: z.string().describe('Main hero headline'),
    subheadline: z.string().describe('Supporting text'),
    cta: CTASchema,
    imageUrl: z.string().optional().describe('Hero image URL'),
  }),

  // Features/Benefits Section
  features: z.array(FeatureSchema).min(3).max(6).describe('Key features or benefits'),

  // About Section
  about: z.object({
    title: z.string(),
    content: z.string(),
  }).optional(),

  // Contact/Footer
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    social: SocialLinksSchema.optional(),
  }).optional(),

  // Design
  colors: ColorSchemeSchema,
  font: z.enum(['modern', 'classic', 'playful', 'professional']).default('modern'),

  // Template
  template: z.enum(['minimal', 'bold', 'elegant', 'creative']).default('minimal'),

  // Metadata
  meta: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
  }),
});

export type LandingPageSpec = z.infer<typeof LandingPageSpecSchema>;
export type ColorScheme = z.infer<typeof ColorSchemeSchema>;
export type CTA = z.infer<typeof CTASchema>;
export type Feature = z.infer<typeof FeatureSchema>;
export type SocialLinks = z.infer<typeof SocialLinksSchema>;

/**
 * Natural language input from user
 */
export interface NaturalLanguageInput {
  description: string;
  businessType?: string;
  targetAudience?: string;
  additionalContext?: string;
}

/**
 * Deployment configuration
 */
export const DeploymentConfigSchema = z.object({
  type: z.enum(['local', 'vercel', 'netlify', 'export']),
  projectName: z.string(),
  outputDir: z.string().optional(),
});

export type DeploymentConfig = z.infer<typeof DeploymentConfigSchema>;
