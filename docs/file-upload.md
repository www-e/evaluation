# Image Upload & File Handling System

## Overview

The application uses UploadThing as its file upload service to handle image uploads for products and categories. The system provides secure, efficient image handling with validation and automatic cleanup.

## UploadThing Configuration

### Core Configuration (src/uploadthing.ts)

#### File Router
- **Endpoint**: `imageUploader` - Handles all image uploads
- **File Type**: Images only (JPEG, PNG, WebP, GIF)
- **Size Limit**: Maximum 4MB per file
- **Count Limit**: 1 file at a time

#### Middleware
- **Authentication**: Currently uses anonymous user (should be replaced with real auth in production)
- **Metadata**: Stores user ID with uploaded files
- **Validation**: Ensures only authenticated users can upload (placeholder implementation)

#### Upload Completion Handler
- **Logging**: Records upload completion with user ID
- **Return Value**: Provides uploadedBy information to client
- **Server-Side Processing**: Runs after successful upload

#### UTApi Instance
- **Purpose**: Provides server-side API for UploadThing operations
- **Usage**: Used for deleting files from UploadThing storage

### Upload Components (src/utils/uploadthing.ts)

#### Generated Components
- **UploadButton**: Standard button component for uploads
- **UploadDropzone**: Drag-and-drop upload area component
- **Type Safety**: Strongly typed with `OurFileRouter` type

## Image Upload Component (src/components/ui/ImageUpload.tsx)

### Props
- **value**: Current image URL (optional)
- **onChange**: Callback function to handle URL changes
- **label**: Display label for the upload field
- **className**: Additional CSS classes
- **disabled**: Whether the upload is disabled
- **autoUpload**: Whether to auto-upload with form submission

### Functionality
- **Preview Display**: Shows uploaded image with preview
- **Upload Process**: Handles file selection and upload
- **Error Handling**: Displays upload errors to user
- **Image Management**: Allows changing or removing images
- **Visual Feedback**: Loading states and progress indicators

### UI Features
- **Empty State**: Prompts user to select an image with icon
- **Upload Button**: Appears on image hover for changing
- **Delete Button**: Appears on image hover for removal
- **File Information**: Shows current file name
- **Support Information**: Lists supported file types (JPG, PNG, WEBP)

## Integration with Admin System

### Category Images
- **Required**: Category creation requires an image
- **Validation**: Zod schema validates image presence
- **Cleanup**: Automatically deletes images when category is removed
- **Display**: Shows category images in grid view

### Product Images
- **Required**: Product creation requires an image
- **Validation**: Zod schema validates image presence
- **Cleanup**: Automatically deletes images when product is removed
- **Display**: Shows product images in grid view with price overlay

## File Handling Operations

### Upload Process
1. **Client-Side**: User selects image via UploadButton
2. **Validation**: UploadThing validates file type and size
3. **Upload**: File is securely uploaded to UploadThing
4. **Callback**: URL is returned to component via handleUploadComplete
5. **Storage**: URL is stored in application database

### Deletion Process
1. **Database Delete**: Admin deletes category/product via server action
2. **Image Check**: System checks if image is from UploadThing
3. **URL Parsing**: Extracts file key from UploadThing URL
4. **Remote Delete**: Uses UTApi to delete image from UploadThing
5. **Database Update**: Removes reference from database

## Security Features

### File Validation
- **Type Validation**: Only allows image files (JPEG, PNG, WebP, GIF)
- **Size Validation**: Limits files to 4MB maximum
- **Server-Side**: Validation occurs on UploadThing servers

### Access Control
- **Middleware**: Authentication check before upload
- **Metadata**: Tracks which user uploaded each file
- **Cleanup**: Prevents orphaned files by linking to database records

## Performance Considerations

### Client-Side Optimization
- **Preview Caching**: Stores preview URLs locally
- **Lazy Loading**: Images loaded as needed
- **State Management**: Efficient state updates during upload

### Server-Side Optimization
- **Direct Upload**: Files go directly to UploadThing (not through app server)
- **Caching**: Potential for CDN caching of uploaded images
- **Compression**: UploadThing handles image optimization

## Error Handling

### Upload Errors
- **Client-Side**: Displays error messages to user
- **Server-Side**: Logs upload failures for debugging
- **Validation**: Provides specific error messages for different failure types

### Network Issues
- **Retry Logic**: UploadThing handles network retries
- **Fallback**: Graceful degradation when upload fails
- **User Feedback**: Clear messages about upload status

## Integration Points

### Database Schema
- **Category Model**: Contains optional `image` field
- **Product Model**: Contains optional `image` field
- **Relationship**: Images linked to database records

### Server Actions
- **Category Operations**: Handle image cleanup during category deletion
- **Product Operations**: Handle image cleanup during product deletion
- **URL Management**: Extract and process UploadThing URLs

## Extensibility

### Additional File Types
- **Configuration**: Easy to add support for other file types
- **Validation**: Can add more specific validation rules
- **Processing**: Can add server-side image processing

### Advanced Features
- **Multiple Files**: Can be extended to support multiple file uploads
- **Custom Processing**: Can add image resizing or format conversion
- **Storage Options**: Can integrate with other storage providers

## Best Practices Implemented

### Security
- **Server-Side Validation**: All file validation happens on UploadThing servers
- **Authentication**: Middleware ensures only authorized uploads
- **URL Security**: Direct access to upload endpoints is controlled

### User Experience
- **Clear Feedback**: Loading states and success/error messages
- **Intuitive Interface**: Drag-and-drop and click-to-upload options
- **Visual Preview**: Immediate preview of uploaded images

### Performance
- **Direct Upload**: Files bypass application server
- **CDN Delivery**: UploadThing provides CDN for served images
- **Optimized Storage**: Automatic image optimization