"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { updateUserProfile } from "@/actions/profile";
import { Loader2, Save, X } from "lucide-react";
import { toast } from "sonner";

interface EditProfileFormProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    designation?: string | null;
    department?: string | null;
    batch?: string | null;
    bio?: string | null;
    linkedin?: string | null;
    github?: string | null;
  };
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");
  const [designation, setDesignation] = useState(user.designation || "");
  const [department, setDepartment] = useState(user.department || "");
  const [batch, setBatch] = useState(user.batch || "");
  const [bio, setBio] = useState(user.bio || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [github, setGithub] = useState(user.github || "");
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
        designation: designation.trim() || null,
        department: department.trim() || null,
        batch: batch.trim() || null,
        bio: bio.trim() || null,
        linkedin: linkedin.trim() || null,
        github: github.trim() || null,
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
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          onRemove={() => setImageUrl("")}
          disabled={isLoading}
          fallbackText={getInitials(name)}
        />
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
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

      {/* Professional Info Section */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">Professional Information</h3>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            type="text"
            placeholder="e.g., Student, Professor, Researcher"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            type="text"
            placeholder="e.g., Computer Science & Engineering"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="batch">Batch/Year</Label>
          <Input
            id="batch"
            type="text"
            placeholder="e.g., 2021-2025, Class of 2024"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            maxLength={50}
          />
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your interests, research areas, or anything you'd like to share..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={500}
          rows={4}
          className="resize-none"
        />
        <p className="text-muted-foreground text-xs">
          {bio.length}/500 characters
        </p>
      </div>

      {/* Social Links Section */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="font-semibold">Social Links</h3>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/username"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            type="url"
            placeholder="https://github.com/username"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
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
          <li>
            • Uploaded images are stored securely and optimized automatically
          </li>
          <li>• All fields except name are optional</li>
        </ul>
      </div>
    </form>
  );
}
