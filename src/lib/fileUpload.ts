import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Define upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
try {
  fs.mkdir(UPLOAD_DIR, { recursive: true });
} catch (error) {
  console.error('Error creating upload directory:', error);
}

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// Function to validate file type and size from buffer
export function validateImageBuffer(buffer: Buffer, originalName: string, mimeType: string): { isValid: boolean; error?: string } {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(mimeType)) {
    return {
      isValid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
    };
  }

  // Validate file size (max 5MB)
  if (buffer.length > 5 * 1024 * 1024) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size is 5MB.'
    };
  }

  return { isValid: true };
}

export async function saveImageBuffer(buffer: Buffer, originalName: string, mimeType: string): Promise<UploadResult> {
  try {
    const validation = validateImageBuffer(buffer, originalName, mimeType);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Create unique filename
    const fileExtension = path.extname(originalName) || '.' + mimeType.split('/')[1];
    const fileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    // Save buffer to file
    await fs.writeFile(filePath, buffer);

    // Return the URL (relative to public directory)
    return {
      success: true,
      url: `/uploads/${fileName}`
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'Failed to upload image'
    };
  }
}

export async function deleteImage(imagePath: string): Promise<boolean> {
  try {
    if (!imagePath || !imagePath.startsWith('/uploads/')) {
      return false;
    }

    const fullPath = path.join(process.cwd(), 'public', imagePath);
    await fs.unlink(fullPath);
    return true;
  } catch (error) {
    console.error('Delete image error:', error);
    return false;
  }
}