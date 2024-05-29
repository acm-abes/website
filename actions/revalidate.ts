"use server";

import { revalidatePath } from "next/cache";

export const revalidate = async (path: string) => {
  revalidatePath(path);
};

export const revalidateEvents = async (event?: string) => {
  await revalidate(`/events${event ? "/" + event : ""}`);
};
