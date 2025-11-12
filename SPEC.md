# WebWiz Enhancement Specification

**Version:** 2.0
**Date:** 2025-11-12
**Status:** Draft for Review
**Owner:** Development Team

---

## Executive Summary

This specification defines the enhancement of WebWiz from a functional MVP to a production-grade, extensible AI-powered website generator. The focus is on **template expansion**, **robust testing infrastructure**, **improved AI capabilities**, and **developer extensibility** while maintaining code quality and adhering to Pragmatic Programmer principles.

---

## 1. CONSTITUTION

### 1.1 Governing Principles

**Design Philosophy:**
- **Domain-Oriented Design**: Code reflects the website generation domain with clear abstractions for templates, parsers, and generators
- **DRY at Every Level**: Eliminate duplication in templates, utilities, documentation, and test fixtures
- **Act Deliberately**: Methodical approach to adding features with comprehensive testing before moving forward
- **Refactor Early and Often**: Each new feature includes refactoring pass to reduce technical debt
- **Continuous Learning**: Stay current with Next.js 14+, React patterns, and AI model capabilities

**Code Quality Standards:**
- TypeScript strict mode with zero `any` types
- 100% type coverage with Zod runtime validation
- ESLint with zero warnings policy
- Prettier for consistent formatting
- Maximum function complexity: 10 cyclomatic complexity
- Maximum file length: 250 lines
- Modular functions: each does ONE thing well

**Testing Requirements:**
- **Unit Tests**: 85%+ code coverage using Vitest
- **Integration Tests**: All API endpoints and CLI commands
- **E2E Tests**: Critical user flows (generate → preview → deploy)
- **Snapshot Tests**: Template rendering consistency
- **TDD Methodology**: Write tests BEFORE implementation
- Tests must validate CORE functionality, not just surface-level checks

**Documentation Standards:**
- JSDoc comments for all public APIs
- README updates for new features
- Architecture decision records (ADRs) for major changes
- User-facing documentation for new templates/features
- Code examples for all extension points

**Accessibility Requirements:**
- WCAG 2.1 AA compliance for all templates
- Semantic HTML5 structure
- Keyboard navigation support
- Screen reader testing with NVDA/JAWS
- Color contrast ratio ≥ 4.5:1

**Security Constraints:**
- No SQL injection vectors (currently N/A, remain vigilant)
- Input validation for all user inputs
- Sanitize AI-generated content
- Rate limiting on API endpoints
- Secure env var handling
- No secrets in generated code

**Performance Benchmarks:**
- Generation time: ≤ 5 seconds for standard landing page
- Template rendering: ≤ 100ms
- Web UI Time to Interactive: ≤ 3 seconds
- Lighthouse score: ≥ 90 across all categories
- Generated sites: Core Web Vitals passing

---

## 2. SPECIFY - Functional Requirements

### 2.1 Enhanced Template System

**User Scenario:**
As a **WebWiz user**, I want to choose from **4+ distinct, professionally-designed templates** so that I can select the aesthetic that best matches my brand identity.

**Current State:**
- 2 templates: Minimal, Bold
- Template selection AI-recommended but limited

**Desired Outcome:**
- **4 production-ready templates**: Minimal, Bold, Elegant, Creative
- Each template visually distinct with unique personality
- All templates responsive, accessible, and performant
- Template preview functionality in Web UI
- User can override AI template suggestion

**Success Criteria:**
1. ✅ All 4 templates render without errors
2. ✅ Each template passes WCAG 2.1 AA accessibility audit
3. ✅ Each template achieves Lighthouse score ≥ 90
4. ✅ Templates share ≥ 60% code through DRY abstractions
5. ✅ Visual regression tests prevent template breakage
6. ✅ User can preview all templates before final selection

---

### 2.2 Robust Testing Infrastructure

**User Scenario:**
As a **developer maintaining WebWiz**, I want comprehensive automated tests so that I can confidently add features and refactor code without breaking existing functionality.

**Current State:**
- No test suite exists
- Manual testing only
- High risk of regressions

**Desired Outcome:**
- Complete test suite with unit, integration, and E2E tests
- TDD workflow: write tests first, then implement
- CI/CD pipeline running tests on every commit
- Fast test execution (< 30 seconds for unit tests)

