"use client";

import { useState, useMemo } from "react";
import { HelpCircle, Search, ChevronDown, ChevronUp, Copy, Check, Sparkles, MapPin, Globe } from "lucide-react";
import { SEO_FAQS } from "@/lib/faq-data";

const MAIN_CATEGORIES = [
  "ALL",
  "SEO Fundamentals & Technical",
  "SEO Software Platform (seosoftware.io)",
  "Local SEO by Location",
  "Automated Backlinks & IndexNow",
  "GEO & AI Search Visibility"
];

const POPULAR_CITIES = [
  "ALL CITIES",
  "Vancouver",
  "Toronto",
  "Montreal",
  "Calgary",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Miami",
  "London",
  "Sydney"
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCity, setSelectedCity] = useState("ALL CITIES");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(50);

  const filteredFaqs = useMemo(() => {
    return SEO_FAQS.filter((faq) => {
      // Category filter
      if (selectedCategory !== "ALL") {
        if (selectedCategory === "Local SEO by Location") {
          if (!faq.category.startsWith("Local SEO")) return false;
        } else if (faq.category !== selectedCategory) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== "ALL CITIES") {
        if (!faq.question.toLowerCase().includes(selectedCity.toLowerCase()) && !faq.category.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q) ||
          faq.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedCity]);

  const copyFaqLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = window.location.origin + "/faq#" + id;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  // Generate Schema.org FAQPage JSON-LD for rich snippets
  const schemaJsonLd = useMemo(() => {
    const mainEntity = filteredFaqs.slice(0, 30).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    }));
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity,
    });
  }, [filteredFaqs]);

  return (
    <div className="space-y-6">
      {/* Schema.org Injection for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJsonLd }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            1,000 Programmatic FAQs with Schema.org JSON-LD
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            SEO Software Knowledge Base & FAQs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse 1,000 in-depth answers engineered to capture Google featured snippets, Perplexity answers, and #1 local & national rankings.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-slate-500">Database Size:</span>
          <div className="text-2xl font-black text-slate-900">{SEO_FAQS.length.toLocaleString()} FAQs</div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayCount(50);
            }}
            placeholder="Search across 1,000 FAQs (e.g. Vancouver, IndexNow, Core Web Vitals, competitor gap)..."
            className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
        </div>

        {/* Primary Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {MAIN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setDisplayCount(50);
              }}
              className={
                "px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer " +
                (selectedCategory === cat
                  ? "bg-blue-600 text-white font-semibold shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200")
              }
            >
              {cat === "ALL" ? "All FAQs (1,000)" : cat}
            </button>
          ))}
        </div>

        {/* Sub-City Filter (Shown when Local SEO is selected or generally) */}
        {(selectedCategory === "Local SEO by Location" || selectedCategory === "ALL") && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 shrink-0 flex items-center gap-1 text-[11px] font-semibold">
              <MapPin className="w-3 h-3 text-blue-600" />
              Filter by City:
            </span>
            {POPULAR_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setDisplayCount(50);
                }}
                className={
                  "px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer shrink-0 " +
                  (selectedCity === city
                    ? "bg-blue-100 text-blue-800 font-bold border border-blue-300"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100")
                }
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FAQ Count Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing {Math.min(displayCount, filteredFaqs.length)} of {filteredFaqs.length} matching FAQs</span>
        {searchQuery && <span>Search: "{searchQuery}"</span>}
      </div>

      {/* FAQ Accordions List */}
      <div className="space-y-3">
        {filteredFaqs.slice(0, displayCount).map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              id={faq.id}
              className={
                "rounded-xl border transition-all " +
                (isOpen
                  ? "bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/10"
                  : "bg-white border-slate-200 hover:border-slate-300")
              }
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full text-left p-4.5 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <div className="shrink-0 text-slate-400 mt-1">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4.5 pb-4.5 pt-0 border-t border-slate-100 text-xs text-slate-600 leading-relaxed space-y-3">
                  <p className="pt-3">{faq.answer}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-[10px] font-mono text-slate-400">ID: {faq.id} • Schema.org FAQPage Compliant</span>
                    <button
                      onClick={() => copyFaqLink(faq.id)}
                      className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    >
                      {copiedId === faq.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === faq.id ? "Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="p-12 text-center rounded-xl bg-white border border-slate-200 text-slate-500">
            <p className="text-sm font-semibold">No FAQs match your search or filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
                setSelectedCity("ALL CITIES");
              }}
              className="mt-2 text-xs text-blue-600 underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {displayCount < filteredFaqs.length && (
          <div className="text-center pt-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 50)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Load More FAQs ({filteredFaqs.length - displayCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
