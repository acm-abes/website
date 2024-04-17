import React from "react";
import { Input } from "@/components/ui/input";

const Page = () => {
  return (
    <main className="p-10 md:px-20 lg:px-36 space-y-5">
      <form className={"w-full flex flex-col items-start space-y-10"}>
        <h1 className={"text-4xl"}>Create a new event</h1>

        <div className={"flex flex-col space-y-2"}>
          <label htmlFor={"name"} className={"text-xl"}>
            Name
          </label>
          <Input id={"name"} />
        </div>
        <div className={"flex flex-col space-y-2"}>
          <label htmlFor={"venue"} className={"text-xl"}>
            Venue
          </label>
          <Input id={"venue"} />
        </div>
      </form>
    </main>
  );
};

export default Page;
