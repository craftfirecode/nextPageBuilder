"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader, SheetPortal,
    SheetTitle,
    SheetTrigger
} from "@/component/Sheet";
import {ChevronDownIcon, HamburgerMenuIcon} from "@radix-ui/react-icons";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@radix-ui/react-accordion";
import Link from "next/link";
import React from "react";
import {set} from "immutable";

interface NavItem {
    id: number;
    title: string;
    link: string;
    submenu?: NavItem[];
    hidden?: boolean;
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


const MobileMenu = ({navData}:  any) => {

        const [open, setOpen] = React.useState(false);

        return (
            <Sheet open={open}>
                <SheetTrigger onClick={() => setOpen(true)}>
                    <HamburgerMenuIcon />
                </SheetTrigger>
                    <SheetContent onPointerDownOutside={() => setOpen(false)} className="pt-2">
                        <SheetHeader>
                            <SheetTitle>CRAFTFIRE</SheetTitle>
                            <SheetDescription>
                                <nav>
                                {navData.nav.map((navItem: NavItem) => (
                                    <div key={navItem.id} className="mb-3 ">
                                        {navItem.submenu && navItem.submenu.length > 0 ? (
                                            <Accordion type="single" collapsible className="">
                                                <AccordionItem key={navItem.id} value={`item-${navItem.id}`}>
                                                    <AccordionTrigger className="AccordionTrigger w-full justify-between flex items-center">
                                                        {navItem.title}
                                                        <ChevronDownIcon className="AccordionChevron" aria-hidden />
                                                    </AccordionTrigger>
                                                    <AccordionContent className="bg-stone-50">
                                                        {navItem.submenu?.map((submenuItem: NavItem, index: number) => (
                                                            <div className="py-3 px-2" key={index}>
                                                                <Link className="flex w-100" onClick={() => setOpen(false)} key={submenuItem.id} href={"/" + submenuItem.link}>
                                                                    {submenuItem.title}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        ) : (
                                            !navItem.hidden ? <Link className="flex w-100" onClick={() => setOpen(false)} href={"/" + navItem.link}>{navItem.title}</Link> : null
                                        )}
                                    </div>
                                ))}
                                </nav>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>

            </Sheet>
        )
}

export default MobileMenu;