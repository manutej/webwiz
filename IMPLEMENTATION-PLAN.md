# WebWiz Enhancement Implementation Plan

**Version:** 1.0
**Date:** 2025-11-12
**Spec Reference:** SPEC.md v2.0

---

## Executive Summary

This implementation plan provides a **step-by-step execution roadmap** for enhancing WebWiz from MVP to production-grade platform. The plan prioritizes **foundation-first** development, following TDD methodology and Pragmatic Programmer principles.

**Key Priorities:**
1. **Testing Infrastructure First** - No new features without tests
2. **Component Library** - Eliminate duplication via DRY principles
3. **Template Expansion** - Add Elegant and Creative templates
4. **Enhanced AI** - Better copy generation and provider flexibility
5. **Improved UX** - Live preview and visual editing
6. **Developer Extensibility** - Plugin architecture

**Total Timeline:** 6 weeks (230 hours)
**Execution Model:** Test-Driven Development (TDD) throughout

---

## Implementation Philosophy

### Core Principles (Pragmatic Programmer)

1. **DRY at Every Level**
   - Extract shared components before building new templates
   - Eliminate copy-paste code
   - Measure duplication reduction (target: 60%)

2. **Act Deliberately**
   - TDD: Write tests BEFORE implementation
   - Hypothesis-driven debugging
   - No rushing to "make it work" - make it right

3. **Refactor Early and Often**
   - After each feature: refactoring pass
   - Keep cyclomatic complexity ≤ 10
   - No technical debt accumulation

4. **Domain-Oriented Design**
   - Code reflects website generation domain
   - Clear abstractions: Parser, Generator, Template, Component
   - Names match problem domain

5. **Continuous Learning**
   - Stay current with Next.js 14+ patterns
   - Experiment with AI prompt engineering
   - Share learnings via ADRs (Architecture Decision Records)

### TDD Workflow

**For Every Feature:**
```
1. Write failing test (RED)
2. Implement minimal code to pass (GREEN)
3. Refactor for quality (REFACTOR)
4. Commit with descriptive message
5. Push to feature branch
```

**Test Quality Standards:**
- Tests validate CORE functionality, not implementation details
- Tests should fail when behavior changes
- Tests should NOT be brittle (no snapshot abuse)
- Test names describe expected behavior

**Example:**
```typescript
// ❌ BAD: Tests implementation detail
test('parser calls AI API', ...)

// ✅ GOOD: Tests behavior
test('parser converts business description to valid spec', ...)
```

---

## Phase-by-Phase Implementation

## PHASE 1: Foundation (Week 1) - 40 hours

**Objective:** Establish testing infrastructure and achieve baseline code coverage.

**Success Criteria:**
- ✅ Vitest and Playwright configured and running
- ✅ CI pipeline passing on every commit
- ✅ ≥ 85% coverage on parser.ts and generator.ts
- ✅ All existing functionality has tests

### Day 1-2: Testing Infrastructure (16 hours)

**Tasks:**
1. **Install Testing Dependencies** (2 hours)
   ```bash
   npm install -D vitest @vitest/ui @testing-library/react \
     @testing-library/jest-dom playwright @playwright/test \
     happy-dom c8
   ```

2. **Configure Vitest** (2 hours)
   - Create `vitest.config.ts`
   - Configure coverage thresholds (85%)
   - Set up happy-dom environment
   - Add test scripts to package.json

3. **Configure Playwright** (2 hours)
   - Create `playwright.config.ts`
   - Configure test browsers (Chromium, Firefox, WebKit)
   - Set up test fixtures
   - Add E2E test script

4. **Set up CI Pipeline** (3 hours)
   - Create `.github/workflows/ci.yml`
   - Jobs: lint, type-check, unit-tests, e2e-tests
   - Configure coverage reporting
   - Add status badge to README

5. **Create Test Utilities** (3 hours)
   - `tests/fixtures/specs.ts` - Example specifications
   - `tests/fixtures/descriptions.ts` - Test inputs
   - `tests/utilities/test-helpers.ts` - Common test utilities
   - Mock Anthropic API responses

6. **First Test Run** (4 hours)
   - Run `npm test` - expect failures (no tests yet)
   - Verify coverage report generation
   - Verify CI pipeline triggers
   - Fix any configuration issues

**Deliverables:**
- ✅ `vitest.config.ts` with coverage configured
- ✅ `playwright.config.ts` with browser settings
- ✅ `.github/workflows/ci.yml` with all jobs
- ✅ `tests/` directory structure created
- ✅ CI pipeline passing (even with 0% coverage)

---

### Day 3-4: Parser Tests (16 hours)

**TDD Workflow:**

**Test 1: Parse Valid Business Description** (3 hours)
```typescript
// tests/lib/parser.test.ts
describe('parseDescription', () => {
  test('converts valid business description to spec', async () => {
    const description = 'CloudSync Pro - cloud storage...';
    const spec = await parseDescription(description);

    expect(spec.business.name).toBe('CloudSync Pro');
    expect(spec.hero.headline).toBeTruthy();
    expect(spec.features).toHaveLength(3); // At least 3
    expect(spec.design.colorScheme.primary).toMatch(/^#[0-9A-F]{6}$/i);
  });
});
```
- Write test (RED)
- Run test - expect failure
- Ensure existing implementation passes
- Refactor if needed

