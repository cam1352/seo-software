"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Search,
  Activity,
  Sparkles,
  Link2,
  FileText,
  GitCompare,
  Settings,
  HelpCircle,
  BookOpen,
  DollarSign,
  Zap,
  Menu,
  X,
} from "lucide-react";

export const NAVIGATION = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Domain Overview", href: "/domain", icon: Globe },
  { name: "Keyword Magic Tool", href: "/keywords", icon: Search },
  { name: "Technical Site Audit", href: "/audit", icon: Activity },
  { name: "GEO & AI Visibility", href: "/geo", icon: Sparkles, badge: "NEW" },
  { name: "Auto Backlink Hub", href: "/backlinks", icon: Link2, badge: "AUTO" },
  { name: "SEO Writing Assistant", href: "/content", icon: FileText },
  { name: "Competitor Gap", href: "/gap", icon: GitCompare },
  { name: "1,000 FAQs", href: "/faq", icon: HelpCircle, badge: "1,000" },
  { name: "Blogs & Guides", href: "/blogs", icon: BookOpen, badge: "100" },
  { name: "Pricing ($99/mo)", href: "/pricing", icon: DollarSign, badge: "$99" },
  { name: "Settings & MCP", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Listen to mobile menu toggle event dispatched from Header
  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-menu", handleToggle);
    return () => window.removeEventListener("toggle-mobile-menu", handleToggle);
  }, []);

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (hidden on mobile, visible on md and up) */}
      <aside className="hidden md:flex w-64 bg-[#11151D] border-r border-[#222938] flex-col shrink-0 min-h-screen sticky top-0 h-screen">
        {/* Brand logo header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-[#222938]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF642D] to-[#FF895A] flex items-center justify-center shadow-lg shadow-[#FF642D]/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">SEO <span className="text-[#FF642D]">Software</span></span>
              <span className="text-[10px] uppercase font-bold bg-[#FF642D]/20 text-[#FF642D] px-1.5 py-0.5 rounded border border-[#FF642D]/30">$99</span>
            </div>
            <p className="text-[11px] text-gray-400">Rank #1 Search Engine Suite</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Search Intelligence
          </div>
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#FF642D]/10 text-[#FF642D] font-semibold border-l-2 border-[#FF642D]"
                    : "text-gray-300 hover:bg-[#1A202C] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#FF642D]" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      item.badge === "NEW"
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        : item.badge === "AUTO"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : item.badge === "$99"
                        ? "bg-[#FF642D]/20 text-[#FF642D] border border-[#FF642D]/40"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer status */}
        <div className="p-4 border-t border-[#222938] bg-[#0E121A]/50">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Pro Active ($99/mo)
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">1,000 FAQs</span>
          </div>
          <p className="text-[11px] text-gray-500">Live Crawlers & IndexNow Engine</p>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER OVERLAY (slide-out on mobile when toggled) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] bg-[#11151D] border-r border-[#222938] flex flex-col h-full shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="h-16 px-5 flex items-center justify-between border-b border-[#222938]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF642D] to-[#FF895A] flex items-center justify-center font-bold text-white text-sm">
                  ⚡
                </div>
                <div>
                  <span className="font-bold text-base text-white">SEO <span className="text-[#FF642D]">Software</span></span>
                  <span className="text-[9px] block text-[#FF642D] font-bold">$99/mo Pro</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white bg-[#1A202C]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
              {NAVIGATION.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#FF642D]/15 text-[#FF642D] font-bold"
                        : "text-gray-300 hover:bg-[#1A202C] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#FF642D]" : "text-gray-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-[#FF642D]/20 text-[#FF642D]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#222938] bg-[#0E121A] text-xs text-gray-400">
              <span className="font-bold text-white block">SEO Software Pro</span>
              <span className="text-[11px] text-emerald-400">1,000 FAQs • 100 Blogs Active</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. MOBILE BOTTOM NAVIGATION BAR (quick 1-tap switching) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#11151D]/95 backdrop-blur-md border-t border-[#222938] px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-gray-400">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/" ? "text-[#FF642D] font-bold" : "text-gray-400"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/audit"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/audit" ? "text-[#FF642D] font-bold" : "text-gray-400"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Audit</span>
        </Link>
        <Link
          href="/keywords"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/keywords" ? "text-[#FF642D] font-bold" : "text-gray-400"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Keywords</span>
        </Link>
        <Link
          href="/geo"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/geo" ? "text-purple-400 font-bold" : "text-gray-400"
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>GEO AI</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-md text-gray-300 hover:text-white"
        >
          <Menu className="w-4 h-4 text-[#FF642D]" />
          <span>Menu</span>
        </button>
      </div>
    </>
  );
}
