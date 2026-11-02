export interface AuditIssue {
  id: string;
  type: "error" | "warning" | "notice";
  category: "crawlability" | "meta" | "content" | "links" | "performance" | "security";
  title: string;
  description: string;
  recommendation: string;
  affectedElements?: string[];
}

export interface AuditResult {
  url: string;
  crawlTimeMs: number;
  statusCode: number;
  statusText: string;
  healthScore: number;
  totalIssues: number;
  errorsCount: number;
  warningsCount: number;
  noticesCount: number;
  metrics: {
    title: string;
    titleLength: number;
    metaDescription: string;
    descriptionLength: number;
    canonicalUrl: string | null;
    isCanonicalMatching: boolean;
    robotsMeta: string | null;
    h1Count: number;
    h1Tags: string[];
    h2Count: number;
    h3Count: number;
    imagesTotal: number;
    imagesMissingAlt: number;
    internalLinksCount: number;
    externalLinksCount: number;
    isHttps: boolean;
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    hasSchemaJsonLd: boolean;
    schemaTypes: string[];
    viewportConfigured: boolean;
    wordCount: number;
  };
  issues: AuditIssue[];
}

export interface KeywordItem {
  keyword: string;
  volume: number;
  difficulty: number; // 0 - 100
  cpc: number;
  intent: "Informational" | "Navigational" | "Commercial" | "Transactional";
  serpFeatures: ("snippet" | "peopleAlsoAsk" | "video" | "localPack" | "reviews")[];
  category?: string;
}

export interface DomainMetrics {
  domain: string;
  authorityScore: number; // 0 - 100
  organicTrafficMonthly: number;
  totalOrganicKeywords: number;
  backlinksCount: number;
  referringDomainsCount: number;
  brandedTrafficPercent: number;
  nonBrandedTrafficPercent: number;
  rankingsDistribution: {
    top3: number;
    pos4_10: number;
    pos11_20: number;
    pos21_50: number;
    pos51_100: number;
  };
  intentDistribution: {
    informational: number;
    navigational: number;
    commercial: number;
    transactional: number;
  };
  topKeywords: KeywordItem[];
  competitors: {
    domain: string;
    competitionLevel: number;
    commonKeywords: number;
    organicTraffic: number;
  }[];
}

export interface GeoEngineResult {
  engine: "ChatGPT Search" | "Perplexity AI" | "Google AI Overview" | "Claude" | "Gemini";
  cited: boolean;
  citationRank?: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  snippet: string;
  recommendedQuery: string;
  confidenceScore: number;
}

export interface GeoLocationResult {
  countryCode: string;
  countryName: string;
  rankingPosition: number;
  searchVolume: number;
  cpc: number;
  hasLocalPack: boolean;
  serpTopResult: string;
}

export interface GeoReport {
  target: string;
  query: string;
  overallVisibilityScore: number; // 0 - 100
  citationSharePercent: number;
  aiEngines: GeoEngineResult[];
  geoLocations: GeoLocationResult[];
  actionableInsights: string[];
}

export interface BacklinkSubmissionPayload {
  targetUrl: string;
  domain: string;
  anchorText?: string;
  siteName?: string;
  description?: string;
  category?: string;
}

export interface SubmissionServiceResult {
  service: string;
  type: "indexnow" | "ping" | "directory" | "aggregator";
  status: "success" | "pending" | "failed";
  message: string;
  timestamp: string;
  targetUrl: string;
}

export interface BacklinkVerificationResult {
  backlinkUrl: string;
  targetUrl: string;
  found: boolean;
  statusCode: number;
  anchorText: string;
  isDoFollow: boolean;
  relAttributes: string[];
  lastChecked: string;
}
