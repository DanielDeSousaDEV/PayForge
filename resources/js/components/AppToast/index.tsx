import { FlashMessagesTypeEnum } from "@/enums/FlashMessagesTypes"
import { cn } from "@/lib/utils"
import { usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"

export function AppToast() {
    const { flash } = usePage().props
    const [visible, setVisible] = useState(false)
    const [animate, setAnimate] = useState<"in" | "out">("in")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (flash?.message) {
            setVisible(true)
            setAnimate("in")

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                setAnimate("out")
                // espera a animação terminar antes de desmontar
                setTimeout(() => setVisible(false), 300)
            }, 7000)
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [flash])

    if (!visible) return null

    let classes = '';

    switch (flash?.type) {
        case FlashMessagesTypeEnum.danger:
            classes = 'bg-danger text-gray-900'
            break;

        case FlashMessagesTypeEnum.error:
            classes = 'bg-red-300 text-gray-900'
            break;

        case FlashMessagesTypeEnum.success:
            classes = 'bg-primary text-gray-900'
            break;
            
        default:
            classes = 'bg-gray-300 text-gray-900'
            break;
    }

    return (
        <div
            className={`
                fixed bottom-4 right-4 p-3 rounded-lg shadow-lg
                ${classes}
                ${animate === "in" ? "animate-fade-in" : "animate-fade-out"}
            `}
        >
                {flash?.message}
        </div>
    )
}
