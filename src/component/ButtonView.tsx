import {ArrowRightIcon} from "@radix-ui/react-icons";
import Link from "next/link";
import {CnButton} from "@/component/shadcn/CnButton";

type ButtonViewProps = {
    cms: {
        link?: any;
        style?: string;
        content?: string | number;
    };
}

const ButtonView = (cms: ButtonViewProps) => {
    const {link, style, content} = cms.cms;
    return (
        <>
            {style === 'btn-primary' ?
                (
                    <Link href={link}>
                        <CnButton className="mt-3">
                            <span>{content || 'Default Content'}</span>
                            <ArrowRightIcon className="ms-2"/>
                        </CnButton>
                    </Link>
                )
                :
                (
                    <Link href={link}>
                        <CnButton className="mt-3">
                            <span>{content || 'Default Content'}</span>
                            <ArrowRightIcon className="ms-2"/>
                        </CnButton>
                    </Link>
                )
            }
        </>

    );
};

export default ButtonView;