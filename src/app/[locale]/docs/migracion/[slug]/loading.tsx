export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-10 p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
        <div className="w-16 h-16 rounded-xl bg-slate-800 shrink-0" />
        <div className="flex-1 w-full space-y-3">
          <div className="h-8 bg-slate-800 rounded w-1/3" />
          <div className="flex gap-3">
            <div className="h-4 bg-slate-800 rounded w-20" />
            <div className="h-4 bg-slate-800 rounded w-20" />
            <div className="h-4 bg-slate-800 rounded w-24" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-slate-800 rounded w-16" />
            <div className="h-6 bg-slate-800 rounded w-20" />
          </div>
        </div>
        <div className="w-full sm:w-40 h-10 bg-slate-800 rounded-xl shrink-0" />
      </div>

      {/* Content Skeletons */}
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/4 mb-6" />
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-4 bg-slate-800 rounded w-4/6" />
        </div>

        <div className="space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/3 mb-6" />
          <div className="h-32 bg-slate-800 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
}
