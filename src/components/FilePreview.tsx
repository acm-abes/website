"use client";

import React from "react";
import { formatFileSize } from "@/lib/upload-service";
import { FileImage, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
  showSize?: boolean;
}

/**
 * Display file information before uploading
 */
export function FilePreview({
  file,
  onRemove,
  showSize = true,
}: FilePreviewProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  return (
    <div className="flex items-center gap-3 rounded-lg border p-3">
      {preview ? (
        <img
          src={preview}
          alt={file.name}
          className="h-12 w-12 rounded object-cover"
        />
      ) : (
        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
          <FileImage className="text-muted-foreground h-6 w-6" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        {showSize && (
          <p className="text-muted-foreground text-xs">
            {formatFileSize(file.size)}
          </p>
        )}
      </div>

      {onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

interface FileListProps {
  files: File[];
  onRemove?: (index: number) => void;
  showSize?: boolean;
}

/**
 * Display a list of files with previews
 */
export function FileList({ files, onRemove, showSize = true }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">
        {files.length} file{files.length !== 1 ? "s" : ""} selected
      </p>
      {files.map((file, index) => (
        <FilePreview
          key={`${file.name}-${index}`}
          file={file}
          onRemove={onRemove ? () => onRemove(index) : undefined}
          showSize={showSize}
        />
      ))}
    </div>
  );
}
