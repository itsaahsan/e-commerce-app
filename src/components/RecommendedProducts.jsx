import React from 'react'
import { useStore } from '../store/useStore'
import ProductCard from './ProductCard'

const RecommendedProducts = ({ currentProductId }) => {
  const { products } = useStore()
  
  // Simple recommendation algorithm - show products from same category
  const currentProduct = products.find(p => p.id === currentProductId)
  const recommended = products
    .filter(p => p.id !== currentProductId && p.category === currentProduct?.category)
    .slice(0, 4)

  if (recommended.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RecommendedProducts