import React from "react";
import { events } from "@/public/data/events";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AuthGreeting = async () => {
  // const database = new Database();
  // console.log(await database.getEvents());

  return (
    <div className={"flex flex-col space-y-2"}>
      <div className={"flex w-full justify-between"}>
        <h2 className={"text-3xl"}>Events</h2>
        <Button size={"sm"} variant={"outline"}>
          <Link
            className={"flex text-sm items-center space-x-1"}
            href={"/admin/event/new"}
          >
            <span>
              <Plus size={20} />
            </span>
            <span>Add Event</span>
          </Link>
        </Button>
      </div>
      <ul className={"flex flex-col space-y-2"}>
        {events.map((event, index) => (
          <li key={index} className={"w-full p-2.5 bg-secondary rounded"}>
            <Link href={`/admin/event/edit/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthGreeting;
