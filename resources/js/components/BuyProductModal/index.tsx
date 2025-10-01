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
import { useForm } from "@inertiajs/react";
import { DialogProps } from "@radix-ui/react-dialog";
import { FormEvent } from "react";
import { FormErro } from "../FormErro";
import { ShoppingCart } from "lucide-react";

interface BuyProductModalProps extends DialogProps {
    product: Product;
}

export function BuyProductModal({
    open,
    onOpenChange,
    product,
}: BuyProductModalProps) {
    const form = useForm({
        quantity: 0,
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        form.post(`/product/${product.id}/buy`);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
                        Selecione a quantidade
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[var(--color-text-muted)]">
                        Preencha o campo abaixo antes de adicionar ao carrinho.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
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
                            className="text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
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
                            <ShoppingCart className="w-4 h-4" /> Comprar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
