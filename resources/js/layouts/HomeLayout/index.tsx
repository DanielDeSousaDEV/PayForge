import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "@inertiajs/react";

interface HomeLayoutProps {
    children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <main>
            <Navbar />

            {children}

            <footer className="bg-tertiary">
                <div className="container mx-auto grid grid-cols-4 py-4 px-2">
                    <div className="col-span-2">
                        <h4 className="text-2xl font-semibold font-heading text-gray-100 mb-2">PayForge</h4>   
                        <p className="text-sm text-gray-100">Produzido por {' '}
                            <a className="text-blue-400 underline visited:text-purple-400" href="https://github.com/DanielDeSousaDEV">
                                Daniel De Sousa
                            </a>
                        </p>
                    </div>

                    <div >
                        <div className="flex flex-col leading-relaxed">
                            <Link href="/" className="text-gray-100 visited:text-gray-300">
                                Home
                            </Link>
                            <Link href="/profile" className="text-gray-100 visited:text-gray-300">
                                Profile
                            </Link>
                            <Link href="/Cart" className="text-gray-100 visited:text-gray-300">
                                Cart
                            </Link>
                        </div>
                    </div>
                    <div >
                        <div className="flex flex-col leading-relaxed">
                            <a href="https://github.com/DanielDeSousaDEV" className="text-gray-100 visited:text-gray-300">
                                Github
                            </a>
                            <a href="https://www.linkedin.com/in/daniel-de-sousa-257275314/" className="text-gray-100 visited:text-gray-300">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}