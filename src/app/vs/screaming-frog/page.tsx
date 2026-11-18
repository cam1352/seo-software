"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Cloud,
  Laptop,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Cpu,
  Clock,
  Share2,
  Sparkles,
  Server
} from "lucide-react";

export default function VsScreamingFrogPage() {
  const [sitePages, setSitePages] = useState(25000);

  // Estimating RAM usage for Screaming Frog (GB)
  const frogRamUsage = Math.max(2, Math.round((sitePages / 2500) * 10) / 10);
  const frogCrawlMinutes = Math.round(sitePages / 350);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SEO Software - Screaming Frog Alternative",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/vs/screaming-frog",
    "description": "Cloud SEO platform alternative to Screaming Frog desktop crawler. Run automated scheduled 25-point technical crawls without eating laptop RAM or managing local license files.",
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
        "name": "Why choose a cloud SEO platform over Screaming Frog?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Screaming Frog is a local desktop Java app that consumes heavy CPU and RAM on your computer, cannot crawl while your laptop is closed, and requires manual exports. SEO Software runs 100% in the cloud on edge servers with automated weekly schedules and instant shareable client links."
        }
      },
      {
        "@type": "Question",
        "name": "Can I access SEO Software audit reports from mobile or tablet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Because SEO Software is fully cloud-based, you and your clients can access live audit scorecards, crawl histories, and keyword rankings from any device, including iPhone, iPad, and Android."
        }
      },
      {
        "@type": "Question",
        "name": "Does Screaming Frog track keyword rankings or backlinks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Screaming Frog is solely a technical crawler. SEO Software combines cloud site audits with daily rank tracking, backlink discovery, and Generative Engine Optimization (GEO) in one unified platform."
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
            <Cloud className="w-3.5 h-3.5 text-blue-400" />
            100% Cloud Architecture
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Cloud SEO Platform vs <span className="text-blue-400">Screaming Frog</span> Desktop Crawler
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Audit 100,000+ pages without melting your laptop's CPU, keeping your machine awake overnight, or emailing bulky 500MB Excel spreadsheets. Audit automatically in the cloud.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/audit"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>Launch Free Cloud Crawl</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>View $99/mo Plan</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 0 MB RAM Used on Your Computer
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Weekly Background Crawls
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Shareable Web URLs for Clients
            </span>
          </div>
        </div>
      </div>

      {/* Cloud vs Desktop Simulator */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              Hardware & Performance Benchmark
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Desktop Hardware Strain vs Cloud Serverless
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-500 font-semibold">Your Local Hardware Load:</div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              0% CPU / 0 MB RAM
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-800 mb-2">
              <span>Site Audit Scope</span>
              <span className="text-blue-600 font-bold">{sitePages.toLocaleString()} URLs</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={sitePages}
              onChange={(e) => setSitePages(Number(e.target.value))}
              className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Screaming Frog Desktop</span>
                <Laptop className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-2xl font-black text-slate-800">
                {frogRamUsage} GB RAM <span className="text-xs text-rose-500 font-semibold">(Pinned CPU)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5 text-rose-600">
                  <XCircle className="w-3.5 h-3.5" /> Laptop fans run at full speed for ~{frogCrawlMinutes} minutes
                </li>
                <li className="flex items-center gap-1.5 text-rose-600">
                  <XCircle className="w-3.5 h-3.5" /> Crawl stops if laptop sleeps or Wi-Fi drops
                </li>
                <li className="flex items-center gap-1.5 text-rose-600">
                  <XCircle className="w-3.5 h-3.5" /> Requires emailing massive CSV files to colleagues
                </li>
              </ul>
            </div>

            <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">SEO Software Cloud</span>
                <Cloud className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-blue-600">
                0 MB RAM <span className="text-xs text-emerald-600 font-semibold">(100% Serverless)</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Crawls execute on high-speed cloud edge nodes
                </li>
                <li className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Automated recurring schedules (Weekly / Daily)
                </li>
                <li className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1-Click shareable live web report links
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Cloud vs Desktop Feature Comparison
          </h2>
          <p className="text-sm text-slate-500">
            Why modern agencies and engineering teams migrate to cloud-native auditing.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 bg-blue-50/50 text-blue-700 font-extrabold rounded-t-lg">SEO Software</th>
                <th className="py-3 px-4 text-slate-600">Screaming Frog SEO Spider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Deployment Architecture</td>
                <td className="py-3.5 px-4 bg-blue-50/30 font-bold text-blue-600">100% Cloud (Browser Access)</td>
                <td className="py-3.5 px-4">Desktop App (Mac, Windows, Linux)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Hardware & Battery Drain</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 0% Local Resource Consumption
                </td>
                <td className="py-3.5 px-4 text-rose-500 font-semibold">Heavy RAM & CPU utilization</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Automated Scheduled Audits</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Cloud Crons (Hands-off)
                </td>
                <td className="py-3.5 px-4 text-slate-500">Requires dedicated PC or AWS setup</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Mobile & Tablet Access</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Fully Responsive Mobile UI
                </td>
                <td className="py-3.5 px-4 text-rose-500">Desktop Only</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Rank Tracking & Backlinks</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Built-in SERP & AI Citation Tracker
                </td>
                <td className="py-3.5 px-4 text-slate-400">None (Crawler Only)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-slate-900">Client Sharing</td>
                <td className="py-3.5 px-4 bg-blue-50/30 text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 1-Click Shareable Web Links
                </td>
                <td className="py-3.5 px-4">Exporting & Emailing Excel / CSV</td>
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
              Why choose a cloud SEO platform over Screaming Frog?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Screaming Frog is a local desktop Java app that consumes heavy CPU and RAM on your computer, cannot crawl while your laptop is closed, and requires manual exports. SEO Software runs 100% in the cloud on edge servers with automated weekly schedules and instant shareable client links.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Can I access SEO Software audit reports from mobile or tablet?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Yes. Because SEO Software is fully cloud-based, you and your clients can access live audit scorecards, crawl histories, and keyword rankings from any device, including iPhone, iPad, and Android.
            </p>
          </div>
          <div className="py-4 space-y-2">
            <h4 className="text-sm font-bold text-slate-900">
              Does Screaming Frog track keyword rankings or backlinks?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No. Screaming Frog is solely a technical crawler. SEO Software combines cloud site audits with daily rank tracking, backlink discovery, and Generative Engine Optimization (GEO) in one unified platform.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Ready to Move Your Technical Audits to the Cloud?
        </h2>
        <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto">
          Start your first automated crawl in seconds. No desktop downloads, license keys, or configuration headaches.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/audit"
            className="px-8 py-4 rounded-xl bg-white text-blue-700 font-extrabold text-sm shadow-xl hover:bg-blue-50 transition-all"
          >
            Run Free Cloud Crawl Now
          </Link>
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-bold text-sm border border-blue-400/30 transition-all"
          >
            Upgrade to Full Pro ($99/mo)
          </Link>
        </div>
      </div>
    </div>
  );
}
