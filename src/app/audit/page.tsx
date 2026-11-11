"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Globe,
  Download,
  Search,
  Clock,
  Shield,
  FileCode,
  Image as ImageIcon,
  Bot,
  Award,
  Sparkles,
  Copy,
  Check,
  FileText,
  ChevronDown,
  ChevronUp,
  Terminal,
  Wrench,
  Code2,
  Layers,
  Sparkle,
} from "lucide-react";
import { AuditResult } from "@/lib/types";
import { HealthScoreGauge } from "@/components/HealthScoreGauge";
import { generateSeoFixes } from "@/lib/fixGenerator";

function AuditContent() {
  const searchParams = useSearchParams();
  const [urlInput, setUrlInput] = useState(searchParams.get("url") || "https://github.com/every-app/open-seo");
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "error" | "warning" | "notice">("all");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [expandedPromptId, setExpandedPromptId] = useState<string | null>(null);

  // 1-Click Code Fix Package Drawer
  const [showFixModal, setShowFixModal] = useState(false);
  const [fixTab, setFixTab] = useState<"head" | "schema" | "content" | "robots">("head");
  const [copiedFixTab, setCopiedFixTab] = useState<string | null>(null);

  const runAudit = async (target: string) => {
    if (!target.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Audit failed");
      }
      setAuditData(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to audit site");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setUrlInput(urlParam);
      runAudit(urlParam);
    } else {
      runAudit(urlInput);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runAudit(urlInput);
  };

  const filteredIssues = auditData?.issues.filter((issue) => {
    if (activeTab === "all") return true;
    return issue.type === activeTab;
  }) || [];

  const generatedFixes = useMemo(() => {
    if (!auditData?.url) return null;
    return generateSeoFixes(auditData.url);
  }, [auditData?.url]);

  const downloadJsonReport = () => {
    if (!auditData) return;
    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-report-${new URL(auditData.url).hostname}.json`;
    a.click();
  };

  const copyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const copyFixCode = (type: "head" | "schema" | "content" | "robots", content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFixTab(type);
    setTimeout(() => setCopiedFixTab(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-blue-600" />
            Technical Site Audit & Claude SEO Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time crawler inspecting 25+ on-page SEO checkpoints, 4-pillar Google E-E-A-T score, and AI Agent Readiness.
          </p>
        </div>

        {auditData && (
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowFixModal(!showFixModal)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              {showFixModal ? "Close Fix Package" : "Generate 1-Click Code Fix Package"}
            </button>

            <button
              onClick={downloadJsonReport}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Export JSON
            </button>
          </div>
        )}
      </div>

      {/* Audit URL Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter web address to crawl (e.g. https://yoursite.com)..."
            className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Crawling & Evaluating...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Audit Page
            </>
          )}
        </button>
      </form>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {auditData && (
        <>
          {/* 1-Click Code Fix Package Panel (Interactive Remediation Studio) */}
          {showFixModal && generatedFixes && (
            <div className="p-5 rounded-xl bg-white border-2 border-blue-600 shadow-lg space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Sparkle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">
                      1-Click Drop-In SEO Remediation Package for {new URL(auditData.url).hostname}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Copy and paste these verified snippets directly into your site's codebase or CMS to fix all detected crawl issues.
                    </p>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold overflow-x-auto">
                  <button
                    onClick={() => setFixTab("head")}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      fixTab === "head" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    1. &lt;head&gt; Meta Block
                  </button>
                  <button
                    onClick={() => setFixTab("schema")}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      fixTab === "schema" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    2. Schema JSON-LD
                  </button>
                  <button
                    onClick={() => setFixTab("content")}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      fixTab === "content" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    3. Semantic Body HTML
                  </button>
                  <button
                    onClick={() => setFixTab("robots")}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      fixTab === "robots" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    4. robots.txt & Sitemap
                  </button>
                </div>
              </div>

              {/* Fix Content Preview */}
              {fixTab === "head" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Fixes: <strong>Missing Title</strong>, <strong>Missing Meta Description</strong>, <strong>Canonical Tag</strong>, and <strong>Open Graph / Twitter Cards</strong>.
                    </span>
                    <button
                      onClick={() => copyFixCode("head", generatedFixes.headHtml)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedFixTab === "head" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFixTab === "head" ? "Copied <head> Code!" : "Copy <head> HTML"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                    {generatedFixes.headHtml}
                  </pre>
                </div>
              )}

              {fixTab === "schema" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Fixes: <strong>No Schema.org (JSON-LD) structured data detected</strong>. Enables Google Maps Local Pack, knowledge cards, and service rich snippets.
                    </span>
                    <button
                      onClick={() => copyFixCode("schema", generatedFixes.schemaJsonLd)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedFixTab === "schema" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFixTab === "schema" ? "Copied Schema JSON-LD!" : "Copy Schema Code"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                    {generatedFixes.schemaJsonLd}
                  </pre>
                </div>
              )}

              {fixTab === "content" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Fixes: <strong>Missing &lt;h1&gt; heading</strong> and <strong>Thin content detected (~75 words)</strong>. Provides 750+ words of keyword-targeted copy, service cards, E-E-A-T proof, and FAQs.
                    </span>
                    <button
                      onClick={() => copyFixCode("content", generatedFixes.bodyContentHtml)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedFixTab === "content" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFixTab === "content" ? "Copied Body HTML!" : "Copy Body HTML"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                    {generatedFixes.bodyContentHtml}
                  </pre>
                </div>
              )}

              {fixTab === "robots" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>
                      Fixes: <strong>robots.txt &amp; Sitemap Directives</strong>. Place at <code>/public/robots.txt</code> or <code>https://domain.com/robots.txt</code> to guide Googlebot, Bingbot, and search indexers.
                    </span>
                    <button
                      onClick={() => copyFixCode("robots", generatedFixes.robotsTxt)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 transition-all cursor-pointer"
                    >
                      {copiedFixTab === "robots" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFixTab === "robots" ? "Copied robots.txt!" : "Copy robots.txt"}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                    {generatedFixes.robotsTxt}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Summary Health Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Score */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
              <HealthScoreGauge score={auditData.healthScore} size={110} label="Site Health Score" />
            </div>

            {/* Quick Metrics */}
            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-slate-500">HTTP Status</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${auditData.statusCode === 200 ? "bg-emerald-500" : "bg-red-500"}`} />
                  <span className="text-xl font-bold text-slate-900">{auditData.statusCode}</span>
                  <span className="text-xs text-slate-500 font-mono">{auditData.statusText}</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {auditData.crawlTimeMs}ms TTFB
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-rose-600 font-semibold">Critical Errors</span>
                <span className="text-2xl font-bold text-rose-600 mt-2">{auditData.errorsCount}</span>
                <span className="text-[11px] text-slate-400">Requires immediate fix</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-amber-600 font-semibold">Warnings</span>
                <span className="text-2xl font-bold text-amber-600 mt-2">{auditData.warningsCount}</span>
                <span className="text-[11px] text-slate-400">Medium SEO impact</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <span className="text-xs text-blue-600 font-semibold">Notices</span>
                <span className="text-2xl font-bold text-blue-600 mt-2">{auditData.noticesCount}</span>
                <span className="text-[11px] text-slate-400">Optimization tips</span>
              </div>
            </div>
          </div>

          {/* Claude SEO: 4-Pillar E-E-A-T Scorecard & Agent Readiness Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 4-Pillar E-E-A-T Scorecard */}
            {auditData.eeatScore && (
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Google E-E-A-T Scorecard</h2>
                      <p className="text-[11px] text-slate-500">Experience, Expertise, Authoritativeness & Trustworthiness</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-600">{auditData.eeatScore.overall}</span>
                    <span className="text-xs text-slate-400 font-semibold">/100</span>
                  </div>
                </div>

                {/* 4 Progress Bars */}
                <div className="space-y-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Experience (First-hand proof & cases)</span>
                      <span className="font-mono font-bold text-blue-600">{auditData.eeatScore.experience}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${auditData.eeatScore.experience}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Expertise (Author credentials & depth)</span>
                      <span className="font-mono font-bold text-indigo-600">{auditData.eeatScore.expertise}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${auditData.eeatScore.expertise}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Authoritativeness (Citations & brand signals)</span>
                      <span className="font-mono font-bold text-purple-600">{auditData.eeatScore.authoritativeness}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${auditData.eeatScore.authoritativeness}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Trustworthiness (Security, policies, HTTPS)</span>
                      <span className="font-mono font-bold text-emerald-600">{auditData.eeatScore.trustworthiness}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${auditData.eeatScore.trustworthiness}%` }} />
                    </div>
                  </div>
                </div>

                {/* Actionable Insights */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Key E-E-A-T Recommendations</span>
                  {auditData.eeatScore.insights.map((insight, idx) => (
                    <div key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Agent Readiness & llms.txt */}
            {auditData.agentReadiness && (
              <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">AI Agent Readiness & llms.txt</h2>
                      <p className="text-[11px] text-slate-500">Optimized for Claude Code, Antigravity, and Perplexity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">{auditData.agentReadiness.score}</span>
                    <span className="text-xs text-slate-400 font-semibold">/100</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-2 pt-1">
                  {auditData.agentReadiness.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-start gap-2">
                        {item.passed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className={`font-semibold ${item.passed ? "text-slate-800" : "text-amber-800"}`}>
                            {item.item}
                          </span>
                          <p className="text-[11px] text-slate-500">{item.tip}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${item.passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {item.passed ? "Ready" : "Missing"}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

          {/* SERP Snippet Preview */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Google SERP Snippet Preview</h2>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 max-w-2xl font-sans">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span className="text-slate-700 font-mono font-medium">{new URL(auditData.url).hostname}</span>
                <span>›</span>
                <span className="text-slate-400 font-mono truncate">{new URL(auditData.url).pathname || "/"}</span>
              </div>
              <h3 className="text-base font-semibold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                {auditData.metrics.title || "Untitled Document"}
              </h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                {auditData.metrics.metaDescription || "No meta description provided. Google will extract arbitrary text from the page body."}
              </p>
            </div>
          </div>

          {/* Technical Checkpoints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Meta & Title */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <FileCode className="w-4 h-4 text-blue-600" />
                Meta & Headings
              </div>
              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Title Length</span>
                  <span className={`font-mono font-semibold ${auditData.metrics.titleLength >= 30 && auditData.metrics.titleLength <= 65 ? "text-emerald-600" : "text-amber-600"}`}>
                    {auditData.metrics.titleLength} chars
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Meta Description</span>
                  <span className={`font-mono font-semibold ${auditData.metrics.descriptionLength >= 120 && auditData.metrics.descriptionLength <= 165 ? "text-emerald-600" : "text-amber-600"}`}>
                    {auditData.metrics.descriptionLength} chars
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>H1 Heading Count</span>
                  <span className={`font-mono font-semibold ${auditData.metrics.h1Count === 1 ? "text-emerald-600" : "text-rose-600"}`}>
                    {auditData.metrics.h1Count}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>H2 / H3 Subheadings</span>
                  <span className="font-mono text-slate-800 font-semibold">
                    {auditData.metrics.h2Count} / {auditData.metrics.h3Count}
                  </span>
                </div>
              </div>
            </div>

            {/* Links & Images */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Links & Media
              </div>
              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Total Images</span>
                  <span className="font-mono text-slate-800 font-semibold">{auditData.metrics.imagesTotal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Missing Alt Text</span>
                  <span className={`font-mono font-semibold ${auditData.metrics.imagesMissingAlt === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                    {auditData.metrics.imagesMissingAlt}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Internal Links</span>
                  <span className="font-mono text-slate-800 font-semibold">{auditData.metrics.internalLinksCount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>External Links</span>
                  <span className="font-mono text-slate-800 font-semibold">{auditData.metrics.externalLinksCount}</span>
                </div>
              </div>
            </div>

            {/* Security, Schema & Social */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Shield className="w-4 h-4 text-indigo-600" />
                Security & Schema
              </div>
              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>HTTPS Secure</span>
                  <span className={auditData.metrics.isHttps ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold"}>
                    {auditData.metrics.isHttps ? "Active" : "Insecure HTTP"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Schema JSON-LD</span>
                  <span className={auditData.metrics.hasSchemaJsonLd ? "text-emerald-600 font-semibold" : "text-slate-400"}>
                    {auditData.metrics.hasSchemaJsonLd ? auditData.metrics.schemaTypes.join(", ") || "Detected" : "None"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Mobile Viewport</span>
                  <span className={auditData.metrics.viewportConfigured ? "text-emerald-600 font-semibold" : "text-rose-600 font-semibold"}>
                    {auditData.metrics.viewportConfigured ? "Configured" : "Missing"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>OpenGraph Social</span>
                  <span className={auditData.metrics.hasOpenGraph ? "text-emerald-600 font-semibold" : "text-amber-600 font-semibold"}>
                    {auditData.metrics.hasOpenGraph ? "Configured" : "Missing"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues List with Filter Tabs and Claude Code Prompts */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  Audit Issues Breakdown ({filteredIssues.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click the <strong>Claude Code</strong> button on any issue to copy an instant AI remediation prompt.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeTab === "all" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All ({auditData.issues.length})
                </button>
                <button
                  onClick={() => setActiveTab("error")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeTab === "error" ? "bg-rose-600 text-white font-semibold shadow-sm" : "text-rose-600 hover:text-rose-700"
                  }`}
                >
                  Errors ({auditData.errorsCount})
                </button>
                <button
                  onClick={() => setActiveTab("warning")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeTab === "warning" ? "bg-amber-500 text-white font-semibold shadow-sm" : "text-amber-600 hover:text-amber-700"
                  }`}
                >
                  Warnings ({auditData.warningsCount})
                </button>
                <button
                  onClick={() => setActiveTab("notice")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all cursor-pointer ${
                    activeTab === "notice" ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-blue-600 hover:text-blue-700"
                  }`}
                >
                  Notices ({auditData.noticesCount})
                </button>
              </div>
            </div>

            {filteredIssues.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <span>No issues found in this category! Perfect score.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {issue.type === "error" && <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        {issue.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                        {issue.type === "notice" && <Info className="w-4 h-4 text-blue-600 shrink-0" />}
                        <span className="font-semibold text-slate-900 text-sm">{issue.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {issue.claudeFixPrompt && (
                          <button
                            onClick={() => copyPrompt(issue.id, issue.claudeFixPrompt!)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-[11px] font-bold border border-blue-200 transition-all cursor-pointer"
                            title="Copy ready-to-run prompt for Claude Code or Antigravity"
                          >
                            <Terminal className="w-3 h-3 text-blue-600" />
                            <span>{copiedPromptId === issue.id ? "Copied Prompt!" : "Claude Code Prompt"}</span>
                          </button>
                        )}
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            issue.type === "error"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : issue.type === "warning"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {issue.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{issue.description}</p>
                    
                    <div className="text-xs bg-blue-50/70 text-slate-800 px-3 py-2 rounded border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <strong className="text-blue-700">Fix Recommendation: </strong>
                        {issue.recommendation}
                      </div>

                      {issue.claudeFixPrompt && (
                        <button
                          onClick={() => setExpandedPromptId(expandedPromptId === issue.id ? null : issue.id)}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap self-end sm:self-auto cursor-pointer"
                        >
                          {expandedPromptId === issue.id ? "Hide Command" : "Inspect Command"}
                        </button>
                      )}
                    </div>

                    {expandedPromptId === issue.id && issue.claudeFixPrompt && (
                      <div className="p-3 rounded bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-800 flex items-center justify-between gap-3">
                        <code>{issue.claudeFixPrompt}</code>
                        <button
                          onClick={() => copyPrompt(issue.id, issue.claudeFixPrompt!)}
                          className="shrink-0 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                        >
                          {copiedPromptId === issue.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedPromptId === issue.id ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function AuditPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading Site Audit & Claude SEO Intelligence...</div>}>
      <AuditContent />
    </Suspense>
  );
}
