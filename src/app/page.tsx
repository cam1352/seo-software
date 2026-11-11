"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  Search,
  Activity,
  Sparkles,
  Link2,
  FileText,
  GitCompare,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [quickUrl, setQuickUrl] = useState("");

  const handleQuickAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    router.push(`/audit?url=${encodeURIComponent(quickUrl.trim())}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 border border-blue-500/30 overflow-hidden shadow-lg shadow-blue-500/15 text-white">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            Rank #1 Search & AI Visibility Suite · $99/mo
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Next-Gen SEO Intelligence, <span className="text-blue-200">GEO Tracking</span> & Automated Backlinks
          </h1>
          <p className="mt-3 text-sm text-blue-100 leading-relaxed">
            Perform real-time technical site audits, discover high-intent keywords, track Generative Engine citations across AI models, and dispatch instant IndexNow backlink submissions.
          </p>

          {/* Quick Launch Audit Input */}
          <form onSubmit={handleQuickAudit} className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-lg">
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Enter any domain or URL to audit (e.g. github.com)..."
              className="flex-1 bg-white text-sm text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/20 transition-all shrink-0"
            >
              Audit URL
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Core SEO Workflows
          </h2>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            All Tools Included in $99/mo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Domain Overview */}
          <Link
            href="/domain"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Domain Overview
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Estimate organic traffic, authority score, keyword distribution, and monitor organic competitors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Explore Domain Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Keyword Magic Tool */}
          <Link
            href="/keywords"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Keyword Magic Tool
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Live Google Suggest scraper, search volume estimation, Keyword Difficulty (KD%), and intent badges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Discover Keywords</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Technical Site Audit */}
          <Link
            href="/audit"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Technical Site Audit
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                25+ checkpoint crawler inspecting status codes, title/meta tags, canonicals, images, and schema JSON-LD.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Run Deep Crawl</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: GEO & AI Visibility */}
          <Link
            href="/geo"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  GEO & AI Visibility
                </h3>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">New</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Track Generative Engine citations (ChatGPT, Perplexity, Google AI Overviews) and multi-country geographic SERP ranks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Track AI & Geo Citations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Auto Backlink Submission */}
          <Link
            href="/backlinks"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                <Link2 className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  Auto Backlink Hub
                </h3>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Auto</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Instant IndexNow engine dispatch, Ping-o-Matic syndication, High-DA directories, and live backlink verification.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Automate Submissions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: SEO Writing Assistant */}
          <Link
            href="/content"
            className="group p-6 rounded-xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all shadow-sm">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                SEO Writing Assistant
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Live content editor measuring Flesch-Kincaid readability, keyword density, and actionable on-page recommendations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Optimize Content</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Highlights & Competitive Comparison */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Why SEO Software Outperforms Semrush & Ahrefs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-blue-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Flat $99/mo Transparent Pricing
            </div>
            No expensive $139+/mo Semrush or $129+/mo Ahrefs add-on fees. All GEO citations, site audits, and backlink engines included under one plan.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-indigo-700">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Native Dual GEO Engine
            </div>
            Track Generative Engine citations across ChatGPT, Perplexity, and Google AI Overviews, alongside multi-country geographic rank tracking.
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-blue-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Automated Backlink Indexing
            </div>
            Submits your URLs directly to IndexNow and webmaster ping protocols for lightning-fast indexing, with automated live link verification.
          </div>
        </div>
      </div>
    </div>
  );
}
