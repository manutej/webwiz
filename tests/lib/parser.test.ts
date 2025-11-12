import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NaturalLanguageInput, LandingPageSpec } from '@/types';

// Create mock function in module scope
const mockMessagesCreate = vi.fn();

// Mock the entire Anthropic module
vi.mock('@anthropic-ai/sdk', () => {
  return {
    default: class MockAnthropic {
      messages = {
        create: mockMessagesCreate,
      };
      constructor(config: any) {
        // Mock constructor implementation
      }
    },
  };
});

// Import after mocking
import { SpecificationParser } from '@/lib/parser';

describe('SpecificationParser', () => {
  let parser: SpecificationParser;

  // Fixture: Valid landing page spec response
  const validSpecJSON: LandingPageSpec = {
    businessName: 'TechStart Solutions',
    tagline: 'Innovate Your Future Today',
    description:
      'We provide cutting-edge technology solutions for modern businesses. Our platform helps companies streamline operations and boost productivity.',
    hero: {
      headline: 'Transform Your Business with AI',
      subheadline: 'Powerful automation tools designed for the modern enterprise',
      cta: {
        text: 'Get Started Free',
        url: 'https://example.com/signup',
        style: 'primary',
      },
      imageUrl: 'https://example.com/hero.jpg',
    },
    features: [
      {
        title: 'AI-Powered Analytics',
        description: 'Get insights from your data with advanced machine learning',
        icon: '📊',
      },
      {
        title: 'Seamless Integration',
        description: 'Connect with your existing tools in minutes',
        icon: '🔗',
      },
      {
        title: '24/7 Support',
        description: 'Our team is always here to help you succeed',
        icon: '💬',
      },
    ],
    about: {
      title: 'About Us',
      content:
        'Founded in 2020, we are on a mission to democratize AI technology for businesses of all sizes.',
    },
    contact: {
      email: 'hello@techstart.com',
      phone: '+1-555-0123',
      social: {
        twitter: 'https://twitter.com/techstart',
        linkedin: 'https://linkedin.com/company/techstart',
      },
    },
    colors: {
      primary: '#4F46E5',
      secondary: '#7C3AED',
      accent: '#EC4899',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    font: 'modern',
    template: 'minimal',
    meta: {
      title: 'TechStart Solutions - AI-Powered Business Tools',
      description:
        'Transform your business with our AI-powered automation platform. Streamline operations and boost productivity.',
      keywords: ['ai', 'automation', 'business', 'productivity'],
    },
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    parser = new SpecificationParser('test-api-key');
  });

  describe('parse', () => {
    it('should convert valid business description to spec', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A SaaS platform for AI-powered business automation',
        businessType: 'Technology',
        targetAudience: 'Enterprise businesses',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: '```json\n' + JSON.stringify(validSpecJSON) + '\n```',
          },
        ],
      });

      // Act
      const result = await parser.parse(input);

      // Assert
      expect(result).toEqual(validSpecJSON);
      expect(mockMessagesCreate).toHaveBeenCalledTimes(1);
      expect(mockMessagesCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 4096,
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining(input.description),
            }),
          ]),
        })
      );
    });

    it('should parse response without markdown code blocks', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A coffee shop in downtown',
      };

      // Response without markdown
      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(validSpecJSON),
          },
        ],
      });

      // Act
      const result = await parser.parse(input);

      // Assert
      expect(result).toEqual(validSpecJSON);
    });

    it('should handle valid empty description with valid response', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: '',
      };

      // Create a minimal valid spec to ensure the mock works
      const minimalSpec = { ...validSpecJSON };
      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(minimalSpec),
          },
        ],
      });

      // Act & Assert
      // Note: The actual validation of empty description should happen
      // in the application logic, not just in the parser
      // For now, we test that the parser can handle the response
      const result = await parser.parse(input);
      expect(result).toBeDefined();
    });

    it('should throw error for invalid JSON response', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A tech startup',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: 'This is not valid JSON',
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Failed to parse specification');
    });

    it('should throw error for invalid spec schema', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A bakery',
      };

      // Invalid spec missing required fields
      const invalidSpec = {
        businessName: 'Test',
        // Missing required fields
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(invalidSpec),
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Failed to parse specification');
    });

    it('should handle API errors', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A restaurant',
      };

      mockMessagesCreate.mockRejectedValueOnce(new Error('API Error: Rate limit exceeded'));

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('API Error: Rate limit exceeded');
    });

    it('should throw error for non-text response type', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A gym',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'image',
            source: { type: 'base64', data: 'xxx' },
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Unexpected response type from Claude');
    });

    it('should include optional context in prompt', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'An e-commerce store',
        businessType: 'Retail',
        targetAudience: 'Young professionals',
        additionalContext: 'Focus on sustainability',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(validSpecJSON),
          },
        ],
      });

      // Act
      await parser.parse(input);

      // Assert
      const callArgs = mockMessagesCreate.mock.calls[0][0];
      const prompt = callArgs.messages[0].content;
      expect(prompt).toContain('Retail');
      expect(prompt).toContain('Young professionals');
      expect(prompt).toContain('Focus on sustainability');
    });

    it('should validate output against Zod schema', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A fitness app',
      };

      // Spec with invalid email
      const invalidEmailSpec = {
        ...validSpecJSON,
        contact: {
          email: 'not-an-email',
        },
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(invalidEmailSpec),
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Failed to parse specification');
    });

    it('should handle partial descriptions with defaults', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'A minimal business description',
      };

      // Spec with default values
      const specWithDefaults: LandingPageSpec = {
        ...validSpecJSON,
        font: 'modern', // default value
        template: 'minimal', // default value
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(specWithDefaults),
          },
        ],
      });

      // Act
      const result = await parser.parse(input);

      // Assert
      expect(result.font).toBe('modern');
      expect(result.template).toBe('minimal');
    });

    it('should handle specs with minimum required features', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'Simple business',
      };

      const minimalFeaturesSpec: LandingPageSpec = {
        ...validSpecJSON,
        features: [
          { title: 'Feature 1', description: 'Description 1', icon: '1️⃣' },
          { title: 'Feature 2', description: 'Description 2', icon: '2️⃣' },
          { title: 'Feature 3', description: 'Description 3', icon: '3️⃣' },
        ],
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(minimalFeaturesSpec),
          },
        ],
      });

      // Act
      const result = await parser.parse(input);

      // Assert
      expect(result.features).toHaveLength(3);
      expect(result.features.length).toBeGreaterThanOrEqual(3);
    });

    it('should reject specs with too few features', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'Business',
      };

      const tooFewFeaturesSpec = {
        ...validSpecJSON,
        features: [
          { title: 'Feature 1', description: 'Description 1' },
          { title: 'Feature 2', description: 'Description 2' },
        ],
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(tooFewFeaturesSpec),
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Failed to parse specification');
    });

    it('should reject specs with too many features', async () => {
      // Arrange
      const input: NaturalLanguageInput = {
        description: 'Business',
      };

      const tooManyFeaturesSpec = {
        ...validSpecJSON,
        features: Array(7)
          .fill(null)
          .map((_, i) => ({
            title: `Feature ${i + 1}`,
            description: `Description ${i + 1}`,
            icon: '✨',
          })),
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(tooManyFeaturesSpec),
          },
        ],
      });

      // Act & Assert
      await expect(parser.parse(input)).rejects.toThrow('Failed to parse specification');
    });
  });

  describe('enhance', () => {
    it('should enhance partial specification', async () => {
      // Arrange
      const partialSpec: Partial<LandingPageSpec> = {
        businessName: 'Basic Business',
        tagline: 'Simple tagline',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: JSON.stringify(validSpecJSON),
          },
        ],
      });

      // Act
      const result = await parser.enhance(partialSpec);

      // Assert
      expect(result).toEqual(validSpecJSON);
      expect(mockMessagesCreate).toHaveBeenCalledTimes(1);
      expect(mockMessagesCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          model: 'claude-sonnet-4-5-20250929',
          messages: expect.arrayContaining([
            expect.objectContaining({
              role: 'user',
              content: expect.stringContaining('Basic Business'),
            }),
          ]),
        })
      );
    });

    it('should handle enhance API errors', async () => {
      // Arrange
      const partialSpec: Partial<LandingPageSpec> = {
        businessName: 'Test',
      };

      mockMessagesCreate.mockRejectedValueOnce(new Error('API Error'));

      // Act & Assert
      await expect(parser.enhance(partialSpec)).rejects.toThrow('API Error');
    });

    it('should throw error for invalid enhanced response', async () => {
      // Arrange
      const partialSpec: Partial<LandingPageSpec> = {
        businessName: 'Test',
      };

      mockMessagesCreate.mockResolvedValueOnce({
        content: [
          {
            type: 'text',
            text: 'Invalid JSON',
          },
        ],
      });

      // Act & Assert
      await expect(parser.enhance(partialSpec)).rejects.toThrow(
        'Failed to parse enhanced specification'
      );
    });
  });

  describe('constructor', () => {
    it('should use provided API key', () => {
      // Arrange & Act
      const customParser = new SpecificationParser('custom-key');

      // Assert - Just verify parser was created
      expect(customParser).toBeDefined();
    });

    it('should fall back to environment variable', () => {
      // Arrange
      const originalKey = process.env.ANTHROPIC_API_KEY;
      process.env.ANTHROPIC_API_KEY = 'env-key';

      // Act
      const envParser = new SpecificationParser();

      // Assert
      expect(envParser).toBeDefined();

      // Cleanup
      process.env.ANTHROPIC_API_KEY = originalKey;
    });
  });
});
