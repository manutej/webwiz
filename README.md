# 🪄 WebWiz

**AI-Powered Landing Page Generator** - Create beautiful, modern landing pages from natural language descriptions.

Turn your business idea into a professional website in minutes, not weeks. Simply describe your business in plain English, and WebWiz will generate a complete Next.js landing page with modern design, compelling copy, and deployment-ready code.

---

## ✨ Features

- 🤖 **AI-Powered Content Generation** - Uses Claude AI to understand your business and create compelling copy
- 🎨 **Beautiful Templates** - Modern, responsive designs built with Next.js 14 and Tailwind CSS
- ⚡ **Lightning Fast** - Go from idea to deployed website in minutes
- 🚀 **Multiple Deployment Options** - Deploy to Vercel, Netlify, or export static files
- 💻 **CLI & Web Interface** - Use the command line or web UI (perfect for non-technical users)
- 🎯 **SEO Optimized** - Automatically generates meta tags and structured data
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Claude API key from [Anthropic](https://console.anthropic.com/)

### Installation

```bash
# Clone or download this project
cd webwiz

# Install dependencies
npm install

# Set up your API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

---

## 📖 Usage

### Method 1: Web Interface (Recommended for Non-Technical Users)

```bash
# Start the web interface
npm run dev

# Open http://localhost:3000
# Describe your business and generate your landing page!
```

### Method 2: CLI (For Developers)

```bash
# Make CLI executable
npm run build:cli

# Create a landing page
npm run cli create

# Or pass description directly
npm run cli create -d "A modern SaaS platform for team collaboration"

# View available templates
npm run cli templates

# Enhance an existing specification
npm run cli enhance examples/example.json
```

---

## 🎨 Templates

WebWiz includes 4 beautiful templates:

1. **Minimal** - Clean, modern design with subtle gradients and smooth animations
2. **Bold** - High-contrast design with impactful typography and bold colors
3. **Elegant** - Sophisticated aesthetics with refined spacing and typography
4. **Creative** - Unique, artistic layouts for creative businesses

The AI automatically selects the best template based on your business description, or you can specify one in the specification file.

---

## 📝 How It Works

1. **Describe Your Business** - Write a natural language description of your business, product, or service
2. **AI Analysis** - Claude AI analyzes your description and extracts key information
3. **Specification Generation** - Creates a structured specification with copy, colors, and layout
4. **Site Generation** - Generates a complete Next.js project with your landing page
5. **Deploy** - Deploy to Vercel/Netlify or export static files

### Example Input

```
CloudSync Pro - A modern cloud storage solution that provides lightning-fast
file synchronization across all devices with military-grade security.
Perfect for teams who need secure, reliable collaboration tools.
Pricing starts at $5/month.
```

### What You Get

A complete Next.js project with:
- ✅ Responsive landing page
- ✅ Compelling copy and headlines
- ✅ Branded color scheme
- ✅ SEO optimization
- ✅ Ready to deploy

---

## 🎯 Examples

See `examples/` directory for:
- `example.json` - Complete specification example
- `example-description.txt` - Natural language input example

### Try the Example

```bash
npm run cli create -d "$(cat examples/example-description.txt)"
```

---

## 🚀 Deployment

After generating your landing page:

```bash
cd generated/your-project-name
npm install
```

### Option 1: Local Preview

```bash
npm run dev
# Visit http://localhost:3000
```

### Option 2: Deploy to Vercel

```bash
npx vercel
```

### Option 3: Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod --dir=out
```

### Option 4: Export Static Files

```bash
npm run build
# Static files will be in the ./out directory
# Upload to any static hosting service
```

---

## 🛠️ Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI**: Anthropic Claude API
- **CLI**: Commander.js, Inquirer, Ora, Chalk
- **Validation**: Zod

---

## 📂 Project Structure

```
webwiz/
├── src/
│   ├── app/              # Next.js web interface
│   │   ├── api/          # API routes
│   │   └── page.tsx      # Main web UI
│   ├── lib/              # Core libraries
│   │   ├── parser.ts     # AI-powered spec parser
│   │   ├── generator.ts  # Site generator
│   │   └── deploy.ts     # Deployment utilities
│   ├── templates/        # Landing page templates
│   │   ├── minimal.tsx
│   │   └── bold.tsx
│   ├── types/            # TypeScript types
│   └── cli.ts            # CLI interface
├── examples/             # Example specifications
├── generated/            # Generated sites (created automatically)
└── README.md
```

---

## 🎨 Customization

### Modify Templates

Edit templates in `src/templates/`:
- `minimal.tsx` - Minimal template
- `bold.tsx` - Bold template

### Customize AI Behavior

Edit `src/lib/parser.ts` to modify:
- Prompt engineering
- Content generation style
- Color scheme suggestions

### Add New Features

The specification schema is defined in `src/types/index.ts`. You can extend it to add:
- Additional sections (testimonials, pricing tables, etc.)
- Custom form fields
- More metadata options

---

## 🤝 Use Cases

Perfect for:
- 🚀 **Startups** - Quick landing pages for MVP validation
- 💼 **Agencies** - Rapid prototyping for client presentations
- 🎨 **Freelancers** - Portfolio and project showcases
- 📱 **Products** - Product launch pages
- 🎯 **Marketing** - Campaign landing pages
- 🏢 **Small Businesses** - Professional web presence without hiring developers

---

## 🔒 Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=your_api_key_here

# Optional (for deployment)
VERCEL_TOKEN=your_vercel_token
NETLIFY_TOKEN=your_netlify_token
```

---

## 📊 Specification Schema

WebWiz generates structured specifications with:

- **Business Info**: Name, tagline, description
- **Hero Section**: Headline, subheadline, call-to-action, optional image
- **Features**: 3-6 key features with titles, descriptions, and icons
- **About Section**: Optional about/story section
- **Contact**: Email, phone, address, social media links
- **Design**: Color scheme, font style, template choice
- **SEO**: Meta title, description, keywords

See `src/types/index.ts` for the complete schema.

---

## 🎓 Tips for Best Results

1. **Be Specific** - Include details about your business, target audience, and unique value proposition
2. **Mention Key Features** - List 3-6 main features or benefits
3. **Include Contact Info** - Add email, social media, etc.
4. **Describe Brand Personality** - Modern? Professional? Playful? This helps with design choices
5. **Add Pricing Info** - If relevant, mention pricing to be included

---

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY not set"
Make sure you've created a `.env` file with your API key:
```bash
cp .env.example .env
# Edit .env and add your key
```

### "Failed to parse specification"
The AI response wasn't valid JSON. Try:
- Simplifying your description
- Being more specific about what you want
- Checking your API key is valid

### Generated site won't start
Make sure you've installed dependencies:
```bash
cd generated/your-project
npm install
```

---

## 📄 License

MIT License - Feel free to use for personal and commercial projects!

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Anthropic Claude](https://anthropic.com/) - AI
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework

---

## 🚀 What's Next?

Planned features:
- [ ] More templates (elegant, creative)
- [ ] Additional sections (testimonials, pricing, FAQ)
- [ ] Image generation integration
- [ ] Custom domain setup automation
- [ ] Analytics integration
- [ ] A/B testing support
- [ ] Multi-page site generation

---

**Made with ❤️ and AI**

Get started now: `npm run dev` or `npm run cli create`
