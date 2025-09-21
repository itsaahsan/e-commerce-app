import React from 'react'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import RecentlyViewed from '../components/RecentlyViewed'

const Home = () => {
  const { getFilteredProducts } = useStore()
  const filteredProducts = getFilteredProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to ShopHub
        </h1>
        <p className="text-gray-600 text-lg">
          Discover amazing products at unbeatable prices
        </p>
      </div>

      <CategoryFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
      
      <RecentlyViewed />
    </div>
  )
}

export default Home