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

  return (
    <div className={`w-full max-w-xs bg-white rounded-sm outline outline-1 outline-offset-[-1px] outline-black/20 overflow-hidden p-6 ${className}`}>
      {/* Rating Filter */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold font-['Cyntho_Next'] text-black mb-6">Rating</h3>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-1">
            <StarRating rating={5} size="md" />
          </div>
          <Checkbox 
            onChange={() => {}} 
            className="ml-auto" 
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            <StarRating rating={4} size="md" />
          </div>
          <Checkbox 
            onChange={() => {}} 
            className="ml-auto" 
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            <StarRating rating={3} size="md" />
          </div>
          <Checkbox 
            onChange={() => {}} 
            className="ml-auto" 
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            <StarRating rating={2} size="md" />
          </div>
          <Checkbox 
            onChange={() => {}} 
            className="ml-auto" 
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <StarRating rating={1} size="md" />
          </div>
          <Checkbox 
            onChange={() => {}} 
            className="ml-auto" 
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold font-['Cyntho_Next'] text-black mb-6">Category</h3>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <Checkbox
                label={category.label}
                checked={category.checked}
                onChange={() => handleCategoryChange(category.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold font-['Cyntho_Next'] text-black mb-6">Price Range</h3>
        <div className="mb-4">
          <RangeSlider min={0} max={100} defaultValue={[20, 80]} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-base font-normal font-['Cyntho_Next'] text-black">Price:</span>
          <div className="flex items-center space-x-2">
            <span className="text-base font-normal font-['Cyntho_Next'] text-black">$10</span>
            <span className="text-base font-normal font-['Cyntho_Next'] text-black">—</span>
            <span className="text-base font-normal font-['Cyntho_Next'] text-black">$80</span>
          </div>
        </div>
      </div>

      {/* Special Requirements */}
      <div>
        <h3 className="text-xl font-semibold font-['Cyntho_Next'] text-black mb-6">Special Requirements</h3>
        <div className="space-y-4">
          {specialRequirements.map((requirement) => (
            <div key={requirement.id} className="flex items-center justify-between">
              <Checkbox
                label={requirement.label}
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