# Architecture & Structure

## Technical Architecture

The application follows a modern full-stack architecture with:

- **Frontend**: Next.js 16.1.0 with App Router
- **Backend**: Next.js API routes and Server Actions
- **Database**: MySQL with Prisma ORM
- **Authentication**: Firebase Authentication
- **File Storage**: UploadThing
- **State Management**: Zustand for client-side state

## Project Structure

```
evaluationtask/
├── docs/                   # Documentation files
├── node_modules/           # Dependencies
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── src/                    # Source code
│   ├── actions/            # Server actions for database operations
│   ├── app/                # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── cart/           # Shopping cart page
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── login/          # Login page
│   │   ├── products/       # Product browsing pages
│   │   └── ...             # Other pages
│   ├── components/         # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and libraries
│   ├── scripts/            # Utility scripts
│   ├── store/              # Client-side state management
│   ├── utils/              # Utility functions
│   └── uploadthing.ts      # UploadThing configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project readme
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

## Key Architectural Patterns

### 1. Server Actions Pattern
- Server actions are used for all database operations
- Located in `src/actions/` directory
- Actions are validated using Zod schemas
- Actions invalidate cache when needed using `revalidatePath`

### 2. Client-Server Component Separation
- Server components fetch and pass data to client components
- Client components handle user interactions and state
- This pattern optimizes performance and reduces bundle size

### 3. Component Organization
- Reusable UI components in `src/components/ui/`
- Layout components in `src/components/layout/`
- Dashboard components in `src/components/dashboard/`
- Authentication components in `src/components/auth/`
- Shop-related components in `src/components/shop/`

### 4. State Management
- Global cart state managed with Zustand in `src/store/cart.ts`
- Authentication state managed with React Context in `src/hooks/useAuth.tsx`
- Local component state for UI interactions

### 5. Data Fetching Strategy
- Server components for initial data fetching
- Client components for interactive updates
- Caching strategies implemented where appropriate
- Dynamic rendering for real-time updates

## Design Principles Applied

1. **Performance**: Server components for initial render, client components for interactivity
2. **Security**: Server actions for database operations, client-side auth state only
3. **Maintainability**: Clear separation of concerns, reusable components
4. **Scalability**: Modular architecture with clear boundaries between components