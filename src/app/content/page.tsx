"use client";

import { Suspense,  useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import { analyzeContent, ContentAnalysisResult } from "@/lib/content-optimizer";

const DEFAULT_ARTICLE = `# The Definitive Guide to SEO Software in 2026

Modern digital agencies and development teams face an evolving organic search landscape. Search engines now evaluate not only traditional backlinks and keyword density, but also Generative Engine Optimization (GEO) and technical performance.

## Why Modern Teams Need Real-Time SEO Software

Legacy SEO suites often impose strict credit limitations and lack direct support for automated protocols like IndexNow. Modern SEO software bridges this gap by unifying deep technical site audits with generative AI tracking.

### Key Factors for Search Dominance

To achieve sustained organic growth and rank #1 for target search queries, focus on three pillars:

1. **Technical Hygiene**: Eliminate crawl errors, implement schema JSON-LD, and optimize Core Web Vitals.
2. **Topical Authority**: Target commercial and informational search intent with structured content.
3. **Automated Indexing**: Dispatch new URLs immediately to search engine nodes.

By implementing these strategic workflows, digital brands can outperform established competitors without incurring excessive subscription overhead.`;

function ContentOptimizerContent() {
  const searchParams = useSearchParams();
  const initialKw = searchParams.get("kw") || "seo software, site audit, rank #1";

  const [keywordsInput, setKeywordsInput] = useState(initialKw);
  const [content, setContent] = useState(DEFAULT_ARTICLE);
  const [analysis, setAnalysis] = useState<ContentAnalysisResult | null>(null);

  useEffect(() => {
    const kws = keywordsInput.split(",").map((k) => k.trim()).filter(Boolean);
    const res = analyzeContent(content, kws);
    setAnalysis(res);
  }, [content, keywordsInput]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            Semrush SEO Writing Assistant Clone
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-rose-400" />
            SEO Writing Assistant & Content Optimizer
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time readability analysis, keyword density tracking, and on-page optimization recommendations.
          </p>
        </div>
      </div>

      {/* Target Keywords Input */}
      <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="text-xs font-bold text-gray-300 whitespace-nowrap">Target Keywords (comma-separated):</label>
        <input
          type="text"
          value={keywordsInput}
          onChange={(e) => setKeywordsInput(e.target.value)}
          placeholder="e.g. seo software, site audit, rank #1"
          className="flex-1 bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-rose-500"
        />
      </div>

      {/* Editor & Metrics Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Editor Box */}
        <div className="lg:col-span-2 rounded-xl bg-[#141824] border border-[#232B3B] overflow-hidden flex flex-col">
          <div className="p-3.5 bg-[#0E121A] border-b border-[#232B3B] flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>Markdown / Content Editor</span>
            <div className="flex items-center gap-4">
              <span>{analysis?.wordCount || 0} words</span>
              <span>{analysis?.sentenceCount || 0} sentences</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {analysis?.readingTimeMinutes || 0} min read</span>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={22}
            className="w-full bg-[#141824] p-5 text-sm text-gray-100 font-mono focus:outline-none resize-y leading-relaxed"
            placeholder="Paste or compose your article draft here..."
          />
        </div>

        {/* Real-Time Metrics Sidebar */}
        <div className="space-y-4">
          {/* SEO Score & Readability Card */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Content SEO Score</span>
              <span className="text-2xl font-black text-rose-400">{analysis?.score || 0}/100</span>
            </div>
            <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-500"
                style={{ width: `${analysis?.score || 0}%` }}
              />
            </div>

            {/* Readability */}
            <div className="pt-3 border-t border-[#232B3B] space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Flesch Reading Ease:</span>
                <span className="font-bold text-white">{analysis?.readability.fleschReadingEase}/100</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Target Audience Level:</span>
                <span className="font-semibold text-purple-300">{analysis?.readability.gradeLevel}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Ease Label:</span>
                <span className="font-semibold text-emerald-400">{analysis?.readability.readingEaseLabel}</span>
              </div>
            </div>
          </div>

          {/* Keyword Density Tracker */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Keyword Density Analysis</h3>
            <div className="space-y-2.5">
              {analysis?.keywordsAnalysis.map((k) => (
                <div key={k.keyword} className="p-2.5 rounded-lg bg-[#0E121A] border border-[#222938] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white truncate max-w-[150px]">{k.keyword}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        k.status === "optimal"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : k.status === "low"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {k.status.toUpperCase()} ({k.densityPercent}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Found {k.count} times in text
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-2.5">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Content Checklist
            </h3>
            <div className="space-y-2 text-xs">
              {analysis?.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#0E121A] border border-[#222938] text-gray-300 leading-relaxed flex items-start gap-2">
                  <span className="text-[#FF642D] font-bold mt-0.5">•</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ContentOptimizerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading Content Assistant...</div>}>
      <ContentOptimizerContent />
    </Suspense>
  );
}
