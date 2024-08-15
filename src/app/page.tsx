import Builder from "@/component/Builder";

async function getData(pageId: string | number): Promise<any> {
    const apiUrl = process.env.VITE_STRAPI_API_URL;
    const apiKey = process.env.VITE_STRAPI_API_KEY;

    if (!apiUrl || !apiKey) {
        throw new Error("API URL or API Key is not defined");
    }

    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        // Fetch settings data
        const settingsUrl = `${apiUrl}/api/setting?populate=deep`;
        const settingsResponse = await fetch(settingsUrl, { next: { revalidate: 1 }, headers });
        if (!settingsResponse.ok) {
            console.error("Failed to fetch settings data");
            return null;
        }
        const settingsData = await settingsResponse.json();

        // Get page ID from settings data
        const indexPageId = settingsData.data?.attributes?.indexPage?.data?.id;
        if (!indexPageId) {
            console.error("Settings data does not contain a valid index page ID");
            return null;
        }

        // Fetch page data using the page ID
        const pageUrl = `${apiUrl}/api/pages/${indexPageId}?populate=deep`;
        const pageResponse = await fetch(pageUrl, { next: { revalidate: 1 }, headers });
        if (!pageResponse.ok) {
            throw new Error('Failed to fetch page data');
        }
        const pageData = await pageResponse.json();

        // Return the fetched page data
        return pageData.data?.attributes?.cms ?? null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function Home({ params }: { params: { id: string } }) {
    try {
        const data = await getData(params.id);

        if (!data) {
            throw new Error("No data found");
        }

        return (
            <main className="">
                http://preview.themeforest.net/item/zminimal-minimalist-blog-theme-for-creatives/full_screen_preview/17912115?_ga=2.53953192.1462965569.1723721957-634365737.1721466897&_gac=1.27842254.1721466897.Cj0KCQjwwO20BhCJARIsAAnTIVRi4cowRxRcZ-urE52uDvjQgHlutsQQBw15tCA246D_oDHf7ZVx_UYaAh89EALw_wcB
              <div className="font-raleway">
      <p className=" font-thin">Raleway Thin (100)</p>
      <p className=" font-extralight">Raleway ExtraLight (200)</p>
      <p className="font-light">Raleway Light (300)</p>
      <p className="font-normal">Raleway Regular (400)</p>
      <p className="font-medium">Raleway Medium (500)</p>
      <p className="font-semibold">Raleway SemiBold (600)</p>
      <p className="font-bold">Raleway Bold (700)</p>
      <p className="font-extrabold">Raleway ExtraBold (800)</p>
      <p className="font-black">Raleway Black (900)</p>
    </div>
                <Builder data={data} />
            </main>
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
