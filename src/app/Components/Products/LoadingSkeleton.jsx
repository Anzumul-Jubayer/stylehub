const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-48 mx-auto animate-pulse"></div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image Skeleton */}
            <div className="h-64 bg-gray-300 animate-pulse"></div>
            
            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center space-x-2 mt-8">
        <div className="h-10 bg-gray-300 rounded w-20 animate-pulse"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 w-10 bg-gray-300 rounded animate-pulse"></div>
        ))}
        <div className="h-10 bg-gray-300 rounded w-16 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;