import React from 'react';

interface TemplateLayoutProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for all templates providing consistent structure
 */
export default function TemplateLayout({ children }: TemplateLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
