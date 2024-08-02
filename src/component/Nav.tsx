import Link from "next/link";
import React from "react";

export const revalidate = 1;
export const fetchCache = "force-no-store";

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
    const apiUrl = process.env.VITE_STRAPI_API_URL;
    const apiKey = process.env.VITE_STRAPI_API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error("API URL or API Key is not defined");
    }

    const requestUrl = `${apiUrl}/api/setting?populate=deep`;
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(requestUrl, { next: { revalidate: 1 }, headers });
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
        <nav>
            <Link href="/">
                <img
                    className=""
                    width="45px"
                    alt="Logo"
                    src={process.env.VITE_STRAPI_API_URL + navData.logo.data.attributes.url}
                />
                Home
            </Link>
            <ul>
                {navData.nav.map((navItem: NavItem) => (
                    <li key={navItem.id}>
                        <Link href={"/" + navItem.link}>
                            {navItem.title}
                        </Link>
                        {navItem.submenu && navItem.submenu.length > 0 && (
                            <ul>
                                {navItem.submenu.map((submenuItem: NavItem) => (
                                    <li key={submenuItem.id}>
                                        <Link href={"/" + submenuItem.link}>
                                            {submenuItem.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Nav;
