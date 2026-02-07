# ShopHub - E-Commerce Application

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-v18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.3.3-blue.svg)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Management-blue.svg)](https://zustand-demo.pmnd.rs/)

</div>

## 🌟 Overview

ShopHub is a modern, feature-rich e-commerce application built with React, Tailwind CSS, and Zustand. It offers a seamless shopping experience with advanced features like product filtering, wishlists, comparison tools, and more. The application features a stunning modern UI with glass morphism effects, smooth animations, and responsive design.

## ✨ Features

### 🎨 Modern UI/UX Design
- **Glass Morphism Effects**: Beautiful glass-like UI elements with backdrop blur
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Works seamlessly on all device sizes
- **Gradient Accents**: Modern color schemes with gradient elements
- **Loading States**: Skeleton screens for better perceived performance

### 🛍️ E-Commerce Features
- **Product Catalog**: Browse 500+ products across 8 categories
- **Product Images**: Each product has a unique image with fallback placeholders
- **Search Functionality**: Real-time product search with auto-filtering
- **Category Filtering**: Filter products by category
- **Price Range Slider**: Adjustable price filtering
- **Rating Filter**: Filter products by minimum rating
- **Discount Badges**: Visual indicators for discounted products

### 🛒 Shopping Experience
- **Shopping Cart**: Add/remove products with quantity management
- **Wishlist**: Save favorite products for later
- **Product Comparison**: Compare up to 4 products side-by-side
- **Recently Viewed**: Track products you've recently viewed
- **Stock Status**: Clear indication of product availability

### 👤 User Management
- **Authentication System**: Login/signup functionality
- **Role-Based Access**: Different permissions for users, sellers, and admins
- **Order Tracking**: Track your order history and status
- **Profile Management**: Manage account details

### 📊 Advanced Features
- **Seller Dashboard**: Manage products and view sales
- **Admin Dashboard**: Full administrative controls
- **Order Management**: Track and update order statuses
- **Coupon System**: Apply discount codes
- **Live Chat**: Integrated customer support

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS v3.3.3 with custom configurations
- **State Management**: Zustand
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## 🚀 Quick Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/itsaahsan/e-commerce-app.git
cd e-commerce-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Visit [http://localhost:5173](http://localhost:5173) to see the application

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx       # Modern header with glass morphism
│   ├── Footer.jsx       # Comprehensive footer
│   ├── ProductCard.jsx  # Enhanced product cards with images
│   └── ...
├── pages/              # Page components
├── store/              # Zustand store
├── contexts/           # React Context providers
├── data/               # Mock data
├── utils/              # Utility functions
├── App.jsx             # Main application component
└── main.jsx            # Entry point
```

## 🎯 Key Improvements

### UI/UX Enhancements
- **Modern Glass Morphism Design**: Implemented glass-like effects in header and other UI elements
- **Advanced Animations**: Added hover effects, transitions, and micro-interactions
- **Loading States**: Implemented skeleton screens for better perceived performance
- **Typography Enhancement**: Improved visual hierarchy and readability
- **Responsive Grid**: Optimized product grid for all screen sizes

### Product Display
- **Product Images**: Each product now has a unique image with fallback placeholders
- **Image Zoom Effect**: Hover to slightly zoom product images
- **Graceful Degradation**: Fallback images when primary images fail to load

### Performance Optimizations
- **Efficient State Management**: Using Zustand for optimized state handling
- **Virtual Scrolling Ready**: Optimized for large product catalogs
- **Lazy Loading**: Components load efficiently

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Checks code for linting errors |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/itsaahsan/e-commerce-app/issues).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State managed with [Zustand](https://zustand-demo.pmnd.rs/)
- Icons from [Lucide React](https://lucide.dev/)

---

<div align="center">

Made with ❤️ using React, Tailwind CSS, and modern web technologies

⭐ Star this repo if you found it helpful!

</div>