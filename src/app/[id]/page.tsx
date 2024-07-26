import axios from "axios";
import Builder from "@/component/Builder";

async function getData(id: string | number) {

  const headers = {
    Authorization: 'Bearer ' + '795ae4f8716b1e03b49e9c137966829a711209f2c20226a2ee3db1ae5b04012b7e4017ee8795c470d5d599009a6dae824a71d580a50280a1733b6881db90a3dfdaeb833b033ff12c97173931ac5e540e4a52a0ed2bb26768eab70a233e5ee3c7dd6c095e9c9efbe5ed10012d884ea7f0cbfb94d4455358d25fe54274757b9e26',
  };

  // GET PAGE ID
  const requestUrlNav = `https://headless.mapztour.de/api/setting?populate=deep`

  const responseUrlNav = await axios.get(requestUrlNav, {headers});
  const navData = responseUrlNav.data.data.attributes.nav
  // console.log(navData);

  function findObjectByKeyValue(objects: any, key: string | number, value: string | number) {
    for (const obj of objects) {
      if (searchObject(obj, key, value)) {
        return obj;
      }
    }
    return null;
  }

  function searchObject(obj: any, key: string | number, value: string | number) {
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

  const result = findObjectByKeyValue(navData, "link", id);

  // GET PAGE
  const requestUrl = `https://headless.mapztour.de/api/pages/${result.page.data.id}?populate=deep`
  const response = await axios.get(requestUrl, { headers });
  console.log(response.data.data.attributes.cms);
  return response.data.data.attributes.cms;
}

export default async function Home({ params }: { params: { id: string } }) {
  const data = await getData(params.id)

  return (
      <main className="">
        <Builder data={data}/>
      </main>
  );
}
