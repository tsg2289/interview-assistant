'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/GlassCard';
import { ArrowLeft, Search, Loader2, ExternalLink, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function PreparationPage() {
  const [firmName, setFirmName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [research, setResearch] = useState<{
    firmName: string;
    content: string;
    generatedAt: string;
  } | null>(null);
  const [error, setError] = useState('');

  const handleResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firmName.trim()) {
      setError('Please enter a firm name');
      return;
    }

    setIsLoading(true);
    setError('');
    setResearch(null);

    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firmName: firmName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to research firm');
      }

      setResearch(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while researching the firm');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    if (!research) return;
    
    const blob = new Blob([research.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${research.firmName}-research.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewTab = () => {
    if (!research) return;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${research.firmName} - Research</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                max-width: 900px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
              }
              h1, h2, h3 { color: #2563eb; margin-top: 24px; }
              a { color: #2563eb; text-decoration: none; }
              a:hover { text-decoration: underline; }
              ul, ol { margin-left: 24px; }
              code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
              pre { background: #f3f4f6; padding: 16px; border-radius: 8px; overflow-x: auto; }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <h1>${research.firmName}</h1>
            <p><em>Generated: ${new Date(research.generatedAt).toLocaleString()}</em></p>
            <hr>
            ${research.content.split('\n').map(line => {
              if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
              if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
              if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
              if (line.startsWith('- ')) return `<ul><li>${line.slice(2)}</li></ul>`;
              if (line.includes('http')) {
                return `<p>${line.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')}</p>`;
              }
              return line ? `<p>${line}</p>` : '<br>';
            }).join('')}
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8 fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:gap-3 transition-all mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Firm Research</h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered research on companies and key people
          </p>
        </header>

        {/* Search Form */}
        <GlassCard className="mb-8">
          <form onSubmit={handleResearch} className="space-y-4 text-center">
            <div>
              <label htmlFor="firmName" className="block text-sm font-semibold mb-2">
                Company or Firm Name
              </label>
              <input
                id="firmName"
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="e.g., Goldman Sachs, McKinsey & Company, Google..."
                className="glass-input"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="glass-button w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Researching...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Research Firm
                </>
              )}
            </button>
          </form>
        </GlassCard>

        {/* Loading State */}
        {isLoading && (
          <GlassCard className="text-center py-12">
            <Loader2 className="animate-spin mx-auto mb-4 text-blue-500" size={48} />
            <p className="text-lg font-semibold mb-2">Researching {firmName}...</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This may take 10-30 seconds
            </p>
          </GlassCard>
        )}

        {/* Research Results */}
        {research && !isLoading && (
          <div className="space-y-6 fade-in">
            {/* Action Buttons */}
            <GlassCard>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleOpenInNewTab}
                  className="glass-button flex items-center gap-2"
                >
                  <ExternalLink size={18} />
                  Open in New Tab
                </button>
                <button
                  onClick={handleExport}
                  className="glass-button flex items-center gap-2"
                >
                  <Download size={18} />
                  Export as Markdown
                </button>
                <button
                  onClick={() => window.print()}
                  className="glass-button flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
              </div>
            </GlassCard>

            {/* Research Content */}
            <GlassCard>
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold">{research.firmName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Generated: {new Date(research.generatedAt).toLocaleString()}
                </p>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline" />
                    ),
                  }}
                >
                  {research.content}
                </ReactMarkdown>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}

