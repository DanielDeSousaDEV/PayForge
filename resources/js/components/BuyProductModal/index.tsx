import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@inertiajs/react"
import { DialogProps } from "@radix-ui/react-dialog"
import { FormEvent } from "react"
import { FormErro } from "../FormErro"

interface BuyProductModalProps extends DialogProps {
    product: Product,
}

export function BuyProductModal({open, onOpenChange, product}: BuyProductModalProps) {
    const form = useForm({
        quantity: 0
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        form.post(`/product/${product.id}/buy`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Selecione a quantidade</DialogTitle>
                    <DialogDescription>
                        Preencha o campo abaixo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="quantity">Quantidade</Label>
                            <Input 
                                id="quantity" 
                                name="quantity" 
                                type='number'
                                step={1}
                                value={form.data.quantity}
                                onChange={(e) => form.setData('quantity', Number(e.target.value ?? 0))}
                            />
                            <FormErro>
                                {form.errors.quantity}
                            </FormErro>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Comprar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}