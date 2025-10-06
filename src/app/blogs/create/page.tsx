"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSingleBlogSchema } from "@/schemas/CreateBlogSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBlog } from "@/actions/blogs";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

import { type CreateBlogInput } from "@/schemas/CreateBlogSchema";
type BlogFormData = CreateBlogInput;

export default function CreateBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [tags, setTags] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [categoryInput, setCategoryInput] = React.useState("");

  // If not authenticated, redirect to auth page
  React.useEffect(() => {
    if (!session?.user) {
      router.push("/auth");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(CreateSingleBlogSchema),
    defaultValues: {
      type: "BLOG",
      authorId: session?.user?.id || "",
    },
  });

  // Update authorId when session is available
  React.useEffect(() => {
    if (session?.user?.id) {
      setValue("authorId", session.user.id);
    }
  }, [session, setValue]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput && !tags.includes(tagInput)) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (categoryInput && !categories.includes(categoryInput)) {
        setCategories([...categories, categoryInput]);
        setCategoryInput("");
      }
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const onSubmit = async (formData: BlogFormData) => {
    // Early return if no user session
    if (!session?.user?.id) {
      toast.error("You must be logged in to create a blog");
      router.push("/auth");
      return;
    }

    try {
      // Parse tags and categories from state
      const data = {
        ...formData,
        tags,
        categories,
        readTime: Number(formData.readTime),
        authorId: session.user.id,
      };

      const result = await createBlog(data);
      if (result) {
        toast.success("Blog created successfully!");
        reset();
        setTags([]);
        setCategories([]);
        router.push("/blogs");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create blog");
    }
  };

  if (!session?.user) {
    return null; // Return nothing while redirecting
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              {...register("title")}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="block text-sm font-medium">
              Slug
            </label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="your-blog-post-url"
            />
            {errors.slug && (
              <p className="text-destructive text-sm">{errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="tldr" className="block text-sm font-medium">
              TL;DR (Brief Summary)
            </label>
            <Textarea
              id="tldr"
              {...register("tldr")}
              placeholder="Write a brief summary of your blog"
              className="min-h-[100px]"
            />
            {errors.tldr && (
              <p className="text-destructive text-sm">{errors.tldr.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium">
                Content (Markdown)
              </label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Write your blog content in Markdown format"
                className="font-mono min-h-[400px]"
              />
              {errors.content && (
                <p className="text-destructive text-sm">{errors.content.message}</p>
              )}
            </div>
            
            {/* Markdown Preview */}
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Preview</h3>
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {watch("content") || "*No content yet*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="tags" className="block text-sm font-medium">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Press Enter to add tags"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="categories" className="block text-sm font-medium">
                Categories
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveCategory(category)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                id="categories"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={handleAddCategory}
                placeholder="Press Enter to add categories"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="readTime" className="block text-sm font-medium">
              Read Time (minutes)
            </label>
            <Input
              id="readTime"
              type="number"
              {...register("readTime", { valueAsNumber: true })}
              placeholder="Estimated read time"
            />
            {errors.readTime && (
              <p className="text-destructive text-sm">{errors.readTime.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="poster" className="block text-sm font-medium">
                Poster Image URL
              </label>
              <Input
                id="poster"
                {...register("poster")}
                placeholder="URL for the blog card image"
              />
              {errors.poster && (
                <p className="text-destructive text-sm">{errors.poster.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="banner" className="block text-sm font-medium">
                Banner Image URL
              </label>
              <Input
                id="banner"
                {...register("banner")}
                placeholder="URL for the blog header banner"
              />
              {errors.banner && (
                <p className="text-destructive text-sm">{errors.banner.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium">
              Content Type
            </label>
            <Select 
              defaultValue="BLOG" 
              onValueChange={(value) => setValue("type", value as BlogFormData["type"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BLOG">Blog</SelectItem>
                <SelectItem value="RESEARCH_PAPER">Research Paper</SelectItem>
                <SelectItem value="PROJECT">Project</SelectItem>
                <SelectItem value="EVENT">Event</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-destructive text-sm">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="relatedTo" className="block text-sm font-medium">
              Related Content
            </label>
            <Input
              id="relatedTo"
              {...register("relatedTo")}
              placeholder="Link to related content (optional)"
            />
            {errors.relatedTo && (
              <p className="text-destructive text-sm">{errors.relatedTo.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/blogs")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
