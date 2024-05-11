import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NavItems = [
  {
    name: "Home",
    href: "/",
    alt: "Home",
  },
  {
    name: "Events",
    href: "events",
    alt: "Page under dev",
  },
  {
    name: "Team",
    href: "team",
  },
  {
    name: "About Us",
    href: "about",
  },
  {
    name: "Gallery",
    href: "gallery",
  },
];

const Navbar = () => {
  return (
    <header className="bg-background/20 backdrop-blur-sm z-40 sticky top-0 h-16 md:h-20 flex items-center justify-between px-5 lg:px-36 w-full">
      <div>
        <Link href={"/"} className="flex items-center justify-center space-x-2">
          <Image
            src={"/images/abes-acm.png"}
            width={256}
            height={256}
            className="h-14 w-14"
            alt={"ABES-ACM"}
          />
          <span>ABES-EC</span>
        </Link>
      </div>
      <nav>
        {/*<Sidebar icon={<Menu />} />*/}

        <ul className="hidden md:flex text-base space-x-5">
          {NavItems.map(({ href, name }, index) => (
            <li key={index} className="navbar-item">
              <Link href={"/" + href}>
                <div className="flex items-center justify-center">{name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
