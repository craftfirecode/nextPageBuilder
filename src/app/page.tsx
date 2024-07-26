import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
  Authorization: 'Bearer ' + '795ae4f8716b1e03b49e9c137966829a711209f2c20226a2ee3db1ae5b04012b7e4017ee8795c470d5d599009a6dae824a71d580a50280a1733b6881db90a3dfdaeb833b033ff12c97173931ac5e540e4a52a0ed2bb26768eab70a233e5ee3c7dd6c095e9c9efbe5ed10012d884ea7f0cbfb94d4455358d25fe54274757b9e26',
};

async function getData(id: string | number) {
  try {
    // // GET PAGE ID
    const requestUrlNav = `https://headless.mapztour.de/api/setting?populate=deep`;
    const responseUrlNav = await axios.get(requestUrlNav, { headers });
    const navData = responseUrlNav.data.data.attributes.indexPage.page.data.id;

    //
    // const mainItem = findObjectByKeyValue(navData, "link", id);
    // let getID = mainItem?.page?.data?.id;
    //
    // if (mainItem && mainItem.submenu) {
    //   const submenuItem = findObjectByKeyValue(mainItem.submenu, "link", id);
    //   if (submenuItem) {
    //     getID = submenuItem.id;
    //   } else {
    //     console.log("No submenu item found with the specified link.");
    //   }
    // } else {
    //   console.log("No main menu item found with the specified link or it has no submenu.");
    // }
    //
    // if (!getID) {
    //   throw new Error("No valid ID found.");
    // }

    // GET PAGE
    const requestUrl = `https://headless.mapztour.de/api/pages/${navData}?populate=deep`;
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

export default async function Home({ params }: { params: { id: string } }) {
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
          <p>Error loading data. Please try again later.</p>
        </main>
    );
  }
}
