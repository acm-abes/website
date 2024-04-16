import React from "react";
import Database from "@/appwrite/database";

const Page = async ({ params: { id } }) => {
  // const db = new Database();
  // const event = await db.getEventById(id);

  // console.log(event);
  return <main className="p-5 md:px-20 lg:px-36 space-y-5">{id}</main>;
};

export default Page;
