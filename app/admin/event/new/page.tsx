"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Database from "@/appwrite/database";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TailSpin } from "react-loader-spinner";
import { CheckIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { z } from "zod";
import { EventSchema } from "@/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Bucket } from "@/appwrite/bucket";
import Image from "next/image";

const Page = () => {
  const db = new Database();
  const bucket = new Bucket();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      id: "",
      name: "",
      venue: "",
      date: "",
      description: "",
      logo: "",
      banners: [],
      prizes: "",
      sponsors: [],
    },
  });
  const onSubmit = (values: z.infer<typeof EventSchema>) => {
    // if (file) bucket.createItem(file).then((r) => setImage(r.$id));
  };

  const onImageUpload = () => {
    const reader = new FileReader();

    const logoInput = document.querySelector("#logo") as HTMLInputElement;
    const file = logoInput.files![0];

    if (!file) return;

    reader.onload = (e) => {
      // console.log(e.target!.result);
      setImage(e.target!.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeSelectedImage = () => {
    setImage("");
    const logoInput = document.querySelector("#logo") as HTMLInputElement;
    logoInput.files = null;
    // logoInput.value = "";
  };

  return (
    <main className="p-10 md:px-20 lg:px-36 space-y-5 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full sm:w-2/3"
        >
          <h1 className={"text-4xl font-semibold"}>Create a new Event</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the even name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => {
              console.log(field.onChange);

              return (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input
                      accept={"image/png, image/jpeg"}
                      type={"text"}
                      placeholder="Enter event venue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type={"date"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={"Describe the event, Markdown is supported"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Logo</FormLabel>
                {image && (
                  <div className={"relative group"}>
                    <Image
                      width={256}
                      height={256}
                      alt={"Logo preview"}
                      src={image}
                      id={"preview"}
                      className={"w-full"}
                    />
                    <Button
                      className={
                        "absolute duration-500 opacity-0 group-hover:opacity-100 top-0 -right-1 rounded-full"
                      }
                      size={"sm"}
                      variant={"link"}
                      title={"Remove logo"}
                      onClick={removeSelectedImage}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                )}
                <FormControl>
                  <Input
                    onInput={onImageUpload}
                    id={"logo"}
                    type={"file"}
                    className={"file-input"}
                    placeholder={"Add Event logo"}
                    accept=".jpg, .jpeg, .png"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className={`w-full space-x-1 flex items-center ${success && "bg-success text-success-foreground"}`}
            type="submit"
          >
            {loading && (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color={theme === "dark" ? "white" : "black"}
                ariaLabel="tail-spin-loading"
              />
            )}
            {success && <CheckIcon />}

            <span className={`${loading && "translate-x-2"} duration-200`}>
              Submit
            </span>
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Page;
