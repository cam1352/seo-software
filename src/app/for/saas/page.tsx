"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Zap,
  TrendingUp,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Layers,
  Target,
  Bot
} from "lucide-react";

export default function ForSaasPage() {
  const [funnelStage, setFunnelStage] = useState<"bofu" | "mofu" | "tofu">("bofu");

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "B2B SaaS SEO Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/for/saas",
    "description": "High-velocity B2B SaaS SEO software. Capture bottom-of-funnel software buyers, track brand citations inside AI answer engines (ChatGPT, Perplexity, Google AI Overviews), and analyze competitor product gaps.",
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is B2B SaaS SEO different from standard website SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "B2B SaaS buyers search with high commercial intent through 'Alternative', 'VS', and 'Software For' keywords. Organic traffic must convert into free trials or demo bookings, requiring precise bottom-of-funnel keyword tracking and AI engine citation monitoring."
        }
      },
      {
        "@type": "Question",
        "name": "How does SEO Software track AI answer engines like ChatGPT and Perplexity?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Generative Engine Optimization (GEO) engine monitors when your SaaS brand is cited, recommended, or summarized by modern AI models, giving you visibility into the new AI-driven buyer journey."
        }
      },
      {
        "@type": "Question",
        "name": "Can we invite our entire growth and engineering team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all plans include unlimited team seats at no extra charge, allowing product managers, content writers, and engineers to collaborate without seat licenses."
        }
      }
    ]
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 sm:p-12 text-white border border-blue-900/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Product-Led SaaS Search Engine
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            B2B <span className="text-blue-400">SaaS SEO Software</span>: High-Velocity Growth Engine
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Capture high-intent software buyers searching for alternatives to legacy incumbents. Track brand citations in Google AI Overviews &amp; ChatGPT, discover competitor content gaps, and scale trial signups for flat $99/mo.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Start Growth Plan ($99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/geo"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore AI Search Tracker</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bottom-of-Funnel Conversion Tracking
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Citation (GEO/AEO) Monitoring
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Team Seats
            </span>
          </div>
        </div>
      </div>

      {/* SaaS Funnel Intent Diagnostics */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Target className="w-4 h-4" />
              SaaS Organic Acquisition Funnel
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Target High-Intent Buyers with Surgical Precision
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFunnelStage("bofu")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (funnelStage === "bofu" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              BOFU (High Conversion)
            </button>
            <button
              onClick={() => setFunnelStage("mofu")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (funnelStage === "mofu" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              MOFU (Category &amp; Tools)
            </button>
            <button
              onClick={() => setFunnelStage("tofu")}
              className={"px-3 py-1.5 text-xs font-bold rounded-lg transition-all " + (funnelStage === "tofu" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900")}
            >
              TOFU (Educational)
            </button>
          </div>
        </div>

        {funnelStage === "bofu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Avg. Conversion Rate: 4.8%
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Alternative &amp; Competitor Comparison Queries
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When buyers search "[Competitor] alternative" or "[Competitor A] vs [Competitor B]", their credit card is already on the table. Ranking #1 on these queries directly fuels trial signups and ARR.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800">Target Examples:</div>
                <div className="text-slate-600">&bull; "best semrush alternatives 2026"</div>
                <div className="text-slate-600">&bull; "airtable vs notion database"</div>
                <div className="text-slate-600">&bull; "intercom pricing alternative"</div>
              </div>
            </div>
            <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-200 space-y-4">
              <div className="text-xs font-bold text-blue-900 uppercase">SEO Software Advantage</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                We track SERP rank volatility, featured snippet takeovers, and AI citations specifically for your product comparison matrices.
              </p>
              <div className="text-2xl font-black text-blue-600">
                10x Pipeline Efficiency
              </div>
            </div>
          </div>
        )}

        {funnelStage === "mofu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                Avg. Conversion Rate: 1.8%
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Free Micro-Tools, Calculators &amp; Templates
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Product-led SEO engines use interactive utilities (like our IndexNow pinger) to generate editorial backlinks and capture prospective users before they enter buying cycles.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800">Target Examples:</div>
                <div className="text-slate-600">&bull; "free indexnow submission tool"</div>
                <div className="text-slate-600">&bull; "churn rate calculator excel"</div>
                <div className="text-slate-600">&bull; "saas pricing model template"</div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase">Product-Led SEO Playbook</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                SEO Software includes templates and APIs to launch no-login micro-tools on your subdomain to capture organic backlinks effortlessly.
              </p>
              <div className="text-2xl font-black text-slate-800">
                Natural Editorial Links
              </div>
            </div>
          </div>
        )}

        {funnelStage === "tofu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                Avg. Conversion Rate: 0.5%
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Foundational Topical Authority &amp; Guides
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Establish entity authority with search engines by publishing in-depth guides that answer user pain points and link internal equity down to your product features.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800">Target Examples:</div>
                <div className="text-slate-600">&bull; "what is generative engine optimization"</div>
                <div className="text-slate-600">&bull; "how to reduce b2b saas churn"</div>
                <div className="text-slate-600">&bull; "core web vitals benchmarks for saas"</div>
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase">Programmatic Authority</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use our 1,000 FAQ schema database and blog templates to build topical dominance on your domain in days, not months.
              </p>
              <div className="text-2xl font-black text-slate-800">
                Topical Authority
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Capabilities for SaaS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI Citation Tracking</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Monitor when your SaaS is mentioned inside ChatGPT, Perplexity, and Google AI Overviews to capture the next wave of generative search traffic.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Competitor Gap Analysis</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Analyze your top 5 competitors to uncover the exact high-intent search terms driving their demo signups that you haven't targeted yet.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Unlimited Team Seats</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Give access to product marketers, founders, developers, and agency partners on one unified $99/mo plan with zero seat licensing fees.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-black text-xl">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          Frequently Asked Questions
        </div>
        <div className="divide-y divide-slate-100">
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Why is B2B SaaS SEO different from standard website SEO?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              B2B SaaS buyers search with high commercial intent through 'Alternative', 'VS', and 'Software For' keywords. Organic traffic must convert into free trials or demo bookings, requiring precise bottom-of-funnel keyword tracking and AI engine citation monitoring.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              How does SEO Software track AI answer engines like ChatGPT and Perplexity?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Generative Engine Optimization (GEO) engine monitors when your SaaS brand is cited, recommended, or summarized by modern AI models, giving you visibility into the new AI-driven buyer journey.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Can we invite our entire growth and engineering team?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, all plans include unlimited team seats at no extra charge, allowing product managers, content writers, and engineers to collaborate without seat licenses.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Supercharge Your SaaS Organic Pipeline Today
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Start tracking high-intent software queries and AI search engine visibility for just $99/mo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Start SaaS Growth Plan ($99/mo)
          </Link>
          <Link
            href="/cloud-seo-platform"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            Explore Cloud Architecture
          </Link>
        </div>
      </div>
    </div>
  );
}
