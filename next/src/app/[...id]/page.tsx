import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
  Authorization: 'Bearer ' + process.env.VITE_STRAPI_API_KEY,
};

async function getData(id: string | number) {
  try {
    // GET PAGE ID
    const requestUrlNav = `${process.env.VITE_STRAPI_API_URL}/api/setting?populate=deep`;
    const responseUrlNav = await axios.get(requestUrlNav, { headers });
    const navData = responseUrlNav.data.data.attributes.nav;
    console.log('demo', navData[0].submenu);
    const mainItem = findObjectByKeyValue(navData, "link", id);
    let getID = mainItem?.page?.data?.id;

    if (mainItem && mainItem.submenu) {
      const submenuItem = findObjectByKeyValue(mainItem.submenu, "link", id);
      if (submenuItem) {
        console.log("submenu");
        getID = submenuItem.page.data.id;
      } else {
        console.log("No submenu item found with the specified link.");
      }
    } else {
      console.log("No main menu item found with the specified link or it has no submenu.");
    }

    if (!getID) {
      throw new Error("No valid ID found.");
    }

    // GET PAGE
    const requestUrl = `${process.env.VITE_STRAPI_API_URL}/api/pages/${getID}?populate=deep`;
    const response = await axios.get(requestUrl, { headers });
    return response.data.data.attributes.cms;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function findObjectByKeyValue(objects: any[], key: string | number, value: string | number) {
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

export default async function Home({ params }: { params: { id: [] } }) {
  try {
    console.log(params.id.join('/'))
    const data = await getData(params.id.join('/'));

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
