import React from 'react';
import { LandingPageSpec } from '@/types';

interface BoldTemplateProps {
  spec: LandingPageSpec;
}

export default function BoldTemplate({ spec }: BoldTemplateProps) {
  const { hero, features, about, contact, colors } = spec;

  return (
    <div className="min-h-screen" style={{
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-accent': colors.accent,
    } as React.CSSProperties}>
      {/* Hero Section - Full Screen, Bold Typography */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
            {hero.headline}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium">
            {hero.subheadline}
          </p>
          <a
            href={hero.cta.url}
            className="inline-block px-12 py-6 text-xl font-bold text-gray-900 bg-white rounded-none hover:bg-gray-100 transition-all transform hover:scale-105 uppercase tracking-wider"
          >
            {hero.cta.text}
          </a>
        </div>
      </section>

      {/* Features Section - Bold Grid */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-12 bg-black hover:bg-gray-900 transition-colors group"
              >
                {feature.icon && (
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Contrast Block */}
      {about && (
        <section
          className="py-24 px-6"
          style={{ backgroundColor: colors.accent }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-white uppercase tracking-tight">
              {about.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
              {about.content}
            </p>
          </div>
        </section>
      )}

      {/* Footer - Minimal Bold */}
      <footer className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">
                {spec.businessName}
              </h3>
              <p className="text-gray-600 font-medium">{spec.tagline}</p>
            </div>

            {contact && (
              <div className="text-center md:text-right">
                {contact.email && (
                  <p className="mb-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-gray-900 hover:text-gray-600 font-bold transition-colors"
                    >
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.social && (
                  <div className="flex space-x-6 justify-center md:justify-end mt-4">
                    {Object.entries(contact.social).map(([platform, url]) => (
                      url && (
                        <a
                          key={platform}
                          href={url}
                          className="text-gray-900 hover:text-gray-600 font-bold uppercase text-sm transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {platform}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t-4 border-black text-center">
            <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
              © {new Date().getFullYear()} {spec.businessName}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
