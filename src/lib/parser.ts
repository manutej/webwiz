import { LandingPageSpec, NaturalLanguageInput } from '@/types';
import { AIProvider, getAIProviderFromEnv, getAIProvider } from './ai-provider';

/**
 * Parses natural language description into structured landing page specification
 *
 * @deprecated Use AIProvider directly via getAIProvider() or getAIProviderFromEnv()
 * This class is maintained for backward compatibility but delegates to AIProvider.
 */
export class SpecificationParser {
  private provider: AIProvider;

  constructor(apiKey?: string) {
    if (apiKey) {
      // If API key is provided, use Anthropic provider (backward compatibility)
      this.provider = getAIProvider({
        provider: 'anthropic',
        apiKey,
      });
    } else {
      // Otherwise, use environment-based provider selection
      this.provider = getAIProviderFromEnv();
    }
  }

  /**
   * Convert natural language to structured specification
   */
  async parse(input: NaturalLanguageInput): Promise<LandingPageSpec> {
    return this.provider.parse(input);
  }

  /**
   * Enhance existing specification with AI suggestions
   */
  async enhance(spec: Partial<LandingPageSpec>): Promise<LandingPageSpec> {
    return this.provider.enhance(spec);
  }
}

/**
 * Helper function to create a parser instance
 */
export function createParser(apiKey?: string): SpecificationParser {
  return new SpecificationParser(apiKey);
}

/**
 * Convenience function to parse description directly
 */
export async function parseDescription(description: string, apiKey?: string): Promise<LandingPageSpec> {
  const parser = new SpecificationParser(apiKey);
  return parser.parse({ description });
}
