

import {useEffect, useState} from 'react';
import ButtonView from "./ButtonView";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import Link from "next/link";

type VHeroViewProps = {
    cms: {
        file: {
            data: {
                attributes: {
                    url: string | null | undefined
                }
            }
        };
        link: string | null;
        mask: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
        vh: string;
        content: [];
        button: any;
    };
}

const VHeroView = (cms: VHeroViewProps) => {

    const maskBackgroundStyle = {
        backgroundImage: `url(${process.env.VITE_STRAPI_API_URL}/api${cms.cms.mask?.data?.attributes.url || ''})`,
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
        case 'vh-100':
            vh = 'h-[100vh]';
            break;
        default:
            vh = 'h-[25vh]'; // Default to h1 if the value is not in the range 1-6
            break;
    }

    console.log(cms.cms.content);

    return (
        <div className={vh + " " + "relative"}>
            <div className="absolute top-0 w-full h-full" style={maskBackgroundStyle}></div>
            <div
                className="absolute container left-0 right-0 top-0 bottom-0 flex-col justify-center items-center flex align-items">
                {cms.cms.content && <div className="relative">
                    <div className="mt-3 text-[1px] text-white relative1">
                        {/*<ButtonView cms={cms.cms.button}></ButtonView>*/}
                        <BlocksRenderer
                            content={cms.cms.content}
                        />
                    </div>
                </div>}
                {cms.cms.button ? (
                    <div className="mt-3 relative z-[1]">
                        <ButtonView cms={cms.cms.button}></ButtonView>
                    </div>
                ) : null
                }
            </div>
            <video className="h-full" title="video" muted loop autoPlay width="100%" height="100%"
                   style={{objectFit: 'cover'}}
                   src={process.env.VITE_STRAPI_API_URL + "" + cms.cms.file.data.attributes.url}></video>
        </div>
    );
}

export default VHeroView;