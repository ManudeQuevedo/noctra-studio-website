import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Validate and encode the URL
    let validatedUrl: string;
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      validatedUrl = urlObj.toString();
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    const encodedUrl = encodeURIComponent(validatedUrl);
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "PageSpeed API key not configured" },
        { status: 500 }
      );
    }

    // Call Google PageSpeed Insights API
    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${apiKey}&strategy=mobile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      
      // Check for specific error types
      if (response.status === 400 || errorText.includes("FAILED_TO_FETCH")) {
        return NextResponse.json(
          { error: "Could not resolve host. Please check the URL and try again." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch PageSpeed data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract metrics
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult?.categories;
    const audits = lighthouseResult?.audits;

    if (!categories || !audits) {
      return NextResponse.json(
        { error: "Invalid response from PageSpeed API" },
        { status: 500 }
      );
    }

    // Calculate performance and SEO scores (0-100)
    const performance = Math.round((categories.performance?.score ?? 0) * 100);
    const seo = Math.round((categories.seo?.score ?? 0) * 100);

    // Get LCP value
    const lcp = audits["largest-contentful-paint"]?.displayValue ?? "N/A";

    // Count issues (audits with score < 0.9)
    let issues = 0;
    Object.values(audits).forEach((audit: any) => {
      if (
        typeof audit.score === "number" &&
        audit.score < 0.9 &&
        audit.score !== null
      ) {
        issues++;
      }
    });

    return NextResponse.json({
      performance,
      seo,
      lcp,
      issues,
      url: validatedUrl,
    });
  } catch (error: any) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
