import { account, ID } from "@/appwrite/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const register = async (
  email: string,
  password: string,
  name: string,
  router: AppRouterInstance,
) => {
  await account.create(ID.unique(), email, password, name);
  await login(email, password, router);
};

export const login = async (
  email: string,
  password: string,
  router: AppRouterInstance,
) => {
  const session = await account.createEmailPasswordSession(email, password);

  fetch("/api/auth", {
    body: JSON.stringify({ session }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (await account.get()) {
    router.push("/");
  }
};

export const logout = async () => {
  await fetch("/api/auth/logout");

  await account.deleteSession("current");
};
