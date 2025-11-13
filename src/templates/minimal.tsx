import React from 'react';
import { LandingPageSpec } from '@/types';
import { Hero, FeatureGrid, AboutSection, Footer, TemplateLayout } from '@/components';

interface MinimalTemplateProps {
  spec: LandingPageSpec;
}

export default function MinimalTemplate({ spec }: MinimalTemplateProps) {
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
