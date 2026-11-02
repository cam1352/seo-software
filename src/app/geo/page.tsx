"use client";

import { Suspense,  useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Globe,
  Bot,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { GeoReport } from "@/lib/types";

function GeoTrackerContent() {
  const searchParams = useSearchParams();

  const [targetInput, setTargetInput] = useState(searchParams.get("target") || "apex-seo");
  const [queryInput, setQueryInput] = useState(searchParams.get("query") || "best open source seo tools");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<GeoReport | null>(null);
  const [activeTab, setActiveTab] = useState<"ai" | "geo">("ai");

  const fetchGeoReport = async (target: string, query: string) => {
    if (!target.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: target.trim(), query: query.trim() }),
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = searchParams.get("target");
    if (t) {
      setTargetInput(t);
      fetchGeoReport(t, queryInput);
    } else {
      fetchGeoReport(targetInput, queryInput);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGeoReport(targetInput, queryInput);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-purple-400" />
            GEO & AI Visibility Tracker
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Track citations in AI answer engines (ChatGPT, Perplexity, Google AI Overviews) and multi-region geographic rankings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#141824] p-1 rounded-lg border border-[#232B3B] self-start md:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "ai" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            Generative Engines (AI)
          </button>
          <button
            onClick={() => setActiveTab("geo")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "geo" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4" />
            Geographic SERP Tracking
          </button>
        </div>
      </div>

      {/* Target & Query Search Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-[11px] font-semibold text-gray-400 block mb-1">Brand or Domain</label>
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            placeholder="e.g. stripe, openai, yourbrand.com"
            className="w-full bg-[#0E121A] text-sm text-gray-100 px-3 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-gray-400 block mb-1">Target Keyword Topic</label>
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="e.g. best payment gateway"
            className="w-full bg-[#0E121A] text-sm text-gray-100 px-3 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition-all"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing GEO...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Track GEO Visibility
              </>
            )}
          </button>
        </div>
      </form>

      {report && (
        <>
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400">GEO Visibility Score</span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-purple-400">{report.overallVisibilityScore}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <span className="text-[11px] text-emerald-400 mt-1 block">High AI Presence</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400">AI Citation Share</span>
              <div className="mt-2 text-2xl font-black text-white">
                {report.citationSharePercent}%
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Across 5 AI Engines</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400">Top Geo Rank</span>
              <div className="mt-2 text-2xl font-black text-emerald-400">
                #{report.geoLocations[0]?.rankingPosition || 1}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">In {report.geoLocations[0]?.countryName}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400">Local Pack Presence</span>
              <div className="mt-2 text-2xl font-black text-blue-400">
                {report.geoLocations.filter((g) => g.hasLocalPack).length} / 12
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Countries with Maps 3-Pack</span>
            </div>
          </div>

          {/* Tab 1: AI Engines */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-400" />
                Generative AI Citations & Answers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.aiEngines.map((engine, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] hover:border-purple-500/40 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{engine.engine}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            engine.cited
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-gray-700/50 text-gray-400"
                          }`}
                        >
                          {engine.cited ? `Cited (Source #${engine.citationRank})` : "Not Cited"}
                        </span>
                      </div>
                      <span className="text-xs text-purple-400 font-mono font-semibold">
                        {engine.confidenceScore}% Confidence
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938] text-xs text-gray-300 leading-relaxed font-sans">
                      <strong className="text-gray-400 block mb-1">Simulated AI Answer Snippet:</strong>
                      "{engine.snippet}"
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Sentiment: <strong className="text-emerald-400">{engine.sentiment}</strong></span>
                      <span className="text-[11px] text-gray-500 truncate max-w-[200px]" title={engine.recommendedQuery}>
                        Winning Query: {engine.recommendedQuery}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actionable Insights */}
              <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
                <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  GEO Actionable Insights & Optimization Checklist
                </h3>
                <div className="space-y-2 text-xs text-gray-300">
                  {report.actionableInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#0E121A] border border-[#222938]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Geographic SERP Tracking */}
          {activeTab === "geo" && (
            <div className="rounded-xl bg-[#141824] border border-[#232B3B] overflow-hidden">
              <div className="p-4 border-b border-[#232B3B] flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  Multi-Country SERP Performance (12 Regions)
                </h2>
                <span className="text-xs text-gray-400">Localized Search Queries</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0E121A] text-gray-400 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Region</th>
                      <th className="py-3 px-4">Rank Position</th>
                      <th className="py-3 px-4">Local Search Volume</th>
                      <th className="py-3 px-4">Estimated CPC</th>
                      <th className="py-3 px-4">Local Maps Pack</th>
                      <th className="py-3 px-4">Top Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D2330]">
                    {report.geoLocations.map((loc, idx) => (
                      <tr key={idx} className="hover:bg-[#181E2B] transition-colors">
                        <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                          <span className="w-6 text-center font-mono text-[10px] bg-[#222938] px-1 py-0.5 rounded text-gray-300">
                            {loc.countryCode}
                          </span>
                          <span>{loc.countryName}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                              loc.rankingPosition <= 3
                                ? "bg-emerald-500/20 text-emerald-300"
                                : loc.rankingPosition <= 10
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-amber-500/20 text-amber-300"
                            }`}
                          >
                            #{loc.rankingPosition}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono text-gray-200">
                          {loc.searchVolume.toLocaleString()} /mo
                        </td>

                        <td className="py-3 px-4 font-mono text-gray-300">
                          ${loc.cpc.toFixed(2)}
                        </td>

                        <td className="py-3 px-4">
                          {loc.hasLocalPack ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              Maps Pack Active
                            </span>
                          ) : (
                            <span className="text-gray-500 text-[11px]">Standard SERP</span>
                          )}
                        </td>

                        <td className="py-3 px-4 font-mono text-gray-400 truncate max-w-[180px]">
                          {loc.serpTopResult}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


export default function GeoTrackerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading GEO Tracker...</div>}>
      <GeoTrackerContent />
    </Suspense>
  );
}
