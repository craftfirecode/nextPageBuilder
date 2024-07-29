import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + 'a313688db4b5cdf8c736f117aeb3d6e33c9516f375d6748e0001e28e9cbd6d054aafcb0f44058d6d48c77e2931a89252e888b4061c8ac8445559bc3abc4ef860d319379ce3eac4e8e6ed9e051ffa28bf15cbf6b7556658cd78d7e94f16ce161e557be4957536f209a30dd24d977ef128bf7f89d88a9fed100b54f16a929e8c45',
};

async function getData(postID: string | number) {
    try {
        const requestUrl = `http://localhost:1337/api/posts/${postID}?populate=deep`;
        const response = await axios.get(requestUrl, { headers });
        return response.data.data.attributes.cms;
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
