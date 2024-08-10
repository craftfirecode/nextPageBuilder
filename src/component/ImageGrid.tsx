import React from 'react';

const ImageGrid = ({ cms }: any) => {
    const { data } = cms.images;

    return (
        <div className="flex flex-wrap -mx-2">
            {data.map((item: any, index: number) => {
                const rowCapacity = 3;
                const itemsInRow = Math.min(data.length - Math.floor(index / rowCapacity) * rowCapacity, rowCapacity);
                const widthClass = itemsInRow === 1 ? 'w-full' : (itemsInRow === 2 ? 'md:w-full lg:w-1/2' : 'md:w-full lg:w-1/3');

                return (
                    <div key={index} className={`${widthClass} px-2 mb-4`}>
                        <img src={`${process.env.VITE_STRAPI_API_URL}${item.attributes.url}`} alt="Grid Image" className="w-full h-auto" />
                    </div>
                );
            })}
        </div>
    );
};

export default ImageGrid;
