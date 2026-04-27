export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="space-y-8">
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
