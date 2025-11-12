/**
 * Mocked Anthropic API responses for testing.
 * Includes both successful responses and error scenarios.
 */

/**
 * Successful API response with a complete landing page specification.
 * Represents what Claude returns when generating a spec from a description.
 */
export const successfulSpecResponse = {
  id: 'msg_test_successful_spec',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "TaskFlow Pro",
  "tagline": "AI-powered task management for distributed teams",
  "description": "TaskFlow Pro is the all-in-one task management platform that helps remote teams collaborate seamlessly. Powered by AI, it automatically prioritizes your work, predicts deadlines, and keeps your team in sync.",
  "hero": {
    "headline": "Work Smarter, Not Harder",
    "subheadline": "Let AI handle task organization while you focus on what matters most. Join 50,000+ teams already boosting productivity.",
    "cta": {
      "text": "Start Free Trial",
      "url": "https://taskflow.example.com/signup",
      "style": "primary"
    },
    "imageUrl": "https://images.example.com/hero-taskflow.png"
  },
  "features": [
    {
      "title": "AI Task Prioritization",
      "description": "Automatically sorts your tasks based on urgency, dependencies, and deadlines using advanced machine learning.",
      "icon": "🤖"
    },
    {
      "title": "Real-time Collaboration",
      "description": "Work together seamlessly with instant updates, comments, and @mentions across your entire team.",
      "icon": "👥"
    },
    {
      "title": "Smart Deadlines",
      "description": "AI predicts optimal deadline dates based on team velocity and project complexity.",
      "icon": "📅"
    }
  ],
  "colors": {
    "primary": "#3B82F6",
    "secondary": "#10B981",
    "accent": "#F59E0B"
  },
  "font": "modern",
  "template": "bold",
  "meta": {
    "title": "TaskFlow Pro - AI-Powered Task Management for Teams",
    "description": "Boost team productivity with AI-powered task management.",
    "keywords": ["task management", "team collaboration", "AI productivity"]
  }
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 150,
    output_tokens: 500,
  },
};

/**
 * Successful response with minimal spec generation.
 * Tests handling of minimum required fields.
 */
export const successfulMinimalResponse = {
  id: 'msg_test_minimal_spec',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "SimpleApp",
  "tagline": "Get more done",
  "description": "A simple productivity tool.",
  "hero": {
    "headline": "Work Better",
    "subheadline": "Join thousands of happy users",
    "cta": {
      "text": "Get Started",
      "url": "https://simple.example.com/signup"
    }
  },
  "features": [
    {"title": "Feature 1", "description": "Fast and reliable"},
    {"title": "Feature 2", "description": "Easy to use"},
    {"title": "Feature 3", "description": "Great support"}
  ],
  "colors": {
    "primary": "#000000",
    "secondary": "#FFFFFF",
    "accent": "#666666"
  },
  "meta": {
    "title": "SimpleApp",
    "description": "A simple productivity tool"
  }
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 100,
    output_tokens: 300,
  },
};

/**
 * Malformed JSON response - tests error handling.
 * Missing closing brace to trigger parsing error.
 */
