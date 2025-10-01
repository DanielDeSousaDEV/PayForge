import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "peer block w-full rounded-md border bg-[var(--color-surface)] px-3 pt-2 pb-2 text-sm text-[var(--color-text)] placeholder-transparent",
                "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:outline-none",
                "dark:border-[var(--color-border)] dark:text-[var(--color-text)] dark:focus:border-[var(--color-primary)]",
                className
            )}
            {...props}
        />
    );
}

export { Input };
