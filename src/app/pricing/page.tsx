"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  const [subscribed, setSubscribed] = useState(false);

  const handleCheckout = () => {
    setSubscribed(true);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          The Semrush Alternative for High-Velocity Teams
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
          SEO Software Pro — Just <span className="text-blue-600">$99</span> / Month
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Outrank competitors and dominate #1 search rankings with full technical site audits, Keyword Magic, automated IndexNow backlink submission, and Generative Engine Optimization.
        </p>
      </div>

      {/* Main Pricing Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Competitor: Semrush */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Semrush Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800">$139.95</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Expensive legacy suite with strict report caps and paywalled add-ons.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><span>• 500 keywords tracked</span></li>
              <li className="flex items-center gap-2"><span>• 100,000 page crawl cap</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ AI Search / GEO tracking costs extra</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ Single-seat paywall</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            Overpriced Legacy Tier
          </div>
        </div>

        {/* WINNER: SEO Software ($99/mo) */}
        <div className="p-8 rounded-2xl bg-white border-2 border-blue-600 flex flex-col justify-between relative shadow-xl shadow-blue-500/10 scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            Most Popular & Recommended
          </div>

          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Rank #1 Suite</div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">SEO Software Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-blue-600">$99</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">All-in-one search intelligence suite to claim #1 positions across search & AI engines.</p>

            <ul className="mt-6 space-y-3 text-xs text-slate-700">
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Unlimited</strong> Real-Time Site Audits & Crawls</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Keyword Magic Tool</strong> with live Google Autocomplete</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Automated Backlink Submission</strong> (IndexNow + Pings)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Dual GEO Tracking</strong> (ChatGPT, Perplexity, Gemini, AI Overviews)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>1,000 Structured FAQs</strong> & 100 Programmatic Blogs</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>MCP Server Ready</strong> for Claude, Antigravity, & ChatGPT</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Plan Active: SEO Software Pro ($99/mo)
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>Get SEO Software for $99/mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <p className="text-[11px] text-slate-400 text-center mt-2.5">Instant activation • 30-day money-back guarantee</p>
          </div>
        </div>

        {/* Competitor: Ahrefs */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-slate-800 mt-1">Ahrefs Standard</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-800">$129.00</span>
              <span className="text-xs text-slate-500">/month</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Costly credit-metering model where each row click burns credits.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2"><span>• Metered 500 credits per month</span></li>
              <li className="flex items-center gap-2"><span>• Additional charges for extra usage</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No native IndexNow protocol dispatcher</span></li>
              <li className="flex items-center gap-2 text-rose-500"><span>✕ No native MCP AI Agent server</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
            Credit-Metered Model
          </div>
        </div>
      </div>

      {/* Feature Guarantee Grid */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 shadow-sm">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Guaranteed #1 Ranking Architecture</h4>
            <p className="text-slate-500 leading-relaxed">Built with 1,000 Schema-injected FAQs, 100 strategic articles, and Core Web Vitals optimizations.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Instant Automated Backlinks</h4>
            <p className="text-slate-500 leading-relaxed">One-click IndexNow submission immediately pings Bing, Yandex, and syndicates to High-DA directories.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Generative AI Search Coverage</h4>
            <p className="text-slate-500 leading-relaxed">Ensure your software gets cited across ChatGPT Search, Perplexity AI, and Google AI Overviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
