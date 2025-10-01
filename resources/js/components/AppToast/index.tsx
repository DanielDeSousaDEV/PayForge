import { FlashMessagesTypeEnum } from "@/enums/FlashMessagesTypes"
import { usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

export function AppToast() {
    const { flash } = usePage().props
    const [visible, setVisible] = useState(false)
    const [animate, setAnimate] = useState<"in" | "out">("in")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const isError = flash?.type === FlashMessagesTypeEnum.error 
        || flash?.type === FlashMessagesTypeEnum.danger;

    useEffect(() => {
        if (flash?.message) {
            setVisible(true)
            setAnimate("in")

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setAnimate("out")
                // espera a animação terminar antes de desmontar
                setTimeout(() => setVisible(false), 300)
            }, 10000000000)
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [flash])

    if (!visible) return null

    return (
        <Alert
            className={`
                fixed bottom-4 right-4 max-w-xs md:max-w-sm
                ${animate === "in" ? "animate-fade-in" : "animate-fade-out"}
            `}
            variant={isError ? 'destructive' : 'default'}
        >
            <AlertTitle>{isError ? 'Erro' : 'Sucesso'}</AlertTitle>
            <AlertDescription>{flash?.message}</AlertDescription>
        </Alert>
    )
}
