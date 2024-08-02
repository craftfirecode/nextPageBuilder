import {BlocksRenderer} from "@strapi/blocks-react-renderer";
import Link from "next/link";

const RichText = ({content}: any) => {
    return <BlocksRenderer content={content} />;
}

export default RichText;