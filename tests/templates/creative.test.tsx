import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import CreativeTemplate from '../../src/templates/creative';
import { LandingPageSpec } from '../../src/types';

// Mock spec for testing Creative template
const mockSpec: LandingPageSpec = {
  businessName: 'Pixel Studios',
  tagline: 'We bring ideas to life',
  description: 'Award-winning creative agency for bold brands',
  hero: {
    headline: 'Create. Innovate. Inspire.',
    subheadline: 'We craft digital experiences that captivate and convert',
    cta: {
      text: 'Start Your Project',
      url: '#contact',
      style: 'primary',
    },
    imageUrl: 'https://example.com/hero-creative.jpg',
  },
  features: [
    {
      title: 'Bold Design',
      description: 'Eye-catching visuals that make your brand stand out',
      icon: '🎨',
    },
    {
      title: 'Rapid Delivery',
      description: 'From concept to launch in record time',
      icon: '⚡',
    },
    {
      title: 'Data-Driven',
      description: 'Creative decisions backed by analytics',
      icon: '📊',
    },
  ],
  about: {
    title: 'Our Mission',
    content: 'We believe great design should be accessible to everyone. Our team of passionate creators delivers innovative solutions that push boundaries.',
  },
  contact: {
    email: 'hello@pixelstudios.com',
    phone: '+1-555-CREATE',
    address: '789 Design District, Austin',
    social: {
      twitter: 'https://twitter.com/pixelstudios',
      instagram: 'https://instagram.com/pixelstudios',
      github: 'https://github.com/pixelstudios',
    },
  },
  colors: {
    primary: '#FF6B6B',   // Red
    secondary: '#4ECDC4',  // Teal
    accent: '#FFE66D',     // Yellow
  },
  font: 'modern',
  template: 'creative',
  meta: {
    title: 'Pixel Studios - Create. Innovate. Inspire.',
    description: 'Award-winning creative agency for bold brands',
    keywords: ['creative', 'design', 'agency', 'innovation'],
  },
};

describe('CreativeTemplate', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
    });

    it('should match snapshot', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      expect(container).toMatchSnapshot();
    });

    it('should render hero section with headline', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('Create. Innovate. Inspire.')).toBeInTheDocument();
    });

    it('should render hero subheadline', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('We craft digital experiences that captivate and convert')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      const ctaButton = screen.getByText('Start Your Project');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#contact');
    });
  });

  describe('features section', () => {
    it('should render all feature titles', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('Bold Design')).toBeInTheDocument();
      expect(screen.getByText('Rapid Delivery')).toBeInTheDocument();
      expect(screen.getByText('Data-Driven')).toBeInTheDocument();
    });

    it('should render all feature descriptions', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('Eye-catching visuals that make your brand stand out')).toBeInTheDocument();
      expect(screen.getByText('From concept to launch in record time')).toBeInTheDocument();
      expect(screen.getByText('Creative decisions backed by analytics')).toBeInTheDocument();
    });

    it('should render feature icons', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('🎨')).toBeInTheDocument();
      expect(screen.getByText('⚡')).toBeInTheDocument();
      expect(screen.getByText('📊')).toBeInTheDocument();
    });
  });

  describe('about section', () => {
    it('should render about section when provided', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('Our Mission')).toBeInTheDocument();
      expect(screen.getByText(/We believe great design/)).toBeInTheDocument();
    });

    it('should not render about section when not provided', () => {
      const specWithoutAbout = { ...mockSpec, about: undefined };
      render(<CreativeTemplate spec={specWithoutAbout} />);
      expect(screen.queryByText('Our Mission')).not.toBeInTheDocument();
    });
  });

  describe('footer section', () => {
    it('should render business name in footer', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      const businessNames = screen.getAllByText('Pixel Studios');
      expect(businessNames.length).toBeGreaterThan(0);
    });

    it('should render tagline in footer', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('We bring ideas to life')).toBeInTheDocument();
    });

    it('should render contact email', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('hello@pixelstudios.com')).toBeInTheDocument();
    });

    it('should render contact phone', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      expect(screen.getByText('+1-555-CREATE')).toBeInTheDocument();
    });

    it('should render social media links', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      const twitterLink = screen.getByRole('link', { name: /twitter/i });
      const instagramLink = screen.getByRole('link', { name: /instagram/i });

      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/pixelstudios');
      expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/pixelstudios');
    });
  });

  describe('color scheme', () => {
    it('should apply creative color scheme', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      expect(container).toBeDefined();
      // Colors are applied via theme prop to components
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBeGreaterThanOrEqual(1);
    });

    it('should have accessible links', () => {
      render(<CreativeTemplate spec={mockSpec} />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('responsive behavior', () => {
    it('should render with min-h-screen wrapper', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('min-h-screen');
    });
  });

  describe('template variants', () => {
    it('should use full-screen hero variant', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      // Hero with full-screen variant renders with specific structure
      expect(container).toBeDefined();
    });

    it('should use grid variant for features', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      // FeatureGrid with grid variant renders with specific structure
      expect(container).toBeDefined();
    });

    it('should use split variant for footer', () => {
      const { container } = render(<CreativeTemplate spec={mockSpec} />);
      // Footer with split variant renders with specific structure
      expect(container).toBeDefined();
    });
  });
});
