"use client";
import { useState } from "react";
import { account, ID } from "@/appwrite/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const login = async (email, password) => {
    const session = await account.createEmailSession(email, password);

    await fetch("/api/auth", {
      body: JSON.stringify({ session }),
      method: "POST",
      "Content-Type": "application/json",
    });
  };

  const register = async () => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  };

  return (
    <main className={"px-36 py-10 flex flex-col items-center"}>
      <form className={"flex flex-col space-y-4 md:w-80 "}>
        <h1 className={"text-4xl font-semibold w-full"}>
          <span>Register </span>
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
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="button" onClick={register}>
          Register
        </Button>
      </form>
    </main>
  );
};

export default LoginPage;
