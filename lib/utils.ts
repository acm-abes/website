import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { account } from "@/appwrite/client";
import { format, parse } from "date-fns";

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
  let parsedDate = parse(date, "d-M-yyyy", new Date()).toString();

  parsedDate === "Invalid Date" &&
    (parsedDate = parse(date, "d MMM yyyy", new Date()).toString());

  parsedDate === "Invalid Date" &&
    (parsedDate = parse(
      date,
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      new Date(),
    ).toString());

  parsedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx").toString();

  (parsedDate = format(parsedDate, "do MMMM yyyy")).toString();

  return parsedDate;
};
