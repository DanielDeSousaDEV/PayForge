import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface HomeLayoutProps {
    children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <main>
            <Navbar />

            {children}

            <footer className="bg-tertiary">
                <div className="container mx-auto grid grid-cols-8 py-4 px-2">
                    <div>
                        <h4 className="text-2xl font-semibold font-heading text-gray-100 mb-2">PayForge</h4>   
                        <p className="text-sm">Produzido por {' '}
                            <a className="text-blue-400 underline visited:text-purple-400" href="https://github.com/DanielDeSousaDEV">
                                Daniel De Sousa
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}