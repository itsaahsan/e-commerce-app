import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const AuthContext = createContext()

const generateMockToken = (userData) => {
  // In a real app, this would be a JWT signed by the server
  return `mock_jwt_${btoa(JSON.stringify(userData))}_${Date.now()}`;
};

const MOCK_TOKEN_EXPIRATION = 3600 * 1000; // 1 hour
const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes for idle timeout

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
  const idleTimerRef = useRef(null);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(logout, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      // In a real app, verify token validity and expiration with the backend
      // For simulation, assume it's valid for now
      setUser(JSON.parse(storedUser));
      resetIdleTimer(); // Start idle timer on load
    }
    setLoading(false);

    // Event listeners for user activity
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('click', resetIdleTimer);

    return () => {
      // Cleanup event listeners and timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('click', resetIdleTimer);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount


  const login = async (email, password) => {
    // In a real app, this would be an API call to your backend /auth/login
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    if (email && password) {
      let role = 'buyer';
      let name = 'John Doe';
      let id = 1;
      if (email === 'admin@example.com') {
        role = 'admin';
        name = 'Admin User';
        id = 201;
      } else if (email === 'seller@example.com') {
        role = 'seller';
        name = 'Seller User';
        id = 101;
      }

      const userData = {
        id,
        name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        role,
      };
      const token = generateMockToken(userData);

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      resetIdleTimer();
      return { success: true, token };
    }
    return { success: false, message: 'Please enter valid credentials' };
  };

  const signup = async (name, email, password) => {
    // In a real app, this would be an API call to your backend /auth/signup
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    if (name && email && password) {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        role: 'buyer',
      };
      const token = generateMockToken(userData);

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      resetIdleTimer();
      return { success: true, token };
    }
    return { success: false, message: 'Please fill in all fields' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
  };

  const verifyToken = async (token) => {
    // In a real app, this would be an API call to verify the token's authenticity and expiration
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API call
    return token ? { isValid: true, decodedToken: JSON.parse(atob(token.split('_')[2])) } : { isValid: false };
  };

  const refreshToken = async (currentToken) => {
    // In a real app, this would be an API call to your backend /auth/refresh-token
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    if (currentToken) {
      const userData = JSON.parse(atob(currentToken.split('_')[2]));
      const newToken = generateMockToken(userData);
      localStorage.setItem('token', newToken);
      return { success: true, token: newToken };
    }
    return { success: false, message: 'Could not refresh token' };
  };


  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    verifyToken,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}