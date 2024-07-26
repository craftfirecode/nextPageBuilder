import {useEffect, useState} from 'react';
import ButtonView from "./ButtonView";
import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import {Link} from "react-router-dom";

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
    const [link, setLink] = useState("");

    const maskBackgroundStyle = {
        backgroundImage: `url(${import.meta.env.VITE_STRAPI_API_URL}${cms.cms.mask?.data?.attributes.url || ''})`,
    };

    useEffect(() => {

        if (cms.cms.file.data === null || cms.cms.link === null) {
            setLink("");
        }

        if (cms.cms.link !== null) {
            setLink(cms.cms.link);
        }

        if (cms.cms.file.data !== null) {
            setLink(import.meta.env.VITE_STRAPI_API_URL + '' + cms.cms.file.data.attributes.url);
        }
    }, [cms.cms]);

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
                className="absolute left-0 right-0 top-0 bottom-0 flex-col justify-center items-center flex align-items">
                {cms.cms.content && <div className="relative">
                    <div className="mt-3 relative1">
                        {/*<ButtonView cms={cms.cms.button}></ButtonView>*/}
                        <BlocksRenderer
                            content={cms.cms.content}
                            blocks={{
                                paragraph: ({children}) => <p className="text-neutral900 max-w-prose">{children}</p>,
                                heading: ({children, level}) => {
                                    switch (level) {
                                        case 1:
                                            return <h1>{children}</h1>
                                        case 2:
                                            return <h2>{children}</h2>
                                        case 3:
                                            return <h3>{children}</h3>
                                        case 4:
                                            return <h4>{children}</h4>
                                        case 5:
                                            return <h5>{children}</h5>
                                        case 6:
                                            return <h6>{children}</h6>
                                        default:
                                            return <h1 className="bg-amber-300">{children}</h1>
                                    }
                                },
                                // For links, you may want to use the component from your router or framework
                                link: ({children, url}) => <Link to={url}>{children}</Link>,
                            }}
                            modifiers={{
                                bold: ({children}) => <strong>{children}</strong>,
                                italic: ({children}) => <span className="italic">{children}</span>,
                            }}
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
                   src={link}></video>
        </div>
    );
}

export default VHeroView;