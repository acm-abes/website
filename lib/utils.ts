import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { account } from "@/appwrite/client";
import { format, parse, parseISO } from "date-fns";

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
    return user.labels.includes("admin");
  } catch (e) {
    return false;
  }
};

export const parseDate = (date: string) => {
  let parsedDate = parse(
    date,
    "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    new Date(),
  ).toString();

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d MMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d MMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date" || parsedDate === "Invalid Time") {
    parsedDate = parse(date, "d MMMM yyyy", new Date()).toString();
  }

  if (parsedDate === "Invalid Date") {
    parsedDate = parse(date, "d-MM-yyyy", new Date()).toString();
  }

  const final = format(parsedDate, "do MMM yyyy");

  return final;
};
