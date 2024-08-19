import React from "react";
import RichText from "@/component/RichText";
import ColView from "./ColView";

interface ContentViewProps {
  cms: {
    col?: {
      col: number | string | null; 
    };
    center?: boolean;
    content: string;
  };
}

const ContentView: React.FC<ContentViewProps> = ({ cms }) => {
  console.log("cms.col?.col:", cms.col?.col);

  // Wenn cms existiert, wird ColView gerendert
  return cms.col ? (
    <ColView cols={{ col: cms.col?.col }}>
      <div className={cms.center ? "text-center" : ""}>
        <RichText content={cms.content} />
      </div>
    </ColView>
  ) : (
    <div className={cms.center ? "text-center" : ""}>
      <RichText content={cms.content} />
    </div>
  );
};

export default ContentView;
