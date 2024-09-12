import Link from "next/link";
import React from "react";
import * as Menubar from '@radix-ui/react-menubar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import {ChevronDownIcon, HamburgerMenuIcon, MobileIcon} from "@radix-ui/react-icons";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/component/Sheet";
import MobileMenu from "@/component/MobileMenu";
import DesktopMenu from "./DesktopMenu";

interface NavItem {
    id: number;
    title: string;
    link: string;
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

async function fetchNavigationData(): Promise<NavData> {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error("API URL or API Key is not defined");
    }

    const requestUrl = `${apiUrl}/api/setting?populate=deep`;
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(requestUrl, { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch navigation data');
        }
        const data = await response.json();
        return data.data.attributes;
    } catch (error) {
        console.error("Error fetching navigation data:", error);
        throw new Error("Failed to fetch navigation data");
    }
}
const Nav = async () => {
    const navData = await fetchNavigationData();
    return (
        <>
            {/* Desktop Navigation */}
            <DesktopMenu navData={navData} />
            {/* Mobile Navigation */}
            <nav className="md:hidden justify-between flex items-center gap-4 py-2">
                {/* Logo */}
                <Link href="/">
                    <img
                        width="25px"
                        alt="Logo"
                        src={process.env.NEXT_PUBLIC_STRAPI_API_URL + navData.logo.data?.attributes.url}
                    />
                </Link>
                <MobileMenu navData={navData} />
            </nav>
        </>
    );
};

export default Nav;
