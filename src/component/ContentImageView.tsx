import ButtonView from "./ButtonView";
import React from "react";

type ContentImageViewProps = {
    cms: {
        reverse: boolean;
        headline: string | number | undefined;
        content: string | number | undefined;
        button: {
            link: string | undefined;
            style: string | undefined;
            content: string | number | undefined;
        };
        image: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
    };
}

const ContentImageView: React.FC<ContentImageViewProps> = ({cms}) => {

    const reverse = cms.reverse;

    return (
        <div className={'flex-row-reverse' + ' ' + cms.reverse ? '' : ''}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div
                    className={reverse ? 'order-2 flex flex-col items-start justify-center' : 'order-1 flex flex-col items-start justify-center'}>
                    <h4>{cms.headline}</h4>
                    <p className="my-[15px]">{cms.content}</p>
                    {cms.button ? (

                        <ButtonView cms={cms.button}></ButtonView>
                    ) : <></>}

                </div>
                <div className={reverse ? 'order-1' : 'order-2'}>
                    <img className="" alt=""
                         src={import.meta.env.VITE_STRAPI_API_URL + cms.image.data.attributes.url}/>
                </div>
            </div>
        </div>
    );
}

export default ContentImageView;

