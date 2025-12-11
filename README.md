# ShopHub - E-commerce App

A modern, feature-rich e-commerce application built with React, Vite, and Tailwind CSS.

## Features

### Core Features
- **500+ Products** across 8 categories (Electronics, Fashion, Home & Garden, Sports, Books, Beauty, Toys, Automotive)
- **Product Browsing** with advanced filtering and search
- **Shopping Cart** with quantity management
- **Wishlist Management** - save favorite products
- **Product Comparison** - compare up to 4 products side by side
- **User Authentication** - secure login and registration
- **Order Tracking** - track your orders in real-time
- **Recently Viewed** - quick access to recently viewed products

### Enhanced Features
- **Discount Badges** - see product discounts at a glance
- **Stock Information** - real-time inventory status
- **Shipping Details** - free or paid shipping options
- **Price Comparison** - original vs discounted prices
- **Product Ratings & Reviews** - customer feedback and ratings
- **Category Filtering** - browse by product category
- **Price Range Filter** - filter products by price
- **Rating Filter** - find highly-rated products
- **Responsive Design** - works on all devices
- **Stripe Payment Integration** - secure payment processing

## Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Payment**: Stripe

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itsaahsan/e-commerce-app.git
```

2. Navigate to the project directory:
```bash
cd e-commerce-app
```

3. Install dependencies:
```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── CategoryFilter.jsx
│   ├── CompareProducts.jsx
│   ├── ProductReviews.jsx
│   └── RecommendedProducts.jsx
├── contexts/            # React context providers
│   └── AuthContext.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Cart.jsx
│   ├── Wishlist.jsx
│   ├── ProductDetail.jsx
│   ├── OrderTracking.jsx
│   ├── OrderHistory.jsx
│   ├── Compare.jsx
│   ├── Login.jsx
│   └── Profile.jsx
├── store/               # Zustand state management
│   └── useStore.js
├── utils/               # Utility functions
├── App.jsx              # Main application component
├── index.css            # Global styles
└── main.jsx             # Entry point
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## Product Features

### Product Information
- Product name and category
- Detailed description
- Price with discount information
- Original price display
- Stock availability
- Shipping options (Free or Paid)
- Customer ratings and reviews

### Product Actions
- Add to cart
- Add to wishlist
- Compare with other products
- View product details
- Check stock status

## Shopping Features

### Cart Management
- Add/remove products
- Update quantities
- View cart total
- Apply coupons
- Proceed to checkout

### Wishlist
- Save favorite products
- View wishlist items
- Move items to cart
- Remove from wishlist

### Product Comparison
- Compare up to 4 products
- View side-by-side specifications
- Remove products from comparison

### Filtering & Search
- Search by product name
- Filter by category
- Filter by price range
- Filter by rating
- Sort products

## User Features

### Authentication
- User registration
- Secure login
- Profile management
- Order history

### Order Management
- Track orders in real-time
- View order history
- Order status updates
- Delivery tracking

## Payment

The app integrates with Stripe for secure payment processing. Test cards can be used in development mode.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@shophub.com or open an issue on GitHub.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
