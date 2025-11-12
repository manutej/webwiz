import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export interface DeployOptions {
  projectPath: string;
  platform: 'vercel' | 'netlify' | 'export';
  token?: string;
}

export class Deployer {
  /**
   * Deploy to Vercel
   */
  async deployToVercel(projectPath: string, token?: string): Promise<string> {
    const env = token ? { ...process.env, VERCEL_TOKEN: token } : process.env;

    try {
      const { stdout } = await execAsync('npx vercel --yes --prod', {
        cwd: projectPath,
        env,
      });

      // Extract URL from output
      const urlMatch = stdout.match(/https:\/\/[^\s]+/);
      return urlMatch ? urlMatch[0] : 'Deployed successfully';
    } catch (error) {
      throw new Error(`Vercel deployment failed: ${error}`);
    }
  }

  /**
   * Deploy to Netlify
   */
  async deployToNetlify(projectPath: string, token?: string): Promise<string> {
    // First build the site
    await execAsync('npm run build', { cwd: projectPath });

    const env = token ? { ...process.env, NETLIFY_AUTH_TOKEN: token } : process.env;

    try {
      const { stdout } = await execAsync('npx netlify deploy --prod --dir=out', {
        cwd: projectPath,
        env,
      });

      // Extract URL from output
      const urlMatch = stdout.match(/https:\/\/[^\s]+/);
      return urlMatch ? urlMatch[0] : 'Deployed successfully';
    } catch (error) {
      throw new Error(`Netlify deployment failed: ${error}`);
    }
  }

  /**
   * Export static files
   */
  async exportStatic(projectPath: string): Promise<string> {
    try {
      await execAsync('npm run build', { cwd: projectPath });

      const outDir = path.join(projectPath, 'out');
      const exists = await fs.stat(outDir).catch(() => null);

      if (!exists) {
        throw new Error('Export directory not found');
      }

      return outDir;
    } catch (error) {
      throw new Error(`Static export failed: ${error}`);
    }
  }

  /**
   * Deploy to specified platform
   */
  async deploy(options: DeployOptions): Promise<string> {
    switch (options.platform) {
      case 'vercel':
        return this.deployToVercel(options.projectPath, options.token);
      case 'netlify':
        return this.deployToNetlify(options.projectPath, options.token);
      case 'export':
        return this.exportStatic(options.projectPath);
      default:
        throw new Error(`Unknown platform: ${options.platform}`);
    }
  }

  /**
   * Start local development server
   */
  async startDevServer(projectPath: string): Promise<void> {
    try {
      // Install dependencies first
      console.log('Installing dependencies...');
      await execAsync('npm install', { cwd: projectPath });

      console.log('Starting development server...');
      console.log('Visit http://localhost:3000');

      // Start dev server (non-blocking)
      exec('npm run dev', { cwd: projectPath });
    } catch (error) {
      throw new Error(`Failed to start dev server: ${error}`);
    }
  }
}
