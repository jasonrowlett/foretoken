# Foretoken - Real-World Asset Tokenization Media Platform

## Overview

Foretoken is a sophisticated media and data platform focused on real-world asset tokenization. The application provides news, analysis, and market intelligence covering tokenized assets from real estate to commodities. Built with a modern tech stack emphasizing performance and user experience, the platform serves as a Bloomberg Terminal-style interface for the tokenization ecosystem.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: TailwindCSS with dark theme (black backgrounds, neon purple/silver accents)
- **Routing**: Wouter for client-side navigation
- **State Management**: React hooks with TanStack Query for server state management
- **UI Components**: Radix UI components via shadcn/ui design system

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Development**: Hot reload with Vite middleware integration
- **API Pattern**: RESTful endpoints with `/api` prefix
- **Error Handling**: Centralized error middleware with structured responses

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon Database)
- **Development Storage**: In-memory storage implementation for development
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Frontend Components
1. **Layout Components**
   - Navbar with neon glow effects and mobile responsiveness
   - Footer with brand information and social links
   - Hero section with real-time data visualization

2. **Page Components**
   - Home: Hero section with market data displays
   - Library: Article browsing with category filtering
   - Podcast: Audio player with episode archive
   - Connect: Contact forms with service selection
   - Subscribe: Pricing tiers and newsletter signup

3. **UI Components**
   - Complete shadcn/ui component library
   - Custom data visualization components
   - Responsive design with mobile-first approach

### Backend Components
1. **Storage Interface**
   - Abstract storage interface for CRUD operations
   - Memory-based implementation for development
   - User management with authentication schemas

2. **Route Registration**
   - Modular route structure under `/api` prefix
   - HTTP server with middleware integration
   - Request/response logging with performance metrics

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express middleware handles authentication, validation, and business logic
3. **Data Access**: Storage layer abstracts database operations through Drizzle ORM
4. **Response**: Structured JSON responses with error handling
5. **Client Updates**: Query cache invalidation triggers UI updates

## External Dependencies

### Core Dependencies
- **Frontend**: React, Vite, TailwindCSS, Wouter, TanStack Query
- **Backend**: Express, Drizzle ORM, Neon Database connector
- **UI Library**: Radix UI primitives, Lucida React icons
- **Development**: TypeScript, ESBuild, TSX for development server

### Styling and Assets
- **Fonts**: Notable for headings, Inter for body text
- **Icons**: Lucide React and React Icons (Social media icons)
- **Design System**: shadcn/ui components with customized dark theme

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with ES modules
- **Hot Reload**: Vite development server with error overlay
- **Database**: PostgreSQL 16 module for local development
- **Port Configuration**: Server runs on port 5000 with external port 80

### Production Build
- **Frontend**: Vite build outputs to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Autoscale deployment target on Replit
- **Environment**: Production mode with NODE_ENV=production

### Configuration Files
- **Drizzle**: Schema in `shared/schema.ts`, migrations in `./migrations`
- **TypeScript**: Shared configuration for client, server, and shared modules
- **Tailwind**: Custom configuration with design tokens and component paths

## Recent Changes
- June 25, 2025: Complete Bloomberg Terminal-inspired website implementation
  - Dark theme with purple/silver neon accents and Notable font branding
  - Five fully functional pages: Home, Library, Podcast, Connect, Subscribe
  - Responsive design with smooth hover effects and professional data displays
  - Fixed React Icons import issues and TypeScript configuration
- June 25, 2025: Transformed Podcast page into "Foretoken Signal Network"
  - Integrated 5 real podcast shows with authentic embedded players
  - Featured Foretoken Newswire prominently with full streaming platform links
  - Added 4 regional RWA reports (Africa, Asia, Europe, Americas) in grid layout
  - Connected custom podcast artwork to each show using attached assets
  - Implemented working Spotify, Apple Podcasts, and iHeart Radio links
- June 25, 2025: Updated footer social media icons
  - Replaced Twitter bird icon with modern X logo (FaXTwitter)
  - Updated LinkedIn with cleaner modern icon styling
  - Completely removed YouTube icon and link
  - Added modern Telegram icon with proper link
  - All social links now open in new tabs with proper attribution
- June 25, 2025: Added Advertising Policy page
  - Created comprehensive advertising policy page with complete text from provided document
  - Added route to App.tsx for /advertising-policy path
  - Included link in footer Legal section for easy access
  - Styled consistently with existing dark theme and Bloomberg Terminal aesthetic
- June 25, 2025: Added Terms of Service page
  - Created comprehensive terms of service page with complete text from provided document
  - Added route to App.tsx for /terms-of-service path
  - Updated footer Terms of Service link to point to actual page
  - Maintained consistent styling with Advertising Policy page
- June 25, 2025: Added Privacy Policy page
  - Created comprehensive privacy policy page with complete text from provided document
  - Added route to App.tsx for /privacy-policy path
  - Updated footer Privacy Policy link to point to actual page
  - Maintained consistent styling with other legal pages
- June 25, 2025: Implemented complete Stripe payment integration
  - Created backend checkout session endpoint with proper Stripe SDK integration
  - Fixed frontend redirect logic to properly handle Stripe checkout URLs
  - Added new Stripe products and prices in user's account (working price IDs)
  - Created checkout success and cancel pages with proper routing
  - Added loading states and error handling for payment flow
  - Updated success/cancel URLs to use production domain (foretoken.xyz)
