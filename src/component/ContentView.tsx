import React from "react";
import RichText from "@/component/RichText";
import classNames from "classnames";

interface ContentViewProps {
  cms: {
    center?: boolean;
    content: string;
    color: string;
  }
}

const ContentView: React.FC<ContentViewProps> = ({ cms }) => {
  // Kombiniere die Klassen für Zentrierung
  const combinedClasses = classNames({
    "text-center": cms.center,
  });

  return (
    <div className={combinedClasses + " overflow-y-auto"} style={{ color: cms.color }}>
      <RichText content={cms.content} />
    </div>
  );
};

export default ContentView;
