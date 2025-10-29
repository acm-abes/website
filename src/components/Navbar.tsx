import Link from "next/link";
import NavigationSheet from "./NavigationSheet";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { UserAvatar } from "./UserAvatar";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed z-20 w-full">
      <nav className="flex justify-between p-4 px-8 md:px-16 lg:px-32">
        <Link href={"/"}>
          <div className="flex w-fit items-center gap-2 rounded-full border bg-neutral-700/50 p-2 px-4 text-base font-medium backdrop-blur-xs">
            <Image src="/acm-logo.png" alt="ACM Logo" width={32} height={32} />
            ABES X ACM
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {/* Desktop Auth UI */}
          <div className="hidden md:block">
            {session?.user ? (
              <UserAvatar user={session.user} />
            ) : (
              <Link href="/auth">
                <Button
                  variant="ghost"
                  className="rounded-full border bg-neutral-700/50 backdrop-blur-2xl"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
          <nav>
            <NavigationSheet user={session?.user} />
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
