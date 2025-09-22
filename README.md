# CJ Dropshipping Store

![Store Preview](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=300&fit=crop&auto=format)

A modern, responsive eCommerce store built with Next.js and Tailwind CSS, integrated with CJ Dropshipping API for dynamic product management and seamless shopping experience.

## ✨ Features

- **Dynamic Product Catalog** - Fetch products directly from CJ Dropshipping API
- **Shopping Cart Management** - Add, remove, and update cart items with Context API
- **Product Search & Filtering** - Find products easily with search and category filters
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Checkout Process** - Complete checkout flow with shipping details collection
- **Order Confirmation** - Professional order confirmation pages
- **Modern UI/UX** - Clean, professional design with smooth interactions
- **TypeScript Support** - Full type safety throughout the application

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c8018ffe0840663f64f5ba&clone_repository=68d0eaefd7c81076a7d6c1ed)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a frontend eCommerce store using Next.js and Tailwind CSS that integrates with CJ Dropshipping API. The store should have a homepage, product listing, product detail pages, a shopping cart with add/remove/update functionality, a checkout form for collecting shipping details, and an order confirmation page. Use Context API for managing cart state. Fetch products using the CJ API /product/list endpoint and display them dynamically. The design should be clean, modern, and responsive.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **CJ Dropshipping API** - Product data and inventory management
- **React Context API** - State management for shopping cart
- **React Hook Form** - Form handling and validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- CJ Dropshipping API access (API key required)
- Basic knowledge of Next.js and React

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cj-dropshipping-store
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   CJ_API_KEY=your-cj-api-key
   CJ_API_BASE_URL=https://developers.cjdropshipping.com/api2.0
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🔧 CJ Dropshipping API Integration

The application integrates with CJ Dropshipping API endpoints:

### Product Listing
```typescript
// Fetch products from CJ API
const response = await fetch('/api/products', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
});
```

### Product Details
```typescript
// Get single product details
const product = await fetch(`/api/products/${productId}`);
```

### API Configuration
The API integration is configured in `lib/cj-api.ts` with proper error handling and type safety.

## 🛒 Shopping Cart Features

- **Add to Cart** - Add products with quantity selection
- **Update Quantities** - Modify item quantities in cart
- **Remove Items** - Remove individual items from cart
- **Persistent Storage** - Cart state persists across sessions
- **Real-time Updates** - Instant cart updates with Context API

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized performance on all devices

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically with every push

### Netlify
1. Build the application: `bun run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Self-hosted
1. Build the application: `bun run build`
2. Start the production server: `bun start`
3. Configure reverse proxy (nginx/Apache) if needed

## 🔐 Environment Variables

Required environment variables for deployment:

- `CJ_API_KEY` - Your CJ Dropshipping API key
- `CJ_API_BASE_URL` - CJ API base URL
- `NEXT_PUBLIC_BASE_URL` - Your application's base URL

## 🎨 Customization

The application is built with modularity in mind:

- **Styling** - Customize colors and themes in `tailwind.config.js`
- **Components** - All components are in the `/components` directory
- **API Integration** - Modify API calls in `/lib/cj-api.ts`
- **Cart Logic** - Cart management in `/contexts/CartContext.tsx`

## 📄 License

This project is open source and available under the MIT License.

<!-- README_END -->