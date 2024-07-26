import React from 'react';
import HeadlineView from "@/component/HeadlineView";
import AccordionView from "@/component/AccordionView";
import ButtonView from "@/component/ButtonView";
import {CarouselView} from "@/component/CarouselView";

const Builder = (prop: any) => {
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
            case 'cms.carousel':
                return (
                    <div className="my-3">
                        <CarouselView cms={component.carousel}/>
                    </div>
                );
            case 'cms.button':
                return (
                    <div className="my-3">
                        <ButtonView cms={component}/>
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