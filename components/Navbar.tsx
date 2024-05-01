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
    name: "Blogs",
    href: "blogs",
  },
];

const Navbar = () => {
  return (
    <header className="bg-background/20 backdrop-blur-lg z-20 sticky top-0 h-16 md:h-20 flex items-center justify-between px-5 lg:px-36 w-full">
      <div>
        <Link href={"/"} className="flex items-center justify-center space-x-2">
          <Image
            src={"/images/abes-acm.png"}
            width={128}
            height={128}
            className="h-10 w-10"
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
