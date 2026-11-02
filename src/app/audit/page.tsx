"use client";

import { Suspense,  useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
  Globe,
  ExternalLink,
  Download,
  Search,
  Clock,
  Shield,
  FileCode,
  Image as ImageIcon,
  Link2,
} from "lucide-react";
import { AuditResult, AuditIssue } from "@/lib/types";
import { HealthScoreGauge } from "@/components/HealthScoreGauge";

function AuditContent() {
  const searchParams = useSearchParams();
  const [urlInput, setUrlInput] = useState(searchParams.get("url") || "https://github.com/every-app/open-seo");
  const [loading, setLoading] = useState(false);
  const [auditData, setAuditData] = useState<AuditResult | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "error" | "warning" | "notice">("all");
  const [errorMsg, setErrorMsg] = useState("");

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

  const downloadJsonReport = () => {
    if (!auditData) return;
    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-report-${new URL(auditData.url).hostname}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-[#FF642D]" />
            Technical Site Audit
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time crawler inspecting 25+ on-page SEO checkpoints, health scores, and critical errors.
          </p>
        </div>

        {auditData && (
          <button
            onClick={downloadJsonReport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161C27] border border-[#283244] text-xs font-semibold text-gray-200 hover:text-white hover:border-gray-500 transition-all self-start md:self-auto"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            Export Audit Report (JSON)
          </button>
        )}
      </div>

      {/* Audit URL Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex items-center gap-3">
        <div className="relative flex-1">
          <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter web address to crawl (e.g. https://yoursite.com)..."
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
              Crawling...
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
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {auditData && (
        <>
          {/* Summary Health Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Score */}
            <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] flex items-center justify-center">
              <HealthScoreGauge score={auditData.healthScore} size={110} label="Site Health Score" />
            </div>

            {/* Quick Metrics */}
            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between">
                <span className="text-xs text-gray-400">HTTP Status</span>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${auditData.statusCode === 200 ? "bg-emerald-500" : "bg-red-500"}`} />
                  <span className="text-xl font-bold text-white">{auditData.statusCode}</span>
                  <span className="text-xs text-gray-400 font-mono">{auditData.statusText}</span>
                </div>
                <span className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {auditData.crawlTimeMs}ms TTFB
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between">
                <span className="text-xs text-red-400 font-medium">Critical Errors</span>
                <span className="text-2xl font-bold text-red-400 mt-2">{auditData.errorsCount}</span>
                <span className="text-[11px] text-gray-500">Requires immediate fix</span>
              </div>

              <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between">
                <span className="text-xs text-amber-400 font-medium">Warnings</span>
                <span className="text-2xl font-bold text-amber-400 mt-2">{auditData.warningsCount}</span>
                <span className="text-[11px] text-gray-500">Medium SEO impact</span>
              </div>

              <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] flex flex-col justify-between">
                <span className="text-xs text-blue-400 font-medium">Notices</span>
                <span className="text-2xl font-bold text-blue-400 mt-2">{auditData.noticesCount}</span>
                <span className="text-[11px] text-gray-500">Optimization tips</span>
              </div>
            </div>
          </div>

          {/* SERP Snippet Preview */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B]">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Google SERP Snippet Preview</h2>
            <div className="p-4 rounded-lg bg-[#0E121A] border border-[#222938] max-w-2xl font-sans">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <span className="text-gray-300 font-mono">{new URL(auditData.url).hostname}</span>
                <span>›</span>
                <span className="text-gray-500 font-mono truncate">{new URL(auditData.url).pathname || "/"}</span>
              </div>
              <h3 className="text-base font-semibold text-[#8AB4F8] hover:underline cursor-pointer line-clamp-1">
                {auditData.metrics.title || "Untitled Document"}
              </h3>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                {auditData.metrics.metaDescription || "No meta description provided. Google will extract arbitrary text from the page body."}
              </p>
            </div>
          </div>

          {/* Technical Checkpoints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Meta & Title */}
            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <FileCode className="w-4 h-4 text-blue-400" />
                Meta & Headings
              </div>
              <div className="text-xs space-y-2 text-gray-300">
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Title Length</span>
                  <span className={`font-mono ${auditData.metrics.titleLength >= 30 && auditData.metrics.titleLength <= 65 ? "text-emerald-400" : "text-amber-400"}`}>
                    {auditData.metrics.titleLength} chars
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Meta Description</span>
                  <span className={`font-mono ${auditData.metrics.descriptionLength >= 120 && auditData.metrics.descriptionLength <= 165 ? "text-emerald-400" : "text-amber-400"}`}>
                    {auditData.metrics.descriptionLength} chars
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>H1 Heading Count</span>
                  <span className={`font-mono ${auditData.metrics.h1Count === 1 ? "text-emerald-400" : "text-red-400"}`}>
                    {auditData.metrics.h1Count}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>H2 / H3 Subheadings</span>
                  <span className="font-mono text-gray-200">
                    {auditData.metrics.h2Count} / {auditData.metrics.h3Count}
                  </span>
                </div>
              </div>
            </div>

            {/* Links & Images */}
            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Links & Media
              </div>
              <div className="text-xs space-y-2 text-gray-300">
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Total Images</span>
                  <span className="font-mono text-gray-200">{auditData.metrics.imagesTotal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Missing Alt Text</span>
                  <span className={`font-mono ${auditData.metrics.imagesMissingAlt === 0 ? "text-emerald-400" : "text-amber-400 font-bold"}`}>
                    {auditData.metrics.imagesMissingAlt}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Internal Links</span>
                  <span className="font-mono text-gray-200">{auditData.metrics.internalLinksCount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>External Links</span>
                  <span className="font-mono text-gray-200">{auditData.metrics.externalLinksCount}</span>
                </div>
              </div>
            </div>

            {/* Security, Schema & Social */}
            <div className="p-4 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Shield className="w-4 h-4 text-purple-400" />
                Security & Schema
              </div>
              <div className="text-xs space-y-2 text-gray-300">
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>HTTPS Secure</span>
                  <span className={auditData.metrics.isHttps ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                    {auditData.metrics.isHttps ? "Active" : "Insecure HTTP"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Schema JSON-LD</span>
                  <span className={auditData.metrics.hasSchemaJsonLd ? "text-emerald-400 font-semibold" : "text-gray-400"}>
                    {auditData.metrics.hasSchemaJsonLd ? auditData.metrics.schemaTypes.join(", ") || "Detected" : "None"}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#222938]">
                  <span>Mobile Viewport</span>
                  <span className={auditData.metrics.viewportConfigured ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                    {auditData.metrics.viewportConfigured ? "Configured" : "Missing"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>OpenGraph Social</span>
                  <span className={auditData.metrics.hasOpenGraph ? "text-emerald-400 font-semibold" : "text-amber-400"}>
                    {auditData.metrics.hasOpenGraph ? "Configured" : "Missing"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues List with Filter Tabs */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232B3B] pb-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Audit Issues Breakdown ({filteredIssues.length})
              </h2>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 bg-[#0E121A] p-1 rounded-lg border border-[#232B3B]">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === "all" ? "bg-[#FF642D] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  All ({auditData.issues.length})
                </button>
                <button
                  onClick={() => setActiveTab("error")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === "error" ? "bg-red-500 text-white" : "text-red-400 hover:text-white"
                  }`}
                >
                  Errors ({auditData.errorsCount})
                </button>
                <button
                  onClick={() => setActiveTab("warning")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === "warning" ? "bg-amber-500 text-white" : "text-amber-400 hover:text-white"
                  }`}
                >
                  Warnings ({auditData.warningsCount})
                </button>
                <button
                  onClick={() => setActiveTab("notice")}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activeTab === "notice" ? "bg-blue-500 text-white" : "text-blue-400 hover:text-white"
                  }`}
                >
                  Notices ({auditData.noticesCount})
                </button>
              </div>
            </div>

            {filteredIssues.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <span>No issues found in this category! Perfect score.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-lg bg-[#0E121A] border border-[#222938] hover:border-gray-700 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {issue.type === "error" && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        {issue.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                        {issue.type === "notice" && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
                        <span className="font-semibold text-white text-sm">{issue.title}</span>
                      </div>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          issue.type === "error"
                            ? "bg-red-500/20 text-red-300"
                            : issue.type === "warning"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {issue.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{issue.description}</p>
                    <div className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded border border-emerald-500/20">
                      <strong className="text-emerald-300">Fix Recommendation: </strong>
                      {issue.recommendation}
                    </div>
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
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading Site Audit...</div>}>
      <AuditContent />
    </Suspense>
  );
}
