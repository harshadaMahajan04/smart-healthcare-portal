function SkeletonBox({ className }) {
  return (
    <div className={`bg-gray-200 rounded-xl animate-pulse ${className}`} />
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Welcome header skeleton */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
          <SkeletonBox className="w-14 h-14 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <SkeletonBox className="h-5 w-48" />
            <SkeletonBox className="h-3 w-32" />
          </div>
          <SkeletonBox className="h-10 w-36 hidden sm:block" />
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <SkeletonBox className="h-7 w-7 mx-auto rounded-full" />
              <SkeletonBox className="h-6 w-12 mx-auto" />
              <SkeletonBox className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>

        {/* History cards skeleton */}
        <div>
          <SkeletonBox className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 space-y-3">
                <div className="flex justify-between">
                  <SkeletonBox className="h-4 w-36" />
                  <SkeletonBox className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <SkeletonBox className="h-5 w-16 rounded-full" />
                  <SkeletonBox className="h-5 w-20 rounded-full" />
                  <SkeletonBox className="h-5 w-14 rounded-full" />
                </div>
                <SkeletonBox className="h-3 w-24 ml-auto" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardSkeleton