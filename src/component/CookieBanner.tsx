import React, { useState, useEffect } from 'react';

interface Preferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

interface CookieBannerProps {
    onAccept: (preferences: Preferences) => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setShowBanner(false);
        onAccept(preferences);
    };

    const handleDecline = () => {
        const declinedPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(declinedPreferences));
        setShowBanner(false);
        onAccept(declinedPreferences);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreferences({
            ...preferences,
            [e.target.name]: e.target.checked,
        });
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-5 shadow-lg flex flex-col items-center">
            <div>We use cookies to improve your experience. Customize your preferences:</div>
            <div className="flex flex-col my-3">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="necessary"
                        checked={preferences.necessary}
                        disabled
                        className="mr-2"
                    />
                    <label className="ml-2">Necessary (always active)</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="analytics"
                        checked={preferences.analytics}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <label className="ml-2">Analytics</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="marketing"
                        checked={preferences.marketing}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <label className="ml-2">Marketing</label>
                </div>
            </div>
            <div>
                <button
                    onClick={handleAccept}
                    className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-700"
                >
                    Accept
                </button>
                <button
                    onClick={handleDecline}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
