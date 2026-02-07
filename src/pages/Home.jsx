import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import RecentlyViewed from '../components/RecentlyViewed'
import SkeletonCard from '../components/SkeletonCard'

const Home = () => {
  const { getFilteredProducts } = useStore()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = getFilteredProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="inline-block relative">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 tracking-tight">
            Welcome to ShopHub
          </h1>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-6 text-xl leading-relaxed">
          Discover amazing products at unbeatable prices
        </p>
      </div>

      <CategoryFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 mx-4">
          <div className="text-8xl mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">🔍</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">No products found</h3>
          <p className="text-gray-600 text-xl mb-8">Try adjusting your search or filter criteria</p>
          <div className="animate-pulse inline-block w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
      )}

      <RecentlyViewed />
    </div>
  )
}

export default Home