import React from 'react'
import { useStore } from '../store/useStore'
import ProductCard from './ProductCard'

const RecentlyViewed = () => {
  const { recentlyViewed } = useStore()
  
  if (recentlyViewed.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed