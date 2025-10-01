import AppCard from "@/components/AppCard";
import { FormErro } from "@/components/FormErro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginLayout from "@/layouts/LoginLayout";
import { PagesWithLayout } from "@/types/inertia";
import { Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";

const Register: PagesWithLayout = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { errors, data, setData, post } = useForm({
        password: "",
        name: "",
        email: "",
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post("/register");
    }

    return (
        <div className="min-h-[600px] w-full flex justify-center items-center bg-[var(--color-background)] p-4 relative">
            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row bg-[var(--color-surface)] rounded-xl overflow-hidden shadow-lg">
                <div className="w-full md:w-1/2 p-8 min-h-[400px]">
                    <h1 className="font-heading font-semibold text-3xl text-[var(--color-text)] mb-6 text-center">
                        Crie sua conta
                    </h1>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="space-y-4 mb-6">
                            <div className="space-y-1">
                                <Label>Nome:</Label>
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <FormErro>{errors.name}</FormErro>
                            </div>

                            <div className="space-y-1">
                                <Label>Email:</Label>
                                <Input
                                    value={data.email}
                                    type="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <FormErro>{errors.email}</FormErro>
                            </div>

                            <div className="space-y-1">
                                <Label>Senha:</Label>
                                <div className="relative">
                                    <Input
                                        value={data.password}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-transparent hover:bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                                    >
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </Button>
                                </div>
                                <FormErro>{errors.password}</FormErro>
                            </div>
                        </div>

                        <Button
                            size="full"
                            type="submit"
                            className="mb-4 bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition-colors"
                        >
                            Registrar-se
                        </Button>
                    </form>

                    <p className="text-center leading-tight text-xs text-[var(--color-text-muted)]">
                        Já possui uma conta? <br />
                        <Link
                            href="/login"
                            className="text-[var(--color-primary)] underline visited:text-[var(--color-quarter)]"
                        >
                            Faça login
                        </Link>
                    </p>
                </div>

                <div className="w-full md:w-1/2 p-8 bg-[var(--color-primary)] flex flex-col justify-center items-center text-center text-[var(--color-background)]">
                    <h2 className="text-3xl font-bold mb-4">
                        Junte-se ao PayForge
                    </h2>
                    <p className="text-md mb-6">
                        Cadastre-se agora e comece a aproveitar os benefícios da
                        nossa plataforma. Tenha acesso rápido, seguro e completo
                        às melhores oportunidades do e-commerce moderno.
                    </p>
                    <p className="text-sm italic">
                        "Aqui começa a sua jornada para um futuro digital mais
                        ágil, prático e lucrativo."
                    </p>
                </div>
            </div>
        </div>
    );
};

Register.layout = (page) => <LoginLayout children={page} />;

export default Register;
