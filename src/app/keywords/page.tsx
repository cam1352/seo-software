"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Download,
  Filter,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { KeywordItem } from "@/lib/types";

function KeywordsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [seedInput, setSeedInput] = useState(searchParams.get("seed") || "ai seo tools");
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<KeywordItem[]>([]);
  const [matchType, setMatchType] = useState<"broad" | "phrase" | "questions">("broad");
  const [selectedIntent, setSelectedIntent] = useState<string>("ALL");
  const [maxKd, setMaxKd] = useState<number>(100);
  const [copiedKw, setCopiedKw] = useState<string | null>(null);

  const fetchKeywords = async (seed: string) => {
    if (!seed.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: seed.trim() }),
      });
      const data = await res.json();
      if (data.keywords) {
        setKeywords(data.keywords);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const s = searchParams.get("seed");
    if (s) {
      setSeedInput(s);
      fetchKeywords(s);
    } else {
      fetchKeywords(seedInput);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchKeywords(seedInput);
  };

  const copyToClipboard = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKw(kw);
    setTimeout(() => setCopiedKw(null), 1500);
  };

  const exportCsv = () => {
    if (keywords.length === 0) return;
    const headers = ["Keyword", "Intent", "Volume", "Difficulty (KD%)", "CPC ($)", "Category"];
    const rows = filteredKeywords.map((k) => [
      `"${k.keyword}"`,
      k.intent,
      k.volume,
      k.difficulty,
      k.cpc,
      k.category || "General",
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `keywords-${seedInput.replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter pipeline
  const filteredKeywords = keywords.filter((k) => {
    if (matchType === "questions") {
      const qWords = ["how", "what", "why", "where", "who", "when", "is", "can", "should"];
      const startsWithQ = qWords.some((qw) => k.keyword.toLowerCase().startsWith(qw));
      if (!startsWithQ && !k.keyword.includes("?")) return false;
    } else if (matchType === "phrase") {
      if (!k.keyword.toLowerCase().includes(seedInput.toLowerCase())) return false;
    }

    if (selectedIntent !== "ALL" && k.intent !== selectedIntent) {
      return false;
    }

    if (k.difficulty > maxKd) {
      return false;
    }

    return true;
  });

  const getKdBadge = (kd: number) => {
    if (kd < 30) return { label: "Very Easy", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    if (kd < 50) return { label: "Easy", color: "bg-teal-50 text-teal-700 border-teal-200" };
    if (kd < 70) return { label: "Possible", color: "bg-amber-50 text-amber-700 border-amber-200" };
    if (kd < 85) return { label: "Difficult", color: "bg-orange-50 text-orange-700 border-orange-200" };
    return { label: "Hard", color: "bg-red-50 text-red-700 border-red-200" };
  };

  const getIntentBadge = (intent: KeywordItem["intent"]) => {
    switch (intent) {
      case "Transactional":
        return { label: "T", desc: "Transactional", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "Commercial":
        return { label: "C", desc: "Commercial", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "Navigational":
        return { label: "N", desc: "Navigational", bg: "bg-blue-50 text-blue-700 border-blue-200" };
      default:
        return { label: "I", desc: "Informational", bg: "bg-indigo-50 text-indigo-700 border-indigo-200" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Search className="w-6 h-6 text-blue-600" />
            Keyword Magic Tool
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Explore live search suggestions, intent classification, difficulty (KD%), and topic clustering.
          </p>
        </div>

        {keywords.length > 0 && (
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all self-start md:self-auto"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            Export CSV ({filteredKeywords.length})
          </button>
        )}
      </div>

      {/* Seed Search Form */}
      <form onSubmit={handleSearch} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            placeholder="Enter seed keyword (e.g. running shoes, crm, ai seo)..."
            className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Search Keywords
            </>
          )}
        </button>
      </form>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Match Type Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setMatchType("broad")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "broad" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Broad Match
          </button>
          <button
            onClick={() => setMatchType("phrase")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "phrase" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Phrase Match
          </button>
          <button
            onClick={() => setMatchType("questions")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "questions" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Questions
          </button>
        </div>

        {/* Intent Selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Intent:</span>
          {["ALL", "Informational", "Commercial", "Transactional", "Navigational"].map((int) => (
            <button
              key={int}
              onClick={() => setSelectedIntent(int)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedIntent === int
                  ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {int === "ALL" ? "All" : int.slice(0, 4)}
            </button>
          ))}
        </div>

        {/* Max KD% Range */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Max KD%:</span>
          <select
            value={maxKd}
            onChange={(e) => setMaxKd(Number(e.target.value))}
            className="bg-white text-slate-800 px-2 py-1 rounded-md border border-slate-200 focus:outline-none focus:border-blue-600"
          >
            <option value={100}>Any KD% (0-100)</option>
            <option value={49}>Easy only (&lt; 50%)</option>
            <option value={29}>Very Easy (&lt; 30%)</option>
          </select>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Keyword</th>
                <th className="py-3.5 px-3">Intent</th>
                <th className="py-3.5 px-4">Volume</th>
                <th className="py-3.5 px-4">KD%</th>
                <th className="py-3.5 px-4">CPC</th>
                <th className="py-3.5 px-4">SERP Features</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    {loading ? "Gathering live keyword intelligence..." : "No keywords match your selected filters."}
                  </td>
                </tr>
              ) : (
                filteredKeywords.map((k, idx) => {
                  const kdInfo = getKdBadge(k.difficulty);
                  const intentInfo = getIntentBadge(k.intent);

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(k.keyword)}
                            title="Copy keyword"
                            className="text-slate-400 hover:text-slate-700 transition-colors"
                          >
                            {copiedKw === k.keyword ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span>{k.keyword}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`w-6 h-6 inline-flex items-center justify-center rounded-md font-bold text-[11px] border ${intentInfo.bg}`}
                          title={intentInfo.desc}
                        >
                          {intentInfo.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                        {k.volume.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${kdInfo.color}`}>
                            {k.difficulty}%
                          </span>
                          <span className="text-[10px] text-slate-500 hidden sm:inline">{kdInfo.label}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-700">
                        ${k.cpc.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {k.serpFeatures.map((feat) => (
                            <span
                              key={feat}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 font-mono border border-slate-200"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => router.push(`/content?kw=${encodeURIComponent(k.keyword)}`)}
                          className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-semibold transition-all inline-flex items-center gap-1"
                          title="Optimize in SEO Content Assistant"
                        >
                          Write
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function KeywordsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Keyword Magic...</div>}>
      <KeywordsContent />
    </Suspense>
  );
}
