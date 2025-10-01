import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div
            data-slot="table-container"
            className="relative w-full overflow-x-auto rounded-lg shadow-sm bg-[var(--color-surface)]"
        >
            <table
                data-slot="table"
                className={cn(
                    "w-full caption-bottom text-sm border-separate border-spacing-0 text-[var(--color-background)]",
                    className
                )}
                {...props}
            />
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn(
                "bg-[var(--color-surface)] [&_tr]:border-b [&_tr]:border-[var(--color-background)]",
                className
            )}
            {...props}
        />
    );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn(
                "[&_tr:nth-child(even)]:bg-[var(--color-background)/10] hover:[&_tr]:bg-[var(--color-background)/20] transition-colors",
                className
            )}
            {...props}
        />
    );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn(
                "bg-[var(--color-surface)] border-t font-medium [&>tr]:last:border-b-0",
                className
            )}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "transition-colors hover:bg-[var(--color-background)/20]",
                className
            )}
            {...props}
        />
    );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "text-left font-semibold h-12 px-4 align-middle whitespace-nowrap",
                className
            )}
            {...props}
        />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                "px-4 py-3 align-middle whitespace-nowrap",
                className
            )}
            {...props}
        />
    );
}

function TableCaption({
    className,
    ...props
}: React.ComponentProps<"caption">) {
    return (
        <caption
            data-slot="table-caption"
            className={cn(
                "text-sm text-[var(--color-background)/70] mt-3 text-center",
                className
            )}
            {...props}
        />
    );
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
