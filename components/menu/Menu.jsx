"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./menu.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { logout } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import { isUserLoggedIn } from "@/lib/utils";

const menuLinks = [
  {
    path: "/",
    label: "HOME",
  },
  {
    path: "/events",
    label: "EVENTS",
  },
  {
    path: "/team",
    label: "TEAM",
  },
  {
    path: "/about",
    label: "ABOUT US",
  },
  {
    path: "/auth/login",
    label: "LOGIN",
  },
];
const Menu = () => {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef();
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    isUserLoggedIn().then((res) => {
      setLoggedIn(res);
    });
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", {
        y: 75,
      });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          tagger: 0.1,
          ease: "power4.inOut",
          delay: -0.75,
        });
    },
    { scope: container },
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu-container" ref={container}>
      <div className="menu-bar">
        <div className="menu-logo">
          <Link href={"/"}>
            <Image
              src={"/images/abes-acm.png"}
              width={128}
              height={128}
              className="h-10 w-10"
              alt={"ABES-ACM"}
            />
          </Link>
        </div>
        <div className="menu-open" onClick={toggleMenu}>
          <div>
            <GiHamburgerMenu className={"text-2xl cursor-pointer mr-5"} />
          </div>
        </div>
      </div>
      <div className="menu-overlay">
        <div className="menu-overlay-bar">
          <div className="menu-logo">
            <Link href={"/"}>ACM</Link>
          </div>
          <div className="menu-close" onClick={toggleMenu}>
            <div>
              <GrClose id={"close"} />
            </div>
          </div>
        </div>
        <div className="menu-close-icon" onClick={toggleMenu}>
          <p>&#x2715;</p>
        </div>
        <div className="menu-copy">
          <div className="menu-links">
            {menuLinks.map((link, index) => {
              return (
                <div className="menu-link-item" key={index}>
                  <div className="menu-link-item-holder" onClick={toggleMenu}>
                    <Link
                      onClick={
                        link.label !== "LOGIN"
                          ? () => {}
                          : loggedIn
                            ? async () => {
                                await logout();
                                setLoggedIn(false);
                                router.refresh();
                              }
                            : () => {}
                      }
                      href={
                        link.label !== "LOGIN"
                          ? link.path
                          : loggedIn
                            ? ""
                            : "/auth/login"
                      }
                      className="menu-link"
                    >
                      {link.label !== "LOGIN"
                        ? link.label
                        : loggedIn
                          ? "LOGOUT"
                          : "LOGIN"}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="menu-info">
            <div className="menu-info-col">
              <a href="#">X &#8599;</a>
              <a href="https://www.instagram.com/acm_abesec/">
                Instagram &#8599;
              </a>
              <a href="#">LinkedIn &#8599;</a>
              <a href="#">Facebook &#8599;</a>
            </div>
            <div className="menu-info-col">
              <p>acmwebsite.co.in</p>
              <p>987654321</p>
            </div>
          </div>
        </div>
        <div className="menu-preview">
          <a href="https://unstop.com/hackathons/acpc-2k24-abes-engineering-college-938945">
            Explore ACPC &#8599;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
