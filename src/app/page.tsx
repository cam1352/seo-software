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
      <div className="relative rounded-2xl bg-gradient-to-r from-[#171C27] via-[#1B2232] to-[#141824] p-8 border border-[#2B3447] overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#FF642D]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF642D]/10 border border-[#FF642D]/20 text-[#FF642D] text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            100% Free & Open-Source Semrush Suite
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Next-Gen SEO Intelligence, <span className="text-[#FF642D]">GEO Tracking</span> & Automated Backlinks
          </h1>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Perform real-time technical site audits, discover high-intent keywords, track Generative Engine citations across AI models, and dispatch instant IndexNow backlink submissions.
          </p>

          {/* Quick Launch Audit Input */}
          <form onSubmit={handleQuickAudit} className="mt-6 flex items-center gap-2 max-w-lg">
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Enter any domain or URL to audit (e.g. github.com)..."
              className="flex-1 bg-[#0F131C] text-sm text-gray-100 placeholder-gray-500 px-4 py-3 rounded-xl border border-[#2F384C] focus:outline-none focus:border-[#FF642D] focus:ring-1 focus:ring-[#FF642D]"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#FF642D] hover:bg-[#E55724] text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#FF642D]/25 transition-all"
            >
              Audit URL
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Feature Navigation Cards Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#FF642D]" />
          Core SEO Workflows
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Domain Overview */}
          <Link
            href="/domain"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-[#FF642D]/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#FF642D] transition-colors">
                Domain Overview
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Estimate organic traffic, authority score, keyword distribution, and monitor organic competitors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-[#FF642D]">
              <span>Explore Domain Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Keyword Magic Tool */}
          <Link
            href="/keywords"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-[#FF642D]/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#FF642D] transition-colors">
                Keyword Magic Tool
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Live Google Suggest scraper, search volume estimation, Keyword Difficulty (KD%), and intent badges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-[#FF642D]">
              <span>Discover Keywords</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Technical Site Audit */}
          <Link
            href="/audit"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-[#FF642D]/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#FF642D] transition-colors">
                Technical Site Audit
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                25+ checkpoint crawler inspecting status codes, title/meta tags, canonicals, images, and schema JSON-LD.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-[#FF642D]">
              <span>Run Deep Crawl</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: GEO & AI Visibility */}
          <Link
            href="/geo"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-purple-500/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base group-hover:text-purple-400 transition-colors">
                  GEO & AI Visibility
                </h3>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">New</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Track Generative Engine citations (ChatGPT, Perplexity, Google AI Overviews) and multi-country geographic SERP ranks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-purple-400">
              <span>Track AI & Geo Citations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Auto Backlink Submission */}
          <Link
            href="/backlinks"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-emerald-500/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Link2 className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                  Auto Backlink Hub
                </h3>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Auto</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Instant IndexNow engine dispatch, Ping-o-Matic syndication, High-DA directories, and live backlink verification.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span>Automate Submissions</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: SEO Writing Assistant */}
          <Link
            href="/content"
            className="group p-6 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-[#FF642D]/50 hover:bg-[#181D2C] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base group-hover:text-[#FF642D] transition-colors">
                SEO Writing Assistant
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Live content editor measuring Flesch-Kincaid readability, keyword density, and actionable on-page recommendations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#232B3B] flex items-center justify-between text-xs font-semibold text-rose-400 group-hover:text-[#FF642D]">
              <span>Optimize Content</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Highlights & Competitive Comparison */}
      <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B]">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FF642D]" />
          Why ApexSEO is Better than Semrush & OpenSEO
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
          <div className="p-3.5 rounded-lg bg-[#0E121A] border border-[#222938]">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero Cost & No Paywalls
            </div>
            No \$139+/mo Semrush subscription, and no mandatory DataForSEO account deposit like base OpenSEO. Runs fully standalone on your machine.
          </div>
          <div className="p-3.5 rounded-lg bg-[#0E121A] border border-[#222938]">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5 text-purple-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Native Dual GEO Engine
            </div>
            Track Generative Engine citations in ChatGPT, Perplexity, and Google AI Overviews, alongside multi-country geographic rank tracking.
          </div>
          <div className="p-3.5 rounded-lg bg-[#0E121A] border border-[#222938]">
            <div className="font-semibold text-white mb-1 flex items-center gap-1.5 text-[#FF642D]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Automated Backlink Indexing
            </div>
            Submits your URLs directly to IndexNow and webmaster ping protocols for lightning-fast indexing, with automated live link verification.
          </div>
        </div>
      </div>
    </div>
  );
}
