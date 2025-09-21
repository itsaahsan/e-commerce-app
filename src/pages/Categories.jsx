import React from 'react'
import { useStore } from '../store/useStore'
import ProductCard from '../components/ProductCard'

const CategoriesPage = () => {
  const { products } = useStore()
  
  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>
      
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{category}</h2>
            <span className="text-gray-600">{categoryProducts.length} products</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoriesPage