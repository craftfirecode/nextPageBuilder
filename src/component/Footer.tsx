import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t text-black p-4 mt-5">
            <div className="container mx-auto">
                <Link href="/impressum">Impressum</Link>
                <Link href="/datenschutz">Datenschutz</Link>
            </div>
        </footer>
    );
};

export default Footer;