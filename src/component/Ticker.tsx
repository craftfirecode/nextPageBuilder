// TradingViewWidget.jsx
import {useEffect, useRef, memo} from 'react';

function Ticker() {
    const container = useRef<any>();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
                {
          "symbols": [
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "POLONIEX:SLOTHUSDT",
              "title": "Slothana"
              },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "description": "Solana",
              "proName": "CRYPTO:SOLUSD"
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "displayMode": "regular",
          "colorTheme": "dark",
          "locale": "de_DE"
        }

`;
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

export default memo(Ticker);