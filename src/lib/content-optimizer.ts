export interface ContentAnalysisResult {
  score: number; // 0 - 100
  wordCount: number;
  sentenceCount: number;
  readingTimeMinutes: number;
  readability: {
    fleschReadingEase: number;
    gradeLevel: string;
    readingEaseLabel: "Very Easy" | "Easy" | "Fairly Easy" | "Standard" | "Fairly Difficult" | "Difficult";
  };
  keywordsAnalysis: {
    keyword: string;
    count: number;
    densityPercent: number;
    status: "optimal" | "low" | "stuffed";
    recommendation: string;
  }[];
  recommendations: string[];
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, "");
  word = word.replace(/^y/, "");
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

export function analyzeContent(
  text: string,
  targetKeywords: string[]
): ContentAnalysisResult {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      score: 0,
      wordCount: 0,
      sentenceCount: 0,
      readingTimeMinutes: 0,
      readability: {
        fleschReadingEase: 0,
        gradeLevel: "N/A",
        readingEaseLabel: "Difficult",
      },
      keywordsAnalysis: [],
      recommendations: ["Start typing or paste your article content to begin SEO analysis."],
    };
  }

  // Words & Sentences
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  // Syllables for Flesch Readability
  let totalSyllables = 0;
  for (const w of words) {
    totalSyllables += countSyllables(w);
  }

  // Flesch Reading Ease: 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = totalSyllables / Math.max(1, wordCount);
  let fre = Math.round(206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord);
  fre = Math.min(100, Math.max(0, fre));

  let readingEaseLabel: ContentAnalysisResult["readability"]["readingEaseLabel"] = "Standard";
  let gradeLevel = "8th - 9th Grade";
  if (fre >= 90) {
    readingEaseLabel = "Very Easy";
    gradeLevel = "5th Grade";
  } else if (fre >= 80) {
    readingEaseLabel = "Easy";
    gradeLevel = "6th Grade";
  } else if (fre >= 70) {
    readingEaseLabel = "Fairly Easy";
    gradeLevel = "7th Grade";
  } else if (fre >= 60) {
    readingEaseLabel = "Standard";
    gradeLevel = "8th - 9th Grade";
  } else if (fre >= 50) {
    readingEaseLabel = "Fairly Difficult";
    gradeLevel = "10th - 12th Grade";
  } else {
    readingEaseLabel = "Difficult";
    gradeLevel = "College Level";
  }

  // Keywords Analysis
  const lowerText = cleanText.toLowerCase();
  const keywordsAnalysis = targetKeywords.map((kw) => {
    const cleanKw = kw.trim().toLowerCase();
    if (!cleanKw) {
      return {
        keyword: kw,
        count: 0,
        densityPercent: 0,
        status: "low" as const,
        recommendation: "Provide a valid target keyword",
      };
    }

    // RegEx match count
    const regex = new RegExp(`\\b${cleanKw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
    const matches = lowerText.match(regex);
    const count = matches ? matches.length : 0;
    const densityPercent = Math.round((count / Math.max(1, wordCount)) * 1000) / 10;

    let status: "optimal" | "low" | "stuffed" = "optimal";
    let recommendation = `Good keyword density (${densityPercent}%). Keep it natural.`;

    if (count === 0) {
      status = "low";
      recommendation = `Target keyword "${kw}" is missing! Add it in the introduction and at least once per 300 words.`;
    } else if (densityPercent < 0.6) {
      status = "low";
      recommendation = `Density is slightly low (${densityPercent}%). Consider including it in a subheading or concluding paragraph.`;
    } else if (densityPercent > 3.0) {
      status = "stuffed";
      recommendation = `High density (${densityPercent}%). Beware of keyword stuffing penalties; replace some instances with synonyms.`;
    }

    return {
      keyword: kw,
      count,
      densityPercent,
      status,
      recommendation,
    };
  });

  // Recommendations
  const recommendations: string[] = [];
  if (wordCount < 400) {
    recommendations.push(`Content is brief (${wordCount} words). Expand to at least 800-1200 words for competitive search topics.`);
  } else if (wordCount >= 1000) {
    recommendations.push(`Great content depth (${wordCount} words). Comprehensive guides perform best in organic SERPs.`);
  }

  if (fre < 55) {
    recommendations.push(`Readability score is ${fre}/100 (${readingEaseLabel}). Shorten complex sentences to make the article easier to digest.`);
  }

  for (const k of keywordsAnalysis) {
    if (k.status !== "optimal") {
      recommendations.push(k.recommendation);
    }
  }

  // Heading check in markdown / text
  const headingMatches = cleanText.match(/^#{1,3}\s+.+/gm) || [];
  if (headingMatches.length === 0 && wordCount > 250) {
    recommendations.push(`No subheadings detected. Use H2 and H3 tags to break up long blocks of text.`);
  }

  // Score calculation
  let score = 50;
  if (wordCount >= 800) score += 20;
  else if (wordCount >= 400) score += 10;

  if (fre >= 60) score += 15;
  else if (fre >= 50) score += 8;

  const optimalKeywords = keywordsAnalysis.filter((k) => k.status === "optimal").length;
  if (keywordsAnalysis.length > 0) {
    score += Math.round((optimalKeywords / keywordsAnalysis.length) * 15);
  } else {
    score += 10;
  }

  return {
    score: Math.min(100, Math.max(10, score)),
    wordCount,
    sentenceCount,
    readingTimeMinutes,
    readability: {
      fleschReadingEase: fre,
      gradeLevel,
      readingEaseLabel,
    },
    keywordsAnalysis,
    recommendations,
  };
}
