import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import MinimalTemplate from '../../src/templates/minimal';
import { LandingPageSpec } from '../../src/types';

// Mock spec for testing
const mockSpec: LandingPageSpec = {
  businessName: 'Acme Corp',
  tagline: 'Innovation at its finest',
  description: 'Leading provider of innovative solutions',
  hero: {
    headline: 'Transform Your Business',
    subheadline: 'Powerful solutions for modern companies',
    cta: {
      text: 'Get Started Now',
      url: '#contact',
      style: 'primary',
    },
    imageUrl: 'https://example.com/hero.jpg',
  },
  features: [
    {
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance',
      icon: '⚡',
    },
    {
      title: 'Secure',
      description: 'Enterprise-grade security built-in',
      icon: '🔒',
    },
    {
      title: 'Scalable',
      description: 'Grows with your business needs',
      icon: '📈',
    },
  ],
  about: {
    title: 'About Our Company',
    content: 'We have been providing innovative solutions for over 10 years, helping businesses achieve their goals.',
  },
  contact: {
    email: 'hello@acme.com',
    phone: '+1-555-0123',
    address: '123 Innovation Drive, Tech City',
    social: {
      twitter: 'https://twitter.com/acme',
      linkedin: 'https://linkedin.com/company/acme',
      github: 'https://github.com/acme',
    },
  },
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
  },
  font: 'modern',
  template: 'minimal',
  meta: {
    title: 'Acme Corp - Transform Your Business',
    description: 'Leading provider of innovative solutions',
    keywords: ['innovation', 'business', 'solutions'],
  },
};

