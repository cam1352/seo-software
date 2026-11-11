"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Globe,
  TrendingUp,
  Search,
  ExternalLink,
  Users,
  Link2,
  Award,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DomainMetrics } from "@/lib/types";

function DomainOverviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [domainInput, setDomainInput] = useState(searchParams.get("domain") || "github.com");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DomainMetrics | null>(null);

  const fetchDomain = async (domain: string) => {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domain.trim() }),
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const d = searchParams.get("domain");
    if (d) {
      setDomainInput(d);
      fetchDomain(d);
    } else {
      fetchDomain(domainInput);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDomain(domainInput);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-blue-600" />
            Domain Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Analyze domain authority, estimated organic traffic, keyword distributions, and organic competitors.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/audit?url=https://${data.domain}`)}
              className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all"
            >
              Audit Site
            </button>
            <button
              onClick={() => router.push(`/geo?target=${data.domain}`)}
              className="px-3.5 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Check GEO Citations
            </button>
          </div>
        )}
      </div>

      {/* Domain Input Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="Enter root domain (e.g. stripe.com, openai.com)..."
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
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze Domain
            </>
          )}
        </button>
      </form>

      {data && (
        <>
          {/* Metrics Tiles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Authority Score
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">{data.authorityScore}</span>
                <span className="text-xs text-slate-400">/100</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">High Domain Trust</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" /> Organic Traffic
              </span>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {data.organicTrafficMonthly.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Monthly Visits (Est.)</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-indigo-600" /> Total Keywords
              </span>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {data.totalOrganicKeywords.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Indexed Keywords</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-emerald-600" /> Total Backlinks
              </span>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {data.backlinksCount.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Inbound Links</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-600" /> Referring Domains
              </span>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {data.referringDomainsCount.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Unique Root Domains</span>
            </div>
          </div>

          {/* Traffic Intent & Ranking Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Search Intent Distribution */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                Search Intent Breakdown
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-indigo-600 font-semibold">Informational (Guides, How-to)</span>
                    <span className="font-mono text-slate-900 font-bold">{data.intentDistribution.informational}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${data.intentDistribution.informational}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-amber-600 font-semibold">Commercial (Reviews, Best, Top)</span>
                    <span className="font-mono text-slate-900 font-bold">{data.intentDistribution.commercial}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${data.intentDistribution.commercial}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-emerald-600 font-semibold">Transactional (Buy, Pricing, Deals)</span>
                    <span className="font-mono text-slate-900 font-bold">{data.intentDistribution.transactional}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.intentDistribution.transactional}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-blue-600 font-semibold">Navigational (Brand, Logins)</span>
                    <span className="font-mono text-slate-900 font-bold">{data.intentDistribution.navigational}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${data.intentDistribution.navigational}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking Positions Distribution */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Ranking Position Distribution
              </h2>

              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-emerald-600 font-bold block text-sm">{data.rankingsDistribution.top3.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] uppercase mt-1 block font-semibold">Pos 1-3</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-teal-600 font-bold block text-sm">{data.rankingsDistribution.pos4_10.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] uppercase mt-1 block font-semibold">Pos 4-10</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-blue-600 font-bold block text-sm">{data.rankingsDistribution.pos11_20.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] uppercase mt-1 block font-semibold">Pos 11-20</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-amber-600 font-bold block text-sm">{data.rankingsDistribution.pos21_50.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] uppercase mt-1 block font-semibold">Pos 21-50</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 font-bold block text-sm">{data.rankingsDistribution.pos51_100.toLocaleString()}</span>
                  <span className="text-slate-400 text-[10px] uppercase mt-1 block font-semibold">Pos 51-100</span>
                </div>
              </div>

              {/* Branded vs Non Branded */}
              <div className="pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600 mb-1 font-medium">
                  <span>Branded Search Traffic ({data.brandedTrafficPercent}%)</span>
                  <span>Non-Branded Search Traffic ({data.nonBrandedTrafficPercent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 flex overflow-hidden">
                  <div className="bg-blue-600" style={{ width: `${data.brandedTrafficPercent}%` }} />
                  <div className="bg-sky-400" style={{ width: `${data.nonBrandedTrafficPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Organic Competitors Table */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Main Organic Competitors
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Competitor Domain</th>
                    <th className="py-2.5 px-4">Competition Level</th>
                    <th className="py-2.5 px-4">Common Keywords</th>
                    <th className="py-2.5 px-4">Organic Traffic</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.competitors.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>{comp.domain}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-600 font-bold">{comp.competitionLevel}%</span>
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${comp.competitionLevel}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {comp.commonKeywords.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700 font-medium">
                        {comp.organicTraffic.toLocaleString()} visits/mo
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => router.push(`/gap?domain1=${data.domain}&domain2=${comp.domain}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-semibold transition-all inline-flex items-center gap-1"
                        >
                          Compare Gap
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function DomainOverviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Domain Overview...</div>}>
      <DomainOverviewContent />
    </Suspense>
  );
}
