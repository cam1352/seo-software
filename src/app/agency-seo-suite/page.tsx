"use client";

import Link from "next/link";
import {
  Layers,
  Users,
  CheckCircle2,
  ArrowRight,
  Shield,
  FileSpreadsheet,
  Globe,
  Settings,
  Sparkles,
  Award,
  Zap,
} from "lucide-react";

export default function AgencySeoSuitePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Software Suite for Agencies & Managers",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud-based",
    "url": "https://seosoftware.io/agency-seo-suite",
    "description": "Unified all-in-one SEO software suite designed for SEO managers and agencies to monitor multiple client domains, automate technical crawls, and track search visibility.",
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          The Unified SEO Software Suite
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          SEO Software Suite for <span className="text-blue-600">Managers & Agencies</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Consolidate technical auditing, keyword research, competitor gap analysis, and IndexNow search engine indexing into a single, unified $99/mo command center.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs sm:text-sm hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all"
          >
            Start Agency Suite ($99/mo)
          </Link>
          <Link
            href="/audit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            Run Client Domain Audit
          </Link>
        </div>
      </div>

      {/* 4 Unified Pillars of the Suite */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">1. Real-Time Technical Audit Studio</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Instantly crawl any client or competitor domain. Our 25-point crawler detects broken 404 links, redirect loops, missing canonicals, duplicate H1s, uncompressed images, and Schema markup flaws.
          </p>
          <Link href="/audit" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Explore Audit Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">2. Keyword Magic & Intent Discovery</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Extract commercial and transactional search terms with live Google Autocomplete metrics. Filter by difficulty, search volume, and query intent to plan content calendars that rank.
          </p>
          <Link href="/keywords" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Explore Keyword Magic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">3. GEO & Generative AI Search Tracking</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Prepare clients for the future of search. Track brand citations and source link presence inside OpenAI ChatGPT Search, Perplexity AI, and Google AI Overviews.
          </p>
          <Link href="/geo" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Explore GEO Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">4. Instant Search Indexing Engine</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            One-click IndexNow submission immediately alerts Bing and Yandex to index client landing pages in minutes rather than waiting weeks for standard spider discovery.
          </p>
          <Link href="/backlinks" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Explore Indexing Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Agency ROI & Pricing Comparison */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-2xl font-black">Eliminate Agency Software Creep</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Stop paying $139.95/mo for Semrush + $99/mo for Screaming Frog + $45 per seat. SEO Software delivers your entire agency toolkit for a flat $99/mo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <div className="text-slate-400 font-semibold mb-1">Traditional Cost</div>
            <div className="text-xl font-bold text-rose-400">$3,200+ / yr</div>
            <p className="text-[11px] text-slate-400 mt-1">Fragmented tools with strict credit limits.</p>
          </div>
          <div className="p-4 rounded-xl bg-blue-600/30 border border-blue-400/30">
            <div className="text-blue-300 font-semibold mb-1">SEO Software Suite</div>
            <div className="text-xl font-bold text-white">$99 / mo</div>
            <p className="text-[11px] text-blue-200 mt-1">Flat pricing with full platform access.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 border border-white/10">
            <div className="text-slate-400 font-semibold mb-1">Annual Savings</div>
            <div className="text-xl font-bold text-emerald-400">$2,000+ Saved</div>
            <p className="text-[11px] text-slate-400 mt-1">Reinvest savings into client acquisition.</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-md"
          >
            Switch to SEO Software Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
