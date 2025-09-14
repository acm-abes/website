import Link from "next/link";
import NavigationSheet from "./NavigationSheet";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="fixed z-10 w-full">
      <nav className="flex justify-between p-4 px-8 md:px-16 lg:px-32">
        <Link href={"/"}>
          <h1 className="backdrop-blur-4xl flex w-fit items-center gap-2 rounded-full border bg-neutral-700/50 p-2 px-4 text-base font-medium">
            <Image src="/acm-logo.png" alt="ACM Logo" width={32} height={32} />
            ABES X ACM
          </h1>
        </Link>
        <nav>
          <NavigationSheet />
        </nav>
      </nav>
    </header>
  );
};

export default Navbar;
