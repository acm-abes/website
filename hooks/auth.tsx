"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { account, ID } from "@/appwrite/client";
import { Models } from "appwrite";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Params {
  children: ReactNode;
}

interface ContextData {
  user: Models.User<Models.Preferences> | null;

  loading: boolean;

  login: (
    email: string,
    password: string,
    router: AppRouterInstance,
    callbackURL?: string,
  ) => Promise<Models.Session>;

  logout: () => Promise<void>;

  getLocalSession: (
    userInfo: Models.User<Models.Preferences>,
  ) => Promise<Response | undefined>;

  register: (
    email: string,
    password: string,
    name: string,
    router: AppRouterInstance,
  ) => Promise<Models.Session>;

  isAdmin: () => Promise<boolean>;
}

export const AuthContext = createContext<ContextData | null>(null);

export const AuthProvider = ({ children }: Params) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  useEffect(() => {
    setLoading(true);

    try {
      account.get().then((res) => {
        setUser(res);

        setLoading(false);
      });
    } catch (e) {
      console.log("user not found");
    }
  }, []);

  const contextData = {
    user,
    loading,
    async login(
      email: string,
      password: string,
      router: AppRouterInstance,
      callbackURL: string = "/",
    ) {
      const session = await account.createEmailPasswordSession(email, password);

      await this.getLocalSession();

      const res = await account.get();

      if (res) {
        setUser(res);
        setTimeout(() => router.push(callbackURL), 1000);
      }

      return session;
    },

    async logout() {
      await fetch("/api/auth/logout");

      await account.deleteSession("current");
    },

    async register(
      this: ContextData,
      email: string,
      password: string,
      name: string,
      router: AppRouterInstance,
    ) {
      await account.create(ID.unique(), email, password, name);
      return this.login(email, password, router);
    },

    async getLocalSession() {
      const response = await fetch("/api/auth", {
        body: JSON.stringify({ session: this.user }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return response;
      }
    },

    async isAdmin() {
      if (!user) return false;

      if (user.labels.includes("admin")) {
        return true;
      }

      return false;
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
