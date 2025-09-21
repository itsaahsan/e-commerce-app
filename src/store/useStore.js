import { create } from 'zustand'

// Generate 100 products across different categories
const generateProducts = () => {
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty', 'Toys', 'Automotive']
  const productNames = {
    Electronics: ['Wireless Headphones', 'Smartphone', 'Laptop', 'Tablet', 'Smart Watch', 'Bluetooth Speaker', 'Gaming Console', 'Camera', 'Smart TV', 'VR Headset'],
    Fashion: ['T-Shirt', 'Jeans', 'Sneakers', 'Jacket', 'Dress', 'Sunglasses', 'Backpack', 'Watch', 'Hat', 'Scarf'],
    'Home & Garden': ['Coffee Maker', 'Blender', 'Vacuum Cleaner', 'Air Purifier', 'Lamp', 'Plant Pot', 'Cushion', 'Blanket', 'Cookware Set', 'Garden Tools'],
    Sports: ['Yoga Mat', 'Dumbbells', 'Running Shoes', 'Basketball', 'Tennis Racket', 'Swimming Goggles', 'Fitness Tracker', 'Water Bottle', 'Sports Bag', 'Resistance Bands'],
    Books: ['Fiction Novel', 'Non-Fiction Book', 'Biography', 'Cookbook', 'Self-Help Book', 'Science Book', 'History Book', 'Art Book', 'Children Book', 'Poetry Collection'],
    Beauty: ['Face Cream', 'Lipstick', 'Shampoo', 'Perfume', 'Makeup Kit', 'Skincare Set', 'Hair Dryer', 'Nail Polish', 'Face Mask', 'Body Lotion'],
    Toys: ['Action Figure', 'Board Game', 'Puzzle', 'RC Car', 'Doll', 'Building Blocks', 'Stuffed Animal', 'Musical Instrument', 'Art Supplies', 'Educational Toy'],
    Automotive: ['Car Charger', 'Seat Cover', 'Floor Mat', 'Steering Wheel Cover', 'Car Air Freshener', 'Tire Pressure Gauge', 'Jump Starter', 'Car Vacuum', 'Phone Mount', 'Dash Cam']
  }
  
  const adjectives = ['Premium', 'Deluxe', 'Pro', 'Smart', 'Eco', 'Organic', 'Luxury', 'Classic', 'Modern', 'Stylish']
  
  // Category-specific image URLs using placeholder images
  const categoryImageUrls = {
    Electronics: [
      'https://placehold.co/500x500/4F46E5/FFFFFF?text=Electronics',
      'https://placehold.co/500x500/7C3AED/FFFFFF?text=Tech+Gear',
      'https://placehold.co/500x500/2563EB/FFFFFF?text=Devices',
      'https://placehold.co/500x500/0D9488/FFFFFF?text=Gadgets'
    ],
    Fashion: [
      'https://placehold.co/500x500/EC4899/FFFFFF?text=Fashion',
      'https://placehold.co/500x500/F43F5E/FFFFFF?text=Clothing',
      'https://placehold.co/500x500/D946EF/FFFFFF?text=Accessories',
      'https://placehold.co/500x500/8B5CF6/FFFFFF?text=Style'
    ],
    'Home & Garden': [
      'https://placehold.co/500x500/10B981/FFFFFF?text=Home',
      'https://placehold.co/500x500/84CC16/FFFFFF?text=Garden',
      'https://placehold.co/500x500/F59E0B/FFFFFF?text=Decor',
      'https://placehold.co/500x500/EF4444/FFFFFF?text=Living'
    ],
    Sports: [
      'https://placehold.co/500x500/0EA5E9/FFFFFF?text=Sports',
      'https://placehold.co/500x500/3B82F6/FFFFFF?text=Fitness',
      'https://placehold.co/500x500/06B6D4/FFFFFF?text=Exercise',
      'https://placehold.co/500x500/14B8A6/FFFFFF?text=Active'
    ],
    Books: [
      'https://placehold.co/500x500/6366F1/FFFFFF?text=Books',
      'https://placehold.co/500x500/8B5CF6/FFFFFF?text=Reading',
      'https://placehold.co/500x500/A855F7/FFFFFF?text=Literature',
      'https://placehold.co/500x500/C084FC/FFFFFF?text=Knowledge'
    ],
    Beauty: [
      'https://placehold.co/500x500/EC4899/FFFFFF?text=Beauty',
      'https://placehold.co/500x500/F43F5E/FFFFFF?text=Skincare',
      'https://placehold.co/500x500/D946EF/FFFFFF?text=Cosmetics',
      'https://placehold.co/500x500/EAB308/FFFFFF?text=Makeup'
    ],
    Toys: [
      'https://placehold.co/500x500/F97316/FFFFFF?text=Toys',
      'https://placehold.co/500x500/F59E0B/FFFFFF?text=Games',
      'https://placehold.co/500x500/EAB308/FFFFFF?text=Fun',
      'https://placehold.co/500x500/84CC16/FFFFFF?text=Play'
    ],
    Automotive: [
      'https://placehold.co/500x500/64748B/FFFFFF?text=Auto',
      'https://placehold.co/500x500/94A3B8/FFFFFF?text=Car+Parts',
      'https://placehold.co/500x500/6B7280/FFFFFF?text=Vehicle',
      'https://placehold.co/500x500/475569/FFFFFF?text=Accessories'
    ]
  }
  
  const products = []
  
  for (let i = 1; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const productNameBase = productNames[category][Math.floor(Math.random() * productNames[category].length)]
    const productName = Math.random() > 0.7 
      ? `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${productNameBase}` 
      : productNameBase
    
    // Select a category-specific image URL
    const imageUrls = categoryImageUrls[category] || [
      'https://placehold.co/500x500/6B7280/FFFFFF?text=Product'
    ]
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]
    
    products.push({
      id: i,
      name: productName,
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      image: imageUrl,
      category: category,
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      reviews: Math.floor(Math.random() * 500),
      description: `High-quality ${productName.toLowerCase()} in the ${category} category. Perfect for everyday use.`
    })
  }
  
  return products
}

