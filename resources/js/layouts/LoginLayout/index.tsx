import { AppToast } from "@/components/AppToast"
import { ReactNode } from "react"

interface LoginLayoutProps {
    children: ReactNode
}

const LoginLayout = ({children}: LoginLayoutProps) => {
    return (
        <>
            <main className="h-screen flex items-center justify-center">
                <div className="container">
                    {children}
                </div>
            </main>

            <AppToast />
        </>
    )
}

export default LoginLayout