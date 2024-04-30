"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/schemas/auth";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useTheme } from "next-themes";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    const res = await register(
      values.email,
      values.password,
      values.name,
      router,
    );

    if (res.$id) {
      setLoading(false);
    }
  };

  return (
    <main className={"md:px-36 px-4 py-10 flex flex-col items-center"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full sm:w-1/2 lg:w-1/3"
        >
          <h1 className={"text-4xl font-semibold"}>Register</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type={"email"}
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={"password"}
                    placeholder="Choose a strong password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            Already have an account?{" "}
            <Link href={"/auth/login"} className="text-blue-500">
              Login
            </Link>
          </FormDescription>
          <Button
            disabled={loading}
            className={`w-full flex items-center`}
            type="submit"
          >
            {loading && (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color={theme === "dark" ? "white" : "black"}
                ariaLabel="tail-spin-loading"
                wrapperStyle={{}}
                wrapperClass={``}
              />
            )}

            <span className={`${loading && "translate-x-2"} duration-200`}>
              Submit
            </span>
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;
