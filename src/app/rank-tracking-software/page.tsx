"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Globe,
  BarChart3,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Layers,
} from "lucide-react";

export default function RankTrackingSoftwarePage() {
  const [activeKeyword, setActiveKeyword] = useState("cloud seo software");

  const sampleKeywords = [
    { keyword: "cloud seo software", rank: 6, change: "+3", volume: "1,900/mo", intent: "Commercial" },
    { keyword: "seo software manager", rank: 18, change: "+5", volume: "2,400/mo", intent: "Commercial" },
    { keyword: "seo tracking software", rank: 19, change: "+4", volume: "3,600/mo", intent: "Transactional" },
    { keyword: "seo software suite", rank: 24, change: "+2", volume: "1,200/mo", intent: "Informational" },
    { keyword: "seo tracker software", rank: 29, change: "+8", volume: "4,100/mo", intent: "Transactional" },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Tracking Software & Rank Tracker",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud-based",
    "url": "https://seosoftware.io/rank-tracking-software",
    "description": "Daily keyword rank tracking software across Google Desktop, Google Mobile, and Generative Engine AI citations (ChatGPT, Perplexity) with multi-location coverage.",
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
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          Accurate Daily Keyword & AI Visibility Tracker
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          SEO Tracking Software: <span className="text-blue-600">Daily Rankings</span> & AI Citations
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Monitor your exact search engine positions across Google Desktop, Mobile, and next-gen AI search engines like ChatGPT and Perplexity. Never lose track of keyword volatility.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/keywords"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Launch Keyword Magic Tool</span>
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            <span>Start Tracking for $99/mo</span>
          </Link>
        </div>
      </div>

      {/* Interactive Rank Tracker Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Live Rank Tracking Engine Preview
            </h2>
            <p className="text-xs text-slate-500">Real-time rank updates across high-intent search queries.</p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Daily Automatic Refresh Active
          </span>
        </div>

        {/* Keywords Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Tracked Search Query</th>
                <th className="py-3 px-4">Google Rank</th>
                <th className="py-3 px-4">7-Day Change</th>
                <th className="py-3 px-4">Est. Search Volume</th>
                <th className="py-3 px-4">Search Intent</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sampleKeywords.map((item) => (
                <tr key={item.keyword} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.keyword}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-sm text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      #{item.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <ChevronUp className="w-3.5 h-3.5" />
                      {item.change}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{item.volume}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                      {item.intent}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Link
                      href="/keywords"
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      View SERP
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Dual SERP & AI Visibility</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Standard SEO trackers only watch Google. SEO Software tracks traditional 10-blue-link rankings plus Generative Engine citations across ChatGPT, Perplexity, and Gemini.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">40+ Multi-Location Cities</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Simulate exact local SERP results from New York, Los Angeles, Chicago, London, Sydney, Toronto, Vancouver, and 30+ other major business hubs with zero IP spoofing required.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Flat $99/mo (No Credit Caps)</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Unlike Ahrefs where clicking a row burns 1 of your 500 monthly credits, SEO Software offers predictable flat-rate pricing with full access to audit tools and writing assistants.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-black">Start Tracking Your High-Impact Keywords Today</h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto">
          Capture #1 search rankings and identify ranking drops before they impact your organic traffic.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
        >
          Get SEO Tracking Software ($99/mo)
        </Link>
      </div>
    </div>
  );
}
