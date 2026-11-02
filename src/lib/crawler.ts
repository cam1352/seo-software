import * as cheerio from "cheerio";
import { AuditResult, AuditIssue } from "./types";

export async function crawlAndAudit(targetUrl: string): Promise<AuditResult> {
  let urlObj: URL;
  try {
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }
    urlObj = new URL(targetUrl);
  } catch {
    throw new Error("Invalid URL provided. Please provide a valid web address.");
  }

  const startTime = Date.now();
  let response: Response;
  let html = "";
  let statusCode = 200;
  let statusText = "OK";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    response = await fetch(urlObj.href, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (ApexSEO-Audit-Bot/1.0)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);
    statusCode = response.status;
    statusText = response.statusText;
    html = await response.text();
  } catch (err: any) {
    statusCode = 500;
    statusText = err?.message || "Failed to fetch URL";
    html = `<html><head><title>Fetch Error</title></head><body><h1>Could not reach server</h1></body></html>`;
  }

  const crawlTimeMs = Date.now() - startTime;
  const $ = cheerio.load(html);

  // Meta & Title
  const title = $("title").first().text().trim() || "";
  const metaDesc = $('meta[name="description"]').attr("content")?.trim() || "";
  const canonical = $('link[rel="canonical"]').attr("href")?.trim() || null;
  const robotsMeta = $('meta[name="robots"]').attr("content")?.trim() || null;
  const viewport = $('meta[name="viewport"]').attr("content")?.trim() || null;

  // Headings
  const h1Tags: string[] = [];
  $("h1").each((_, el) => {
    const txt = $(el).text().trim();
    if (txt) h1Tags.push(txt);
  });
  const h2Count = $("h2").length;
  const h3Count = $("h3").length;

  // Images
  const images = $("img");
  let missingAlt = 0;
  images.each((_, el) => {
    const alt = $(el).attr("alt");
    if (alt === undefined || alt === null || alt.trim() === "") {
      missingAlt++;
    }
  });

  // Links
  let internalLinks = 0;
  let externalLinks = 0;
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")?.trim();
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      try {
        const linkUrl = new URL(href);
        if (linkUrl.hostname === urlObj.hostname) {
          internalLinks++;
        } else {
          externalLinks++;
        }
      } catch {
        // invalid URL
      }
    } else {
      internalLinks++;
    }
  });

  // Social tags
  const ogTitle = $('meta[property="og:title"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const hasOpenGraph = Boolean(ogTitle || ogImage);
  const twitterCard = $('meta[name="twitter:card"]').attr("content");
  const hasTwitterCard = Boolean(twitterCard);

  // Schema JSON-LD
  const schemaTypes: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html() || "{}");
      if (parsed["@type"]) {
        if (Array.isArray(parsed["@type"])) {
          schemaTypes.push(...parsed["@type"]);
        } else {
          schemaTypes.push(parsed["@type"]);
        }
      }
    } catch {
      // invalid JSON-LD
    }
  });

  // Content Word Count
  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText ? bodyText.split(" ").length : 0;
  const isHttps = urlObj.protocol === "https:";

  // Issues generation
  const issues: AuditIssue[] = [];

  if (statusCode >= 400) {
    issues.push({
      id: "http-error",
      type: "error",
      category: "crawlability",
      title: `Page returned HTTP ${statusCode}`,
      description: `The web server responded with error code ${statusCode} (${statusText}).`,
      recommendation: "Ensure the page returns a 200 OK status code and is accessible to search engine crawlers.",
    });
  }

  if (!isHttps) {
    issues.push({
      id: "no-https",
      type: "error",
      category: "security",
      title: "Page is not served over secure HTTPS",
      description: "Google considers HTTPS a confirmed ranking signal. Unencrypted pages show browser security warnings.",
      recommendation: "Install an SSL certificate and redirect all HTTP traffic to HTTPS via 301 redirects.",
    });
  }

  if (!title) {
    issues.push({
      id: "missing-title",
      type: "error",
      category: "meta",
      title: "Missing <title> tag",
      description: "The page does not have a title tag. Search engines rely on title tags to understand the page topic.",
      recommendation: "Add a concise, keyword-optimized title tag between 50 and 60 characters.",
    });
  } else if (title.length < 30) {
    issues.push({
      id: "short-title",
      type: "warning",
      category: "meta",
      title: `Title tag is too short (${title.length} characters)`,
      description: "Short titles miss the opportunity to target secondary keywords and context.",
      recommendation: "Expand the title tag to 50-60 characters including your brand and primary keywords.",
    });
  } else if (title.length > 65) {
    issues.push({
      id: "long-title",
      type: "warning",
      category: "meta",
      title: `Title tag is too long (${title.length} characters)`,
      description: "Titles longer than 60-65 characters will be truncated with an ellipsis in Google search results.",
      recommendation: "Keep your title tag under 60 characters to ensure it renders completely in SERPs.",
    });
  }

  if (!metaDesc) {
    issues.push({
      id: "missing-meta-description",
      type: "warning",
      category: "meta",
      title: "Missing meta description tag",
      description: "Without a meta description, search engines auto-generate snippet text from random page content.",
      recommendation: "Write an engaging meta description of 120-160 characters with a clear call-to-action.",
    });
  } else if (metaDesc.length < 70 || metaDesc.length > 165) {
    issues.push({
      id: "suboptimal-meta-description",
      type: "notice",
      category: "meta",
      title: `Suboptimal meta description length (${metaDesc.length} characters)`,
      description: "Optimal meta descriptions should be between 120 and 160 characters for maximum CTR.",
      recommendation: "Adjust meta description to ~140-155 characters.",
    });
  }

  if (h1Tags.length === 0) {
    issues.push({
      id: "missing-h1",
      type: "error",
      category: "content",
      title: "Missing <h1> heading",
      description: "The page does not contain any <h1> heading tag, which is essential for topical hierarchy.",
      recommendation: "Add exactly one descriptive <h1> tag containing your primary keyword near the top of the content.",
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      id: "multiple-h1",
      type: "notice",
      category: "content",
      title: `Multiple <h1> tags found (${h1Tags.length})`,
      description: "While HTML5 permits multiple H1s, best practice for SEO is having a single primary H1 per page.",
      recommendation: "Consolidate into one main <h1> and use <h2> and <h3> for sub-sections.",
      affectedElements: h1Tags,
    });
  }

  if (missingAlt > 0) {
    issues.push({
      id: "missing-image-alt",
      type: "warning",
      category: "content",
      title: `${missingAlt} image(s) missing alt attribute`,
      description: "Image alt attributes improve image search rankings and accessibility for screen readers.",
      recommendation: "Add descriptive, keyword-relevant alt attributes to all informational images.",
    });
  }

  if (!canonical) {
    issues.push({
      id: "missing-canonical",
      type: "warning",
      category: "crawlability",
      title: "Missing canonical URL tag",
      description: "A self-referencing canonical tag prevents duplicate content issues from URL parameters and tracking tags.",
      recommendation: `Add <link rel="canonical" href="${urlObj.origin}${urlObj.pathname}"> to the <head>.`,
    });
  }

  if (!viewport) {
    issues.push({
      id: "missing-viewport",
      type: "error",
      category: "performance",
      title: "Missing mobile viewport meta tag",
      description: "Mobile-first indexing requires responsive viewport configuration.",
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">.',
    });
  }

  if (schemaTypes.length === 0) {
    issues.push({
      id: "missing-schema",
      type: "notice",
      category: "meta",
      title: "No Schema.org (JSON-LD) structured data detected",
      description: "Structured data enables Google rich snippets (breadcrumbs, FAQs, organization cards, reviews).",
      recommendation: "Implement JSON-LD Schema markup such as WebSite, Organization, Article, or Product.",
    });
  }

  if (!hasOpenGraph) {
    issues.push({
      id: "missing-opengraph",
      type: "notice",
      category: "meta",
      title: "Missing Open Graph tags (og:title / og:image)",
      description: "Social shares on LinkedIn, Slack, X, and Facebook will display generic fallback cards without OG tags.",
      recommendation: "Add og:title, og:description, and og:image tags.",
    });
  }

  if (wordCount < 300) {
    issues.push({
      id: "thin-content",
      type: "warning",
      category: "content",
      title: `Thin content detected (~${wordCount} words)`,
      description: "Pages with very little body text often struggle to rank for competitive search terms.",
      recommendation: "Provide in-depth, valuable text content to satisfy search intent.",
    });
  }

  // Calculate Health Score
  const errorsCount = issues.filter((i) => i.type === "error").length;
  const warningsCount = issues.filter((i) => i.type === "warning").length;
  const noticesCount = issues.filter((i) => i.type === "notice").length;

  let healthScore = 100 - errorsCount * 18 - warningsCount * 6 - noticesCount * 2;
  if (healthScore < 0) healthScore = 0;
  if (healthScore > 100) healthScore = 100;

  return {
    url: urlObj.href,
    crawlTimeMs,
    statusCode,
    statusText,
    healthScore,
    totalIssues: issues.length,
    errorsCount,
    warningsCount,
    noticesCount,
    metrics: {
      title,
      titleLength: title.length,
      metaDescription: metaDesc,
      descriptionLength: metaDesc.length,
      canonicalUrl: canonical,
      isCanonicalMatching: canonical ? canonical === urlObj.href || canonical === urlObj.origin + urlObj.pathname : false,
      robotsMeta,
      h1Count: h1Tags.length,
      h1Tags,
      h2Count,
      h3Count,
      imagesTotal: images.length,
      imagesMissingAlt: missingAlt,
      internalLinksCount: internalLinks,
      externalLinksCount: externalLinks,
      isHttps,
      hasOpenGraph,
      hasTwitterCard,
      hasSchemaJsonLd: schemaTypes.length > 0,
      schemaTypes,
      viewportConfigured: Boolean(viewport),
      wordCount,
    },
    issues,
  };
}
