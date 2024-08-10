import axios from "axios";
import Link from "next/link";
import {CnButton} from "@/component/shadcn/CnButton";
import {ArrowRightIcon} from "@radix-ui/react-icons";

type PostViewProps = {
    cms: any;
}

async function getData(filterName: string) {
    const headers = {
        Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
    };
    try {
        const requestUrlNav = `${process.env.VITE_STRAPI_API_URL}/api/posts?populate=deep&filters[category][category][categoryList][$eq]=${filterName}`;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        return responseUrlNav.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function PostView(cms: PostViewProps) {
    // console.log(cms);
    const data: [] = await getData(cms.cms.category.categoryList);
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data && data.map((item: any, index: number) => (
                <div key={index} className="group bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={process.env.VITE_STRAPI_API_URL + item.attributes.img.data.attributes.url}
                         className="w-full h-48 object-cover"
                         alt="..."/>
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{item.attributes.title}</h4>
                        <p className="text-gray-600">{item.attributes.description}</p>
                        <Link href={'/post/' + item.attributes.url}>
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

