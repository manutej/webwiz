import React from 'react';
import { LandingPageSpec } from '@/types';
import { Hero, FeatureGrid, AboutSection, Footer, TemplateLayout } from '@/components';

interface CreativeTemplateProps {
  spec: LandingPageSpec;
}

/**
 * Creative Template - Bold and vibrant design
 *
 * Design Philosophy:
 * - Vibrant red, teal, and yellow color palette
 * - Modern sans-serif typography
 * - Full-screen hero for maximum impact
 * - Asymmetric layouts with geometric elements
 * - Bold, energetic aesthetic
 *
 * Target Audience: Creative agencies, startups, tech companies,
 * modern brands, innovators, digital-first businesses
 */
export default function CreativeTemplate({ spec }: CreativeTemplateProps) {
  const { hero, features, about, colors, businessName, tagline, contact } = spec;

  return (
    <TemplateLayout>
      <Hero
        headline={hero.headline}
        subheadline={hero.subheadline}
        cta={{ text: hero.cta.text, url: hero.cta.url }}
        variant="full-screen"
        theme={colors}
      />

      <FeatureGrid features={features} variant="grid" theme={colors} />

      {about && (
        <AboutSection
          title={about.title}
          content={about.content}
          variant="bold"
          theme={colors}
        />
      )}

      <Footer
        businessName={businessName}
        tagline={tagline}
        contact={contact}
        variant="split"
        theme={colors}
      />
    </TemplateLayout>
  );
}
