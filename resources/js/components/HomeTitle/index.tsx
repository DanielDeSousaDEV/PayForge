import { ReactNode } from "react"

interface HomeTitleProps {
    children: ReactNode
}

export default function HomeTitle ({children}: HomeTitleProps) {
    return (
        <h3 className="font-heading text-xl md:text-2xl mb-2 md:mb-4">
            {children}
        </h3>
    )
}