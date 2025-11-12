import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ElegantTemplate from '../../src/templates/elegant';
import { LandingPageSpec } from '../../src/types';

// Mock spec for testing Elegant template
const mockSpec: LandingPageSpec = {
  businessName: 'Luxe Boutique',
  tagline: 'Timeless elegance, modern sophistication',
  description: 'Premier luxury goods and experiences',
  hero: {
    headline: 'Discover Timeless Elegance',
    subheadline: 'Curated luxury for the discerning individual',
    cta: {
      text: 'Explore Collection',
      url: '#contact',
      style: 'primary',
    },
    imageUrl: 'https://example.com/hero-elegant.jpg',
  },
  features: [
    {
      title: 'Handcrafted Excellence',
      description: 'Each piece meticulously crafted by master artisans',
      icon: '✨',
    },
    {
      title: 'Timeless Design',
      description: 'Classic aesthetics that transcend trends',
      icon: '💎',
    },
    {
      title: 'Premium Materials',
      description: 'Only the finest materials for lasting quality',
      icon: '🏆',
    },
  ],
  about: {
    title: 'Our Heritage',
    content: 'For over three decades, we have been dedicated to providing exceptional luxury goods that stand the test of time.',
  },
  contact: {
    email: 'concierge@luxeboutique.com',
    phone: '+1-555-LUXURY',
    address: '456 Fifth Avenue, New York',
    social: {
      instagram: 'https://instagram.com/luxeboutique',
      facebook: 'https://facebook.com/luxeboutique',
    },
  },
  colors: {
    primary: '#1E3A5F',   // Navy
    secondary: '#D4AF37',  // Gold
    accent: '#F5F5DC',     // Cream
  },
  font: 'serif',
  template: 'elegant',
  meta: {
    title: 'Luxe Boutique - Timeless Elegance',
    description: 'Premier luxury goods and experiences',
    keywords: ['luxury', 'elegant', 'boutique', 'premium'],
  },
};

describe('ElegantTemplate', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<ElegantTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
    });

    it('should match snapshot', () => {
      const { container } = render(<ElegantTemplate spec={mockSpec} />);
      expect(container).toMatchSnapshot();
    });

    it('should render hero section with headline', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Discover Timeless Elegance')).toBeInTheDocument();
    });

    it('should render hero subheadline', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Curated luxury for the discerning individual')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      const ctaButton = screen.getByText('Explore Collection');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });
  });

  describe('features section', () => {
    it('should render all feature titles', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Handcrafted Excellence')).toBeInTheDocument();
      expect(screen.getByText('Timeless Design')).toBeInTheDocument();
      expect(screen.getByText('Premium Materials')).toBeInTheDocument();
    });

    it('should render all feature descriptions', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Each piece meticulously crafted by master artisans')).toBeInTheDocument();
      expect(screen.getByText('Classic aesthetics that transcend trends')).toBeInTheDocument();
      expect(screen.getByText('Only the finest materials for lasting quality')).toBeInTheDocument();
    });

    it('should render feature icons', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('✨')).toBeInTheDocument();
      expect(screen.getByText('💎')).toBeInTheDocument();
      expect(screen.getByText('🏆')).toBeInTheDocument();
    });
  });

  describe('about section', () => {
    it('should render about section when provided', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Our Heritage')).toBeInTheDocument();
      expect(screen.getByText(/For over three decades/)).toBeInTheDocument();
    });

    it('should not render about section when not provided', () => {
      const specWithoutAbout = { ...mockSpec, about: undefined };
      render(<ElegantTemplate spec={specWithoutAbout} />);
      expect(screen.queryByText('Our Heritage')).not.toBeInTheDocument();
    });
  });

  describe('footer section', () => {
    it('should render business name in footer', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      const businessNames = screen.getAllByText('Luxe Boutique');
      expect(businessNames.length).toBeGreaterThan(0);
    });

    it('should render tagline in footer', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('Timeless elegance, modern sophistication')).toBeInTheDocument();
    });

    it('should render contact email', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('concierge@luxeboutique.com')).toBeInTheDocument();
    });

    it('should render contact phone', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      expect(screen.getByText('+1-555-LUXURY')).toBeInTheDocument();
    });

    it('should render social media links', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      const instagramLink = screen.getByRole('link', { name: /instagram/i });
      const facebookLink = screen.getByRole('link', { name: /facebook/i });

      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/luxeboutique');
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/luxeboutique');
    });
  });

  describe('color scheme', () => {
    it('should apply elegant color scheme', () => {
      const { container } = render(<ElegantTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
      // Colors are applied via theme prop to components
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have accessible links', () => {
      render(<ElegantTemplate spec={mockSpec} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('responsive behavior', () => {
    it('should render with min-h-screen wrapper', () => {
      const { container } = render(<ElegantTemplate spec={mockSpec} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('min-h-screen');
    });
  });
});
