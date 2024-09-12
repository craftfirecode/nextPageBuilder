"use client";

import axios from "axios";
import Link from "next/link";
import { CnButton } from "@/component/shadcn/CnButton";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type PostViewProps = {
  cms: any;
};

function PostView({ cms }: PostViewProps) {
  const [data, setData] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");

  const getData = async (
    filterName: string,
    titleFilter: string,
    limit: string | number | null
  ) => {
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
    };
    try {
      const requestUrlNav = `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/posts?populate=deep&filters[category][category][categoryList][$eq]=${filterName}&filters[$or][0][description][$contains]=${titleFilter}&pagination[limit]=${
        limit || 100
      }`;
      const responseUrlNav = await axios.get(requestUrlNav, { headers });
      return responseUrlNav.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const categoryList = cms?.category?.categoryList;
    const limit = cms?.limit;
    if (categoryList) {
      getData(categoryList, titleFilter, limit)
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("Category list is undefined.");
    }
  }, [cms?.category?.categoryList, titleFilter]);

  return (
    <div>
      {cms?.filter && (
        <input
          type="text"
          placeholder="Filter by description"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((item: any, index: number) => (
            <div
              key={index}
              className="border-fx"
            >
              <div className="bg-white h-full rounded-lg">
              <img
                src={
                  process.env.NEXT_PUBLIC_STRAPI_API_URL +
                  item.attributes.img.data.attributes.url
                }
                className="w-full h-48 object-cover rounded-t-lg"
                alt="..."
              />
          
                <div className="p-4">
                {item.attributes.level?.level && (
                  <div className="font-[Oswald] text-[12px] bg-indigo-50 inline-flex p-1 rounded mb-2">
                    {item.attributes.level.level}
                  </div>
                )}
                <h6 className="">{item.attributes.title}</h6>
                <p className="text-gray-600">{item.attributes.description}</p>
                <Link href={"/post/" + item.attributes.url}>
                  <CnButton className="mt-3">
                    <span>Anschauen</span>
                    <ArrowRightIcon className="ms-2" />
                  </CnButton>
                </Link>
                  </div>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PostView;
