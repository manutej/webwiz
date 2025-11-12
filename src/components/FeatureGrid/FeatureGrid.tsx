import React from 'react';
import { ColorScheme } from '@/types';

export interface FeatureGridProps {
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  variant: 'cards' | 'grid';
  theme: ColorScheme;
}

export default function FeatureGrid({
  features,
  variant,
  theme,
}: FeatureGridProps) {
  // Cards variant (minimal template style)
  if (variant === 'cards') {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            className="grid md:grid-cols-3 gap-8"
            data-testid="feature-grid"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid="feature-item"
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg"
              >
                {feature.icon && (
                  <div
                    className="text-4xl mb-4"
                    data-testid="feature-icon"
                  >
                    {feature.icon}
                  </div>
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
    );
  }

  // Grid variant (bold template style)
  return (
    <section className="py-24 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/10"
          data-testid="feature-grid"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              data-testid="feature-item"
              className="p-12 bg-black hover:bg-gray-900 transition-colors group"
            >
              {feature.icon && (
                <div
                  className="text-6xl mb-6 transform group-hover:scale-110 transition-transform"
                  data-testid="feature-icon"
                >
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
  );
}
