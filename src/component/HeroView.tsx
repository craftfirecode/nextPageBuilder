import RichText from "@/component/RichText";
import ButtonView from "@/component/ButtonView";
import { cn } from "@/lib/utils";
import ContentView from "./ContentView";

const HeroView = (cms: any) => {
    const backgroundStyle: any = {
        backgroundImage: `url(${process.env.NEXT_PUBLIC_STRAPI_API_URL}${cms.cms.img?.data?.attributes.url || ''})`,
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
        <div className="border-fx">
             <div className={`hero relative rounded-lg bg-cover bg-center py-5 ${cms.cms.vh}`} style={backgroundStyle}>
            {/* Overlay Div */}
            <div className="absolute inset-0 opacity-50" style={{ background: cms.cms.background }}></div>
            <div className={cn("relative flex container flex-col justify-center", vh)}>
                <div className="">
                    {cms.cms.content && <ContentView cms={cms.cms.content}></ContentView>}
                    {cms.cms.button &&
                        <div className="w-auto mt-3">
                            <ButtonView cms={cms.cms.button}></ButtonView>
                        </div>
                    }
                </div>
            </div>
        </div>

        </div>
       
    );
}

export default HeroView;
