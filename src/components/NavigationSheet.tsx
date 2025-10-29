"use client";

import React from "react";
import { LogIn, LogOut, Menu, User, XIcon } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut } from "next-auth/react";

interface NavigationSheetProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

const NavigationSheet = ({ user }: NavigationSheetProps) => {
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

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

        {/* User Info Section */}
        {user && (
          <div className="mt-6 ml-10 flex items-center gap-3 border-b pb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        )}

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

          {/* Auth Actions */}
          {user ? (
            <>
              <li className="duration-300 hover:translate-x-3">
                <SheetClose asChild>
                  <Link
                    href={`/u/${user.email?.split("@")[0]}`}
                    className="flex items-center gap-2 text-2xl font-medium"
                  >
                    <User className="h-6 w-6" />
                    Profile
                  </Link>
                </SheetClose>
              </li>
              <li className="duration-300 hover:translate-x-3">
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="flex items-center gap-2 text-2xl font-medium text-red-600"
                >
                  <LogOut className="h-6 w-6" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="duration-300 hover:translate-x-3">
              <SheetClose asChild>
                <Link
                  href="/auth"
                  className="flex items-center gap-2 text-2xl font-medium"
                >
                  <LogIn className="h-6 w-6" />
                  Login
                </Link>
              </SheetClose>
            </li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
