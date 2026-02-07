import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Globe, ArrowUp } from 'lucide-react';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 mt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-800/10 opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-accent w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold text-white">S</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ShopHub</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your one-stop destination for all your shopping needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Home</a></li>
              <li><a href="/categories" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Categories</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Contact</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-gray-700 pb-2">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="/support" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Support Center</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Returns</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Shipping Info</a></li>
              <li><a href="/track-order" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Track Order</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center"><span className="mr-2">•</span> Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-5 text-white border-b border-gray-700 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-gray-300">123 Shopping Street, Retail City, RC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">info@shophub.com</span>
              </li>
              <li className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                <span className="text-gray-300">www.shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} ShopHub. All rights reserved. Designed with ❤️ for shoppers worldwide.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-accent text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;