'use client';

import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { Search, CheckSquare, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-12 fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-blue-500" />
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-powered preparation with firm research and strategic interview questions
          </p>
        </header>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Firm Research Card */}
          <Link href="/preparation" className="block group">
            <GlassCard className="h-full">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Firm Research</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  AI-powered research on companies, key people, recent news, and articles
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                  Start Research
                  <span>→</span>
                </span>
              </div>
            </GlassCard>
          </Link>

          {/* Ready Checklist Card */}
          <Link href="/ready-checklist" className="block group">
            <GlassCard className="h-full">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckSquare className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Ready Checklist</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive preparation checklist to ensure you&apos;re interview-ready
                </p>
                <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold group-hover:gap-3 transition-all">
                  Get Ready
                  <span>→</span>
                </span>
              </div>
            </GlassCard>
          </Link>

          {/* Practice Questions Card */}
          <Link href="/prep-questions" className="block group">
            <GlassCard className="h-full">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3">Practice Questions</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Practice answering common interview questions with timed sessions
                </p>
                <span className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold group-hover:gap-3 transition-all">
                  Start Practice
                  <span>→</span>
                </span>
              </div>
            </GlassCard>
          </Link>

          {/* Interview Questions Card */}
          <Link href="/questions" className="block group">
            <GlassCard className="h-full">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <CheckSquare className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Questions to Ask</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Strategic checklist of essential questions to ask your interviewer
                </p>
                <span className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all">
                  View Questions
                  <span>→</span>
                </span>
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Features Section */}
        <GlassCard className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Complete Interview Preparation</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2">AI Research</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive firm insights with LinkedIn profiles and articles
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">Ready Checklist</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive preparation checklist with 30+ tasks
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Practice Questions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Timed practice sessions with common interview questions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Questions to Ask</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                39 strategic questions organized by category
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Built with Next.js 15, React 19, and OpenAI • Glassmorphic Design</p>
        </footer>
      </div>
    </div>
  );
}
