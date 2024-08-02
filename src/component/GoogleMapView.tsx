interface GoogleMapViewProps {
    cms: {
        Iframe: string;
    };
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({cms}) => {
    const iframeHtml = cms.Iframe.replace(/width="[^"]*"/i, 'width="100%"');

    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: iframeHtml}}/>
        </div>
    );
}

export default GoogleMapView;