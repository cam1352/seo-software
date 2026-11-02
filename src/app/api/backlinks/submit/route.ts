import { NextRequest, NextResponse } from "next/server";
import { submitToIndexNow, pingAggregators, batchSubmitDirectories } from "@/lib/backlinks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetUrl, domain, siteName, category } = body;
    if (!targetUrl) {
      return NextResponse.json({ error: "Missing 'targetUrl' parameter" }, { status: 400 });
    }

    const host = domain || targetUrl.replace(/^https?:\/\//, "").split("/")[0];
    const indexNow = await submitToIndexNow(host, [targetUrl]);
    const pings = await pingAggregators(siteName || host, targetUrl);
    const directories = await batchSubmitDirectories({
      targetUrl,
      domain: host,
      siteName: siteName || host,
      category: category || "Tech & SaaS",
    });

    return NextResponse.json({
      success: true,
      summary: {
        indexNowStatus: indexNow.status,
        pingsSent: pings.length,
        directoriesSubmitted: directories.length,
        totalChannels: 1 + pings.length + directories.length,
      },
      results: [indexNow, ...pings, ...directories],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Backlink submission failed" }, { status: 500 });
  }
}
