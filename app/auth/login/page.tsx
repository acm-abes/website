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
import { LoginSchema } from "@/schemas/auth";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await login(values.email, values.password, router);
  };

  return (
    <>
      <head>
        <title>LOGIN | ABES ACM</title>
        {/*<meta name={"description"} content={"Login to your account"} />*/}
      </head>

      <main className={"md:px-36 px-4 py-10 flex flex-col items-center"}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full sm:w-1/2 lg:w-1/3"
          >
            <h1 className={"text-4xl font-semibold"}>Login</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription>
              Don't have an account?{" "}
              <Link href={"/auth/register"} className="text-blue-500">
                Register
              </Link>
            </FormDescription>
            <Button className={"w-full"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
};

export default LoginPage;
