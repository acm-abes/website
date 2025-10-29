"use client";

import React, { useState } from "react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  fallbackText?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  fallbackText = "U",
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4">
            <AvatarImage src={value || ""} alt="Profile preview" />
            <AvatarFallback className="text-3xl">{fallbackText}</AvatarFallback>
          </Avatar>
          {value && !disabled && onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Upload Button */}
      {!value && !disabled && (
        <div className="border-muted-foreground/25 hover:border-muted-foreground/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">Uploading...</p>
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setIsUploading(false);
                if (res && res[0]) {
                  onChange(res[0].url);
                  toast.success("Image uploaded successfully!");
                }
              }}
              onUploadError={(error: Error) => {
                setIsUploading(false);
                toast.error(`Upload failed: ${error.message}`);
              }}
              onUploadBegin={() => {
                setIsUploading(true);
              }}
              appearance={{
                button:
                  "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                container: "flex flex-col gap-2 items-center",
                allowedContent: "text-xs text-muted-foreground",
              }}
            />
          )}
        </div>
      )}

      {/* Info text */}
      <p className="text-muted-foreground text-center text-xs">
        {value
          ? "Click the × button to remove and upload a new image"
          : "Upload a profile picture (Max 4MB, JPG/PNG)"}
      </p>
    </div>
  );
}

// Alternative component using UploadDropzone for drag-and-drop
export function ImageUploadDropzone({
  value,
  onChange,
  onRemove,
  disabled,
  fallbackText = "U",
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4">
            <AvatarImage src={value || ""} alt="Profile preview" />
            <AvatarFallback className="text-3xl">{fallbackText}</AvatarFallback>
          </Avatar>
          {value && !disabled && onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Upload Dropzone */}
      {!value && !disabled && (
        <div className="w-full">
          {isUploading ? (
            <div className="border-muted-foreground/25 flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-12">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
              <p className="text-muted-foreground text-sm">Uploading...</p>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setIsUploading(false);
                if (res && res[0]) {
                  onChange(res[0].url);
                  toast.success("Image uploaded successfully!");
                }
              }}
              onUploadError={(error: Error) => {
                setIsUploading(false);
                toast.error(`Upload failed: ${error.message}`);
              }}
              onUploadBegin={() => {
                setIsUploading(true);
              }}
              appearance={{
                container:
                  "w-full border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors",
                uploadIcon: "text-muted-foreground",
                label: "text-primary hover:text-primary/80",
                allowedContent: "text-xs text-muted-foreground",
                button:
                  "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:bg-primary/50",
              }}
            />
          )}
        </div>
      )}

      {/* Info text */}
      <p className="text-muted-foreground text-center text-xs">
        {value
          ? "Click the × button to remove and upload a new image"
          : "Drag and drop or click to upload (Max 4MB, JPG/PNG)"}
      </p>
    </div>
  );
}
