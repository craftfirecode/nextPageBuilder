import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t text-black mt-5">
            <div className="py-5 flex gap-2">
                <Link className="hover:underline" href="/impressum">Impressum</Link>
                <div>&</div>
                <Link className="hover:underline" href="/datenschutz">Datenschutz</Link>
            </div>
        </footer>
    );
};

export default Footer;