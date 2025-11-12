import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Footer from '../../../src/components/Footer/Footer';
import { ColorScheme } from '../../../src/types';

// Mock color scheme for testing
const mockTheme: ColorScheme = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#10B981',
};

describe('Footer', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );
      expect(container).toBeDefined();
    });

    it('should render business name and tagline', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
    });

    it('should use semantic footer element', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('centered variant (minimal)', () => {
    it('should apply centered layout classes', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer?.querySelector('.text-center')).toBeInTheDocument();
    });

    it('should apply dark background for centered variant', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-gray-900');
      expect(footer).toHaveClass('text-white');
    });
  });

  describe('split variant (bold)', () => {
    it('should apply split layout classes', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      const layoutDiv = footer?.querySelector('.flex.flex-col.md\\:flex-row');
      expect(layoutDiv).toBeInTheDocument();
    });

    it('should apply light background for split variant', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('bg-white');
    });

    it('should have border-top for copyright section', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
        />
      );

      const borderDiv = container.querySelector('.border-t-4.border-black');
      expect(borderDiv).toBeInTheDocument();
    });
  });

  describe('contact information', () => {
    it('should display contact email with clickable mailto link', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            email: 'hello@acme.com',
          }}
        />
      );

      const emailLink = screen.getByRole('link', { name: 'hello@acme.com' });
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:hello@acme.com');
    });

    it('should display phone number', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            phone: '+1-555-0123',
          }}
        />
      );

      expect(screen.getByText('+1-555-0123')).toBeInTheDocument();
    });

    it('should display social links with proper attributes', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
              linkedin: 'https://linkedin.com/company/acme',
              github: 'https://github.com/acme',
            },
          }}
        />
      );

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

    it('should handle missing contact gracefully', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      // Should still render footer with business name
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
      expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
    });

    it('should handle partial contact information', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            email: 'contact@example.com',
          }}
        />
      );

      expect(screen.getByText('contact@example.com')).toBeInTheDocument();
      expect(screen.queryByText('+1-555-0123')).not.toBeInTheDocument();
    });

    it('should handle empty social object', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            social: {},
          }}
        />
      );

      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    it('should filter out empty social media URLs', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
              linkedin: '',
              github: undefined,
            },
          }}
        />
      );

      expect(screen.getByRole('link', { name: 'twitter' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'linkedin' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'github' })).not.toBeInTheDocument();
    });

    it('should display social links in split variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
              linkedin: 'https://linkedin.com/company/acme',
            },
          }}
        />
      );

      const twitterLink = screen.getByRole('link', { name: 'twitter' });
      expect(twitterLink).toBeInTheDocument();
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/acme');

      const linkedinLink = screen.getByRole('link', { name: 'linkedin' });
      expect(linkedinLink).toBeInTheDocument();
    });

    it('should filter out empty social URLs in split variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
              facebook: '',
              github: undefined,
            },
          }}
        />
      );

      expect(screen.getByRole('link', { name: 'twitter' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'facebook' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'github' })).not.toBeInTheDocument();
    });

    it('should not display phone in split variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
          contact={{
            phone: '+1-555-0123',
          }}
        />
      );

      // Split variant doesn't show phone number
      expect(screen.queryByText('+1-555-0123')).not.toBeInTheDocument();
    });
  });

  describe('copyright notice', () => {
    it('should render copyright with current year', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} Acme Corp`))).toBeInTheDocument();
    });

    it('should include "All rights reserved" for centered variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    });
  });

  describe('theme integration', () => {
    it('should apply theme colors for email link in centered variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            email: 'hello@acme.com',
          }}
        />
      );

      const emailLink = screen.getByRole('link', { name: 'hello@acme.com' });
      expect(emailLink).toHaveClass('text-gray-300');
      expect(emailLink).toHaveClass('hover:text-white');
    });

    it('should apply theme colors for email link in split variant', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
          contact={{
            email: 'hello@acme.com',
          }}
        />
      );

      const emailLink = screen.getByRole('link', { name: 'hello@acme.com' });
      expect(emailLink).toHaveClass('text-gray-900');
      expect(emailLink).toHaveClass('hover:text-gray-600');
    });
  });

  describe('accessibility', () => {
    it('should have accessible footer landmark', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should have accessible email links', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            email: 'test@example.com',
          }}
        />
      );

      const emailLink = screen.getByRole('link', { name: /test@example.com/i });
      expect(emailLink).toHaveAccessibleName();
    });

    it('should have proper link attributes for external links', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
            },
          }}
        />
      );

      const externalLinks = screen.getAllByRole('link').filter(link =>
        link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have proper heading hierarchy', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const h3 = container.querySelector('h3');
      expect(h3).toBeInTheDocument();
      expect(h3).toHaveTextContent('Acme Corp');
    });
  });

  describe('responsive design', () => {
    it('should have responsive padding', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
        />
      );

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('px-6');
    });

    it('should have responsive layout for split variant', () => {
      const { container } = render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="split"
          theme={mockTheme}
        />
      );

      const layoutDiv = container.querySelector('.md\\:flex-row');
      expect(layoutDiv).toBeInTheDocument();
      expect(layoutDiv).toHaveClass('flex-col');
    });
  });

  describe('edge cases', () => {
    it('should handle very long business name', () => {
      render(
        <Footer
          businessName="A Very Long Business Name That Might Wrap On Mobile Devices Inc."
          tagline="Short tagline"
          variant="centered"
          theme={mockTheme}
        />
      );

      const businessNameElements = screen.getAllByText(/A Very Long Business Name/);
      expect(businessNameElements.length).toBeGreaterThan(0);
      expect(businessNameElements[0]).toBeInTheDocument();
    });

    it('should handle special characters in email', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            email: 'hello+test@acme.com',
          }}
        />
      );

      const emailLink = screen.getByRole('link', { name: 'hello+test@acme.com' });
      expect(emailLink).toHaveAttribute('href', 'mailto:hello+test@acme.com');
    });

    it('should handle all social platforms', () => {
      render(
        <Footer
          businessName="Acme Corp"
          tagline="Innovation at its finest"
          variant="centered"
          theme={mockTheme}
          contact={{
            social: {
              twitter: 'https://twitter.com/acme',
              facebook: 'https://facebook.com/acme',
              instagram: 'https://instagram.com/acme',
              linkedin: 'https://linkedin.com/company/acme',
              github: 'https://github.com/acme',
            },
          }}
        />
      );

      expect(screen.getByRole('link', { name: 'twitter' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'facebook' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'instagram' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'linkedin' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'github' })).toBeInTheDocument();
    });
  });
});
