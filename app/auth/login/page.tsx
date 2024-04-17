"use client";
import { useState } from "react";
import { account, ID } from "@/appwrite/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email: string, password: string) => {
    const session = await account.createEmailPasswordSession(email, password);

    const { labels, $id, name } = await account.get();

    await fetch("/api/auth", {
      body: JSON.stringify({ role: labels[0], session: $id, name }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // if (await account.get()) {
    //   router.push("/");
    // }
  };

  const logout = async () => {
    await fetch("/api/auth/logout");

    await account.deleteSession("current");
  };

  // account.get().then((user) => {
  //   if (user) {
  //     router.push("/");
  //   }
  // });

  return (
    <main className={"px-36 py-10 flex flex-col items-center"}>
      <form className={"flex flex-col space-y-4 md:w-80 "}>
        <h1 className={"text-4xl font-semibold w-full"}>
          <span>Login </span>{" "}
        </h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" onClick={() => login(email, password)}>
          Login
        </Button>
        <Button type="button" onClick={() => logout()}>
          LogOut
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
