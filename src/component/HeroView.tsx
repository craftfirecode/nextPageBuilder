import RichText from "@/component/RichText";
import ButtonView from "@/component/ButtonView";
import {cn} from "@/lib/utils";

type HeroViewProps = {
    cms: {
        img: {
            data:
                {
                    attributes: {
                        url: string | undefined;
                    };
                };
        };
        vh: string | undefined;
        content: {}[];
        title: string | number | undefined;
        button: any;
    }
}

const HeroView = (cms: HeroViewProps) => {
    const backgroundStyle: any = {
        backgroundImage: `url(${process.env.VITE_STRAPI_API_URL}${cms.cms.img?.data?.attributes.url || ''})`,
    };

    let vh: any;

    switch (cms.cms.vh) {
        case 'vh-25':
            vh = 'min-h-[25vh]';
            break;
        case 'vh-50':
            vh = 'min-h-[50vh]';
            break;
        case 'vh-75':
            vh = 'min-h-[75vh]';
            break;
        case 'vh-100':
            vh = 'min-h-[100vh]';
            break;
        default:
            vh = 'min-h-[25vh]';
            break;
    }

    return (
        <div className={`hero bg-cover bg-center ${cms.cms.vh}`} style={backgroundStyle}>
            <div className={cn("flex container flex-col justify-center items-center", vh)}>
                <div className="">
                    {cms.cms.content && <RichText content={cms.cms.content}></RichText>}
                    {cms.cms.button &&
                        <div className="w-auto mt-3">
                            <ButtonView cms={cms.cms.button}></ButtonView>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default HeroView;