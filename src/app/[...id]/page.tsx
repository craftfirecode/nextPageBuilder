import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
  Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_API_KEY,
};

async function getData(pageLink: string | number): Promise<any> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    // Fetch settings data to get navigation structure
    const settingsUrl = `${apiUrl}/api/setting?populate=deep`;
    const settingsResponse = await fetch(settingsUrl, { next: { revalidate: 1 }, headers });
    if (!settingsResponse.ok) {
      throw new Error("Failed to fetch settings data");
    }

    const settingsData = await settingsResponse.json();
    const navData = settingsData.data.attributes.nav;

    // Find the main menu item based on the link
    const mainMenuItem = findObjectByKeyValue(navData, "link", pageLink);
    let pageId = mainMenuItem?.page?.data?.id;

    // If the main menu item has a submenu, find the submenu item based on the link
    if (mainMenuItem && mainMenuItem.submenu) {
      const submenuItem = findObjectByKeyValue(mainMenuItem.submenu, "link", pageLink);
      if (submenuItem) {
        pageId = submenuItem.page.data.id;
      } else {
        // If the submenu item is not found, use the main menu item's page ID
      }
    } else {
      // If the main menu item has no submenu, use the main menu item's page ID
    }

    if (!pageId) {
      console.error("No valid page ID found.");
      return null;
    }

    // Fetch the page data using the page ID
    const pageUrl = `${apiUrl}/api/pages/${pageId}?populate=deep`;
    const pageResponse = await axios.get(pageUrl, { headers });
    return pageResponse.data.data.attributes.cms;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function findObjectByKeyValue(objects: any[], key: string | number, value: string | number): any | null {
  for (const obj of objects) {
    if (searchObject(obj, key, value)) {
      return obj;
    }
  }
  return null;
}

function searchObject(obj: any, key: string | number, value: string | number): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  if (obj[key] === value) {
    return true;
  }
  for (const k in obj) {
    if (obj.hasOwnProperty(k) && searchObject(obj[k], key, value)) {
      return true;
    }
  }
  return false;
}

export default async function Home({ params }: { params: { id: string[] } }) {
  try {
    const pageLink = params.id.join('/');
    const data = await getData(pageLink);

    if (!data) {
      throw new Error("No data found");
    }

    return (
        <main className="">
          <Builder data={data} />
        </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
        <main className="">
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold">404</h1>
              <p className="text-lg">Die Seite, die du suchst, konnte nicht gefunden werden.</p>
              <a href="/" className="mt-4 inline-block px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded hover:bg-blue-200">
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </main>
    );
  }
}
