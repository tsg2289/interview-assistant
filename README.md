# Interview Assistant 🚀

A modern, AI-powered interview preparation application built with Next.js 15, React 19, and OpenAI. Features glassmorphic design inspired by Apple Glass aesthetics.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔍 AI-Powered Firm Research
- Enter a company name and get comprehensive research powered by GPT-4
- Discover key executives with LinkedIn profiles
- Find articles and publications written by team members
- Get recent company news and developments
- Export research as Markdown or open in new tab

### ✅ Strategic Interview Questions
- **39 carefully curated questions** organized into 9 categories:
  - Company Culture & Environment
  - Technology & Systems
  - Role & Responsibilities
  - Work Schedule & Expectations
  - Turnover & Retention
  - Strategic & Leadership Questions
  - Bias & Interview Process
  - Future & Change
  - Personal & Mentorship

- **Interactive Features:**
  - Check off questions as you ask them
  - Add notes for each question
  - Track progress with visual progress bar
  - Filter by priority (Must Ask, Important, Optional)
  - Filter by status (Completed, Remaining)
  - Search functionality
  - Export your notes as JSON
  - Local storage persistence

### 🎨 Glassmorphic Design
- Beautiful frosted glass effect
- Smooth animations and transitions
- Dark mode support
- Fully responsive (mobile, tablet, desktop)
- Apple Glass inspired aesthetics

### 🔒 SOC 2 Security
- HTTPS-only data transmission
- Secure API key management
- Rate limiting (5 requests/minute)
- Input sanitization and validation
- Security headers configured
- No server-side data storage without consent
- See [SECURITY.md](./SECURITY.md) for details

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or download this project**
   ```bash
   cd interview-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   > ⚠️ **Important**: Never commit your `.env.local` file! It's already in `.gitignore`.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
interview-assistant/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── research/             # OpenAI research endpoint
│   ├── preparation/              # Firm research page
│   ├── questions/                # Interview questions page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles + glassmorphism
├── components/                   # React components
│   ├── ChecklistItem.tsx         # Individual question component
│   ├── GlassCard.tsx             # Glassmorphic card wrapper
│   └── ProgressBar.tsx           # Progress tracking component
├── hooks/                        # Custom React hooks
│   ├── useChecklist.ts           # Checklist state management
│   └── useLocalStorage.ts        # Local storage hook
├── lib/                          # Utilities and data
│   └── questions.ts              # Interview questions database
├── types/                        # TypeScript definitions
│   └── interview.ts              # Type definitions
├── public/                       # Static assets
├── vercel.json                   # Vercel configuration
├── SECURITY.md                   # Security documentation
└── README.md                     # This file
```

## 🎯 Usage Guide

### Firm Research

1. Navigate to **"Firm Research"** from the home page
2. Enter the company/firm name
3. Click **"Research Firm"**
4. Wait 10-30 seconds for AI to generate comprehensive research
5. Review the results including:
   - Company overview
   - Key people with LinkedIn links
   - Articles and publications
   - Culture insights
   - Technology stack
   - Interview tips
6. Export or open in a new tab for printing

### Interview Questions

1. Navigate to **"Interview Questions"** from the home page
2. Browse questions organized by category
3. Use filters to focus on:
   - Must Ask questions
   - Important questions
   - Remaining questions
4. Click on a question to expand and add notes
5. Check off questions as you ask them
6. Track your progress with the progress bar
7. Export your notes for later review

### Tips for Best Results

- **Before the Interview**: Use firm research 1-2 days before to prepare
- **During Preparation**: Review "Must Ask" questions first
- **During Interview**: Have the questions page open on your device
- **After Interview**: Export your notes for follow-up reference

## 🌐 Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `OPENAI_API_KEY` = your_api_key
   - Add it to Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add your `OPENAI_API_KEY` when asked.

### Post-Deployment

- Your app will be available at: `https://your-app.vercel.app`
- Automatic deployments on every push to main branch
- Preview deployments for pull requests

## 🔧 Configuration

### OpenAI Settings

Edit `app/api/research/route.ts` to customize:

```typescript
model: 'gpt-4-turbo-preview',  // Change model
temperature: 0.7,               // Adjust creativity
max_tokens: 2500,               // Adjust response length
```

### Rate Limiting

Edit `app/api/research/route.ts`:

```typescript
const limit = 5;        // Requests per window
const window = 60000;   // Window in milliseconds
```

### Questions

Edit `lib/questions.ts` to:
- Add new questions
- Modify existing questions
- Change categories
- Adjust priorities

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **AI**: OpenAI GPT-4 Turbo
- **Icons**: Lucide React
- **Markdown**: React Markdown
- **Deployment**: Vercel

## 📊 Cost Estimates

### OpenAI API Costs
- **GPT-4 Turbo**: ~$0.01-0.03 per research request
- **Monthly estimate**: $5-50 depending on usage
- **Recommendation**: Set up billing alerts in OpenAI dashboard

### Vercel Hosting
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial use
- Includes unlimited bandwidth and serverless functions

## 🔐 Security & Privacy

- ✅ No user data stored on servers
- ✅ API keys secured server-side
- ✅ Rate limiting prevents abuse
- ✅ HTTPS-only
- ✅ Security headers configured
- ✅ Input sanitization
- ✅ SOC 2 aligned practices

See [SECURITY.md](./SECURITY.md) for detailed security information.

## 🐛 Troubleshooting

### "Invalid OpenAI API key" error
- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify the API key is valid at [platform.openai.com](https://platform.openai.com)
- Restart the development server after adding environment variables

### "Rate limit exceeded" error
- Wait 1 minute before trying again
- For development, you can adjust rate limits in `app/api/research/route.ts`

### Checklist not saving
- Ensure local storage is enabled in your browser
- Check browser console for errors
- Try clearing site data and refreshing

### Styling issues
- Clear browser cache
- Ensure all dependencies are installed: `npm install`
- Check that Tailwind CSS is properly configured

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- OpenAI for GPT-4 API
- Vercel for hosting platform
- Next.js team for the amazing framework
- Lucide for beautiful icons

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Check [SECURITY.md](./SECURITY.md) for security concerns
- Review troubleshooting section above

---

**Built with ❤️ for better interview preparation**
