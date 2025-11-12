import OpenAI from 'openai';
import { AIProvider, AIProviderConfig } from '../ai-provider';
import { LandingPageSpec, LandingPageSpecSchema, NaturalLanguageInput } from '@/types';

/**
 * OpenAI GPT AI Provider
 *
 * Implements AIProvider interface using OpenAI's GPT API.
 */
export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private config: AIProviderConfig;
  private model: string;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
      // Allow browser usage for testing environment
      dangerouslyAllowBrowser: process.env.NODE_ENV === 'test' || process.env.VITEST === 'true',
    });
    this.model = config.model || 'gpt-4o';
  }

  /**
   * Parse natural language description into structured landing page spec
   */
  async parse(input: NaturalLanguageInput): Promise<LandingPageSpec> {
    const prompt = this.buildParsePrompt(input);

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert at converting natural language business descriptions into structured landing page specifications. You always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    return this.extractAndValidateSpec(responseText);
  }

  /**
   * Enhance existing specification with AI-generated improvements
   */
  async enhance(spec: Partial<LandingPageSpec>): Promise<LandingPageSpec> {
    const prompt = `Enhance the following landing page specification with better copy, compelling headlines, and engaging feature descriptions.

Current Specification:
${JSON.stringify(spec, null, 2)}

Provide an enhanced version with:
- More compelling headlines and taglines
- Better feature descriptions that focus on benefits
- Engaging call-to-action text
- SEO-optimized meta descriptions

Return valid JSON matching the specification format.`;

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are a landing page copywriting expert. You always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    return this.extractAndValidateSpec(responseText);
  }

  /**
   * Generate copy variations for specific sections
   */
  async generateCopy(section: string, context: Record<string, unknown>): Promise<string[]> {
    const prompt = this.buildCopyPrompt(section, context);

    const completion = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: 'You are an expert copywriter. You always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.9,
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    // Extract array of variations from response
    try {
      const parsed = JSON.parse(responseText);

      if (Array.isArray(parsed.variations)) {
        return parsed.variations;
      } else if (Array.isArray(parsed)) {
        return parsed;
      }

      throw new Error('Response does not contain variations array');
    } catch (error) {
      throw new Error(`Failed to parse copy variations: ${error}`);
    }
  }

  /**
   * Build prompt for parsing natural language input
   */
  private buildParsePrompt(input: NaturalLanguageInput): string {
    return `Convert the following business description into a complete landing page specification.

Business Description:
${input.description}

${input.businessType ? `Business Type: ${input.businessType}` : ''}
${input.targetAudience ? `Target Audience: ${input.targetAudience}` : ''}
${input.additionalContext ? `Additional Context: ${input.additionalContext}` : ''}

Create a comprehensive landing page specification with:
- businessName: Extract or infer the business name
- tagline: Create a compelling tagline (max 10 words)
- description: Brief business description (2-3 sentences)
- hero: Main headline, subheadline, and call-to-action
- features: Create 3-6 key features/benefits
- about: About section with title and content
- contact: Contact information (use placeholder email/phone if not provided)
- colors: Suggest an appropriate color scheme (hex colors)
- font: Suggest font style (modern/classic/playful/professional)
- template: Suggest template style (minimal/bold/elegant/creative)
- meta: SEO-optimized title, description, and keywords

Guidelines:
1. Make the copy compelling and benefit-focused
2. Use action-oriented language for CTAs
3. Choose colors that match the business type and brand personality
4. Ensure features focus on benefits, not just features
5. Keep headlines clear and concise

Return a JSON object with this exact structure:

{
  "businessName": "string",
  "tagline": "string",
  "description": "string",
  "hero": {
    "headline": "string",
    "subheadline": "string",
    "cta": {
      "text": "string",
      "url": "string",
      "style": "primary"
    }
  },
  "features": [
    {
      "title": "string",
      "description": "string",
      "icon": "emoji"
    }
  ],
  "about": {
    "title": "string",
    "content": "string"
  },
  "contact": {
    "email": "optional string",
    "phone": "optional string",
    "social": {}
  },
  "colors": {
    "primary": "#hexcolor",
    "secondary": "#hexcolor",
    "accent": "#hexcolor"
  },
  "font": "modern",
  "template": "minimal",
  "meta": {
    "title": "string",
    "description": "string",
    "keywords": ["string"]
  }
}`;
  }

  /**
   * Build prompt for generating copy variations
   */
  private buildCopyPrompt(section: string, context: Record<string, unknown>): string {
    return `Generate 3 compelling variations for the ${section} section of a landing page.

Context:
${JSON.stringify(context, null, 2)}

Guidelines:
- Make each variation unique and compelling
- Focus on benefits and emotional triggers
- Use action-oriented language
- Vary the tone and approach across variations

Return a JSON object with a "variations" array containing 3 strings:
{
  "variations": ["variation 1", "variation 2", "variation 3"]
}`;
  }

  /**
   * Extract JSON from response and validate against schema
   */
  private extractAndValidateSpec(text: string): LandingPageSpec {
    try {
      const parsed = JSON.parse(text);
      return LandingPageSpecSchema.parse(parsed);
    } catch (error) {
      throw new Error(`Failed to parse specification: ${error}`);
    }
  }
}
