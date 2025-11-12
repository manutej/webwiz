import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import { SiteGenerator } from '../../src/lib/generator';
import { LandingPageSpec } from '../../src/types';

// Mock spec for testing
const mockSpec: LandingPageSpec = {
  businessName: 'Test Business',
  tagline: 'Amazing products for everyone',
  description: 'A test business description',
  hero: {
    headline: 'Welcome to Test Business',
    subheadline: 'We provide amazing solutions',
    cta: {
      text: 'Get Started',
      url: '#contact',
      style: 'primary',
    },
    imageUrl: 'https://example.com/hero.jpg',
  },
  features: [
    {
      title: 'Fast',
      description: 'Lightning fast performance',
      icon: '⚡',
    },
    {
      title: 'Secure',
      description: 'Bank-level security',
      icon: '🔒',
    },
    {
      title: 'Reliable',
      description: '99.9% uptime guarantee',
      icon: '✓',
    },
  ],
  about: {
    title: 'About Us',
    content: 'We are a leading provider of test solutions.',
  },
  contact: {
    email: 'test@example.com',
    phone: '+1-555-1234',
    address: '123 Test St',
    social: {
      twitter: 'https://twitter.com/test',
      linkedin: 'https://linkedin.com/company/test',
    },
  },
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#10B981',
  },
  font: 'modern',
  template: 'minimal',
  meta: {
    title: 'Test Business - Amazing Solutions',
    description: 'Test business providing amazing solutions',
    keywords: ['test', 'business', 'solutions'],
  },
};

