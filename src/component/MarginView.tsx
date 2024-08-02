type MarginViewProps = {
    cms:
        {
            mt: string | null;
            mb: string | null;
            pt: string | null;
            pb: string | null;
        };
}

const MarginView = (cms: MarginViewProps) => {
    const classNamesArray = [cms.cms.mt, cms.cms.mb, cms.cms.pt, cms.cms.pb];
    const classNames = classNamesArray.filter(className => !!className).join(' ');

    // Überprüfe, ob mindestens eine Klasse gesetzt ist, bevor du die div rendert
    if (!classNames.trim()) {
        return null;
    }

    return (
        <div className={classNames}></div>
    );
}

export default MarginView;
