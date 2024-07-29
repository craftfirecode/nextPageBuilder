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
        Authorization: 'Bearer ' + 'e7507a1e52eee31759033b3a3b9e6c51a6be94d5dc2bfe208b27f1c2100cf475c4f534fdad57ae4ecc60a9feae9ed49a4d12a8309cf56a5ba59d1b4c39540425f89d4cb3ce7302cc4994179163ae37dfb8e2a6279a8341203901bc63536e972f8e2a53dad756e71e7b11b442568df756bce8a53da3a22b1602df0909d96c117a',
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