**Success Criteria:**
1. ✅ ≥ 85% code coverage across all modules
2. ✅ 100% of parser.ts functions have unit tests
3. ✅ 100% of generator.ts functions have unit tests
4. ✅ All templates have snapshot + accessibility tests
5. ✅ API endpoint has integration tests with error cases
6. ✅ CLI commands have E2E tests
7. ✅ Test suite runs in < 60 seconds
8. ✅ CI pipeline fails on test failure or coverage drop

---

### 2.3 Template Component Library

**User Scenario:**
As a **template developer**, I want a shared component library so that I can build new templates quickly using battle-tested, reusable components.

**Current State:**
- Each template is monolithic
- Significant code duplication (Hero sections, Feature grids, etc.)
- No shared utility functions

**Desired Outcome:**
- Extracted component library: `src/components/`
- Reusable building blocks: Hero, FeatureGrid, ContactSection, Footer
- Composable template architecture
- Theme system for consistent styling

**Success Criteria:**
1. ✅ ≥ 60% code reduction in template files through shared components
2. ✅ All shared components have TypeScript interfaces
3. ✅ All shared components have unit tests
4. ✅ All shared components documented with Storybook or examples
5. ✅ New template can be created in < 100 lines of code
6. ✅ Theme system supports all 4 templates

---

### 2.4 Enhanced AI Capabilities

**User Scenario:**
As a **WebWiz user**, I want the AI to generate more compelling, professional copy and suggest optimal design choices so that my landing page converts better.

**Current State:**
- Basic AI parsing of descriptions
- Generic copy generation
- Simple color scheme suggestions

**Desired Outcome:**
- AI generates benefit-focused, conversion-optimized copy
- AI suggests color schemes based on color psychology
- AI recommends CTA button text variations
- AI can critique and improve existing specs

**Success Criteria:**
1. ✅ AI-generated headlines score ≥ 70 on CoSchedule Headline Analyzer
2. ✅ AI suggests 3 color scheme options with rationale
3. ✅ AI generates 3 CTA button text variants
4. ✅ "Enhance" command improves spec quality by measurable metrics
5. ✅ AI response time ≤ 3 seconds
6. ✅ User can regenerate individual sections (headline, features, etc.)

---

### 2.5 Developer Extensibility

**User Scenario:**
As a **developer**, I want clear extension points and documentation so that I can add custom templates, parsers, or deployment targets without modifying core code.

**Current State:**
- Tightly coupled code
- No plugin system
- Limited customization points

**Desired Outcome:**
- Plugin architecture for templates
- Hook system for parser customization
- Deployment adapter pattern for new hosting providers
- Comprehensive developer documentation

**Success Criteria:**
1. ✅ Developer can add new template in < 30 minutes
2. ✅ Developer can add custom parser without modifying parser.ts
3. ✅ Developer can add deployment target (e.g., AWS) via adapter
4. ✅ API documentation with TypeScript examples
5. ✅ "webwiz init plugin" command scaffolds plugin structure
6. ✅ 3 example custom plugins in `/examples/plugins/`

---

### 2.6 Improved Web UI Experience

**User Scenario:**
As a **non-technical user**, I want an intuitive, beautiful web interface with real-time previews so that I can see my landing page as I configure it.

**Current State:**
- Basic form + submit flow
- No live preview
- Limited customization UI

**Desired Outcome:**
- Split-screen: configuration panel + live preview
- Real-time template switching
- Visual color picker
- Drag-and-drop feature reordering
- Download or deploy directly from UI

**Success Criteria:**
1. ✅ Live preview updates within 500ms of changes
2. ✅ Template switching with smooth transitions
3. ✅ Visual color picker with brand color extraction
4. ✅ Drag-and-drop feature ordering works on mobile
5. ✅ One-click deployment to Vercel/Netlify from UI
6. ✅ Mobile-responsive configuration panel
7. ✅ User can save/load drafts to localStorage

---

## 3. CLARIFY - Technical Constraints & Decisions

### 3.1 Testing Framework Selection

**Question:** Which testing framework should we use?
**Answer:** **Vitest** for unit/integration tests, **Playwright** for E2E tests
**Rationale:**
- Vitest: Fast, Vite-native, Jest-compatible API, excellent TypeScript support
- Playwright: Reliable E2E testing with multi-browser support, good for Next.js
- Both have strong community support and active maintenance

### 3.2 Component Library Structure

