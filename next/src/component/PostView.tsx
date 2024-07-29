import axios from "axios";
import Link from "next/link";
import {CnButton} from "@/component/shadcn/CnButton";
import {ArrowRightIcon} from "@radix-ui/react-icons";

type PostViewProps = {
    cms: any;
}

async function getData(filterName: string) {
    const headers = {
        Authorization: 'Bearer ' + 'a313688db4b5cdf8c736f117aeb3d6e33c9516f375d6748e0001e28e9cbd6d054aafcb0f44058d6d48c77e2931a89252e888b4061c8ac8445559bc3abc4ef860d319379ce3eac4e8e6ed9e051ffa28bf15cbf6b7556658cd78d7e94f16ce161e557be4957536f209a30dd24d977ef128bf7f89d88a9fed100b54f16a929e8c45',
    };
    try {
        const requestUrlNav = `http://localhost:1337/api/posts?populate=deep&filters[category][category][categoryList][$eq]=${filterName} `;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        return responseUrlNav.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function PostView(cms: PostViewProps) {
    const data: [] = await getData(cms.cms.category.categoryList);
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data && data.map((item: any, index: number) => (
                <div key={index} className="group bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={"http://localhost:1337" + item.attributes.img.data.attributes.url}
                         className="w-full h-48 object-cover"
                         alt="..."/>
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{item.attributes.title}</h4>
                        <p className="text-gray-600">{item.attributes.description}</p>
                        <Link href={'/post/' + item.id}>
                            <CnButton className="mt-3">
                                <span>Anschauen</span>
                                <ArrowRightIcon className="ms-2"/>
                            </CnButton>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostView;

