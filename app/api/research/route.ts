import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting (simple in-memory store - for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 5) { // 5 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { firmName } = body;

    if (!firmName || typeof firmName !== 'string') {
      return NextResponse.json(
        { error: 'Firm name is required' },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedFirmName = firmName.trim().slice(0, 200);

    const prompt = `You are an interview preparation assistant. Research and provide comprehensive information about "${sanitizedFirmName}".

Please provide the following in a well-structured format:

1. **Company Overview** (2-3 paragraphs): 
   - Company mission and description
   - Industry and market position
   - Recent news and developments (last 6-12 months)

2. **Key People** (list format):
   - Find key executives, partners, or team members
   - For each person provide:
     * Their name and title
     * LinkedIn profile URL (if publicly available)
     * Articles, blog posts, or publications they've written with URLs
     * Any relevant podcast appearances, interviews, or media mentions
     * Twitter/X or other professional social media profiles

3. **Company Culture & Values**:
   - What the company emphasizes in hiring
   - Work environment and culture insights
   - Employee reviews or testimonials (if available)

4. **Technology Stack** (especially for legal/professional services):
   - Case management systems
   - Billing systems
   - Document management tools
   - Communication platforms
   - Any mentioned tech stack or tools

5. **Interview Preparation Tips**:
   - Specific tips for interviewing at this company
   - Common interview questions they might ask
   - What they value in candidates

6. **Important Links**:
   - Company website
   - Careers page
   - Recent press releases or news
   - Glassdoor or similar review sites
   - LinkedIn company page

Format the response in clean markdown with clickable links. Use bullet points and headers for easy reading.
Focus ONLY on publicly available information. If certain information is not available, clearly state that.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful interview preparation assistant that provides accurate, well-researched information about companies to help candidates prepare for interviews. Always use publicly available information and provide proper citations with URLs when possible.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'Failed to generate research content' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      firmName: sanitizedFirmName,
      content,
      generatedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Error in research API:', error);
    
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key. Please check your configuration.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error?.message || 'An error occurred while researching the firm' },
      { status: 500 }
    );
  }
}

