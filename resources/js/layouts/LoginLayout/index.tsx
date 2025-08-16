import { ReactNode } from "react"

interface LoginLayoutProps {
    children: ReactNode
}

const LoginLayout = ({children}: LoginLayoutProps) => {
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="container mx-auto max-w-xl">
                {children}
            </div>
        </main>
    )
}

export default LoginLayout