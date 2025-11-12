'use client';

import { useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate landing page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🪄 WebWiz
          </h1>
          <p className="text-sm text-gray-600">AI-Powered Landing Page Generator</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Describe Your Business,
            <br />
            Get a Website
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Simply describe your business in natural language. Our AI will generate a beautiful,
            modern landing page ready to deploy.
          </p>

          {/* Input Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: A modern SaaS platform that helps teams collaborate on design projects with real-time feedback and version control. Perfect for creative agencies and design teams."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none resize-none text-gray-700"
            />

            <button
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {loading ? '✨ Generating...' : '🚀 Generate Landing Page'}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-left">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                ✅ Your Landing Page is Ready!
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Business Name</span>
                  <p className="text-lg font-semibold text-gray-900">{result.spec?.businessName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tagline</span>
                  <p className="text-gray-700">{result.spec?.tagline}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Template</span>
                  <p className="text-gray-700 capitalize">{result.spec?.template}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Next Steps:</h4>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li>1. Download the generated files</li>
                  <li>2. Run <code className="bg-gray-200 px-2 py-1 rounded">npm install</code></li>
                  <li>3. Run <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></li>
                  <li>4. Deploy to Vercel or Netlify</li>
                </ol>
              </div>

              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                Download Project Files
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why WebWiz?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">AI-Powered</h4>
              <p className="text-gray-600">
                Uses Claude AI to understand your business and generate compelling copy and design
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Lightning Fast</h4>
              <p className="text-gray-600">
                Go from idea to deployed website in minutes, not weeks
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-indigo-50">
              <div className="text-4xl mb-4">🎨</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Modern Design</h4>
              <p className="text-gray-600">
                Beautiful, responsive templates built with Next.js and Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Built with Next.js, Tailwind CSS, and Claude AI
          </p>
        </div>
      </footer>
    </div>
  );
}
