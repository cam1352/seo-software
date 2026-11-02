"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, Plus, Sparkles, Terminal } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (query.includes(".") || query.includes("http")) {
      router.push(`/audit?url=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/keywords?seed=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-[#11151D] border-b border-[#222938] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Audit any URL (e.g. stripe.com) or research keyword (e.g. ai seo)..."
            className="w-full bg-[#181E2A] text-sm text-gray-100 placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg border border-[#2B3447] focus:outline-none focus:border-[#FF642D] focus:ring-1 focus:ring-[#FF642D] transition-all"
          />
        </div>
      </form>

      {/* Right Action buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/geo")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold hover:bg-purple-500/20 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          GEO Tracker
        </button>

        <button
          onClick={() => router.push("/backlinks")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          Submit Backlinks
        </button>

        <button
          onClick={() => router.push("/settings")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181E2A] text-gray-300 border border-[#2B3447] text-xs font-medium hover:text-white hover:border-gray-500 transition-all"
          title="MCP AI Agent endpoint"
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          MCP Ready
        </button>
      </div>
    </header>
  );
}
