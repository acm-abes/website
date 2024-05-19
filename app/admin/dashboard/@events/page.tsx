import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import database from "@/appwrite/database";
import DeleteEventDialog from "@/app/admin/dashboard/@events/delete-event-dialog";
import { EventDocument } from "@/types";
const AuthGreeting = async () => {
  const { documents: fetchedEvents } =
    await database.events?.list<EventDocument>()!;

  // return <Loading />;

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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Name</TableHead>
            <TableHead className={"w-1/3"}>Date</TableHead>
            {/*<TableHead>Method</TableHead>*/}
            {/*<TableHead className="text-right">Amount</TableHead>*/}
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedEvents.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Link href={`/events/${item.id}`} className={"inherit"}>
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>{new Date(item.date).toDateString()}</TableCell>
              <TableCell className={"flex space-x-6 justify-end"}>
                <DeleteEventDialog item={item} />
                {/*</TableCell>*/}
                {/*<TableCell className={"flex justify-end"}>*/}

                <Link href={`/admin/event/edit/${item.id}`}>
                  <Edit size={"18"} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuthGreeting;
