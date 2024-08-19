import React from "react";
import RichText from "@/component/RichText";

interface ContentViewProps {
  cms: {
    center?: boolean;
    content: string;
  };
}

const ContentView: React.FC<ContentViewProps> = ({ cms }) => {

  // Wenn cms existiert, wird ColView gerendert
  return (
      <div className={cms.center ? "text-center" : ""}>
        <RichText content={cms.content} />
      </div>
  )
};

export default ContentView;
