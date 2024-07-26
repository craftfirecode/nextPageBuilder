type SocialProps = {
    cms: {
        x?: string;
        dex?: string;
        page?: string;
    };
}
const Social = ({cms}: SocialProps) => {
    return (
        <div className="social flex gap-2 items-center py-3 border-b">
            {cms.page && (
                <a href={cms.page} target="_blank" rel="noreferrer">
                    <img width="34px" src="/link.png" alt="x"/>
                </a>
            )}
            {cms.x && (
                <a href={cms.x} target="_blank" rel="noreferrer">
                    <img width="30px" src="/x.png" alt="x"/>
                </a>
            )}
            {cms.dex && (
                <a href={cms.dex} target="_blank" rel="noreferrer">
                    <img width="26px" src="/dex.png" alt="x"/>
                </a>
            )}
        </div>
    );
}

export default Social;