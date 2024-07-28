import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + 'a313688db4b5cdf8c736f117aeb3d6e33c9516f375d6748e0001e28e9cbd6d054aafcb0f44058d6d48c77e2931a89252e888b4061c8ac8445559bc3abc4ef860d319379ce3eac4e8e6ed9e051ffa28bf15cbf6b7556658cd78d7e94f16ce161e557be4957536f209a30dd24d977ef128bf7f89d88a9fed100b54f16a929e8c45',
};

async function getData(id: string | number) {
    try {
        // // GET PAGE ID
        const requestUrlNav = `http://localhost:1337/api/setting?populate=deep`;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        console.log(responseUrlNav.data.data.attributes.indexPage.data.id);
        const navData = responseUrlNav.data.data.attributes.indexPage.data.id;

        // GET PAGE
        const requestUrl = `http://localhost:1337/api/pages/${navData}?populate=deep`;
        const response = await axios.get(requestUrl, {headers});
        return response.data.data.attributes.cms;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export default async function Home({params}: { params: { id: string } }) {
    try {
        const data = await getData(params.id);

        return (
            <>
                <div className="container bg-indigo-50">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="bg-red-50 basis-1/2 lg:basis-1/3">Element 1</div>
                        <div className="bg-red-50 basis-1/2 lg:basis-full">Element 2</div>
                    </div>
                </div>
                <Builder data={data}/>
            </>

        );
    } catch (error) {
        return (
            <main className="">
                <p>Error loading data. Please try again later.</p>
            </main>
        );
    }
}
