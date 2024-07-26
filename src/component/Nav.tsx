import axios from "axios";
import Link from "next/link";

interface NavItem {
    id: number;
    title: string;
    link: string;
    submenu?: NavItem[];
}

async function getData(): Promise<NavItem[]> {
    const requestUrl = `https://headless.mapztour.de/api/setting?populate=deep`;
    const headers = {
        Authorization: 'Bearer ' + '795ae4f8716b1e03b49e9c137966829a711209f2c20226a2ee3db1ae5b04012b7e4017ee8795c470d5d599009a6dae824a71d580a50280a1733b6881db90a3dfdaeb833b033ff12c97173931ac5e540e4a52a0ed2bb26768eab70a233e5ee3c7dd6c095e9c9efbe5ed10012d884ea7f0cbfb94d4455358d25fe54274757b9e26',
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
                        <Link href={item.link}>
                            {item.title}
                        </Link>
                        {item.submenu && item.submenu.length > 0 && (
                            <ul>
                                {item.submenu.map((subItem) => (
                                    <li key={subItem.id}>
                                        <Link href={subItem.link}>
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
