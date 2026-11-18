"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Calculator,
  Users,
  Sparkles,
  Layers,
  Globe,
  Database
} from "lucide-react";

export default function VsSemrushPage() {
  const router = useRouter();
  const [teamSize, setTeamSize] = useState(3);
  const [keywordVolume, setKeywordVolume] = useState(1500);

  // Semrush Pro ($139.95) + $45/user/mo extra
  // Guru ($249.95) + $80/user/mo extra
  const semrushMonthly = 249.95 + Math.max(0, teamSize - 1) * 80;
  const semrushAnnual = semrushMonthly * 12;
  const ourAnnual = 99 * 12;
  const annualSavings = Math.round(semrushAnnual - ourAnnual);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Software - SEMrush Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/vs/semrush",
    "description": "High-velocity, transparent $99/mo alternative to SEMrush with unlimited site crawls, daily rank tracking across Google and AI search engines, and no user seat fees.",
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
        "name": "Why is SEO Software a better alternative to SEMrush?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SEO Software provides transparent flat $99/month pricing with zero user add-on fees ($45-$80/seat on SEMrush), unlimited cloud site audits, and built-in Generative Engine Optimization (GEO) tracking for Google AI Overviews and ChatGPT citations."
        }
      },
      {
        "@type": "Question",
        "name": "Can I import my existing rank tracking keywords from SEMrush?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can import your CSV keyword exports from SEMrush into SEO Software with 1-click. Our platform immediately begins daily rank tracking across 40+ global and local cities."
        }
      },
      {
        "@type": "Question",
        "name": "Does SEO Software charge per user or seat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SEO Software includes full team access with unlimited collaborative workspaces at no extra cost, saving growing agencies thousands of dollars annually."
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
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Top-Rated 2026 SEMrush Alternative
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Transparent, Flat <span className="text-blue-400">$99/mo</span> Alternative to SEMrush
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop paying $139.95 to $499.95/month plus $80/seat user penalty fees. SEO Software gives you unlimited technical site crawls, daily rank tracking across Google & AI answer engines, and index management with zero hidden upsells.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Get Started for $99/mo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/audit"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Test Cloud Audit</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No User Seat Add-on Fees
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily SERP + AI Overview Updates
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel Anytime Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Savings Calculator */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              Interactive ROI Calculator
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Calculate Your Annual Savings vs SEMrush
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-500 font-semibold">Your Estimated Savings:</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              ${annualSavings.toLocaleString()} / year
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span>Team Members / Seats</span>
                <span className="text-blue-600 font-bold">{teamSize} Users</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-400 mt-1">SEMrush charges $45 to $80/mo for every single additional team login.</p>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
                <span>Keywords Tracked</span>
                <span className="text-blue-600 font-bold">{keywordVolume.toLocaleString()} Keywords</span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="500"
                value={keywordVolume}
                onChange={(e) => setKeywordVolume(Number(e.target.value))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <p className="text-xs text-slate-400 mt-1">SEO Software provides daily rank updates across desktop, mobile, and Google AI Overviews.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SEMrush Suite</span>
              <div className="text-xl sm:text-2xl font-black text-slate-800">
                ${Math.round(semrushMonthly).toLocaleString()}
                <span className="text-xs text-slate-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                ${Math.round(semrushAnnual).toLocaleString()} billed annually with user add-ons
              </div>
              <div className="pt-2 text-xs text-rose-500 flex items-center gap-1 font-semibold">
                <XCircle className="w-3.5 h-3.5" /> High seat tax
              </div>
            </div>

            <div className="space-y-2 border-l border-slate-200 pl-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SEO Software</span>
              <div className="text-xl sm:text-2xl font-black text-blue-600">
                $99
                <span className="text-xs text-slate-500 font-normal"> / mo</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                $1,188 billed flat annually. Unlimited seats included.
              </div>
              <div className="pt-2 text-xs text-emerald-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> ${annualSavings.toLocaleString()} kept in your pocket
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Feature Comparison Matrix */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Head-to-Head Feature Comparison
          </h2>
          <p className="text-sm text-slate-500">
            See how SEO Software compares directly against SEMrush on features, limits, and pricing.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3 px-4">Capability</th>
                <th className="py-3 px-4 bg-blue-50/50 text-blue-700 font-extrabold rounded-t-lg">SEO Software</th>
                <th className="py-3 px-4 text-slate-600">SEMrush Pro / Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Monthly Starting Price</td>
                <td className="py-3.5 px-4 bg-blue-50/30 font-bold text-blue-600">$99 / month flat</td>
                <td className="py-3.5 px-4">$139.95 to $249.95 / mo</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Additional User Seats</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Free (Unlimited)
                </td>
                <td className="py-3.5 px-4 text-rose-500 font-semibold">$45 to $80 per user/mo</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">AI Search Engine Tracking (GEO)</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Built-in (ChatGPT, Perplexity, Google AI)
                </td>
                <td className="py-3.5 px-4 text-slate-400">Not Available</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Daily Rank Tracking Frequency</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Daily Automated SERP Checks
                </td>
                <td className="py-3.5 px-4">Daily (Limited to tier credits)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Instant IndexNow Protocol Engine</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Included (Instant Bing & Yandex Ping)
                </td>
                <td className="py-3.5 px-4 text-slate-400">Not Supported</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Technical Site Audits</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Unlimited 25-Point Cloud Crawls
                </td>
                <td className="py-3.5 px-4">100k to 300k page cap per month</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Dashboard Speed & UI</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Sub-100ms Edge Architecture
                </td>
                <td className="py-3.5 px-4 text-slate-500">Heavy legacy web interface</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Reasons to Switch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            1
          </div>
          <h3 className="text-lg font-bold text-slate-900">Zero User Seat Tax</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Agencies lose thousands giving interns, clients, and freelancers access to SEMrush. SEO Software gives you unlimited seats on one flat $99/mo plan.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            2
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ready for Generative AI Search</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Traditional blue links are only half the battle. We track your brand mentions and citations inside Google AI Overviews, Perplexity, and ChatGPT.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold">
            3
          </div>
          <h3 className="text-lg font-bold text-slate-900">2-Minute Seamless Migration</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Export your keyword lists and competitor domains from SEMrush into standard CSVs. Upload them directly into SEO Software in under 120 seconds.
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
              Why is SEO Software a better alternative to SEMrush?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              SEO Software provides transparent flat $99/month pricing with zero user add-on fees ($45-$80/seat on SEMrush), unlimited cloud site audits, and built-in Generative Engine Optimization (GEO) tracking for Google AI Overviews and ChatGPT citations.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Can I import my existing rank tracking keywords from SEMrush?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes, you can import your CSV keyword exports from SEMrush into SEO Software with 1-click. Our platform immediately begins daily rank tracking across 40+ global and local cities.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Does SEO Software charge per user or seat?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. SEO Software includes full team access with unlimited collaborative workspaces at no extra cost, saving growing agencies thousands of dollars annually.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Escape the SEMrush Pricing Trap?
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Join hundreds of agencies and modern founders who switched to high-velocity, flat-rate search intelligence.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Switch to SEO Software ($99/mo)
          </Link>
          <Link
            href="/audit"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            Run a Free Cloud Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
