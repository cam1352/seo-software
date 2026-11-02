import { DomainMetrics, KeywordItem } from "./types";
import { generateKeywordMagicResults } from "./keywords";

export async function analyzeDomain(inputDomain: string): Promise<DomainMetrics> {
  let cleanDomain = inputDomain.trim().toLowerCase();
  cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split("?")[0];
  if (!cleanDomain) {
    cleanDomain = "example.com";
  }

  // Derive root brand name
  const brandName = cleanDomain.split(".")[0];

  // Hash domain for reproducible yet realistic metrics
  let hash = 0;
  for (let i = 0; i < cleanDomain.length; i++) {
    hash = (hash << 5) - hash + cleanDomain.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // High-authority overrides for famous sites
  let authorityScore = 35 + (absHash % 48);
  if (["google.com", "github.com", "wikipedia.org", "apple.com", "microsoft.com", "amazon.com"].includes(cleanDomain)) {
    authorityScore = 94 + (absHash % 5);
  } else if (cleanDomain.endsWith(".edu") || cleanDomain.endsWith(".gov")) {
    authorityScore = 80 + (absHash % 15);
  }

  const organicTraffic = Math.round(Math.pow(authorityScore / 10, 3.2) * 220 + (absHash % 15000));
  const totalKeywords = Math.round(organicTraffic / 8.5) + 320;
  const referringDomains = Math.round(authorityScore * 42 + (absHash % 400));
  const backlinks = Math.round(referringDomains * (4.2 + (absHash % 12)));

  const brandedTrafficPercent = Math.min(65, Math.max(15, 20 + (absHash % 35)));
  const nonBrandedTrafficPercent = 100 - brandedTrafficPercent;

  // Rank distribution
  const top3 = Math.round(totalKeywords * 0.08);
  const pos4_10 = Math.round(totalKeywords * 0.18);
  const pos11_20 = Math.round(totalKeywords * 0.26);
  const pos21_50 = Math.round(totalKeywords * 0.32);
  const pos51_100 = totalKeywords - (top3 + pos4_10 + pos11_20 + pos21_50);

  // Search intent split
  const infoPercent = 45 + (absHash % 15);
  const commPercent = 20 + (absHash % 10);
  const transPercent = 15 + (absHash % 10);
  const navPercent = 100 - (infoPercent + commPercent + transPercent);

  // Generate related top ranking keywords using the keyword engine
  let keywords = await generateKeywordMagicResults(brandName);
  if (keywords.length < 5) {
    keywords = [
      {
        keyword: brandName,
        volume: 24500,
        difficulty: 72,
        cpc: 2.1,
        intent: "Navigational",
        serpFeatures: ["snippet", "peopleAlsoAsk"],
      },
      {
        keyword: `${brandName} pricing`,
        volume: 8200,
        difficulty: 45,
        cpc: 3.4,
        intent: "Commercial",
        serpFeatures: ["snippet"],
      },
      {
        keyword: `${brandName} alternatives`,
        volume: 5400,
        difficulty: 51,
        cpc: 4.1,
        intent: "Commercial",
        serpFeatures: ["snippet", "reviews"],
      },
      {
        keyword: `how to use ${brandName}`,
        volume: 3800,
        difficulty: 29,
        cpc: 1.2,
        intent: "Informational",
        serpFeatures: ["peopleAlsoAsk", "video"],
      },
    ];
  }

  // Generate realistic organic competitors
  const competitorTemplates = [
    { prefix: "get", suffix: ".com" },
    { prefix: "use", suffix: ".io" },
    { prefix: "", suffix: "hq.com" },
    { prefix: "the", suffix: "app.com" },
  ];

  const competitors = competitorTemplates.map((t, idx) => {
    const compDomain = `${t.prefix}${brandName}${idx > 0 ? idx + 1 : ""}${t.suffix}`;
    const competitionLevel = 60 + ((absHash + idx * 7) % 35);
    const commonKeywords = Math.round(totalKeywords * (0.2 + ((absHash + idx) % 30) / 100));
    const compTraffic = Math.round(organicTraffic * (0.6 + ((absHash + idx * 11) % 80) / 100));
    return {
      domain: compDomain,
      competitionLevel,
      commonKeywords,
      organicTraffic: compTraffic,
    };
  });

  return {
    domain: cleanDomain,
    authorityScore,
    organicTrafficMonthly: organicTraffic,
    totalOrganicKeywords: totalKeywords,
    backlinksCount: backlinks,
    referringDomainsCount: referringDomains,
    brandedTrafficPercent,
    nonBrandedTrafficPercent,
    rankingsDistribution: {
      top3,
      pos4_10,
      pos11_20,
      pos21_50,
      pos51_100: Math.max(0, pos51_100),
    },
    intentDistribution: {
      informational: infoPercent,
      navigational: navPercent,
      commercial: commPercent,
      transactional: transPercent,
    },
    topKeywords: keywords.slice(0, 15),
    competitors,
  };
}
