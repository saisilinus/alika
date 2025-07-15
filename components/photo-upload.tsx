"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface PhotoUploadProps {
  onPhotoUpload: (photoUrl: string) => void;
  onPhotoSelect?: (photoUrl: string | null) => void;
  currentPhoto?: string | null;
}

export default function PhotoUpload({
  onPhotoUpload,
  onPhotoSelect,
  currentPhoto,
}: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onPhotoUpload(result);
        onPhotoSelect?.(result);
      };
      reader.readAsDataURL(file);

      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    onPhotoSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Upload Your Photo</h3>
            <p className="text-sm text-muted-foreground">
              Add your photo to personalize the banner
            </p>
          </div>

          {preview ? (
            <div className="relative">
              <div className="aspect-square w-full max-w-xs mx-auto rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemovePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="aspect-square w-full max-w-xs mx-auto rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={handleUploadClick}
            >
              <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 text-center">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleUploadClick}
              disabled={isUploading}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading
                ? "Uploading..."
                : preview
                ? "Change Photo"
                : "Upload Photo"}
            </Button>
            {preview && (
              <Button variant="outline" onClick={handleRemovePhoto}>
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
