import React from 'react';
import HeadlineView from "@/component/HeadlineView";
import AccordionView from "@/component/AccordionView";
import ButtonView from "@/component/ButtonView";
import {CarouselView} from "@/component/CarouselView";
import ContentView from "@/component/ContentView";
import ContentImageView from "@/component/ContentImageView";
import HeroView from "@/component/HeroView";
import PostView from "@/component/PostView";
import ModalView from "@/component/ModalView";

const Builder = (prop: any) => {
    console.log(prop.data);
    const renderComponent = (component: any) => {
        switch (component.__component) {
            case 'cms.accordion':
                return (
                    <div className="my-3">
                        <AccordionView cms={component}/>
                    </div>
                );
            case 'cms.headline':
                return (
                    <div className="my-3">
                        <HeadlineView cms={component}/>
                    </div>
                );
            case 'cms.modal':
                return (
                    <div className="my-3">
                        <ModalView cms={component}/>
                    </div>
                );
            case 'cms.carousel':
                return (
                    <div className="my-3">
                        <CarouselView cms={component.carousel}/>
                    </div>
                );
            case 'cms.content':
                return (
                    <div className="my-3">
                        <ContentView cms={component}/>
                    </div>
                );
            case 'cms.content-image':
                return (
                    <div className="my-3">
                        <ContentImageView cms={component}/>
                    </div>
                );
            case 'cms.button':
                return (
                    <div className="my-3">
                        <ButtonView cms={component}/>
                    </div>
                );
            case 'cms.post-category':
                return (
                    <div className="my-3">
                        <PostView cms={component}/>
                    </div>
                );
            case 'cms.hero':
                return (
                    <div className="my-3">
                        <HeroView cms={component}/>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {prop.data.map((component: any, index: any) => (
                <React.Fragment key={index}>
                    {renderComponent(component)}
                </React.Fragment>
            ))}
        </>);
}

export default Builder;