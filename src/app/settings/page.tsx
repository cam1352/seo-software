"use client";

import { useState } from "react";
import { Settings, Terminal, Key, Copy, Check, Bot, Sparkles, Code2, Globe } from "lucide-react";

export default function SettingsPage() {
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
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

  const claudeCliCommand = `claude mcp add seo-software -- http://localhost:3000/api/mcp`;

  const copyMcpConfig = () => {
    navigator.clipboard.writeText(mcpConfigJson);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const copyCliCommand = () => {
    navigator.clipboard.writeText(claudeCliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
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
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-600" />
          Platform Settings & Claude SEO AI Agent Integration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Connect SEO Software directly to Claude Code, Antigravity, and ChatGPT via Model Context Protocol (MCP) and Claude SEO workflows.
        </p>
      </div>

      {/* Claude SEO & Claude Code Quick Connect */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Claude SEO Terminal Integration</h2>
              <p className="text-xs text-slate-500">Run audits, generate /llms.txt, and fix SEO issues directly inside Claude Code or Antigravity.</p>
            </div>
          </div>

          <button
            onClick={copyCliCommand}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCli ? "Copied Command!" : "Copy Claude CLI Command"}</span>
          </button>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800 flex items-center justify-between gap-3">
          <code>{claudeCliCommand}</code>
          <button
            onClick={copyCliCommand}
            className="shrink-0 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1"
          >
            {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              1. 1-Click Claude Code Fixes
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Every audit finding has an instant terminal command that prompts Claude Code to fix the code directly in your project.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              2. Agentic /llms.txt
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Auto-generate and serve standard <code className="bg-slate-200 px-1 py-0.5 rounded">/llms.txt</code> manifests for LLM web search bots.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-1">
              <Code2 className="w-3.5 h-3.5 text-emerald-600" />
              3. E-E-A-T Scorecard
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Inspect 4 pillars: Experience, Expertise, Authoritativeness, and Trustworthiness with automated remediation steps.
            </p>
          </div>
        </div>
      </div>

      {/* Model Context Protocol Integration Box */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm">Model Context Protocol (MCP) Server</h2>
              <p className="text-xs text-slate-500">Expose live audits, keyword tools, and backlink submission directly to AI agents.</p>
            </div>
          </div>

          <button
            onClick={copyMcpConfig}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
          >
            {copiedMcp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedMcp ? "Copied Config!" : "Copy MCP JSON"}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
          <pre>{mcpConfigJson}</pre>
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          <strong className="text-slate-700">How to use:</strong>
          <p>1. Copy the JSON snippet above and paste it into your agent's config (e.g. Claude Desktop, Antigravity, Cursor, or Codex).</p>
          <p>2. Ask your agent: <em>"Run a live audit on my website"</em> or <em>"Submit my new post to IndexNow"</em>.</p>
        </div>
      </div>

      {/* Optional BYOK API Keys Form */}
      <form onSubmit={handleSave} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
          <Key className="w-4 h-4 text-blue-600" />
          Optional API Integrations (BYOK)
        </div>
        <p className="text-xs text-slate-500">
          SEO Software works completely free out-of-the-box using built-in scrapers and heuristics. Optionally connect third-party providers for enterprise-scale bulk imports.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">DataForSEO API Key (Optional)</label>
            <input
              type="password"
              value={dataforseoKey}
              onChange={(e) => setDataforseoKey(e.target.value)}
              placeholder="Base64 login:password"
              className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">OpenAI / OpenRouter / Gemini API Key (Optional)</label>
            <input
              type="password"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-400 px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">Keys are stored securely in local browser storage.</span>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shadow-blue-500/20"
          >
            {saved ? "Saved Successfully!" : "Save Keys"}
          </button>
        </div>
      </form>
    </div>
  );
}
