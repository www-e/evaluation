# Authentication System

## Overview

The application implements a phone number-based authentication system using Firebase Authentication. The system includes both login and registration flows with OTP (One-Time Password) verification.

## Authentication Flow

### Registration Flow
1. User enters their full name and phone number
2. App verifies the phone number is not already registered
3. Firebase sends an OTP to the user's phone
4. User enters the OTP received
5. On successful OTP verification, user data is synced to the database
6. User is redirected to the homepage

### Login Flow
1. User enters their phone number
2. App verifies the user exists in the database
3. Firebase sends an OTP to the user's phone
4. User enters the OTP received
5. On successful OTP verification, user is logged in
6. User is redirected to the homepage

## Components

### Firebase Configuration (src/lib/firebase.ts)
- Initializes Firebase app with environment variables
- Sets up authentication instance
- Uses environment variables for configuration:
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - `NEXT_PUBLIC_FIREBASE_APP_ID`

### Authentication Hook (src/hooks/useAuth.tsx)
- Manages authentication state across the application
- Provides user information and loading status
- Handles logout functionality
- Uses Firebase's `onAuthStateChanged` to listen for auth state changes
- Redirects to login page after logout

### Login Form (src/components/auth/LoginForm.tsx)
- Handles the login process with phone number authentication
- Implements two-step process: phone number entry and OTP verification
- Validates phone number format (E.164 standard)
- Includes ReCAPTCHA verification for security
- Supports test phone numbers for development
- Handles various Firebase authentication errors

### Registration Form (src/components/auth/RegisterForm.tsx)
- Handles user registration with phone number and full name
- Implements two-step process: details entry and OTP verification
- Validates phone number format (E.164 standard) and name length
- Includes ReCAPTCHA verification for security
- Checks for existing users to prevent duplicates
- Syncs user data to the database after successful registration

### Server Actions (src/actions/auth.ts)
- `syncUser(mobile, fullName)`: Creates or updates user in the database
  - Uses Prisma's `upsert` to create new users or update existing ones
  - Returns success/error status
- `checkUserExists(mobile)`: Checks if user exists in the database
  - Used during login to verify user exists before sending OTP
  - Returns existence status and user data

## Security Features

### ReCAPTCHA Integration
- Prevents automated attacks and spam
- Invisible ReCAPTCHA used for better user experience
- Implemented in both login and registration forms

### Phone Number Validation
- Validates phone numbers in E.164 format
- Ensures proper international format (+ followed by 1-15 digits)
- Provides user-friendly error messages

### Error Handling
- Comprehensive Firebase error handling
- Specific error messages for different failure scenarios
- Proper cleanup of ReCAPTCHA verifier on errors

## Database Integration

The authentication system integrates with the MySQL database through Prisma:

- User information (mobile number and full name) is stored in the User table
- The `syncUser` action creates or updates user records
- The `checkUserExists` action verifies user presence before login
- Firebase authentication handles the actual authentication process
- Database serves as the source of truth for user profiles

## User Experience

### Two-Step Verification Process
- First step: Enter phone number (login) or details (registration)
- Second step: Enter OTP received via SMS
- Clear navigation between steps
- Loading states and error handling

### Test Support
- Includes predefined test phone numbers for development
- Clear instructions for phone number format
- Formatted phone number display for verification

### Responsive Design
- Mobile-friendly authentication forms
- Consistent styling with the rest of the application
- Accessible error messages and feedback

## Implementation Details

### State Management
- Uses React's `useState` for form state
- Manages multi-step form flow with state
- Loading states prevent multiple submissions

### Firebase Integration
- Uses Firebase Auth's phone number authentication
- `signInWithPhoneNumber` method for OTP flow
- `RecaptchaVerifier` for ReCAPTCHA integration
- `confirmationResult.confirm()` for OTP verification

### Navigation
- Uses Next.js `useRouter` for client-side navigation
- Redirects to appropriate pages after authentication
- Maintains user context throughout the flow

## Error Handling

The system handles various error scenarios:

- Invalid phone number format
- User not found (during login)
- User already exists (during registration)
- OTP verification failures
- Network errors
- Firebase-specific errors (quota exceeded, etc.)

Each error is handled with appropriate user feedback and, where possible, suggestions for resolution.