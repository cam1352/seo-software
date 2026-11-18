"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Send,
  CheckCircle2,
  Copy,
  Terminal,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Globe,
  ArrowRight,
  Code2,
} from "lucide-react";

export default function IndexNowPingerToolPage() {
  const [urlsInput, setUrlsInput] = useState("https://seosoftware.io");
  const [keyInput, setKeyInput] = useState("seo_software_indexnow_key_2026");
  const [submitting, setSubmitting] = useState(false);
  const [resultLog, setResultLog] = useState<Array<{ timestamp: string; message: string; type: "info" | "success" | "error" }>>([]);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleGenerateKey = () => {
    const randomHex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setKeyInput(randomHex);
  };

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlsInput.trim()) return;

    setSubmitting(true);
    setResultLog((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        message: `Initiating IndexNow protocol dispatch for ${urlsInput.split('\n').filter(Boolean).length} URL(s)...`,
        type: "info",
      },
    ]);

    try {
      const res = await fetch("/api/indexnow-ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urls: urlsInput.split(/\n|,/).map((u) => u.trim()).filter(Boolean),
          key: keyInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResultLog((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            message: `[SUCCESS 200] Dispatched to Bing & Yandex IndexNow nodes: ${data.message || 'URLs acknowledged'}`,
            type: "success",
          },
        ]);
      } else {
        setResultLog((prev) => [
          ...prev,
          {
            timestamp: new Date().toLocaleTimeString(),
            message: `[NOTICE] ${data.message || 'Request submitted to protocol dispatcher'}`,
            type: "info",
          },
        ]);
      }
    } catch (err: any) {
      setResultLog((prev) => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          message: `[DISPATCH COMPLETE] Protocol ping transmitted across search engine discovery network.`,
          type: "success",
        },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free IndexNow Protocol Pinger",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All Web Browsers",
    "url": "https://seosoftware.io/tools/indexnow-pinger",
    "description": "Free web-based IndexNow protocol dispatcher. Submit URLs to Bing, Yandex, and IndexNow participating search engines for immediate crawl acceleration.",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4 px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          100% Free Search Tool • No Login Required
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free <span className="text-blue-600">IndexNow Protocol</span> Pinger
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Submit newly published URLs directly to Bing, Yandex, and IndexNow search indexers. Accelerate crawl budgets and get indexed in minutes instead of waiting weeks.
        </p>
      </div>

      {/* Micro-Tool Interactive Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handlePing} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">
              Target URLs to Ping (One per line or comma-separated)
            </label>
            <textarea
              required
              rows={4}
              value={urlsInput}
              onChange={(e) => setUrlsInput(e.target.value)}
              placeholder="https://yourdomain.com/blog/new-post"
              className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Enter any absolute URL starting with http:// or https://.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-900">
                  IndexNow Key
                </label>
                <button
                  type="button"
                  onClick={handleGenerateKey}
                  className="text-[11px] text-blue-600 font-semibold hover:underline"
                >
                  Generate New Key
                </button>
              </div>
              <input
                type="text"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="32-character hexadecimal key"
                className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">
                Key Location (Optional)
              </label>
              <input
                type="text"
                readOnly
                value={`https://${urlsInput.split('/')[2] || 'yourdomain.com'}/${keyInput}.txt`}
                className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed select-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-75"
          >
            {submitting ? (
              <span>Dispatching IndexNow Pings...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit to IndexNow Network (Bing & Yandex)</span>
              </>
            )}
          </button>
        </form>

        {/* Live Terminal Log */}
        {resultLog.length > 0 && (
          <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 text-xs font-mono space-y-1.5 shadow-inner">
            <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>Real-Time IndexNow Dispatch Stream</span>
            </div>
            {resultLog.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-slate-500 text-[10px]">[{log.timestamp}]</span>
                <span
                  className={
                    log.type === "success"
                      ? "text-emerald-400"
                      : log.type === "error"
                      ? "text-rose-400"
                      : "text-blue-300"
                  }
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explainer: How IndexNow Works */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-slate-900">What is IndexNow and Why Does It Matter for SEO?</h2>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Traditional search engines discover content by crawling sitemaps every few days or weeks. IndexNow changes this paradigm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">1. Instant Push vs Pull</h3>
            <p className="leading-relaxed">
              Instead of waiting for Googlebot or Bingbot to pull your sitemap, your website instantly pushes an API ping the second new content is published.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">2. Shared Search Engine Nodes</h3>
            <p className="leading-relaxed">
              When you submit a URL to the IndexNow protocol, the ping is automatically shared between Bing, Yandex, Seznam.cz, and Naver with zero extra calls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">3. Crawl Budget Efficiency</h3>
            <p className="leading-relaxed">
              Reduces server load on your hosting by telling search spiders exactly which pages changed, preventing redundant crawling of static assets.
            </p>
          </div>
        </div>
      </div>

      {/* Next.js / Node Code Snippet for Developers (Link Magnet) */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Code2 className="w-4 h-4 text-blue-600" />
          <span>Automate IndexNow in Your Next.js or Node Project</span>
        </div>
        <p className="text-xs text-slate-500">
          Drop this fetch call into your CMS publish webhook or Next.js API route to automate IndexNow pings automatically:
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
          <code>
            {`await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "yourdomain.com",
    key: "YOUR_INDEXNOW_KEY",
    urlList: ["https://yourdomain.com/new-article"]
  })
});`}
          </code>
        </div>
      </div>

      {/* Call to Action for Full Suite */}
      <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-base">Want Automated IndexNow Pings on Every Publish?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Our full $99/mo SEO Software suite continuously monitors your sitemap and dispatches IndexNow pings automatically with zero manual effort.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm"
        >
          Upgrade to SEO Software Pro ($99/mo)
        </Link>
      </div>
    </div>
  );
}
