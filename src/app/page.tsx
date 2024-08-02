import Builder from "@/component/Builder";

async function getData(id: string | number): Promise<any> {
    const apiUrl = process.env.VITE_STRAPI_API_URL;
    const apiKey = process.env.VITE_STRAPI_API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error("API URL or API Key is not defined");
    }

    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        // Fetch navigation data
        const response = await fetch(`${apiUrl}/api/setting?populate=deep`, { next: { revalidate: 1 }, headers });
        if (!response.ok) {
            console.error("Failed to fetch navigation data");
        }
        const data = await response.json();

        // Get page ID from navigation data
        const navData = data.data?.attributes?.indexPage?.data?.id;
        if (!navData) {
            console.error("Navigation data does not contain a valid page ID");
        }

        // Fetch page data using the page ID
        const responseData = await fetch(`${apiUrl}/api/pages/${navData}?populate=deep`, { next: { revalidate: 1 }, headers });
        if (!responseData.ok) {
            throw new Error('Failed to fetch page data');
        }
        const dataPage = await responseData.json();

        // Return the fetched page data
        return dataPage.data?.attributes?.cms ?? null;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export default async function Home({ params }: { params: { id: string } }) {
    try {
        const data = await getData(params.id);

        if (!data) {
            throw new Error("No data found");
        }

        return (
            <>
                <Builder data={data} />
            </>
        );
    } catch (error) {
        console.error("Error in Home component:", error);
        return (
            <main className="">
                <p>Error loading data. Please try again later.</p>
            </main>
        );
    }
}
