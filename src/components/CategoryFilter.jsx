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
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-bold text-lg text-gray-800">Categories</h3>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors font-medium"
        >
          <Filter className="w-4 h-4 mr-1" />
          {showFilters ? 'Hide Filters' : 'More Filters'}
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="font-bold text-gray-700">Price Range</label>
              <span className="text-lg font-bold text-primary">${priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="font-bold text-gray-700 mb-3 block">Minimum Rating</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    ratingFilter === rating
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md'
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
              className="flex items-center text-sm text-red-600 hover:text-red-700 transition-colors font-medium"
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
