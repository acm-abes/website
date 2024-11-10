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

  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<Models.User<Models.Preferences>>;

  isAdmin: boolean;
}

export const AuthContext = createContext<ContextData | null>(null);

export const AuthProvider = ({ children }: Params) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      if (!user) {
        account
          .get()
          .then((res) => {
            setUser(res);
          })
          .catch((res) => res);
      }
    } catch (e) {
      console.log("user not found");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.labels.includes("admin"));

      fetch("/api/auth", {
        body: JSON.stringify({ session: user }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) console.log("verified");
        else console.log("not verified");
        res.json().then((data) => console.log(data));
      });
    }

    if (!user) setIsAdmin(false);
  }, [user]);

  const contextData = {
    user,
    loading,
    isAdmin,
    async login(
      email: string,
      password: string,
      router: AppRouterInstance,
      callbackURL: string = "/",
    ) {
      try {
        const session = await account.createEmailPasswordSession(
          email,
          password,
        );

        const res = await account.get();

        if (res) {
          setUser(res);
          setTimeout(() => router.push(callbackURL), 1000);
        }

        return session;
      } catch (error: any) {
        console.log({ ...error });
        //will catch this error where login fun is used
        throw error; //ise wha pakad lenege wha wha lol :)
      }
    },

    async logout() {
      await fetch("/api/auth/logout");
      await account.deleteSession("current");
      await fetch("/api/auth/logout");
      setUser(null);
    },

    async register(
      this: ContextData,
      email: string,
      password: string,
      name: string,
    ) {
      try {
        return await account.create(ID.unique(), email, password, name);
      } catch (error: any) {
        console.log({ ...error });
        //will catch this error where register fun is used
        throw error; //ise wha pakad lenege wha wha lol :)
      }
    },
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
