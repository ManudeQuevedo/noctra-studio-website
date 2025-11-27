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
    const pageSpeedPromise = fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${apiKey}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`,
      { headers: { "Content-Type": "application/json" } }
    );

    // Call Mozilla Observatory API with Retry Logic
    const hostname = new URL(validatedUrl).hostname;
    
    const fetchSecurity = async () => {
      try {
        // Initial scan trigger
        let secRes = await fetch(
          `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "hidden=true&rescan=true",
          }
        );

        if (!secRes.ok) return null;
        let secData = await secRes.json();

        // Retry if pending (max 3 attempts, 1s delay)
        let attempts = 0;
        while ((secData.state === "PENDING" || secData.state === "STARTING") && attempts < 3) {
          await new Promise(r => setTimeout(r, 1000));
          secRes = await fetch(
            `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
            { method: "GET" } // Use GET to check status
          );
          if (secRes.ok) {
            secData = await secRes.json();
          }
          attempts++;
        }
        return secData;
      } catch (e) {
        console.error("Security scan error:", e);
        return null;
      }
    };

    const securityPromise = fetchSecurity();

    const [response, securityData] = await Promise.all([
      pageSpeedPromise,
      securityPromise,
    ]);

    // Process PageSpeed Data
    if (!response.ok) {
      const errorText = await response.text();
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
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult?.categories;
    const audits = lighthouseResult?.audits;

    if (!categories || !audits) {
      return NextResponse.json(
        { error: "Invalid response from PageSpeed API" },
        { status: 500 }
      );
    }

    const performance = Math.round((categories.performance?.score ?? 0) * 100);
    const seo = Math.round((categories.seo?.score ?? 0) * 100);
    const accessibility = Math.round((categories.accessibility?.score ?? 0) * 100);
    const bestPractices = Math.round((categories["best-practices"]?.score ?? 0) * 100);
    const lcp = audits["largest-contentful-paint"]?.displayValue ?? "N/A";

    let issues = 0;
    Object.values(audits).forEach((audit: any) => {
      if (typeof audit.score === "number" && audit.score < 0.9 && audit.score !== null) {
        issues++;
      }
    });

    // Process Security Data
    let security = {
      grade: "N/A",
      score: 0,
      status: "unknown"
    };

    if (securityData) {
      if (securityData.grade) {
        security.grade = securityData.grade;
        security.score = securityData.score || 0;
        security.status = "finished";
      } else if (securityData.state === "PENDING" || securityData.state === "STARTING") {
         security.grade = "Scanning...";
         security.status = "pending";
      }
    }

    return NextResponse.json({
      performance,
      seo,
      accessibility,
      bestPractices,
      lcp,
      issues,
      url: validatedUrl,
      security,
    });
  } catch (error: any) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
