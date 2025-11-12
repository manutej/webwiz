# WebWiz Usage Guide

Complete guide to using WebWiz effectively.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Web Interface Guide](#web-interface-guide)
3. [CLI Guide](#cli-guide)
4. [Writing Effective Descriptions](#writing-effective-descriptions)
5. [Customizing Generated Sites](#customizing-generated-sites)
6. [Deployment Guide](#deployment-guide)
7. [Advanced Usage](#advanced-usage)

---

## Getting Started

### Initial Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env

# 3. Add your Claude API key to .env
ANTHROPIC_API_KEY=your_key_here
```

### Choose Your Interface

- **Web Interface** - Best for non-technical users, visual interface
- **CLI** - Best for developers, scriptable, faster workflow

---

## Web Interface Guide

### Starting the Web Interface

```bash
npm run dev
```

Visit `http://localhost:3000`

### Using the Web Interface

1. **Enter Description**
   - Write or paste your business description
   - Include key features, target audience, pricing
   - More detail = better results

2. **Generate**
   - Click "Generate Landing Page"
   - AI analyzes your description (takes 10-30 seconds)
   - Preview generated specification

3. **Review**
   - Check business name, tagline, colors
   - Review features and copy
   - Verify template choice

4. **Download**
   - Download project files as ZIP
   - Extract and run locally
   - Deploy when ready

---

## CLI Guide

### Basic Commands

```bash
# Create a new landing page (interactive)
npm run cli create

# Create with description
npm run cli create -d "Your business description here"

# Specify output directory
npm run cli create -o ./my-sites

# List available templates
npm run cli templates

# Enhance existing spec
npm run cli enhance spec.json -o enhanced.json
```

### Interactive Mode

When you run `npm run cli create` without options:

1. **Enter Description** - Opens your default editor
2. **Additional Context** - Business type, target audience (optional)
3. **Review Spec** - Preview generated specification
4. **Confirm** - Proceed with generation
5. **Next Steps** - Instructions for running the site

### Command-Line Mode

```bash
# One-line generation
npm run cli create -d "A SaaS platform for project management aimed at remote teams. Features include real-time collaboration, task tracking, and team chat. Modern, professional design. Pricing starts at $10/month."

# Using a file
npm run cli create -d "$(cat my-description.txt)"

# Custom output
npm run cli create -d "..." -o ~/websites
```

---

## Writing Effective Descriptions

### Template

```
[Product/Service Name] - [One-line description]

[2-3 sentences about what you do and why]

Key features:
- Feature 1
- Feature 2
- Feature 3

Target audience: [Who is this for?]

Brand personality: [Modern/Professional/Playful/etc.]

Pricing: [If applicable]

Call to action: [What should visitors do?]
```

### Example: Good Description

```
TaskFlow - Modern Project Management for Remote Teams

TaskFlow helps distributed teams stay organized and productive with
real-time collaboration, intelligent task tracking, and integrated
team communication. Stop switching between tools.

Key features:
- Real-time collaborative workspace
- Smart task dependencies and automation
- Built-in video calls and chat
- Time tracking and reporting
- Integrations with Slack, GitHub, etc.

Target audience: Remote-first companies, distributed teams, project
managers who are tired of tool sprawl.

Brand personality: Modern, efficient, trustworthy. We value simplicity
and productivity.

Pricing: Free for teams up to 5, $10/user/month for unlimited.

Call to action: Start Free Trial
```

### Example: Minimal Description

Even short descriptions work:

```
A cloud storage platform with instant sync across devices,
military-grade encryption, and team collaboration features.
Built for modern teams who need fast, secure file sharing.
```

### Tips

✅ **DO**:
- Be specific about features and benefits
- Mention target audience
- Include pricing if relevant
- Describe brand personality
- Add contact information
- Specify desired call-to-action

❌ **DON'T**:
- Use only generic buzzwords
- Skip features/benefits
- Make it too technical
- Forget the purpose
- Leave out important details

---

## Customizing Generated Sites

### File Structure

```
generated/your-business-name/
├── src/
│   └── app/
│       ├── page.tsx      # Main landing page
│       ├── layout.tsx    # Site layout & metadata
│       └── globals.css   # Global styles
├── public/               # Static assets
├── package.json
├── next.config.mjs
└── README.md
```

### Common Customizations

#### Change Colors

Edit `src/app/globals.css`:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-accent: #your-color;
}
```

#### Modify Content

Edit `src/app/page.tsx` directly:

```tsx
<h1>Your New Headline</h1>
<p>Your new copy...</p>
```

#### Add Images

1. Place images in `public/` directory
2. Reference in your page:

```tsx
<img src="/your-image.jpg" alt="Description" />
```

#### Add More Sections

Copy existing section patterns from `page.tsx`:

```tsx
<section className="py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Your content */}
  </div>
</section>
```

---

## Deployment Guide

### Local Development

```bash
cd generated/your-project
npm install
npm run dev
```

Visit `http://localhost:3000`

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd generated/your-project
vercel

# Follow prompts to deploy
```

Or use the Vercel web interface:
1. Push to GitHub
2. Import in Vercel dashboard
3. Deploy automatically

### Deploy to Netlify

```bash
# Build first
npm run build

# Deploy
npx netlify deploy --prod --dir=out

# Or drag-and-drop the ./out folder in Netlify UI
```

### Export Static Files

```bash
npm run build

# Upload the ./out directory to:
# - AWS S3 + CloudFront
# - GitHub Pages
# - Any static hosting service
```

### Custom Domain

After deploying to Vercel/Netlify:

1. Go to project settings
2. Add custom domain
3. Update DNS records
4. SSL automatically configured

---

## Advanced Usage

### Programmatic Generation

```typescript
import { SpecificationParser } from './lib/parser';
import { SiteGenerator } from './lib/generator';

const parser = new SpecificationParser();
const generator = new SiteGenerator('./output');

// Generate from description
const spec = await parser.parse({
  description: "Your description",
  businessType: "SaaS",
  targetAudience: "Developers"
});

// Generate site
const projectPath = await generator.generate(spec);
console.log(`Site generated at: ${projectPath}`);
```

### Batch Generation

Generate multiple sites:

```bash
# Create a file with multiple descriptions
# descriptions.txt:
# SITE1: Description 1
# SITE2: Description 2

# Script to process
while IFS=: read -r name desc; do
  npm run cli create -d "$desc" -o "generated/$name"
done < descriptions.txt
```

### Custom Templates

Create your own template in `src/templates/`:

```typescript
// src/templates/mytemplate.tsx
import { LandingPageSpec } from '@/types';

export default function MyTemplate({ spec }: { spec: LandingPageSpec }) {
  return (
    <div>
      {/* Your custom template */}
    </div>
  );
}
```

Register in `src/templates/index.ts`:

```typescript
import MyTemplate from './mytemplate';

export const templates = {
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  mytemplate: MyTemplate,  // Add yours
};
```

### Spec Enhancement

Improve existing specifications:

```bash
# Generate base spec
npm run cli create -d "Basic description" --no-ai-enhance

# Save spec
# Edit spec.json manually

# Enhance with AI
npm run cli enhance spec.json -o final-spec.json

# Generate from enhanced spec
# (You'll need to add a generate-from-spec command)
```

---

## Examples by Industry

### SaaS Platform

```
TeamSync - Collaborative Workspace for Remote Teams

Real-time collaboration platform with video, chat, and project
management. Built for distributed teams.

Features: Video calls, task management, file sharing, time tracking
Target: Remote-first companies
Pricing: $15/user/month
```

### E-commerce

```
GreenGoods - Sustainable Products Marketplace

Online marketplace for eco-friendly products. Every purchase
plants a tree.

Features: Curated products, carbon tracking, subscription boxes
Target: Environmentally conscious consumers
Style: Natural, clean, modern
```

### Professional Services

```
LegalPro - Law Firm Specializing in Tech Startups

Expert legal counsel for startups. Fixed-fee packages, fast
turnaround, startup-friendly terms.

Services: Incorporation, contracts, IP, fundraising
Target: Tech founders and startups
Style: Professional, trustworthy, modern
```

---

## Troubleshooting

### Issue: AI generates wrong information

**Solution**: Be more specific in your description. Include exact details you want.

### Issue: Colors don't match brand

**Solution**: After generation, edit `globals.css` to use your brand colors.

### Issue: Template choice isn't right

**Solution**: Mention desired style in description ("modern and minimal" or "bold and impactful").

### Issue: Missing features in output

**Solution**: Explicitly list features in your description.

---

## Best Practices

1. **Start Simple** - Generate a basic site, then customize
2. **Iterate** - Generate multiple versions, pick the best
3. **Review Content** - Always review AI-generated copy for accuracy
4. **Test Responsive** - Check mobile, tablet, desktop
5. **Optimize Images** - Use compressed images for better performance
6. **Update SEO** - Review and improve meta tags before deploying

---

## Getting Help

- Check `README.md` for general overview
- Review `examples/` directory for inspiration
- Read source code in `src/` for implementation details

---

**Happy building! 🚀**
