import React from 'react';
import { ColorScheme } from '@/types';

export interface AboutSectionProps {
  title: string;
  content: string;
  variant: 'minimal' | 'bold';
  theme: ColorScheme;
}

export default function AboutSection({
  title,
  content,
  variant,
  theme,
}: AboutSectionProps) {
  if (variant === 'minimal') {
    return (
      <section className="relative overflow-hidden py-16 px-6 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 md:p-12 rounded-lg text-center"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}20 0%, ${theme.secondary}20 100%)`,
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {content}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // bold variant
  return (
    <section
      className="relative overflow-hidden py-20 px-6 md:py-32"
      style={{ backgroundColor: theme.accent }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-white leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed max-w-4xl mx-auto">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
