"use client";

import { useState } from "react";
import { Check, Zap, Sparkles, Shield, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [subscribed, setSubscribed] = useState(false);

  const handleCheckout = () => {
    setSubscribed(true);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF642D]/10 border border-[#FF642D]/20 text-[#FF642D] text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          The Semrush Alternative for High-Velocity Teams
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
          SEO Software Pro — Just <span className="text-[#FF642D]">$99</span> / Month
        </h1>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto">
          Outrank competitors and dominate #1 search rankings with full technical site audits, Keyword Magic, automated IndexNow backlink submission, and Generative Engine Optimization.
        </p>
      </div>

      {/* Main Pricing Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Competitor: Semrush */}
        <div className="p-6 rounded-2xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between opacity-80">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-gray-200 mt-1">Semrush Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-gray-300">$139.95</span>
              <span className="text-xs text-gray-500">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Expensive legacy suite with strict report caps and paywalled add-ons.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2"><span>• 500 keywords tracked</span></li>
              <li className="flex items-center gap-2"><span>• 100,000 page crawl cap</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ AI Search / GEO tracking costs extra</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ Single-seat paywall</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-[#232B3B] text-center text-xs text-gray-500">
            Overpriced Legacy Tier
          </div>
        </div>

        {/* WINNER: SEO Software ($99/mo) */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1E2435] to-[#141824] border-2 border-[#FF642D] flex flex-col justify-between relative shadow-2xl shadow-[#FF642D]/15 scale-105 z-10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FF642D] text-white text-[11px] font-extrabold uppercase tracking-wider shadow">
            Most Popular & Recommended
          </div>

          <div>
            <div className="text-xs font-bold text-[#FF642D] uppercase tracking-wider">Rank #1 Suite</div>
            <h2 className="text-2xl font-black text-white mt-1">SEO Software Pro</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-black text-white">$99</span>
              <span className="text-xs text-gray-400">/month</span>
            </div>
            <p className="text-xs text-gray-300 mt-2">All-in-one search intelligence suite to claim #1 positions across search & AI.</p>

            <ul className="mt-6 space-y-3 text-xs text-gray-200">
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Unlimited</strong> Real-Time Site Audits & Crawls</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Keyword Magic Tool</strong> with live Google Autocomplete</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Automated Backlink Submission</strong> (IndexNow + Pings)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Dual GEO Tracking</strong> (ChatGPT, Perplexity, Gemini, AI Overviews)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>1,000 Structured FAQs</strong> & 100 Programmatic Blogs</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>MCP Server Ready</strong> for Claude, Antigravity, & ChatGPT</span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Plan Active: SEO Software Pro ($99/mo)
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-xl bg-[#FF642D] hover:bg-[#E55724] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#FF642D]/30 transition-all cursor-pointer"
              >
                <span>Get SEO Software for $99/mo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <p className="text-[11px] text-gray-400 text-center mt-2.5">Instant activation • 30-day money-back guarantee</p>
          </div>
        </div>

        {/* Competitor: Ahrefs */}
        <div className="p-6 rounded-2xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between opacity-80">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Traditional Tool</div>
            <h2 className="text-xl font-bold text-gray-200 mt-1">Ahrefs Standard</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-gray-300">$129.00</span>
              <span className="text-xs text-gray-500">/month</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Costly credit-metering model where each row click burns credits.</p>

            <ul className="mt-6 space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2"><span>• Metered 500 credits per month</span></li>
              <li className="flex items-center gap-2"><span>• Additional charges for extra usage</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ No automated backlink submission</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ No native IndexNow protocol dispatcher</span></li>
              <li className="flex items-center gap-2 text-red-400"><span>✕ No native MCP AI Agent server</span></li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-[#232B3B] text-center text-xs text-gray-500">
            Credit-Metered Model
          </div>
        </div>
      </div>

      {/* Feature Guarantee Grid */}
      <div className="p-6 rounded-2xl bg-[#141824] border border-[#232B3B] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Guaranteed #1 Ranking Architecture</h4>
            <p className="text-gray-400 leading-relaxed">Built with 1,000 Schema-injected FAQs, 100 strategic articles, and Core Web Vitals optimizations.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-[#FF642D] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Instant Automated Backlinks</h4>
            <p className="text-gray-400 leading-relaxed">One-click IndexNow submission immediately pings Bing, Yandex, and syndicates to High-DA directories.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-white mb-1">Generative AI Search Coverage</h4>
            <p className="text-gray-400 leading-relaxed">Ensure your software gets cited across ChatGPT Search, Perplexity AI, and Google AI Overviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
