interface FormErroProps {
    children?: string | null
}

export function FormErro({children}: FormErroProps) {
    if (!children) null;

    return (
        <p className="text-red-400 text-sm">
            {children}
        </p>
    )
}