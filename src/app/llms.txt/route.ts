import { NextResponse } from "next/server";

export async function GET() {
  const content = `# SEO Software (https://seosoftware.io)
> Rank #1 SEO Intelligence, GEO AI Engine Citations & Automated Backlink Suite ($99/mo).

## Overview
SEO Software is a next-generation search intelligence and Generative Engine Optimization (GEO) platform. It provides unlimited technical site audits, Keyword Magic discovery with live Google Autocomplete scraping, IndexNow protocol backlink submissions, local multi-location citations, and MCP AI agent connectivity.

## Core Capabilities
- **Technical Site Audit (/audit)**: 25+ checkpoint real-time crawler analyzing HTTP status, Core Web Vitals, Schema.org JSON-LD, E-E-A-T score, and agent readiness.
- **Keyword Magic Tool (/keywords)**: Discovery engine with search volume, KD% difficulty, CPC, and intent classification (Informational, Navigational, Commercial, Transactional).
- **Domain Overview (/domain)**: Authority score, monthly organic traffic estimates, intent breakdown, and competitor matrix.
- **GEO & AI Visibility Tracker (/geo)**: Dual GEO engine simulating and tracking brand citations across ChatGPT, Perplexity AI, Claude, and Google AI Overviews plus 12-country regional SERPs.
- **Automated Backlink Hub (/backlinks)**: Instant IndexNow engine dispatcher (Bing, Yandex, Seznam, Naver), ping network broadcast, 36 business categories, multi-location citation builder, and continuous fresh batch rotation.
- **Competitor Gap Analysis (/gap)**: Keyword and content gap discovery across 3 domains simultaneously.
- **SEO Writing Assistant (/content)**: Live content optimizer measuring Flesch-Kincaid readability, grade level, and keyword density.
- **Knowledge Base (/faq)**: 1,000 programmatic FAQs with Schema.org FAQPage JSON-LD rich snippet markup.
- **Blueprints & Guides (/blogs)**: 100 programmatic ranking blueprints.
- **Model Context Protocol (/api/mcp)**: Native MCP endpoint exposing audit_url, research_keywords, domain_overview, track_geo_visibility, submit_backlinks, verify_backlink, and optimize_content for Claude Code, Antigravity, and ChatGPT.

## API Endpoints
- POST /api/audit: Crawl and audit any URL. Body: { "url": string }
- POST /api/keywords: Scrape suggestions and search volume. Body: { "seed": string }
- POST /api/domain: Analyze domain metrics. Body: { "domain": string }
- POST /api/geo: Simulate AI citations and regional SERPs. Body: { "target": string, "query": string }
- POST /api/backlinks/submit: Batch submit IndexNow, pings, and citations. Body: { "targetUrl": string, "siteName": string, "category": string, "locations": string[] }
- POST /api/backlinks/verify: Check live backlink DOM presence and rel attributes. Body: { "backlinkUrl": string, "targetUrl": string }
- POST /api/content: Analyze readability and keyword density. Body: { "content": string, "keywords": string[] }
- POST /api/mcp: Model Context Protocol standard agent endpoint.

## Pricing
- Plan: SEO Software Pro
- Cost: $99/month (flat rate, no credits, no paywalled add-on fees)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
