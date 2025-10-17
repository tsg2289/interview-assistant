# 🚀 Quick Setup Guide

## Before You Start

You need an OpenAI API key to use the firm research feature.

### Get Your OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (you won't see it again!)
5. Add billing information (required for API access)

**Cost**: ~$0.01-0.03 per research request

---

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File

Create a file called `.env.local` in the project root:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

**⚠️ IMPORTANT**: 
- Never commit this file to GitHub
- Never share your API key
- It's already in `.gitignore` for safety

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Your Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

---

## Testing the App

### Test Firm Research
1. Click "Firm Research"
2. Enter: "Microsoft" or "Goldman Sachs"
3. Click "Research Firm"
4. Wait ~15 seconds
5. View the AI-generated research

### Test Questions Checklist
1. Click "Interview Questions"
2. Check off some questions
3. Add notes to a question
4. Filter by "Must Ask"
5. Check your progress bar

---

## Deploy to Vercel

### Method 1: Via GitHub (Recommended)

1. **Create GitHub repo and push code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Select your repository
   - Click "Deploy"

3. **Add API Key to Vercel**
   - In Vercel dashboard: Settings → Environment Variables
   - Add: `OPENAI_API_KEY` with your key
   - Select: Production, Preview, Development
   - Save

4. **Redeploy**
   - Go to Deployments
   - Click "..." → "Redeploy"

### Method 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

---

## Common Issues

### ❌ "Invalid OpenAI API key"
**Solution**: 
- Check `.env.local` exists in project root
- Verify key starts with `sk-`
- Restart dev server: `npm run dev`

### ❌ "Rate limit exceeded"
**Solution**: Wait 60 seconds between requests (default limit: 5/minute)

### ❌ App won't start
**Solution**:
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### ❌ Questions not saving
**Solution**: Enable local storage in browser settings

---

## Project Structure

```
interview-assistant/
├── app/
│   ├── api/research/     # OpenAI API endpoint
│   ├── preparation/      # Firm research page
│   ├── questions/        # Questions checklist page
│   └── page.tsx          # Home page
├── components/           # UI components
├── hooks/                # React hooks
├── lib/questions.ts      # All 39 interview questions
└── .env.local           # YOUR API KEY (create this!)
```

---

## Next Steps

1. ✅ Set up `.env.local` with your OpenAI API key
2. ✅ Run `npm run dev` and test locally
3. ✅ Try the firm research feature
4. ✅ Explore the questions checklist
5. ✅ Customize questions in `lib/questions.ts` if needed
6. ✅ Deploy to Vercel
7. ✅ Share with friends! 🎉

---

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 🔒 Check [SECURITY.md](./SECURITY.md) for security info
- 🐛 Open an issue on GitHub
- 💬 Check the troubleshooting section

**Happy interviewing! 🚀**

