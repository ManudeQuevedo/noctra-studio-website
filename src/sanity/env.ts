export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-16";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // During build time, don't crash the entire build if variables are missing.
    // This allows the build to pass and the user to add the variables in Vercel.
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production') {
       console.warn(`[Sanity Env Warning]: ${errorMessage}`);
       return "" as unknown as T;
    }
    throw new Error(errorMessage);
  }

  return v;
}
