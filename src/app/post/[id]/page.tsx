import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
};

async function getData(permalinks: string | number) {
    try {
        const requestUrl = `${process.env.VITE_STRAPI_API_URL}/api/posts?populate=deep&filters[url][$eq]=${permalinks}`;
        const response = await axios.get(requestUrl, { headers });
        return response.data.data[0].attributes.cms;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const data = await getData(params.id);
        return (
            <main className="">
                <Builder data={data} />
            </main>
        );
    } catch (error) {
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
