import React from "react";
import HeadlineView from "@/component/HeadlineView";
import AccordionView from "@/component/AccordionView";
import ButtonView from "@/component/ButtonView";
import { CarouselView } from "@/component/CarouselView";
import ContentView from "@/component/ContentView";
import ContentImageView from "@/component/ContentImageView";
import HeroView from "@/component/HeroView";
import PostView from "@/component/PostView";
import ModalView from "@/component/ModalView";
import VHeroView from "@/component/VHeroView";
import Image from "next/image";
import ImageGrid from "@/component/ImageGrid";
import MarginView from "@/component/MarginView";
import RatingView from "@/component/RatingView";
import CodeBlock from "./CodeBlock";

const Builder = (prop: any) => {
  // console.log(prop.data);
  const renderComponent = (component: any) => {
    switch (component.__component) {
      case "cms.accordion":
        return (
          <div className="">
            <AccordionView cms={component} />
          </div>
        );
      case "cms.rating":
        return (
          <div className="">
            <RatingView cms={component} />
          </div>
        );
      case "cms.margin":
        return (
          <div className="">
            <MarginView cms={component} />
          </div>
        );
      case "cms.headline":
        return (
          <div className="">
            <HeadlineView cms={component} />
          </div>
        );
      case "cms.modal":
        return (
          <div className="">
            <ModalView cms={component} />
          </div>
        );
      case "cms.carousel":
        return (
          <div className="">
            <CarouselView cms={component.carousel} />
          </div>
        );
      case "cms.image-grid":
        return (
          <div className="">
            <ImageGrid cms={component} />
          </div>
        );
      case "cms.content":
        return (
          <div className="">
            <ContentView cms={component} />
          </div>
        );
      case "cms.content-image":
        return (
          <div className="">
            <ContentImageView cms={component} />
          </div>
        );
      case "cms.v-hero":
        return (
          <div className="">
            <VHeroView cms={component} />
          </div>
        );
      case "cms.button":
        return (
          <div className="">
            <ButtonView cms={component} />
          </div>
        );
      case "cms.post-category":
        return (
          <div className="">
            <PostView cms={component} />
          </div>
        );
      case "cms.hero":
        return (
          <div className="">
            <HeroView cms={component} />
          </div>
        );
      case "cms.code-block":
        return (
          <div className="">
            <CodeBlock cms={component} />
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
    </>
  );
};

export default Builder;
