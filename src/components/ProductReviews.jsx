import React, { useState } from 'react'
import { Star, ThumbsUp, User } from 'lucide-react'

const ProductReviews = ({ productId }) => {
  const [reviews] = useState([
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Highly recommended.',
      date: '2024-01-15',
      helpful: 12
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Good quality, fast shipping.',
      date: '2024-01-10',
      helpful: 8
    }
  ])

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // In real app, submit to backend
    setNewReview({ rating: 5, comment: '' })
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      <div className="space-y-4 mb-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{review.user}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-primary">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-3">Write a Review</h4>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewReview({...newReview, rating: star})}
                className={`w-6 h-6 ${
                  star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star className="w-full h-full fill-current" />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={newReview.comment}
          onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
          placeholder="Share your experience..."
          className="w-full p-3 border rounded-lg mb-3"
          rows="3"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}

export default ProductReviews