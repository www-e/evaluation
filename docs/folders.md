# Folder Structure & File Purposes

## Root Directory

### Main Configuration Files
- **package.json**: Defines project dependencies, scripts, and metadata
  - Contains scripts for development, building, and linting
  - Lists all dependencies including Next.js, Prisma, Firebase, etc.
- **tsconfig.json**: TypeScript compiler configuration
  - Defines TypeScript settings for the project
- **next.config.ts**: Next.js framework configuration
  - Contains Next.js-specific settings and plugins
- **postcss.config.mjs**: PostCSS configuration for Tailwind CSS
- **.gitignore**: Specifies files and directories to be ignored by Git
- **.env.example**: Template for environment variables
- **eslint.config.mjs**: ESLint configuration for code linting
- **main task mvp.md**: Original project requirements document
- **PostmanCollection.json**: API testing collection for Postman
- **README.md**: Project overview and setup instructions
- **uploadthing.ts**: UploadThing configuration
  - Defines file upload router
  - Sets file type and size limits
  - Exports upload API instance
- **vercel.json**: Vercel deployment configuration


## Source Directory (src/)

### Actions Directory (src/actions/)
Contains server actions for database operations and business logic:

- **admin.ts**: Administrative functions
  - Category management (create, update, delete, list)
  - Product management (create, update, delete, list)
  - Order management and analytics
  - Dashboard statistics
  - All operations use Zod validation
- **auth.ts**: Authentication-related server actions
  - User synchronization between app and database
  - User existence checks
- **shop.ts**: Shopping-related server actions
  - Order creation and processing
  - Cart functionality

### App Directory (src/app/)
Contains Next.js App Router pages and layouts:

#### Main Pages
- **layout.tsx**: Root layout component
  - Sets up global styles and providers
  - Includes UploadThing SSR plugin
- **page.tsx**: Homepage
  - Displays product categories and featured items
  - Client component with server data fetching
- **globals.css**: Global CSS styles
  - Tailwind CSS imports and custom theme definitions
  - Color palette definitions

#### Authentication Pages
- **login/page.tsx**: Login page
  - Implements phone number authentication with Firebase
  - Includes ReCAPTCHA verification
- **register/page.tsx**: Registration page
  - Allows new user registration with phone number
  - Validates and creates user accounts
- **signup/page.tsx**: Redirects to register page

#### Product & Shopping Pages
- **products/page.tsx**: Product listing page
  - Displays all products with filtering and search
  - Client component with sidebar filters
- **products/[id]/page.tsx**: Individual product page
  - Shows detailed product information
  - Allows adding to cart
- **cart/page.tsx**: Shopping cart page
  - Displays items in cart
  - Handles order placement

#### Dashboard Pages
- **dashboard/layout.tsx**: Admin dashboard layout
  - Navigation sidebar for admin functions
  - Protected route component
- **dashboard/page.tsx**: Dashboard overview
  - Displays analytics and statistics
  - Shows recent orders and top products
