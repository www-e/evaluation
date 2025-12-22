# Third Party Services & Integrations

## Overview

This document outlines all third-party services and libraries integrated into the e-commerce food ordering platform, including their purposes and implementations.

## Core Frameworks & Libraries

### Next.js (v16.1.0)
- **Purpose**: Full-stack React framework for building the application
- **Features Used**:
  - App Router for routing and layout management
  - Server Components for data fetching and initial renders
  - Server Actions for database operations
  - Built-in API routes for file uploads
- **Location**: Core framework used throughout the application

### React (v19.2.3) & React DOM (v19.2.3)
- **Purpose**: Frontend library for building user interfaces
- **Features Used**:
  - Functional components with hooks
  - Context API for state management
  - Server and Client component patterns

## Database & ORM

### Prisma ORM (v5.22.0)
- **Purpose**: Modern database toolkit and ORM for database access
- **Features Used**:
  - Type-safe database queries
  - Auto-generated client based on schema
  - Migrations for schema changes
  - Connection pooling
- **Configuration**: Located in `prisma/schema.prisma` and `src/lib/prisma.ts`
- **Database**: MySQL database connection

### MySQL (via mysql2 v3.16.0)
- **Purpose**: Relational database for storing application data
- **Features Used**:
  - Persistent storage for users, products, orders
  - Relational data modeling
  - ACID transactions

## Authentication

### Firebase (v12.7.0)
- **Purpose**: Authentication service for user management
- **Features Used**:
  - Phone number authentication
  - Real-time authentication state management
  - ReCAPTCHA verification for security
- **Components**:
  - `src/lib/firebase.ts` - Firebase initialization
  - `src/hooks/useAuth.tsx` - Authentication hook
  - `src/components/auth/LoginForm.tsx` - Login component
  - `src/components/auth/RegisterForm.tsx` - Registration component

## File Upload & Storage

### UploadThing (v7.7.4 & @uploadthing/react v7.3.3)
- **Purpose**: File upload service for handling image uploads
- **Features Used**:
  - Secure image uploads with validation
  - Automatic file type and size checking
  - Integration with Next.js App Router
  - Client-side upload components
- **Components**:
  - `src/uploadthing.ts` - Upload router configuration
  - `src/utils/uploadthing.ts` - Upload button/dropzone generation
  - `src/components/ui/ImageUpload.tsx` - Image upload component
  - `src/app/api/uploadthing/route.ts` - API endpoint for uploads

## Styling & UI

### Tailwind CSS (v4) & @tailwindcss/postcss (v4)
- **Purpose**: Utility-first CSS framework for styling
- **Features Used**:
  - Responsive design utilities
  - Custom theme configuration
  - JIT compiler for performance
- **Configuration**: Located in `tailwind.config.ts` and `src/app/globals.css`

### Lucide React (v0.562.0)
- **Purpose**: Icon library with consistent design
- **Features Used**:
  - UI icons throughout the application
  - Consistent iconography
- **Usage**: Imported in various components like buttons, navigation, etc.

### Class Variance Authority & CLSX (v0.7.1 & v2.1.1)
- **Purpose**: Utility for handling conditional class names
- **Features Used**:
  - Conditional styling in components
  - Maintaining clean class name construction
- **Usage**: Implemented in `src/lib/utils.ts` for the `cn` helper function

### Tailwind Merge (v3.4.0)
- **Purpose**: Smart class merging utility
- **Features Used**:
  - Overriding Tailwind classes while preserving specificity
  - Used with class variance authority

## State Management

### Zustand (v5.0.9)
- **Purpose**: Lightweight state management solution
- **Features Used**:
  - Global cart state management
  - Persistent storage with middleware
  - Simple API without boilerplate
- **Configuration**: Located in `src/store/cart.ts`

## Validation & Utilities

### Zod (v4.2.1)
- **Purpose**: Runtime schema validation with TypeScript support
- **Features Used**:
  - Server action input validation
  - Type inference from schemas
  - Error handling for invalid inputs
- **Usage**: Used in `src/actions/admin.ts` for validating category and product data

### UUID (v13.0.0 & @types/uuid v10.0.0)
- **Purpose**: Generation of universally unique identifiers
- **Features Used**:
  - Unique IDs for database records
  - Consistent ID generation across the application
- **Usage**: Used in Prisma schema for primary keys and in file upload validation

### Image Validation Utilities (src/lib/fileUpload.ts)
- **Purpose**: Server-side image validation before upload
- **Features Used**:
  - File type validation (JPEG, PNG, WebP, GIF)
  - File size validation (max 5MB)
  - Buffer validation for image uploads
- **Note**: Primarily for validation as UploadThing handles the actual upload process

### Dotenv (v17.2.3)
- **Purpose**: Environment variable management
- **Features Used**:
  - Loading environment variables from .env files
  - Keeping sensitive information out of code
- **Usage**: Implicitly used by Next.js and Prisma for configuration

## Development Tools

### TypeScript (v5)
- **Purpose**: Static type checking for JavaScript
- **Features Used**:
  - Type safety throughout the application
  - Better developer experience with IntelliSense
  - Compile-time error detection

### ESLint (v9) & eslint-config-next (v16.1.0)
- **Purpose**: JavaScript/TypeScript linting tool
- **Features Used**:
  - Code quality enforcement
  - Consistent code style
  - Best practice recommendations

## Package Management & Execution

### TSX (v4.21.0)
- **Purpose**: TypeScript runner for Node.js
- **Features Used**:
  - Running TypeScript files directly
  - Used in development scripts

## Service Integration Summary

| Service | Purpose | Key Features |
|---------|---------|--------------|
| Firebase | Authentication | Phone auth, ReCAPTCHA, Real-time state |
| UploadThing | File Upload | Secure image upload, validation, integration |
| Prisma | Database ORM | Type-safe queries, migrations, relations |
| Zustand | State Management | Global cart state, persistence |
| Zod | Validation | Server action validation, type safety |
| Tailwind CSS | Styling | Responsive design, custom themes |

## Configuration Files

- `.env.local` - Contains API keys and sensitive configuration
- `next.config.ts` - Next.js framework configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compilation options
- `prisma/schema.prisma` - Database schema definition

## Security Considerations

- Server actions protect database operations from client-side manipulation
- Firebase ReCAPTCHA protects against automated attacks
- UploadThing validates file types and sizes
- Environment variables keep sensitive data secure
- Prisma provides SQL injection protection