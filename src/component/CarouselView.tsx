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
                        <Image
                            title="slider"
                            alt="slider"
                            src={"https://headless.mapztour.de/" + item.img.data.attributes.url}
                            layout="responsive"
                            width={100}
                            height={475}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}