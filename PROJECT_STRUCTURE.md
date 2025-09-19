# Midday.ai Clone - Complete File Structure Documentation

## Project Overview
This is a complete clone of the Midday.ai website built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. The project includes authentication, dashboard functionality, API routes, and responsive design with day/night themes.

## Recommended VS Code Folder Structure

\`\`\`
midday-ai-clone/
├── README.md
├── PROJECT_STRUCTURE.md
├── next.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── components.json
├── 
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts and providers
│   ├── page.tsx                 # Homepage with hero section
│   ├── globals.css              # Global styles and Tailwind config
│   │
│   ├── auth/                    # Authentication pages
│   │   ├── signin/
│   │   │   └── page.tsx         # Sign in page
│   │   └── signup/
│   │       └── page.tsx         # Sign up page
│   │
│   ├── dashboard/               # Main dashboard
│   │   └── page.tsx             # Comprehensive dashboard with tabs
│   │
│   ├── features/                # Features showcase page
│   │   └── page.tsx             # Features page with cards
│   │
│   ├── pricing/                 # Pricing page
│   │   └── page.tsx             # Pricing tiers and FAQ
│   │
│   └── api/                     # API Routes (Backend)
│       ├── auth/
│       │   ├── signin/
│       │   │   └── route.ts     # Sign in API endpoint
│       │   └── signup/
│       │       └── route.ts     # Sign up API endpoint
│       ├── invoices/
│       │   └── route.ts         # Invoice management API
│       └── dashboard/
│           └── stats/
│               └── route.ts     # Dashboard statistics API
│
├── components/                   # Reusable Components
│   ├── navigation.tsx           # Main navigation header
│   ├── loading-spinner.tsx      # Loading spinner component
│   ├── theme-provider.tsx       # Theme context provider
│   │
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── sidebar.tsx          # Sidebar component
│       └── [other-ui-components]
│
├── scripts/                     # Database Scripts
│   └── 001-create-tables.sql    # Database schema creation
│
├── hooks/                       # Custom React Hooks
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── lib/                         # Utility Functions
│   └── utils.ts                 # Utility functions (cn, etc.)
│
└── public/                      # Static Assets
    ├── images/
    └── icons/
\`\`\`

## File Categories and Descriptions

### 🏠 Core Application Files
- **app/layout.tsx** - Root layout with font configuration and theme providers
- **app/page.tsx** - Homepage with hero section and floating dashboard preview
- **app/globals.css** - Global styles, Tailwind configuration, and custom CSS

### 🔐 Authentication System
- **app/auth/signin/page.tsx** - Professional sign-in page with social auth options
- **app/auth/signup/page.tsx** - Sign-up page with form validation
- **app/api/auth/signin/route.ts** - Sign-in API endpoint with mock authentication
- **app/api/auth/signup/route.ts** - Sign-up API endpoint with user creation

### 📊 Dashboard & Features
- **app/dashboard/page.tsx** - Comprehensive dashboard with:
  - Financial overview with stats cards
  - Invoice management table
  - Features showcase with status indicators
  - Pricing plans comparison
  - Day/night theme toggle
- **app/features/page.tsx** - Standalone features showcase page
- **app/pricing/page.tsx** - Pricing page with tiers and FAQ

### 🔧 API & Backend
- **app/api/invoices/route.ts** - Invoice CRUD operations
- **app/api/dashboard/stats/route.ts** - Dashboard statistics endpoint
- **scripts/001-create-tables.sql** - Complete database schema with:
  - Users table with authentication fields
  - Invoices table with financial data
  - Time entries for time tracking
  - Expenses for expense management

### 🧩 Reusable Components
- **components/navigation.tsx** - Responsive navigation with mobile menu
- **components/loading-spinner.tsx** - Animated loading spinner
- **components/theme-provider.tsx** - Theme context for day/night mode

### 🎨 UI Components (shadcn/ui)
- **components/ui/button.tsx** - Customizable button component
- **components/ui/card.tsx** - Card component for content sections
- **components/ui/sidebar.tsx** - Sidebar navigation component

### 🛠 Utilities & Configuration
- **lib/utils.ts** - Utility functions including className merger
- **hooks/use-mobile.tsx** - Mobile device detection
- **hooks/use-toast.ts** - Toast notification system
- **components.json** - shadcn/ui configuration

## Key Features Implemented

### ✨ Frontend Features
- **Responsive Design** - Mobile-first approach with tablet and desktop optimization
- **Day/Night Theme** - Automatic time-based switching with manual toggle
- **Modern UI** - Clean, minimalist design matching Midday.ai aesthetic
- **Smooth Animations** - Hover effects, transitions, and loading states
- **Interactive Dashboard** - Tabbed interface with comprehensive data views

### 🔒 Authentication Features
- **Sign In/Sign Up** - Professional forms with validation
- **Social Auth Options** - Google, GitHub, Apple integration ready
- **Protected Routes** - Dashboard requires authentication
- **User Session Management** - Mock session handling

### 📈 Dashboard Features
- **Financial Overview** - Revenue, expenses, profit tracking
- **Invoice Management** - Create, view, and manage invoices
- **Time Tracking** - Log and monitor work hours
- **Expense Tracking** - Record and categorize expenses
- **Feature Status** - Track implementation progress

### 🗄 Backend Features
- **RESTful API** - Clean API endpoints for all operations
- **Database Schema** - Complete SQL schema for all features
- **Mock Data** - Realistic sample data for development
- **Error Handling** - Comprehensive error responses

## Installation Instructions

1. **Download/Clone** the project files
2. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
3. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`
4. **Optional Database Setup**:
   - Connect to Supabase or preferred database
   - Run the SQL script from `scripts/001-create-tables.sql`
   - Update environment variables

## Deployment Ready
- **Vercel Optimized** - Built for Vercel deployment
- **Environment Variables** - Ready for production secrets
- **Performance Optimized** - Lazy loading and code splitting
- **SEO Friendly** - Proper meta tags and semantic HTML

## Technologies Used
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

This project is a complete, production-ready clone of Midday.ai with all modern web development best practices implemented.
