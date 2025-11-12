import fs from 'fs/promises';
import path from 'path';
import { LandingPageSpec } from '@/types';

/**
 * Generates a complete Next.js site from a landing page specification
 */
export class SiteGenerator {
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  /**
   * Generate complete site from specification
   */
  async generate(spec: LandingPageSpec): Promise<string> {
    const projectPath = path.join(this.outputDir, this.sanitizeName(spec.businessName));

    // Create project structure
    await this.createDirectories(projectPath);

    // Generate files
    await Promise.all([
      this.generatePackageJson(projectPath, spec),
      this.generateNextConfig(projectPath),
      this.generateTsConfig(projectPath),
      this.generateTailwindConfig(projectPath),
      this.generatePostCssConfig(projectPath),
      this.generateGitignore(projectPath),
      this.generateEnvExample(projectPath),
      this.generateLayout(projectPath, spec),
      this.generateHomePage(projectPath, spec),
      this.generateGlobalStyles(projectPath, spec),
      this.generateReadme(projectPath, spec),
    ]);

    return projectPath;
  }

  private async createDirectories(projectPath: string): Promise<void> {
    const dirs = [
      projectPath,
      path.join(projectPath, 'src'),
      path.join(projectPath, 'src', 'app'),
      path.join(projectPath, 'src', 'components'),
      path.join(projectPath, 'public'),
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  private async generatePackageJson(projectPath: string, spec: LandingPageSpec): Promise<void> {
    const packageJson = {
      name: this.sanitizeName(spec.businessName),
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        next: '^14.2.0',
        react: '^18.3.0',
        'react-dom': '^18.3.0',
      },
      devDependencies: {
        '@types/node': '^20',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        autoprefixer: '^10.4.0',
        postcss: '^8.4.0',
        tailwindcss: '^3.4.0',
        typescript: '^5',
      },
    };

    await fs.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  private async generateNextConfig(projectPath: string): Promise<void> {
    const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
`;
    await fs.writeFile(path.join(projectPath, 'next.config.mjs'), config);
  }

  private async generateTsConfig(projectPath: string): Promise<void> {
    const config = {
      compilerOptions: {
        target: 'ES2017',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
        paths: { '@/*': ['./src/*'] },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    };

    await fs.writeFile(
      path.join(projectPath, 'tsconfig.json'),
      JSON.stringify(config, null, 2)
    );
  }

  private async generateTailwindConfig(projectPath: string): Promise<void> {
    const config = `import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
`;
    await fs.writeFile(path.join(projectPath, 'tailwind.config.ts'), config);
  }

  private async generatePostCssConfig(projectPath: string): Promise<void> {
    const config = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
    await fs.writeFile(path.join(projectPath, 'postcss.config.js'), config);
  }

  private async generateGitignore(projectPath: string): Promise<void> {
    const content = `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;
    await fs.writeFile(path.join(projectPath, '.gitignore'), content);
  }

  private async generateEnvExample(projectPath: string): Promise<void> {
    await fs.writeFile(path.join(projectPath, '.env.example'), '# Add environment variables here\n');
  }

  private async generateLayout(projectPath: string, spec: LandingPageSpec): Promise<void> {
    const layout = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${spec.meta.title}',
  description: '${spec.meta.description}',
  keywords: ${JSON.stringify(spec.meta.keywords || [])},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`;
    await fs.writeFile(path.join(projectPath, 'src', 'app', 'layout.tsx'), layout);
  }

  private async generateHomePage(projectPath: string, spec: LandingPageSpec): Promise<void> {
    const { hero, features, about, contact, colors } = spec;

    // Choose template based on spec.template
    const page = spec.template === 'bold'
      ? this.generateBoldPage(spec)
      : this.generateMinimalPage(spec);

    await fs.writeFile(path.join(projectPath, 'src', 'app', 'page.tsx'), page);
  }

  private generateMinimalPage(spec: LandingPageSpec): string {
    const { hero, features, about, contact, colors } = spec;

    return `export default function Home() {
  return (
    <div className="min-h-screen" style={{
      '--color-primary': '${colors.primary}',
      '--color-secondary': '${colors.secondary}',
      '--color-accent': '${colors.accent}',
    } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ${hero.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              ${hero.subheadline}
            </p>
            <a
              href="${hero.cta.url}"
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full transition-all hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '${colors.accent}' }}
            >
              ${hero.cta.text}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            ${features.map((feature, index) => `
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
              ${feature.icon ? `<div className="text-4xl mb-4">${feature.icon}</div>` : ''}
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                ${feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                ${feature.description}
              </p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      ${about ? `
      {/* About Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            ${about.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            ${about.content}
          </p>
        </div>
      </section>
      ` : ''}

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">${spec.businessName}</h3>
          <p className="text-gray-400 mb-6">${spec.tagline}</p>

          ${contact ? `
          <div className="space-y-2 mb-6">
            ${contact.email ? `
            <p>
              <a href="mailto:${contact.email}" className="text-gray-300 hover:text-white transition-colors">
                ${contact.email}
              </a>
            </p>
            ` : ''}
            ${contact.phone ? `<p className="text-gray-400">${contact.phone}</p>` : ''}
          </div>
          ` : ''}

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ${spec.businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
`;
  }

  private generateBoldPage(spec: LandingPageSpec): string {
    const { hero, features, about, contact, colors } = spec;

    return `export default function Home() {
  return (
    <div className="min-h-screen" style={{
      '--color-primary': '${colors.primary}',
      '--color-secondary': '${colors.secondary}',
      '--color-accent': '${colors.accent}',
    } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '${colors.primary}' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight tracking-tight">
            ${hero.headline}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium">
            ${hero.subheadline}
          </p>
          <a
            href="${hero.cta.url}"
            className="inline-block px-12 py-6 text-xl font-bold text-gray-900 bg-white rounded-none hover:bg-gray-100 transition-all transform hover:scale-105 uppercase tracking-wider"
          >
            ${hero.cta.text}
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/10">
            ${features.map((feature) => `
            <div className="p-12 bg-black hover:bg-gray-900 transition-colors group">
              ${feature.icon ? `<div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">${feature.icon}</div>` : ''}
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">
                ${feature.title}
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                ${feature.description}
              </p>
            </div>
            `).join('')}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-black mb-2 uppercase tracking-tight">${spec.businessName}</h3>
          <p className="text-gray-600 font-medium">${spec.tagline}</p>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mt-8">
            © {new Date().getFullYear()} ${spec.businessName}
          </p>
        </div>
      </footer>
    </div>
  )
}
`;
  }

  private async generateGlobalStyles(projectPath: string, spec: LandingPageSpec): Promise<void> {
    const styles = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: ${spec.colors.primary};
  --color-secondary: ${spec.colors.secondary};
  --color-accent: ${spec.colors.accent};
}

body {
  font-family: system-ui, -apple-system, sans-serif;
}
`;
    await fs.writeFile(path.join(projectPath, 'src', 'app', 'globals.css'), styles);
  }

  private async generateReadme(projectPath: string, spec: LandingPageSpec): Promise<void> {
    const readme = `# ${spec.businessName}

${spec.description}

## Getting Started

Install dependencies:

\`\`\`bash
npm install
\`\`\`

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

\`\`\`bash
npm run build
\`\`\`

This will generate a static export in the \`out\` directory.

## Deploy

### Vercel
\`\`\`bash
npx vercel
\`\`\`

### Netlify
\`\`\`bash
npx netlify deploy
\`\`\`

### Static Export
The \`out\` directory can be uploaded to any static hosting service.

---

Generated with WebWiz
`;
    await fs.writeFile(path.join(projectPath, 'README.md'), readme);
  }

  private sanitizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