describe('MinimalTemplate', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
    });

    it('should match snapshot', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('hero section', () => {
    it('should render hero headline', () => {
      render(<MinimalTemplate spec={mockSpec} />);
      expect(screen.getByText('Transform Your Business')).toBeInTheDocument();
    });

    it('should render hero subheadline', () => {
      render(<MinimalTemplate spec={mockSpec} />);
      expect(screen.getByText('Powerful solutions for modern companies')).toBeInTheDocument();
    });

    it('should render CTA button with correct text and link', () => {
      render(<MinimalTemplate spec={mockSpec} />);
      const ctaButton = screen.getByRole('link', { name: 'Get Started Now' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });

    it('should apply gradient styling to headline', () => {
      render(<MinimalTemplate spec={mockSpec} />);
      const headline = screen.getByText('Transform Your Business');
      expect(headline).toHaveClass('bg-gradient-to-r');
      expect(headline).toHaveClass('from-gray-900');
      expect(headline).toHaveClass('to-gray-600');
      expect(headline).toHaveClass('bg-clip-text');
      expect(headline).toHaveClass('text-transparent');
    });

    it('should apply accent color to CTA button', () => {
      render(<MinimalTemplate spec={mockSpec} />);
      const ctaButton = screen.getByRole('link', { name: 'Get Started Now' });
      expect(ctaButton).toHaveStyle({ backgroundColor: mockSpec.colors.accent });
    });
  });

  describe('features section', () => {
    it('should render all features', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('Lightning Fast')).toBeInTheDocument();
      expect(screen.getByText('Secure')).toBeInTheDocument();
      expect(screen.getByText('Scalable')).toBeInTheDocument();
    });

    it('should render feature descriptions', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('Optimized for speed and performance')).toBeInTheDocument();
      expect(screen.getByText('Enterprise-grade security built-in')).toBeInTheDocument();
      expect(screen.getByText('Grows with your business needs')).toBeInTheDocument();
    });

    it('should render feature icons when provided', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('⚡')).toBeInTheDocument();
      expect(screen.getByText('🔒')).toBeInTheDocument();
      expect(screen.getByText('📈')).toBeInTheDocument();
    });

    it('should handle features without icons', () => {
      const specWithoutIcons = {
        ...mockSpec,
        features: [
          { title: 'Feature 1', description: 'Description 1' },
          { title: 'Feature 2', description: 'Description 2' },
          { title: 'Feature 3', description: 'Description 3' },
        ],
      };

      render(<MinimalTemplate spec={specWithoutIcons} />);

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
    });
  });

  describe('about section', () => {
    it('should render about section when provided', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('About Our Company')).toBeInTheDocument();
      expect(screen.getByText(/We have been providing innovative solutions/)).toBeInTheDocument();
    });

    it('should not render about section when not provided', () => {
      const specWithoutAbout = { ...mockSpec, about: undefined };
      render(<MinimalTemplate spec={specWithoutAbout} />);

      expect(screen.queryByText('About Our Company')).not.toBeInTheDocument();
    });
  });

  describe('footer section', () => {
    it('should render business name in footer', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const footerBusinessName = screen.getAllByText('Acme Corp')[0];
      expect(footerBusinessName).toBeInTheDocument();
    });

    it('should render tagline in footer', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
    });

    it('should render contact email when provided', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const emailLink = screen.getByRole('link', { name: 'hello@acme.com' });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:hello@acme.com');
    });

    it('should render contact phone when provided', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      expect(screen.getByText('+1-555-0123')).toBeInTheDocument();
    });

    it('should render social media links when provided', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const twitterLink = screen.getByRole('link', { name: 'twitter' });
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/acme');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');

      const linkedinLink = screen.getByRole('link', { name: 'linkedin' });
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/acme');

      const githubLink = screen.getByRole('link', { name: 'github' });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/acme');
    });

    it('should render copyright notice with current year', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Acme Corp`))).toBeInTheDocument();
    });

    it('should handle missing contact information', () => {
      const specWithoutContact = { ...mockSpec, contact: undefined };
      render(<MinimalTemplate spec={specWithoutContact} />);

      // Should still render footer with business name
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
    });

    it('should handle partial contact information', () => {
      const specWithPartialContact = {
        ...mockSpec,
        contact: {
          email: 'contact@example.com',
        },
      };
      render(<MinimalTemplate spec={specWithPartialContact} />);

      expect(screen.getByText('contact@example.com')).toBeInTheDocument();
      expect(screen.queryByText('+1-555-0123')).not.toBeInTheDocument();
    });
  });

  describe('styling and colors', () => {
    it('should use minimal design classes', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);

      // Check for minimal template specific classes
      expect(container.querySelector('.bg-gradient-to-br.from-white')).toBeInTheDocument();
      expect(container.querySelector('.rounded-2xl')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);

      // Check for semantic sections
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);

      // Check for footer
      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should have accessible links with proper attributes', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const externalLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have headings in proper hierarchy', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Transform Your Business');

      const h2Elements = container.querySelectorAll('h2');
      expect(h2Elements.length).toBeGreaterThan(0);

      const h3Elements = container.querySelectorAll('h3');
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('should have proper link text for email', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const emailLink = screen.getByRole('link', { name: /hello@acme.com/i });
      expect(emailLink).toHaveAccessibleName();
    });

    it('CTA button should be keyboard accessible', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      const ctaButton = screen.getByRole('link', { name: 'Get Started Now' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.tagName).toBe('A');
    });
  });

  describe('all spec fields', () => {
    it('should render all required spec fields', () => {
      render(<MinimalTemplate spec={mockSpec} />);

      // Business name
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();

      // Tagline
      expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();

      // Hero headline and subheadline
      expect(screen.getByText('Transform Your Business')).toBeInTheDocument();
      expect(screen.getByText('Powerful solutions for modern companies')).toBeInTheDocument();

      // CTA
      expect(screen.getByText('Get Started Now')).toBeInTheDocument();

      // Features
      mockSpec.features.forEach(feature => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
        expect(screen.getByText(feature.description)).toBeInTheDocument();
      });

      // About
      expect(screen.getByText('About Our Company')).toBeInTheDocument();
      expect(screen.getByText(/We have been providing innovative solutions/)).toBeInTheDocument();

      // Contact
      expect(screen.getByText('hello@acme.com')).toBeInTheDocument();
      expect(screen.getByText('+1-555-0123')).toBeInTheDocument();
    });

    it('should handle minimum required fields only', () => {
      const minimalSpec: LandingPageSpec = {
        businessName: 'Min Corp',
        tagline: 'Simple',
        description: 'Simple description',
        hero: {
          headline: 'Hello',
          subheadline: 'World',
          cta: {
            text: 'Click',
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
        template: 'minimal',
        meta: {
          title: 'Min',
          description: 'Min',
        },
      };

      render(<MinimalTemplate spec={minimalSpec} />);

      expect(screen.getByText('Min Corp')).toBeInTheDocument();
      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(screen.getByText('World')).toBeInTheDocument();
    });
  });

  describe('responsive design', () => {
    it('should have responsive classes for mobile and desktop', () => {
      const { container } = render(<MinimalTemplate spec={mockSpec} />);

      // Check for responsive text sizing
      const headline = screen.getByText('Transform Your Business');
      expect(headline).toHaveClass('text-5xl');
      expect(headline).toHaveClass('md:text-7xl');

      // Check for responsive grid
      const featuresGrid = container.querySelector('.grid.md\\:grid-cols-3');
      expect(featuresGrid).toBeInTheDocument();
    });
  });
});
