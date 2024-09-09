import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.scss";
import Nav from "@/component/Nav";
import ClientWrapper from "@/component/ClientWrapper";
import {cn} from "@/lib/utils";
import Footer from "@/component/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CRAFTFIRE",
    description: "React Blog und Portfolio",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="de">
        <body className={cn(inter.className, "container")}>
        <Nav/>
        <ClientWrapper>
            {children}
        </ClientWrapper>
        <Footer/>
        </body>
        </html>
    );
}
