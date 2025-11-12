import { vi } from 'vitest';
import { LandingPageSpec, LandingPageSpecSchema } from '../../src/types/index';

/**
 * Mock Anthropic Client
 * Provides a fully mocked Anthropic SDK client for testing without making real API calls.
 */
export class MockAnthropicClient {
  private responses: Map<string, any> = new Map();
  private callCount: Map<string, number> = new Map();
  private shouldFail: boolean = false;
  private errorType: 'rate_limit' | 'auth' | 'server' | 'timeout' | null = null;

  constructor() {
    this.reset();
  }

  /**
   * Set a mock response for the next API call.
   */
  setMockResponse(key: string, response: any): void {
    this.responses.set(key, response);
  }

  /**
   * Configure the client to throw an error on the next call.
   */
  setError(
    errorType: 'rate_limit' | 'auth' | 'server' | 'timeout',
    count: number = 1
  ): void {
    this.errorType = errorType;
    this.callCount.set(`error_${errorType}`, count);
  }

  /**
   * Get the number of times a specific method was called.
   */
  getCallCount(method: string): number {
    return this.callCount.get(method) || 0;
  }

  /**
   * Reset all mock state.
   */
  reset(): void {
    this.responses.clear();
    this.callCount.clear();
    this.shouldFail = false;
    this.errorType = null;
  }

  /**
   * Mock messages.create method matching Anthropic SDK interface.
   */
  async messages() {
    return {
      create: vi.fn(async (params: any) => {
        const key = params.model || 'default';
        this.callCount.set(key, (this.callCount.get(key) || 0) + 1);

        // Check if we should throw an error
        if (this.errorType) {
          const errorCount = this.callCount.get(`error_${this.errorType}`) || 0;
          if (errorCount > 0) {
            this.callCount.set(`error_${this.errorType}`, errorCount - 1);
            return this.throwError(this.errorType);
          }
        }

        const response = this.responses.get(key);
        if (response) {
          return response;
        }

        // Default successful response
        return {
          id: 'msg_mock_default',
          type: 'message',
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                businessName: 'MockApp',
                tagline: 'Mock tagline',
                description: 'Mock description',
                hero: {
                  headline: 'Mock headline',
                  subheadline: 'Mock subheadline',
                  cta: {
                    text: 'Get Started',
                    url: 'https://mock.example.com',
                  },
                },
                features: [
                  { title: 'Feature 1', description: 'Test feature' },
                  { title: 'Feature 2', description: 'Test feature' },
                  { title: 'Feature 3', description: 'Test feature' },
                ],
                colors: {
                  primary: '#000000',
                  secondary: '#FFFFFF',
                  accent: '#666666',
                },
                meta: {
                  title: 'Mock App',
                  description: 'Mock app description',
                },
              }),
            },
          ],
          model: 'claude-3-5-sonnet-20241022',
          stop_reason: 'end_turn',
          stop_sequence: null,
          usage: { input_tokens: 100, output_tokens: 300 },
        };
      }),
    };
  }

  /**
   * Throw appropriate error based on type.
   */
  private throwError(
    errorType: 'rate_limit' | 'auth' | 'server' | 'timeout'
  ): never {
    const errors: Record<string, { message: string; status: number }> = {
      rate_limit: {
        message: 'Rate limit exceeded. Retry after 60 seconds.',
        status: 429,
      },
      auth: {
        message: 'Invalid API key provided.',
        status: 401,
      },
      server: {
        message: 'Internal server error.',
        status: 500,
      },
      timeout: {
        message: 'Request timed out after 30 seconds.',
        status: 504,
      },
    };

    const error = errors[errorType];
    const err = new Error(error.message);
    (err as any).status = error.status;
    throw err;
  }
}

/**
 * Create a mock Anthropic client with default configuration.
 */
export function createMockAnthropicClient(): MockAnthropicClient {
  return new MockAnthropicClient();
}

/**
 * Assertion helpers for spec validation.
 */
