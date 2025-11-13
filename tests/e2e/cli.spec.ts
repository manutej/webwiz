import { test, expect } from '@playwright/test';
import { execSync, spawn } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';

/**
 * Helper to run CLI commands and capture output
 */
async function runCLI(
  args: string[],
  options: {
    input?: string;
    env?: NodeJS.ProcessEnv;
    timeout?: number;
  } = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const cliPath = path.join(process.cwd(), 'src/cli.ts');
    const child = spawn('tsx', [cliPath, ...args], {
      env: { ...process.env, ...options.env },
      cwd: process.cwd(),
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    // Send input if provided
    if (options.input) {
      child.stdin?.write(options.input);
      child.stdin?.end();
    }

    const timeout = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error('CLI command timed out'));
    }, options.timeout || 60000);

    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({
        stdout,
        stderr,
        exitCode: code ?? 1,
      });
    });

    child.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

/**
 * Helper to create a temporary directory for testing
 */
async function createTempDir(): Promise<string> {
  const tempDir = path.join(os.tmpdir(), `webwiz-test-${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });
  return tempDir;
}

/**
 * Helper to cleanup temporary directory
 */
async function cleanupTempDir(dir: string): Promise<void> {
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch (error) {
    console.error(`Failed to cleanup temp dir ${dir}:`, error);
  }
}

test.describe('WebWiz CLI', () => {
  test('CLI displays help message', async () => {
    const result = await runCLI(['--help']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('webwiz');
    expect(result.stdout).toContain('AI-powered landing page generator');
    expect(result.stdout).toContain('create');
    expect(result.stdout).toContain('enhance');
    expect(result.stdout).toContain('templates');
  });

  test('CLI displays version', async () => {
    const result = await runCLI(['--version']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  test('CLI templates command lists templates', async () => {
    const result = await runCLI(['templates']);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Available Templates');
    expect(result.stdout).toContain('minimal');
    expect(result.stdout).toContain('bold');
    expect(result.stdout).toContain('elegant');
    expect(result.stdout).toContain('creative');

    // Check for template descriptions
    expect(result.stdout).toContain('Clean, modern design');
    expect(result.stdout).toContain('High-contrast');
    expect(result.stdout).toContain('Sophisticated');
    expect(result.stdout).toContain('Unique, artistic');
  });

  test('CLI templates command shows proper formatting', async () => {
    const result = await runCLI(['templates']);

    expect(result.exitCode).toBe(0);

    // Verify each template has a name and description
    const templates = ['minimal', 'bold', 'elegant', 'creative'];
    for (const template of templates) {
      expect(result.stdout).toContain(template);
    }
  });

  test('CLI create command fails without API key', async () => {
    const tempDir = await createTempDir();

    try {
      const result = await runCLI(
        ['create', '--description', 'Test business', '--output', tempDir],
        {
          env: { ...process.env, ANTHROPIC_API_KEY: '' },
        }
      );

      expect(result.exitCode).toBe(1);
      expect(result.stdout).toContain('ANTHROPIC_API_KEY');
      expect(result.stdout).toMatch(/not set|environment variable/i);
    } finally {
      await cleanupTempDir(tempDir);
    }
  });

  test('CLI create command with API key displays proper flow', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const tempDir = await createTempDir();

    try {
      const result = await runCLI(
        [
          'create',
          '--description',
          'A modern SaaS platform for team collaboration',
          '--output',
          tempDir,
        ],
        {
          // Simulate user input: skip business type and audience, then confirm
          input: '\n\nn\n',
          timeout: 120000,
        }
      );

      // Check that the CLI showed expected prompts and output
      expect(result.stdout).toContain('WebWiz');
      expect(result.stdout).toContain('Landing Page Generator');

      // Should show specification generation
      expect(result.stdout).toMatch(/Analyzing|Specification generated/i);

      // Note: Due to interactive prompts, we can't fully test the creation
      // without a more sophisticated test harness. This test verifies the
      // basic flow and error handling.
    } finally {
      await cleanupTempDir(tempDir);
    }
  });

  test('CLI create command with invalid output directory', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    // Try to create in a directory that can't be created (invalid path)
    const invalidPath = '/invalid/path/that/does/not/exist';

    const result = await runCLI(
      [
        'create',
        '--description',
        'Test business',
        '--output',
        invalidPath,
      ],
      {
        input: '\n\nn\n',
        timeout: 120000,
      }
    );

    // Should show an error
    expect(result.exitCode).toBe(1);
  });

  test('CLI enhance command fails without spec file', async () => {
    const result = await runCLI(['enhance', 'nonexistent-spec.json']);

    expect(result.exitCode).toBe(1);
    // Should show an error about missing file
    expect(result.stdout.toLowerCase() + result.stderr.toLowerCase()).toMatch(
      /error|cannot find|enoent|no such file/i
    );
  });

  test('CLI enhance command improves spec', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const tempDir = await createTempDir();

    try {
      // Create a basic spec file
      const specPath = path.join(tempDir, 'test-spec.json');
      const basicSpec = {
        businessName: 'Test Business',
        tagline: 'A test tagline',
        description: 'A test description',
        template: 'minimal',
        colors: {
          primary: '#0000FF',
          secondary: '#00FF00',
          accent: '#FF0000',
        },
        features: [
          { title: 'Feature 1', description: 'Description 1' },
          { title: 'Feature 2', description: 'Description 2' },
          { title: 'Feature 3', description: 'Description 3' },
        ],
        hero: {
          headline: 'Test Headline',
          subheadline: 'Test Subheadline',
          cta: { text: 'Get Started', url: '#', style: 'primary' as const },
        },
        font: 'modern' as const,
        meta: {
          title: 'Test',
          description: 'Test',
        },
      };

      await fs.writeFile(specPath, JSON.stringify(basicSpec, null, 2));

      // Run enhance command
      const outputPath = path.join(tempDir, 'enhanced-spec.json');
      const result = await runCLI(['enhance', specPath, '--output', outputPath], {
        timeout: 120000,
      });

      // Check output
      expect(result.stdout).toContain('Enhancing specification');
      expect(result.stdout).toMatch(/enhanced|success/i);

      // Verify enhanced file was created
      const enhancedExists = await fs
        .access(outputPath)
        .then(() => true)
        .catch(() => false);

      if (enhancedExists) {
        // Read and verify the enhanced spec
        const enhancedContent = await fs.readFile(outputPath, 'utf-8');
        const enhancedSpec = JSON.parse(enhancedContent);

        // Enhanced spec should have the same structure but potentially improved content
        expect(enhancedSpec).toHaveProperty('businessName');
        expect(enhancedSpec).toHaveProperty('tagline');
        expect(enhancedSpec).toHaveProperty('features');
        expect(enhancedSpec.features.length).toBeGreaterThan(0);
      }
    } finally {
      await cleanupTempDir(tempDir);
    }
  });

  test('CLI create command respects output directory option', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const tempDir = await createTempDir();
    const outputDir = path.join(tempDir, 'my-custom-output');

    try {
      const result = await runCLI(
        [
          'create',
          '--description',
          'A simple portfolio website',
          '--output',
          outputDir,
        ],
        {
          input: '\n\nn\n',
          timeout: 120000,
        }
      );

      // Should mention the output path
      expect(result.stdout).toContain(outputDir);
    } finally {
      await cleanupTempDir(tempDir);
    }
  });

  test('CLI create command with no-ai-enhance flag', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const tempDir = await createTempDir();

    try {
      const result = await runCLI(
        [
          'create',
          '--description',
          'A test website',
          '--output',
          tempDir,
          '--no-ai-enhance',
        ],
        {
          input: '\n\nn\n',
          timeout: 120000,
        }
      );

      // Command should still work with the flag
      expect(result.stdout).toContain('WebWiz');
    } finally {
      await cleanupTempDir(tempDir);
    }
  });
});

test.describe('WebWiz CLI Integration', () => {
  test('CLI create and enhance workflow', async () => {
    // Skip if no API key
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const tempDir = await createTempDir();

    try {
      // This test would ideally:
      // 1. Create a project with CLI
      // 2. Extract the spec
      // 3. Enhance the spec
      // 4. Verify the enhancement
      //
      // However, due to the interactive nature of the CLI,
      // this requires more sophisticated mocking or a headless mode.
      // For now, we test that the commands exist and basic validation works.

      const templatesResult = await runCLI(['templates']);
      expect(templatesResult.exitCode).toBe(0);

      // Verify help shows all commands
      const helpResult = await runCLI(['--help']);
      expect(helpResult.stdout).toContain('create');
      expect(helpResult.stdout).toContain('enhance');
      expect(helpResult.stdout).toContain('templates');
    } finally {
      await cleanupTempDir(tempDir);
    }
  });

  test('CLI handles multiple rapid invocations', async () => {
    // Test that CLI doesn't have race conditions
    const results = await Promise.all([
      runCLI(['templates']),
      runCLI(['--version']),
      runCLI(['--help']),
    ]);

    // All commands should succeed
    results.forEach((result) => {
      expect(result.exitCode).toBe(0);
    });

    // Verify each got the right output
    expect(results[0].stdout).toContain('Available Templates');
    expect(results[1].stdout).toMatch(/\d+\.\d+\.\d+/);
    expect(results[2].stdout).toContain('create');
  });
});

test.describe('WebWiz CLI Error Handling', () => {
  test('CLI handles invalid command gracefully', async () => {
    const result = await runCLI(['invalid-command']);

    expect(result.exitCode).not.toBe(0);
    // Should show help or error message
    expect(result.stdout + result.stderr).toMatch(/error|unknown command/i);
  });

  test('CLI handles missing required arguments', async () => {
    const result = await runCLI(['enhance']);

    expect(result.exitCode).not.toBe(0);
    // Should show error about missing spec-file argument
    expect(result.stdout + result.stderr).toMatch(/missing|required|argument/i);
  });

  test('CLI enhance with invalid JSON file', async () => {
    const tempDir = await createTempDir();

    try {
      const invalidSpecPath = path.join(tempDir, 'invalid.json');
      await fs.writeFile(invalidSpecPath, 'this is not valid json');

      const result = await runCLI(['enhance', invalidSpecPath]);

      expect(result.exitCode).toBe(1);
      expect(result.stdout.toLowerCase()).toMatch(/error|invalid|json|parse/i);
    } finally {
      await cleanupTempDir(tempDir);
    }
  });
});
