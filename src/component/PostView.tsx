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
        const requestUrlNav = `${process.env.VITE_STRAPI_API_URL}/api/posts?populate=deep&filters[category][category][categoryList][$eq]=${filterName}&filters[$or][0][title][$contains]=&filters[$or][0][description][$contains]=`;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        return responseUrlNav.data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

async function PostView(cms: PostViewProps) {
    const data: [] = await getData(cms.cms.category.categoryList);
    console.log(data);
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data && data.map((item: any, index: number) => (
                <div key={index} className="group bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={process.env.VITE_STRAPI_API_URL + item.attributes.img.data.attributes.url}
                         className="w-full h-48 object-cover"
                         alt="..."/>
                    <div className="p-4">
                        {item.attributes.level?.level && (
                            <div className="font-[Oswald] text-[12px] bg-indigo-50 inline-flex p-1 rounded mb-2">
                                {item.attributes.level.level}
                            </div>
                        )}
                        <h6 className="">{item.attributes.title}</h6>
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

