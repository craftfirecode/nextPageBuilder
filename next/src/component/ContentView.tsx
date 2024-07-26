import RichText from "./RichText.tsx";

type ContentViewProps = {
    content: string | number | undefined;
}

const ContentView = ({cms}: {
    cms: ContentViewProps;
}) => {
    return (
        <RichText content={cms.content}/>
    );
}

export default ContentView;