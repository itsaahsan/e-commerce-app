import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, Heart, User, Package, Scale, LogOut, ClipboardList, Grid } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'

const Header = () => {
  const { cart, searchTerm, setSearchTerm, getCartItemsCount, compareList } = useStore()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const cartItemsCount = getCartItemsCount()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="mr-3" />
            <span className="text-2xl font-bold text-primary">ShopHub</span>
          </Link>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/categories" className="text-gray-600 hover:text-primary" title="Categories">
              <Grid className="w-6 h-6" />
            </Link>
            
            <Link to="/compare" className="text-gray-600 hover:text-primary relative">
              <Scale className="w-6 h-6" />
              {compareList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>
            
            <Link to="/order-tracking" className="text-gray-600 hover:text-primary">
              <Package className="w-6 h-6" />
            </Link>
            
            <Link to="/wishlist" className="text-gray-600 hover:text-primary">
              <Heart className="w-6 h-6" />
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/order-history" className="text-gray-600 hover:text-primary" title="Order History">
                  <ClipboardList className="w-6 h-6" />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-primary flex items-center">
                  <User className="w-6 h-6" />
                  <span className="ml-1 hidden md:inline">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-primary"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-primary">
                  <User className="w-6 h-6" />
                </Link>
              </div>
            )}
            
            <Link to="/cart" className="relative text-gray-600 hover:text-primary">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
