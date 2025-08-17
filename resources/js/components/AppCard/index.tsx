import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes, HtmlHTMLAttributes, ReactNode } from "react"

const appCardVariants = cva(
  "bg-white shadow-xl space-y-3 rounded-lg",
  {
    variants: {
      size: {
        default: "p-4 md:p-8",
        sm: "p-2 md:p-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type AppCardProps = {
    children: ReactNode,
    className?: string
} & VariantProps<typeof appCardVariants>
  & HTMLAttributes<HTMLDivElement>

export default function AppCard ({children, size, className, ...props}: AppCardProps) {
    return (
        <div className={cn(appCardVariants({ size, className }))} {...props}>
            {children}
        </div>
    )
}