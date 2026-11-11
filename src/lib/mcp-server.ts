import { crawlAndAudit } from "./crawler";
import { generateKeywordMagicResults } from "./keywords";
import { analyzeDomain } from "./domain-analyzer";
import { trackGeoAndAiVisibility } from "./geo-tracker";
import { submitToIndexNow, pingAggregators, verifyLiveBacklink } from "./backlinks";
import { analyzeContent } from "./content-optimizer";

export interface McpToolCallRequest {
  tool: string;
  arguments: Record<string, any>;
}

export async function handleMcpToolCall(req: McpToolCallRequest): Promise<any> {
  const { tool, arguments: args } = req;

  switch (tool) {
    case "audit_url": {
      const url = args.url || args.targetUrl;
      if (!url) throw new Error("Missing 'url' argument");
      return await crawlAndAudit(url);
    }

    case "research_keywords": {
      const seed = args.seed || args.keyword;
      if (!seed) throw new Error("Missing 'seed' argument");
      return await generateKeywordMagicResults(seed);
    }

    case "domain_overview": {
      const domain = args.domain;
      if (!domain) throw new Error("Missing 'domain' argument");
      return await analyzeDomain(domain);
    }

    case "track_geo_visibility": {
      const target = args.target || args.domain || args.brand;
      if (!target) throw new Error("Missing 'target' argument");
      return await trackGeoAndAiVisibility(target, args.query);
    }

    case "submit_backlinks": {
      const url = args.url || args.targetUrl;
      const host = args.host || args.domain;
      if (!url) throw new Error("Missing 'url' argument");
      const indexNowRes = await submitToIndexNow(host || url, [url]);
      const pingRes = await pingAggregators(args.siteName || host || "SEO Software Site", url);
      return { indexNow: indexNowRes, pings: pingRes };
    }

    case "verify_backlink": {
      const { backlinkUrl, targetUrl } = args;
      if (!backlinkUrl || !targetUrl) throw new Error("Missing 'backlinkUrl' or 'targetUrl' argument");
      return await verifyLiveBacklink(backlinkUrl, targetUrl);
    }

    case "optimize_content": {
      const { content, targetKeywords } = args;
      if (!content) throw new Error("Missing 'content' argument");
      const keywords = Array.isArray(targetKeywords)
        ? targetKeywords
        : typeof targetKeywords === "string"
        ? targetKeywords.split(",").map((k) => k.trim())
        : [];
      return analyzeContent(content, keywords);
    }

    default:
      throw new Error(`Unknown MCP tool: ${tool}`);
  }
}

export function getMcpManifest() {
  return {
    name: "seo-software-mcp-server",
    version: "1.0.0",
    description: "Model Context Protocol interface for SEO Software intelligence, site audits, and backlink automation",
    tools: [
      {
        name: "audit_url",
        description: "Run a real-time 25+ checkpoint technical SEO audit on any URL.",
        parameters: {
          type: "object",
          properties: { url: { type: "string", description: "The full target URL to audit" } },
          required: ["url"],
        },
      },
      {
        name: "research_keywords",
        description: "Explore search volume, KD%, intent, and SERP features for any seed keyword.",
        parameters: {
          type: "object",
          properties: { seed: { type: "string", description: "The root keyword seed" } },
          required: ["seed"],
        },
      },
      {
        name: "domain_overview",
        description: "Fetch organic traffic, authority score, competitor overlap, and top keywords for a domain.",
        parameters: {
          type: "object",
          properties: { domain: { type: "string", description: "Domain name (e.g. github.com)" } },
          required: ["domain"],
        },
      },
      {
        name: "track_geo_visibility",
        description: "Track Generative Engine Optimization (AI search citations) and multi-country geographic rankings.",
        parameters: {
          type: "object",
          properties: {
            target: { type: "string", description: "Brand name or domain" },
            query: { type: "string", description: "Optional specific query topic" },
          },
          required: ["target"],
        },
      },
      {
        name: "submit_backlinks",
        description: "Automatically submit URLs to IndexNow and webmaster ping networks for rapid indexing.",
        parameters: {
          type: "object",
          properties: {
            url: { type: "string", description: "URL to submit" },
            domain: { type: "string", description: "Root domain" },
          },
          required: ["url"],
        },
      },
      {
        name: "verify_backlink",
        description: "Crawl a referring page to confirm presence of a backlink, its anchor text, and dofollow status.",
        parameters: {
          type: "object",
          properties: {
            backlinkUrl: { type: "string", description: "Page where your backlink is expected" },
            targetUrl: { type: "string", description: "Your destination URL" },
          },
          required: ["backlinkUrl", "targetUrl"],
        },
      },
      {
        name: "optimize_content",
        description: "Analyze readability, keyword density, and SEO quality of article text.",
        parameters: {
          type: "object",
          properties: {
            content: { type: "string", description: "Article text or markdown" },
            targetKeywords: { type: "array", items: { type: "string" }, description: "List of target keywords" },
          },
          required: ["content"],
        },
      },
    ],
  };
}
