"use client";

import { cn } from "@/lib/utils";
import * as Menubar from "@radix-ui/react-menubar";
import Link from "next/link";
import React from "react";

interface NavItem {
  id: number;
  title: string;
  link: string;
  hidden?: boolean;
  submenu?: NavItem[];
}

interface NavData {
  logo: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  nav: NavItem[];
}

const DesktopMenu = ({ navData }: any) => {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-4 py-2 border-b">
        {/* Logo */}
        <Link href="/">
          <img
            width="30px"
            alt="Logo"
            src={
              process.env.NEXT_PUBLIC_STRAPI_API_URL +
              navData.logo.data?.attributes.url
            }
          />
        </Link>
        {/* Navigation Items */}
        {navData.nav.map((navItem: NavItem) => (
          <div key={navItem.id}>
            {navItem.submenu && navItem.submenu.length > 0 ? (
              <Menubar.Root>
                <Menubar.Menu>
                  <Menubar.Trigger
                    className={cn("navPill", "flex items-center gap-2")}
                  >
                    {navItem.title}
                  </Menubar.Trigger>
                  <Menubar.Portal>
                    <Menubar.Content
                      className="bg-white flex gap-5 flex-col shadow border rounded-xl p-4 min-w-[220px]"
                      align="start"
                      sideOffset={5}
                      alignOffset={-3}
                    >
                      {navItem.submenu.map((submenuItem: NavItem) => (
                        <Menubar.Item key={submenuItem.id} asChild>
                          <Link
                            className="flex w-100"
                            href={"/" + submenuItem.link}
                          >
                            {submenuItem.title}
                          </Link>
                        </Menubar.Item>
                      ))}
                    </Menubar.Content>
                  </Menubar.Portal>
                </Menubar.Menu>
              </Menubar.Root>
            ) : !navItem.hidden ? (
              <Link className="navPill" href={"/" + navItem.link}>
                {navItem.title}
              </Link>
            ) : null}
          </div>
        ))}
      </nav>
    </>
  );
};

export default DesktopMenu;
