"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import HamBurger from "./HamBurger";

const NavBarNew = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const hamburgerRef = useRef<HTMLDivElement | null>(null);
  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
    if (hamburgerRef.current) {
      hamburgerRef.current.click();
    }
  };

  return (
    <>
      <header className="bottom-border">
        <section className="container border-r-l flex items-center justify-between py-2 px-[24px]">
          <Link href="/" className="text-lg font-bold">
            ACM X ABES
          </Link>
          <div className="flex items-center justify-between gap-4">
            <ul className="hidden md:flex md:items-center md:justify-between md:gap-4 md:p-2 text-[14px] font-medium">
              <li>
                <Link href={"/events"}>Events</Link>
              </li>
              <li>
                <Link href={"/team"}>Team</Link>
              </li>
              <li>
                <Link href={"/about"}>About Us</Link>
              </li>
            </ul>
            <HamBurger ham_ref={hamburgerRef} onToggle={toggleMobileNav} />
            <button className="nav_login_button">
              <p>Login</p>
            </button>
          </div>
        </section>
      </header>
      {showMobileNav ? (
        <div className="md:hidden w-full h-screen bg-[var(--background-color)] z-[999] absolute my-auto mx-0">
          <ul className="h-full flex flex-col items-center gap-4 px-8 pt-[60px] text-[20px] font-normal">
            <li>
              <Link href={"/events"} onClick={() => toggleMobileNav()}>
                Events
              </Link>
            </li>
            <li>
              <Link href={"/team"} onClick={() => toggleMobileNav()}>
                Team
              </Link>
            </li>
            <li>
              <Link href={"/about"} onClick={() => toggleMobileNav()}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default NavBarNew;
