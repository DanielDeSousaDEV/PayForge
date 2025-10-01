import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { router, useForm } from "@inertiajs/react";
import { DialogProps } from "@radix-ui/react-dialog";
import { FormEvent } from "react";
import { FormErro } from "../FormErro";
import { Box } from "lucide-react";

interface AddProductToCartModalProps extends DialogProps {
    product: Product;
}

export function AddProductToCartModal({
    open,
    onOpenChange,
    product,
}: AddProductToCartModalProps) {
    const form = useForm({
        quantity: 0,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        form.post(`/cart/${product.id}/add`);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-[var(--color-surface)] rounded-xl shadow-lg p-6">
                <DialogHeader className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Box className="size-5 text-[var(--color-primary)]" />{" "}
                        <DialogTitle className="text-lg font-semibold text-[var(--color-text)]">
                            Selecione a quantidade
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-[var(--color-text-muted)]">
                        Preencha o campo abaixo.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid gap-3">
                        <Label htmlFor="quantity">Quantidade</Label>
                        <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            step={1}
                            value={form.data.quantity}
                            onChange={(e) =>
                                form.setData(
                                    "quantity",
                                    Number(e.target.value ?? 0)
                                )
                            }
                            className="text-[var(--color-text)]"
                        />
                        <FormErro>{form.errors.quantity}</FormErro>
                    </div>

                    <DialogFooter className="flex justify-end gap-3 mt-4">
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
                            className="bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition"
                        >
                            Adicionar ao carrinho
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