**Question:** Should we build a custom component library or use a UI framework?
**Answer:** **Custom lightweight library** with Tailwind CSS
**Rationale:**
- Current stack already uses Tailwind
- No need for full UI framework overhead
- Greater control over bundle size
- Easier to maintain custom styling per template

### 3.3 AI Model Selection

**Question:** Should we support multiple AI providers or stick with Anthropic?
**Answer:** **Abstract AI provider** with Claude as default, OpenAI as option
**Rationale:**
- Users may prefer different models/pricing
- Abstraction follows DRY and extensibility principles
- Fallback option if one provider has issues

### 3.4 Template Preview Implementation

**Question:** Server-side rendering or client-side iframe?
**Answer:** **Client-side iframe with shadow DOM** for preview
**Rationale:**
- No server-side rendering overhead
- Style isolation via shadow DOM
- Real-time updates without API calls
- Better performance for live preview

### 3.5 State Management for Web UI

**Question:** Context API, Redux, Zustand, or other?
**Answer:** **Zustand** for global state, React hooks for local state
**Rationale:**
- Lightweight (< 1KB)
- Simple API, less boilerplate than Redux
- Good TypeScript support
- Sufficient for WebWiz complexity

---

## 4. PLAN - Technical Architecture & Implementation Strategy

### 4.1 Technology Stack

**No Changes to Core Stack:**
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3
- Anthropic Claude SDK

**New Dependencies:**
```json
{
  "vitest": "^1.0.0",           // Unit testing
  "playwright": "^1.40.0",       // E2E testing
  "@testing-library/react": "^14.0.0",
  "@vitest/ui": "^1.0.0",       // Test UI
  "zustand": "^4.4.0",          // State management
  "react-colorful": "^5.6.0",   // Color picker
  "@dnd-kit/core": "^6.1.0",    // Drag and drop
  "storybook": "^7.6.0"         // Component docs
}
```

### 4.2 Directory Structure Changes

```
/home/user/webwiz/
├── src/
│   ├── components/          # NEW: Shared component library
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── Hero.test.tsx
│   │   │   └── index.ts
│   │   ├── FeatureGrid/
│   │   ├── ContactSection/
│   │   ├── Footer/
│   │   └── index.ts
│   ├── lib/
│   │   ├── parser.ts
│   │   ├── parser.test.ts   # NEW: Tests
│   │   ├── generator.ts
│   │   ├── generator.test.ts # NEW: Tests
│   │   ├── ai-provider.ts   # NEW: AI abstraction
│   │   └── deploy.ts
│   ├── templates/
│   │   ├── minimal.tsx
│   │   ├── bold.tsx
│   │   ├── elegant.tsx      # NEW
│   │   ├── creative.tsx     # NEW
│   │   ├── shared/          # NEW: Template utilities
│   │   └── index.ts
│   ├── hooks/               # NEW: React hooks
│   │   ├── useSpecEditor.ts
│   │   └── useTemplatePreview.ts
│   ├── store/               # NEW: Zustand store
│   │   └── editor.ts
│   └── types/
├── tests/                   # NEW: Test directory
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
├── examples/
│   └── plugins/             # NEW: Plugin examples
├── .github/
│   └── workflows/
│       └── ci.yml           # NEW: CI pipeline
└── vitest.config.ts         # NEW: Vitest config
```

### 4.3 Module Architecture

**1. Component Library Module (`src/components/`)**
```
Hero Component
├── Variants: Centered, Left-aligned, Split-screen
├── Props: headline, subheadline, cta, image, gradient
├── Tests: Rendering, accessibility, responsive
└── Storybook stories

FeatureGrid Component
├── Layouts: 2-column, 3-column, 4-column
├── Props: features[], iconStyle, cardStyle
├── Tests: Grid layout, icon rendering
└── Storybook stories

[Similar structure for ContactSection, Footer, etc.]
```

**2. AI Provider Module (`src/lib/ai-provider.ts`)**
```typescript
interface AIProvider {
  parse(description: string): Promise<LandingPageSpec>;
  enhance(spec: LandingPageSpec): Promise<LandingPageSpec>;
  generateCopy(section: string, context: any): Promise<string>;
}

class AnthropicProvider implements AIProvider { ... }
class OpenAIProvider implements AIProvider { ... }

export function getAIProvider(provider: string): AIProvider;
```

