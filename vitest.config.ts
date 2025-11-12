import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Use jsdom environment for React components
    environment: 'jsdom',

    // Global test setup
    globals: true,

    // Setup files for testing library
    setupFiles: ['./tests/setup.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',

      // Coverage thresholds - Per-file for incremental progress
      thresholds: {
        // Phase 1 targets (tested modules)
        'src/lib/parser.ts': {
          lines: 90,
          functions: 100,
          branches: 85,
          statements: 90,
        },
        'src/lib/generator.ts': {
          lines: 85,
          functions: 85,
          branches: 80,
          statements: 85,
        },
        'src/templates/minimal.tsx': {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
        'src/templates/bold.tsx': {
          lines: 90,
          functions: 90,
          branches: 90,
          statements: 90,
        },
        // Global thresholds will increase as we add more tests
        lines: 35, // Current: 39.3%
        functions: 65, // Current: 70.73%
        branches: 55, // Current: 60.22%
        statements: 35, // Current: 39.08%
      },

      // Include patterns
      include: ['src/**/*.{ts,tsx}'],

      // Exclude patterns
      exclude: [
        'node_modules/',
        'dist/',
        '.next/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.ts',
        '**/types/**',
        'src/app/**', // Exclude Next.js app directory for now
      ],
    },

    // Test file patterns
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['node_modules/', 'dist/', '.next/'],

    // Test timeout
    testTimeout: 10000,

    // Mock reset between tests
    mockReset: true,
  },

  // Path resolution to match tsconfig
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
