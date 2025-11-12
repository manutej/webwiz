import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import BoldTemplate from '../../src/templates/bold';
import { LandingPageSpec } from '../../src/types';

// Mock spec for testing Bold template
const mockSpec: LandingPageSpec = {
  businessName: 'Bold Ventures',
  tagline: 'Dare to be different',
  description: 'Revolutionary solutions for modern businesses',
  hero: {
    headline: 'Make Your Mark',
    subheadline: 'Stand out from the competition',
    cta: {
      text: 'Start Now',
      url: '#get-started',
      style: 'primary',
    },
    imageUrl: 'https://example.com/bold-hero.jpg',
  },
  features: [
    {
      title: 'Bold Design',
      description: 'Eye-catching aesthetics that demand attention',
      icon: '🎨',
    },
    {
      title: 'Maximum Impact',
      description: 'Leave a lasting impression on your audience',
      icon: '💥',
    },
    {
      title: 'Unforgettable',
      description: 'Create experiences people remember',
      icon: '⭐',
    },
  ],
  about: {
    title: 'Our Mission',
    content: 'We believe in breaking boundaries and challenging the status quo to create something extraordinary.',
  },
  contact: {
    email: 'hello@boldventures.com',
    phone: '+1-555-9999',
    social: {
      twitter: 'https://twitter.com/boldventures',
      linkedin: 'https://linkedin.com/company/boldventures',
      instagram: 'https://instagram.com/boldventures',
    },
  },
  colors: {
    primary: '#FF0080',
    secondary: '#7928CA',
    accent: '#FF4D4D',
  },
  font: 'modern',
  template: 'bold',
  meta: {
    title: 'Bold Ventures - Make Your Mark',
    description: 'Revolutionary solutions for modern businesses',
    keywords: ['bold', 'design', 'innovative'],
  },
};

