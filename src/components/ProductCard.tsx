import React from 'react';
import Image from 'next/image';
import StarRating from '@/components/ui/StarRating';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isFeatured?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  restaurant,
  price,
  originalPrice,
  image,
  rating,
  isFeatured = false,
  className = ''
}) => {
  return (
    <div className={`w-full bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-md ${className}`}>
      <div className="relative aspect-square overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <StarRating rating={rating} maxRating={5} size="sm" />
          <span className="ml-2 text-sm text-gray-500">({rating})</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
          {restaurant}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {originalPrice && originalPrice !== price && (
              <span className="text-sm text-gray-500 line-through mr-2">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-lg font-bold text-amber-600">
              {formatCurrency(price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;