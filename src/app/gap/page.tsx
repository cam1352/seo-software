"use client";

import { useState } from "react";
import { GitCompare, Search, Globe, TrendingUp, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CompetitorGapPage() {
  const [domain1, setDomain1] = useState("seo-software.com");
  const [domain2, setDomain2] = useState("semrush.com");
  const [domain3, setDomain3] = useState("ahrefs.com");
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<"missing" | "weak" | "shared">("missing");

  // Simulated keyword gap data
  const gapData = [
    {
      keyword: "free backlink checker",
      volume: 33100,
      difficulty: 62,
      intent: "Commercial",
      yourRank: "-",
      comp1Rank: 2,
      comp2Rank: 1,
      type: "missing",
    },
    {
      keyword: "best seo software for small business",
      volume: 14800,
      difficulty: 48,
      intent: "Commercial",
      yourRank: "-",
      comp1Rank: 4,
      comp2Rank: 5,
      type: "missing",
    },
    {
      keyword: "automated indexnow submitter",
      volume: 9800,
      difficulty: 29,
      intent: "Transactional",
      yourRank: 1,
      comp1Rank: 12,
      comp2Rank: "-",
      type: "shared",
    },
    {
      keyword: "technical seo audit checklist",
      volume: 22400,
      difficulty: 54,
      intent: "Informational",
      yourRank: 8,
      comp1Rank: 1,
      comp2Rank: 3,
      type: "weak",
    },
    {
      keyword: "keyword magic tool alternative",
      volume: 12100,
      difficulty: 38,
      intent: "Commercial",
      yourRank: "-",
      comp1Rank: 3,
      comp2Rank: "-",
      type: "missing",
    },
    {
      keyword: "generative engine optimization tool",
      volume: 18500,
      difficulty: 32,
      intent: "Commercial",
      yourRank: 1,
      comp1Rank: "-",
      comp2Rank: "-",
      type: "shared",
    },
    {
      keyword: "website authority score check",
      volume: 19200,
      difficulty: 59,
      intent: "Informational",
      yourRank: 11,
      comp1Rank: 2,
      comp2Rank: 4,
      type: "weak",
    },
  ];

  const filteredData = gapData.filter((item) => {
    if (activeTab === "missing") return item.type === "missing";
    if (activeTab === "weak") return item.type === "weak";
    return item.type === "shared";
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <GitCompare className="w-6 h-6 text-[#FF642D]" />
            Competitor Keyword & Content Gap Analysis
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Uncover high-intent keywords that competitors rank for, but your domain is currently missing.
          </p>
        </div>
      </div>

      {/* Domain Inputs */}
      <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-emerald-400 block mb-1">Your Domain</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={domain1}
                onChange={(e) => setDomain1(e.target.value)}
                className="w-full bg-[#0E121A] text-sm text-gray-100 pl-10 pr-3 py-2 rounded-lg border border-emerald-500/40 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Competitor Domain 1</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={domain2}
                onChange={(e) => setDomain2(e.target.value)}
                className="w-full bg-[#0E121A] text-sm text-gray-100 pl-10 pr-3 py-2 rounded-lg border border-[#283244] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Competitor Domain 2</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={domain3}
                onChange={(e) => setDomain3(e.target.value)}
                className="w-full bg-[#0E121A] text-sm text-gray-100 pl-10 pr-3 py-2 rounded-lg border border-[#283244] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setAnalyzing(true)}
            className="px-6 py-2.5 rounded-lg bg-[#FF642D] hover:bg-[#E55724] text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#FF642D]/20 transition-all cursor-pointer"
          >
            <GitCompare className="w-4 h-4" />
            Analyze Keyword Gaps
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#141824] p-1.5 rounded-xl border border-[#232B3B] text-xs font-semibold">
        <button
          onClick={() => setActiveTab("missing")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === "missing" ? "bg-red-500 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Missing Keywords (High Opportunity)
        </button>
        <button
          onClick={() => setActiveTab("weak")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === "weak" ? "bg-amber-500 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Weak Keywords (Competitors Outrank You)
        </button>
        <button
          onClick={() => setActiveTab("shared")}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeTab === "shared" ? "bg-emerald-600 text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          Winning / Shared Keywords
        </button>
      </div>

      {/* Gap Table */}
      <div className="rounded-xl bg-[#141824] border border-[#232B3B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E121A] text-gray-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Keyword</th>
                <th className="py-3 px-4">Search Volume</th>
                <th className="py-3 px-4">KD%</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4 text-emerald-400 font-bold">Your Rank ({domain1})</th>
                <th className="py-3 px-4">{domain2}</th>
                <th className="py-3 px-4">{domain3}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D2330]">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#181E2B] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {item.keyword}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-200">
                    {item.volume.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-400">
                    {item.difficulty}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#202737] text-gray-300 font-mono text-[10px]">
                      {item.intent}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {item.yourRank === "-" ? "Not Ranked" : `#${item.yourRank}`}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">
                    {item.comp1Rank === "-" ? "-" : `#${item.comp1Rank}`}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">
                    {item.comp2Rank === "-" ? "-" : `#${item.comp2Rank}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
