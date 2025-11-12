# WebWiz Component Library

The WebWiz Component Library provides a set of reusable, themeable components for building customizable landing pages. This library is designed to be flexible, extensible, and easy to integrate into any project.

## Table of Contents

- [Overview](#overview)
- [Theme System](#theme-system)
  - [Available Themes](#available-themes)
  - [Theme Structure](#theme-structure)
  - [Creating Custom Themes](#creating-custom-themes)
- [Components](#components)
  - [Hero](#hero)
  - [FeatureGrid](#featuregrid)
  - [Footer](#footer)
- [Usage Examples](#usage-examples)
- [Adding New Components](#adding-new-components)
- [Best Practices](#best-practices)

## Overview

The WebWiz Component Library (`/src/components`) is a collection of modular, reusable React components that follow TypeScript best practices and support theme-based customization.

### Key Features

- **Theme System**: Pre-defined themes (minimal, bold, elegant) with support for custom themes
- **Type-Safe**: Full TypeScript support with comprehensive prop interfaces
- **Composable**: Components are designed to work together seamlessly
- **Responsive**: All components support responsive design patterns
- **Customizable**: Easy color and style customization through props

## Theme System

The theme system is the core of the component library's customization capabilities. All components accept theme colors as props and adapt their styling accordingly.

### Available Themes

#### 1. Minimal Theme
Clean, light, and professional. Perfect for corporate and SaaS websites.

```typescript
import { minimalTheme } from '@/components';

// Theme colors:
// - Primary: #3b82f6 (Blue)
// - Secondary: #8b5cf6 (Purple)
// - Accent: #06b6d4 (Cyan)
// - Background: #ffffff (White)
// - Text: #1f2937 (Dark Gray)
```

#### 2. Bold Theme
High contrast and striking. Ideal for creative, startup, and design-focused sites.

```typescript
import { boldTheme } from '@/components';

// Theme colors:
// - Primary: #000000 (Black)
// - Secondary: #ffffff (White)
// - Accent: #ef4444 (Red)
// - Background: #000000 (Black)
// - Text: #ffffff (White)
```

#### 3. Elegant Theme
Sophisticated and refined. Perfect for luxury, premium, and professional services.

```typescript
import { elegantTheme } from '@/components';

// Theme colors:
// - Primary: #1e293b (Deep Slate)
// - Secondary: #64748b (Slate)
// - Accent: #d97706 (Amber)
// - Background: #ffffff (White)
// - Text: #0f172a (Deep Navy)
```

### Theme Structure

Each theme follows this interface:

```typescript
interface Theme {
  colors: {
    primary: string;      // Primary brand color
    secondary: string;    // Secondary color
    accent: string;       // Accent for CTAs and highlights
    background?: string;  // Background color
    text?: string;        // Text color
  };
  name: 'minimal' | 'bold';
}
```

### Creating Custom Themes

You can create custom themes using the `createTheme()` function:

```typescript
import { createTheme } from '@/components';

const myCustomTheme = createTheme({
  primary: '#FF6B6B',      // Red
  secondary: '#4ECDC4',    // Teal
  accent: '#FFE66D',       // Yellow
  background: '#F7F7F7',   // Light Gray
  text: '#2C3E50',         // Dark Blue-Gray
}, 'minimal');
```

Alternatively, use the automatic theme inference:

```typescript
const autoTheme = createTheme({
  primary: '#000000',
  secondary: '#ffffff',
  accent: '#FF0000',
  // Theme will be automatically detected as 'bold' based on dark primary color
});
```

### Theme Utilities

```typescript
import {
  getThemeByName,  // Get a theme by name
  getAllThemes,    // Get all available themes
} from '@/components';

// Get a specific theme
const theme = getThemeByName('bold');

// Get all themes
const allThemes = getAllThemes();
```

## Components

### Hero

The Hero component is the main banner section of a landing page. It displays a headline, subheadline, call-to-action button, and optional image.

#### Props

```typescript
interface HeroProps {
  headline: string;           // Main headline
  subheadline: string;        // Supporting subheadline
  ctaText: string;            // Call-to-action button text
  ctaUrl: string;             // CTA button URL/action
  imageUrl?: string;          // Optional hero image
  accentColor?: string;       // CTA button color (default: theme accent)
  backgroundColor?: string;   // Background color (default: theme background)
  textColor?: string;         // Text color (default: theme text)
}
```

#### Example

```typescript
import { Hero } from '@/components';

export function MyLandingPage() {
  return (
    <Hero
      headline="Welcome to WebWiz"
      subheadline="Create beautiful websites in minutes"
      ctaText="Get Started"
      ctaUrl="/signup"
      accentColor="#06b6d4"
    />
  );
}
```

### FeatureGrid

The FeatureGrid component displays a responsive grid of features with icons and descriptions.

#### Props

```typescript
interface FeatureGridProps {
  features: Array<{
    title: string;           // Feature title
    description: string;     // Feature description
    icon?: string;          // Icon emoji or name
  }>;
  columns?: 2 | 3 | 4;       // Grid columns (default: 3)
  backgroundColor?: string;  // Background color
  textColor?: string;        // Text color
  accentColor?: string;      // Accent color for highlights
}
```

#### Example

```typescript
import { FeatureGrid } from '@/components';

export function FeaturesSection() {
  return (
    <FeatureGrid
      features={[
        {
          icon: '⚡',
          title: 'Fast',
          description: 'Lightning-quick performance'
        },
        {
          icon: '🔒',
          title: 'Secure',
          description: 'Enterprise-grade security'
        },
        {
          icon: '📱',
          title: 'Responsive',
          description: 'Works on all devices'
        },
      ]}
      columns={3}
      accentColor="#3b82f6"
    />
  );
}
```

### Footer

The Footer component displays business information, contact details, and social media links.

#### Props

```typescript
interface FooterProps {
  businessName: string;       // Business name
  tagline: string;           // Short tagline
  email?: string;            // Email address
  phone?: string;            // Phone number
  social?: {
    twitter?: string;        // Twitter URL
    facebook?: string;       // Facebook URL
    instagram?: string;      // Instagram URL
    linkedin?: string;       // LinkedIn URL
    github?: string;         // GitHub URL
  };
  backgroundColor?: string;  // Background color
  textColor?: string;        // Text color
  year?: number;             // Copyright year (default: current year)
}
```

#### Example

```typescript
import { Footer } from '@/components';

export function SiteFooter() {
  return (
    <Footer
      businessName="WebWiz"
      tagline="AI-powered website generator"
      email="hello@webwiz.com"
      social={{
        twitter: 'https://twitter.com/webwiz',
        github: 'https://github.com/webwiz',
      }}
      backgroundColor="#1f2937"
      textColor="#ffffff"
    />
  );
}
```

## Usage Examples

### Basic Landing Page with Theme

```typescript
import React from 'react';
import {
  Hero,
  FeatureGrid,
  Footer,
  minimalTheme,
  type Theme,
} from '@/components';

interface LandingPageProps {
  theme?: Theme;
}

export function LandingPage({ theme = minimalTheme }: LandingPageProps) {
  const colors = theme.colors;

  return (
    <div>
      <Hero
        headline="Build Websites with AI"
        subheadline="Create stunning landing pages in seconds"
        ctaText="Start Free"
        ctaUrl="/signup"
        accentColor={colors.accent}
        backgroundColor={colors.background}
        textColor={colors.text}
      />

      <FeatureGrid
        features={[
          {
            icon: '🤖',
            title: 'AI-Powered',
            description: 'Intelligent content generation',
          },
          {
            icon: '🎨',
            title: 'Beautiful Designs',
            description: 'Professional templates included',
          },
          {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Deploy in seconds',
          },
        ]}
        accentColor={colors.accent}
      />

      <Footer
        businessName="WebWiz"
        tagline="AI-powered website generator"
        email="hello@webwiz.com"
        backgroundColor={colors.primary}
        textColor={colors.secondary}
      />
    </div>
  );
}
```

### Dynamic Theme Selection

```typescript
import { getAllThemes, type Theme } from '@/components';
import { LandingPage } from './LandingPage';

export function App() {
  const themes = getAllThemes();
  const [selectedTheme, setSelectedTheme] = React.useState<Theme>(themes[0]);

  return (
    <div>
      <div className="theme-selector">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setSelectedTheme(theme)}
            className={selectedTheme.name === theme.name ? 'active' : ''}
          >
            {theme.name.charAt(0).toUpperCase() + theme.name.slice(1)}
          </button>
        ))}
      </div>

      <LandingPage theme={selectedTheme} />
    </div>
  );
}
```

## Adding New Components

To add new components to the library, follow these guidelines:

### 1. Create Component File

Create a new file in `/src/components/` with the component name (e.g., `Testimonials.tsx`):

```typescript
import React from 'react';

export interface TestimonialsProps {
  testimonials: Array<{
    author: string;
    role: string;
    content: string;
    image?: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
}

export function Testimonials({
  testimonials,
  backgroundColor = '#ffffff',
  textColor = '#1f2937',
}: TestimonialsProps) {
  return (
    <section style={{ backgroundColor }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border border-gray-200"
              style={{ color: textColor }}
            >
              <p className="text-lg mb-4">"{testimonial.content}"</p>
              <div className="font-semibold">{testimonial.author}</div>
              <div className="text-sm opacity-75">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2. Export from Library

Update `/src/components/index.ts` to export the new component:

```typescript
export { Testimonials } from './Testimonials';
export type { TestimonialsProps } from './Testimonials';
```

### 3. Document in README

Add a new section documenting the component with props, examples, and usage patterns.

### Component Guidelines

- **Props**: Use interfaces for all component props
- **Colors**: Always accept color props with sensible defaults
- **Responsive**: Use Tailwind CSS responsive classes
- **Accessibility**: Include proper ARIA labels and semantic HTML
- **Flexibility**: Make components composable and reusable
- **Documentation**: Include JSDoc comments and prop descriptions

## Best Practices

### 1. Theme-Aware Components

Always design components to accept and respect theme colors:

```typescript
interface ComponentProps {
  // ... other props
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}
```

### 2. Responsive Design

Use Tailwind CSS breakpoints:

```typescript
className="text-lg md:text-2xl lg:text-3xl"
```

### 3. Type Safety

Always use TypeScript interfaces for props:

```typescript
export interface ComponentProps {
  // Properly typed props
}
```

### 4. Accessibility

- Use semantic HTML elements
- Include alt text for images
- Support keyboard navigation
- Use proper heading hierarchy

### 5. Composition

Design components to be composable and work together:

```typescript
<div>
  <Hero {...heroProps} />
  <FeatureGrid {...featureProps} />
  <Testimonials {...testimonialProps} />
  <Footer {...footerProps} />
</div>
```

## Integration with Templates

The component library is designed to work alongside the template system:

- **Templates** (minimal, bold, elegant): Predefined page layouts
- **Components**: Reusable sections that can be used independently
- **Themes**: Color schemes that can be applied to both templates and components

For the latest updates and examples, check the WebWiz documentation and example templates in `/src/templates/`.