**3. Testing Strategy**

| Module | Test Type | Coverage Target | Key Tests |
|--------|-----------|-----------------|-----------|
| parser.ts | Unit | 90% | Valid input, invalid input, edge cases |
| generator.ts | Unit + Integration | 85% | File generation, template rendering |
| templates/*.tsx | Snapshot + A11y | 100% | Visual regression, WCAG compliance |
| API routes | Integration | 100% | Success cases, error handling |
| CLI | E2E | 80% | All commands, interactive flows |
| Components | Unit + A11y | 90% | Rendering, props, accessibility |

**4. Template Component Extraction**

Templates will be refactored from monolithic to compositional:

```typescript
// Before: Monolithic (templates/minimal.tsx)
export default function MinimalTemplate(spec: LandingPageSpec) {
  return <div>...500+ lines of JSX...</div>;
}

// After: Compositional
export default function MinimalTemplate(spec: LandingPageSpec) {
  return (
    <div>
      <Hero variant="centered" {...spec.hero} theme={minimalTheme} />
      <FeatureGrid layout="3-column" features={spec.features} theme={minimalTheme} />
      <ContactSection {...spec.contact} theme={minimalTheme} />
      <Footer {...spec.footer} theme={minimalTheme} />
    </div>
  );
}
```

**Shared code reduction target: ≥ 60%**

---

### 4.4 Implementation Phases

**Phase 1: Foundation (Week 1)**
1. Set up Vitest and Playwright
2. Configure CI pipeline
3. Create test fixtures and utilities
4. Write tests for existing code (parser, generator)
5. Establish code coverage baseline

**Phase 2: Component Library (Week 2)**
1. Extract Hero component with tests
2. Extract FeatureGrid component with tests
3. Extract ContactSection component with tests
4. Extract Footer component with tests
5. Refactor existing templates to use components
6. Validate 60% code reduction achieved

**Phase 3: New Templates (Week 3)**
1. Design Elegant template (research + mockup)
2. Implement Elegant template with tests
3. Design Creative template (research + mockup)
4. Implement Creative template with tests
5. Add template preview to Web UI
6. Visual regression test suite

**Phase 4: Enhanced AI (Week 4)**
1. Implement AI provider abstraction
2. Add OpenAI provider
3. Enhance parser with better prompts
4. Add generate-copy command for sections
5. Implement enhance command improvements
6. Add retry logic and error handling

**Phase 5: Web UI Improvements (Week 5)**
1. Implement Zustand store for editor state
2. Add live preview with iframe + shadow DOM
3. Implement visual color picker
4. Add drag-and-drop feature ordering
5. Add save/load drafts
6. Mobile responsive improvements

**Phase 6: Extensibility (Week 6)**
1. Document plugin architecture
2. Create plugin scaffold command
3. Build 3 example plugins
4. Write developer documentation
5. Create video tutorials

---

## 5. TASKS - Actionable Work Items

### 5.1 Phase 1: Foundation

**Task 1.1: Set up Testing Infrastructure**
- [ ] Install Vitest, Playwright, Testing Library
- [ ] Configure `vitest.config.ts` with coverage settings
- [ ] Configure `playwright.config.ts` for E2E tests
- [ ] Set up test scripts in package.json
- [ ] Create `tests/` directory structure
- **Acceptance:** `npm test` runs successfully, coverage report generated

**Task 1.2: Create Test Fixtures**
- [ ] Create `tests/fixtures/specs.ts` with example specs
- [ ] Create `tests/fixtures/descriptions.ts` with test inputs
- [ ] Create `tests/utilities/test-helpers.ts` with common utilities
- [ ] Mock Anthropic API for deterministic tests
- **Acceptance:** Fixtures can be imported in tests, API mocks work

**Task 1.3: Write Parser Tests**
- [ ] Test valid business description parsing
- [ ] Test invalid input handling
- [ ] Test partial description handling
- [ ] Test AI API failure scenarios
- [ ] Test Zod validation errors
- **Acceptance:** ≥ 90% coverage on parser.ts, all tests pass

**Task 1.4: Write Generator Tests**
- [ ] Test project structure generation
- [ ] Test file creation (package.json, next.config, etc.)
- [ ] Test template rendering
- [ ] Test output directory handling
- [ ] Test error scenarios (permissions, disk space)
- **Acceptance:** ≥ 85% coverage on generator.ts, all tests pass

**Task 1.5: Set up CI Pipeline**
- [ ] Create `.github/workflows/ci.yml`
- [ ] Configure test job (unit + integration)
- [ ] Configure E2E test job
- [ ] Configure coverage reporting
- [ ] Add status badge to README
- **Acceptance:** CI runs on every push, fails on test failure

---

### 5.2 Phase 2: Component Library

**Task 2.1: Extract Hero Component**
- [ ] Create `src/components/Hero/Hero.tsx`
- [ ] Define HeroProps interface with variants
- [ ] Implement 3 variants: centered, left, split
- [ ] Write unit tests for all variants
- [ ] Write accessibility tests
- [ ] Create Storybook story
- **Acceptance:** Component used in 2+ templates, tests pass, A11y compliant

**Task 2.2: Extract FeatureGrid Component**
- [ ] Create `src/components/FeatureGrid/FeatureGrid.tsx`
- [ ] Support 2, 3, 4 column layouts
- [ ] Icon rendering with dynamic import
- [ ] Responsive behavior tests
- [ ] Accessibility tests (keyboard navigation)
- **Acceptance:** Component used in all templates, tests pass

**Task 2.3: Extract ContactSection Component**
- [ ] Create `src/components/ContactSection/ContactSection.tsx`
- [ ] Support email, phone, address, social links
- [ ] Form variant (optional)
- [ ] Link validation and sanitization
- [ ] Accessibility tests
- **Acceptance:** Component used in all templates, tests pass

**Task 2.4: Extract Footer Component**
- [ ] Create `src/components/Footer/Footer.tsx`
- [ ] Support copyright, links, social icons
- [ ] Multiple layout variants
- [ ] Tests for all variants
- **Acceptance:** Component used in all templates, tests pass

**Task 2.5: Refactor Existing Templates**
- [ ] Refactor Minimal template to use components
- [ ] Refactor Bold template to use components
- [ ] Remove duplicated code
- [ ] Measure code reduction (target: ≥ 60%)
- [ ] Visual regression tests to ensure no changes
- **Acceptance:** ≥ 60% code reduction, visual tests pass, no functionality lost

**Task 2.6: Create Theme System**
- [ ] Define Theme interface (colors, spacing, fonts)
- [ ] Create theme for each template
- [ ] Pass theme to components via props
- [ ] Test theme application
- **Acceptance:** All templates use theme system, easily customizable

---

### 5.3 Phase 3: New Templates

**Task 3.1: Design Elegant Template**
- [ ] Research elegant/luxury website designs
- [ ] Create color palette (gold, navy, cream)
- [ ] Choose serif fonts (Playfair Display, Lora)
- [ ] Design spacing and layout principles
- [ ] Create Figma mockup (optional but recommended)
- **Acceptance:** Design documented, team approves aesthetic

**Task 3.2: Implement Elegant Template**
- [ ] Create `src/templates/elegant.tsx`
- [ ] Use component library
- [ ] Implement unique elegant styling
- [ ] Write snapshot tests
- [ ] Write accessibility tests
- [ ] Lighthouse audit (target: ≥ 90)
- **Acceptance:** Template renders, tests pass, Lighthouse ≥ 90

**Task 3.3: Design Creative Template**
- [ ] Research creative/artistic websites
- [ ] Create vibrant color palette
- [ ] Choose modern geometric fonts
- [ ] Design asymmetric layouts
- [ ] Document animation principles
- **Acceptance:** Design documented, team approves aesthetic

**Task 3.4: Implement Creative Template**
- [ ] Create `src/templates/creative.tsx`
- [ ] Use component library
- [ ] Implement animations (Framer Motion or CSS)
- [ ] Write snapshot tests
- [ ] Write accessibility tests (motion-safe preferences)
- [ ] Lighthouse audit (target: ≥ 90)
- **Acceptance:** Template renders, tests pass, Lighthouse ≥ 90

**Task 3.5: Add Template Preview to Web UI**
- [ ] Create preview component with iframe
- [ ] Implement shadow DOM for style isolation
- [ ] Add template switcher UI
- [ ] Real-time spec updates to preview
- [ ] Mobile-responsive preview
- **Acceptance:** User can preview all 4 templates, updates in real-time

**Task 3.6: Visual Regression Test Suite**
- [ ] Install Playwright visual comparison tools
- [ ] Capture baseline screenshots for all templates
- [ ] Configure visual diff thresholds
- [ ] Add to CI pipeline
- **Acceptance:** Visual tests catch template regressions

---

### 5.4 Phase 4: Enhanced AI

**Task 4.1: Implement AI Provider Abstraction**
- [ ] Create `src/lib/ai-provider.ts` with interface
- [ ] Refactor parser.ts to use provider
- [ ] Implement AnthropicProvider
- [ ] Add provider selection (env var or config)
- [ ] Write tests with mocked providers
- **Acceptance:** Parser works with provider abstraction, tests pass

**Task 4.2: Implement OpenAI Provider**
- [ ] Create OpenAIProvider class
- [ ] Install OpenAI SDK
- [ ] Map OpenAI responses to LandingPageSpec
- [ ] Add error handling
- [ ] Write integration tests
- **Acceptance:** User can use OpenAI via OPENAI_API_KEY env var

**Task 4.3: Enhance Parser Prompts**
- [ ] Improve system prompt with conversion copywriting best practices
- [ ] Add prompt for color psychology-based color schemes
- [ ] Add prompt for CTA text variations (3 options)
- [ ] Test with various business descriptions
- [ ] A/B test headline quality (CoSchedule Analyzer)
- **Acceptance:** Headlines score ≥ 70, color schemes have rationale

**Task 4.4: Implement Generate-Copy Command**
- [ ] Add `cli generateCopy <section> <spec-file>` command
- [ ] Sections: headline, subheadline, features, about
- [ ] Output 3 variations for user to choose
- [ ] Interactive selection with inquirer
- [ ] Update spec file with selected copy
- **Acceptance:** Command generates quality variations, updates spec

**Task 4.5: Enhance Enhance Command**
- [ ] Improve enhance prompt with specific improvement areas
- [ ] Add before/after comparison output
- [ ] Show specific changes made (headline improved, color adjusted, etc.)
- [ ] Add `--critique` flag for detailed feedback without changes
- **Acceptance:** Enhanced specs measurably better (headline score, readability)

**Task 4.6: Add AI Error Handling & Retries**
- [ ] Implement exponential backoff for rate limits
- [ ] Add timeout handling (30 seconds max)
- [ ] Graceful degradation (use defaults if AI fails)
- [ ] User-friendly error messages
- [ ] Add retry count to CLI output
- **Acceptance:** AI failures don't crash app, retries work, good UX

---

### 5.5 Phase 5: Web UI Improvements

**Task 5.1: Implement Zustand Store**
- [ ] Create `src/store/editor.ts`
- [ ] State: spec, template, isDirty, errors
- [ ] Actions: updateSpec, setTemplate, reset, save, load
- [ ] Persist to localStorage
- [ ] TypeScript interfaces for state
- **Acceptance:** Store works, persists across page refresh

**Task 5.2: Implement Live Preview**
- [ ] Create PreviewPane component with iframe
- [ ] Implement shadow DOM for style isolation
- [ ] Real-time spec updates (debounced 500ms)
- [ ] Loading states during generation
- [ ] Error boundaries for preview crashes
- **Acceptance:** Preview updates within 500ms, no style leakage

**Task 5.3: Add Visual Color Picker**
- [ ] Install react-colorful
- [ ] Create ColorPicker component
- [ ] Support primary, secondary, accent, bg, text colors
- [ ] Show color contrast warnings
- [ ] Preset color palettes (professional, vibrant, calm, etc.)
- **Acceptance:** Users can visually pick colors, contrast warnings work

**Task 5.4: Implement Drag-and-Drop Features**
- [ ] Install @dnd-kit/core
- [ ] Make features array draggable
- [ ] Update spec on drag end
- [ ] Touch support for mobile
- [ ] Visual feedback during drag
- **Acceptance:** Features reorderable via drag-and-drop on desktop/mobile

**Task 5.5: Add One-Click Deployment**
- [ ] Add "Deploy to Vercel" button
- [ ] Add "Deploy to Netlify" button
- [ ] Handle OAuth flow for deployment
- [ ] Show deployment progress
- [ ] Display live URL after deploy
- **Acceptance:** User can deploy to Vercel/Netlify from UI in < 3 clicks

**Task 5.6: Save/Load Drafts**
- [ ] Implement autosave to localStorage (every 30s)
- [ ] Add "Save Draft" manual button
- [ ] Add "Load Draft" from dropdown (list of saved drafts)
- [ ] Show last saved timestamp
- [ ] Confirm before overwriting existing draft
- **Acceptance:** Drafts persist across sessions, user can manage multiple drafts

**Task 5.7: Mobile-Responsive Configuration Panel**
- [ ] Refactor configuration form for mobile
- [ ] Collapsible sections for small screens
- [ ] Touch-friendly inputs (larger tap targets)
- [ ] Test on iPhone, Android devices
- [ ] Preview toggle on mobile (full-screen preview)
- **Acceptance:** UI fully usable on mobile devices (≥ 320px width)

---

### 5.6 Phase 6: Extensibility

**Task 6.1: Document Plugin Architecture**
- [ ] Create `docs/PLUGIN-DEVELOPMENT.md`
- [ ] Document template plugin interface
- [ ] Document parser plugin interface
- [ ] Document deployment plugin interface
- [ ] Code examples for each plugin type
- **Acceptance:** Documentation clear, developer can understand plugin system

**Task 6.2: Create Plugin Scaffold Command**
- [ ] Add `cli init plugin <type> <name>` command
- [ ] Generate boilerplate files (index.ts, README, tests)
- [ ] Generate TypeScript interfaces
- [ ] Generate example implementation
- [ ] Add plugin to local registry
- **Acceptance:** Command generates working plugin scaffold in < 5 seconds

**Task 6.3: Build Example Plugins**
- [ ] Example 1: Custom template (e-commerce focused)
- [ ] Example 2: Custom parser (JSON input instead of natural language)
- [ ] Example 3: Deployment adapter (AWS S3 + CloudFront)
- [ ] Document each example
- [ ] Add to `examples/plugins/`
- **Acceptance:** 3 working examples, well-documented

**Task 6.4: Write Developer Documentation**
- [ ] Create `docs/DEVELOPER-GUIDE.md`
- [ ] Document architecture overview
- [ ] Document all extension points
- [ ] API reference for public APIs
- [ ] Contribution guidelines
- **Acceptance:** Developer can extend WebWiz after reading docs

**Task 6.5: Create Video Tutorials**
- [ ] Video 1: "Building Your First Template" (10 min)
- [ ] Video 2: "Creating a Custom Parser" (8 min)
- [ ] Video 3: "Adding a Deployment Adapter" (12 min)
- [ ] Upload to YouTube
- [ ] Embed in documentation
- **Acceptance:** 3 videos published, linked in docs

---

## 6. SUCCESS METRICS

### 6.1 Quantitative Metrics

| Metric | Baseline (Current) | Target (Post-Implementation) | Measurement Method |
|--------|-------------------|------------------------------|-------------------|
| Template Count | 2 | 4 | Count in `src/templates/` |
| Code Coverage | 0% | ≥ 85% | Vitest coverage report |
| Template Code Duplication | ~70% | ≤ 30% | Manual code review + metrics |
| Generation Time | ~3s | ≤ 5s | Average over 100 runs |
| Template Lighthouse Score | 85-90 | ≥ 90 | Lighthouse CI |
| Accessibility Issues | Unknown | 0 critical | axe-core audit |
| Time to Add New Template | ~8 hours | < 2 hours | Developer timing |
| CLI Command Coverage | ~40% | 100% | E2E test count |

### 6.2 Qualitative Metrics

**Developer Experience:**
- [ ] Developer can add template in < 30 minutes
- [ ] Plugin scaffolding command works end-to-end
- [ ] Documentation enables self-service development

**User Experience:**
- [ ] Users report Web UI is intuitive (SUS score ≥ 70)
- [ ] Live preview improves satisfaction (survey)
- [ ] Template variety meets user needs (feedback)

**Code Quality:**
- [ ] Zero ESLint warnings
- [ ] All functions have TypeScript interfaces
- [ ] No `any` types in codebase
- [ ] Maximum cyclomatic complexity ≤ 10

### 6.3 Acceptance Criteria

This specification is considered **complete** when:

1. ✅ All 4 templates (Minimal, Bold, Elegant, Creative) are production-ready
2. ✅ Test suite achieves ≥ 85% code coverage
3. ✅ CI pipeline passes with zero failures
4. ✅ All templates pass WCAG 2.1 AA accessibility audit
5. ✅ All templates achieve Lighthouse score ≥ 90
6. ✅ Component library reduces template code by ≥ 60%
7. ✅ Web UI includes live preview, color picker, drag-and-drop
8. ✅ AI provider abstraction supports Claude + OpenAI
9. ✅ Plugin architecture documented with 3 working examples
10. ✅ Developer documentation enables extension in < 30 minutes

---

## 7. RISKS & MITIGATIONS

### Risk 1: Template Design Complexity
**Risk:** Creating 4 distinct, high-quality templates is time-consuming
**Impact:** High - Core deliverable
**Mitigation:**
- Start with 2 templates (Minimal, Bold) already done
- Use component library to accelerate development
- Get design approval before implementation
- Use pre-existing design inspiration (Dribbble, Awwwards)

### Risk 2: Testing Overhead
**Risk:** Achieving 85% coverage adds significant time
**Impact:** Medium - Delays delivery
**Mitigation:**
- Use TDD to write tests alongside implementation
- Focus on critical paths first (parser, generator)
- Use snapshot tests for quick coverage wins
- Parallelize test writing across team

### Risk 3: AI API Rate Limits
**Risk:** Anthropic API rate limits during testing
**Impact:** Medium - Blocks development
**Mitigation:**
- Mock AI responses in tests
- Implement caching for common requests
- Add OpenAI as fallback provider
- Request rate limit increase from Anthropic

### Risk 4: Browser Compatibility
**Risk:** Shadow DOM for preview doesn't work in older browsers
**Impact:** Low - Most users on modern browsers
**Mitigation:**
- Test in Chrome, Firefox, Safari, Edge
- Fallback to iframe without shadow DOM if unsupported
- Document browser requirements

### Risk 5: Component Abstraction Over-Engineering
**Risk:** Over-abstracting components makes them hard to use
**Impact:** Medium - Defeats purpose of DRY
**Mitigation:**
- Start with simple abstractions
- Refactor based on actual duplication patterns
- Get developer feedback on component APIs
- Prioritize readability over maximum reuse

---

## 8. TIMELINE & RESOURCES

### Timeline
- **Phase 1 (Foundation):** Week 1 - 40 hours
- **Phase 2 (Component Library):** Week 2 - 40 hours
- **Phase 3 (New Templates):** Week 3 - 40 hours
- **Phase 4 (Enhanced AI):** Week 4 - 40 hours
- **Phase 5 (Web UI):** Week 5 - 40 hours
- **Phase 6 (Extensibility):** Week 6 - 30 hours

**Total Estimated Effort:** 230 hours (~6 weeks for 1 full-time developer)

### Resources Required
- 1 Full-stack Developer (TypeScript, React, Next.js)
- Anthropic API access ($50/month estimated)
- Optional: OpenAI API access ($30/month estimated)
- CI/CD platform (GitHub Actions - free tier sufficient)
- Design review (internal stakeholder, 2-3 hours)

### Dependencies
- Anthropic API availability
- No external design dependencies (use Tailwind)
- No infrastructure dependencies (local development)

---

## 9. APPENDIX

### A. Related Documents
- `README.md` - Project overview and quick start
- `SPECIFICATION.md` - Current production specification (constitutional)
- `USAGE.md` - User documentation
- `PROJECT-OVERVIEW.md` - Technical architecture

### B. References
- [Pragmatic Programmer Book](https://pragprog.com/titles/tpp20/)
- [Spec-Kit on GitHub](https://github.com/github/spec-kit)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Testing Documentation](https://nextjs.org/docs/testing)
- [Vitest Documentation](https://vitest.dev/)

### C. Glossary
- **DRY**: Don't Repeat Yourself - principle of reducing repetition
- **TDD**: Test-Driven Development - write tests before implementation
- **E2E**: End-to-End testing - full user flow testing
- **A11y**: Accessibility (numeronym for "accessibility")
- **WCAG**: Web Content Accessibility Guidelines
- **SUS**: System Usability Scale - standardized questionnaire for usability

### D. Change Log
- 2025-11-12: Initial specification created (v2.0)

---

**Specification Status:** ✅ Ready for Review
**Next Steps:** Review with team → Approval → Begin Phase 1 Implementation
