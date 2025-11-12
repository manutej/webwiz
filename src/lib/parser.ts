import Anthropic from '@anthropic-ai/sdk';
import { LandingPageSpec, LandingPageSpecSchema, NaturalLanguageInput } from '@/types';

/**
 * Parses natural language description into structured landing page specification
 */
export class SpecificationParser {
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Convert natural language to structured specification
   */
  async parse(input: NaturalLanguageInput): Promise<LandingPageSpec> {
    const prompt = this.buildPrompt(input);

    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const response = message.content[0];
    if (response.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Extract JSON from response
    const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : response.text;

    try {
      const parsed = JSON.parse(jsonText);
      return LandingPageSpecSchema.parse(parsed);
    } catch (error) {
      throw new Error(`Failed to parse specification: ${error}`);
    }
  }

  /**
   * Enhance existing specification with AI suggestions
   */
  async enhance(spec: Partial<LandingPageSpec>): Promise<LandingPageSpec> {
    const prompt = `You are a landing page copywriting expert. Enhance the following landing page specification with better copy, compelling headlines, and engaging feature descriptions.

Current Specification:
${JSON.stringify(spec, null, 2)}

Provide an enhanced version with:
- More compelling headlines and taglines
- Better feature descriptions that focus on benefits
- Engaging call-to-action text
- SEO-optimized meta descriptions

Return ONLY valid JSON matching the specification format.`;

    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const response = message.content[0];
    if (response.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    const jsonMatch = response.text.match(/```json\n([\s\S]*?)\n```/);
    const jsonText = jsonMatch ? jsonMatch[1] : response.text;

    try {
      const parsed = JSON.parse(jsonText);
      return LandingPageSpecSchema.parse(parsed);
    } catch (error) {
      throw new Error(`Failed to parse enhanced specification: ${error}`);
    }
  }

  private buildPrompt(input: NaturalLanguageInput): string {
    return `You are an expert at converting natural language business descriptions into structured landing page specifications.

Business Description:
${input.description}

${input.businessType ? `Business Type: ${input.businessType}` : ''}
${input.targetAudience ? `Target Audience: ${input.targetAudience}` : ''}
${input.additionalContext ? `Additional Context: ${input.additionalContext}` : ''}

Convert this into a complete landing page specification with the following structure:
- businessName: Extract or infer the business name
- tagline: Create a compelling tagline (max 10 words)
- description: Brief business description (2-3 sentences)
- hero: Main headline, subheadline, and call-to-action
- features: Extract or create 3-6 key features/benefits
- about: Optional about section
- contact: Extract any contact information mentioned
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

Return ONLY valid JSON matching this exact schema:

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
      "style": "primary" | "secondary" | "outline"
    },
    "imageUrl": "string (optional)"
  },
  "features": [
    {
      "title": "string",
      "description": "string",
      "icon": "string (emoji or icon name)"
    }
  ],
  "about": {
    "title": "string",
    "content": "string"
  },
  "contact": {
    "email": "string (optional)",
    "phone": "string (optional)",
    "address": "string (optional)",
    "social": {
      "twitter": "string (optional)",
      "linkedin": "string (optional)"
    }
  },
  "colors": {
    "primary": "#hexcolor",
    "secondary": "#hexcolor",
    "accent": "#hexcolor",
    "background": "#hexcolor",
    "text": "#hexcolor"
  },
  "font": "modern" | "classic" | "playful" | "professional",
  "template": "minimal" | "bold" | "elegant" | "creative",
  "meta": {
    "title": "string (SEO title)",
    "description": "string (SEO description)",
    "keywords": ["string"]
  }
}

Return ONLY the JSON, no additional text.`;
  }
}
