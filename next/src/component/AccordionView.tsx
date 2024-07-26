import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

type AccordionViewProps = {
    cms: {
        accordionList: {
            id: number;
            title: string;
            content: string | number;
        }[];
    };
}

const AccordionView = (cms: AccordionViewProps) => {
    return (
        <Accordion.Root
            className="w-100 shadow-[0_2px_10px] shadow-black/5"
            type="single"
            defaultValue="item-1"
            collapsible
        >
            {cms.cms.accordionList &&
                cms.cms.accordionList.map((item, index) => (
                    <Accordion.Item
                        key={index}
                        value={'item-' + item.id}
                    >
                        <Accordion.Header className="flex">
                            <div className="w-full bg-darkblue pb-[2px]">
                                <Accordion.Trigger
                                    className="text-black w-full cursor-pointer shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none"
                                >
                                    {item.title}
                                    <ChevronDownIcon
                                        className="text-black ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                                        aria-hidden
                                    />
                                </Accordion.Trigger>
                            </div>

                        </Accordion.Header>
                        <Accordion.Content
                            className="text-black bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]"
                        >
                            <div className="py-[15px] px-5">
                                {item.content}
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
        </Accordion.Root>
    );
};

export default AccordionView;
