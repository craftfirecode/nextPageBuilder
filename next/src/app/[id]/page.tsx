import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
  Authorization: 'Bearer ' + 'a313688db4b5cdf8c736f117aeb3d6e33c9516f375d6748e0001e28e9cbd6d054aafcb0f44058d6d48c77e2931a89252e888b4061c8ac8445559bc3abc4ef860d319379ce3eac4e8e6ed9e051ffa28bf15cbf6b7556658cd78d7e94f16ce161e557be4957536f209a30dd24d977ef128bf7f89d88a9fed100b54f16a929e8c45',
};

async function getData(id: string | number) {
  try {
    // GET PAGE ID
    const requestUrlNav = `http://localhost:1337/api/setting?populate=deep`;
    const responseUrlNav = await axios.get(requestUrlNav, { headers });
    const navData = responseUrlNav.data.data.attributes.nav;

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
    const requestUrl = `http://localhost:1337/api/pages/${getID}?populate=deep`;
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
