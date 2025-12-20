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

      {/* Preview area */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative w-32 h-32 border border-border rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="h-10 w-10 text-muted-foreground opacity-50" />
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap gap-2">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleError}
              appearance={{
                button: {
                  backgroundColor: disabled ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  borderRadius: '0.375rem',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                },
                container: {
                  marginTop: '0.5rem',
                },
              }}
              disabled={disabled || isUploading}
              content={{
                button({ ready, isUploading }: { ready: boolean, isUploading: boolean }) {
                  if (isUploading) {
                    return (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Uploading...
                      </span>
                    );
                  }
                  return (
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {ready ? 'Select Image' : 'Preparing...'}
                    </span>
                  );
                },
              }}
            />

            {previewUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="flex items-center gap-2"
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
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
    </div>
  );
};

export default ImageUpload;