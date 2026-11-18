"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Zap,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  ShieldCheck,
  Star,
  Compass
} from "lucide-react";

export default function ForLocalBusinessPage() {
  const [selectedCity, setSelectedCity] = useState("Austin, TX");

  const cityData: Record<string, { packRank: string; localVolume: string; citationScore: number }> = {
    "Austin, TX": { packRank: "#1 Google Maps 3-Pack", localVolume: "3,400 monthly searches", citationScore: 98 },
    "New York, NY": { packRank: "#2 Google Maps 3-Pack", localVolume: "14,200 monthly searches", citationScore: 96 },
    "Los Angeles, CA": { packRank: "#1 Google Maps 3-Pack", localVolume: "11,800 monthly searches", citationScore: 97 },
    "Chicago, IL": { packRank: "#1 Google Maps 3-Pack", localVolume: "8,500 monthly searches", citationScore: 95 },
    "Miami, FL": { packRank: "#1 Google Maps 3-Pack", localVolume: "6,100 monthly searches", citationScore: 99 },
    "London, UK": { packRank: "#2 Google Maps 3-Pack", localVolume: "12,900 monthly searches", citationScore: 94 },
    "Toronto, CA": { packRank: "#1 Google Maps 3-Pack", localVolume: "5,800 monthly searches", citationScore: 96 },
    "Sydney, AU": { packRank: "#1 Google Maps 3-Pack", localVolume: "6,400 monthly searches", citationScore: 95 }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Local Business SEO Software",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/for/local-business",
    "description": "High-precision Local Business SEO software. Track Google Maps Local 3-Pack rankings, monitor multi-location search visibility across 40+ cities, and audit NAP citations for a flat $99/mo.",
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
        "name": "How does SEO Software track Google Maps 3-Pack rankings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our rank tracking engine emulates localized mobile and desktop GPS coordinates across 40+ global cities, recording your position in both standard organic web results and Google Maps Local Pack carousels."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track multiple business locations on one account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our platform supports multi-location tracking with zero per-location upcharges. You can track franchises, multiple clinic locations, or service-area branches under your flat $99/mo plan."
        }
      },
      {
        "@type": "Question",
        "name": "Does it check NAP (Name, Address, Phone) consistency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our local audit engine checks your site's LocalBusiness JSON-LD schema against top directory standards to ensure seamless NAP alignment with Google Business Profile."
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
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Local 3-Pack &amp; Maps Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Local Business <span className="text-blue-400">SEO Software</span>: Rank #1 on Google Maps
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Dominate local search in your city. Track daily Google Maps Local 3-Pack rankings, monitor search volatility across 40+ locations, and dispatch IndexNow citation pings without agency retainers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Get Started ($99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/rank-tracking-software"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>View Rank Tracker</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Google Maps 3-Pack &amp; Organic SERP
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-City Tracking (40+ Global Metros)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> LocalBusiness Schema JSON-LD Validator
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Multi-Location Grid Simulator */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              Multi-Location SERP Simulator
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Check Maps Visibility Across Cities
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-500 font-semibold">Location Visibility Score:</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {cityData[selectedCity]?.citationScore}% Optimal
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Location:</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(cityData).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={"px-3 py-1.5 text-xs font-bold rounded-xl border transition-all " + (selectedCity === city ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300")}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Maps Position</div>
              <div className="text-xl font-black text-blue-600">
                {cityData[selectedCity]?.packRank}
              </div>
              <p className="text-xs text-slate-500">Prominent Local 3-Pack placement verified by geo-coordinates.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Local Search Demand</div>
              <div className="text-xl font-black text-slate-800">
                {cityData[selectedCity]?.localVolume}
              </div>
              <p className="text-xs text-slate-500">Estimated monthly commercial queries in this metro area.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Citation Alignment</div>
              <div className="text-xl font-black text-emerald-600">
                {cityData[selectedCity]?.citationScore}/100 NAP Score
              </div>
              <p className="text-xs text-slate-500">Consistent Name, Address &amp; Phone across directory profiles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Local Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Google Business Profile Sync</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Align website schema with your primary and secondary categories to earn bold service snippet justifications directly in local search results.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Multi-Location Scaling</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Whether you operate 1 clinic or 25 regional branches, track separate geo-coordinates and search rankings without paying extra per location.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Local Schema Validator</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Generate and validate Schema.org <code>LocalBusiness</code>, <code>OpeningHoursSpecification</code>, and geo-coordinates in under 60 seconds.
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
              How does SEO Software track Google Maps 3-Pack rankings?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our rank tracking engine emulates localized mobile and desktop GPS coordinates across 40+ global cities, recording your position in both standard organic web results and Google Maps Local Pack carousels.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Can I track multiple business locations on one account?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, our platform supports multi-location tracking with zero per-location upcharges. You can track franchises, multiple clinic locations, or service-area branches under your flat $99/mo plan.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Does it check NAP (Name, Address, Phone) consistency?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, our local audit engine checks your site's LocalBusiness JSON-LD schema against top directory standards to ensure seamless NAP alignment with Google Business Profile.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Dominate Your Local Market?
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Start tracking Google Maps 3-Pack rankings and auditing local technical schema for just $99/mo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Start Local Business Plan ($99/mo)
          </Link>
          <Link
            href="/rank-tracking-software"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            View Live Rank Tracker
          </Link>
        </div>
      </div>
    </div>
  );
}
