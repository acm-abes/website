"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { updateUserProfile } from "@/actions/profile";
import { Loader2, Save, X, Plus, User, BookOpen, FileText } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

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
  const [activeSection, setActiveSection] = useState<"profile" | "blog" | "paper">("profile");
  
  // Profile states
  const [name, setName] = useState(user.name || "");
  const [imageUrl, setImageUrl] = useState(user.image || "");
  const [designation, setDesignation] = useState(user.designation || "");
  const [department, setDepartment] = useState(user.department || "");
  const [batch, setBatch] = useState(user.batch || "");
  const [bio, setBio] = useState(user.bio || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [github, setGithub] = useState(user.github || "");
  const [isLoading, setIsLoading] = useState(false);

  // Blog states
  const [blogTitle, setBlogTitle] = useState("");
  //const [blogSlug, setBlogSlug] = useState("");
  //const [blogTldr, setBlogTldr] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogReadTime, setBlogReadTime] = useState(5);
  const [blogPoster, setBlogPoster] = useState("");
  const [blogBanner, setBlogBanner] = useState("");
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogCategories, setBlogCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  // Research Paper states
  const [paperTitle, setPaperTitle] = useState("");
  const [paperAbstract, setPaperAbstract] = useState("");
  const [paperDoi, setPaperDoi] = useState("");
  const [paperPublishedAt, setPaperPublishedAt] = useState("");
  const [paperConference, setPaperConference] = useState("");
  const [paperAuthorIds, setPaperAuthorIds] = useState<string[]>([user.id]);
  const [authorIdInput, setAuthorIdInput] = useState("");

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

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const blogData = {
        //slug: blogSlug,
        title: blogTitle,
        //tldr: blogTldr,
        content: blogContent,
        readTime: blogReadTime,
        tags: blogTags,
        categories: blogCategories,
        poster: blogPoster,
        banner: blogBanner,
        authorId: user.id,
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([blogData]),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create blog");
      }

      const result = await response.json();
      toast.success("Blog created successfully!");
      router.push(`/blogs/${result.data[0].slug}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create blog");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const publishedAtDate = new Date(paperPublishedAt);
      if (isNaN(publishedAtDate.getTime())) {
        throw new Error("Invalid date format");
      }

      const paperData = {
        title: paperTitle,
        abstract: paperAbstract,
        doi: paperDoi || undefined,
        publishedAt: publishedAtDate.toISOString(),
        conference: paperConference || undefined,
        authorIds: paperAuthorIds,
      };

      const response = await fetch("/api/paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([paperData]),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create research paper");
      }

      const result = await response.json();
      toast.success("Research paper created successfully!");
      router.push(`/research/${result.data[0].id}`);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create research paper");
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !blogTags.includes(tagInput.trim())) {
      setBlogTags([...blogTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlogTags(blogTags.filter((tag) => tag !== tagToRemove));
  };

  const addCategory = () => {
    if (categoryInput.trim() && !blogCategories.includes(categoryInput.trim())) {
      setBlogCategories([...blogCategories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    setBlogCategories(blogCategories.filter((cat) => cat !== categoryToRemove));
  };

  const addAuthorId = () => {
    if (authorIdInput.trim() && !paperAuthorIds.includes(authorIdInput.trim())) {
      setPaperAuthorIds([...paperAuthorIds, authorIdInput.trim()]);
      setAuthorIdInput("");
    }
  };

  const removeAuthorId = (authorToRemove: string) => {
    if (paperAuthorIds.length > 1) {
      setPaperAuthorIds(paperAuthorIds.filter((id) => id !== authorToRemove));
    } else {
      toast.error("At least one author is required");
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Switcher */}
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        <Button
          type="button"
          variant={activeSection === "profile" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveSection("profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button
          type="button"
          variant={activeSection === "blog" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveSection("blog")}
        >
          <FileText className="mr-2 h-4 w-4" />
          Create Blog
        </Button>
        <Button
          type="button"
          variant={activeSection === "paper" ? "default" : "ghost"}
          className="flex-1"
          onClick={() => setActiveSection("paper")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Add Paper
        </Button>
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
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
      )}

      {/* Blog Section */}
      {activeSection === "blog" && (
        <form onSubmit={handleBlogSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-title">Title *</Label>
              <Input
                id="blog-title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Enter blog title"
                required
                maxLength={200}
              />
            </div>

            {/*<div className="space-y-2">
              <Label htmlFor="blog-slug">Slug *</Label>
              <Input
                id="blog-slug"
                value={blogSlug}
                onChange={(e) => setBlogSlug(e.target.value)}
                placeholder="blog-url-slug"
                required
                maxLength={100}
              />
              <p className="text-muted-foreground text-xs">URL-friendly version of the title</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-tldr">TL;DR *</Label>
              <Textarea
                id="blog-tldr"
                value={blogTldr}
                onChange={(e) => setBlogTldr(e.target.value)}
                placeholder="Short summary of the blog"
                required
                maxLength={500}
                rows={3}
              />
            </div>*/}

            <div className="space-y-2">
              <Label htmlFor="blog-content">Content (Markdown) *</Label>
              <Textarea
                id="blog-content"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                placeholder="Write your blog content in Markdown format..."
                required
                rows={12}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-read-time">Read Time (minutes) *</Label>
              <Input
                id="blog-read-time"
                type="number"
                value={blogReadTime}
                onChange={(e) => setBlogReadTime(parseInt(e.target.value) || 5)}
                min={1}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-poster">Poster Image URL *</Label>
              <Input
                id="blog-poster"
                value={blogPoster}
                onChange={(e) => setBlogPoster(e.target.value)}
                placeholder="https://example.com/poster.jpg"
                required
                type="url"
              />
              {blogPoster && (
                <div className="relative mt-2 aspect-video w-full max-w-xs overflow-hidden rounded-lg">
                  <Image src={blogPoster} alt="Poster preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-banner">Banner Image URL *</Label>
              <Input
                id="blog-banner"
                value={blogBanner}
                onChange={(e) => setBlogBanner(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                required
                type="url"
              />
              {blogBanner && (
                <div className="relative mt-2 aspect-video w-full max-w-xs overflow-hidden rounded-lg">
                  <Image src={blogBanner} alt="Banner preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={addTag} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="flex gap-2">
                <Input
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                  placeholder="Add a category"
                />
                <Button type="button" onClick={addCategory} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {blogCategories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Blog
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Research Paper Section */}
      {activeSection === "paper" && (
        <form onSubmit={handlePaperSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="paper-title">Title *</Label>
              <Input
                id="paper-title"
                value={paperTitle}
                onChange={(e) => setPaperTitle(e.target.value)}
                placeholder="Enter paper title"
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-abstract">Abstract *</Label>
              <Textarea
                id="paper-abstract"
                value={paperAbstract}
                onChange={(e) => setPaperAbstract(e.target.value)}
                placeholder="Enter the paper abstract"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-doi">DOI</Label>
              <Input
                id="paper-doi"
                value={paperDoi}
                onChange={(e) => setPaperDoi(e.target.value)}
                placeholder="10.1234/example.doi (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-published-at">Published Date *</Label>
              <Input
                id="paper-published-at"
                type="datetime-local"
                value={paperPublishedAt}
                onChange={(e) => setPaperPublishedAt(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paper-conference">Conference</Label>
              <Input
                id="paper-conference"
                value={paperConference}
                onChange={(e) => setPaperConference(e.target.value)}
                placeholder="Conference name (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label>Author IDs *</Label>
              <div className="flex gap-2">
                <Input
                  value={authorIdInput}
                  onChange={(e) => setAuthorIdInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAuthorId())}
                  placeholder="Enter user ID"
                />
                <Button type="button" onClick={addAuthorId} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">Add user IDs of all authors</p>
              <div className="space-y-2">
                {paperAuthorIds.map((authorId, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                    <span className="text-sm font-mono">{authorId}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAuthorId(authorId)}
                      disabled={paperAuthorIds.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Research Paper
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
