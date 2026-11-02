"use client";

import { useState, useMemo } from "react";
import { HelpCircle, Search, ChevronDown, ChevronUp, Copy, Check, Sparkles, Layers } from "lucide-react";
import { SEO_FAQS, FAQItem } from "@/lib/faq-data";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    SEO_FAQS.forEach((f) => set.add(f.category));
    return ["ALL", ...Array.from(set)];
  }, []);

  const filteredFaqs = useMemo(() => {
    return SEO_FAQS.filter((faq) => {
      if (selectedCategory !== "ALL" && faq.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  const copyFaqLink = (id: string) => {
    const url = `${window.location.origin}/faq#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Generate Schema.org FAQPage JSON-LD for top 25 current visible FAQs to empower rich snippets
  const schemaJsonLd = useMemo(() => {
    const mainEntity = filteredFaqs.slice(0, 25).map((f) => ({
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            1,000 Programmatic FAQs with Schema.org JSON-LD
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-[#FF642D]" />
            SEO Software Knowledge Base & FAQs
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Browse 1,000 in-depth answers engineered to capture Google featured snippets, Perplexity answers, and #1 rankings.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-gray-400">Total Database:</span>
          <div className="text-2xl font-black text-white">{SEO_FAQS.length.toLocaleString()} FAQs</div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 1,000 FAQs (e.g. indexnow, canonical tags, core web vitals, GEO)..."
            className="w-full bg-[#0E121A] text-sm text-gray-100 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-[#FF642D]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF642D] text-white font-semibold shadow"
                  : "bg-[#0E121A] text-gray-400 hover:text-white border border-[#232B3B]"
              }`}
            >
              {cat === "ALL" ? "All Categories (1,000)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Count Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-1">
        <span>Showing {filteredFaqs.length} of 1,000 FAQs</span>
        {searchQuery && <span>Filtered by: "{searchQuery}"</span>}
      </div>

      {/* FAQ Accordions List */}
      <div className="space-y-3">
        {filteredFaqs.slice(0, 100).map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              id={faq.id}
              className={`rounded-xl border transition-all ${
                isOpen
                  ? "bg-[#181E2C] border-[#FF642D]/50 shadow-lg"
                  : "bg-[#141824] border-[#232B3B] hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E121A] text-gray-400 border border-[#222938]">
                    {faq.category}
                  </span>
                  <span className="text-sm font-semibold text-white">{faq.question}</span>
                </div>
                <div className="shrink-0 text-gray-400">
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#FF642D]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-gray-300 border-t border-[#232B3B] space-y-3 leading-relaxed">
                  <p>{faq.answer}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-gray-500 border-t border-[#232B3B]">
                    <span>FAQ ID: {faq.id} • Structured with Schema.org FAQPage</span>
                    <button
                      onClick={() => copyFaqLink(faq.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedId === faq.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Direct Link</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length > 100 && (
          <div className="p-4 text-center rounded-xl bg-[#141824] border border-[#232B3B] text-xs text-gray-400">
            Displaying first 100 matching FAQs. Refine your query or choose a specific category above to explore all 1,000 answers.
          </div>
        )}
      </div>
    </div>
  );
}
