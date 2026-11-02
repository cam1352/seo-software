"use client";

import { Suspense,  useState, useEffect } from "react";
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Globe className="w-6 h-6 text-[#FF642D]" />
            Domain Overview
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Analyze domain authority, estimated organic traffic, keyword distributions, and organic competitors.
          </p>
        </div>

        {data && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/audit?url=https://${data.domain}`)}
              className="px-3.5 py-2 rounded-lg bg-[#161C27] border border-[#283244] text-xs font-semibold text-gray-200 hover:text-white hover:border-[#FF642D] transition-all"
            >
              Audit Site
            </button>
            <button
              onClick={() => router.push(`/geo?target=${data.domain}`)}
              className="px-3.5 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Check GEO Citations
            </button>
          </div>
        )}
      </div>

      {/* Domain Input Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex items-center gap-3">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            placeholder="Enter root domain (e.g. stripe.com, openai.com)..."
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
            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Authority Score
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-white">{data.authorityScore}</span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
              <span className="text-[11px] text-emerald-400 mt-1 block">High Domain Trust</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Organic Traffic
              </span>
              <div className="mt-2 text-2xl font-black text-white">
                {data.organicTrafficMonthly.toLocaleString()}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Monthly Visits (Est.)</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-purple-400" /> Total Keywords
              </span>
              <div className="mt-2 text-2xl font-black text-white">
                {data.totalOrganicKeywords.toLocaleString()}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Indexed Keywords</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-emerald-400" /> Total Backlinks
              </span>
              <div className="mt-2 text-2xl font-black text-white">
                {data.backlinksCount.toLocaleString()}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Inbound Links</span>
            </div>

            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B]">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" /> Referring Domains
              </span>
              <div className="mt-2 text-2xl font-black text-white">
                {data.referringDomainsCount.toLocaleString()}
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">Unique Root Domains</span>
            </div>
          </div>

          {/* Traffic Intent & Ranking Positions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Search Intent Distribution */}
            <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF642D]" />
                Search Intent Breakdown
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-purple-300">Informational (Guides, How-to)</span>
                    <span className="font-mono text-white">{data.intentDistribution.informational}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.intentDistribution.informational}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-amber-300">Commercial (Reviews, Best, Top)</span>
                    <span className="font-mono text-white">{data.intentDistribution.commercial}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${data.intentDistribution.commercial}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-emerald-300">Transactional (Buy, Pricing, Deals)</span>
                    <span className="font-mono text-white">{data.intentDistribution.transactional}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.intentDistribution.transactional}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 font-medium">
                    <span className="text-blue-300">Navigational (Brand, Logins)</span>
                    <span className="font-mono text-white">{data.intentDistribution.navigational}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0E121A] overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.intentDistribution.navigational}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking Positions Distribution */}
            <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Ranking Position Distribution
              </h2>

              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-emerald-400 font-bold block text-sm">{data.rankingsDistribution.top3.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px] uppercase mt-1 block">Pos 1-3</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-teal-400 font-bold block text-sm">{data.rankingsDistribution.pos4_10.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px] uppercase mt-1 block">Pos 4-10</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-blue-400 font-bold block text-sm">{data.rankingsDistribution.pos11_20.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px] uppercase mt-1 block">Pos 11-20</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-amber-400 font-bold block text-sm">{data.rankingsDistribution.pos21_50.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px] uppercase mt-1 block">Pos 21-50</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-gray-400 font-bold block text-sm">{data.rankingsDistribution.pos51_100.toLocaleString()}</span>
                  <span className="text-gray-500 text-[10px] uppercase mt-1 block">Pos 51-100</span>
                </div>
              </div>

              {/* Branded vs Non Branded */}
              <div className="pt-2 border-t border-[#232B3B] text-xs">
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Branded Search Traffic ({data.brandedTrafficPercent}%)</span>
                  <span>Non-Branded Search Traffic ({data.nonBrandedTrafficPercent}%)</span>
                </div>
                <div className="h-2 rounded-full bg-[#0E121A] flex overflow-hidden">
                  <div className="bg-[#FF642D]" style={{ width: `${data.brandedTrafficPercent}%` }} />
                  <div className="bg-blue-500" style={{ width: `${data.nonBrandedTrafficPercent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Organic Competitors Table */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Main Organic Competitors
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E121A] text-gray-400 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Competitor Domain</th>
                    <th className="py-2.5 px-4">Competition Level</th>
                    <th className="py-2.5 px-4">Common Keywords</th>
                    <th className="py-2.5 px-4">Organic Traffic</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D2330]">
                  {data.competitors.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-[#181E2B] transition-colors">
                      <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span>{comp.domain}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-amber-400 font-bold">{comp.competitionLevel}%</span>
                          <div className="w-16 h-1.5 bg-[#0E121A] rounded-full overflow-hidden hidden sm:block">
                            <div className="h-full bg-amber-500" style={{ width: `${comp.competitionLevel}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-300">
                        {comp.commonKeywords.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-200">
                        {comp.organicTraffic.toLocaleString()} visits/mo
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => router.push(`/gap?domain1=${data.domain}&domain2=${comp.domain}`)}
                          className="px-2.5 py-1 rounded bg-[#222938] hover:bg-[#FF642D] hover:text-white text-gray-300 text-[11px] font-semibold transition-all inline-flex items-center gap-1"
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
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading Domain Overview...</div>}>
      <DomainOverviewContent />
    </Suspense>
  );
}
