# Environment Setup

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MySQL** database server
- **Git** for version control

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

### Obtaining Environment Variables

#### Database URL
- Set up a MySQL database
- Replace `username`, `password`, and `database_name` with your actual values

#### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Navigate to Project Settings
4. Find the Web App configuration section
5. Copy the configuration values to your environment variables

#### UploadThing Configuration
1. Go to [UploadThing](https://uploadthing.com/)
2. Create an account and set up a new application
3. Find your secret key and app ID in the dashboard

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd evaluationtask
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Prisma**:
   ```bash
   npx prisma generate
   npx prisma db push  # For development
   # or for production with migrations
   npx prisma migrate deploy
   ```

## Development Setup

1. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Access the application**:
   - The application will be available at `http://localhost:3000`
   - The admin dashboard will be available at `http://localhost:3000/dashboard`

## Database Setup

### Prisma Migrations
- **Development**: Use `npx prisma db push` for quick schema updates
- **Production**: Use `npx prisma migrate dev` to create and apply migrations
- **Deploy**: Use `npx prisma migrate deploy` to apply migrations to production

### Seeding Data
- To clear all data for testing, run:
  ```bash
  npx tsx src/scripts/truncate-db.ts
  ```

## Testing Environment

### Test Phone Numbers
The application includes test phone numbers for development:
- `+1 650-555-0125`
- `+1 650-555-0123`
- `+1 650-555-0124`
- `+16505550125`
- `+16505550123`
- `+16505550124`

### Authentication Testing
- Use the test phone numbers for login/register during development
- The OTP verification is simulated with these numbers

## Build & Production

### Building the Application
```bash
npm run build
# or
yarn build
```

### Running in Production
```bash
npm run start
# or
yarn start
```

## Troubleshooting

### Common Issues

1. **Prisma Error**: If you encounter Prisma-related errors:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Environment Variables**: Ensure all required environment variables are set in `.env.local`

3. **Database Connection**: Verify that your MySQL server is running and the DATABASE_URL is correct

4. **Firebase Setup**: Make sure Firebase is properly configured with phone authentication enabled

### Development Tips

- Use `npm run dev` for development with hot reloading
- The application uses Next.js App Router with server components
- Server actions are used for all database operations
- Authentication state is managed client-side with Firebase
- Cart state is persisted with Zustand