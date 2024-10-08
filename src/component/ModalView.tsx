import * as Dialog from '@radix-ui/react-dialog';
import {Cross2Icon} from '@radix-ui/react-icons';
import RichText from "@/component/RichText";

type ModalViewProps = {
    cms: {
        button: any | undefined;
        title: string | number | undefined;
        content: string | number | undefined
    };
}

const ModalView = (cms: ModalViewProps) => {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-black text-white h-9 px-4 py-2 mt-3">
                        Action
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0"/>
                    <Dialog.Content
                        className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                            {cms.cms.title}
                        </Dialog.Title>
                        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                            <RichText content={cms.cms.content}/>
                        </Dialog.Description>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Cross2Icon/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}

export default ModalView;