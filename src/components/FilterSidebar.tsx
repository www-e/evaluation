import React, { useState, useEffect } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import RangeSlider from '@/components/RangeSlider';
import StarRating from '@/components/ui/StarRating';

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterSidebarProps {
  className?: string;
  onFiltersChange?: (filters: {
    categories: string[];
    priceRange: [number, number];
    ratings: number[];
  }) => void;
  availableCategories: { id: string; name: string }[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  className = '',
  onFiltersChange,
  availableCategories = []
}) => {
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [ratings, setRatings] = useState<{[key: number]: boolean}>({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false
  });

  // Initialize categories from available categories prop
  useEffect(() => {
    if (availableCategories.length > 0) {
      const initialCategories = availableCategories.map(cat => ({
        id: cat.id,
        label: cat.name,
        checked: false
      }));
      setCategories(initialCategories);
    }
  }, [availableCategories]);

  const handleCategoryChange = (id: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    );
    setCategories(updatedCategories);
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = {
      ...ratings,
      [rating]: !ratings[rating]
    };
    setRatings(updatedRatings);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const clearAllFilters = () => {
    const clearedCategories = categories.map(cat => ({ ...cat, checked: false }));
    setCategories(clearedCategories);
    setRatings({5: false, 4: false, 3: false, 2: false, 1: false});
    setPriceRange([0, 200]);
  };

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      const activeCategories = categories
        .filter(cat => cat.checked)
        .map(cat => cat.id);

      const activeRatings = Object.entries(ratings)
        .filter(([_, checked]) => checked)
        .map(([rating]) => parseInt(rating));

      onFiltersChange({
        categories: activeCategories,
        priceRange,
        ratings: activeRatings
      });
    }
  }, [categories, priceRange, ratings, onFiltersChange]);

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm p-4 sm:p-6 ${className}`}>
      {/* Clear All Filters Button */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button
          onClick={clearAllFilters}
          className="text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Categories</h3>
        <div className="space-y-2 sm:space-y-3 max-h-60 overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-700">{category.label}</span>
              <Checkbox
                checked={category.checked}
                onChange={() => handleCategoryChange(category.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Price Range</h3>
        <div className="mb-3 sm:mb-4">
          <RangeSlider
            min={0}
            max={200}
            defaultValue={priceRange}
            onChange={handlePriceRangeChange}
            className="mb-2"
          />
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-gray-700">${priceRange[0]}</span>
            <span className="text-gray-500">—</span>
            <span className="text-gray-700">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Rating</h3>
        <div className="space-y-2 sm:space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center justify-between">
              <div className="flex items-center">
                <StarRating rating={rating} maxRating={5} size="sm" />
                <span className="ml-2 text-xs sm:text-sm text-gray-600">& Up</span>
              </div>
              <Checkbox
                checked={ratings[rating]}
                onChange={() => handleRatingChange(rating)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;