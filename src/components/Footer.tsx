import Link from "next/link";
import { Zap, HelpCircle, BookOpen, FileText, Activity, Search, Sparkles, Link2, Terminal, Shield, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 text-slate-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Value Prop */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/25">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                SEO <span className="text-blue-600">Software</span>
              </span>
              <span className="text-[10px] uppercase font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                $99/mo
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The rank #1 alternative to Semrush ($139.95/mo). Real-time 25-checkpoint technical crawls, automated IndexNow backlink engine, and dual GEO AI citation tracking.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All crawlers & IndexNow nodes active</span>
            </div>
          </div>

          {/* Col 2: FAQs, Blogs & Knowledge Base (Highlighted) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Knowledge Base & Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/faq"
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></span>
                  <span>1,000 Programmatic FAQs</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200">
                    Schema JSON-LD
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></span>
                  <span>100 Ranking Blog Guides</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                    Blueprint #1
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3 h-3 text-slate-400" />
                  <span>Local SEO by City (Multi-Location)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core SEO Engines */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Search Intelligence
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/audit" className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Activity className="w-3 h-3 text-slate-400" />
                  <span>Technical Site Audit Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/keywords" className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Keyword Magic Tool</span>
                </Link>
              </li>
              <li>
                <Link href="/geo" className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>GEO AI Citation Tracker</span>
                </Link>
              </li>
              <li>
                <Link href="/backlinks" className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Link2 className="w-3 h-3 text-emerald-500" />
                  <span>Auto Backlink Hub (IndexNow)</span>
                </Link>
              </li>
              <li>
                <Link href="/domain" className="text-slate-600 hover:text-blue-600 transition-colors">
                  <span>Domain Authority Overview</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Developer */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-600" />
              Platform & Pricing
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pricing" className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <span>Pro Plan ($99/mo)</span>
                  <span className="text-[10px] text-blue-600 font-normal">vs Semrush $139.95</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                  <Terminal className="w-3 h-3 text-slate-400" />
                  <span>Platform Settings & Crawler</span>
                </Link>
              </li>
              <li>
                <Link href="/content" className="text-slate-600 hover:text-blue-600 transition-colors">
                  <span>SEO Writing Assistant</span>
                </Link>
              </li>
              <li>
                <Link href="/gap" className="text-slate-600 hover:text-blue-600 transition-colors">
                  <span>Competitor Gap Analysis</span>
                </Link>
              </li>
              <li>
                <a href="mailto:support@seosoftware.io" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Support: support@seosoftware.io</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} SEO Software. Built for high-velocity search domination & Generative Engine Optimization.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="mailto:support@seosoftware.io" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Mail className="w-3 h-3" />
              <span>Contact</span>
            </a>
            <Link href="/faq" className="hover:text-blue-600 transition-colors">FAQs</Link>
            <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/settings" className="hover:text-blue-600 transition-colors">Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
