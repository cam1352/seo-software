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
  Mail,
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
  { name: "Pricing ($99/mo)", href: "/pricing", icon: DollarSign, badge: "$99" },
  { name: "Contact Support", href: "/contact", icon: Mail },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-menu", handleToggle);
    return () => window.removeEventListener("toggle-mobile-menu", handleToggle);
  }, []);

  return (
    <>
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col shrink-0 min-h-screen sticky top-0 h-screen shadow-sm">
        {/* Brand logo header */}
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">SEO <span className="text-blue-600">Software</span></span>
              <span className="text-[10px] uppercase font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200">$99</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Rank #1 Search Engine Suite</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
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
                    ? "bg-blue-50 text-blue-700 font-bold border-l-2 border-blue-600 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      item.badge === "NEW"
                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                        : item.badge === "AUTO"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.badge === "$99"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
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
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
            <span className="flex items-center gap-1.5 font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Pro Plan ($99/mo)
            </span>
            <span className="text-[10px] text-blue-600 font-mono font-bold">1,000 FAQs</span>
          </div>
          <p className="text-[11px] text-slate-500">Live Crawlers & IndexNow Engine</p>
        </div>
      </aside>

      {/* 2. MOBILE DRAWER OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative w-72 max-w-[80vw] bg-white border-r border-slate-200 flex flex-col h-full shadow-2xl z-10">
            <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow">
                  ⚡
                </div>
                <div>
                  <span className="font-extrabold text-base text-slate-900">SEO <span className="text-blue-600">Software</span></span>
                  <span className="text-[9px] block text-blue-600 font-bold">$99/mo Pro</span>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-blue-50 text-blue-600 border border-blue-200">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-600 space-y-1.5">
              <span className="font-bold text-slate-900 block">SEO Software Pro</span>
              <p className="text-[11px] text-slate-500">Resources available at the footer:</p>
              <div className="flex items-center gap-3 pt-0.5 text-xs font-semibold text-blue-600">
                <Link href="/faq" onClick={() => setMobileOpen(false)} className="hover:underline flex items-center gap-1">
                  ❓ FAQs
                </Link>
                <span>•</span>
                <Link href="/blogs" onClick={() => setMobileOpen(false)} className="hover:underline flex items-center gap-1">
                  📚 Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around text-[10px] font-medium text-slate-500 shadow-sm">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/" ? "text-blue-600 font-bold" : "text-slate-500"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link
          href="/audit"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/audit" ? "text-blue-600 font-bold" : "text-slate-500"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Audit</span>
        </Link>
        <Link
          href="/keywords"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/keywords" ? "text-blue-600 font-bold" : "text-slate-500"
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Keywords</span>
        </Link>
        <Link
          href="/geo"
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-md ${
            pathname === "/geo" ? "text-blue-600 font-bold" : "text-slate-500"
          }`}
        >
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>GEO AI</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-md text-slate-500 hover:text-slate-800"
        >
          <Menu className="w-4 h-4 text-blue-600" />
          <span>Menu</span>
        </button>
      </div>
    </>
  );
}
