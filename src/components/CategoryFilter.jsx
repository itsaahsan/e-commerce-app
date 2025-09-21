import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Filter, X } from 'lucide-react'

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, priceRange, setPriceRange, ratingFilter, setRatingFilter } = useStore()
  const [showFilters, setShowFilters] = useState(false)
  // Only include categories that match the products we have
  const categories = ['All', 'Electronics', 'Fashion', 'Food']

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setPriceRange({ ...priceRange, max: value })
  }

  const handleRatingChange = (rating) => {
    setRatingFilter(ratingFilter === rating ? null : rating)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setPriceRange({ min: 0, max: 1000 })
    setRatingFilter(null)
  }

  const hasActiveFilters = selectedCategory !== 'All' || priceRange.max < 1000 || ratingFilter !== null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-semibold">Categories</h3>
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm text-primary hover:text-blue-600"
        >
          <Filter className="w-4 h-4 mr-1" />
          {showFilters ? 'Hide Filters' : 'More Filters'}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-sm">Price Range</label>
              <span className="text-sm text-gray-600">${priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="font-medium text-sm mb-2 block">Minimum Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    ratingFilter === rating
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating}+
                </button>
              ))}
            </div>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