- **dashboard/categories/**: Category management section
  - Server and client components for category CRUD
  - Pagination and image upload support
  - **page.tsx**: Server component that fetches and passes category data
    - Fetches paginated categories with product counts
    - Passes data to the client component
- **dashboard/products/**: Product management section
  - Server and client components for product CRUD
  - Category selection and image upload support
  - **page.tsx**: Server component that fetches and passes product and category data
    - Fetches paginated products with category information
    - Fetches all categories for the dropdown selection
    - Shows a message if no categories exist yet

#### Informational Pages
- **about/page.tsx**: About page
  - Company information and mission
- **contact/page.tsx**: Contact page
  - Contact information and inquiry form

#### API Routes
- **api/upload/route.ts**: Placeholder upload route
  - Contains a message that UploadThing handles the actual upload
  - Returns 405 status (Method Not Allowed) for POST requests
- **api/uploadthing/route.ts**: UploadThing API endpoint
  - Handles file uploads securely
  - Processes image uploads for products and categories

### Components Directory (src/components/)
Reusable React components organized by functionality:

#### UI Components (src/components/ui/)
- **AlertModal.tsx**: Alert modal component
  - Displays success/error messages
  - Auto-close functionality
- **button.tsx**: Custom button component
  - Multiple variants and sizes
  - Loading state support
- **card.tsx**: Card container component
  - Styled container with borders and shadows
- **Checkbox.tsx**: Checkbox component
  - Custom styled checkbox with label support
  - Accessible and user-friendly design
- **Drawer.tsx**: Drawer component
  - Sliding panel component for mobile navigation
  - Used for responsive design
- **Dropdown.tsx**: Dropdown component
  - Custom dropdown with options
  - Used for category selection in product management
- **ImageUpload.tsx**: Image upload component
  - Custom image upload with preview
  - Integration with UploadThing
  - Image validation and management
- **input.tsx**: Custom input component
  - Label and error state support
  - Icon support
- **StarRating.tsx**: Star rating component
  - Interactive star rating display
  - Configurable size and max rating
- **SuccessModal.tsx**: Success modal component
  - Confirms successful operations

#### Layout Components (src/components/layout/)
- **Header.tsx**: Application header
  - Navigation and authentication controls
  - Cart badge indicator
- **Footer.tsx**: Application footer
  - Contact information and social links
- **CartBadge.tsx**: Shopping cart indicator
  - Shows item count in cart
  - Links to cart page
- **Drawer.tsx**: Sliding drawer component
  - Mobile-friendly menu component

#### Authentication Components (src/components/auth/)
- **AuthLayout.tsx**: Authentication page layout
  - Consistent layout for login/register pages
- **LoginForm.tsx**: Login form component
  - Phone number authentication
  - ReCAPTCHA integration
  - Test phone numbers for development
- **RegisterForm.tsx**: Registration form component
  - Phone number and name registration
  - Validation and error handling

#### Dashboard Components (src/components/dashboard/)
- **CategoriesClient.tsx**: Complete category management interface
  - Forms for creating/updating categories
  - List view with delete functionality
  - Image upload support
  - Pagination controls
  - Edit mode with inline form
  - Optimistic updates and error handling
  - Alert modal for user feedback
- **ProductsClient.tsx**: Complete product management interface
  - Forms for creating/updating products
  - List view with delete functionality
  - Category dropdown and image upload
  - Pagination controls
  - Edit mode with inline form
  - Optimistic updates and error handling
  - Alert modal for user feedback

#### Shop Components (src/components/shop/)
- **CartClient.tsx**: Shopping cart UI
  - Item list with quantity controls
  - Order placement functionality
- **HomePageClient.tsx**: Client-side homepage component
  - Fetches and displays products and categories
  - Handles client-side interactions on the homepage
- **ProductCard.tsx**: Product display card
  - Shows product information
  - Add to cart functionality
- **ShopSidebar.tsx**: Product filtering sidebar
  - Category and price filters
  - Search functionality

#### Generic Components
- **ErrorBoundary.tsx**: Error boundary component
  - Catches and handles component errors
  - Prevents app crashes
- **FilterSidebar.tsx**: Filter sidebar component
  - Category and price range filtering
  - Rating filters
- **LoadingSpinner.tsx**: Loading spinner component
  - Visual indication of loading states
  - Different sizes available
- **Pagination.tsx**: Pagination component
  - Page navigation controls
  - Responsive design
- **ProductCard.tsx**: Product display component (different from shop/ProductCard)
  - Shows product details
  - Used in general product listings
- **RangeSlider.tsx**: Range slider component
  - Price range filtering
  - Accessible controls

### Hooks Directory (src/hooks/)
- **useAuth.tsx**: Authentication hook
  - Manages Firebase authentication state
  - Provides user information and loading status
  - Handles sign-out functionality

### Lib Directory (src/lib/)
Utility libraries and configurations:

- **fileUpload.ts**: Image upload validation utilities
  - Validates image file types (JPEG, PNG, WebP, GIF)
  - Validates image file size (max 5MB)
  - Provides validation functions for image buffers
  - Contains deprecated save/delete functions (UploadThing is used instead)
- **prisma.ts**: Prisma client singleton
  - Creates a single Prisma client instance
  - Prevents multiple connections in development
- **firebase.ts**: Firebase configuration
  - Initializes Firebase app with environment config
  - Exports authentication instance
- **utils.ts**: Utility functions
  - Class name merging function (cn)
  - Currency formatting function
  - Phone number formatting

### Scripts Directory (src/scripts/)
- **truncate-db.ts**: Database cleanup script
  - Clears all data from database tables
  - Maintains referential integrity during truncation
  - Used for testing and development
  - Handles foreign key constraints by truncating tables in the correct order

### Store Directory (src/store/)
- **cart.ts**: Cart state management
  - Zustand store for shopping cart
  - Functions to add/remove/update items
  - Persists state to localStorage

### Utils Directory (src/utils/)
- **uploadthing.ts**: UploadThing utilities
  - Generates upload button and dropzone components
  - Typed components for file uploads

### Other Files
- **eslint.config.mjs**: ESLint configuration
  - Defines linting rules for the project
  - Configures code quality checks
- **main task mvp.md**: Project requirements document
  - Original specification for the MVP
  - Contains initial feature requirements
- **next.config.ts**: Next.js configuration
  - Configures Next.js framework options
  - Sets up plugins and build settings
- **postcss.config.mjs**: PostCSS configuration
  - Configures Tailwind CSS processing
  - Handles CSS transformations
- **PostmanCollection.json**: Postman API collection
  - API testing collection for development
  - Contains API endpoint definitions
- **tsconfig.json**: TypeScript configuration
  - Defines TypeScript compiler options
  - Configures type checking settings
- **vercel.json**: Vercel deployment configuration
  - Defines deployment settings for Vercel
  - Configures build and runtime options

