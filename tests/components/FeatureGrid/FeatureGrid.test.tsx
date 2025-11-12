import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import FeatureGrid from '@/components/FeatureGrid/FeatureGrid';
import { ColorScheme } from '@/types';

describe('FeatureGrid', () => {
  const mockTheme: ColorScheme = {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ff0000',
  };

  const mockFeatures = [
    { title: 'Feature 1', description: 'Description 1', icon: '🚀' },
    { title: 'Feature 2', description: 'Description 2', icon: '⚡' },
    { title: 'Feature 3', description: 'Description 3', icon: '🎯' },
  ];

  describe('Rendering features', () => {
    it('renders all features with 3 items', () => {
      render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
      expect(screen.getByText('Description 3')).toBeInTheDocument();
    });

    it('renders all features with 4 items', () => {
      const fourFeatures = [
        ...mockFeatures,
        { title: 'Feature 4', description: 'Description 4', icon: '💎' },
      ];

      render(
        <FeatureGrid
          features={fourFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Feature 4')).toBeInTheDocument();
      expect(screen.getByText('Description 4')).toBeInTheDocument();
    });

    it('renders all features with 6 items', () => {
      const sixFeatures = [
        ...mockFeatures,
        { title: 'Feature 4', description: 'Description 4', icon: '💎' },
        { title: 'Feature 5', description: 'Description 5', icon: '🌟' },
        { title: 'Feature 6', description: 'Description 6', icon: '🔥' },
      ];

      render(
        <FeatureGrid
          features={sixFeatures}
          variant="grid"
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Feature 6')).toBeInTheDocument();
      expect(screen.getByText('Description 6')).toBeInTheDocument();
    });
  });

  describe('Variant styles', () => {
    it('applies cards variant styling (minimal style)', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const grid = container.querySelector('[data-testid="feature-grid"]');
      expect(grid).toHaveClass('md:grid-cols-3');

      const cards = container.querySelectorAll('[data-testid="feature-item"]');
      cards.forEach((card) => {
        expect(card).toHaveClass('rounded-2xl');
      });
    });

    it('applies grid variant styling (bold style)', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="grid"
          theme={mockTheme}
        />
      );

      const grid = container.querySelector('[data-testid="feature-grid"]');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');

      const items = container.querySelectorAll('[data-testid="feature-item"]');
      items.forEach((item) => {
        expect(item).toHaveClass('bg-black');
      });
    });
  });

  describe('Icon handling', () => {
    it('displays icons when provided', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const icons = container.querySelectorAll('[data-testid="feature-icon"]');
      expect(icons).toHaveLength(3);
      expect(icons[0]).toHaveTextContent('🚀');
      expect(icons[1]).toHaveTextContent('⚡');
      expect(icons[2]).toHaveTextContent('🎯');
    });

    it('handles missing icons gracefully', () => {
      const featuresWithoutIcons = [
        { title: 'Feature 1', description: 'Description 1' },
        { title: 'Feature 2', description: 'Description 2' },
        { title: 'Feature 3', description: 'Description 3', icon: '🎯' },
      ];

      const { container } = render(
        <FeatureGrid
          features={featuresWithoutIcons}
          variant="cards"
          theme={mockTheme}
        />
      );

      const icons = container.querySelectorAll('[data-testid="feature-icon"]');
      expect(icons).toHaveLength(1);
      expect(icons[0]).toHaveTextContent('🎯');
    });

    it('renders without icons when all features lack icons', () => {
      const featuresNoIcons = [
        { title: 'Feature 1', description: 'Description 1' },
        { title: 'Feature 2', description: 'Description 2' },
        { title: 'Feature 3', description: 'Description 3' },
      ];

      const { container } = render(
        <FeatureGrid
          features={featuresNoIcons}
          variant="cards"
          theme={mockTheme}
        />
      );

      const icons = container.querySelectorAll('[data-testid="feature-icon"]');
      expect(icons).toHaveLength(0);

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
    });
  });

  describe('Theme integration', () => {
    it('applies theme colors for cards variant', () => {
      const customTheme: ColorScheme = {
        primary: '#1a1a1a',
        secondary: '#2a2a2a',
        accent: '#3a3a3a',
      };

      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={customTheme}
        />
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('applies theme colors for grid variant', () => {
      const customTheme: ColorScheme = {
        primary: '#ff00ff',
        secondary: '#00ff00',
        accent: '#0000ff',
      };

      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="grid"
          theme={customTheme}
        />
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders an accessible feature list', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();

      const grid = container.querySelector('[data-testid="feature-grid"]');
      expect(grid).toBeInTheDocument();

      const items = container.querySelectorAll('[data-testid="feature-item"]');
      expect(items).toHaveLength(3);
    });

    it('has proper heading hierarchy', () => {
      render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
      expect(headings[0]).toHaveTextContent('Feature 1');
      expect(headings[1]).toHaveTextContent('Feature 2');
      expect(headings[2]).toHaveTextContent('Feature 3');
    });
  });

  describe('Responsive design', () => {
    it('applies responsive grid layout for cards variant', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const grid = container.querySelector('[data-testid="feature-grid"]');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('md:grid-cols-3');
    });

    it('applies responsive grid layout for grid variant', () => {
      const { container } = render(
        <FeatureGrid
          features={mockFeatures}
          variant="grid"
          theme={mockTheme}
        />
      );

      const grid = container.querySelector('[data-testid="feature-grid"]');
      expect(grid).toHaveClass('grid');
      expect(grid).toHaveClass('md:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
    });

    it('handles different numbers of features in responsive layout', () => {
      const fiveFeatures = [
        ...mockFeatures,
        { title: 'Feature 4', description: 'Description 4', icon: '💎' },
        { title: 'Feature 5', description: 'Description 5', icon: '🌟' },
      ];

      const { container } = render(
        <FeatureGrid
          features={fiveFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const items = container.querySelectorAll('[data-testid="feature-item"]');
      expect(items).toHaveLength(5);
    });
  });

  describe('Edge cases', () => {
    it('handles empty feature descriptions', () => {
      const featuresEmptyDesc = [
        { title: 'Feature 1', description: '' },
        { title: 'Feature 2', description: 'Description 2' },
      ];

      render(
        <FeatureGrid
          features={featuresEmptyDesc}
          variant="cards"
          theme={mockTheme}
        />
      );

      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
    });

    it('handles long feature titles and descriptions', () => {
      const longFeatures = [
        {
          title: 'This is a very long feature title that might wrap to multiple lines',
          description:
            'This is a very long description that contains a lot of text and might need to wrap to multiple lines to fit properly within the feature card layout',
          icon: '🚀',
        },
      ];

      render(
        <FeatureGrid
          features={longFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      expect(
        screen.getByText(
          'This is a very long feature title that might wrap to multiple lines'
        )
      ).toBeInTheDocument();
    });

    it('renders correctly with minimum features (3)', () => {
      const minFeatures = [
        { title: 'Feature 1', description: 'Description 1', icon: '🚀' },
        { title: 'Feature 2', description: 'Description 2', icon: '⚡' },
        { title: 'Feature 3', description: 'Description 3', icon: '🎯' },
      ];

      const { container } = render(
        <FeatureGrid
          features={minFeatures}
          variant="cards"
          theme={mockTheme}
        />
      );

      const items = container.querySelectorAll('[data-testid="feature-item"]');
      expect(items).toHaveLength(3);
    });

    it('renders correctly with maximum features (6)', () => {
      const maxFeatures = [
        { title: 'Feature 1', description: 'Description 1', icon: '🚀' },
        { title: 'Feature 2', description: 'Description 2', icon: '⚡' },
        { title: 'Feature 3', description: 'Description 3', icon: '🎯' },
        { title: 'Feature 4', description: 'Description 4', icon: '💎' },
        { title: 'Feature 5', description: 'Description 5', icon: '🌟' },
        { title: 'Feature 6', description: 'Description 6', icon: '🔥' },
      ];

      const { container } = render(
        <FeatureGrid
          features={maxFeatures}
          variant="grid"
          theme={mockTheme}
        />
      );

      const items = container.querySelectorAll('[data-testid="feature-item"]');
      expect(items).toHaveLength(6);
    });
  });
});
