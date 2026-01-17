'use client';

import { Star } from 'lucide-react';

const StarRating = ({ rating, reviewCount, size = 'md', showCount = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`full-${index}`}
            className={`${sizeClasses[size]} text-yellow-400 fill-current`}
          />
        ))}
        
        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${sizeClasses[size]} text-gray-300`} />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star className={`${sizeClasses[size]} text-yellow-400 fill-current`} />
            </div>
          </div>
        )}
        
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Star
            key={`empty-${index}`}
            className={`${sizeClasses[size]} text-gray-300`}
          />
        ))}
      </div>
      
      {showCount && (
        <div className={`${textSizeClasses[size]} text-gray-600 flex items-center space-x-1`}>
          <span className="font-semibold">{rating}</span>
          <span>({reviewCount} reviews)</span>
        </div>
      )}
    </div>
  );
};

export default StarRating;