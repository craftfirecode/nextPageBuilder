import axios from "axios";
import Link from "next/link";
import {CnButton} from "@/component/shadcn/CnButton";
import {ArrowRightIcon} from "@radix-ui/react-icons";

type PostViewProps = {
    cms: any;
}

async function getData(filterName: string) {
    const headers = {
        Authorization: 'Bearer ' + 'e7507a1e52eee31759033b3a3b9e6c51a6be94d5dc2bfe208b27f1c2100cf475c4f534fdad57ae4ecc60a9feae9ed49a4d12a8309cf56a5ba59d1b4c39540425f89d4cb3ce7302cc4994179163ae37dfb8e2a6279a8341203901bc63536e972f8e2a53dad756e71e7b11b442568df756bce8a53da3a22b1602df0909d96c117a',
    };
    try {
        const requestUrlNav = `http://localhost:1337/api/posts?populate=deep&filters[category][category][categoryList][$eq]=${filterName}`;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        return responseUrlNav.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function PostView(cms: PostViewProps) {
    console.log(cms);
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
                        <Link href={'/post/' + item.attributes.permalinks}>
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

