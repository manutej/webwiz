import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Hero from '@/components/Hero/Hero';

describe('Hero Component', () => {
  const mockTheme = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
  };

  describe('centered variant', () => {
    const centeredProps = {
      headline: 'Transform Your Business',
      subheadline: 'Powerful solutions for modern companies',
      cta: {
        text: 'Get Started Now',
        url: '#contact',
      },
      variant: 'centered' as const,
      theme: mockTheme,
    };

    it('should render centered variant with all content', () => {
      render(<Hero {...centeredProps} />);

      expect(screen.getByText('Transform Your Business')).toBeInTheDocument();
      expect(screen.getByText('Powerful solutions for modern companies')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Get Started Now' })).toBeInTheDocument();
    });

    it('should apply centered layout classes', () => {
      const { container } = render(<Hero {...centeredProps} />);

      const section = container.querySelector('section');
      expect(section).not.toHaveClass('h-screen');

      // text-center is on the inner div, not the section
      const innerDiv = container.querySelector('.text-center');
      expect(innerDiv).toBeInTheDocument();
    });

    it('should apply gradient background for centered variant', () => {
      const { container } = render(<Hero {...centeredProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-gradient-to-br');
      expect(section).toHaveClass('from-white');
      expect(section).toHaveClass('to-gray-50');
    });

    it('should apply gradient text styling to headline', () => {
      render(<Hero {...centeredProps} />);

      const headline = screen.getByText('Transform Your Business');
      expect(headline).toHaveClass('bg-gradient-to-r');
      expect(headline).toHaveClass('from-gray-900');
      expect(headline).toHaveClass('to-gray-600');
      expect(headline).toHaveClass('bg-clip-text');
      expect(headline).toHaveClass('text-transparent');
    });

    it('should apply accent color to CTA button', () => {
      render(<Hero {...centeredProps} />);

      const ctaButton = screen.getByRole('link', { name: 'Get Started Now' });
      expect(ctaButton).toHaveStyle({ backgroundColor: mockTheme.accent });
    });

    it('should apply rounded button style', () => {
      render(<Hero {...centeredProps} />);

      const ctaButton = screen.getByRole('link', { name: 'Get Started Now' });
      expect(ctaButton).toHaveClass('rounded-full');
    });
  });

  describe('full-screen variant', () => {
    const fullScreenProps = {
      headline: 'Bold Statement Here',
      subheadline: 'Making an impact with large typography',
      cta: {
        text: 'Learn More',
        url: '#about',
      },
      variant: 'full-screen' as const,
      theme: mockTheme,
    };

    it('should render full-screen variant with all content', () => {
      render(<Hero {...fullScreenProps} />);

      expect(screen.getByText('Bold Statement Here')).toBeInTheDocument();
      expect(screen.getByText('Making an impact with large typography')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Learn More' })).toBeInTheDocument();
    });

    it('should apply full-screen layout classes', () => {
      const { container } = render(<Hero {...fullScreenProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('h-screen');
      expect(section).toHaveClass('flex');
      expect(section).toHaveClass('items-center');
      expect(section).toHaveClass('justify-center');
    });

    it('should apply primary background color', () => {
      const { container } = render(<Hero {...fullScreenProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveStyle({ backgroundColor: mockTheme.primary });
    });

    it('should render white text for full-screen variant', () => {
      render(<Hero {...fullScreenProps} />);

      const headline = screen.getByText('Bold Statement Here');
      expect(headline).toHaveClass('text-white');
    });

    it('should apply bold typography classes', () => {
      render(<Hero {...fullScreenProps} />);

      const headline = screen.getByText('Bold Statement Here');
      expect(headline).toHaveClass('font-black');
      expect(headline).toHaveClass('text-6xl');
      expect(headline).toHaveClass('md:text-8xl');
    });

    it('should apply white CTA button with no rounded corners', () => {
      render(<Hero {...fullScreenProps} />);

      const ctaButton = screen.getByRole('link', { name: 'Learn More' });
      expect(ctaButton).toHaveClass('bg-white');
      expect(ctaButton).toHaveClass('text-gray-900');
      expect(ctaButton).toHaveClass('rounded-none');
      expect(ctaButton).toHaveClass('uppercase');
    });

    it('should render overlay for full-screen variant', () => {
      const { container } = render(<Hero {...fullScreenProps} />);

      const overlay = container.querySelector('.absolute.inset-0.opacity-10');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    const accessibilityProps = {
      headline: 'Accessible Hero',
      subheadline: 'Testing accessibility features',
      cta: {
        text: 'Click Here',
        url: '#test',
      },
      variant: 'centered' as const,
      theme: mockTheme,
    };

    it('should use h1 for headline', () => {
      const { container } = render(<Hero {...accessibilityProps} />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
      expect(h1).toHaveTextContent('Accessible Hero');
    });

    it('should use semantic section element', () => {
      const { container } = render(<Hero {...accessibilityProps} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have accessible CTA link', () => {
      render(<Hero {...accessibilityProps} />);

      const ctaButton = screen.getByRole('link', { name: 'Click Here' });
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveAttribute('href', '#test');
      expect(ctaButton).toHaveAccessibleName();
    });

    it('should use paragraph element for subheadline', () => {
      const { container } = render(<Hero {...accessibilityProps} />);

      const subheadline = screen.getByText('Testing accessibility features');
      expect(subheadline.tagName).toBe('P');
    });
  });

  describe('theme system', () => {
    it('should apply theme colors correctly for centered variant', () => {
      const customTheme = {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
      };

      const props = {
        headline: 'Themed Hero',
        subheadline: 'With custom colors',
        cta: {
          text: 'Action',
          url: '#',
        },
        variant: 'centered' as const,
        theme: customTheme,
      };

      render(<Hero {...props} />);

      const ctaButton = screen.getByRole('link', { name: 'Action' });
      expect(ctaButton).toHaveStyle({ backgroundColor: customTheme.accent });
    });

    it('should apply theme colors correctly for full-screen variant', () => {
      const customTheme = {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
      };

      const props = {
        headline: 'Themed Hero',
        subheadline: 'With custom colors',
        cta: {
          text: 'Action',
          url: '#',
        },
        variant: 'full-screen' as const,
        theme: customTheme,
      };

      const { container } = render(<Hero {...props} />);

      const section = container.querySelector('section');
      expect(section).toHaveStyle({ backgroundColor: customTheme.primary });
    });
  });

  describe('responsive design', () => {
    it('should have responsive text sizing for centered variant', () => {
      const props = {
        headline: 'Responsive Hero',
        subheadline: 'Works on all devices',
        cta: {
          text: 'Click',
          url: '#',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      const headline = screen.getByText('Responsive Hero');
      expect(headline).toHaveClass('text-5xl');
      expect(headline).toHaveClass('md:text-7xl');

      const subheadline = screen.getByText('Works on all devices');
      expect(subheadline).toHaveClass('text-xl');
      expect(subheadline).toHaveClass('md:text-2xl');
    });

    it('should have responsive text sizing for full-screen variant', () => {
      const props = {
        headline: 'Responsive Hero',
        subheadline: 'Works on all devices',
        cta: {
          text: 'Click',
          url: '#',
        },
        variant: 'full-screen' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      const headline = screen.getByText('Responsive Hero');
      expect(headline).toHaveClass('text-6xl');
      expect(headline).toHaveClass('md:text-8xl');

      const subheadline = screen.getByText('Works on all devices');
      expect(subheadline).toHaveClass('text-2xl');
      expect(subheadline).toHaveClass('md:text-3xl');
    });
  });

  describe('CTA button interactions', () => {
    it('should have hover effects on CTA button for centered variant', () => {
      const props = {
        headline: 'Hero',
        subheadline: 'Subheadline',
        cta: {
          text: 'Click Me',
          url: '#',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      const ctaButton = screen.getByRole('link', { name: 'Click Me' });
      expect(ctaButton).toHaveClass('hover:scale-105');
      expect(ctaButton).toHaveClass('hover:shadow-xl');
    });

    it('should have hover effects on CTA button for full-screen variant', () => {
      const props = {
        headline: 'Hero',
        subheadline: 'Subheadline',
        cta: {
          text: 'Click Me',
          url: '#',
        },
        variant: 'full-screen' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      const ctaButton = screen.getByRole('link', { name: 'Click Me' });
      expect(ctaButton).toHaveClass('hover:bg-gray-100');
      expect(ctaButton).toHaveClass('hover:scale-105');
    });
  });

  describe('edge cases', () => {
    it('should handle very long headlines gracefully', () => {
      const props = {
        headline: 'This is a very long headline that should still render properly and not break the layout or cause any issues with the component design',
        subheadline: 'Subheadline',
        cta: {
          text: 'Click',
          url: '#',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      const headline = screen.getByText(/This is a very long headline/);
      expect(headline).toBeInTheDocument();
    });

    it('should handle empty CTA text', () => {
      const props = {
        headline: 'Hero',
        subheadline: 'Subheadline',
        cta: {
          text: '',
          url: '#',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      const { container } = render(<Hero {...props} />);

      const link = container.querySelector('a[href="#"]');
      expect(link).toBeInTheDocument();
    });

    it('should handle special characters in content', () => {
      const props = {
        headline: 'Hero & Special <Characters>',
        subheadline: 'Testing "quotes" and \'apostrophes\'',
        cta: {
          text: 'Click & Go',
          url: '#test',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      render(<Hero {...props} />);

      expect(screen.getByText('Hero & Special <Characters>')).toBeInTheDocument();
      expect(screen.getByText(/Testing "quotes"/)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Click & Go' })).toBeInTheDocument();
    });
  });

  describe('snapshot testing', () => {
    it('should match snapshot for centered variant', () => {
      const props = {
        headline: 'Snapshot Test',
        subheadline: 'Testing snapshot',
        cta: {
          text: 'Click',
          url: '#',
        },
        variant: 'centered' as const,
        theme: mockTheme,
      };

      const { container } = render(<Hero {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for full-screen variant', () => {
      const props = {
        headline: 'Snapshot Test',
        subheadline: 'Testing snapshot',
        cta: {
          text: 'Click',
          url: '#',
        },
        variant: 'full-screen' as const,
        theme: mockTheme,
      };

      const { container } = render(<Hero {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
});
