import axios from "axios";
import Builder from "@/component/Builder";
import Author from "@/component/Author";

const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
};

async function getData(permalink: string | number): Promise<any | null> {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!apiUrl) {
        console.error("API URL is not defined");
        return null;
    }

    try {
        const requestUrl = `${apiUrl}/api/posts?populate=deep&filters[url][$eq]=${permalink}`;
        const response = await axios.get(requestUrl, { headers });

        if (response.status !== 200 || !response.data.data.length) {
            console.error("Failed to fetch post data or no data found");
            return null;
        }

        return response.data.data[0].attributes;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    if (!data) {
        return (
            <main className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-lg">Die Seite, die du suchst, konnte nicht gefunden werden.</p>
                    <a href="/" className="mt-4 inline-block px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded hover:bg-blue-200">
                        Zurück zur Startseite
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Builder data={data.cms} />
            {data.level?.level && (
                <div className="font-[Oswald] text-[12px] bg-indigo-50 inline-flex p-1 rounded mt-5">
                    {data.level.level}
                </div>
            )}
            <Author data={data.author?.data?.attributes ?? {}} />
        </main>
    );
}