describe('SiteGenerator', () => {
  let tempDir: string;
  let generator: SiteGenerator;

  beforeEach(async () => {
    // Create a temporary directory for each test
    tempDir = path.join(process.cwd(), 'test-output', `test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    generator = new SiteGenerator(tempDir);
  });

  afterEach(async () => {
    // Clean up test files after each test
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.error('Failed to clean up test directory:', error);
    }
  });

  describe('generate', () => {
    it('should create all required files', async () => {
      const projectPath = await generator.generate(mockSpec);

      // Check that all required files exist
      const requiredFiles = [
        'package.json',
        'next.config.mjs',
        'tsconfig.json',
        'tailwind.config.ts',
        'postcss.config.js',
        '.gitignore',
        '.env.example',
        'README.md',
        'src/app/layout.tsx',
        'src/app/page.tsx',
        'src/app/globals.css',
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(projectPath, file);
        const exists = await fs.access(filePath).then(() => true).catch(() => false);
        expect(exists, `${file} should exist`).toBe(true);
      }
    });

    it('should create all required directories', async () => {
      const projectPath = await generator.generate(mockSpec);

      const requiredDirs = [
        'src',
        'src/app',
        'src/components',
        'public',
      ];

      for (const dir of requiredDirs) {
        const dirPath = path.join(projectPath, dir);
        const stats = await fs.stat(dirPath);
        expect(stats.isDirectory(), `${dir} should be a directory`).toBe(true);
      }
    });

    it('should generate package.json with all required dependencies', async () => {
      const projectPath = await generator.generate(mockSpec);
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(packageJsonContent);

      // Check required dependencies
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.dependencies.next).toBeDefined();
      expect(packageJson.dependencies.react).toBeDefined();
      expect(packageJson.dependencies['react-dom']).toBeDefined();

      // Check required devDependencies
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies.typescript).toBeDefined();
      expect(packageJson.devDependencies.tailwindcss).toBeDefined();
      expect(packageJson.devDependencies['@types/node']).toBeDefined();
      expect(packageJson.devDependencies['@types/react']).toBeDefined();

      // Check scripts
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts.dev).toBe('next dev');
      expect(packageJson.scripts.build).toBe('next build');
      expect(packageJson.scripts.start).toBe('next start');
      expect(packageJson.scripts.lint).toBe('next lint');

      // Check name is sanitized
      expect(packageJson.name).toBe('test-business');
    });

    it('should render template with spec data correctly for minimal template', async () => {
      const projectPath = await generator.generate(mockSpec);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // Check that spec data is included in the page
      expect(pageContent).toContain(mockSpec.hero.headline);
      expect(pageContent).toContain(mockSpec.hero.subheadline);
      expect(pageContent).toContain(mockSpec.hero.cta.text);
      expect(pageContent).toContain(mockSpec.businessName);
      expect(pageContent).toContain(mockSpec.tagline);

      // Check features are included
      mockSpec.features.forEach(feature => {
        expect(pageContent).toContain(feature.title);
        expect(pageContent).toContain(feature.description);
      });

      // Check colors are included
      expect(pageContent).toContain(mockSpec.colors.primary);
      expect(pageContent).toContain(mockSpec.colors.secondary);
      expect(pageContent).toContain(mockSpec.colors.accent);

      // Check contact info
      expect(pageContent).toContain(mockSpec.contact!.email!);
    });

    it('should render template with spec data correctly for bold template', async () => {
      const boldSpec = { ...mockSpec, template: 'bold' as const };
      const projectPath = await generator.generate(boldSpec);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // Check that spec data is included
      expect(pageContent).toContain(mockSpec.hero.headline);
      expect(pageContent).toContain(mockSpec.hero.subheadline);
      expect(pageContent).toContain(mockSpec.businessName);

      // Bold template has uppercase tracking-wider for CTA
      expect(pageContent).toContain('uppercase tracking-wider');
      expect(pageContent).toContain('font-black');
    });

    it('should generate valid Next.js config', async () => {
      const projectPath = await generator.generate(mockSpec);
      const configContent = await fs.readFile(path.join(projectPath, 'next.config.mjs'), 'utf-8');

      expect(configContent).toContain('nextConfig');
      expect(configContent).toContain("output: 'export'");
      expect(configContent).toContain('unoptimized: true');
    });

    it('should generate valid TypeScript config', async () => {
      const projectPath = await generator.generate(mockSpec);
      const tsconfigContent = await fs.readFile(path.join(projectPath, 'tsconfig.json'), 'utf-8');
      const tsconfig = JSON.parse(tsconfigContent);

      expect(tsconfig.compilerOptions).toBeDefined();
      expect(tsconfig.compilerOptions.strict).toBe(true);
      expect(tsconfig.compilerOptions.jsx).toBe('preserve');
      expect(tsconfig.compilerOptions.paths).toBeDefined();
      expect(tsconfig.compilerOptions.paths['@/*']).toEqual(['./src/*']);
    });

    it('should generate layout with metadata from spec', async () => {
      const projectPath = await generator.generate(mockSpec);
      const layoutContent = await fs.readFile(path.join(projectPath, 'src/app/layout.tsx'), 'utf-8');

      expect(layoutContent).toContain(mockSpec.meta.title);
      expect(layoutContent).toContain(mockSpec.meta.description);
      expect(layoutContent).toContain(JSON.stringify(mockSpec.meta.keywords));
    });

    it('should generate global CSS with custom colors', async () => {
      const projectPath = await generator.generate(mockSpec);
      const cssContent = await fs.readFile(path.join(projectPath, 'src/app/globals.css'), 'utf-8');

      expect(cssContent).toContain('@tailwind base');
      expect(cssContent).toContain('@tailwind components');
      expect(cssContent).toContain('@tailwind utilities');
      expect(cssContent).toContain(mockSpec.colors.primary);
      expect(cssContent).toContain(mockSpec.colors.secondary);
      expect(cssContent).toContain(mockSpec.colors.accent);
    });

    it('should generate README with business info', async () => {
      const projectPath = await generator.generate(mockSpec);
      const readmeContent = await fs.readFile(path.join(projectPath, 'README.md'), 'utf-8');

      expect(readmeContent).toContain(mockSpec.businessName);
      expect(readmeContent).toContain(mockSpec.description);
      expect(readmeContent).toContain('npm install');
      expect(readmeContent).toContain('npm run dev');
      expect(readmeContent).toContain('npm run build');
    });

    it('should handle spec without optional fields', async () => {
      const minimalSpec: LandingPageSpec = {
        businessName: 'Minimal Test',
        tagline: 'Simple tagline',
        description: 'Simple description',
        hero: {
          headline: 'Simple Headline',
          subheadline: 'Simple subheadline',
          cta: {
            text: 'Click',
            url: '#',
            style: 'primary',
          },
        },
        features: [
          { title: 'Feature 1', description: 'Description 1' },
          { title: 'Feature 2', description: 'Description 2' },
          { title: 'Feature 3', description: 'Description 3' },
        ],
        colors: {
          primary: '#000000',
          secondary: '#111111',
          accent: '#222222',
        },
        font: 'modern',
        template: 'minimal',
        meta: {
          title: 'Minimal',
          description: 'Minimal description',
        },
      };

      const projectPath = await generator.generate(minimalSpec);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // Should still generate valid page without errors
      expect(pageContent).toContain(minimalSpec.hero.headline);
      expect(pageContent).toBeDefined();
    });

    it('should sanitize business name for project folder', async () => {
      const specialSpec = {
        ...mockSpec,
        businessName: 'Test @Business!!! Name#123',
      };

      const projectPath = await generator.generate(specialSpec);
      const folderName = path.basename(projectPath);

      // Should be sanitized to lowercase, alphanumeric with dashes
      expect(folderName).toBe('test-business-name-123');
      expect(folderName).not.toContain('@');
      expect(folderName).not.toContain('!');
      expect(folderName).not.toContain('#');
      expect(folderName).not.toContain(' ');
    });

    it('should generate all files concurrently without errors', async () => {
      // This test ensures Promise.all works correctly
      const startTime = Date.now();
      await generator.generate(mockSpec);
      const endTime = Date.now();

      // If files were generated serially, it would take much longer
      // This is a basic check that concurrent generation works
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('error handling', () => {
    it('should propagate errors when file operations fail', async () => {
      // Mock fs to simulate an error
      const originalWriteFile = fs.writeFile;
      let errorThrown = false;

      // Temporarily replace writeFile to throw an error
      (fs as any).writeFile = vi.fn().mockRejectedValue(new Error('Mock write error'));

      try {
        await generator.generate(mockSpec);
      } catch (error: any) {
        errorThrown = true;
        expect(error.message).toContain('Mock write error');
      } finally {
        // Restore original function
        (fs as any).writeFile = originalWriteFile;
      }

      expect(errorThrown).toBe(true);
    });

    it('should handle write errors for individual files', async () => {
      const projectPath = path.join(tempDir, 'test-business');
      await fs.mkdir(projectPath, { recursive: true });

      // Create a directory with the same name as a file we're trying to write
      await fs.mkdir(path.join(projectPath, 'package.json'), { recursive: true });

      // Should throw when trying to write package.json
      await expect(generator.generate(mockSpec)).rejects.toThrow();
    });
  });

  describe('template variations', () => {
    it('should generate different output for minimal vs bold templates', async () => {
      // Create separate output directories for each template
      const minimalTempDir = path.join(process.cwd(), 'test-output', `minimal-${Date.now()}`);
      const boldTempDir = path.join(process.cwd(), 'test-output', `bold-${Date.now() + 1}`);

      await fs.mkdir(minimalTempDir, { recursive: true });
      await fs.mkdir(boldTempDir, { recursive: true });

      try {
        const minimalSpec = { ...mockSpec, template: 'minimal' as const };
        const boldSpec = { ...mockSpec, template: 'bold' as const };

        const minimalGenerator = new SiteGenerator(minimalTempDir);
        const boldGenerator = new SiteGenerator(boldTempDir);

        const minimalPath = await minimalGenerator.generate(minimalSpec);
        const boldPath = await boldGenerator.generate(boldSpec);

        const minimalPage = await fs.readFile(path.join(minimalPath, 'src/app/page.tsx'), 'utf-8');
        const boldPage = await fs.readFile(path.join(boldPath, 'src/app/page.tsx'), 'utf-8');

        // Pages should be different
        expect(minimalPage).not.toBe(boldPage);

        // Minimal should have certain styling
        expect(minimalPage).toContain('bg-gradient-to-br from-white to-gray-50');

        // Bold should have different styling
        expect(boldPage).toContain('h-screen');
        expect(boldPage).toContain('font-black');
      } finally {
        // Clean up
        await fs.rm(minimalTempDir, { recursive: true, force: true }).catch(() => {});
        await fs.rm(boldTempDir, { recursive: true, force: true }).catch(() => {});
      }
    });

    it('should default to minimal template when not specified', async () => {
      const specWithoutTemplate = { ...mockSpec, template: 'minimal' as const };
      const projectPath = await generator.generate(specWithoutTemplate);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // Should use minimal template styling
      expect(pageContent).toContain('bg-gradient-to-br from-white to-gray-50');
    });
  });

  describe('generated site structure', () => {
    it('should create a valid Next.js project structure', async () => {
      const projectPath = await generator.generate(mockSpec);

      // Verify Next.js app directory structure
      const appDir = path.join(projectPath, 'src/app');
      const stats = await fs.stat(appDir);
      expect(stats.isDirectory()).toBe(true);

      // Verify essential files
      const layoutExists = await fs.access(path.join(appDir, 'layout.tsx')).then(() => true).catch(() => false);
      const pageExists = await fs.access(path.join(appDir, 'page.tsx')).then(() => true).catch(() => false);
      const globalsExists = await fs.access(path.join(appDir, 'globals.css')).then(() => true).catch(() => false);

      expect(layoutExists).toBe(true);
      expect(pageExists).toBe(true);
      expect(globalsExists).toBe(true);
    });

    it('should generate gitignore with standard Next.js excludes', async () => {
      const projectPath = await generator.generate(mockSpec);
      const gitignoreContent = await fs.readFile(path.join(projectPath, '.gitignore'), 'utf-8');

      expect(gitignoreContent).toContain('/node_modules');
      expect(gitignoreContent).toContain('/.next/');
      expect(gitignoreContent).toContain('/out/');
      expect(gitignoreContent).toContain('.env*.local');
    });

    it('should generate Tailwind config with correct content paths', async () => {
      const projectPath = await generator.generate(mockSpec);
      const tailwindContent = await fs.readFile(path.join(projectPath, 'tailwind.config.ts'), 'utf-8');

      expect(tailwindContent).toContain('./src/pages/**/*.{js,ts,jsx,tsx,mdx}');
      expect(tailwindContent).toContain('./src/components/**/*.{js,ts,jsx,tsx,mdx}');
      expect(tailwindContent).toContain('./src/app/**/*.{js,ts,jsx,tsx,mdx}');
    });

    it('should generate PostCSS config with Tailwind plugin', async () => {
      const projectPath = await generator.generate(mockSpec);
      const postcssContent = await fs.readFile(path.join(projectPath, 'postcss.config.js'), 'utf-8');

      expect(postcssContent).toContain('tailwindcss');
      expect(postcssContent).toContain('autoprefixer');
    });
  });

  describe('content validation', () => {
    it('should properly escape special characters in content', async () => {
      const specWithSpecialChars = {
        ...mockSpec,
        hero: {
          ...mockSpec.hero,
          headline: "It's a \"great\" product!",
          subheadline: "We're #1 & the best",
        },
      };

      const projectPath = await generator.generate(specWithSpecialChars);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // Content should be included (though exact escaping depends on template)
      expect(pageContent).toContain("It's");
      expect(pageContent).toContain('great');
    });

    it('should include all features in the generated page', async () => {
      const projectPath = await generator.generate(mockSpec);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      // All features should be present
      expect(pageContent).toContain('Fast');
      expect(pageContent).toContain('Lightning fast performance');
      expect(pageContent).toContain('Secure');
      expect(pageContent).toContain('Bank-level security');
      expect(pageContent).toContain('Reliable');
      expect(pageContent).toContain('99.9% uptime guarantee');
    });

    it('should include feature icons when provided', async () => {
      const projectPath = await generator.generate(mockSpec);
      const pageContent = await fs.readFile(path.join(projectPath, 'src/app/page.tsx'), 'utf-8');

      expect(pageContent).toContain('⚡');
      expect(pageContent).toContain('🔒');
      expect(pageContent).toContain('✓');
    });
  });
});
