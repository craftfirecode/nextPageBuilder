"use client"

import React, { useState, useEffect } from 'react';
import CookieBanner from "@/component/CookieBanner";

interface Preferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

const ClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookiesPreferences, setCookiesPreferences] = useState<Preferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setCookiesPreferences(JSON.parse(consent));
        }
    }, []);

    useEffect(() => {
        if (cookiesPreferences.analytics) {
            // Add your Google Analytics code here
            //console.log('Analytics cookies accepted, initializing Google Analytics...');
            // Example: window.gtag('config', 'GA_TRACKING_ID');
        }

        if (cookiesPreferences.marketing) {
            // Add your Marketing code here
            //console.log('Marketing cookies accepted, initializing Marketing scripts...');
            // Example: window.fbq('init', 'FB_PIXEL_ID');
        }
    }, [cookiesPreferences]);

    const handleAccept = (preferences: Preferences) => {
        setCookiesPreferences(preferences);
    };

    return (
        <>
            {children}
            <CookieBanner onAccept={handleAccept} />
        </>
    );
};

export default ClientWrapper;
