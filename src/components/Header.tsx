"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, Plus, Sparkles, Terminal, Menu, Zap } from "lucide-react";

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

  const openMobileMenu = () => {
    window.dispatchEvent(new Event("toggle-mobile-menu"));
  };

  return (
    <header className="h-16 bg-[#11151D] border-b border-[#222938] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 gap-3">
      {/* Mobile Brand & Hamburger Button */}
      <div className="flex items-center gap-2.5 md:hidden">
        <button
          onClick={openMobileMenu}
          className="p-2 rounded-lg bg-[#181E2A] text-gray-300 hover:text-white border border-[#2B3447]"
          title="Open Menu"
        >
          <Menu className="w-4 h-4 text-[#FF642D]" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF642D] to-[#FF895A] flex items-center justify-center font-bold text-white text-xs">
            ⚡
          </div>
          <span className="font-extrabold text-sm text-white">SEO <span className="text-[#FF642D]">Software</span></span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Audit URL or research keyword..."
            className="w-full bg-[#181E2A] text-xs sm:text-sm text-gray-100 placeholder-gray-400 pl-9 pr-3 py-2 rounded-lg border border-[#2B3447] focus:outline-none focus:border-[#FF642D] transition-all"
          />
        </div>
      </form>

      {/* Right Action buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => router.push("/geo")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold hover:bg-purple-500/20 transition-all"
          title="GEO Tracker"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">GEO Tracker</span>
        </button>

        <button
          onClick={() => router.push("/backlinks")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
          title="Submit Backlinks"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Submit Backlinks</span>
        </button>
      </div>
    </header>
  );
}
