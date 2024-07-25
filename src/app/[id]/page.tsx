import axios from "axios";
import Builder from "@/component/Builder";

async function getData(id: string | number) {
  const requestUrl = `https://headless.mapztour.de/api/pages/${id}?populate=deep`
  const headers = {
    Authorization: 'Bearer ' + '795ae4f8716b1e03b49e9c137966829a711209f2c20226a2ee3db1ae5b04012b7e4017ee8795c470d5d599009a6dae824a71d580a50280a1733b6881db90a3dfdaeb833b033ff12c97173931ac5e540e4a52a0ed2bb26768eab70a233e5ee3c7dd6c095e9c9efbe5ed10012d884ea7f0cbfb94d4455358d25fe54274757b9e26',
  };
  const response = await axios.get(requestUrl, { headers });
  console.log(response.data);
  return response.data.data.attributes.cms;
}

export default async function Home({ params }: { params: { id: string } }) {
  const data = await getData(params.id)
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Builder data={data}/>
      </main>
  );
}
