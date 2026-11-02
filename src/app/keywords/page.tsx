"use client";

import { Suspense,  useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Download,
  Filter,
  Copy,
  Check,
  Sparkles,
  ArrowUpDown,
  HelpCircle,
  ExternalLink,
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
    if (kd < 30) return { label: "Very Easy", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
    if (kd < 50) return { label: "Easy", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" };
    if (kd < 70) return { label: "Possible", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
    if (kd < 85) return { label: "Difficult", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" };
    return { label: "Hard", color: "bg-red-500/20 text-red-300 border-red-500/30" };
  };

  const getIntentBadge = (intent: KeywordItem["intent"]) => {
    switch (intent) {
      case "Transactional":
        return { label: "T", desc: "Transactional", bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" };
      case "Commercial":
        return { label: "C", desc: "Commercial", bg: "bg-amber-500/20 text-amber-300 border-amber-500/40" };
      case "Navigational":
        return { label: "N", desc: "Navigational", bg: "bg-blue-500/20 text-blue-300 border-blue-500/40" };
      default:
        return { label: "I", desc: "Informational", bg: "bg-purple-500/20 text-purple-300 border-purple-500/40" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Search className="w-6 h-6 text-[#FF642D]" />
            Keyword Magic Tool
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Explore live search suggestions, intent classification, difficulty (KD%), and topic clustering.
          </p>
        </div>

        {keywords.length > 0 && (
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161C27] border border-[#283244] text-xs font-semibold text-gray-200 hover:text-white hover:border-gray-500 transition-all self-start md:self-auto"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            Export CSV ({filteredKeywords.length})
          </button>
        )}
      </div>

      {/* Seed Search Form */}
      <form onSubmit={handleSearch} className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value)}
            placeholder="Enter seed keyword (e.g. running shoes, crm, ai seo)..."
            className="w-full bg-[#0E121A] text-sm text-gray-100 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-[#FF642D]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-[#FF642D] hover:bg-[#E55724] disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#FF642D]/20 transition-all"
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
      <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Match Type Pills */}
        <div className="flex items-center gap-1.5 bg-[#0E121A] p-1 rounded-lg border border-[#232B3B]">
          <button
            onClick={() => setMatchType("broad")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "broad" ? "bg-[#FF642D] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Broad Match
          </button>
          <button
            onClick={() => setMatchType("phrase")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "phrase" ? "bg-[#FF642D] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Phrase Match
          </button>
          <button
            onClick={() => setMatchType("questions")}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              matchType === "questions" ? "bg-[#FF642D] text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Questions
          </button>
        </div>

        {/* Intent Selector */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Intent:</span>
          {["ALL", "Informational", "Commercial", "Transactional", "Navigational"].map((int) => (
            <button
              key={int}
              onClick={() => setSelectedIntent(int)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedIntent === int
                  ? "bg-[#252E3E] text-white border border-gray-600"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {int === "ALL" ? "All" : int.slice(0, 4)}
            </button>
          ))}
        </div>

        {/* Max KD% Range */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Max KD%:</span>
          <select
            value={maxKd}
            onChange={(e) => setMaxKd(Number(e.target.value))}
            className="bg-[#0E121A] text-gray-200 px-2 py-1 rounded border border-[#283244] focus:outline-none"
          >
            <option value={100}>Any KD% (0-100)</option>
            <option value={49}>Easy only (&lt; 50%)</option>
            <option value={29}>Very Easy (&lt; 30%)</option>
          </select>
        </div>
      </div>

      {/* Keywords Table */}
      <div className="rounded-xl bg-[#141824] border border-[#232B3B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0E121A] text-gray-400 uppercase tracking-wider font-semibold border-b border-[#232B3B]">
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
            <tbody className="divide-y divide-[#1D2330]">
              {filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    {loading ? "Gathering live keyword intelligence..." : "No keywords match your selected filters."}
                  </td>
                </tr>
              ) : (
                filteredKeywords.map((k, idx) => {
                  const kdInfo = getKdBadge(k.difficulty);
                  const intentInfo = getIntentBadge(k.intent);

                  return (
                    <tr key={idx} className="hover:bg-[#181E2B] transition-colors group">
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(k.keyword)}
                            title="Copy keyword"
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            {copiedKw === k.keyword ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
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

                      <td className="py-3.5 px-4 font-mono font-semibold text-gray-200">
                        {k.volume.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${kdInfo.color}`}>
                            {k.difficulty}%
                          </span>
                          <span className="text-[10px] text-gray-400 hidden sm:inline">{kdInfo.label}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-gray-300">
                        ${k.cpc.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {k.serpFeatures.map((feat) => (
                            <span
                              key={feat}
                              className="px-1.5 py-0.5 rounded bg-[#202736] text-[10px] text-gray-300 font-mono"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => router.push(`/content?kw=${encodeURIComponent(k.keyword)}`)}
                          className="px-2.5 py-1 rounded bg-[#222938] hover:bg-[#FF642D] hover:text-white text-gray-300 text-[11px] font-semibold transition-all inline-flex items-center gap-1"
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
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading Keyword Magic...</div>}>
      <KeywordsContent />
    </Suspense>
  );
}
