#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { SpecificationParser } from './lib/parser';
import { SiteGenerator } from './lib/generator';
import path from 'path';
import fs from 'fs/promises';

const program = new Command();

program
  .name('webwiz')
  .description('AI-powered landing page generator from natural language')
  .version('0.1.0');

program
  .command('create')
  .description('Create a new landing page from natural language description')
  .option('-o, --output <dir>', 'Output directory', './generated')
  .option('-d, --description <text>', 'Business description')
  .option('--no-ai-enhance', 'Disable AI enhancement of content')
  .action(async (options) => {
    console.log(chalk.bold.cyan('\n🪄 WebWiz - Landing Page Generator\n'));

    try {
      // Check for API key
      if (!process.env.ANTHROPIC_API_KEY) {
        console.log(chalk.red('Error: ANTHROPIC_API_KEY environment variable not set'));
        console.log(chalk.yellow('Please set your Claude API key:'));
        console.log(chalk.gray('export ANTHROPIC_API_KEY=your_key_here\n'));
        process.exit(1);
      }

      // Get description from user if not provided
      let description = options.description;
      if (!description) {
        const answers = await inquirer.prompt([
          {
            type: 'editor',
            name: 'description',
            message: 'Describe your business or project in natural language:',
            default: 'Example: A modern SaaS platform that helps teams collaborate on design projects with real-time feedback and version control.',
          },
        ]);
        description = answers.description;
      }

      // Optional: Get additional context
      const { businessType, targetAudience, wantMoreContext } = await inquirer.prompt([
        {
          type: 'input',
          name: 'businessType',
          message: 'Business type (optional):',
          default: '',
        },
        {
          type: 'input',
          name: 'targetAudience',
          message: 'Target audience (optional):',
          default: '',
        },
      ]);

      // Parse specification
      const spinner = ora('Analyzing your description and generating specification...').start();

      const parser = new SpecificationParser();
      const spec = await parser.parse({
        description,
        businessType: businessType || undefined,
        targetAudience: targetAudience || undefined,
      });

      spinner.succeed('Specification generated!');

      // Show preview
      console.log(chalk.bold('\n📋 Generated Specification:\n'));
      console.log(chalk.gray('Business:'), chalk.white(spec.businessName));
      console.log(chalk.gray('Tagline:'), chalk.white(spec.tagline));
      console.log(chalk.gray('Template:'), chalk.white(spec.template));
      console.log(chalk.gray('Colors:'), chalk.hex(spec.colors.primary)('█'), chalk.hex(spec.colors.secondary)('█'), chalk.hex(spec.colors.accent)('█'));
      console.log(chalk.gray('Features:'), spec.features.length);

      // Confirm generation
      const { proceed } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'proceed',
          message: 'Generate landing page with this specification?',
          default: true,
        },
      ]);

      if (!proceed) {
        console.log(chalk.yellow('\nCancelled.'));
        return;
      }

      // Generate site
      const genSpinner = ora('Generating your landing page...').start();

      const generator = new SiteGenerator(options.output);
      const projectPath = await generator.generate(spec);

      genSpinner.succeed('Landing page generated!');

      // Success message
      console.log(chalk.bold.green('\n✨ Success!\n'));
      console.log(chalk.gray('Project created at:'), chalk.cyan(projectPath));
      console.log(chalk.bold('\n📦 Next steps:\n'));
      console.log(chalk.gray('1.'), `cd ${path.relative(process.cwd(), projectPath)}`);
      console.log(chalk.gray('2.'), 'npm install');
      console.log(chalk.gray('3.'), 'npm run dev');
      console.log(chalk.gray('4.'), 'Open http://localhost:3000\n');

      console.log(chalk.bold('🚀 Deploy:\n'));
      console.log(chalk.gray('Vercel:'), 'npx vercel');
      console.log(chalk.gray('Netlify:'), 'npx netlify deploy');
      console.log(chalk.gray('Export:'), 'npm run build (outputs to ./out)\n');

    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program
  .command('enhance <spec-file>')
  .description('Enhance an existing specification with AI suggestions')
  .option('-o, --output <file>', 'Output file', 'enhanced-spec.json')
  .action(async (specFile, options) => {
    console.log(chalk.bold.cyan('\n✨ Enhancing specification...\n'));

    try {
      const specContent = await fs.readFile(specFile, 'utf-8');
      const spec = JSON.parse(specContent);

      const spinner = ora('Generating AI enhancements...').start();

      const parser = new SpecificationParser();
      const enhanced = await parser.enhance(spec);

      await fs.writeFile(options.output, JSON.stringify(enhanced, null, 2));

      spinner.succeed('Specification enhanced!');
      console.log(chalk.gray('Output:'), chalk.cyan(options.output));

    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    console.log(chalk.bold.cyan('\n📐 Available Templates:\n'));

    const templates = [
      { name: 'minimal', description: 'Clean, modern design with subtle gradients' },
      { name: 'bold', description: 'High-contrast, impactful typography' },
      { name: 'elegant', description: 'Sophisticated with refined aesthetics' },
      { name: 'creative', description: 'Unique, artistic layout' },
    ];

    templates.forEach(({ name, description }) => {
      console.log(chalk.bold(name));
      console.log(chalk.gray(`  ${description}\n`));
    });
  });

program.parse();
