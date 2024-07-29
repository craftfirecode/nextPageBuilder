import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + 'e7507a1e52eee31759033b3a3b9e6c51a6be94d5dc2bfe208b27f1c2100cf475c4f534fdad57ae4ecc60a9feae9ed49a4d12a8309cf56a5ba59d1b4c39540425f89d4cb3ce7302cc4994179163ae37dfb8e2a6279a8341203901bc63536e972f8e2a53dad756e71e7b11b442568df756bce8a53da3a22b1602df0909d96c117a',
};

async function getData(permalinks: string | number) {
    try {
        const requestUrl = `http://localhost:1337/api/posts?populate=deep&filters[permalinks][$eq]=${permalinks}`;
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
