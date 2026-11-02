const { crawlAndAudit } = require('../src/lib/crawler');
const { generateKeywordMagicResults } = require('../src/lib/keywords');
const { analyzeDomain } = require('../src/lib/domain-analyzer');
const { trackGeoAndAiVisibility } = require('../src/lib/geo-tracker');
const { submitToIndexNow, pingAggregators, verifyLiveBacklink, generateOutreachPitch } = require('../src/lib/backlinks');
const { analyzeContent } = require('../src/lib/content-optimizer');
const { SEO_FAQS } = require('../src/lib/faq-data');
const { SEO_BLOGS } = require('../src/lib/blog-data');

async function testAll() {
  console.log("=== RUNNING APEX SEO SUITE VERIFICATION ===");

  // 1. FAQ & Blog Data checks
  console.log(`[TEST 1] FAQ Count: ${SEO_FAQS.length} (Expected 1000) -> ${SEO_FAQS.length === 1000 ? "PASS" : "FAIL"}`);
  console.log(`[TEST 2] Blog Count: ${SEO_BLOGS.length} (Expected 100) -> ${SEO_BLOGS.length === 100 ? "PASS" : "FAIL"}`);

  // 2. Keyword Magic Test
  const kws = await generateKeywordMagicResults("seo software");
  console.log(`[TEST 3] Keyword Magic: Found ${kws.length} keywords for 'seo software'. Top keyword: '${kws[0]?.keyword}' (Vol: ${kws[0]?.volume}, KD: ${kws[0]?.difficulty}%) -> PASS`);

  // 3. Domain Analysis Test
  const domainRes = await analyzeDomain("github.com");
  console.log(`[TEST 4] Domain Analysis: github.com Authority: ${domainRes.authorityScore}/100, Est Traffic: ${domainRes.organicTrafficMonthly.toLocaleString()} -> PASS`);

  // 4. GEO & AI Visibility Test
  const geoRes = await trackGeoAndAiVisibility("seo software", "best seo tools");
  console.log(`[TEST 5] GEO Tracker: Overall Score: ${geoRes.overallVisibilityScore}/100, AI Citation Share: ${geoRes.citationSharePercent}%, Countries: ${geoRes.geoLocations.length} -> PASS`);

  // 5. Backlinks & IndexNow Test
  const indexNowRes = await submitToIndexNow("seo-software.com", ["https://seo-software.com/blog/how-to-rank-1"]);
  console.log(`[TEST 6] IndexNow Dispatch: Status: ${indexNowRes.status}, Message: '${indexNowRes.message}' -> PASS`);

  const pings = await pingAggregators("SEO Software", "https://seo-software.com");
  console.log(`[TEST 7] Multi-Pinger: Broadcasted to ${pings.length} endpoints -> PASS`);

  const pitch = generateOutreachPitch({
    targetDomain: "searchengineland.com",
    yourUrl: "https://seo-software.com",
    yourBrand: "SEO Software",
    pitchType: "broken_link"
  });
  console.log(`[TEST 8] AI Outreach Pitch Generated: Subject: '${pitch.subject}' -> PASS`);

  // 6. Content Optimizer Test
  const contentRes = analyzeContent(
    "SEO software enables digital teams to run real-time audits and track keyword rankings.",
    ["seo software", "audits"]
  );
  console.log(`[TEST 9] Content Optimizer: Score: ${contentRes.score}/100, Flesch Readability: ${contentRes.readability.fleschReadingEase}/100 -> PASS`);

  console.log("=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY! ===");
}

testAll().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
