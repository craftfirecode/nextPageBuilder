import React from 'react';
import HeadlineView from "@/component/HeadlineView";

const Builder = (prop: any) => {
    const renderComponent = (component: any) => {
        switch (component.__component) {
            case 'cms.headline':
                return (
                    <div className="my-3">
                        <HeadlineView cms={component}/>
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