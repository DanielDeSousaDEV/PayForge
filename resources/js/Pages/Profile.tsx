import { usePage, router, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/AppCard";
import { Label } from "@/components/ui/label";
import { FormErro } from "@/components/FormErro";
import {
    AlertCircle,
    Check,
    CheckCircle,
    Mail,
    Power,
    ShoppingCart,
    Trash2,
    User,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

interface ProfileProps {
    carts: Cart[];
}

export default function Profile({ carts }: ProfileProps) {
    const { user } = usePage().props;
    const [isEditable, setIsEditable] = useState(false);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const { post, data, errors, setData, reset } = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post("/profile");
    };

    const handleDeleteMe = () => {
        router.visit("/profile", {
            method: "delete",
        });
    };

    const handleLogout = () => {
        router.visit("/logout");
    };

    return (
        <div className="container mx-auto max-w-4xl mb-8 p-4 min-h-screen space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] flex items-center gap-2">
                    <User className="size-5 text-[var(--color-primary)]" />
                    Perfil
                </h1>

                <Button
                    size={isMobile ? "icon" : "default"}
                    className="bg-[var(--color-primary)] text-white 
               hover:
               shadow-md rounded-lg 
               flex items-center gap-2 px-4 py-2 
               transition-all duration-200 
               hover:scale-105 active:scale-95"
                    onClick={handleLogout}
                >
                    <Power className="size-4" />
                    {!isMobile && "Deslogar"}
                </Button>
            </div>

            <AppCard
                size="sm"
                className="p-6 bg-[var(--color-surface)] shadow-md rounded-xl"
            >
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <User className="size-5 text-[var(--color-primary)]" />
                    Informações
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nome:</Label>
                        <div className="relative">
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                disabled={!isEditable}
                                className={`${
                                    !isEditable
                                        ? "bg-[var(--color-background)] cursor-not-allowed"
                                        : ""
                                } pl-10`}
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                        </div>
                        <FormErro>{errors.name}</FormErro>
                    </div>

                    <div className="space-y-2">
                        <Label>Email:</Label>
                        <div className="relative">
                            <Input
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                disabled={!isEditable}
                                className={`${
                                    !isEditable
                                        ? "bg-[var(--color-background)] cursor-not-allowed"
                                        : ""
                                } pl-10`}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                        </div>
                        <FormErro>{errors.email}</FormErro>
                    </div>

                    <div className="flex gap-3 justify-end mt-4">
                        <Button
                            type="button"
                            variant={isEditable ? "destructive" : "secondary"}
                            className="bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition"
                            onClick={() => {
                                setIsEditable((old) => !old);
                                if (isEditable) reset();
                            }}
                        >
                            {isEditable ? "Cancelar" : "Editar"}
                        </Button>

                        {isEditable && (
                            <Button
                                type="submit"
                                className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-all shadow-md rounded-lg flex items-center gap-2"
                            >
                                <Check className="size-4" />
                                Salvar Alterações
                            </Button>
                        )}
                    </div>
                </form>
            </AppCard>
            <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <ShoppingCart className="size-5 text-[var(--color-primary)]" />
                    Carrinhos
                </h2>

                {carts.length > 0 ? (
                    <ul className="space-y-3">
                        {carts.map((s) => (
                            <li
                                key={s.id}
                                className="flex justify-between items-center p-4 bg-[var(--color-surface)] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-[var(--color-background)]"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-[var(--color-text)]">
                                        #{s.id}
                                    </span>
                                    {s.alredy_paid ? (
                                        <span className="flex items-center gap-1 text-green-500 font-semibold">
                                            <CheckCircle className="size-4 stroke-green-500" />
                                            Pago
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-red-500 font-semibold">
                                            <AlertCircle className="size-4 stroke-red-500" />
                                            Não pago
                                        </span>
                                    )}
                                </div>
                                <span className="text-sm text-gray-400">
                                    {new Date(s.created_at).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 p-6 bg-[var(--color-surface)] rounded-lg shadow-sm">
                        <ShoppingCart className="size-12 stroke-gray-400" />
                        <p className="text-lg font-medium">
                            Você ainda não possui carrinhos.
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-4 flex items-center gap-2">
                    <AlertCircle className="size-5 text-red-600" />
                    Zona de risco
                </h2>

                <AppCard
                    size="sm"
                    className="bg-red-50 border-red-400 border-l-4 p-6 shadow-md flex flex-col gap-4"
                >
                    <div className="flex items-center gap-3">
                        <AlertCircle className="size-6 stroke-red-600" />
                        <h2 className="text-xl md:text-2xl font-semibold text-red-700">
                            Deletar Perfil
                        </h2>
                    </div>

                    <p className="text-sm text-red-800 leading-relaxed">
                        Esta ação <strong>não pode ser desfeita</strong> e
                        resultará na exclusão permanente de todos os seus dados.
                    </p>

                    <div className="flex justify-end">
                        <Button
                            variant="destructive"
                            className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 shadow-md transition-all rounded-lg px-4 py-2"
                            onClick={handleDeleteMe}
                        >
                            <Trash2 className="size-4 stroke-white" />
                            Deletar perfil
                        </Button>
                    </div>
                </AppCard>
            </div>
        </div>
    );
}
