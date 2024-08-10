import React, { useState, useEffect } from 'react';

interface Preferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

interface CookieBannerProps {
    onAccept: (preferences: Preferences) => void;
}

const translations = {
    en: {
        message: "We use cookies to improve your experience. Customize your preferences:",
        necessary: "Necessary (always active)",
        analytics: "Analytics",
        marketing: "Marketing",
        accept: "Accept",
        decline: "Decline",
    },
    de: {
        message: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Passen Sie Ihre Einstellungen an:",
        necessary: "Notwendig (immer aktiv)",
        analytics: "Analytik",
        marketing: "Marketing",
        accept: "Akzeptieren",
        decline: "Ablehnen",
    },
    fr: {
        message: "Nous utilisons des cookies pour améliorer votre expérience. Personnalisez vos préférences :",
        necessary: "Nécessaire (toujours actif)",
        analytics: "Analytique",
        marketing: "Marketing",
        accept: "Accepter",
        decline: "Refuser",
    },
};

const flagImages = {
    en: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg", // USA Flag for English
    de: "https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg", // Germany Flag for German
    fr: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg", // France Flag for French
};

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
    const [showBanner, setShowBanner] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });
    const [language, setLanguage] = useState<'en' | 'de' | 'fr'>('de');

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

    const handleLanguageChange = (lang: 'en' | 'de' | 'fr') => {
        setLanguage(lang);
    };

    if (!showBanner) {
        return null;
    }

    const t = translations[language];

    return (
        <div className="fixed bottom-0 left-0 border-t right-0 bg-white p-5 shadow-lg flex flex-col items-center">
            <div>{t.message}</div>
            <div className="flex flex-col my-3">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="necessary"
                        checked={preferences.necessary}
                        disabled
                        className="mr-2"
                    />
                    <label className="ml-2">{t.necessary}</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="analytics"
                        checked={preferences.analytics}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <label className="ml-2">{t.analytics}</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="marketing"
                        checked={preferences.marketing}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <label className="ml-2">{t.marketing}</label>
                </div>
            </div>
            <div>
                <button
                    onClick={handleAccept}
                    className="bg-blue-500 text-white py-2 px-4 mr-2 rounded hover:bg-blue-700"
                >
                    {t.accept}
                </button>
                <button
                    onClick={handleDecline}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    {t.decline}
                </button>
            </div>
            <div className="mt-3 flex items-center">
                {/*<span className="mr-2">Language:</span>*/}
                {Object.entries(flagImages).map(([lang, flagUrl]) => (
                    <img
                        key={lang}
                        src={flagUrl}
                        alt={lang}
                        onClick={() => handleLanguageChange(lang as 'en' | 'de' | 'fr')}
                        className={`cursor-pointer w-8 h-5 mx-1 ${language === lang ? 'border-2 border-blue-500' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CookieBanner;
