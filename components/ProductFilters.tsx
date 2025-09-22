'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProductFiltersProps {
  currentCategory?: string;
  currentSort?: string;
}

export default function ProductFilters({ currentCategory, currentSort }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || '');
  const [selectedSort, setSelectedSort] = useState(currentSort || '');

  // Common categories (you might want to fetch these from an API)
  const categories = [
    { id: '', name: 'All Categories' },
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Fashion' },
    { id: '3', name: 'Home & Garden' },
    { id: '4', name: 'Sports & Outdoors' },
    { id: '5', name: 'Health & Beauty' },
    { id: '6', name: 'Toys & Games' },
    { id: '7', name: 'Automotive' },
    { id: '8', name: 'Books & Media' },
  ];

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
  ];

  const updateFilters = (newCategory: string, newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update or remove category parameter
    if (newCategory) {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    
    // Update or remove sort parameter
    if (newSort) {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }
    
    // Navigate with new parameters
    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters(category, selectedSort);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    updateFilters(selectedCategory, sort);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSort('');
    router.push('/products');
  };

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {(selectedCategory || selectedSort) && (
        <div>
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Sort Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Sort By</h4>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Categories</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="mr-3 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700 hover:text-gray-900">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Additional Filters</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-3 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">Free Shipping</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-3 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">On Sale</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="mr-3 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-gray-700">In Stock</span>
          </label>
        </div>
      </div>
    </div>
  );
}