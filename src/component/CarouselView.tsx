import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/component/shadcn/CnCarousel";
import React from "react";
import Image from 'next/image';

type CarouselViewProps = {
    cms: {
        img: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    }[];
}

export const CarouselView: React.FC<CarouselViewProps> = ({ cms }) => {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {cms.map((item: { img: { data: { attributes: { url: string; }; }; }; }, index: number) => (
                    <CarouselItem key={index}>
                        <img
                            title="slider"
                            alt="slider"
                            src={process.env.NEXT_PUBLIC_STRAPI_API_URL + "" + item.img.data.attributes.url}
                            width="100%"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}