# StyleHub - Modern E-commerce Platform

A full-stack e-commerce clothing store built with Next.js 15, featuring modern UI/UX, MongoDB integration, and hybrid authentication system.

![StyleHub](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Live Demo

**Production URL:** [https://stylehub-plmi.vercel.app](https://stylehub-plmi.vercel.app)



## Project Description

StyleHub is a modern, responsive e-commerce platform designed for clothing retailers. It features a clean, professional interface with comprehensive product management, user authentication, and an intuitive shopping experience. The platform supports both regular users and administrators with role-based access control.

## Key Features

### **E-commerce Core**
- **Product Catalog** - Browse 20+ clothing items with detailed information
- **Product Details** - Interactive image galleries, size/color selection, reviews
- **New Arrivals** - Dedicated section for latest products with filtering
- **Trending Products** - Curated selection of popular items
- **Special Offers** - Time-limited deals with countdown timers

### **Authentication System**
- **Hybrid Authentication** - NextAuth.js + Demo fallback system
- **Google OAuth** - Social login integration
- **Role-Based Access** - Admin and user permissions
- **Protected Routes** - Middleware-based route protection
- **Session Management** - Persistent login across browser sessions

### **User Management**
- **User Dashboard** - Personal account management
- **Admin Panel** - Product management for administrators
- **Add Items** - Admin-only product creation interface
- **User Profiles** - Avatar generation and role display

### **Modern UI/UX**
- **Responsive Design** - Mobile-first approach with tablet optimizations
- **Professional Icons** - Lucide React icon library
- **Smooth Animations** - Framer Motion transitions
- **Toast Notifications** - Real-time user feedback
- **Loading States** - Skeleton screens and spinners

### **Responsive Features**
- **Desktop Navigation** - Full menu with text labels
- **Tablet Navigation** - Icon-only with tooltips
- **Mobile Menu** - Collapsible hamburger navigation
- **Adaptive Layouts** - Optimized for all screen sizes

## Tech Stack

- **Frontend:** Next.js 15, React 18, Tailwind CSS
- **Backend:** Next.js API Routes, MongoDB
- **Authentication:** NextAuth.js, Custom Demo Auth
- **UI Components:** Lucide React, Framer Motion
- **Notifications:** React Hot Toast
- **Deployment:** Vercel
- **Database:** MongoDB Atlas

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### 1. Clone Repository
```bash
git clone <repository-url>
cd stylehub
```

### 2. Install Dependencies
```bash
npm install
```


### 4. Database Setup
The application will automatically connect to MongoDB. Ensure your database contains a `products` collection with sample data.

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 6. Production Deployment
```bash
# Deploy to Vercel
vercel --prod

# Or build locally
npm run build
npm start
```

## Route Summary

### Public Routes
- `/` - Homepage with hero, trending products, special offers
- `/products` - Product catalog with pagination (8 items/page)
- `/products/[id]` - Individual product details page
- `/new-arrivals` - New arrivals with filtering (12 items/page)
- `/login` - Authentication page with demo credentials
- `/register` - User registration (UI only)

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)
- `/add-item` - Product creation form (admin only)

### API Routes
- `/api/products` - Product CRUD operations
- `/api/products/[id]` - Individual product operations
- `/api/products/trending` - Trending products endpoint
- `/api/products/new-arrivals` - New arrivals with filtering
- `/api/offers` - Special offers with countdown timers
- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/demo-auth` - Demo authentication fallback

## Implemented Features

### 1. **Product Management System**
- **MongoDB Integration** - Full CRUD operations for products
- **Server-Side Pagination** - Efficient data loading (8-12 items per page)
- **Product Categories** - Organized catalog structure
- **Image Galleries** - Interactive product image viewers
- **Product Filtering** - Search and filter functionality

### 2. **Authentication & Authorization**
- **Hybrid Auth System** - NextAuth.js with demo fallback
- **Google OAuth** - Social login integration
- **Demo Credentials** - Always-working fallback authentication
- **Role-Based Access** - Admin/user permission system
- **Route Protection** - Middleware-based security
- **Session Persistence** - Cross-browser session management

### 3. **User Interface & Experience**
- **Responsive Design** - Mobile-first with tablet optimizations
- **Modern Navigation** - Adaptive navbar with user dropdowns
- **Loading States** - Skeleton screens and loading spinners
- **Toast Notifications** - Real-time feedback system
- **Smooth Animations** - Framer Motion transitions
- **Professional Icons** - Lucide React icon library

### 4. **E-commerce Features**
- **Product Catalog** - Comprehensive product browsing
- **Product Details** - Detailed product information pages
- **Special Offers** - Time-limited deals with countdown timers
- **New Arrivals** - Latest products with filtering options
- **Trending Products** - Curated popular items section

### 5. **Admin Features**
- **Admin Dashboard** - Administrative control panel
- **Product Creation** - Add new products to catalog
- **Role Management** - Admin-only access controls
- **Content Management** - Product information updates

### 6. **Performance & SEO**
- **Server-Side Rendering** - Next.js 15 App Router
- **Optimized Images** - Next.js Image optimization
- **Fast Loading** - Efficient data fetching strategies
- **SEO Friendly** - Proper meta tags and structure

## Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint



## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request



## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icon library
- MongoDB for the flexible database solution
- Vercel for seamless deployment platform

---

