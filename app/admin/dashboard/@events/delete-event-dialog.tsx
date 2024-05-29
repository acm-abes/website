"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { EventDocument } from "@/types";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import database from "@/appwrite/database";
import { revalidateEvents } from "@/actions/revalidate";
import { Bucket } from "@/appwrite/bucket";

interface DeleteEventDialogProps {
  item: EventDocument;
}

const DeleteEventDialog = ({ item }: DeleteEventDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeleteEvent = async (id: string) => {
    try {
      setLoading(true);

      const bucket = new Bucket();

      const event = await database.events?.search(id);

      if (!event) return "Event not found";

      const deleteEventData = database.events?.delete(id);
      const deleteEventLogo = bucket.deleteItem(event.logo);

      const res = await Promise.all([deleteEventData, deleteEventLogo]);

      if (res) {
        setDeleted(true);
        setLoading(false);
        await revalidateEvents();
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={"text-red-600 p-0 h-fit"}>
        {/*<Button variant={"ghost"} className={"text-red-600 p-0 h-fit"}>*/}
        <AiOutlineDelete className={"text-xl"} />
        {/*</Button>*/}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {deleted ? (
              <p>Event Successfully Deleted</p>
            ) : (
              <p>Do you want to delete the event?</p>
            )}
          </DialogTitle>
          <DialogDescription>
            <div className={"flex flex-col space-y-4"}>
              {deleted ? (
                <div
                  className={
                    "w-full h-fit flex flex-col space-y-2 items-center"
                  }
                >
                  <IoCheckmarkDoneCircleOutline
                    className={"text-2xl"}
                    size={180}
                  />
                  <p>
                    Event <strong>{item.name}</strong> has been successfully
                    deleted
                  </p>
                  <DialogTrigger
                    disabled={loading}
                    className={
                      "w-full bg-primary text-primary-foreground h-10 rounded-md"
                    }
                  >
                    Exit
                  </DialogTrigger>
                </div>
              ) : (
                <>
                  <p>
                    This action cannot be undone. This will permanently delete
                    the selected event and remove the data from our servers.
                  </p>
                  <div>
                    <span>
                      Selected Event: <strong>{item.name}</strong>
                    </span>
                  </div>
                  <div className={"w-full flex space-x-2"}>
                    <DialogTrigger
                      disabled={loading}
                      className={"w-full bg-secondary rounded-md"}
                    >
                      No
                    </DialogTrigger>
                    <Button
                      disabled={loading}
                      onClick={() => handleDeleteEvent(item.$id)}
                      variant={"destructive"}
                      className={"w-full"}
                    >
                      Yes
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
