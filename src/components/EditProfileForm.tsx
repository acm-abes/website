"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserProfile } from "@/actions/profile";
import { Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface EditProfileFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateUserProfile(user.id, {
        name: name.trim(),
        image: imageUrl.trim(),
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        router.push(`/u/${user.email?.split("@")[0]}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/u/${user.email?.split("@")[0]}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Preview */}
      <div className="flex justify-center">
        <div className="text-center">
          <Avatar className="mx-auto mb-4 h-32 w-32 border-4">
            <AvatarImage src={imageUrl || ""} alt={name || "Preview"} />
            <AvatarFallback className="text-3xl">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground text-sm">Profile Preview</p>
        </div>
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
        />
        <p className="text-muted-foreground text-xs">
          This is your public display name.
        </p>
      </div>

      {/* Image URL Field */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Profile Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          placeholder="https://example.com/your-image.jpg"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <p className="text-muted-foreground text-xs">
          Enter a direct link to your profile picture. Leave empty to use your
          Google profile picture.
        </p>
      </div>

      {/* Email (Read-only) */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user.email || ""}
          disabled
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-muted-foreground text-xs">
          Your email cannot be changed.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>

      {/* Info Box */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="mb-2 font-semibold">Note:</h4>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li>• Changes will be visible across the entire website</li>
          <li>
            • Your email is linked to your Google account and cannot be changed
          </li>
          <li>• Use a direct image URL (ending in .jpg, .png, etc.)</li>
          <li>
            • Images from services like Imgur, Google Drive, or Cloudinary work
            well
          </li>
        </ul>
      </div>
    </form>
  );
}
