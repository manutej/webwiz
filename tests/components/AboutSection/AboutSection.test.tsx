import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AboutSection from '@/components/AboutSection/AboutSection';
import { ColorScheme } from '@/types';

describe('AboutSection Component', () => {
  const mockTheme: ColorScheme = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
  };

  describe('minimal variant', () => {
    const minimalProps = {
      title: 'About Our Company',
      content: 'We are dedicated to providing exceptional service and innovative solutions.',
      variant: 'minimal' as const,
      theme: mockTheme,
    };

    it('should render minimal variant with all content', () => {
      render(<AboutSection {...minimalProps} />);

      expect(screen.getByText('About Our Company')).toBeInTheDocument();
      expect(
        screen.getByText(
          'We are dedicated to providing exceptional service and innovative solutions.'
        )
      ).toBeInTheDocument();
    });

    it('should apply gradient background for minimal variant', () => {
      const { container } = render(<AboutSection {...minimalProps} />);

      const contentDiv = container.querySelector('[style*="linear-gradient"]');
      expect(contentDiv).toBeInTheDocument();
      expect(contentDiv?.getAttribute('style')).toContain('linear-gradient');
    });

    it('should apply centered text alignment to minimal variant', () => {
      const { container } = render(<AboutSection {...minimalProps} />);

      const contentDiv = container.querySelector('.text-center');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should apply rounded corners to minimal variant box', () => {
      const { container } = render(<AboutSection {...minimalProps} />);

      const box = container.querySelector('.rounded-lg');
      expect(box).toBeInTheDocument();
    });

    it('should use smaller heading size for minimal variant', () => {
      render(<AboutSection {...minimalProps} />);

      const title = screen.getByText('About Our Company');
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('md:text-4xl');
    });
  });

  describe('bold variant', () => {
    const boldProps = {
      title: 'Bold About Section',
      content: 'Making a powerful statement with bold typography and strong presence.',
      variant: 'bold' as const,
      theme: mockTheme,
    };

    it('should render bold variant with all content', () => {
      render(<AboutSection {...boldProps} />);

      expect(screen.getByText('Bold About Section')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Making a powerful statement with bold typography and strong presence.'
        )
      ).toBeInTheDocument();
    });

    it('should apply accent color background for bold variant', () => {
      const { container } = render(<AboutSection {...boldProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveStyle({ backgroundColor: mockTheme.accent });
    });

    it('should apply bold typography to heading', () => {
      render(<AboutSection {...boldProps} />);

      const title = screen.getByText('Bold About Section');
      expect(title).toHaveClass('font-black');
      expect(title).toHaveClass('text-4xl');
      expect(title).toHaveClass('md:text-5xl');
    });

    it('should apply white text color for bold variant', () => {
      render(<AboutSection {...boldProps} />);

      const title = screen.getByText('Bold About Section');
      expect(title).toHaveClass('text-white');

      const content = screen.getByText(
        'Making a powerful statement with bold typography and strong presence.'
      );
      expect(content).toHaveClass('text-white/90');
    });

    it('should use larger heading size for bold variant', () => {
      render(<AboutSection {...boldProps} />);

      const title = screen.getByText('Bold About Section');
      expect(title).toHaveClass('text-4xl');
      expect(title).toHaveClass('md:text-5xl');
      expect(title).toHaveClass('lg:text-6xl');
    });
  });

  describe('theme system', () => {
    it('should apply custom theme colors to minimal variant', () => {
      const customTheme: ColorScheme = {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
      };

      const props = {
        title: 'Themed About',
        content: 'Content with custom colors',
        variant: 'minimal' as const,
        theme: customTheme,
      };

      const { container } = render(<AboutSection {...props} />);

      const contentDiv = container.querySelector('[style*="linear-gradient"]');
      const styleAttr = contentDiv?.getAttribute('style');
      // Browser converts hex to rgba format
      expect(styleAttr).toContain('linear-gradient');
      expect(styleAttr).toContain('rgba');
    });

    it('should apply custom theme accent color to bold variant', () => {
      const customTheme: ColorScheme = {
        primary: '#FF0000',
        secondary: '#00FF00',
        accent: '#0000FF',
      };

      const props = {
        title: 'Themed Bold',
        content: 'Content with custom accent',
        variant: 'bold' as const,
        theme: customTheme,
      };

      const { container } = render(<AboutSection {...props} />);

      const section = container.querySelector('section');
      expect(section).toHaveStyle({ backgroundColor: customTheme.accent });
    });
  });

  describe('accessibility', () => {
    it('should use h2 heading for section title', () => {
      const props = {
        title: 'Accessible Heading',
        content: 'Content',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      const { container } = render(<AboutSection {...props} />);

      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2).toHaveTextContent('Accessible Heading');
    });

    it('should use semantic section element', () => {
      const props = {
        title: 'Semantic Section',
        content: 'Content',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      const { container } = render(<AboutSection {...props} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should use paragraph element for content text', () => {
      const props = {
        title: 'Title',
        content: 'Paragraph content here',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      const { container } = render(<AboutSection {...props} />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Paragraph content here');
    });
  });

  describe('responsive design', () => {
    it('should have responsive text sizing for minimal variant', () => {
      const props = {
        title: 'Responsive Title',
        content: 'Responsive content',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      render(<AboutSection {...props} />);

      const title = screen.getByText('Responsive Title');
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('md:text-4xl');
    });

    it('should have responsive text sizing for bold variant', () => {
      const props = {
        title: 'Responsive Bold Title',
        content: 'Responsive bold content',
        variant: 'bold' as const,
        theme: mockTheme,
      };

      render(<AboutSection {...props} />);

      const title = screen.getByText('Responsive Bold Title');
      expect(title).toHaveClass('text-4xl');
      expect(title).toHaveClass('md:text-5xl');
      expect(title).toHaveClass('lg:text-6xl');
    });
  });

  describe('edge cases', () => {
    it('should handle very long titles gracefully', () => {
      const props = {
        title:
          'This is a very long title that should still render properly without breaking the layout or causing any issues',
        content: 'Short content',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      render(<AboutSection {...props} />);

      const title = screen.getByText(/This is a very long title/);
      expect(title).toBeInTheDocument();
    });

    it('should handle special characters in content', () => {
      const props = {
        title: 'Title',
        content: 'Content with "quotes" and \'apostrophes\' & ampersands',
        variant: 'bold' as const,
        theme: mockTheme,
      };

      render(<AboutSection {...props} />);

      expect(
        screen.getByText(/Content with "quotes"/)
      ).toBeInTheDocument();
    });
  });

  describe('snapshot testing', () => {
    it('should match snapshot for minimal variant', () => {
      const props = {
        title: 'Snapshot Test Minimal',
        content: 'Testing snapshot for minimal variant',
        variant: 'minimal' as const,
        theme: mockTheme,
      };

      const { container } = render(<AboutSection {...props} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot for bold variant', () => {
      const props = {
        title: 'Snapshot Test Bold',
        content: 'Testing snapshot for bold variant',
        variant: 'bold' as const,
        theme: mockTheme,
      };

      const { container } = render(<AboutSection {...props} />);
      expect(container).toMatchSnapshot();
    });
  });
});