**Test 2: Handle Invalid Input** (3 hours)
```typescript
test('throws error for empty description', async () => {
  await expect(parseDescription('')).rejects.toThrow('Description is required');
});

test('throws error for very short description', async () => {
  await expect(parseDescription('hi')).rejects.toThrow('Description too short');
});
```

**Test 3: Handle AI API Failures** (3 hours)
```typescript
test('retries on rate limit error', async () => {
  // Mock API to return rate limit error twice, then succeed
  const spec = await parseDescription('Test business');
  expect(mockAPI).toHaveBeenCalledTimes(3);
});

test('throws after max retries', async () => {
  // Mock API to always fail
  await expect(parseDescription('Test')).rejects.toThrow('AI service unavailable');
});
```

**Test 4: Handle Partial Descriptions** (3 hours)
```typescript
test('fills in missing sections with defaults', async () => {
  const description = 'My Business'; // Very minimal
  const spec = await parseDescription(description);

  expect(spec.business.name).toBe('My Business');
  expect(spec.hero.headline).toBeTruthy(); // Should generate something
  expect(spec.features.length).toBeGreaterThanOrEqual(3); // Minimum features
});
```

**Test 5: Validate Zod Schema** (4 hours)
```typescript
test('ensures spec matches Zod schema', async () => {
  const spec = await parseDescription('Test business');

  // Should not throw
  expect(() => LandingPageSpecSchema.parse(spec)).not.toThrow();
});

test('throws on invalid AI response', async () => {
  // Mock AI to return malformed response
  await expect(parseDescription('Test')).rejects.toThrow('Invalid AI response');
});
```

**After Each Test:**
- Run tests: `npm test parser`
- Check coverage: should reach ≥ 90%
- Refactor for clarity
- Commit: `test: add parser tests for [scenario]`

**Deliverables:**
- ✅ `tests/lib/parser.test.ts` with ≥ 90% coverage
- ✅ All tests passing
- ✅ Bugs found and fixed during testing

---

### Day 5: Generator Tests (8 hours)

**Test 1: Generate Project Structure** (2 hours)
```typescript
describe('generateSite', () => {
  test('creates all required files', async () => {
    const spec = fixtures.exampleSpec;
    const outputPath = await generateSite(spec, 'minimal');

    expect(fs.existsSync(`${outputPath}/package.json`)).toBe(true);
    expect(fs.existsSync(`${outputPath}/next.config.mjs`)).toBe(true);
    expect(fs.existsSync(`${outputPath}/tsconfig.json`)).toBe(true);
    expect(fs.existsSync(`${outputPath}/src/app/page.tsx`)).toBe(true);
  });
});
```

**Test 2: Template Rendering** (2 hours)
```typescript
test('renders template with spec data', async () => {
  const spec = fixtures.exampleSpec;
  const outputPath = await generateSite(spec, 'minimal');

  const pageContent = fs.readFileSync(`${outputPath}/src/app/page.tsx`, 'utf-8');
  expect(pageContent).toContain(spec.hero.headline);
  expect(pageContent).toContain(spec.business.name);
});
```

**Test 3: Handle Invalid Template** (1 hour)
```typescript
test('throws error for unknown template', async () => {
  await expect(generateSite(spec, 'invalid')).rejects.toThrow('Template not found');
});
```

**Test 4: Handle File System Errors** (2 hours)
```typescript
test('throws error if output directory not writable', async () => {
  // Mock fs to simulate permission error
  await expect(generateSite(spec, 'minimal', '/readonly')).rejects.toThrow();
});
```

**Test 5: Generate Valid package.json** (1 hour)
```typescript
test('package.json has all required dependencies', async () => {
  const outputPath = await generateSite(spec, 'minimal');
  const pkg = JSON.parse(fs.readFileSync(`${outputPath}/package.json`));

  expect(pkg.dependencies.react).toBeTruthy();
  expect(pkg.dependencies.next).toBeTruthy();
  expect(pkg.dependencies.tailwindcss).toBeTruthy();
});
```

**Deliverables:**
- ✅ `tests/lib/generator.test.ts` with ≥ 85% coverage
- ✅ All tests passing
- ✅ CI pipeline passing

---

## PHASE 2: Component Library (Week 2) - 40 hours

**Objective:** Extract shared components from templates, achieve ≥ 60% code reduction.

**Success Criteria:**
- ✅ Hero, FeatureGrid, ContactSection, Footer components extracted
- ✅ All components have unit + accessibility tests
- ✅ Minimal and Bold templates refactored to use components
- ✅ ≥ 60% reduction in template code

### Day 1-2: Hero Component (16 hours)

**TDD Workflow:**

