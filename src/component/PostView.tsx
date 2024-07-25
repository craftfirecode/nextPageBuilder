import {useEffect, useState} from 'react';
import ApiService from "../service/ApiService";
import {Link} from "react-router-dom";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import {CnButton} from "./shadcn/CnButton.tsx";

type PostViewProps = {
    cms: any;
}

function PostView(cms: PostViewProps) {
    const [dataPage, setDataPage] = useState<any>(false);
    const urlParamsObject: any = {
        populate: 'deep',
        filters: {
            category: {
                category: {
                    categoryList: {
                        $eq: cms.cms.category.categoryList
                    }
                }
            },
        },
    };

    useEffect(() => {
        const fetchDataPage = async () => {
            try {
                const apiData = await ApiService.fetchGet(`/posts`, urlParamsObject);
                const newDataPage = apiData.data;
                setDataPage(newDataPage);
            } catch (error) {
                // Fehlerbehandlung
            }
        };

        fetchDataPage().then();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dataPage && dataPage.map((item: any, index: number) => (
                <div key={index} className="group bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={import.meta.env.VITE_STRAPI_API_URL + item.attributes.img.data.attributes.url}
                         className="w-full h-48 object-cover"
                         alt="..."/>
                    <div className="p-4">
                        <h4 className="text-lg font-semibold mb-2">{item.attributes.title}</h4>
                        <p className="text-gray-600">{item.attributes.description}</p>
                        <Link to={'/post/' + item.id}>
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

