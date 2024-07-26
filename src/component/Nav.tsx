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
        Authorization: 'Bearer ' + 'a10b082a4512eec295fccf53441c2d46e144ad735377a1724093aef47b43e4d23e9207ce031776f6f27d82625ecd6c2f9840d15d4b4b51a78eb263d8bbeaddff6bf74b3dd4b6c6f171ab1f04b22ff1d54c687b2091a545f5a615c632c1925823c8379dfe1cbf651dc1b6d944095f44af6ef4c227f7a162b1baa3bb3309785154',
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
