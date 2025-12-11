import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <img 
      src="/discount-coupon.png" 
      alt="ShopHub Logo"
      className={`w-10 h-10 ${className}`}
    />
  );
};

export default Logo;