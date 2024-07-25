import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "./shadcn/CnCarousel.tsx";

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

export const CarouselView: React.FC<CarouselViewProps> = ({cms}) => {
    return (
        <Carousel className="w-full">
            <CarouselContent>
                {cms.map((item, index) => (
                    <CarouselItem key={index}>
                        <img title="slider"
                             alt="slider"
                             className="w-full"
                             src={import.meta.env.VITE_STRAPI_API_URL + item.img.data.attributes.url}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    )
}
