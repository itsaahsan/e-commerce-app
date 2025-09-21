import React from 'react'
import { useStore } from '../store/useStore'
import { X, ShoppingCart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CompareProducts = () => {
  const { compareList, removeFromCompare, addToCart } = useStore()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleRemoveFromCompare = (productId) => {
    removeFromCompare(productId)
  }

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`)
  }

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Comparison</h2>
          <p className="text-gray-600 mb-6">You haven't added any products to compare yet.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Product Comparison</h2>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left bg-gray-50 font-semibold">Features</th>
                {compareList.map((product) => (
                  <th key={product.id} className="w-1/4 p-4 text-center bg-gray-50 relative">
                    <button
                      onClick={() => handleRemoveFromCompare(product.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover mb-2 rounded"
                      />
                      <h3 className="font-medium text-center">{product.name}</h3>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-medium">Price</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-4 font-medium">Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2">{product.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">({product.reviews} reviews)</p>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-4 font-medium">Category</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {product.category}
                    </span>
                  </td>
                ))}
              </tr>
              
              <tr className="border-b">
                <td className="p-4 font-medium">Description</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </td>
                ))}
              </tr>
              
              <tr>
                <td className="p-4 font-medium">Actions</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center justify-center px-3 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleViewProduct(product.id)}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {compareList.length < 4 && (
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add More Products to Compare
            </button>
            <p className="text-sm text-gray-600 mt-2">
              You can compare up to 4 products at a time. {4 - compareList.length} slots available.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompareProducts
