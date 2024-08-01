import axios from "axios";
import Link from "next/link";

interface NavItem {
    id: number;
    title: string;
    link: string;
    submenu?: NavItem[];
}

async function getData(): Promise<NavItem[]> {
    const requestUrl = `${process.env.VITE_STRAPI_API_URL}/api/setting?populate=deep`;
    const headers = {
        Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
    };

    try {
        const response = await axios.get(requestUrl, { headers });
        return response.data.data.attributes.nav;
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
                Home
            </Link>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <Link href={"/" + item.link}>
                            {item.title}
                        </Link>
                        {item.submenu && item.submenu.length > 0 && (
                            <ul>
                                {item.submenu.map((subItem) => (
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
