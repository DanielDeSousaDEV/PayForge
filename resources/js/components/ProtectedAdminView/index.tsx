import {usePage} from "@inertiajs/react"
import { ReactNode } from "react";

interface ProtectedAdminViewProps {
    children: ReactNode
}

export function ProtectedAdminView({children}: ProtectedAdminViewProps) {
    const isAdmin = usePage().props.user?.is_admin ?? false

    if (!isAdmin) return null;

    return <>{children}</>
}