describe('BoldTemplate', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
    });

    it('should match snapshot', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('hero section', () => {
    it('should render hero headline', () => {
      render(<BoldTemplate spec={mockSpec} />);
      expect(screen.getByText('Make Your Mark')).toBeInTheDocument();
    });

    it('should render hero subheadline', () => {
      render(<BoldTemplate spec={mockSpec} />);
      expect(screen.getByText('Stand out from the competition')).toBeInTheDocument();
    });

    it('should render CTA button with correct text and link', () => {
      render(<BoldTemplate spec={mockSpec} />);
      const ctaButton = screen.getByRole('link', { name: 'Start Now' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#get-started');
    });

    it('should use full-screen hero section', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const heroSection = container.querySelector('section.h-screen');
      expect(heroSection).toBeInTheDocument();
    });

    it('should apply primary color to hero background', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const heroSection = container.querySelector('section.h-screen');
      expect(heroSection).toHaveStyle({ backgroundColor: mockSpec.colors.primary });
    });

    it('should use bold typography classes', () => {
      render(<BoldTemplate spec={mockSpec} />);
      const headline = screen.getByText('Make Your Mark');
      expect(headline).toHaveClass('font-black');
      expect(headline).toHaveClass('tracking-tight');
    });

    it('should have uppercase CTA styling', () => {
      render(<BoldTemplate spec={mockSpec} />);
      const ctaButton = screen.getByRole('link', { name: 'Start Now' });
      expect(ctaButton).toHaveClass('uppercase');
      expect(ctaButton).toHaveClass('tracking-wider');
      expect(ctaButton).toHaveClass('font-bold');
    });
  });

  describe('features section', () => {
    it('should render all features', () => {
      render(<BoldTemplate spec={mockSpec} />);

      expect(screen.getByText('Bold Design')).toBeInTheDocument();
      expect(screen.getByText('Maximum Impact')).toBeInTheDocument();
      expect(screen.getByText('Unforgettable')).toBeInTheDocument();
    });

    it('should render feature descriptions', () => {
      render(<BoldTemplate spec={mockSpec} />);

      expect(screen.getByText('Eye-catching aesthetics that demand attention')).toBeInTheDocument();
      expect(screen.getByText('Leave a lasting impression on your audience')).toBeInTheDocument();
      expect(screen.getByText('Create experiences people remember')).toBeInTheDocument();
    });

    it('should render feature icons when provided', () => {
      render(<BoldTemplate spec={mockSpec} />);

      expect(screen.getByText('🎨')).toBeInTheDocument();
      expect(screen.getByText('💥')).toBeInTheDocument();
      expect(screen.getByText('⭐')).toBeInTheDocument();
    });

    it('should use dark background for features section', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const featuresSection = container.querySelectorAll('section')[1]; // Second section
      expect(featuresSection).toHaveClass('bg-black');
      expect(featuresSection).toHaveClass('text-white');
    });

    it('should have uppercase feature titles', () => {
      render(<BoldTemplate spec={mockSpec} />);
      const featureTitle = screen.getByText('Bold Design');
      expect(featureTitle).toHaveClass('uppercase');
      expect(featureTitle).toHaveClass('font-black');
    });

    it('should handle features without icons', () => {
      const specWithoutIcons = {
        ...mockSpec,
        features: [
          { title: 'Feature X', description: 'Description X' },
          { title: 'Feature Y', description: 'Description Y' },
          { title: 'Feature Z', description: 'Description Z' },
        ],
      };

      render(<BoldTemplate spec={specWithoutIcons} />);

      expect(screen.getByText('Feature X')).toBeInTheDocument();
      expect(screen.getByText('Feature Y')).toBeInTheDocument();
      expect(screen.getByText('Feature Z')).toBeInTheDocument();
    });
  });

  describe('about section', () => {
    it('should render about section when provided', () => {
      render(<BoldTemplate spec={mockSpec} />);

      expect(screen.getByText('Our Mission')).toBeInTheDocument();
      expect(screen.getByText(/breaking boundaries and challenging/)).toBeInTheDocument();
    });

    it('should apply accent color to about section background', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const aboutSection = Array.from(container.querySelectorAll('section')).find(
        section => section.textContent?.includes('Our Mission')
      );
      expect(aboutSection).toHaveStyle({ backgroundColor: mockSpec.colors.accent });
    });

    it('should use bold typography in about section', () => {
      render(<BoldTemplate spec={mockSpec} />);
      const aboutTitle = screen.getByText('Our Mission');
      expect(aboutTitle).toHaveClass('font-black');
      expect(aboutTitle).toHaveClass('uppercase');
      expect(aboutTitle).toHaveClass('tracking-tight');
    });

    it('should not render about section when not provided', () => {
      const specWithoutAbout = { ...mockSpec, about: undefined };
      render(<BoldTemplate spec={specWithoutAbout} />);

      expect(screen.queryByText('Our Mission')).not.toBeInTheDocument();
    });
  });

  describe('footer section', () => {
    it('should render business name in footer', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const businessName = screen.getByText('Bold Ventures');
      expect(businessName).toBeInTheDocument();
      expect(businessName).toHaveClass('font-black');
      expect(businessName).toHaveClass('uppercase');
    });

    it('should render tagline in footer', () => {
      render(<BoldTemplate spec={mockSpec} />);

      expect(screen.getByText('Dare to be different')).toBeInTheDocument();
    });

    it('should render contact email when provided', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const emailLink = screen.getByRole('link', { name: 'hello@boldventures.com' });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:hello@boldventures.com');
      expect(emailLink).toHaveClass('font-bold');
    });

    it('should render social media links when provided', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const twitterLink = screen.getByRole('link', { name: 'twitter' });
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/boldventures');
      expect(twitterLink).toHaveClass('uppercase');

      const linkedinLink = screen.getByRole('link', { name: 'linkedin' });
      expect(linkedinLink).toBeInTheDocument();

      const instagramLink = screen.getByRole('link', { name: 'instagram' });
      expect(instagramLink).toBeInTheDocument();
    });

    it('should use white background for footer', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-white');
    });

    it('should have bold border separator', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);
      const borderDiv = container.querySelector('.border-t-4.border-black');
      expect(borderDiv).toBeInTheDocument();
    });

    it('should render copyright notice with current year', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Bold Ventures`))).toBeInTheDocument();
    });

    it('should handle missing contact information', () => {
      const specWithoutContact = { ...mockSpec, contact: undefined };
      render(<BoldTemplate spec={specWithoutContact} />);

      // Should still render footer with business name
      expect(screen.getByText('Bold Ventures')).toBeInTheDocument();
      expect(screen.getByText('Dare to be different')).toBeInTheDocument();
    });
  });

  describe('styling and colors', () => {
    it('should apply custom colors as CSS variables', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveStyle({
        '--color-primary': mockSpec.colors.primary,
        '--color-secondary': mockSpec.colors.secondary,
        '--color-accent': mockSpec.colors.accent,
      });
    });

    it('should use bold design classes throughout', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Check for bold template specific classes
      expect(container.querySelector('.font-black')).toBeInTheDocument();
      expect(container.querySelector('.uppercase')).toBeInTheDocument();
      expect(container.querySelector('.tracking-tight')).toBeInTheDocument();
    });

    it('should use high contrast color scheme', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Features section should be black background
      const featuresSection = container.querySelectorAll('section')[1];
      expect(featuresSection).toHaveClass('bg-black');
      expect(featuresSection).toHaveClass('text-white');

      // Footer should be white
      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-white');
    });
  });

  describe('accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Check for semantic sections
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);

      // Check for footer
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should have accessible links with proper attributes', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const externalLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have headings in proper hierarchy', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Make Your Mark');

      const h2Elements = container.querySelectorAll('h2');
      const h3Elements = container.querySelectorAll('h3');

      // Should have proper heading structure
      expect(h1).toBeInTheDocument();
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('should have proper link text for email', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const emailLink = screen.getByRole('link', { name: /hello@boldventures.com/i });
      expect(emailLink).toHaveAccessibleName();
    });

    it('CTA button should be keyboard accessible', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const ctaButton = screen.getByRole('link', { name: 'Start Now' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.tagName).toBe('A');
    });

    it('should provide sufficient color contrast for readability', () => {
      render(<BoldTemplate spec={mockSpec} />);

      // White text on primary color background in hero
      const headline = screen.getByText('Make Your Mark');
      expect(headline).toHaveClass('text-white');

      // Check features section has appropriate contrast
      const featureTitle = screen.getByText('Bold Design');
      expect(featureTitle).toBeInTheDocument();
    });
  });

  describe('responsive design', () => {
    it('should have responsive classes for mobile and desktop', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Check for responsive text sizing
      const headline = screen.getByText('Make Your Mark');
      expect(headline).toHaveClass('text-6xl');
      expect(headline).toHaveClass('md:text-8xl');

      // Check for responsive grid in features
      const featuresGrid = container.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-3');
      expect(featuresGrid).toBeInTheDocument();
    });

    it('should have responsive layout in footer', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      const footerFlex = container.querySelector('.flex.flex-col.md\\:flex-row');
      expect(footerFlex).toBeInTheDocument();
    });
  });

  describe('interactive elements', () => {
    it('should have hover effects on features', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Features should have hover effects
      const featureCards = container.querySelectorAll('.hover\\:bg-gray-900');
      expect(featureCards.length).toBeGreaterThan(0);
    });

    it('should have hover effects on CTA', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const ctaButton = screen.getByRole('link', { name: 'Start Now' });
      expect(ctaButton).toHaveClass('hover:bg-gray-100');
      expect(ctaButton).toHaveClass('hover:scale-105');
    });

    it('should have transform effects on feature icons', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Icons should have transform on group hover
      const iconDivs = container.querySelectorAll('.group-hover\\:scale-110');
      expect(iconDivs.length).toBeGreaterThan(0);
    });
  });

  describe('all spec fields', () => {
    it('should render all required spec fields', () => {
      render(<BoldTemplate spec={mockSpec} />);

      // Business name
      expect(screen.getByText('Bold Ventures')).toBeInTheDocument();

      // Tagline
      expect(screen.getByText('Dare to be different')).toBeInTheDocument();

      // Hero headline and subheadline
      expect(screen.getByText('Make Your Mark')).toBeInTheDocument();
      expect(screen.getByText('Stand out from the competition')).toBeInTheDocument();

      // CTA
      expect(screen.getByText('Start Now')).toBeInTheDocument();

      // Features
      mockSpec.features.forEach(feature => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });

      // About
      expect(screen.getByText('Our Mission')).toBeInTheDocument();

      // Contact
      expect(screen.getByText('hello@boldventures.com')).toBeInTheDocument();
    });

    it('should handle minimum required fields only', () => {
      const minimalSpec: LandingPageSpec = {
        businessName: 'Min Bold Corp',
        tagline: 'Simple tagline',
        description: 'Simple description',
        hero: {
          headline: 'Simple Headline',
          subheadline: 'Simple Subheadline',
          cta: {
            text: 'Go',
            url: '#',
            style: 'primary',
          },
        },
        features: [
          { title: 'A', description: 'Description A' },
          { title: 'B', description: 'Description B' },
          { title: 'C', description: 'Description C' },
        ],
        colors: {
          primary: '#000',
          secondary: '#111',
          accent: '#222',
        },
        font: 'modern',
        template: 'bold',
        meta: {
          title: 'Min Bold Corp',
          description: 'Simple',
        },
      };

      render(<BoldTemplate spec={minimalSpec} />);

      expect(screen.getByText('Min Bold Corp')).toBeInTheDocument();
      expect(screen.getByText('Simple Headline')).toBeInTheDocument();
      expect(screen.getByText('Simple Subheadline')).toBeInTheDocument();
    });
  });

  describe('template differences', () => {
    it('should have distinct bold styling compared to minimal', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      // Bold-specific classes that shouldn't appear in minimal
      expect(container.querySelector('.h-screen')).toBeInTheDocument();
      expect(container.querySelector('.font-black')).toBeInTheDocument();
      expect(container.querySelector('.uppercase.tracking-wider')).toBeInTheDocument();
      expect(container.querySelector('.bg-black')).toBeInTheDocument();
    });

    it('should use no rounded corners (sharp edges)', () => {
      render(<BoldTemplate spec={mockSpec} />);

      const ctaButton = screen.getByRole('link', { name: 'Start Now' });
      expect(ctaButton).toHaveClass('rounded-none');
    });

    it('should use grid gaps of 1 (tight spacing)', () => {
      const { container } = render(<BoldTemplate spec={mockSpec} />);

      const featuresGrid = container.querySelector('.gap-1');
      expect(featuresGrid).toBeInTheDocument();
    });
  });
});
