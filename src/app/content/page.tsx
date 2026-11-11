"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Sparkles,
  Clock,
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            Semrush SEO Writing Assistant Clone
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600" />
            SEO Writing Assistant & Content Optimizer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time readability analysis, keyword density tracking, and on-page optimization recommendations.
          </p>
        </div>
      </div>

      {/* Target Keywords Input */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Target Keywords (comma-separated):</label>
        <input
          type="text"
          value={keywordsInput}
          onChange={(e) => setKeywordsInput(e.target.value)}
          placeholder="e.g. seo software, site audit, rank #1"
          className="flex-1 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
        />
      </div>

      {/* Editor & Metrics Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Editor Box */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
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
            className="w-full bg-white p-5 text-sm text-slate-900 font-mono focus:outline-none resize-y leading-relaxed"
            placeholder="Paste or compose your article draft here..."
          />
        </div>

        {/* Real-Time Metrics Sidebar */}
        <div className="space-y-4">
          {/* SEO Score & Readability Card */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Content SEO Score</span>
              <span className="text-2xl font-black text-blue-600">{analysis?.score || 0}/100</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${analysis?.score || 0}%` }}
              />
            </div>

            {/* Readability */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Flesch Reading Ease:</span>
                <span className="font-bold text-slate-900">{analysis?.readability.fleschReadingEase}/100</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Target Audience Level:</span>
                <span className="font-semibold text-indigo-600">{analysis?.readability.gradeLevel}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ease Label:</span>
                <span className="font-semibold text-emerald-600">{analysis?.readability.readingEaseLabel}</span>
              </div>
            </div>
          </div>

          {/* Keyword Density Tracker */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Keyword Density Analysis</h3>
            <div className="space-y-2.5">
              {analysis?.keywordsAnalysis.map((k) => (
                <div key={k.keyword} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900 truncate max-w-[150px]">{k.keyword}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                        k.status === "optimal"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : k.status === "low"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {k.status.toUpperCase()} ({k.densityPercent}%)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Found {k.count} times in text
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Content Checklist
            </h3>
            <div className="space-y-2 text-xs">
              {analysis?.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
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
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Content Assistant...</div>}>
      <ContentOptimizerContent />
    </Suspense>
  );
}
