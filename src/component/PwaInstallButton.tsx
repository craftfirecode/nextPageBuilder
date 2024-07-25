import { useEffect, useState } from 'react';

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }

    interface BeforeInstallPromptEvent extends Event {
        readonly platforms: Array<string>;
        readonly userChoice: Promise<{
            outcome: 'accepted' | 'dismissed',
            platform: string
        }>;
        prompt(): Promise<void>;
    }
}

const PwaInstallButton = () => {
    const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setInstallEvent(e);
        });

        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
        });
    }, []);

    const installPwa = () => {
        if (!installEvent) return;
        installEvent.prompt();
        installEvent.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Benutzer akzeptierte die A2HS-Eingabeaufforderung');
            } else {
                console.log('Benutzer lehnte die A2HS-Eingabeaufforderung ab');
            }
            setInstallEvent(null);
        });
    };

    if (isInstalled) return <p>Die App ist bereits installiert</p>;
    if (!installEvent) return null;
    return <button onClick={installPwa}>Installieren</button>;
};

export default PwaInstallButton;