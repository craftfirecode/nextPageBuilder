const ImageGrid = ({ cms }: any) => {
    const { data } = cms.images;

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {data.map((item: any, index: number) => (
                    <div key={index} className="">
                        <img src={process.env.VITE_STRAPI_API_URL + item.attributes.url} alt="Grid Image" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGrid;
