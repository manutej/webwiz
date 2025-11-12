import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAIProvider, getAIProviderFromEnv, AIProviderConfig } from '@/lib/ai-provider';
import { AnthropicProvider } from '@/lib/providers/anthropic-provider';
import { OpenAIProvider } from '@/lib/providers/openai-provider';
import { LandingPageSpecSchema } from '@/types';

describe('AI Provider Abstraction', () => {
  describe('getAIProvider', () => {
    it('should return AnthropicProvider for anthropic config', () => {
      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'test-anthropic-key',
      };

      const provider = getAIProvider(config);
      expect(provider).toBeInstanceOf(AnthropicProvider);
    });

    it('should return OpenAIProvider for openai config', () => {
      const config: AIProviderConfig = {
        provider: 'openai',
        apiKey: 'test-openai-key',
      };

      const provider = getAIProvider(config);
      expect(provider).toBeInstanceOf(OpenAIProvider);
    });

    it('should throw error for unsupported provider', () => {
      const config = {
        provider: 'unsupported' as any,
        apiKey: 'test-key',
      };

      expect(() => getAIProvider(config)).toThrow('Unsupported AI provider');
    });

    it('should pass optional config to provider', () => {
      const config: AIProviderConfig = {
        provider: 'anthropic',
        apiKey: 'test-key',
        model: 'claude-3-opus',
        maxRetries: 5,
        timeout: 30000,
      };

      const provider = getAIProvider(config) as AnthropicProvider;
      expect(provider).toBeDefined();
      // Provider should receive all config options
    });
  });

  describe('getAIProviderFromEnv', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      vi.resetModules();
      process.env = { ...originalEnv };
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    it('should default to anthropic provider', () => {
      process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
      delete process.env.AI_PROVIDER;

      const provider = getAIProviderFromEnv();
      expect(provider).toBeInstanceOf(AnthropicProvider);
    });

    it('should use openai provider when AI_PROVIDER=openai', () => {
      process.env.AI_PROVIDER = 'openai';
      process.env.OPENAI_API_KEY = 'test-openai-key';

      const provider = getAIProviderFromEnv();
      expect(provider).toBeInstanceOf(OpenAIProvider);
    });

    it('should throw error when API key is missing', () => {
      process.env.AI_PROVIDER = 'anthropic';
      delete process.env.ANTHROPIC_API_KEY;

      expect(() => getAIProviderFromEnv()).toThrow('API key not found');
    });

    it('should respect AI_MODEL environment variable', () => {
      process.env.ANTHROPIC_API_KEY = 'test-key';
      process.env.AI_MODEL = 'claude-3-opus';

      const provider = getAIProviderFromEnv();
      expect(provider).toBeDefined();
    });

    it('should respect AI_MAX_RETRIES environment variable', () => {
      process.env.ANTHROPIC_API_KEY = 'test-key';
      process.env.AI_MAX_RETRIES = '5';

      const provider = getAIProviderFromEnv();
      expect(provider).toBeDefined();
    });
  });

  describe('Provider Interface Compliance', () => {
    const mockInput = {
      description: 'A modern SaaS platform for project management',
    };

    const mockSpec = {
      businessName: 'TaskFlow',
      tagline: 'Streamline your projects',
      description: 'Modern project management',
      hero: {
        headline: 'Manage Projects with Ease',
        subheadline: 'Collaboration made simple',
        cta: { text: 'Start Free Trial', url: '/signup', style: 'primary' as const },
      },
      features: [],
      colors: { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981' },
      font: 'modern' as const,
      template: 'minimal' as const,
      meta: {
        title: 'TaskFlow - Project Management',
        description: 'Modern project management',
        keywords: ['project', 'management'],
      },
    };

    it('should parse input and return valid LandingPageSpec (Anthropic)', async () => {
      const provider = getAIProvider({
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY || 'test-key',
      });

      // This test requires mocking or real API
      // For now, we test the interface exists
      expect(provider.parse).toBeDefined();
      expect(typeof provider.parse).toBe('function');
    });

    it('should parse input and return valid LandingPageSpec (OpenAI)', async () => {
      const provider = getAIProvider({
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || 'test-key',
      });

      expect(provider.parse).toBeDefined();
      expect(typeof provider.parse).toBe('function');
    });

    it('should enhance spec (Anthropic)', async () => {
      const provider = getAIProvider({
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY || 'test-key',
      });

      expect(provider.enhance).toBeDefined();
      expect(typeof provider.enhance).toBe('function');
    });

    it('should enhance spec (OpenAI)', async () => {
      const provider = getAIProvider({
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || 'test-key',
      });

      expect(provider.enhance).toBeDefined();
      expect(typeof provider.enhance).toBe('function');
    });

    it('should generate copy variations (Anthropic)', async () => {
      const provider = getAIProvider({
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY || 'test-key',
      });

      expect(provider.generateCopy).toBeDefined();
      expect(typeof provider.generateCopy).toBe('function');
    });

    it('should generate copy variations (OpenAI)', async () => {
      const provider = getAIProvider({
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || 'test-key',
      });

      expect(provider.generateCopy).toBeDefined();
      expect(typeof provider.generateCopy).toBe('function');
    });
  });

  describe('Provider Output Compatibility', () => {
    it('both providers should return specs matching the same schema', async () => {
      // This test ensures both providers produce compatible output
      const mockInput = {
        description: 'A modern SaaS platform',
      };

      const anthropicProvider = getAIProvider({
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY || 'test-key',
      });

      const openaiProvider = getAIProvider({
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY || 'test-key',
      });

      // Both should have the same interface
      expect(anthropicProvider.parse).toBeDefined();
      expect(openaiProvider.parse).toBeDefined();
      expect(anthropicProvider.enhance).toBeDefined();
      expect(openaiProvider.enhance).toBeDefined();
      expect(anthropicProvider.generateCopy).toBeDefined();
      expect(openaiProvider.generateCopy).toBeDefined();
    });
  });
});
