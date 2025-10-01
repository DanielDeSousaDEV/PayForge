import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HomeTitleProps {
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function HomeTitle({ icon, children, className }: HomeTitleProps) {
  return (
    <h3
      className={cn(
        "font-heading text-xl md:text-2xl mb-2 md:mb-4 flex items-center gap-2 text-gray-100",
        className
      )}
    >
      <span className="text-primary">{icon}</span>
      {children}
    </h3>
  )
}
