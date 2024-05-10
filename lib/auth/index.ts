import { account, ID } from "@/appwrite/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Models } from "appwrite";

export const register = async (
  email: string,
  password: string,
  name: string,
  router: AppRouterInstance,
) => {
  const aw = await account.create(ID.unique(), email, password, name);
  return await login(email, password, router);
};

export const getLocalSession = async (
  userInfo: Models.User<Models.Preferences>,
) => {
  const response = await fetch("/api/auth", {
    body: JSON.stringify({ session: userInfo }),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return response;
  }
};

export const login = async (
  email: string,
  password: string,
  router: AppRouterInstance,
) => {
  const session = await account.createEmailPasswordSession(email, password);
  const userInfo = await account.get();

  await getLocalSession(userInfo);
  if (await account.get()) {
    router.push("/");
  }

  return session;
};

export const logout = async () => {
  await fetch("/api/auth/logout");

  await account.deleteSession("current");
};
