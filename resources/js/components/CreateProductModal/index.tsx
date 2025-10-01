import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "@inertiajs/react";
import { FormErro } from "../FormErro";
import { DialogProps } from "@radix-ui/react-dialog";
import { FormEvent } from "react";

interface CreateProductModalProps extends DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type CreateProductForm = {
    name: string;
    price: number;
    preview_image: File | null;
    images: File[];
    description: string;
};

export function CreateProductModal({
    open,
    onOpenChange,
}: CreateProductModalProps) {
    const { data, errors, post, processing, setData } =
        useForm<CreateProductForm>({
            name: "",
            price: 0,
            preview_image: null,
            images: [],
            description: "",
        });

    // Padronizando o texto de erro do images
    const imagesError = Object.entries(errors).find(([key]) =>
        key.startsWith("images.")
    )?.[1];

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        post("/admin/products", {
            onSuccess: () => {
                onOpenChange(false);
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-100">
                        Criar Produto
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Preencha os dados abaixo para adicionar um novo produto.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 grid gap-5">
                    <div className="grid gap-1">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Ex: Tenis Esportivo"
                            className="focus:ring-primary focus:border-primary transition-all"
                        />
                        <FormErro>{errors.name}</FormErro>
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                            id="price"
                            type="number"
                            step={0.01}
                            min={0.01}
                            name="price"
                            value={data.price}
                            onChange={(e) =>
                                setData("price", Number(e.target.value ?? 0))
                            }
                            placeholder="Ex: 199.90"
                            className="focus:ring-primary focus:border-primary transition-all"
                        />
                        <FormErro>{errors.price}</FormErro>
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="preview_image">
                            Imagem de Miniatura
                        </Label>
                        <Input
                            id="preview_image"
                            type="file"
                            name="preview_image"
                            accept="image/png,image/jpeg"
                            onChange={(e) =>
                                setData(
                                    "preview_image",
                                    e.target.files?.[0] ?? null
                                )
                            }
                            className="cursor-pointer focus:ring-primary focus:border-primary transition-all"
                        />
                        <FormErro>{errors.preview_image}</FormErro>
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="images">Imagens do Produto</Label>
                        <Input
                            id="images"
                            type="file"
                            name="images"
                            multiple
                            accept="image/png,image/jpeg"
                            onChange={(e) =>
                                setData(
                                    "images",
                                    e.target.files
                                        ? Array.from(e.target.files)
                                        : []
                                )
                            }
                            className="cursor-pointer focus:ring-primary focus:border-primary transition-all"
                        />
                        <FormErro>{imagesError}</FormErro>
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Escreva uma descrição atraente para o produto"
                            className="focus:ring-primary focus:border-primary transition-all resize-none"
                            rows={4}
                        />
                        <FormErro>{errors.description}</FormErro>
                    </div>

                    <DialogFooter className="mt-4 flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="border-gray-500 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition"
                            >
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition"
                        >
                            Criar Produto
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
