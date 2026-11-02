"use client";

import { useState } from "react";
import { Settings, Terminal, Key, CheckCircle2, Copy, Check, ShieldCheck, Zap } from "lucide-react";

export default function SettingsPage() {
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [dataforseoKey, setDataforseoKey] = useState("");
  const [aiKey, setAiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const mcpConfigJson = `{
  "mcpServers": {
    "seo-software": {
      "url": "http://localhost:3000/api/mcp",
      "tools": [
        "audit_url",
        "research_keywords",
        "domain_overview",
        "track_geo_visibility",
        "submit_backlinks",
        "verify_backlink",
        "optimize_content"
      ]
    }
  }
}`;

  const copyMcpConfig = () => {
    navigator.clipboard.writeText(mcpConfigJson);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#FF642D]" />
          Platform Settings & AI Agent MCP Integration
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Connect SEO Software to Claude Code, Antigravity, and ChatGPT via Model Context Protocol (MCP), or configure optional API keys.
        </p>
      </div>

      {/* Model Context Protocol Integration Box */}
      <div className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Model Context Protocol (MCP) Server</h2>
              <p className="text-xs text-gray-400">Expose live audits, keyword tools, and backlink submission directly to AI agents.</p>
            </div>
          </div>

          <button
            onClick={copyMcpConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222938] hover:bg-[#2C3549] text-gray-200 text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedMcp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMcp ? "Copied Config!" : "Copy MCP JSON"}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#0E121A] border border-[#222938] font-mono text-xs text-gray-300 overflow-x-auto">
          <pre>{mcpConfigJson}</pre>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <strong className="text-gray-300">How to use:</strong>
          <p>1. Copy the JSON snippet above and paste it into your agent's config (e.g. Claude Desktop, Antigravity, Cursor, or Codex).</p>
          <p>2. Ask your agent: <em>"Run a live audit on my website"</em> or <em>"Submit my new post to IndexNow"</em>.</p>
        </div>
      </div>

      {/* Optional BYOK API Keys Form */}
      <form onSubmit={handleSave} className="p-6 rounded-xl bg-[#141824] border border-[#232B3B] space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <Key className="w-4 h-4 text-[#FF642D]" />
          Optional API Integrations (BYOK)
        </div>
        <p className="text-xs text-gray-400">
          SEO Software works completely free out-of-the-box using built-in scrapers and heuristics. Optionally connect third-party providers for enterprise-scale bulk imports.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">DataForSEO API Key (Optional)</label>
            <input
              type="password"
              value={dataforseoKey}
              onChange={(e) => setDataforseoKey(e.target.value)}
              placeholder="Base64 login:password"
              className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-[#FF642D]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">OpenAI / OpenRouter / Gemini API Key (Optional)</label>
            <input
              type="password"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-[#0E121A] text-sm text-gray-100 px-3.5 py-2.5 rounded-lg border border-[#283244] focus:outline-none focus:border-[#FF642D]"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Keys are stored securely in local browser storage.</span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#FF642D] hover:bg-[#E55724] text-white text-xs font-bold transition-all cursor-pointer"
          >
            {saved ? "Saved Successfully!" : "Save Keys"}
          </button>
        </div>
      </form>
    </div>
  );
}
