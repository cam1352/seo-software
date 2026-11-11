"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Link2,
  Send,
  ShieldCheck,
  Mail,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
  Globe,
  RefreshCw,
  MapPin,
  Sparkles,
  ChevronRight,
  Filter,
  CheckSquare,
  Square,
  Award,
} from "lucide-react";
import {
  BUSINESS_CATEGORIES,
  getFreshBacklinkOpportunities,
  generateOutreachPitch,
  DirectoryPlatform,
} from "@/lib/backlinks";
import { SubmissionServiceResult, BacklinkVerificationResult } from "@/lib/types";

export default function BacklinksPage() {
  const [activeTab, setActiveTab] = useState<"submit" | "verify" | "outreach">("submit");

  // Form Configuration
  const [targetUrl, setTargetUrl] = useState("https://seosoftware.io");
  const [siteName, setSiteName] = useState("SEO Software");
  const [category, setCategory] = useState("Software, SaaS & Developer Tools");
  const [locationInput, setLocationInput] = useState("Austin, TX; Dallas, TX");

  // Batching & Fresh List State
  const [batchNumber, setBatchNumber] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [lastDispatchedCount, setLastDispatchedCount] = useState<number | null>(null);
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);
  const [sentHistory, setSentHistory] = useState<SubmissionServiceResult[]>([]);

  // Current Fresh Batch of Backlink Opportunities
  const [freshBatch, setFreshBatch] = useState<DirectoryPlatform[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Verification state
  const [backlinkUrl, setBacklinkUrl] = useState("https://github.com/every-app/open-seo");
  const [verifyTarget, setVerifyTarget] = useState("https://openseo.so");
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<BacklinkVerificationResult | null>(null);

  // Outreach Pitch state
  const [pitchTargetDomain, setPitchTargetDomain] = useState("searchengineland.com");
  const [pitchRecipient, setPitchRecipient] = useState("Editor");
  const [pitchType, setPitchType] = useState<"broken_link" | "resource_page" | "guest_post" | "unlinked_mention" | "local_partner">("local_partner");
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Parse locations into clean list
  const parsedLocations = useMemo(() => {
    return locationInput
      .split(/[,;\n]+/)
      .map((l) => l.trim())
      .filter(Boolean);
  }, [locationInput]);

  // Load fresh backlink batch whenever category, locations, or submittedIds change
  const loadFreshBatch = (clearSubmitted = false) => {
    const currentExclude = clearSubmitted ? [] : submittedIds;
    const batch = getFreshBacklinkOpportunities(category, parsedLocations, currentExclude, 12);
    setFreshBatch(batch);
    setSelectedIds(batch.map((b) => b.id));
  };

  useEffect(() => {
    loadFreshBatch();
  }, [category, locationInput]);

  const handleToggleSelectAll = () => {
    if (selectedIds.length === freshBatch.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(freshBatch.map((b) => b.id));
    }
  };

  const handleToggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Submit current batch
  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    const targetsToSubmit = freshBatch.filter((b) => selectedIds.includes(b.id));
    if (targetsToSubmit.length === 0 && selectedIds.length === 0) return;

    setSubmitting(true);
    setLastDispatchedCount(null);

    try {
      const res = await fetch("/api/backlinks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: targetUrl.trim(),
          domain: new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`).hostname,
          siteName: siteName.trim(),
          category,
          locations: parsedLocations,
          locationRaw: locationInput,
          submittedIds: submittedIds,
          targetDirectories: targetsToSubmit,
        }),
      });

      const data = await res.json();
      if (data.results) {
        const newlySubmitted = targetsToSubmit.map((t) => t.id);
        const updatedSubmittedIds = [...submittedIds, ...newlySubmitted];
        setSubmittedIds(updatedSubmittedIds);

        // Prepend new results to history
        setSentHistory((prev) => [...data.results, ...prev]);
        setLastDispatchedCount(data.results.length);

        // Advance to next batch and set new fresh list of backlinks
        setBatchNumber((prev) => prev + 1);

        if (data.freshBatch && data.freshBatch.length > 0) {
          setFreshBatch(data.freshBatch);
          setSelectedIds(data.freshBatch.map((b: DirectoryPlatform) => b.id));
        } else {
          // Fallback client rotation
          const nextBatch = getFreshBacklinkOpportunities(category, parsedLocations, updatedSubmittedIds, 12);
          setFreshBatch(nextBatch);
          setSelectedIds(nextBatch.map((b) => b.id));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextBatchOnly = () => {
    const currentExclude = [...submittedIds, ...freshBatch.map((b) => b.id)];
    setSubmittedIds(currentExclude);
    setBatchNumber((prev) => prev + 1);
    const nextBatch = getFreshBacklinkOpportunities(category, parsedLocations, currentExclude, 12);
    setFreshBatch(nextBatch);
    setSelectedIds(nextBatch.map((b) => b.id));
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
    location: parsedLocations[0] || "",
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            Instant IndexNow & Multi-Location Citation Engine
          </div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Link2 className="w-6 h-6 text-blue-600" />
            Automated Backlink Hub & Local Citation Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Submit your URLs to IndexNow search engine nodes, ping networks, high-DA directories, and multi-location local citations.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveTab("submit")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "submit" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Auto-Submission Hub
          </button>
          <button
            onClick={() => setActiveTab("verify")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "verify" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Live Verifier
          </button>
          <button
            onClick={() => setActiveTab("outreach")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeTab === "outreach" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            AI Outreach & Pitches
          </button>
        </div>
      </div>

      {/* Main Tab 1: Automated Backlink Submission */}
      {activeTab === "submit" && (
        <div className="space-y-6">
          {/* Configuration Form */}
          <form onSubmit={handleBatchSubmit} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Target URL */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target URL to Index / Rank</label>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://yourdomain.com/page"
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Business / Brand Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g. SEO Software"
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              {/* Business Category (36 Categories) */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Business Category ({BUSINESS_CATEGORIES.length})
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 text-sm text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white truncate"
                >
                  {BUSINESS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Business Location(s) Input */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    Own Location(s)
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Semicolon separated</span>
                </label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="e.g. Austin, TX; Miami, FL; London, UK"
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Location Badges & Presets */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-medium">Targeted Locations:</span>
                {parsedLocations.map((loc, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200 text-[11px]"
                  >
                    <MapPin className="w-3 h-3 text-blue-600" />
                    {loc}
                  </span>
                ))}
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">Quick presets:</span>
                <button
                  type="button"
                  onClick={() => setLocationInput("Austin, TX; Dallas, TX; Houston, TX")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px]"
                >
                  Texas Hubs
                </button>
                <button
                  type="button"
                  onClick={() => setLocationInput("New York, NY; Los Angeles, CA; Chicago, IL")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px]"
                >
                  Top US Metros
                </button>
                <button
                  type="button"
                  onClick={() => setLocationInput("London, UK; Manchester, UK")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px]"
                >
                  United Kingdom
                </button>
                <button
                  type="button"
                  onClick={() => setLocationInput("Worldwide / National")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px]"
                >
                  National / Global
                </button>
              </div>
            </div>
          </form>

          {/* Celebration Success Banner when batch dispatched */}
          {lastDispatchedCount !== null && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    🎉 Batch #{batchNumber - 1} Successfully Dispatched ({lastDispatchedCount} Channels)!
                  </h4>
                  <p className="text-xs text-emerald-700">
                    IndexNow nodes pinged & local citations registered. A fresh new list of {freshBatch.length} high-authority backlink opportunities has been loaded below!
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold bg-white text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200">
                Fresh Batch #{batchNumber} Ready
              </span>
            </div>
          )}

          {/* Current Fresh Batch Section */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200">
                    Fresh Batch #{batchNumber}
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    Fresh Backlink Opportunities ({freshBatch.length} Targets)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  New high-DA platforms & location citations customized for <strong>{category}</strong> in <strong>{parsedLocations.join(", ") || "National"}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                >
                  {selectedIds.length === freshBatch.length ? "Deselect All" : "Select All"}
                </button>
                <button
                  type="button"
                  onClick={handleNextBatchOnly}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                  title="Rotate to another fresh batch without submitting"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Next Fresh Batch →</span>
                </button>
              </div>
            </div>

            {/* Fresh Opportunities Grid/Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 w-10 text-center">Select</th>
                    <th className="py-2.5 px-4">Directory / Citation Target</th>
                    <th className="py-2.5 px-3">Authority</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-4">Category & Location</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {freshBatch.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    const isLocal = item.submissionType === "local_citation";

                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleToggleSelectOne(item.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-blue-50/40 hover:bg-blue-50/70" : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectOne(item.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            {isLocal ? (
                              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            ) : (
                              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <span>{item.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            DA {item.domainAuthority}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-semibold ${
                              isLocal
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : item.submissionType === "instant_api"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {isLocal ? "Local Citation" : item.submissionType.replace("_", " ")}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="text-slate-700 font-medium">{item.category}</div>
                          {item.location && (
                            <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" /> {item.location}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <Sparkles className="w-3 h-3 text-blue-600" />
                            Fresh & Ready
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Dispatch Controls */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-600 space-y-0.5">
                <div>
                  <strong>{selectedIds.length}</strong> of <strong>{freshBatch.length}</strong> opportunities selected in Batch #{batchNumber}.
                </div>
                <div className="text-slate-400">
                  Includes automatic IndexNow submission + Webmaster multi-pings + {selectedIds.length} directory profiles.
                </div>
              </div>

              <button
                type="button"
                onClick={handleBatchSubmit}
                disabled={submitting || selectedIds.length === 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer shrink-0"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Dispatching Backlinks & Citations...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch Fresh Batch #{batchNumber} ({selectedIds.length} Channels)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Submission History / Sent Backlinks */}
          {sentHistory.length > 0 && (
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Successfully Dispatched Backlinks ({sentHistory.length} Total Channels Sent)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live record of submitted IndexNow endpoints, ping broadcasts, and directory citations.
                  </p>
                </div>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {sentHistory.length} Active Records
                </span>
              </div>

              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4">Service / Channel</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Authority</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-4">Status & Details</th>
                      <th className="py-2.5 px-4 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sentHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {item.service}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {item.domainAuthority ? (
                            <span className="font-mono text-emerald-600 font-bold">
                              DA {item.domainAuthority}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">-</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {item.location || "Global"}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px] mb-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Sent & Active
                          </div>
                          <span className="text-[11px] text-slate-500 line-clamp-1">{item.message}</span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px]">
                          {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Local Citation Consistency & NAP Readiness */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Local Citation & NAP (Name, Address/Location, Phone) Readiness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Location Consistency
                </div>
                Targeting {parsedLocations.length} locations ({parsedLocations.join(", ")}). Citations are matched to local regional directories and maps engines.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-indigo-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  IndexNow Protocol Node
                </div>
                Broadcasts live URLs directly to Bing, Yandex, Seznam, and Naver search engine crawlers within 60 seconds of publication.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Continuous Fresh Batches
                </div>
                Each time you dispatch backlinks, an updated fresh batch of unsubmitted opportunities rotates in automatically so you never run out.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Backlink Verification */}
      {activeTab === "verify" && (
        <div className="space-y-6">
          <form onSubmit={handleVerifyLink} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Referring Page URL (Where link should be)</label>
                <input
                  type="text"
                  value={backlinkUrl}
                  onChange={(e) => setBacklinkUrl(e.target.value)}
                  placeholder="https://partnerblog.com/top-tools"
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Destination Target URL</label>
                <input
                  type="text"
                  value={verifyTarget}
                  onChange={(e) => setVerifyTarget(e.target.value)}
                  placeholder="https://yoursite.com"
                  className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={verifying}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
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
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Verification Report
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Checked at: {new Date(verificationResult.lastChecked).toLocaleTimeString()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500">Backlink Status</span>
                  <div className="mt-2 text-base font-bold flex items-center gap-1.5">
                    {verificationResult.found ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Found in HTML
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> Link Not Found
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500">Anchor Text</span>
                  <div className="mt-2 text-sm font-bold text-slate-900 truncate" title={verificationResult.anchorText}>
                    "{verificationResult.anchorText}"
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500">Link Equity (Rel)</span>
                  <div className="mt-2 text-sm font-bold">
                    {verificationResult.isDoFollow ? (
                      <span className="text-emerald-600">DoFollow (Passed Equity)</span>
                    ) : (
                      <span className="text-amber-600">NoFollow / Sponsored</span>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500">Server Status</span>
                  <div className="mt-2 text-sm font-bold text-slate-900 font-mono">
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
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Configure AI Outreach Pitch
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Publisher Domain</label>
                <input
                  type="text"
                  value={pitchTargetDomain}
                  onChange={(e) => setPitchTargetDomain(e.target.value)}
                  className="w-full bg-slate-50 text-sm text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Recipient Name / Title</label>
                <input
                  type="text"
                  value={pitchRecipient}
                  onChange={(e) => setPitchRecipient(e.target.value)}
                  className="w-full bg-slate-50 text-sm text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Pitch Campaign Type</label>
                <select
                  value={pitchType}
                  onChange={(e: any) => setPitchType(e.target.value)}
                  className="w-full bg-slate-50 text-sm text-slate-900 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="local_partner">Local Partnership & Resource Spotlight</option>
                  <option value="broken_link">Broken Link Replacement</option>
                  <option value="resource_page">Resource Page Inclusion</option>
                  <option value="unlinked_mention">Unlinked Brand Mention</option>
                  <option value="guest_post">Guest Article Contribution</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Email Preview */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Generated High-Conversion Email Pitch</h3>
              <button
                onClick={copyPitchText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shadow-blue-500/20"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? "Copied to Clipboard!" : "Copy Full Pitch"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-sans space-y-3">
              <div>
                <span className="text-slate-500 font-medium">Subject: </span>
                <span className="font-bold text-slate-900">{generatedPitch.subject}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 whitespace-pre-line leading-relaxed text-slate-700">
                {generatedPitch.body}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