export const useStore = create((set, get) => ({
  // Products
  products: generateProducts(),

  // Cart
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id)
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] }
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),

  clearCart: () => set({ cart: [] }),

  // User
  user: null,
  setUser: (user) => set({ user }),

  // Filters
  searchTerm: '',
  selectedCategory: 'All',
  priceRange: { min: 0, max: 1000 },
  ratingFilter: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setPriceRange: (range) => set({ priceRange: range }),
  setRatingFilter: (rating) => set({ ratingFilter: rating }),

  // Wishlist
  wishlist: [],
  addToWishlist: (product) => set((state) => ({
    wishlist: [...state.wishlist, product]
  })),
  removeFromWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.filter(item => item.id !== productId)
  })),

  // Compare Products
  compareList: [],
  addToCompare: (product) => set((state) => {
    if (state.compareList.length >= 4) return state
    if (state.compareList.some(item => item.id === product.id)) return state
    return { compareList: [...state.compareList, product] }
  }),
  removeFromCompare: (productId) => set((state) => ({
    compareList: state.compareList.filter(item => item.id !== productId)
  })),

  // Recently Viewed
  recentlyViewed: [],
  addToRecentlyViewed: (product) => set((state) => {
    const filtered = state.recentlyViewed.filter(item => item.id !== product.id)
    return { recentlyViewed: [product, ...filtered].slice(0, 10) }
  }),

  // Coupons
  appliedCoupon: null,
  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),
  removeCoupon: () => set({ appliedCoupon: null }),

  // Getters
  getCartTotal: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getCartItemsCount: () => {
    const { cart } = get()
    return cart.reduce((total, item) => total + item.quantity, 0)
  },

  getFilteredProducts: () => {
    const { products, searchTerm, selectedCategory, priceRange, ratingFilter } = get()
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max
      const matchesRating = ratingFilter ? product.rating >= ratingFilter : true
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })
  }
}))