import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
};

async function getData(id: string | number) {
    try {
        // // GET PAGE ID
        const requestUrlNav = `${process.env.VITE_STRAPI_API_URL}/api/setting?populate=deep`;
        const responseUrlNav = await axios.get(requestUrlNav, {headers});
        console.log(responseUrlNav.data.data.attributes.indexPage.data.id);
        const navData = responseUrlNav.data.data.attributes.indexPage.data.id;

        // GET PAGE
        const requestUrl = `${process.env.VITE_STRAPI_API_URL}/api/pages/${navData}?populate=deep`;
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