**1. Design Hero API** (2 hours)
```typescript
// src/components/Hero/types.ts
export interface HeroProps {
  headline: string;
  subheadline: string;
  cta: {
    text: string;
    link: string;
    variant: 'primary' | 'secondary' | 'outline';
  };
  variant: 'centered' | 'left' | 'split';
  gradient?: {
    from: string;
    to: string;
  };
  image?: string;
  theme: Theme;
}
```

**2. Write Hero Tests FIRST** (4 hours)
```typescript
// src/components/Hero/Hero.test.tsx
describe('Hero Component', () => {
  test('renders centered variant', () => {
    render(<Hero variant="centered" {...mockProps} />);
    expect(screen.getByText(mockProps.headline)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(mockProps.cta.text);
  });

  test('renders left-aligned variant', () => {
    render(<Hero variant="left" {...mockProps} />);
    const container = screen.getByTestId('hero-container');
    expect(container).toHaveClass('text-left');
  });

  test('renders split variant with image', () => {
    render(<Hero variant="split" image="/test.jpg" {...mockProps} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test.jpg');
  });

  test('applies theme colors', () => {
    render(<Hero {...mockProps} theme={testTheme} />);
    const cta = screen.getByRole('button');
    expect(cta).toHaveStyle({ backgroundColor: testTheme.primary });
  });

  // Accessibility tests
  test('has proper heading hierarchy', () => {
    render(<Hero {...mockProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('CTA button is keyboard accessible', () => {
    render(<Hero {...mockProps} />);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

**3. Implement Hero Component** (6 hours)
- Create `src/components/Hero/Hero.tsx`
- Implement 3 variants
- Apply theme styling
- Ensure accessibility (semantic HTML, ARIA where needed)
- Run tests - iterate until all pass

**4. Extract Hero from Templates** (4 hours)
- Replace Hero sections in Minimal template with `<Hero />`
- Replace Hero sections in Bold template with `<Hero />`
- Delete duplicated code
- Run visual regression tests
- Measure code reduction

**Deliverables:**
- ✅ `src/components/Hero/` with component, tests, types
- ✅ Tests passing with ≥ 90% coverage
- ✅ Templates using component
- ✅ Visual regression tests passing

---

### Day 3: FeatureGrid Component (8 hours)

**Similar TDD workflow:**
1. Design FeatureGridProps interface (1 hour)
2. Write tests FIRST (2 hours)
   - Different column layouts (2, 3, 4)
   - Icon rendering
   - Responsive behavior
   - Accessibility (keyboard navigation)
3. Implement component (3 hours)
4. Extract from templates (2 hours)

**Deliverables:**
- ✅ `src/components/FeatureGrid/` with tests
- ✅ Templates using component

---

### Day 4: ContactSection & Footer (16 hours)

**ContactSection** (8 hours):
1. Design API (1 hour)
2. Write tests (2 hours)
3. Implement (3 hours)
4. Extract from templates (2 hours)

**Footer** (8 hours):
1. Design API (1 hour)
2. Write tests (2 hours)
3. Implement (3 hours)
4. Extract from templates (2 hours)

**Deliverables:**
- ✅ `src/components/ContactSection/` with tests
- ✅ `src/components/Footer/` with tests
- ✅ All templates using components

---

### Day 5: Measure & Refine (8 hours)

**1. Code Reduction Measurement** (2 hours)
```bash
# Before
cloc src/templates/minimal.tsx src/templates/bold.tsx
# After
cloc src/templates/minimal.tsx src/templates/bold.tsx

