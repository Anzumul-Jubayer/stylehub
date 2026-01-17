const ProductDetailsLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-1 animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-gray-300 animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square rounded-lg bg-gray-300 animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-3">
            <div className="h-10 bg-gray-300 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
          </div>

          {/* Color Selection */}
          <div>
            <div className="h-6 bg-gray-300 rounded w-12 mb-3 animate-pulse"></div>
            <div className="flex items-center space-x-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-10 bg-gray-300 rounded-xl w-16 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="h-6 bg-gray-300 rounded w-10 mb-3 animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-12 bg-gray-300 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <div className="h-6 bg-gray-300 rounded w-16 mb-3 animate-pulse"></div>
            <div className="flex items-center space-x-4">
              <div className="h-12 bg-gray-300 rounded-xl w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 h-14 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="flex-1 h-14 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-16 mx-auto mb-1 animate-pulse"></div>
                <div className="h-3 bg-gray-300 rounded w-12 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 bg-gray-300 rounded w-20 mb-4 animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="py-8">
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoading;