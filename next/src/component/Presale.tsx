import {useEffect, useState} from "react";
import ApiService from "../service/ApiService.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./shadcn/table/Table.tsx";
import {Gauge} from "./Gauge.tsx";

const Presale = () => {
    const [presalesData, setDataPresales] = useState<any>(false);

    useEffect(() => {
        const fetchDataPage = async () => {
            try {
                const apiData = await ApiService.fetchGet(`/presales`);
                const newDataPage = apiData.data;
                setDataPresales(newDataPage);
                console.log(newDataPage);
            } catch (error) {
                // Fehlerbehandlung
            }
        };

        fetchDataPage().then();
    }, []);

    return (
        <div>
            <div className="">
                <div className="">
                    <div className="rounded-md shadow-md sm:border">
                        <Table>
                            <TableHeader className="hidden">
                                <TableRow>
                                    <TableHead className="font-medium"></TableHead>
                                    <TableHead className="font-medium"></TableHead>
                                    <TableHead className="font-medium"></TableHead>
                                    <TableHead className="font-medium"></TableHead>
                                    <TableHead className="font-medium font-bold">Beliebtheit</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {presalesData ? (
                                    presalesData.map((coin: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell width="75">
                                                <img alt="coin" src={import.meta.env.VITE_STRAPI_API_URL + coin.attributes.symbol.data.attributes.url}/></TableCell>
                                            <TableCell><h6>{coin.attributes.name}</h6></TableCell>
                                            <TableCell className="w-[42px]">
                                                <a target="_blank" href={coin.attributes.page}>
                                                    <img width="100%" alt="coin" src="/link.png"/>
                                                </a></TableCell>
                                            <TableCell className="w-[40px]">
                                                <a target="_blank" href={coin.attributes.x}>
                                                    <img width="100%" alt="coin" src="/x.png"/>
                                                </a>
                                            </TableCell>
                                            <TableCell className="w-[36px]"><Gauge size="small" showValue={true}
                                                                                   value={coin.attributes.completionRate}/></TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presale;