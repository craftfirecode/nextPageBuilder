import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
    Authorization: 'Bearer ' + 'e7507a1e52eee31759033b3a3b9e6c51a6be94d5dc2bfe208b27f1c2100cf475c4f534fdad57ae4ecc60a9feae9ed49a4d12a8309cf56a5ba59d1b4c39540425f89d4cb3ce7302cc4994179163ae37dfb8e2a6279a8341203901bc63536e972f8e2a53dad756e71e7b11b442568df756bce8a53da3a22b1602df0909d96c117a',
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
