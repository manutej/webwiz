import { LandingPageSpec, NaturalLanguageInput } from '@/types';

/**
 * AI Provider Interface
 *
 * Defines the contract for AI providers that can parse natural language
 * into landing page specifications.
 */
export interface AIProvider {
  /**
   * Parse natural language description into structured landing page spec
   */
  parse(input: NaturalLanguageInput): Promise<LandingPageSpec>;

  /**
   * Enhance existing specification with AI-generated improvements
   */
  enhance(spec: Partial<LandingPageSpec>): Promise<LandingPageSpec>;
}

/**
 * AI Provider Configuration
 */
export interface AIProviderConfig {
  /** Provider type */
  provider: 'anthropic' | 'openai';

  /** API key for authentication */
  apiKey: string;

  /** Optional model override */
  model?: string;

  /** Maximum retry attempts for API calls */
  maxRetries?: number;

  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * AI Provider Factory
 *
 * Creates an AI provider instance based on configuration.
 */
export function getAIProvider(config: AIProviderConfig): AIProvider {
  switch (config.provider) {
    case 'anthropic':
      return new AnthropicProvider(config);
    case 'openai':
      return new OpenAIProvider(config);
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}

/**
 * Get AI provider from environment variables
 */
export function getAIProviderFromEnv(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'anthropic') as 'anthropic' | 'openai';
  const apiKey = provider === 'anthropic'
    ? process.env.ANTHROPIC_API_KEY
    : process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(`API key not found for ${provider} provider`);
  }

  return getAIProvider({
    provider,
    apiKey,
    model: process.env.AI_MODEL,
    maxRetries: process.env.AI_MAX_RETRIES ? parseInt(process.env.AI_MAX_RETRIES) : 3,
  });
}

// Import provider implementations
import { AnthropicProvider } from './providers/anthropic-provider';
import { OpenAIProvider } from './providers/openai-provider';
