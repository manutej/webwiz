import React from 'react';
import { ColorScheme } from '../../types';

export interface FooterProps {
  businessName: string;
  tagline: string;
  contact?: {
    email?: string;
    phone?: string;
    social?: Record<string, string | undefined>;
  };
  variant: 'centered' | 'split';
  theme: ColorScheme;
}

const Footer: React.FC<FooterProps> = ({
  businessName,
  tagline,
  contact,
  variant,
  theme,
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'centered') {
    return (
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{businessName}</h3>
          <p className="text-gray-400 mb-6">{tagline}</p>

          {contact && (
            <div className="space-y-2 mb-6">
              {contact.email && (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {contact.email}
                  </a>
                </p>
              )}
              {contact.phone && (
                <p className="text-gray-400">{contact.phone}</p>
              )}
            </div>
          )}

          {contact?.social && Object.keys(contact.social).length > 0 && (
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
            © {currentYear} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  // Split variant (bold)
  return (
    <footer className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">
              {businessName}
            </h3>
            <p className="text-gray-600 font-medium">{tagline}</p>
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
              {contact.social && Object.keys(contact.social).length > 0 && (
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
            © {currentYear} {businessName}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
