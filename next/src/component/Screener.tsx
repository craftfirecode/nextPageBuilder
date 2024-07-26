// TradingViewWidget.jsx
import {useEffect, useRef, memo} from 'react';

function Screener({cms}: { cms: { theme: string, height: string } }) {
    const container = useRef<any>();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = ` {
              "width": "100%",
              "height": "${cms.height}",
              "defaultColumn": "overview",
              "screener_type": "crypto_mkt",
              "displayCurrency": "USD",
              "colorTheme": "${cms.theme}",
              "locale": "de_DE",
              "isTransparent": false
            }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(Screener);