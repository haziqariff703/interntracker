import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Static Centroids for Malaysia (State & Major Cities)
const MALAYSIA_REGIONS = [
  { name: "kuala lumpur", lat: 3.139, lng: 101.6869 },
  { name: "kl", lat: 3.139, lng: 101.6869 },
  { name: "selangor", lat: 3.0738, lng: 101.5183 },
  { name: "cyberjaya", lat: 2.9221, lng: 101.6521 },
  { name: "petaling jaya", lat: 3.1073, lng: 101.6067 },
  { name: "pj", lat: 3.1073, lng: 101.6067 },
  { name: "subang", lat: 3.0478, lng: 101.5831 },
  { name: "penang", lat: 5.4141, lng: 100.3288 },
  { name: "pulau pinang", lat: 5.4141, lng: 100.3288 },
  { name: "johor", lat: 1.4927, lng: 103.7414 },
  { name: "johor bahru", lat: 1.4927, lng: 103.7414 },
  { name: "jb", lat: 1.4927, lng: 103.7414 },
  { name: "perak", lat: 4.5975, lng: 101.0901 },
  { name: "ipoh", lat: 4.5975, lng: 101.0901 },
  { name: "melaka", lat: 2.1896, lng: 102.2501 },
  { name: "malacca", lat: 2.1896, lng: 102.2501 },
  { name: "negeri sembilan", lat: 2.7258, lng: 101.9424 },
  { name: "seremban", lat: 2.7258, lng: 101.9424 },
  { name: "pahang", lat: 3.8126, lng: 103.3256 },
  { name: "kuantan", lat: 3.8126, lng: 103.3256 },
  { name: "kedah", lat: 6.1184, lng: 100.3685 },
  { name: "sabah", lat: 5.9788, lng: 116.0753 },
  { name: "kota kinabalu", lat: 5.9788, lng: 116.0753 },
  { name: "sarawak", lat: 1.5533, lng: 110.3592 },
  { name: "kuching", lat: 1.5533, lng: 110.3592 },
  { name: "terengganu", lat: 5.3302, lng: 103.1408 },
  { name: "kelantan", lat: 6.1254, lng: 102.2381 },
  { name: "perlis", lat: 6.4406, lng: 100.1989 },
];

function matchRegion(locationStr: string | null) {
  if (!locationStr) return null;
  const lowerLoc = locationStr.toLowerCase();

  // Find the first matching region string inside the location string
  return MALAYSIA_REGIONS.find((region) => lowerLoc.includes(region.name));
}

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = new Date(thirtyDaysAgo);

    // 1. Fetch Postings
    const postingsData = await prisma.internships.findMany({
      where: {
        posted_at: {
          gte: cutoffDate,
        },
      },
      select: { location: true },
    });

    // 2. Fetch Applications
    const applicationsData = await prisma.applications.findMany({
      where: {
        applied_at: {
          gte: cutoffDate,
        },
      },
      select: {
        internships: {
          select: { location: true },
        },
      },
    });

    // 3. Aggregate Data
    const postingCounts = new Map<
      string,
      { lat: number; lng: number; weight: number; label: string }
    >();
    const applicationCounts = new Map<
      string,
      { lat: number; lng: number; weight: number; label: string }
    >();

    // Process Postings
    postingsData.forEach((posting) => {
      const match = matchRegion(posting.location);
      if (match) {
        // use standard key, e.g., map 'kl' and 'kuala lumpur' to the same coordinates if needed
        // but finding by exact region object name works here. To group properly, we can key by lat,lng
        const key = `${match.lat},${match.lng}`;
        if (!postingCounts.has(key)) {
          postingCounts.set(key, {
            lat: match.lat,
            lng: match.lng,
            weight: 0,
            label: match.name,
          });
        }
        postingCounts.get(key)!.weight += 1;
      }
    });

    // Process Applications
    applicationsData.forEach((app) => {
      const match = matchRegion(app.internships?.location || null);
      if (match) {
        const key = `${match.lat},${match.lng}`;
        if (!applicationCounts.has(key)) {
          applicationCounts.set(key, {
            lat: match.lat,
            lng: match.lng,
            weight: 0,
            label: match.name,
          });
        }
        applicationCounts.get(key)!.weight += 1;
      }
    });

    // 4. Filter for weight >= 5
    const filteredPostings = Array.from(postingCounts.values()).filter(
      (p) => p.weight >= 5,
    );
    const filteredApplications = Array.from(applicationCounts.values()).filter(
      (a) => a.weight >= 5,
    );

    // Fallback data if empty during dev/demo
    if (
      filteredPostings.length === 0 &&
      filteredApplications.length === 0 &&
      process.env.NODE_ENV === "development"
    ) {
      return NextResponse.json({
        postings: [
          { lat: 3.139, lng: 101.6869, weight: 24, label: "kuala lumpur" },
          { lat: 1.4927, lng: 103.7414, weight: 12, label: "johor bahru" },
          { lat: 5.4141, lng: 100.3288, weight: 8, label: "penang" },
        ],
        applications: [
          { lat: 3.139, lng: 101.6869, weight: 45, label: "kuala lumpur" },
          { lat: 3.0738, lng: 101.5183, weight: 22, label: "selangor" },
          { lat: 4.5975, lng: 101.0901, weight: 6, label: "ipoh" },
        ],
      });
    }

    return NextResponse.json({
      postings: filteredPostings,
      applications: filteredApplications,
    });
  } catch (error) {
    console.error("[PUBLIC_MAP_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
