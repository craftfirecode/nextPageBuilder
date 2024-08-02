import RichText from "@/component/RichText";
import ButtonView from "@/component/ButtonView";

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
        backgroundImage: `url(${process.env.VITE_STRAPI_API_URL} + ${cms.cms.img?.data?.attributes.url || ''})`,
    };

    let vh: any;

    switch (cms.cms.vh) {
        case 'vh-25':
            vh = 'h-[25vh]';
            break;
        case 'vh-50':
            vh = 'h-[50vh]';
            break;
        case 'vh-75':
            vh = 'h-[75vh]';
            break;
        case 'vh-105':
            vh = 'h-[100vh]';
            break;
        default:
            vh = 'h-[25vh]';
            break;
    }

    return (
        <div className={`hero bg-cover bg-center ${cms.cms.vh}`} style={backgroundStyle}>
            <div className={"" + " " + vh}>
                <div className="flex h-[100%] flex-col justify-center items-center">
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