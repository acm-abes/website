"use server";

import { dbConnect } from "@/database";

export async function register() {
  await dbConnect();
}
