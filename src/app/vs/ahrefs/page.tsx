"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Flame,
  AlertTriangle,
  Globe,
  Database
} from "lucide-react";

export default function VsAhrefsPage() {
  const [dailySearches, setDailySearches] = useState(25);
  const [crawledPages, setCrawledPages] = useState(500);

  // Ahrefs gives 500 credits per user per month on Lite/Standard.
  // Every page view, filter click, or export burns 1 credit.
  const monthlyConsumption = dailySearches * 30 + (crawledPages / 50);
  const daysUntilBurnout = Math.min(30, Math.max(2, Math.round((500 / (dailySearches + (crawledPages / 1500))))));
  const estimatedOverageCost = monthlyConsumption > 500 ? Math.ceil((monthlyConsumption - 500) / 500) * 35 : 0;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Software - Ahrefs Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/vs/ahrefs",
    "description": "The modern Ahrefs alternative with zero credit consumption traps, unlimited site audits, daily rank updates, and AI search engine visibility for a flat $99/mo.",
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
        "name": "Does SEO Software charge credits for browsing or filtering reports like Ahrefs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SEO Software has zero credit systems. You can view unlimited reports, filter keywords endlessly, and export CSVs without deducting from a monthly quota."
        }
      },
      {
        "@type": "Question",
        "name": "How does rank tracking compare between SEO Software and Ahrefs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ahrefs updates rankings weekly on their standard tiers unless you purchase expensive daily add-ons. SEO Software updates your rankings daily across Google desktop, mobile, and AI Overviews automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Does SEO Software include Generative Engine Optimization (GEO)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. While Ahrefs focuses solely on historical backlink indices, SEO Software tracks brand citations and mentions inside modern AI answer engines including ChatGPT, Perplexity, and Google AI Overviews."
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
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Zero Credit Traps Guarantee
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Ahrefs Alternative with <span className="text-blue-400">Zero Credit Traps</span> & Flat Pricing
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop worrying about burning 500 monthly export credits just clicking through reports. SEO Software gives you unlimited technical crawls, daily rank updates, and AI search visibility for a transparent flat $99/month.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Get Unlimited Access ($99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rank-tracking-software"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Rank Tracking</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0 Credits System (Unlimited Usage)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily SERP + AI Overview Updates
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Flat $99/mo (No Overage Invoices)
            </span>
          </div>
        </div>
      </div>

      {/* Credit Burnout Simulator */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              Ahrefs Credit Burnout Simulator
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              How Fast Do 500 Ahrefs Credits Vanish?
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-500 font-semibold">Credits Exhausted On:</div>
            <div className="text-2xl sm:text-3xl font-black text-rose-600">
              Day {daysUntilBurnout} of the month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span>Daily Keyword / SERP Lookups</span>
                <span className="text-blue-600 font-bold">{dailySearches} lookups/day</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={dailySearches}
                onChange={(e) => setDailySearches(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-400 mt-1">In Ahrefs v2, opening an overview or clicking a filter costs 1 credit.</p>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span>Monthly Pages Crawled</span>
                <span className="text-blue-600 font-bold">{crawledPages.toLocaleString()} Pages</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={crawledPages}
                onChange={(e) => setCrawledPages(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-400 mt-1">SEO Software audits unlimited pages with zero per-URL credit deductions.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ahrefs Standard</span>
              <div className="text-xl sm:text-2xl font-black text-slate-800">
                $249
                <span className="text-xs text-slate-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-rose-500 font-bold">
                +${estimatedOverageCost} estimated overage fees
              </div>
              <p className="text-xs text-slate-500">Users penalized for doing in-depth research</p>
            </div>

            <div className="space-y-2 border-l border-slate-200 pl-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SEO Software</span>
              <div className="text-xl sm:text-2xl font-black text-blue-600">
                $99
                <span className="text-xs text-slate-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-emerald-600 font-bold">
                $0 Overage Fees (Forever)
              </div>
              <p className="text-xs text-slate-500">Unlimited searches, exports, and audits included</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Ahrefs vs SEO Software Feature Matrix
          </h2>
          <p className="text-sm text-slate-500">
            Compare usage models, credit policies, and modern search capabilities.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3 px-4">Capability</th>
                <th className="py-3 px-4 bg-blue-50/50 text-blue-700 font-extrabold rounded-t-lg">SEO Software</th>
                <th className="py-3 px-4 text-slate-600">Ahrefs (Lite / Standard)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Monthly Starting Price</td>
                <td className="py-3.5 px-4 bg-blue-50/30 font-bold text-blue-600">$99 / month flat</td>
                <td className="py-3.5 px-4">$129 (Lite) / $249 (Standard)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Credit Consumption System</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 0 Credits (100% Unlimited)
                </td>
                <td className="py-3.5 px-4 text-rose-500 font-semibold">500 Credits/mo (Clicks & filters count)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Rank Tracking Frequency</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Daily Automated SERP Checks
                </td>
                <td className="py-3.5 px-4 text-slate-600">Weekly updates (Daily is an expensive add-on)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">AI Answer Engine Tracking (GEO)</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> ChatGPT, Perplexity & Google AI Overviews
                </td>
                <td className="py-3.5 px-4 text-slate-400">Not Available</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">IndexNow Protocol Dispatch</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Direct Instant Bing/Yandex Ping
                </td>
                <td className="py-3.5 px-4 text-slate-400">Not Available</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Multi-User Seats</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Free Unlimited Seats
                </td>
                <td className="py-3.5 px-4 text-rose-500 font-semibold">$40 to $90 per extra user/mo</td>
              </tr>
            </tbody>
          </table>
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
              Does SEO Software charge credits for browsing or filtering reports like Ahrefs?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. SEO Software has zero credit systems. You can view unlimited reports, filter keywords endlessly, and export CSVs without deducting from a monthly quota.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              How does rank tracking compare between SEO Software and Ahrefs?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ahrefs updates rankings weekly on their standard tiers unless you purchase expensive daily add-ons. SEO Software updates your rankings daily across Google desktop, mobile, and AI Overviews automatically.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Does SEO Software include Generative Engine Optimization (GEO)?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. While Ahrefs focuses solely on historical backlink indices, SEO Software tracks brand citations and mentions inside modern AI answer engines including ChatGPT, Perplexity, and Google AI Overviews.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Say Goodbye to Usage Limits & Surprise Bills
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Experience frictionless SEO research with flat-rate $99/mo pricing and daily rank updates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Switch to SEO Software ($99/mo)
          </Link>
          <Link
            href="/cloud-seo-platform"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            Explore Cloud Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
