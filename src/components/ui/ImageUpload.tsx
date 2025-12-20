'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { UploadButton } from "@/utils/uploadthing";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  autoUpload?: boolean; // Whether to auto-upload with form submission
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "Image",
  className = "",
  disabled = false,
  autoUpload = false
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreviewUrl(value || null);
  }, [value]);

  const handleUploadComplete = (res: any) => {
    if (res && res[0]?.url) {
      onChange(res[0].url); // Pass the uploaded URL to parent component
      setPreviewUrl(res[0].url);
      setIsUploading(false);
    }
  };

  const handleError = (error: any) => {
    setError('Upload failed: ' + (error.message || 'Unknown error'));
    setIsUploading(false);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(null);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>

      {/* Preview area with full-width button on image */}
      <div className="space-y-2">
        <div className="relative w-full min-h-40 border-2 border-dashed border-input rounded-lg overflow-hidden bg-secondary">
          {previewUrl ? (
            <div className="relative w-full">
              <div className="flex items-center justify-center w-full min-h-40">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-40 object-contain max-w-full"
                />
              </div>
              <div className="absolute top-2 right-2 bg-black/50 rounded-md p-1 opacity-0 hover:opacity-100 transition-opacity">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={handleUploadComplete}
                  onUploadError={handleError}
                  appearance={{
                    button: {
                      backgroundColor: disabled ? '#9ca3af' : '#3b82f6',
                      color: 'white',
                      borderRadius: '0.375rem',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      border: 'none',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    },
                  }}
                  disabled={disabled || isUploading}
                  content={{
                    button({ ready, isUploading }: { ready: boolean, isUploading: boolean }) {
                      if (isUploading) {
                        return (
                          <span className="flex items-center gap-1">
                            <div className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"></div>
                            <Upload className="h-3 w-3" />
                          </span>
                        );
                      }
                      return (
                        <span className="flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          Change
                        </span>
                      );
                    },
                  }}
                />
              </div>
              <div className="absolute top-2 left-2 bg-black/50 rounded-md p-1 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="h-7 w-7 p-1"
                  disabled={disabled}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={handleError}
                appearance={{
                  container: {
                    width: '100%',
                    height: '100%',
                  },
                  button: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    color: 'inherit',
                    padding: '1rem',
                  },
                }}
                disabled={disabled || isUploading}
                content={{
                  button({ ready, isUploading }: { ready: boolean, isUploading: boolean }) {
                    if (isUploading) {
                      return (
                        <span className="flex flex-col items-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent mb-2"></div>
                          <span className="text-white font-medium">Uploading...</span>
                        </span>
                      );
                    }
                    return (
                      <span className="flex flex-col items-center">
                        <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-2">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground font-medium">Click to select image</span>
                        <span className="text-muted-foreground/70 text-sm mt-1">Supports JPG, PNG, WEBP</span>
                      </span>
                    );
                  },
                }}
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {previewUrl && (
          <p className="text-xs text-muted-foreground break-all">
            Current: {previewUrl.split('/').pop()}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;