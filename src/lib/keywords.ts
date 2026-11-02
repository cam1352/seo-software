import { KeywordItem } from "./types";

const INTENT_PATTERNS = {
  transactional: /\b(buy|price|cost|pricing|cheap|discount|order|purchase|coupon|deal|quote|hire|shop)\b/i,
  commercial: /\b(best|top|review|reviews|vs|versus|compare|comparison|alternative|alternatives|pros and cons|recommended)\b/i,
  navigational: /\b(login|log in|signin|sign in|portal|dashboard|official site|account|app)\b/i,
  informational: /\b(what|how|why|when|where|who|guide|tutorial|tips|definition|learn|ideas|example|examples|template)\b/i,
};

function determineIntent(kw: string): KeywordItem["intent"] {
  if (INTENT_PATTERNS.transactional.test(kw)) return "Transactional";
  if (INTENT_PATTERNS.commercial.test(kw)) return "Commercial";
  if (INTENT_PATTERNS.navigational.test(kw)) return "Navigational";
  return "Informational";
}

function calculateDifficulty(kw: string, intent: KeywordItem["intent"]): number {
  const words = kw.trim().split(/\s+/).length;
  let base = 50;

  // Single or two words are much harder
  if (words === 1) base = 85;
  else if (words === 2) base = 68;
  else if (words === 3) base = 52;
  else if (words >= 4) base = 34; // Long tail

  if (intent === "Transactional") base += 14;
  else if (intent === "Commercial") base += 8;
  else if (intent === "Informational") base -= 8;

  // Add deterministic jitter based on string hash so numbers stay consistent
  let hash = 0;
  for (let i = 0; i < kw.length; i++) {
    hash = (hash << 5) - hash + kw.charCodeAt(i);
    hash |= 0;
  }
  const jitter = (Math.abs(hash) % 15) - 7;
  const result = Math.min(99, Math.max(12, base + jitter));
  return result;
}

function estimateVolume(kw: string, index: number, difficulty: number): number {
  const words = kw.trim().split(/\s+/).length;
  let baseVolume = 12000;
  if (words === 1) baseVolume = 45000;
  else if (words === 2) baseVolume = 18000;
  else if (words === 3) baseVolume = 6500;
  else baseVolume = 2400;

  // Decrease with suggestion rank
  const decay = Math.max(0.15, 1 - index * 0.05);
  const diffFactor = 0.5 + (difficulty / 100) * 0.8;
  const rawVol = Math.round((baseVolume * decay * diffFactor) / 100) * 100;
  return Math.max(150, rawVol);
}

function estimateCpc(intent: KeywordItem["intent"], difficulty: number): number {
  let multiplier = 1.0;
  if (intent === "Transactional") multiplier = 3.2;
  else if (intent === "Commercial") multiplier = 2.1;
  else if (intent === "Navigational") multiplier = 0.8;
  else multiplier = 0.6;

  const cpc = 0.45 + (difficulty / 100) * 2.8 * multiplier;
  return Math.round(cpc * 100) / 100;
}

export async function fetchGoogleSuggestions(query: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0",
        },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    if (Array.isArray(json) && Array.isArray(json[1])) {
      return json[1].map((item: any) => String(item).toLowerCase());
    }
  } catch {
    // fallback
  }
  return [];
}

export async function generateKeywordMagicResults(seedKeyword: string): Promise<KeywordItem[]> {
  const cleanSeed = seedKeyword.trim().toLowerCase();
  if (!cleanSeed) return [];

  // Expansion prefixes & suffixes
  const queries = [
    cleanSeed,
    `best ${cleanSeed}`,
    `${cleanSeed} vs`,
    `${cleanSeed} pricing`,
    `${cleanSeed} alternatives`,
    `how to use ${cleanSeed}`,
    `${cleanSeed} software`,
    `${cleanSeed} free`,
    `what is ${cleanSeed}`,
  ];

  const gathered = new Set<string>();
  gathered.add(cleanSeed);

  // Run in parallel for high speed
  const results = await Promise.all(queries.map((q) => fetchGoogleSuggestions(q)));
  results.forEach((list) => {
    list.forEach((kw) => gathered.add(kw));
  });

  // If few suggestions returned, add algorithmic long-tail variations
  if (gathered.size < 12) {
    const fallbackAdditions = [
      `best ${cleanSeed}`,
      `top ${cleanSeed} tools`,
      `${cleanSeed} review`,
      `${cleanSeed} for beginners`,
      `cheap ${cleanSeed}`,
      `${cleanSeed} vs competitor`,
      `how does ${cleanSeed} work`,
      `${cleanSeed} download`,
      `${cleanSeed} online`,
      `${cleanSeed} enterprise pricing`,
      `${cleanSeed} guide 2026`,
      `is ${cleanSeed} worth it`,
    ];
    fallbackAdditions.forEach((k) => gathered.add(k.toLowerCase()));
  }

  const keywordList: KeywordItem[] = Array.from(gathered).map((kw, index) => {
    const intent = determineIntent(kw);
    const difficulty = calculateDifficulty(kw, intent);
    const volume = estimateVolume(kw, index, difficulty);
    const cpc = estimateCpc(intent, difficulty);

    // Assign realistic SERP features
    const serpFeatures: KeywordItem["serpFeatures"] = ["snippet"];
    if (intent === "Informational" || kw.includes("how") || kw.includes("what")) {
      serpFeatures.push("peopleAlsoAsk");
    }
    if (intent === "Commercial" || kw.includes("review") || kw.includes("best")) {
      serpFeatures.push("reviews");
    }
    if (kw.includes("tutorial") || kw.includes("how to")) {
      serpFeatures.push("video");
    }
    if (intent === "Transactional" || kw.includes("near me") || kw.includes("service")) {
      serpFeatures.push("localPack");
    }

    let category = "General";
    if (kw.includes("vs") || kw.includes("alternative")) category = "Competitors";
    else if (kw.includes("best") || kw.includes("top") || kw.includes("review")) category = "Reviews";
    else if (kw.includes("price") || kw.includes("cost") || kw.includes("buy")) category = "Purchase";
    else if (kw.includes("how") || kw.includes("what") || kw.includes("guide")) category = "Education";

    return {
      keyword: kw,
      volume,
      difficulty,
      cpc,
      intent,
      serpFeatures,
      category,
    };
  });

  // Sort by search volume descending
  return keywordList.sort((a, b) => b.volume - a.volume);
}
