import React from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { navLinks } from "@/lib/navigation";
import Link from "next/link";

const NavigationSheet = () => {
  return (
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
        <ul className="mt-6 ml-10 flex flex-col space-y-5">
          {navLinks.map((link) => (
            <li key={link.name} className="duration-300 hover:translate-x-3">
              <SheetClose asChild>
                <Link href={link.path} className="text-2xl font-medium">
                  {link.name}
                </Link>
              </SheetClose>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
