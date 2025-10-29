# ✅ UploadThing Setup Checklist

## Before You Start
- [ ] Sign up at [uploadthing.com](https://uploadthing.com)
- [ ] Create a new app in the dashboard
- [ ] Copy your App Token

## Installation (Already Done ✅)
- [x] Install `uploadthing` package
- [x] Install `@uploadthing/react` package
- [x] Create API routes (`src/app/api/uploadthing/`)
- [x] Create upload components (`src/components/ImageUpload.tsx`)
- [x] Create utility functions (`src/lib/upload-service.ts`)
- [x] Add UploadThing styles to `globals.css`
- [x] Update `.env.example`

## Your To-Do
- [ ] Add `UPLOADTHING_TOKEN=your_token_here` to `.env.local`
- [ ] Restart your development server
- [ ] Test upload on `/u/your-username/edit`
- [ ] Verify uploaded image appears correctly
- [ ] Check UploadThing dashboard for uploads

## Testing Steps
1. [ ] Navigate to edit profile page
2. [ ] Click "Upload an image" button
3. [ ] Select an image file (< 4MB)
4. [ ] Wait for upload to complete
5. [ ] See preview update with new image
6. [ ] Click "Save Changes"
7. [ ] Navigate to profile page
8. [ ] Verify image displays correctly

## Common Issues & Fixes

### Button doesn't appear
```bash
# Make sure token is in .env.local (not .env.example)
echo $env:UPLOADTHING_TOKEN  # Should show your token
npm run dev  # Restart server
```

### Upload fails with "Unauthorized"
- Check you're logged in
- Check NextAuth session is valid
- Try logging out and back in

### Image doesn't load after upload
- Check browser console for errors
- Verify URL in UploadThing dashboard
- Check network tab for failed requests

### TypeScript errors
```bash
# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

## Next Steps After Testing
- [ ] Read `UPLOAD_USAGE_EXAMPLES.md` for more use cases
- [ ] Consider using ImageUpload for:
  - [ ] Blog post covers
  - [ ] Event banners
  - [ ] Project thumbnails
  - [ ] Team member photos
  - [ ] Research paper images

## File Structure Reference
```
src/
├── app/
│   └── api/
│       └── uploadthing/
│           ├── core.ts       ✅ File router & auth
│           └── route.ts      ✅ API handlers
├── components/
│   ├── EditProfileForm.tsx   ✅ Updated with upload
│   ├── ImageUpload.tsx       ✅ Reusable upload UI
│   └── FilePreview.tsx       ✅ File info display
└── lib/
    ├── uploadthing.ts        ✅ Client helpers
    └── upload-service.ts     ✅ Utility functions
```

## Resources
- 📖 [Setup Guide](./UPLOADTHING_SETUP.md)
- 💡 [Usage Examples](./UPLOAD_USAGE_EXAMPLES.md)
- 📋 [Complete Summary](./UPLOADTHING_COMPLETE.md)
- 🌐 [UploadThing Docs](https://docs.uploadthing.com)
- 🎯 [Your Dashboard](https://uploadthing.com/dashboard)

---

**Current Status**: ✅ All code is ready! Just add your token and test.
