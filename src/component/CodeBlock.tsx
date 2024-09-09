import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const CodeBlock = ({ cms }: { cms: any }) => {
  return (
    <div className="font-mono">
      <SyntaxHighlighter language="javascript" style={anOldHope}>
        {cms.code}
      </SyntaxHighlighter>
    </div>
  );
};
export default CodeBlock;