export const specAssertions = {
  /**
   * Assert that a spec has all required fields.
   */
  hasRequiredFields(spec: any): boolean {
    return (
      spec.businessName &&
      spec.tagline &&
      spec.description &&
      spec.hero &&
      spec.features &&
      Array.isArray(spec.features) &&
      spec.colors &&
      spec.meta
    );
  },

  /**
   * Assert that a spec is valid according to the schema.
   */
  isValid(spec: any): boolean {
    try {
      LandingPageSpecSchema.parse(spec);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Assert that colors are in valid hex format.
   */
  hasValidColors(spec: any): boolean {
    if (!spec.colors) return false;
    const hexRegex = /^#[0-9A-F]{6}$/i;
    return (
      hexRegex.test(spec.colors.primary) &&
      hexRegex.test(spec.colors.secondary) &&
      hexRegex.test(spec.colors.accent) &&
      (spec.colors.background ? hexRegex.test(spec.colors.background) : true) &&
      (spec.colors.text ? hexRegex.test(spec.colors.text) : true)
    );
  },

  /**
   * Assert that features array is within bounds (3-6).
   */
  hasValidFeatureCount(spec: any): boolean {
    return (
      spec.features &&
      Array.isArray(spec.features) &&
      spec.features.length >= 3 &&
      spec.features.length <= 6
    );
  },

  /**
   * Assert that each feature has required fields.
   */
  featureHasRequiredFields(feature: any): boolean {
    return feature.title && feature.description;
  },

  /**
   * Assert that CTA has required fields.
   */
  ctaHasRequiredFields(cta: any): boolean {
    return cta.text && cta.url;
  },

  /**
   * Assert that meta has required fields.
   */
  metaHasRequiredFields(meta: any): boolean {
    return meta.title && meta.description;
  },

  /**
   * Assert that contact email is valid (if provided).
   */
  hasValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Assert that font choice is valid enum value.
   */
  hasValidFont(font: string): boolean {
    return ['modern', 'classic', 'playful', 'professional'].includes(font);
  },

  /**
   * Assert that template choice is valid enum value.
   */
  hasValidTemplate(template: string): boolean {
    return ['minimal', 'bold', 'elegant', 'creative'].includes(template);
  },

  /**
   * Assert that CTA style is valid enum value (if provided).
   */
  hasValidCtaStyle(style: string | undefined): boolean {
    if (style === undefined) return true;
    return ['primary', 'secondary', 'outline'].includes(style);
  },

  /**
   * Get validation errors for a spec.
   */
  getValidationErrors(spec: any): string[] {
    const errors: string[] = [];

    if (!this.isValid(spec)) {
      try {
        LandingPageSpecSchema.parse(spec);
      } catch (error: any) {
        if (error.errors) {
          error.errors.forEach((err: any) => {
            errors.push(`${err.path.join('.')}: ${err.message}`);
          });
        }
      }
    }

    return errors;
  },
};

/**
 * Test data generators for creating valid test specs.
 */
export const generators = {
  /**
   * Generate a minimal valid spec.
   */
  minimalSpec(): LandingPageSpec {
    return {
      businessName: 'TestApp',
      tagline: 'Test tagline',
      description: 'Test description',
      hero: {
        headline: 'Test headline',
        subheadline: 'Test subheadline',
        cta: {
          text: 'Get Started',
          url: 'https://test.example.com',
          style: 'primary',
        },
      },
      features: [
        { title: 'Feature 1', description: 'Test feature 1' },
        { title: 'Feature 2', description: 'Test feature 2' },
        { title: 'Feature 3', description: 'Test feature 3' },
      ],
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        accent: '#666666',
      },
      meta: {
        title: 'Test App',
        description: 'Test app description',
      },
    };
  },

  /**
   * Generate a complete spec with all optional fields.
   */
  completeSpec(): LandingPageSpec {
    const minimal = this.minimalSpec();
    return {
      ...minimal,
      hero: {
        ...minimal.hero,
        imageUrl: 'https://images.example.com/test.png',
      },
      about: {
        title: 'About Us',
        content: 'We are a test company founded in 2024.',
      },
      contact: {
        email: 'test@example.com',
        phone: '+1-555-0000',
        address: '123 Test Street, Test City, TC 12345',
        social: {
          twitter: 'https://twitter.com/testapp',
          linkedin: 'https://linkedin.com/company/testapp',
          github: 'https://github.com/testapp',
        },
      },
      colors: {
        ...minimal.colors,
        background: '#F5F5F5',
        text: '#333333',
      },
      font: 'professional',
      template: 'bold',
      meta: {
        ...minimal.meta,
        keywords: ['test', 'app', 'example'],
      },
    };
  },

  /**
   * Generate a random valid hex color.
   */
  randomHexColor(): string {
    return (
      '#' + Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    );
  },

  /**
   * Generate a spec with custom values.
   */
  customSpec(overrides: Partial<LandingPageSpec>): LandingPageSpec {
    return {
      ...this.completeSpec(),
      ...overrides,
    };
  },

  /**
   * Generate multiple specs for batch testing.
   */
  multipleSpecs(count: number): LandingPageSpec[] {
    const specs: LandingPageSpec[] = [];
    for (let i = 0; i < count; i++) {
      specs.push(
        this.customSpec({
          businessName: `TestApp${i}`,
          meta: {
            title: `Test App ${i}`,
            description: `Description for test app ${i}`,
          },
        })
      );
    }
    return specs;
  },

  /**
   * Generate a spec that fails schema validation.
   */
  invalidSpec(): any {
    return {
      businessName: 'InvalidApp',
      // Missing required fields: tagline, description, hero, features, colors, meta
    };
  },

  /**
   * Generate a spec with too many features (exceeds max).
   */
  specWithTooManyFeatures(): any {
    const spec = this.completeSpec();
    return {
      ...spec,
      features: [
        { title: 'F1', description: 'Test' },
        { title: 'F2', description: 'Test' },
        { title: 'F3', description: 'Test' },
        { title: 'F4', description: 'Test' },
        { title: 'F5', description: 'Test' },
        { title: 'F6', description: 'Test' },
        { title: 'F7', description: 'Too many' },
      ],
    };
  },

  /**
   * Generate a spec with invalid color format.
   */
  specWithInvalidColors(): any {
    const spec = this.completeSpec();
    return {
      ...spec,
      colors: {
        primary: 'not-a-color',
        secondary: 'also-invalid',
        accent: 'rgb(255, 0, 0)',
      },
    };
  },

  /**
   * Generate a spec with missing contact email but provided as required.
   */
  specWithInvalidEmail(): any {
    const spec = this.completeSpec();
    return {
      ...spec,
      contact: {
        ...spec.contact,
        email: 'not-an-email',
      },
    };
  },
};

/**
 * Helper to wait for async operations in tests.
 */
export async function waitFor(
  condition: () => boolean,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Timeout waiting for condition to be true');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

/**
 * Helper to create a resolved promise with a value.
 */
export function resolvedPromise<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

/**
 * Helper to create a rejected promise with an error.
 */
export function rejectedPromise<T>(error: Error): Promise<T> {
  return Promise.reject(error);
}

/**
 * Helper to temporarily mock console methods during tests.
 */
export function mockConsole(
  methods: Array<'log' | 'error' | 'warn' | 'info'> = ['log', 'error', 'warn']
): Record<string, any> {
  const mocks: Record<string, any> = {};
  methods.forEach((method) => {
    mocks[method] = vi.spyOn(console, method).mockImplementation(() => {});
  });
  return mocks;
}

/**
 * Helper to restore mocked console methods.
 */
export function restoreConsole(mocks: Record<string, any>): void {
  Object.values(mocks).forEach((mock) => {
    if (mock && typeof mock.mockRestore === 'function') {
      mock.mockRestore();
    }
  });
}

/**
 * Helper to compare two specs for equality (ignoring undefined values).
 */
export function specsAreEqual(spec1: any, spec2: any): boolean {
  return JSON.stringify(spec1) === JSON.stringify(spec2);
}

/**
 * Helper to extract JSON from a string that might contain additional text.
 */
export function extractJsonFromText(text: string): string {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in text');
  }
  return jsonMatch[0];
}

/**
 * Helper to parse and validate JSON response from API.
 */
export function parseAndValidateResponse(text: string): LandingPageSpec {
  const jsonStr = extractJsonFromText(text);
  const parsed = JSON.parse(jsonStr);
  return LandingPageSpecSchema.parse(parsed);
}

/**
 * Helper to create a test context with common test utilities.
 */
export function createTestContext() {
  return {
    client: createMockAnthropicClient(),
    assertions: specAssertions,
    generators,
  };
}
