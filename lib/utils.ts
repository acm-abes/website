import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { account } from "@/appwrite/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getRandomGradient = (arr: string[]) => {
  return Math.floor(Math.random() * arr.length);
};

// Client only
export const isUserLoggedIn = async () => {
  try {
    await account.get();
    return true;
  } catch (e) {
    return false;
  }
};

export const isAdmin = async () => {
  try {
    const user = await account.get();
    console.log(user);
    return user.labels.includes("admin");
  } catch (e) {
    return false;
  }
};
