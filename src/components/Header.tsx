"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Sparkles, Menu, Zap } from "lucide-react";

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
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 gap-3 shadow-sm">
      {/* Mobile Brand & Hamburger Button */}
      <div className="flex items-center gap-2.5 md:hidden">
        <button
          onClick={openMobileMenu}
          className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-4 h-4 text-blue-600" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-sm shadow-blue-500/25">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-sm text-slate-900">SEO <span className="text-blue-600">Software</span></span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Audit any URL or research keyword..."
            className="w-full bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </form>

      {/* Right Action buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => router.push("/geo")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-all"
          title="GEO AI Tracker"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">GEO Tracker</span>
        </button>

        <button
          onClick={() => router.push("/backlinks")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition-all"
          title="Submit Backlinks"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Submit Backlinks</span>
        </button>
      </div>
    </header>
  );
}
