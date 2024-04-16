"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";
import { X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { NavItems } from "./Navbar";

const SideBarItem = ({ name, href }) => {
  return (
    <li>
      <Link href={"/" + href}>
        <SheetClose className="sidebar-item">
          <div className="flex items-center justify-center">{name}</div>
        </SheetClose>
      </Link>
    </li>
  );
};

const Sidebar = ({ icon }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">{icon}</SheetTrigger>
      <SheetContent className="space-y-5">
        <div className="flex justify-end">
          <SheetClose>
            <X />
          </SheetClose>
        </div>

        <div className="h-fit">
          <ul className="flex-col justify-center items-center space-y-5 px-5 text-2xl">
            {NavItems.map((navItem, index) => (
              <SideBarItem key={index} {...navItem} />
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
