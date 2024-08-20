import React from "react";
import RichText from "@/component/RichText";
import ColView from "./ColView";

interface ContentViewProps {
  cms: {
    center?: boolean;
    content: string;
    col?: any; // Assuming col is an object, adjust the type as needed
  };
}

const ContentView: React.FC<ContentViewProps> = ({ cms }) => {
  return (
    <>
      {cms.col ? (
        <ColView cms={cms.col}>
          <div className={cms.center ? "text-center" : ""}>
            <RichText content={cms.content} />
          </div>
        </ColView>
      ) : (
        <div className={cms.center ? "text-center" : ""}>
          <RichText content={cms.content} />
        </div>
      )}
    </>
  );
};

export default ContentView;