import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "@inertiajs/react";
import { Footer } from "@/components/Footer/Index";
import { AppToast } from "@/components/AppToast";

interface HomeLayoutProps {
    children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <main>
            <Navbar />

            {children}

            <Footer/>

            <AppToast />
        </main>
    )
}