# Using the Upload Service in Your Components

## Quick Start Examples

### 1. Simple Image Upload (like EditProfileForm)

```tsx
"use client";

import { ImageUpload } from "@/components/ImageUpload";
import { useState } from "react";

export function MyComponent() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      onRemove={() => setImageUrl("")}
      fallbackText="AB"
    />
  );
}
```

### 2. Drag & Drop Upload

```tsx
import { ImageUploadDropzone } from "@/components/ImageUpload";

export function MyComponent() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ImageUploadDropzone
      value={imageUrl}
      onChange={setImageUrl}
      onRemove={() => setImageUrl("")}
      fallbackText="AB"
    />
  );
}
```

### 3. Custom Upload with Progress

```tsx
"use client";

import { uploadImage } from "@/lib/upload-service";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export function CustomUpload() {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await uploadImage(file, (p) => setProgress(p));
    if (uploadedUrl) {
      setUrl(uploadedUrl);
    }
  };

  return (
    <div>
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      {progress > 0 && progress < 100 && (
        <Progress value={progress} className="mt-2" />
      )}
      {url && <img src={url} alt="Uploaded" className="mt-4" />}
    </div>
  );
}
```

### 4. Multiple Image Upload

```tsx
"use client";

import { uploadMultipleImages } from "@/lib/upload-service";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MultipleUpload() {
  const [urls, setUrls] = useState<string[]>([]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const uploadedUrls = await uploadMultipleImages(files);
    setUrls(uploadedUrls);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesChange}
      />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {urls.map((url, i) => (
          <img key={i} src={url} alt={`Upload ${i}`} className="rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

### 5. With Image Validation

```tsx
"use client";

import { uploadImage, validateImageDimensions } from "@/lib/upload-service";
import { toast } from "sonner";

export function ValidatedUpload() {
  const handleUpload = async (file: File) => {
    // Validate dimensions before upload
    const isValid = await validateImageDimensions(file, 1920, 1080);
    if (!isValid) return;

    // Upload the validated file
    const url = await uploadImage(file);
    if (url) {
      toast.success("Image uploaded successfully!");
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }}
    />
  );
}
```

### 6. Blog Post Cover Image

```tsx
"use client";

import { ImageUploadDropzone } from "@/components/ImageUpload";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function BlogCoverUpload() {
  const [coverImage, setCoverImage] = useState("");

  return (
    <div className="space-y-2">
      <Label>Blog Cover Image</Label>
      <ImageUploadDropzone
        value={coverImage}
        onChange={setCoverImage}
        onRemove={() => setCoverImage("")}
        fallbackText="📝"
      />
    </div>
  );
}
```

### 7. Project Thumbnail

```tsx
"use client";

import { ImageUpload } from "@/components/ImageUpload";
import { useState } from "react";

export function ProjectForm() {
  const [thumbnail, setThumbnail] = useState("");

  return (
    <div>
      <h3>Project Thumbnail</h3>
      <ImageUpload
        value={thumbnail}
        onChange={setThumbnail}
        onRemove={() => setThumbnail("")}
        fallbackText="🚀"
        className="max-w-md"
      />
    </div>
  );
}
```

## Adding New Upload Types

To support different file types (PDFs, videos, etc.), edit `src/app/api/uploadthing/core.ts`:

```typescript
export const ourFileRouter = {
  // Existing image uploader
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // New PDF uploader
  pdfUploader: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // New video uploader
  videoUploader: f({ video: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;
```

Then update `src/lib/uploadthing.ts` and use the new endpoint:

```tsx
<UploadButton endpoint="pdfUploader" />
```

## Common Use Cases

### Event Banner

```tsx
<ImageUploadDropzone value={banner} onChange={setBanner} fallbackText="🎉" />
```

### Team Member Photo

```tsx
<ImageUpload value={photo} onChange={setPhoto} fallbackText="👤" />
```

### Research Paper Thumbnail

```tsx
<ImageUpload value={paperImg} onChange={setPaperImg} fallbackText="📄" />
```

### Blog Post Images (Multiple)

```tsx
const [images, setImages] = useState<string[]>([]);

// Use uploadMultipleImages from upload-service.ts
const handleUpload = async (files: File[]) => {
  const urls = await uploadMultipleImages(files);
  setImages(urls);
};
```
