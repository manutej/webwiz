import React from 'react';
import { LandingPageSpec } from '@/types';
import { Hero, FeatureGrid, AboutSection, Footer, TemplateLayout } from '@/components';

interface ElegantTemplateProps {
  spec: LandingPageSpec;
}

/**
 * Elegant Template - Sophisticated luxury design
 *
 * Design Philosophy:
 * - Navy, gold, and cream color palette for timeless elegance
 * - Serif typography for refined aesthetics
 * - Centered layouts with generous spacing
 * - Subtle sophistication over bold statements
 *
 * Target Audience: Luxury brands, boutiques, professional services,
 * high-end products, heritage businesses
 */
export default function ElegantTemplate({ spec }: ElegantTemplateProps) {
  const { hero, features, about, colors, businessName, tagline, contact } = spec;

  return (
    <TemplateLayout>
      <Hero
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={{ text: hero.cta.text, url: hero.cta.url }}
        variant="centered"
        theme={colors}
      />

      <FeatureGrid features={features} variant="cards" theme={colors} />

      {about && (
        <AboutSection
          title={about.title}
          content={about.content}
          variant="minimal"
          theme={colors}
        />
      )}

      <Footer
        businessName={businessName}
        tagline={tagline}
        contact={contact}
        variant="centered"
        theme={colors}
      />
    </TemplateLayout>
  );
}
