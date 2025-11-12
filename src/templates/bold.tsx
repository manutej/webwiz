import React from 'react';
import { LandingPageSpec } from '@/types';
import { Hero, FeatureGrid, AboutSection, Footer, TemplateLayout } from '@/components';

interface BoldTemplateProps {
  spec: LandingPageSpec;
}

export default function BoldTemplate({ spec }: BoldTemplateProps) {
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
