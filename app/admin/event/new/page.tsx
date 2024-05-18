"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { database } from "@/appwrite/database";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { AppwriteException, ID } from "appwrite";
import DatePicker from "@/components/datepicker";
import { revalidateEvents } from "@/actions/revalidate";

const Page = () => {
  const bucket = new Bucket();
  const { theme } = useTheme();

  const router = useRouter();

  const [banners, setBanners] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);

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

  const debugSubmit = async (values: z.infer<typeof EventSchema>) => {
    console.log(values);
  };

  const onSubmit = async (values: z.infer<typeof EventSchema>) => {
    setLoading(true);

    const id = values.name.trim().split(" ").join("-").toLowerCase();

    const logoInput = document.querySelector("#logo") as HTMLInputElement;
    const bannerInput = document.querySelector("#banners") as HTMLInputElement;

    const file = logoInput.files![0];
    const bannerFiles = Array.from(bannerInput.files!);

    try {
      const eventImage = await bucket.createItem(file, id);

      const eventImageURL = bucket.getItem(id);

      const bannerImages = await Promise.all(
        bannerFiles.map(async (banner) => {
          const res = await bucket.createItem(banner, ID.unique());
          return bucket.getItem(res.$id).toString();
        }),
      );

      const eventData = {
        ...values,
        id,
        logo: eventImageURL.toString(),
        banners: bannerImages,
      };

      const res = await database.events.create(eventData, id);

      if (res?.$id) {
        await revalidateEvents();
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof AppwriteException) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }
  };

  const onLogoUpload = () => {
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

  const onBannerUpload = () => {
    const reader = new FileReader();

    const bannerInput = document.querySelector("#banners") as HTMLInputElement;
    const files = Array.from(bannerInput.files!);

    if (!files.length) return;

    files.forEach((file) => {
      reader.onload = (e) => {
        // console.log(e.target!.result);
        setBanners((prev) => [...prev, e.target!.result as string]);
      };

      reader.readAsDataURL(file);
    });
  };

  const removeSelectedImage = () => {
    setImage("");
    const logoInput = document.querySelector("#logo") as HTMLInputElement;
    logoInput.files = null;
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
              return (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input type={"text"} placeholder="Enter event venue" />
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
                  {/*<Input type={"date"} {...field} />*/}
                  <div>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </div>
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
                      className={"max-h-96 w-fit"}
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
                    onInput={onLogoUpload}
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
          <FormField
            control={form.control}
            name="banners"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Banners</FormLabel>
                {image && (
                  <div className={"relative group flex flex-col space-y-1"}>
                    {banners &&
                      banners
                        .filter((file) => file !== "")
                        .map((banner) => (
                          <Image
                            width={1654}
                            height={480}
                            alt={"Banner preview"}
                            src={banner}
                            id={"banner_preview"}
                            className={"lg:w-1/2"}
                          />
                        ))}
                  </div>
                )}
                <FormControl>
                  <Input
                    onInput={onBannerUpload}
                    id={"banners"}
                    type={"file"}
                    className={"file-input"}
                    placeholder={"Add Event Banners"}
                    accept=".jpg, .jpeg, .png"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sponsors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sponsors</FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    placeholder={"Mention Your Sponsors (comma seperated)"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prizes</FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    placeholder={"Mention the prizes"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={error ? "destructive" : "default"}
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
