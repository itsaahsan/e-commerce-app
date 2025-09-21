# E-commerce App

A modern e-commerce application built with React, Vite, and Tailwind CSS.

## Features

- Product browsing and filtering
- Shopping cart functionality
- Wishlist management
- User authentication
- Order tracking
- Product comparison
- Responsive design
- Stripe payment integration

## Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- Zustand (State Management)
- Stripe (Payment Processing)
- Lucide React (Icons)

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
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── pages/          # Page components
├── store/          # Zustand store
├── utils/          # Utility functions
├── App.jsx         # Main application component
├── index.css       # Global styles
└── main.jsx        # Entry point
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally
- `npm run lint` - Runs ESLint to check for code issues

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.