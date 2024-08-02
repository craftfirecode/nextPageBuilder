import Link from "next/link";
import React from "react";

export const revalidate = 1
export const fetchCache = "force-no-store"

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

async function getData(): Promise<NavData> {
    const requestUrl = `${process.env.VITE_STRAPI_API_URL}/api/setting?populate=deep`;
    const headers = {
        'Authorization': `Bearer ${process.env.VITE_STRAPI_API_KEY}`
    };

    try {
        const response = await fetch(requestUrl, {next: {revalidate: 1}, headers});
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
    const data = await getData();
    return (
        <nav>
            <Link href="/">
                <img className=""
                     width="45px"
                     alt=""
                     src={process.env.VITE_STRAPI_API_URL + data.logo.data.attributes.url}/>
                Home
            </Link>
            <ul>
                {data.nav.map((item: NavItem) => (
                    <li key={item.id}>
                        <Link href={"/" + item.link}>
                            {item.title}
                        </Link>
                        {item.submenu && item.submenu.length > 0 && (
                            <ul>
                                {item.submenu.map((subItem: NavItem) => (
                                    <li key={subItem.id}>
                                        <Link href={"/" + subItem.link}>
                                            {subItem.title}
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