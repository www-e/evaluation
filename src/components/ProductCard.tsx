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
    <div className={`w-full max-w-sm bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-black/20 overflow-hidden ${className}`}>
      <div className="relative">
        <div className="size-80 bg-white rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[200px] rounded-br-[200px] overflow-hidden mx-auto">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={320}
              height={320}
              className="size-80 object-cover rounded-[62px]"
            />
          ) : (
            <div className="size-80 bg-gray-200 rounded-[62px] flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        
        {isFeatured && (
          <div className="absolute top-5 left-5 bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20 px-4 py-2">
            <span className="text-xl font-normal font-['Aspira_XWide'] text-black">Featured</span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <StarRating rating={rating} maxRating={5} size="md" />
        </div>
        
        <h3 className="text-2xl font-semibold font-['Cyntho_Next'] text-black mb-2">
          {name}
        </h3>
        
        <p className="text-xl font-medium font-['Cyntho_Next'] text-black/50 mb-1">
          {restaurant}
        </p>
        
        <p className="text-xl font-medium font-['Cyntho_Next'] text-red-600/50 mb-3">
          Restaurant
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {originalPrice && originalPrice !== price && (
              <span className="text-xl font-semibold font-['Cyntho_Next'] text-black/50 line-through mr-2">
                {formatCurrency(originalPrice)}
              </span>
            )}
            <span className="text-xl font-semibold font-['Cyntho_Next'] text-red-600">
              {formatCurrency(price)}
            </span>
          </div>
          
          {originalPrice && originalPrice !== price && (
            <div className="w-20 h-0 outline outline-1 outline-offset-[-0.50px] outline-black/50"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;