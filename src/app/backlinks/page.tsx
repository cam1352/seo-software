"use client";

import { useState } from "react";
import {
  Link2,
  Send,
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Zap,
  Globe,
  RefreshCw,
} from "lucide-react";
import { CURATED_DIRECTORIES, generateOutreachPitch } from "@/lib/backlinks";
import { SubmissionServiceResult, BacklinkVerificationResult } from "@/lib/types";

export default function BacklinksPage() {
  const [activeTab, setActiveTab] = useState<"submit" | "verify" | "outreach">("submit");

  // Tab 1: Automated Submission state
  const [targetUrl, setTargetUrl] = useState("https://seo-software.com");
  const [siteName, setSiteName] = useState("SEO Software");
  const [category, setCategory] = useState("Software & Developer Tools");
  const [submitting, setSubmitting] = useState(false);
  const [submissionResults, setSubmissionResults] = useState<SubmissionServiceResult[]>([]);
  const [submissionSummary, setSubmissionSummary] = useState<any>(null);

  // Tab 2: Verification state
  const [backlinkUrl, setBacklinkUrl] = useState("https://github.com/every-app/open-seo");
  const [verifyTarget, setVerifyTarget] = useState("https://openseo.so");
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<BacklinkVerificationResult | null>(null);

  // Tab 3: Outreach Pitch state
  const [pitchTargetDomain, setPitchTargetDomain] = useState("searchengineland.com");
  const [pitchRecipient, setPitchRecipient] = useState("Editor");
  const [pitchType, setPitchType] = useState<"broken_link" | "resource_page" | "guest_post" | "unlinked_mention">("broken_link");
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/backlinks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          domain: new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`).hostname,
          siteName: siteName.trim(),
          category,
        }),
      });
      const data = await res.json();
      if (data.results) {
        setSubmissionResults(data.results);
        setSubmissionSummary(data.summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!backlinkUrl.trim() || !verifyTarget.trim()) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/backlinks/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backlinkUrl: backlinkUrl.trim(), targetUrl: verifyTarget.trim() }),
      });
      const data = await res.json();
      setVerificationResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const generatedPitch = generateOutreachPitch({
    targetDomain: pitchTargetDomain,
    recipientName: pitchRecipient,
    yourUrl: targetUrl,
    yourBrand: siteName,
    pitchType,
  });

  const copyPitchText = () => {
    navigator.clipboard.writeText(`Subject: ${generatedPitch.subject}\n\n${generatedPitch.body}`);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            Instant IndexNow & Automated Syndication
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Link2 className="w-6 h-6 text-emerald-400" />
            Automated Backlink Submission & Verification Hub
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Submit your URLs to IndexNow search engine nodes, broadcast pings, syndicate to high-DA directories, and verify live backlink health.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-[#141824] p-1 rounded-lg border border-[#232B3B] text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "submit" ? "bg-emerald-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Auto-Submission
          </button>
          <button
            onClick={() => setActiveTab("verify")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "verify" ? "bg-blue-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Verifier
          </button>
          <button
            onClick={() => setActiveTab("outreach")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "outreach" ? "bg-purple-600 text-white shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            AI Outreach Pitches
          </button>
        </div>
      </div>

      {/* Tab 1: Automated Backlink Submission */}
      {activeTab === "submit" && (
        <div className="space-y-6">
          <form onSubmit={handleBatchSubmit} className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Target URL to Index / Submit</label>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://yourdomain.com/blog/new-post"
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Site / Brand Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="SEO Software"
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-emerald-500"
                >
                  <option value="Software & Developer Tools">Software & Developer Tools</option>
                  <option value="SaaS & Cloud Platforms">SaaS & Cloud Platforms</option>
                  <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                  <option value="Startups & Tech Products">Startups & Tech Products</option>
                  <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automatically dispatches to IndexNow, Ping-O-Matic, Google Blog Ping, & 7 High-DA Directories</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch Backlinks & Pings
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Submission Results Table */}
          {submissionResults.length > 0 && (
            <div className="rounded-xl bg-[#141824] border border-[#232B3B] overflow-hidden space-y-4 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Submission Broadcast Results ({submissionResults.length} Channels)
                </h2>
                <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  {submissionSummary?.totalChannels} Channels Dispatched Successfully
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0E121A] text-gray-400 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Service / Channel</th>
                      <th className="py-2.5 px-4">Type</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D2330]">
                    {submissionResults.map((res, idx) => (
                      <tr key={idx} className="hover:bg-[#181E2B] transition-colors">
                        <td className="py-3 px-4 font-semibold text-white">
                          {res.service}
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-mono uppercase bg-[#202737] text-gray-300 px-2 py-0.5 rounded">
                            {res.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300 font-sans">
                          {res.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Curated High-DA Directories Showcase */}
          <div className="p-5 rounded-xl bg-[#141824] border border-[#232B3B] space-y-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              Integrated High-DA Syndication Directories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {CURATED_DIRECTORIES.map((dir) => (
                <div key={dir.id} className="p-3.5 rounded-lg bg-[#0E121A] border border-[#222938] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{dir.name}</div>
                    <div className="text-[11px] text-gray-400">{dir.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 font-bold">DA {dir.domainAuthority}</span>
                    <span className="block text-[10px] text-gray-500 uppercase">Instant Webhook</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Backlink Verification */}
      {activeTab === "verify" && (
        <div className="space-y-6">
          <form onSubmit={handleVerifyLink} className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Referring Page URL (Where link should be)</label>
                <input
                  type="text"
                  value={backlinkUrl}
                  onChange={(e) => setBacklinkUrl(e.target.value)}
                  placeholder="https://partnerblog.com/top-tools"
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Your Destination Target URL</label>
                <input
                  type="text"
                  value={verifyTarget}
                  onChange={(e) => setVerifyTarget(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={verifying}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                {verifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Crawling Referring Page...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Verify Live Link
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Verification Result Card */}
          {verificationResult && (
            <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Verification Report
                </h3>
                <span className="text-xs text-gray-500 font-mono">
                  Checked at: {new Date(verificationResult.lastChecked).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-xs text-gray-400">Backlink Status</span>
                  <div className="mt-2 text-base font-bold flex items-center gap-1.5">
                    {verificationResult.found ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Found in HTML
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Link Not Found
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-xs text-gray-400">Anchor Text</span>
                  <div className="mt-2 text-sm font-bold text-white truncate" title={verificationResult.anchorText}>
                    "{verificationResult.anchorText}"
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-xs text-gray-400">Link Equity (Rel)</span>
                  <div className="mt-2 text-sm font-bold">
                    {verificationResult.isDoFollow ? (
                      <span className="text-emerald-400">DoFollow (Passed Equity)</span>
                    ) : (
                      <span className="text-amber-400">NoFollow / Sponsored</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#0E121A] border border-[#222938]">
                  <span className="text-xs text-gray-400">Server Status</span>
                  <div className="mt-2 text-sm font-bold text-white font-mono">
                    HTTP {verificationResult.statusCode}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: AI Outreach Pitch Generator */}
      {activeTab === "outreach" && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Configure AI Outreach Pitch
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Target Publisher Domain</label>
                <input
                  type="text"
                  value={pitchTargetDomain}
                  onChange={(e) => setPitchTargetDomain(e.target.value)}
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Recipient Name / Title</label>
                <input
                  type="text"
                  value={pitchRecipient}
                  onChange={(e) => setPitchRecipient(e.target.value)}
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1">Pitch Campaign Type</label>
                <select
                  value={pitchType}
                  onChange={(e: any) => setPitchType(e.target.value)}
                  className="w-full bg-[#0E121A] text-sm text-gray-100 px-3 py-2 rounded-lg border border-[#283244] focus:outline-none focus:border-purple-500"
                >
                  <option value="broken_link">Broken Link Replacement</option>
                  <option value="resource_page">Resource Page Inclusion</option>
                  <option value="unlinked_mention">Unlinked Brand Mention</option>
                  <option value="guest_post">Guest Article Contribution</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Email Preview */}
          <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Generated High-Conversion Email Pitch</h3>
              <button
                onClick={copyPitchText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? "Copied to Clipboard!" : "Copy Full Pitch"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0E121A] border border-[#222938] text-xs text-gray-200 font-sans space-y-3">
              <div>
                <span className="text-gray-400">Subject: </span>
                <span className="font-bold text-white">{generatedPitch.subject}</span>
              </div>
              <div className="pt-3 border-t border-[#222938] whitespace-pre-line leading-relaxed text-gray-300">
                {generatedPitch.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