export const malformedJsonResponse = {
  id: 'msg_test_malformed_json',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "MalformedApp",
  "tagline": "This is broken",
  "description": "Invalid JSON response",
  "hero": {
    "headline": "Will Fail",
    "subheadline": "JSON parsing error",
    "cta": {
      "text": "Try Again",
      "url": "https://malformed.example.com"
    }
  }`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 80,
    output_tokens: 200,
  },
};

/**
 * Invalid schema response - parses as JSON but fails schema validation.
 * Missing required fields.
 */
export const invalidSchemaResponse = {
  id: 'msg_test_invalid_schema',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "InvalidApp",
  "tagline": "Missing fields"
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 75,
    output_tokens: 100,
  },
};

/**
 * Rate limit error response (429).
 * Tests retry logic and exponential backoff handling.
 */
export const rateLimitError = {
  error: {
    type: 'rate_limit_error',
    message: 'Rate limit exceeded. Retry after 60 seconds.',
  },
  status: 429,
};

/**
 * Authentication error response (401).
 * Tests handling of invalid API credentials.
 */
export const authenticationError = {
  error: {
    type: 'authentication_error',
    message: 'Invalid API key provided. Check your ANTHROPIC_API_KEY.',
  },
  status: 401,
};

/**
 * Server error response (500).
 * Tests handling of transient server failures.
 */
export const serverError = {
  error: {
    type: 'api_error',
    message: 'Internal server error. Please try again later.',
  },
  status: 500,
};

/**
 * Timeout error response.
 * Tests handling of network timeouts.
 */
export const timeoutError = {
  error: {
    type: 'timeout_error',
    message: 'Request timed out after 30 seconds.',
  },
  status: 504,
};

/**
 * Successful response with extended content.
 * Complex spec with all optional fields included.
 */
export const successfulExtendedResponse = {
  id: 'msg_test_extended_spec',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "TechVenture Analytics",
  "tagline": "Real-time intelligence for data-driven enterprises",
  "description": "TechVenture Analytics provides cutting-edge business intelligence and advanced analytics solutions. Our platform processes petabytes of data daily, delivering actionable insights to power strategic decisions.",
  "hero": {
    "headline": "Unlock Hidden Opportunities in Your Data",
    "subheadline": "Transform raw data into competitive advantage with AI-powered analytics. Real-time dashboards, predictive modeling, and automated reporting.",
    "cta": {
      "text": "Request Live Demo",
      "url": "https://techventure.example.com/demo",
      "style": "primary"
    },
    "imageUrl": "https://images.example.com/hero-analytics.png"
  },
  "features": [
    {
      "title": "Real-Time Analytics Engine",
      "description": "Process and analyze data in real-time with millisecond latency.",
      "icon": "⚡"
    },
    {
      "title": "Advanced Visualization",
      "description": "Interactive dashboards with 50+ chart types.",
      "icon": "📊"
    },
    {
      "title": "Predictive Intelligence",
      "description": "AI-powered forecasting and anomaly detection.",
      "icon": "🔮"
    },
    {
      "title": "Enterprise Integration",
      "description": "Native connectors for 200+ data sources.",
      "icon": "🔌"
    },
    {
      "title": "Governance & Compliance",
      "description": "GDPR, HIPAA, and SOC 2 compliant.",
      "icon": "🛡️"
    },
    {
      "title": "Scalable Infrastructure",
      "description": "99.99% uptime SLA with multi-region redundancy.",
      "icon": "☁️"
    }
  ],
  "about": {
    "title": "Why TechVenture Analytics Leads the Industry",
    "content": "Founded in 2015, TechVenture Analytics has been at the forefront of enterprise analytics innovation. Our team of 500+ engineers and data scientists have pioneered breakthrough technologies in real-time data processing."
  },
  "contact": {
    "email": "enterprise@techventure.example.com",
    "phone": "+1-800-555-0199",
    "address": "1000 Innovation Boulevard, San Jose, CA 95110",
    "social": {
      "twitter": "https://twitter.com/techventureio",
      "linkedin": "https://linkedin.com/company/techventure-analytics",
      "github": "https://github.com/techventure",
      "facebook": "https://facebook.com/techventureanalytics",
      "instagram": "https://instagram.com/techventure"
    }
  },
  "colors": {
    "primary": "#1F2937",
    "secondary": "#6366F1",
    "accent": "#EC4899",
    "background": "#F9FAFB",
    "text": "#111827"
  },
  "font": "professional",
  "template": "creative",
  "meta": {
    "title": "TechVenture Analytics - Enterprise Analytics & BI Platform",
    "description": "Transform raw data into competitive advantage with TechVenture Analytics. Real-time dashboards, predictive modeling, AI-powered insights.",
    "keywords": ["analytics", "business intelligence", "BI platform", "predictive analytics", "data visualization"]
  }
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 200,
    output_tokens: 800,
  },
};

/**
 * Response with invalid color format.
 * Tests schema validation of hex color values.
 */
export const invalidColorResponse = {
  id: 'msg_test_invalid_color',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "ColorApp",
  "tagline": "Test invalid colors",
  "description": "Testing color validation",
  "hero": {
    "headline": "Test",
    "subheadline": "Test",
    "cta": {
      "text": "Click",
      "url": "https://test.com"
    }
  },
  "features": [
    {"title": "F1", "description": "Test"},
    {"title": "F2", "description": "Test"},
    {"title": "F3", "description": "Test"}
  ],
  "colors": {
    "primary": "not-a-color",
    "secondary": "also-invalid",
    "accent": "rgb(255, 0, 0)"
  },
  "meta": {
    "title": "ColorApp",
    "description": "Test"
  }
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 90,
    output_tokens: 250,
  },
};

/**
 * Response with too many features.
 * Tests schema validation of array bounds.
 */
export const tooManyFeaturesResponse = {
  id: 'msg_test_too_many_features',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "FeatureApp",
  "tagline": "Too many features",
  "description": "Testing feature limits",
  "hero": {
    "headline": "Test",
    "subheadline": "Test",
    "cta": {
      "text": "Click",
      "url": "https://test.com"
    }
  },
  "features": [
    {"title": "F1", "description": "Test"},
    {"title": "F2", "description": "Test"},
    {"title": "F3", "description": "Test"},
    {"title": "F4", "description": "Test"},
    {"title": "F5", "description": "Test"},
    {"title": "F6", "description": "Test"},
    {"title": "F7", "description": "Too many"}
  ],
  "colors": {
    "primary": "#000000",
    "secondary": "#FFFFFF",
    "accent": "#666666"
  },
  "meta": {
    "title": "FeatureApp",
    "description": "Test"
  }
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'end_turn',
  stop_sequence: null,
  usage: {
    input_tokens: 85,
    output_tokens: 280,
  },
};

/**
 * Request payload for spec generation.
 * Shows what would be sent to the API.
 */
export const specGenerationRequest = {
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 2048,
  messages: [
    {
      role: 'user',
      content: `You are an expert landing page designer and copywriter. Based on the following business description, generate a complete, realistic landing page specification in valid JSON format that matches this exact schema:

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
      "style": "primary|secondary|outline" (optional, defaults to "primary")
    },
    "imageUrl": "string" (optional)
  },
  "features": [{
    "title": "string",
    "description": "string",
    "icon": "string" (optional)
  }] (minimum 3, maximum 6 features),
  "about": {
    "title": "string",
    "content": "string"
  } (optional),
  "contact": {
    "email": "string" (optional, must be valid email),
    "phone": "string" (optional),
    "address": "string" (optional),
    "social": {
      "twitter": "string" (optional),
      "facebook": "string" (optional),
      "instagram": "string" (optional),
      "linkedin": "string" (optional),
      "github": "string" (optional)
    } (optional)
  } (optional),
  "colors": {
    "primary": "string (hex color)",
    "secondary": "string (hex color)",
    "accent": "string (hex color)",
    "background": "string (hex color)" (optional),
    "text": "string (hex color)" (optional)
  },
  "font": "modern|classic|playful|professional" (optional, defaults to "modern"),
  "template": "minimal|bold|elegant|creative" (optional, defaults to "minimal"),
  "meta": {
    "title": "string",
    "description": "string",
    "keywords": ["string"] (optional)
  }
}

Business Description:
TaskFlow Pro is the all-in-one task management platform...

Return ONLY valid JSON, no additional text or explanation.`,
    },
  ],
};

/**
 * Content filter error - API refused to process content.
 * Tests handling of policy violations.
 */
export const contentFilterError = {
  error: {
    type: 'invalid_request_error',
    message: 'Request was rejected due to content policy violation.',
  },
  status: 400,
};

/**
 * Overloaded response - missing expected fields.
 * Tests graceful degradation.
 */
export const incompleteResponse = {
  id: 'msg_test_incomplete',
  type: 'message',
  role: 'assistant',
  content: [
    {
      type: 'text',
      text: `{
  "businessName": "IncompleteApp",
  "tagline": "Minimal data",
  "description": "Test incomplete response"
}`,
    },
  ],
  model: 'claude-3-5-sonnet-20241022',
  stop_reason: 'max_tokens',
  stop_sequence: null,
  usage: {
    input_tokens: 150,
    output_tokens: 2048,
  },
};
