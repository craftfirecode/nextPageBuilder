import axios from "axios";
import Link from "next/link";

interface NavItem {
    id: number;
    title: string;
    link: string;
    submenu?: NavItem[];
}

async function getData(): Promise<NavItem[]> {
    const requestUrl = `http://localhost:1337/api/setting?populate=deep`;
    const headers = {
        Authorization: 'Bearer ' + 'a313688db4b5cdf8c736f117aeb3d6e33c9516f375d6748e0001e28e9cbd6d054aafcb0f44058d6d48c77e2931a89252e888b4061c8ac8445559bc3abc4ef860d319379ce3eac4e8e6ed9e051ffa28bf15cbf6b7556658cd78d7e94f16ce161e557be4957536f209a30dd24d977ef128bf7f89d88a9fed100b54f16a929e8c45',
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
