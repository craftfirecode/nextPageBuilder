import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-black text-black mt-5">
            <div className="py-5 items-center flex gap-2">
                <Link className="navPill" href="/impressum">Impressum</Link>
                <div>&</div>
                <Link className="navPill" href="/datenschutz">Datenschutz</Link>
            </div>
        </footer>
    );
};

export default Footer;