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
import { tw } from "twind";

const Login: PagesWithLayout = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { post, processing, setData, errors, data } = useForm({
        email: "",
        password: "",
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post("/login");
    }

    return (
        <div className="min-h-[600px] w-full flex justify-center items-center bg-[var(--color-background)] p-4">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 p-8 min-h-[400px]">
                    <h1 className="font-heading font-semibold text-3xl text-[var(--color-text)] mb-6 text-center">
                        Bem-vindo de volta!
                    </h1>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="relative z-0 w-full mb-5 group">
                            <Label>Email:</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <FormErro>{errors.email}</FormErro>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <Label>Senha:</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
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

                        <Button
                            size="full"
                            disabled={processing}
                            className="mb-4 bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition-colors"
                        >
                            Logar-se
                        </Button>
                    </form>

                    <p className="text-center leading-tight text-xs text-[var(--color-text-muted)]">
                        Não possui uma conta? <br />
                        <Link
                            href="/register"
                            className="text-[var(--color-primary)] underline visited:text-[var(--color-quarter)]"
                        >
                            Se cadastre
                        </Link>
                    </p>
                </div>

                <div className="w-full md:w-1/2 p-8 bg-[var(--color-primary)] flex flex-col justify-center items-center text-center text-[var(--color-background)]">
                    <h2 className="text-3xl font-bold mb-4">
                        Bem-vindo ao PayForge!
                    </h2>
                    <p className="text-md mb-6">
                        Faça suas compras com facilidade e segurança. Descubra
                        produtos incríveis, acompanhe ofertas exclusivas e
                        aproveite uma experiência de compra ágil e moderna.
                    </p>
                    <p className="text-sm italic">
                        "O seu e-commerce premium, rápido, seguro e intuitivo —
                        tudo ao seu alcance!"
                    </p>
                </div>
            </div>
        </div>
    );
};

Login.layout = (page) => <LoginLayout children={page} />;

export default Login;
