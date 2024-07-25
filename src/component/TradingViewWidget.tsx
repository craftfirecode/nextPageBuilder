// TradingViewWidget.jsx
import {useEffect, useRef, memo} from 'react';

type CoinChartData = {
    height: string;
    id: number;
    interval: string;
    symbol: string;
    theme: string;
    __component: string;
}

function TradingViewWidget({cms}: { cms: CoinChartData }) {
    const container = useRef<any>();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${cms.symbol}",
          "height": "${cms.height}",
          "interval": "${cms.interval}",
          "timezone": "Etc/UTC",
          "theme": "${cms.theme}",
          "style": "1",
          "locale": "de_DE",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={container} style={{height: "100%", width: "100%"}}>
            <div className="tradingview-widget-container__widget"
                 style={{height: "calc(100% - 32px)", width: "100%"}}></div>
        </div>
    );
}

export default memo(TradingViewWidget);