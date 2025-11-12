import React from 'react';
import { LandingPageSpec } from '@/types';

interface MinimalTemplateProps {
  spec: LandingPageSpec;
}

export default function MinimalTemplate({ spec }: MinimalTemplateProps) {
  const { hero, features, about, contact, colors } = spec;

  return (
    <div className="min-h-screen" style={{
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-accent': colors.accent,
    } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {hero.subheadline}
            </p>
            <a
              href={hero.cta.url}
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: colors.accent }}
            >
              {hero.cta.text}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg"
              >
                {feature.icon && (
                  <div className="text-4xl mb-4">{feature.icon}</div>
                )}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {about && (
        <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              {about.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {about.content}
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{spec.businessName}</h3>
          <p className="text-gray-400 mb-6">{spec.tagline}</p>

          {contact && (
            <div className="space-y-2 mb-6">
              {contact.email && (
                <p>
                  <a href={`mailto:${contact.email}`} className="text-gray-300 hover:text-white transition-colors">
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p className="text-gray-400">{contact.phone}</p>
              )}
            </div>
          )}

          {contact?.social && (
            <div className="flex justify-center space-x-6 mb-6">
              {Object.entries(contact.social).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    className="text-gray-400 hover:text-white transition-colors capitalize"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform}
                  </a>
                )
              ))}
            </div>
          )}

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {spec.businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
