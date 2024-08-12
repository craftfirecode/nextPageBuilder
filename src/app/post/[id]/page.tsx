import axios from "axios";
import Builder from "@/component/Builder";
import Author from "@/component/Author";

const headers = {
    Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
};

async function getData(permalink: string | number): Promise<any> {
    try {
        const apiUrl = process.env.VITE_STRAPI_API_URL;
        if (!apiUrl) {
            throw new Error("API URL is not defined");
        }

        const requestUrl = `${apiUrl}/api/posts?populate=deep&filters[url][$eq]=${permalink}`;
        const response = await fetch(requestUrl, { next: { revalidate: 1 }, headers });
        if (!response.ok) {
            throw new Error("Failed to fetch post data");
        }

        const responseData = await response.json();
        return responseData.data[0].attributes;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const data = await getData(params.id);
        if (!data) {
            throw new Error("No data found");
        }

        return (
            <main className="">
                <Builder data={data.cms} />
                <Author data={data.author.data.attributes} />
            </main>
        );
    } catch (error) {
        console.error("Error in Page component:", error);
        return (
            <main className="">
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">404</h1>
                        <p className="text-lg">Die Seite, die du suchst, konnte nicht gefunden werden.</p>
                        <a href="/"
                           className="mt-4 inline-block px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded hover:bg-blue-200">Zurück
                            zur Startseite</a>
                    </div>
                </div>
            </main>
        );
    }
}
