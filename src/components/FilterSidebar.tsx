import React, { useState } from 'react';
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
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '' }) => {
  const [categories, setCategories] = useState<FilterOption[]>([
    { id: 'vegetarian', label: 'Vegetarian', checked: false },
    { id: 'asian', label: 'Asian', checked: false },
    { id: 'chinese', label: 'Chinese', checked: false },
    { id: 'italian', label: 'Italian', checked: false },
    { id: 'fast-food', label: 'Fast Food', checked: false },
    { id: 'mexican', label: 'Mexican', checked: false },
    { id: 'american', label: 'American', checked: false },
    { id: 'healthy', label: 'Healthy', checked: false },
    { id: 'sushi', label: 'Sushi', checked: false },
  ]);

  const [specialRequirements, setSpecialRequirements] = useState<FilterOption[]>([
    { id: 'no-egg', label: 'No egg', checked: false },
    { id: 'no-fish', label: 'No fish', checked: false },
    { id: 'no-peanuts', label: 'No peanuts', checked: false },
  ]);

  const [priceRange, setPriceRange] = useState<[number, number]>([10, 80]);
  const [ratings, setRatings] = useState<{[key: number]: boolean}>({
    5: false,
    4: false,
    3: false,
    2: false,
    1: false
  });

  const handleCategoryChange = (id: string) => {
    setCategories(categories.map(cat =>
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    ));
  };

  const handleSpecialRequirementChange = (id: string) => {
    setSpecialRequirements(specialRequirements.map(req =>
      req.id === id ? { ...req, checked: !req.checked } : req
    ));
  };

  const handleRatingChange = (rating: number) => {
    setRatings(prev => ({
      ...prev,
      [rating]: !prev[rating]
    }));
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const clearAllFilters = () => {
    setCategories(categories.map(cat => ({ ...cat, checked: false })));
    setSpecialRequirements(specialRequirements.map(req => ({ ...req, checked: false })));
    setRatings({5: false, 4: false, 3: false, 2: false, 1: false});
    setPriceRange([10, 80]);
  };

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

      {/* Category Filter */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Category</h3>
        <div className="space-y-2 sm:space-y-3">
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
          <button className="bg-amber-500 text-white text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-amber-600 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Special Requirements</h3>
        <div className="space-y-2 sm:space-y-3">
          {specialRequirements.map((requirement) => (
            <div key={requirement.id} className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-700">{requirement.label}</span>
              <Checkbox
                checked={requirement.checked}
                onChange={() => handleSpecialRequirementChange(requirement.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;