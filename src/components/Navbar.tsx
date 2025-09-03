import { Menu, XIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  return (
    <header className="fixed z-10 w-full">
      <nav className="flex justify-between p-4 px-8 md:px-16 lg:px-32">
        <h1 className="w-fit rounded-full border bg-neutral-700/50 p-2 px-4 text-base font-semibold backdrop-blur-2xl">
          ACM
        </h1>
        <nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                className="w-fit cursor-pointer rounded-full border bg-neutral-700/50 p-4 text-xl font-semibold backdrop-blur-2xl"
              >
                <Menu size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mr-5 flex items-end">
                <SheetTitle></SheetTitle>
                <SheetClose>
                  <XIcon />
                </SheetClose>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </nav>
    </header>
  );
};

export default Navbar;
