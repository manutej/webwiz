# WebWiz Quick Start

Get your first landing page up in 5 minutes!

---

## Step 1: Install Dependencies

```bash
npm install
```

---

## Step 2: Set Up API Key

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and add your Claude API key:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your API key from: https://console.anthropic.com/

---

## Step 3: Choose Your Method

### Option A: Web Interface (Easiest)

```bash
npm run dev
```

Then open http://localhost:3000 and describe your business!

### Option B: CLI (Fastest)

```bash
npm run cli create
```

Follow the interactive prompts.

---

## Step 4: Run Your Site

```bash
# Navigate to your generated site
cd generated/your-business-name

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 to see your landing page!

---

## Step 5: Deploy (Optional)

### Vercel (Recommended)

```bash
npx vercel
```

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=out
```

### Export Files

```bash
npm run build
# Upload the ./out folder to any static host
```

---

## Example

Try this description:

```
TaskMaster - A simple task management app for busy professionals.
Features include smart task prioritization, deadline tracking,
and team collaboration. Perfect for freelancers and small teams.
Modern, clean design. Free for individuals, $5/month for teams.
```

---

## Need Help?

- Full documentation: See `README.md`
- Usage guide: See `USAGE.md`
- Examples: See `examples/` directory

---

**That's it! You're ready to create landing pages! 🚀**