- June 25, 2025: Integrated Beehiiv newsletter API for automated signups
  - Connected subscribe page email form to Beehiiv newsletter service
  - Added backend API endpoint with proper authentication and error handling
  - Implemented duplicate subscription detection and user-friendly messaging
  - Added form validation, loading states, and success/error feedback
  - Successfully tested with real email subscription (verified working)
- June 25, 2025: Added Speaking at RWA Events section to Connect page
  - Integrated professional conference images from CryptoAI Conference and Web3 Amsterdam
  - Created comprehensive speaking portfolio with hover effects and event details
  - Added speaking topics covering RWA tokenization, institutional adoption, and market intelligence
  - Included call-to-action for speaking engagement bookings
  - Maintained consistent Bloomberg Terminal dark theme with purple accents
- June 25, 2025: Enhanced Connect page with contact form functionality and consulting services
  - Implemented PostgreSQL database storage for contact form submissions
  - Created backend API endpoint with form validation and database integration
  - Added comprehensive Consulting Services section with three service pillars
  - Updated contact information: jason@foretoken.co email, @jasonrowlett Telegram, Austin TX location
  - Built engagement process workflow and consultation scheduling features
- June 26, 2025: Integrated Gumroad ebook store into Library section
  - Added "Ebooks" category to Library navigation with dedicated ebook display section
  - Created featured ebook showcase with professional book covers and pricing
  - Implemented direct Gumroad purchase links with external link indicators
  - Added embedded Gumroad store iframe for complete product browsing
  - Maintained Bloomberg Terminal dark theme with purple accent consistency
- June 26, 2025: Optimized responsive design and mobile layout
  - Fixed FORETOKEN headline to display on single line across all screen sizes
  - Implemented CSS clamp() functions for proportional font scaling
  - Added mobile-specific media queries for 375px and 414px iPhone screens
  - Reorganized data visualization cards into horizontal row layout
  - Created full-width Live Market Data section below three main data cards
  - Enhanced mobile breakpoints with proper text wrapping and spacing
- June 27, 2025: Created comprehensive About page
  - Built About page with company mission and founder biography using provided content
  - Integrated Jason Rowlett's professional profile image (Prinsengracht_profile)
  - Used Notable font for titles and Inter font for body text maintaining brand consistency
  - Added About page to navbar and footer navigation
  - Implemented responsive two-column layout with gradient effects and backdrop blur
  - Added call-to-action section linking to Subscribe and Connect pages
- June 27, 2025: Implemented complete RWA 101 educational section in Library
  - Created 6 individual article pages with full content from provided documents
  - Added "RWA 101" category to Library navigation and filtering system
  - Built dedicated article pages: analyze-tokenized-assets, what-is-blockchain, double-pedigree-strategy, smart-contracts-guide, blockchain-solving-problems, rwa-tokenization-guide
  - Replaced placeholder articles with authentic educational content by Jason Rowlett
  - Implemented clickable article cards with proper routing and hover effects
  - Maintained Bloomberg Terminal dark theme with purple accents throughout all pages
  - Added comprehensive navigation between articles and back to Library
- June 27, 2025: Created comprehensive RWA Tokenization Glossary
  - Built glossary page with 50+ terms from provided PDF document
  - Added "Glossary" category to Library navigation with preview section
  - Implemented searchable glossary with category filtering system
  - Organized all terms alphabetically from AML to Yield Token
  - Created proper categorization: Core, Technology, Finance, Security, Token Types, etc.
  - Added dedicated glossary route and maintained Bloomberg Terminal styling
  - Included feature highlights and statistics display
- June 27, 2025: Implemented complete user authentication system
  - Created secure signup and login pages with form validation using react-hook-form and Zod
  - Built comprehensive backend authentication API with bcrypt password hashing
  - Integrated express-session for secure login persistence and session management
  - Added user welcome page with profile information and logout functionality
  - Enhanced navbar with authentication dropdown menu for logged-in users
  - Implemented mobile-responsive authentication UI with modern dark theme
  - Created useAuth hook for centralized authentication state management
  - Added complete error handling and user feedback with toast notifications
  - Updated user schema to include email field with proper validation
  - Built in-memory storage system for user data with proper CRUD operations
- June 28, 2025: Updated navbar navigation structure
  - Removed separate Subscribe button from navbar to streamline design
  - Linked Sign Up button to /subscribe page for integrated subscription flow
  - Maintained three-column layout: Logo left, navigation center, auth elements right
  - Updated both desktop and mobile navigation to reflect changes
- June 28, 2025: Enhanced Hero section navigation
  - Linked "Start Learning" button to /library page for direct access to educational content
  - Improved user journey from homepage to RWA 101 educational materials
- June 28, 2025: Added newsletter signup to homepage
  - Created reusable NewsletterSignup component with Beehiiv API integration
  - Placed "Stay Informed" section between Hero and Live Market Data sections
  - Separated LiveMarketData into its own component for better modularity
  - Maintained consistent Bloomberg Terminal styling and newsletter functionality
- June 28, 2025: Streamlined podcast page
  - Removed "Never Miss An Update" call-to-action block from bottom of podcast page
  - Cleaned up page layout to focus on podcast content and embedded players

## Changelog
- June 25, 2025: Initial setup and complete website build

## User Preferences

Preferred communication style: Simple, everyday language.
User feedback: "Very impressed" with Bloomberg Terminal aesthetic and functionality.