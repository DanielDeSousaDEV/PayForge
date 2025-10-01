"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "transform text-sm text-[var(--color-text-muted)] transition-all duration-200",
        "peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100",
        "peer-focus:-translate-y-1.5 peer-focus:scale-75 peer-focus:text-[var(--color-primary)]",
        "dark:text-[var(--color-text-muted)] peer-focus:dark:text-[var(--color-primary)]",
        className
      )}
      {...props}
    />
  );
}

export { Label };
