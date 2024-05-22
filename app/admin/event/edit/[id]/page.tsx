import React, { Suspense } from "react";
import EditEventForm from "@/app/admin/event/edit/[id]/form";
import database from "@/appwrite/database";
import { notFound } from "next/navigation";

const EventEditPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const event = await database.events?.search(id);

  if (!event) {
    return notFound();
  }

  // @ts-ignore
  return (
    <Suspense>
      <EditEventForm {...event} />
    </Suspense>
  );
};

export default EventEditPage;
