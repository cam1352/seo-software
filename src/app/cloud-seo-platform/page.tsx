"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Cloud,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Zap,
  Globe,
  Database,
  Cpu,
  Layers,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function CloudSeoPlatformPage() {
  const router = useRouter();
  const [testUrl, setTestUrl] = useState("");

  const handleLaunchAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrl.trim()) return;
    router.push(`/audit?url=${encodeURIComponent(testUrl.trim())}`);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cloud SEO Software Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud / Web Browser",
    "url": "https://seosoftware.io/cloud-seo-platform",
    "description": "High-velocity cloud SEO platform providing real-time 25-point technical crawlers, automated IndexNow search indexing, and keyword rank tracking without local desktop computing constraints.",
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

      {/* Hero */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-8 sm:p-12 text-white border border-blue-900/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Cloud className="w-3.5 h-3.5 text-blue-400" />
            Position #1 Cloud SEO Software Alternative
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Cloud SEO Software: <span className="text-blue-400">Zero-Install</span> Technical Search Intelligence
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Run comprehensive 25-point technical site audits, track keyword ranking volatility across Google, and dispatch search indexing protocols directly in the cloud. No local RAM throttling, no desktop license keys.
          </p>

          <form onSubmit={handleLaunchAudit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder="Enter your website (e.g. yourdomain.com)..."
              className="flex-1 bg-white/10 text-white placeholder-slate-400 px-4 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm backdrop-blur-md"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer shrink-0"
            >
              <span>Test Cloud Crawl</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Cloud Compute
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant IndexNow Node Pings
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Crawls ($99/mo)
            </span>
          </div>
        </div>
      </div>

      {/* Cloud vs Legacy Desktop Comparison Table */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Teams Are Migrating to Cloud SEO Software
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Traditional desktop SEO crawlers like Screaming Frog burn through your computer&apos;s CPU and crash on large websites. SEO Software runs entirely on distributed serverless nodes.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-900 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-4 px-6">Feature Comparison</th>
                <th className="py-4 px-6 text-blue-600 bg-blue-50/50">SEO Software (Cloud)</th>
                <th className="py-4 px-6">Legacy Desktop Crawlers</th>
                <th className="py-4 px-6">Overpriced Suites (Semrush)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Execution Environment</td>
                <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/30">100% Cloud (Browser & API)</td>
                <td className="py-4 px-6 text-slate-500">Local Machine Only (Freezes Mac/PC)</td>
                <td className="py-4 px-6 text-slate-500">Cloud Web UI</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Monthly Cost</td>
                <td className="py-4 px-6 font-bold text-blue-600 bg-blue-50/30">$99 / Month (Flat)</td>
                <td className="py-4 px-6 text-slate-500">$259 / Year (Single Computer License)</td>
                <td className="py-4 px-6 text-rose-500 font-semibold">$139.95 / Month + Add-ons</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">IndexNow Protocol Dispatcher</td>
                <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/30">Included (One-Click)</td>
                <td className="py-4 px-6 text-rose-500">Not Available</td>
                <td className="py-4 px-6 text-rose-500">Not Available</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Generative AI Citation Tracker</td>
                <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/30">ChatGPT, Perplexity & Google AI</td>
                <td className="py-4 px-6 text-rose-500">Not Available</td>
                <td className="py-4 px-6 text-slate-500">Expensive Enterprise Add-on</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-semibold text-slate-900">Team Sharing & Multi-Seat</td>
                <td className="py-4 px-6 font-bold text-emerald-600 bg-blue-50/30">Unlimited Team Members</td>
                <td className="py-4 px-6 text-slate-500">Locked to Single Device</td>
                <td className="py-4 px-6 text-rose-500">$45 / Month per Extra Seat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Core Architecture Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Serverless Crawl Engine</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Crawls websites concurrently using distributed edge workers. Inspects HTTP status codes, canonicals, Hreflang, and Core Web Vitals in seconds without lagging your computer.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Live Keyword Magic Studio</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Query real-time search volume, intent scoring, and long-tail query clusters pulled directly from Google Autocomplete APIs across desktop and mobile devices.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Automated IndexNow Dispatch</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Notify Bing and Yandex spiders immediately whenever you publish new blog posts, products, or landing pages. Skip the multi-week waiting period for search bots.
          </p>
        </div>
      </div>

      {/* Cloud SEO FAQs */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions About Cloud SEO Software</h3>
          <p className="text-xs text-slate-500">Everything you need to know about our browser-based SEO infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900">What makes cloud SEO software better than desktop tools?</h4>
            <p className="text-slate-600 leading-relaxed">
              Desktop tools rely on your local computer memory and internet connection, frequently crashing on larger sites. Cloud SEO software crawls in the background on high-speed server clusters, allowing you to close your laptop and review reports when ready.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900">Can I crawl competitor websites in the cloud?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes. You can enter any public domain or URL to evaluate competitor page structures, discover meta tag configurations, identify missing Schema, and benchmark Core Web Vitals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900">Does SEO Software include daily rank tracking?</h4>
            <p className="text-slate-600 leading-relaxed">
              Yes. The platform includes rank tracking across traditional search engines and Generative AI models like ChatGPT Search, Perplexity, and Google AI Overviews.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h4 className="font-bold text-slate-900">Is there a contract or setup fee?</h4>
            <p className="text-slate-600 leading-relaxed">
              No. The Pro Plan is flat $99/month with no setup fees, no per-seat charges, and you can cancel anytime with one click in your account settings.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-blue-600 text-white text-center space-y-4 shadow-xl shadow-blue-500/20">
        <h3 className="text-2xl sm:text-3xl font-black">Ready to Upgrade to True Cloud SEO Software?</h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
          Join high-growth brands and agencies dominating search rankings with our $99/mo all-in-one suite.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition-colors shadow-md"
          >
            Get Pro Suite ($99/mo)
          </Link>
          <Link
            href="/audit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-700 text-white font-bold text-sm hover:bg-blue-800 border border-blue-400/30 transition-colors"
          >
            Run Free Site Audit
          </Link>
        </div>
      </div>
    </div>
  );
}
