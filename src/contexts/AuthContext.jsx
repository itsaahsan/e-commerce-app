import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // In a real app, this would be an API call
    // For demo purposes, we'll accept any non-empty email/password
    if (email && password) {
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, message: 'Please enter valid credentials' }
  }

  const signup = (name, email, password) => {
    // In a real app, this would be an API call
    if (name && email && password) {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, message: 'Please fill in all fields' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}