type HeadlineViewProps = {
    cms: {
        headline: string | number | undefined;
        tag: string | number | undefined;
    };
}

const HeadlineView = (cms: HeadlineViewProps) => {
    const { tag } = cms.cms;

    let TagName: any;

    switch (tag) {
        case 'h1':
            TagName = 'h1';
            break;
        case 'h2':
            TagName = 'h2';
            break;
        case 'h3':
            TagName = 'h3';
            break;
        case 'h4':
            TagName = 'h4';
            break;
        case 'h5':
            TagName = 'h5';
            break;
        case 'h6':
            TagName = 'h6';
            break;
        default:
            TagName = 'h1'; // Default to h1 if the value is not in the range 1-6
            break;
    }

    return (
        <TagName>{cms.cms.headline}</TagName>
    );
}

export default HeadlineView;
