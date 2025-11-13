import React from 'react';

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface HeroProps {
  headline: string;
  subheadline: string;
  cta: {
    text: string;
    url: string;
  };
  variant: 'centered' | 'full-screen';
  theme: Theme;
}

export default function Hero({ headline, subheadline, cta, variant, theme }: HeroProps) {
  if (variant === 'centered') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {subheadline}
            </p>
            <a
              href={cta.url}
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: theme.accent }}
            >
              {cta.text}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // full-screen variant
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.primary }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
          {headline}
        </h1>
        <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium">
          {subheadline}
        </p>
        <a
          href={cta.url}
          className="inline-block px-12 py-6 text-xl font-bold text-gray-900 bg-white rounded-none hover:bg-gray-100 transition-all transform hover:scale-105 uppercase tracking-wider"
        >
          {cta.text}
        </a>
      </div>
    </section>
  );
}
