import RichText from "@/component/RichText";

type ContentViewProps = {
    content: string | number | undefined;
}

const ContentView = ({cms}: any) => {
    return (
        <div>
            {cms && <RichText content={cms.content}/>}
        </div>
    );
}

export default ContentView;