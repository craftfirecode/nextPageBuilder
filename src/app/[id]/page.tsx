import axios from "axios";
import Builder from "@/component/Builder";

const headers = {
  Authorization: 'Bearer ' + 'a10b082a4512eec295fccf53441c2d46e144ad735377a1724093aef47b43e4d23e9207ce031776f6f27d82625ecd6c2f9840d15d4b4b51a78eb263d8bbeaddff6bf74b3dd4b6c6f171ab1f04b22ff1d54c687b2091a545f5a615c632c1925823c8379dfe1cbf651dc1b6d944095f44af6ef4c227f7a162b1baa3bb3309785154',
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