# Calculate reduction percentage
```
Target: ≥ 60% reduction

**2. Performance Benchmarks** (2 hours)
- Measure template rendering time
- Measure generation time
- Compare before/after
- Target: No regression

**3. Visual Regression Tests** (2 hours)
- Capture screenshots of all templates
- Compare with baseline
- Ensure no visual changes

**4. Documentation** (2 hours)
- Write component usage examples
- Update template documentation
- Create ADR for component extraction

**Deliverables:**
- ✅ Metrics report showing ≥ 60% code reduction
- ✅ Visual regression tests passing
- ✅ Component documentation complete

---

## PHASE 3: New Templates (Week 3) - 40 hours

**Objective:** Add Elegant and Creative templates using component library.

**Success Criteria:**
- ✅ Elegant template production-ready (Lighthouse ≥ 90, WCAG AA)
- ✅ Creative template production-ready (Lighthouse ≥ 90, WCAG AA)
- ✅ Template preview in Web UI
- ✅ Visual regression tests for all 4 templates

### Day 1-2: Elegant Template (16 hours)

**Design Phase** (4 hours):
1. Research elegant/luxury websites (Dribbble, Awwwards)
2. Define color palette:
   - Primary: Navy (#1E3A5F)
   - Secondary: Gold (#D4AF37)
   - Accent: Cream (#F5F5DC)
3. Choose fonts: Playfair Display (headings), Lora (body)
4. Document spacing/layout principles

**TDD Implementation** (10 hours):

**1. Write Template Tests FIRST** (3 hours)
```typescript
// src/templates/elegant.test.tsx
describe('Elegant Template', () => {
  test('renders with spec data', () => {
    render(<ElegantTemplate spec={fixtures.exampleSpec} />);
    expect(screen.getByText(fixtures.exampleSpec.hero.headline)).toBeInTheDocument();
  });

  test('uses Playfair Display font', () => {
    render(<ElegantTemplate spec={fixtures.exampleSpec} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('font-playfair');
  });

  test('passes accessibility audit', async () => {
    const { container } = render(<ElegantTemplate spec={fixtures.exampleSpec} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('achieves Lighthouse score ≥ 90', async () => {
    // Generate site and run Lighthouse
    const scores = await runLighthouse('/elegant-test');
    expect(scores.performance).toBeGreaterThanOrEqual(90);
    expect(scores.accessibility).toBeGreaterThanOrEqual(90);
  });
});
```

**2. Implement Template** (6 hours)
```typescript
// src/templates/elegant.tsx
const elegantTheme: Theme = {
  primary: '#1E3A5F',
  secondary: '#D4AF37',
  accent: '#F5F5DC',
  background: '#FFFFFF',
  text: '#2C2C2C',
  fonts: {
    heading: 'Playfair Display, serif',
    body: 'Lora, serif',
  },
};

export default function ElegantTemplate({ spec }: { spec: LandingPageSpec }) {
  return (
    <div className="elegant-template font-lora">
      <Hero
        variant="centered"
        headline={spec.hero.headline}
        subheadline={spec.hero.subheadline}
        cta={spec.hero.cta}
        theme={elegantTheme}
      />
      <FeatureGrid
        features={spec.features}
        layout="3-column"
        theme={elegantTheme}
      />
      <ContactSection contact={spec.contact} theme={elegantTheme} />
      <Footer {...spec.footer} theme={elegantTheme} />
    </div>
  );
}
```

**3. Iterate Until Tests Pass** (1 hour)

**Snapshot Testing** (2 hours):
```typescript
test('matches snapshot', () => {
  const tree = renderer.create(<ElegantTemplate spec={fixtures.exampleSpec} />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

**Deliverables:**
- ✅ `src/templates/elegant.tsx`
- ✅ `src/templates/elegant.test.tsx` with full coverage
- ✅ All tests passing
- ✅ Lighthouse score ≥ 90

---

### Day 3-4: Creative Template (16 hours)

**Same workflow as Elegant:**
1. Design phase (4 hours)
   - Vibrant colors (primary: #FF6B6B, secondary: #4ECDC4, accent: #FFE66D)
   - Modern fonts (Outfit, Space Grotesk)
   - Asymmetric layouts, geometric shapes
2. Write tests FIRST (3 hours)
3. Implement template (6 hours)
4. Accessibility + Lighthouse audits (2 hours)
5. Snapshot tests (1 hour)

**Special Considerations:**
- Animations: Use prefers-reduced-motion for accessibility
- High contrast mode support
- Performance testing with animations enabled

**Deliverables:**
- ✅ `src/templates/creative.tsx`
- ✅ `src/templates/creative.test.tsx`
- ✅ All accessibility requirements met

---

### Day 5: Template Preview UI (8 hours)

**1. Write UI Tests FIRST** (2 hours)
```typescript
// tests/app/template-preview.test.tsx
test('displays all 4 template previews', () => {
  render(<TemplatePicker spec={mockSpec} />);
  expect(screen.getAllByTestId('template-preview')).toHaveLength(4);
});

test('updates preview on template switch', async () => {
  render(<TemplatePicker spec={mockSpec} />);
  const boldButton = screen.getByText('Bold');
  fireEvent.click(boldButton);

  await waitFor(() => {
    expect(screen.getByTestId('preview-iframe')).toHaveAttribute('data-template', 'bold');
  });
});
```

**2. Implement Preview Component** (4 hours)
- Create preview iframe with shadow DOM
- Template switcher UI
- Real-time spec updates (debounced 500ms)
- Loading states

**3. Visual Regression Suite** (2 hours)
- Playwright visual comparison
- Capture screenshots for all templates
- Set diff thresholds
- Add to CI pipeline

**Deliverables:**
- ✅ Template preview in Web UI
- ✅ Visual regression tests for all 4 templates
- ✅ CI pipeline running visual tests

---

## PHASE 4: Enhanced AI (Week 4) - 40 hours

**Objective:** Improve AI capabilities with better prompts, multiple providers, and enhanced features.

**Success Criteria:**
- ✅ AI provider abstraction supports Claude + OpenAI
- ✅ Headlines score ≥ 70 on CoSchedule analyzer
- ✅ AI generates 3 color scheme options with rationale
- ✅ Enhanced spec quality measurably improves

### Day 1-2: AI Provider Abstraction (16 hours)

**TDD Workflow:**

**1. Design Provider Interface** (2 hours)
```typescript
// src/lib/ai-provider.ts
export interface AIProvider {
  parse(description: string): Promise<LandingPageSpec>;
  enhance(spec: LandingPageSpec): Promise<LandingPageSpec>;
  generateCopy(section: string, context: any): Promise<string[]>;
}

export interface AIProviderConfig {
  provider: 'anthropic' | 'openai';
  apiKey: string;
  model?: string;
  maxRetries?: number;
}
```

**2. Write Provider Tests FIRST** (4 hours)
```typescript
describe('AIProvider Abstraction', () => {
  test('returns provider based on config', () => {
    const provider = getAIProvider({ provider: 'anthropic', apiKey: 'test' });
    expect(provider).toBeInstanceOf(AnthropicProvider);
  });

  test('AnthropicProvider calls correct API', async () => {
    const provider = new AnthropicProvider({ apiKey: 'test' });
    await provider.parse('Test description');
    expect(mockAnthropicAPI).toHaveBeenCalledWith(expect.objectContaining({
      model: 'claude-sonnet-4.5',
    }));
  });

  test('OpenAIProvider calls correct API', async () => {
    const provider = new OpenAIProvider({ apiKey: 'test' });
    await provider.parse('Test description');
    expect(mockOpenAIAPI).toHaveBeenCalledWith(expect.objectContaining({
      model: 'gpt-4',
    }));
  });

  test('providers return compatible spec format', async () => {
    const anthropicSpec = await anthropicProvider.parse('Test');
    const openaiSpec = await openaiProvider.parse('Test');

    expect(LandingPageSpecSchema.parse(anthropicSpec)).toBeTruthy();
    expect(LandingPageSpecSchema.parse(openaiSpec)).toBeTruthy();
  });
});
```

**3. Implement Abstraction** (6 hours)
- Create base interface
- Implement AnthropicProvider
- Refactor existing parser.ts to use provider

**4. Implement OpenAIProvider** (4 hours)
- Install OpenAI SDK
- Map responses to LandingPageSpec format
- Handle errors and rate limits
- Test with real API (integration test)

**Deliverables:**
- ✅ `src/lib/ai-provider.ts` with interface and providers
- ✅ Tests passing with ≥ 85% coverage
- ✅ parser.ts refactored to use providers
- ✅ Users can switch providers via env var

---

### Day 3: Enhanced Prompts (8 hours)

**1. Research & Design** (2 hours)
- Study conversion copywriting best practices
- Research color psychology principles
- Analyze high-performing headlines

**2. Write Prompt Tests** (2 hours)
```typescript
test('generates headline with ≥ 70 score', async () => {
  const spec = await parseDescription('CloudSync Pro - cloud storage');
  const score = await scoreHeadline(spec.hero.headline);
  expect(score).toBeGreaterThanOrEqual(70);
});

test('generates 3 color scheme options with rationale', async () => {
  const spec = await parseDescription('Luxury spa business');
  expect(spec.design.colorSchemeOptions).toHaveLength(3);
  expect(spec.design.colorSchemeOptions[0].rationale).toContain('calming');
});
```

**3. Implement Enhanced Prompts** (3 hours)
```typescript
const ENHANCED_PARSER_PROMPT = `
You are an expert conversion copywriter and web designer...

For headlines, follow these principles:
- Start with a strong action verb or benefit
- Target 60-90 characters for optimal readability
- Include emotional triggers and specificity

For color schemes, apply color psychology:
- Blue: Trust, professionalism (finance, healthcare)
- Green: Growth, nature (sustainability, wellness)
- Orange: Energy, enthusiasm (fitness, events)
...
`;
```

**4. Test & Iterate** (1 hour)
- Test with various business descriptions
- Measure headline scores
- Adjust prompts until ≥ 70 average score

**Deliverables:**
- ✅ Enhanced prompts in parser
- ✅ Headline quality improved (≥ 70 score)
- ✅ Color schemes include rationale

---

### Day 4: Generate-Copy Command (8 hours)

**1. Design CLI Command** (1 hour)
```bash
webwiz generate-copy headline spec.json
webwiz generate-copy features spec.json
webwiz generate-copy about spec.json
```

**2. Write Command Tests** (2 hours)
```typescript
test('generates 3 headline variations', async () => {
  const variations = await generateCopy('headline', mockSpec);
  expect(variations).toHaveLength(3);
  expect(variations[0]).not.toBe(variations[1]);
});

test('updates spec file with selected copy', async () => {
  await generateCopyCommand('headline', 'spec.json');
  // Mock user selection of variation 2
  const updatedSpec = JSON.parse(fs.readFileSync('spec.json'));
  expect(updatedSpec.hero.headline).toBe(mockVariations[1]);
});
```

**3. Implement Command** (4 hours)
- Add command to CLI
- Interactive selection with inquirer
- Update spec file
- Pretty output with chalk

**4. Integration Test** (1 hour)
- Test full workflow: generate → select → update

**Deliverables:**
- ✅ `webwiz generate-copy` command working
- ✅ Tests passing
- ✅ Documentation updated

---

### Day 5: Enhanced Enhance Command (8 hours)

**1. Design Enhancement Logic** (1 hour)
- Identify weak areas (short headlines, generic copy, poor color contrast)
- Generate specific improvements
- Show before/after comparison

**2. Write Tests** (2 hours)
```typescript
test('enhance improves headline quality', async () => {
  const originalSpec = { ...mockSpec, hero: { headline: 'My Business' } };
  const enhanced = await enhance(originalSpec);

  const originalScore = await scoreHeadline(originalSpec.hero.headline);
  const enhancedScore = await scoreHeadline(enhanced.hero.headline);

  expect(enhancedScore).toBeGreaterThan(originalScore);
});

test('critique flag shows improvements without changing spec', async () => {
  const result = await enhanceCommand('spec.json', { critique: true });
  expect(result.suggestions).toBeTruthy();

  const spec = JSON.parse(fs.readFileSync('spec.json'));
  expect(spec).toEqual(mockSpec); // Unchanged
});
```

**3. Implement Enhancement** (4 hours)
- Improve enhance prompt
- Add before/after comparison
- Add --critique flag
- Pretty diff output

**4. Test & Refine** (1 hour)

**Deliverables:**
- ✅ Enhanced `webwiz enhance` command
- ✅ --critique flag working
- ✅ Measurably better specs

---

## PHASE 5: Web UI Improvements (Week 5) - 40 hours

**Objective:** Transform Web UI into interactive, visual editor with live preview.

**Success Criteria:**
- ✅ Live preview updates within 500ms
- ✅ Visual color picker functional
- ✅ Drag-and-drop feature ordering works
- ✅ One-click deployment to Vercel/Netlify
- ✅ Save/load drafts working

### Day 1-2: State Management & Live Preview (16 hours)

**1. Implement Zustand Store** (4 hours)

**Tests FIRST:**
```typescript
describe('Editor Store', () => {
  test('updates spec and marks as dirty', () => {
    const { result } = renderHook(() => useEditorStore());
    act(() => {
      result.current.updateSpec({ hero: { headline: 'New Headline' } });
    });
    expect(result.current.isDirty).toBe(true);
  });

  test('persists to localStorage', () => {
    const { result } = renderHook(() => useEditorStore());
    act(() => {
      result.current.save();
    });
    expect(localStorage.getItem('webwiz-draft')).toBeTruthy();
  });
});
```

**Implementation:**
```typescript
// src/store/editor.ts
interface EditorState {
  spec: LandingPageSpec;
  template: TemplateName;
  isDirty: boolean;
  updateSpec: (updates: Partial<LandingPageSpec>) => void;
  setTemplate: (template: TemplateName) => void;
  save: () => void;
  load: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist((set, get) => ({
    spec: defaultSpec,
    template: 'minimal',
    isDirty: false,
    updateSpec: (updates) => set({ spec: { ...get().spec, ...updates }, isDirty: true }),
    // ... other actions
  }), {
    name: 'webwiz-draft',
  })
);
```

**2. Implement Live Preview** (8 hours)

**Tests:**
```typescript
test('preview updates on spec change', async () => {
  render(<EditorWithPreview />);

  const headlineInput = screen.getByLabelText('Headline');
  fireEvent.change(headlineInput, { target: { value: 'New Headline' } });

  await waitFor(() => {
    const iframe = screen.getByTestId('preview-iframe');
    const iframeDoc = iframe.contentDocument;
    expect(iframeDoc.body).toHaveTextContent('New Headline');
  }, { timeout: 600 }); // 500ms debounce + buffer
});
```

**Implementation:**
- Create PreviewPane component
- Implement iframe with shadow DOM
- Debounce updates (500ms)
- Loading states

**3. Responsive Layout** (4 hours)
- Split-screen on desktop
- Stacked on mobile with toggle
- Test on multiple screen sizes

**Deliverables:**
- ✅ Zustand store implemented with tests
- ✅ Live preview working (updates within 500ms)
- ✅ Mobile responsive

---

### Day 3: Visual Color Picker (8 hours)

**1. Install Dependencies** (1 hour)
```bash
npm install react-colorful
```

**2. Write Tests FIRST** (2 hours)
```typescript
test('color picker updates spec', () => {
  render(<ColorPicker />);

  const picker = screen.getByTestId('color-picker-primary');
  fireEvent.change(picker, { target: { value: '#FF6B6B' } });

  expect(mockUpdateSpec).toHaveBeenCalledWith({
    design: { colorScheme: { primary: '#FF6B6B' } },
  });
});

test('shows contrast warning for poor combinations', () => {
  render(<ColorPicker primaryColor="#FFFFFF" textColor="#EEEEEE" />);
  expect(screen.getByText(/contrast ratio too low/i)).toBeInTheDocument();
});
```

**3. Implement Color Picker** (4 hours)
- Visual color picker for each color
- Preset palettes
- Contrast ratio calculator
- Warnings for WCAG violations

**4. Test & Polish** (1 hour)

**Deliverables:**
- ✅ Visual color picker working
- ✅ Contrast warnings showing
- ✅ Presets available

---

### Day 4: Drag-and-Drop & Deployment (16 hours)

**Drag-and-Drop** (8 hours):

**1. Install Dependencies** (1 hour)
```bash
npm install @dnd-kit/core @dnd-kit/sortable
```

**2. Write Tests** (2 hours)
```typescript
test('reorders features via drag and drop', async () => {
  render(<FeatureEditor features={mockFeatures} />);

  const feature1 = screen.getByText('Feature 1');
  const feature2 = screen.getByText('Feature 2');

  // Simulate drag
  await dragAndDrop(feature1, feature2);

  expect(mockUpdateSpec).toHaveBeenCalledWith({
    features: [mockFeatures[1], mockFeatures[0], mockFeatures[2]],
  });
});
```

**3. Implement** (4 hours)
**4. Mobile Testing** (1 hour)

**One-Click Deployment** (8 hours):

**1. Write Tests** (2 hours)
```typescript
test('deploys to Vercel on button click', async () => {
  render(<DeployButton />);

  const deployBtn = screen.getByText('Deploy to Vercel');
  fireEvent.click(deployBtn);

  await waitFor(() => {
    expect(screen.getByText(/deploying/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/deployed successfully/i)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/.+\.vercel\.app/)).toBeInTheDocument();
  });
});
```

**2. Implement** (5 hours)
- Vercel deployment button
- Netlify deployment button
- OAuth flow handling
- Progress indicators

**3. E2E Test** (1 hour)

**Deliverables:**
- ✅ Drag-and-drop working on desktop/mobile
- ✅ One-click deployment to Vercel/Netlify

---

## PHASE 6: Extensibility (Week 6) - 30 hours

**Objective:** Create plugin architecture and comprehensive developer documentation.

**Success Criteria:**
- ✅ Developer can add custom template in < 30 minutes
- ✅ 3 example plugins created and documented
- ✅ Developer guide enables self-service extension

### Day 1-2: Plugin Architecture (16 hours)

**1. Design Plugin System** (4 hours)
- Define plugin interfaces
- Design registration mechanism
- Plan plugin discovery

**2. Implement Template Plugin** (4 hours)
```typescript
// examples/plugins/custom-template/index.ts
export interface TemplatePlugin {
  name: string;
  displayName: string;
  description: string;
  component: React.ComponentType<{ spec: LandingPageSpec }>;
  theme: Theme;
}

export function registerTemplate(plugin: TemplatePlugin) {
  templates.set(plugin.name, plugin);
}
```

**3. Implement Parser Plugin** (4 hours)
```typescript
export interface ParserPlugin {
  name: string;
  parse: (input: any) => Promise<LandingPageSpec>;
}
```

**4. Implement Deployment Plugin** (4 hours)
```typescript
export interface DeploymentPlugin {
  name: string;
  deploy: (siteDir: string, config: any) => Promise<{ url: string }>;
}
```

**Deliverables:**
- ✅ Plugin interfaces defined
- ✅ Plugin registration working
- ✅ Tests for plugin system

---

### Day 3: Example Plugins (8 hours)

**1. E-Commerce Template Plugin** (3 hours)
- Product showcase template
- Shopping cart UI
- Documentation

**2. JSON Parser Plugin** (2 hours)
- Accept JSON input instead of natural language
- Validation
- Documentation

**3. AWS S3 Deployment Plugin** (3 hours)
- Deploy to S3 + CloudFront
- Configuration
- Documentation

**Deliverables:**
- ✅ 3 working example plugins in `examples/plugins/`
- ✅ Each plugin documented

---

### Day 4-5: Documentation & Videos (6 hours)

**Documentation** (4 hours):
1. `docs/PLUGIN-DEVELOPMENT.md`
2. `docs/DEVELOPER-GUIDE.md`
3. API reference
4. Contribution guidelines

**Video Tutorials** (2 hours):
1. "Building Your First Template" (record + edit)
2. "Creating a Custom Parser" (record + edit)
3. "Adding a Deployment Adapter" (record + edit)

**Deliverables:**
- ✅ Comprehensive developer documentation
- ✅ 3 video tutorials published

---

## Execution Checklist

### Before Starting Each Phase

- [ ] Review phase objectives and success criteria
- [ ] Set up working branch: `feature/phase-[N]-[name]`
- [ ] Review previous phase deliverables
- [ ] Ensure CI pipeline is green

### During Development

- [ ] Follow TDD: Write tests FIRST
- [ ] Run tests after each change: `npm test`
- [ ] Check coverage: `npm run test:coverage`
- [ ] Lint and type-check: `npm run lint && npm run type-check`
- [ ] Commit frequently with descriptive messages
- [ ] Push to feature branch daily

### After Completing Each Phase

- [ ] Run full test suite: `npm test`
- [ ] Verify coverage meets targets
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Lighthouse audit for UI changes
- [ ] Accessibility audit with axe
- [ ] Update documentation
- [ ] Create pull request
- [ ] Code review
- [ ] Merge to main branch
- [ ] Tag release if applicable

---

## Success Metrics Dashboard

Track these metrics weekly:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Code Coverage | ≥ 85% | TBD | 🔴 |
| Template Count | 4 | 2 | 🔴 |
| Code Duplication | ≤ 30% | ~70% | 🔴 |
| Lighthouse Score (all templates) | ≥ 90 | ~87 | 🔴 |
| Accessibility Issues | 0 critical | TBD | 🔴 |
| Time to Add Template | < 2h | ~8h | 🔴 |
| Tests Passing | 100% | TBD | 🔴 |
| CI Pipeline | ✅ Passing | TBD | 🔴 |

---

## Risk Mitigation

### If Behind Schedule

**Priority 1 (Must Have):**
- Testing infrastructure (Phase 1)
- Component library (Phase 2)
- At least 1 new template (Phase 3 - Elegant only)

**Priority 2 (Should Have):**
- Enhanced AI prompts (Phase 4)
- Live preview (Phase 5)

**Priority 3 (Nice to Have):**
- Creative template (Phase 3)
- OpenAI provider (Phase 4)
- Plugin architecture (Phase 6)

### If Tests Are Failing

1. **Stop feature development**
2. Investigate root cause
3. Fix tests or implementation
4. Ensure CI is green before proceeding
5. **Never commit with failing tests**

### If Coverage Drops

1. Identify uncovered code: `npm run test:coverage`
2. Write missing tests
3. Refactor complex functions (cyclomatic complexity > 10)
4. Ensure coverage ≥ 85% before moving to next phase

---

## Daily Standup Questions

**What did I complete yesterday?**
- List completed tasks
- Note any tests written/passing

**What will I do today?**
- List planned tasks
- Identify any blockers

**Are there any impediments?**
- API rate limits?
- Unclear requirements?
- Technical challenges?

**Metrics check:**
- Current test coverage: ___%
- Tests passing: ___ / ___
- CI pipeline status: ✅ / 🔴

---

## Definition of Done

A task is DONE when:

✅ All tests written and passing
✅ Code coverage meets target (≥ 85%)
✅ Linting passes with zero warnings
✅ Type-checking passes with zero errors
✅ Documentation updated
✅ Code reviewed and approved
✅ CI pipeline passing
✅ Feature deployed to dev/staging
✅ Acceptance criteria met

---

## Tools & Commands Reference

**Testing:**
```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm run test:ui             # Vitest UI
npm run test:e2e            # Playwright E2E tests
```

**Development:**
```bash
npm run dev                 # Start web UI
npm run cli                 # Run CLI
npm run type-check          # TypeScript check
npm run lint                # ESLint
npm run lint:fix            # Auto-fix linting
```

**Build & Deploy:**
```bash
npm run build               # Build production
npm run build:cli           # Build CLI
npm start                   # Start production server
```

**Quality Checks:**
```bash
npx lighthouse http://localhost:3000 --view
npx axe http://localhost:3000
cloc src/                   # Count lines of code
```

---

## Appendix: Code Examples

### Example TDD Workflow

```typescript
// 1. Write failing test (RED)
describe('parseDescription', () => {
  test('converts description to spec', async () => {
    const spec = await parseDescription('CloudSync Pro - cloud storage');
    expect(spec.business.name).toBe('CloudSync Pro');
  });
});

// Run test: FAIL ❌

// 2. Implement minimal code (GREEN)
export async function parseDescription(description: string) {
  // ... implementation
  return { business: { name: 'CloudSync Pro' }, ... };
}

// Run test: PASS ✅

// 3. Refactor (REFACTOR)
export async function parseDescription(description: string) {
  validateDescription(description);
  const aiResponse = await callAI(description);
  return parseAIResponse(aiResponse);
}

// Run test: PASS ✅
// Commit: "feat: add parseDescription with validation"
```

### Example Component Extraction

```typescript
// BEFORE: Monolithic template
export default function MinimalTemplate({ spec }: Props) {
  return (
    <div>
      <section className="hero bg-gradient-to-r from-blue-500 to-purple-600">
        <h1>{spec.hero.headline}</h1>
        <p>{spec.hero.subheadline}</p>
        <button>{spec.hero.cta.text}</button>
      </section>
      {/* 200+ more lines... */}
    </div>
  );
}

// AFTER: Component-based template
export default function MinimalTemplate({ spec }: Props) {
  return (
    <div>
      <Hero
        variant="centered"
        headline={spec.hero.headline}
        subheadline={spec.hero.subheadline}
        cta={spec.hero.cta}
        theme={minimalTheme}
      />
      <FeatureGrid features={spec.features} theme={minimalTheme} />
      <ContactSection contact={spec.contact} theme={minimalTheme} />
      <Footer {...spec.footer} theme={minimalTheme} />
    </div>
  );
}

// Result: ~80% code reduction
```

---

**Implementation Plan Status:** ✅ Ready for Execution
**Next Steps:** Review plan → Get approval → Begin Phase 1
