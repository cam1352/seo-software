import { NextRequest, NextResponse } from "next/server";
import {
  submitToIndexNow,
  pingAggregators,
  batchSubmitDirectories,
  getFreshBacklinkOpportunities,
  DirectoryPlatform,
} from "@/lib/backlinks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      targetUrl,
      domain,
      siteName,
      category = "Software, SaaS & Developer Tools",
      locations = [],
      locationRaw = "",
      submittedIds = [],
      targetDirectories = [],
    } = body;

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing 'targetUrl' parameter" }, { status: 400 });
    }

    const host = domain || targetUrl.replace(/^https?:\/\//, "").split("/")[0];

    // Parse locations if string provided
    const parsedLocations: string[] = Array.isArray(locations) && locations.length > 0
      ? locations
      : locationRaw
      ? locationRaw
          .split(/[,;\n]+/)
          .map((l: string) => l.trim())
          .filter(Boolean)
      : [];

    // 1. Submit to IndexNow Protocol (Bing, Yandex, Seznam, Naver)
    const indexNow = await submitToIndexNow(host, [targetUrl]);

    // 2. Broadcast Webmaster Pings
    const pings = await pingAggregators(siteName || host, targetUrl, parsedLocations[0]);

    // 3. Batch Submit Target Directories / Local Citations
    const directories = await batchSubmitDirectories(
      {
        targetUrl,
        domain: host,
        siteName: siteName || host,
        category,
        locations: parsedLocations,
      },
      targetDirectories as DirectoryPlatform[]
    );

    // 4. Calculate newly submitted directory IDs
    const newlySubmittedIds = [
      ...submittedIds,
      ...directories.map((d) => d.id || d.service),
    ];

    // 5. Generate a brand-new FRESH list of unsubmitted backlink opportunities for the next cycle
    const nextFreshBatch = getFreshBacklinkOpportunities(
      category,
      parsedLocations,
      newlySubmittedIds,
      12
    );

    const allDispatched = [indexNow, ...pings, ...directories];

    return NextResponse.json({
      success: true,
      summary: {
        indexNowStatus: indexNow.status,
        pingsSent: pings.length,
        directoriesSubmitted: directories.length,
        totalChannels: allDispatched.length,
        locationsTargeted: parsedLocations.length || 1,
        category,
      },
      results: allDispatched,
      freshBatch: nextFreshBatch,
      nextBatchReady: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Backlink submission failed" }, { status: 500 });
  }
}
