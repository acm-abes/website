import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

/**
 * Optimized Image component with loading states and error handling
 * Automatically handles large images with blur placeholder and lazy loading
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  showSkeleton = true,
  className = "",
  quality = 75,
  loading = "lazy",
  placeholder = "blur",
  blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className="relative h-full w-full">
      {showSkeleton && isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        quality={quality}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={handleLoadingComplete}
        onError={handleError}
      />
      {error && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
