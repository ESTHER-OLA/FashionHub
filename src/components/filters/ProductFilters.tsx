import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  categories: FilterGroup[];
  subcategories: FilterGroup[];
  colors: FilterOption[];
  sizes: FilterOption[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  subcategories: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  subcategories,
  colors,
  sizes,
  onFilterChange
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    colors: [],
    sizes: [],
    priceRange: [0, 500]
  });

  const handleCheckboxChange = (
    group: keyof Omit<FilterState, 'priceRange'>,
    id: string,
    checked: boolean
  ) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [group]: checked 
          ? [...prev[group], id]
          : prev[group].filter(item => item !== id)
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        priceRange: [value[0], value[1]] as [number, number]
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      subcategories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 500]
    });
    onFilterChange({
      categories: [],
      subcategories: [],
      colors: [],
      sizes: [],
      priceRange: [0, 500]
    });
  };

  const toggleFilters = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center space-x-2 bg-fashion-primary text-white px-4 py-2 rounded w-full"
        >
          {isVisible ? <X size={18} /> : <Filter size={18} />}
          <span>{isVisible ? 'Close Filters' : 'Show Filters'}</span>
        </button>
      </div>
      
      {/* Filters Panel */}
      <div className={`
        bg-white lg:block shadow-lg lg:shadow-none rounded-lg p-4 lg:p-0
        ${isVisible ? 'block' : 'hidden'} 
        lg:sticky lg:top-20
      `}>
        <div className="flex justify-between items-center lg:mb-6">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button 
            onClick={clearFilters}
            className="text-sm text-fashion-accent hover:underline"
          >
            Clear all
          </button>
        </div>
        
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider 
            defaultValue={[0, 500]}
            min={0} 
            max={500}
            step={10}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
          />
          <div className="flex justify-between mt-2 text-sm text-fashion-secondary">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
        
        {/* Categories */}
        {categories.map(group => (
          <div key={group.id} className="mb-6">
            <h3 className="font-medium mb-3">{group.name}</h3>
            <div className="space-y-2">
              {group.options.map(option => (
                <div key={option.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${option.id}`}
                    checked={filters.categories.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('categories', option.id, checked === true)
                    }
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`category-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Subcategories */}
        {subcategories.map(group => (
          <div key={group.id} className="mb-6">
            <h3 className="font-medium mb-3">{group.name}</h3>
            <div className="space-y-2">
              {group.options.map(option => (
                <div key={option.id} className="flex items-center">
                  <Checkbox 
                    id={`subcategory-${option.id}`}
                    checked={filters.subcategories.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange('subcategories', option.id, checked === true)
                    }
                    className="mr-2"
                  />
                  <label 
                    htmlFor={`subcategory-${option.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {/* Colors */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <button
                key={color.id}
                onClick={() => handleCheckboxChange(
                  'colors', 
                  color.id, 
                  !filters.colors.includes(color.id)
                )}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.id)
                    ? 'ring-2 ring-fashion-accent ring-offset-2'
                    : ''
                }`}
                style={{ backgroundColor: color.id }}
                title={color.label}
                aria-label={`Select color ${color.label}`}
              />
            ))}
          </div>
        </div>
        
        {/* Sizes */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size.id}
                onClick={() => handleCheckboxChange(
                  'sizes', 
                  size.id, 
                  !filters.sizes.includes(size.id)
                )}
                className={`min-w-[40px] h-8 border rounded text-sm flex items-center justify-center transition-all ${
                  filters.sizes.includes(size.id)
                    ? 'bg-fashion-primary text-white border-fashion-primary'
                    : 'bg-white text-fashion-primary border-gray-300 hover:border-fashion-primary'
                }`}
                aria-label={`Select size ${size.label}`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
