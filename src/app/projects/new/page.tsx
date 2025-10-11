"use client";
import { CreateProjectSchema, type CreateProjectInput } from "@/schemas/CreateProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createProject } from "@/actions/projects";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      techStack: [],
      images: [],
    },
  });

  const techStack = watch("techStack");
  const images = watch("images");

  const onSubmit = async (data: CreateProjectInput) => {
    setLoading(true);
    try {
      await createProject(data);
      router.push("/projects");
    } catch (e) {
      // handle error, e.g. toast
    } finally {
      setLoading(false);
    }
  };

  // Simple chips input for tech stack
  const handleTechStackKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setValue("techStack", [...techStack, e.currentTarget.value]);
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  // Simple chips input for images
  const handleImagesKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      setValue("images", [...images, e.currentTarget.value]);
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input placeholder="Title" {...register("title")}/>
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>
        <div>
          <Textarea placeholder="Description" {...register("description")}/>
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>
        <div>
          <Input placeholder="Project Link" {...register("link")}/>
          {errors.link && <p className="text-red-500 text-xs">{errors.link.message}</p>}
        </div>
        <div>
          <Input placeholder="Repository Link" {...register("repo")}/>
          {errors.repo && <p className="text-red-500 text-xs">{errors.repo.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Tech Stack</label>
          <Input placeholder="Add tech and press Enter" onKeyDown={handleTechStackKeyDown}/>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStack.map((tech, idx) => (
              <Badge key={idx}>{tech}</Badge>
            ))}
          </div>
          {errors.techStack && <p className="text-red-500 text-xs">{errors.techStack.message as string}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Images</label>
          <Input placeholder="Add image URL and press Enter" onKeyDown={handleImagesKeyDown}/>
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, idx) => (
              <Badge key={idx}>{img}</Badge>
            ))}
          </div>
          {errors.images && <p className="text-red-500 text-xs">{errors.images.message as string}</p>}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </div>
  );
}
