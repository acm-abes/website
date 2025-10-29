# UploadThing Integration Setup

This project uses UploadThing for secure, optimized image uploads.

## Setup Instructions

### 1. Get Your UploadThing Token

1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign in with your GitHub account
3. Create a new app or select an existing one
4. Copy your **App Token** from the dashboard

### 2. Add Environment Variable

Add the following to your `.env.local` file:

```env
UPLOADTHING_TOKEN=your_token_here
```

### 3. How It Works

#### File Structure

```
src/
├── app/
│   └── api/
│       └── uploadthing/
│           ├── core.ts       # UploadThing configuration & middleware
│           └── route.ts      # API route handlers (GET, POST)
├── components/
│   └── ImageUpload.tsx       # Reusable upload component
└── lib/
    └── uploadthing.ts        # Client-side helpers
```

#### Components Available

**ImageUpload** - Button-based upload with preview

```tsx
import { ImageUpload } from "@/components/ImageUpload";

<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  onRemove={() => setImageUrl("")}
  fallbackText="JD"
/>;
```

**ImageUploadDropzone** - Drag-and-drop upload with preview

```tsx
import { ImageUploadDropzone } from "@/components/ImageUpload";

<ImageUploadDropzone
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  onRemove={() => setImageUrl("")}
  fallbackText="JD"
/>;
```

### 4. Configuration

Edit `src/app/api/uploadthing/core.ts` to customize:

- **Max file size**: Currently set to 4MB
- **Max file count**: Currently set to 1 file
- **File types**: Currently accepts images only
- **Middleware**: Authentication check (requires login)

```typescript
imageUploader: f({
  image: {
    maxFileSize: "4MB", // Change this
    maxFileCount: 1, // Change this
  },
});
```

### 5. Authentication

Upload requires authentication. The middleware checks for:

- Valid session from NextAuth
- User must be logged in
- Returns userId in metadata

### 6. Usage Examples

#### Profile Image Upload (Current Implementation)

See: `src/components/EditProfileForm.tsx`

#### Future Use Cases

- Blog post cover images
- Project thumbnails
- Event banners
- Research paper images
- Team member photos

### 7. Features

✅ **Secure**: Authentication required  
✅ **Optimized**: Automatic image optimization  
✅ **Fast**: CDN delivery  
✅ **Type-safe**: Full TypeScript support  
✅ **Reusable**: Drop-in components  
✅ **Beautiful**: Integrated with Shadcn UI

### 8. Error Handling

The components handle:

- Upload failures (shows toast notification)
- File size limits (4MB max)
- Authentication errors
- Network issues

### 9. Styling

Upload components use your existing design system:

- Tailwind CSS classes
- Shadcn UI components (Avatar, Button)
- Dark mode support
- Responsive design

### 10. Testing

1. Start your dev server: `npm run dev`
2. Go to profile edit page: `/u/your-username/edit`
3. Click "Upload an image" or drag & drop
4. Check the uploaded image appears correctly
5. Save the profile

### 11. Troubleshooting

**Upload fails with "Unauthorized"**

- Make sure you're logged in
- Check your session is valid

**Upload button doesn't appear**

- Check UPLOADTHING_TOKEN is set in `.env.local`
- Restart your dev server after adding the token

**Image doesn't load after upload**

- Check the console for errors
- Verify the URL returned from UploadThing
- Check network tab for CORS issues

### 12. Additional Resources

- [UploadThing Docs](https://docs.uploadthing.com)
- [Next.js App Router Guide](https://docs.uploadthing.com/getting-started/appdir)
- [UploadThing Dashboard](https://uploadthing.com/dashboard)
