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
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useForm } from "@inertiajs/react"
import { FormErro } from "../FormErro"
import { DialogProps } from "@radix-ui/react-dialog"
import { FormEvent } from "react"

interface CreateProductModalProps extends DialogProps {
    open: boolean,
    onOpenChange: ((open: boolean) => void)
}

type CreateProductForm = {
    name: string,
    price: number,
    preview_image: File | null,
    images: File[],
    description: string,
}

export function CreateProductModal({open, onOpenChange}: CreateProductModalProps) {
    const {data, errors, post, processing, setData} = useForm<CreateProductForm>({
        name: '',
        price: 0,
        preview_image: null,
        images: [],
        description: '',
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        post('/admin/products', {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Criar produto</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name" 
                                name="name"
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                            />
                            <FormErro>{errors.name}</FormErro>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="price">Preço</Label>
                            <Input 
                                id="price" 
                                type="number" 
                                step={0.01} 
                                name="price" 
                                value={data.price} 
                                min={0.01}
                                onChange={e => setData('price', Number(e.target.value ?? 0))}
                            />
                            <FormErro>{errors.price}</FormErro>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="preview_image">Imagem de miniatura</Label>
                            <Input 
                                id="preview_image" 
                                type="file" 
                                name="preview_image" 
                                accept="image/png,image/jpeg"
                                onChange={e => setData('preview_image', e.target.files?.[0] ?? null)}
                            />
                            <FormErro>{errors.preview_image}</FormErro>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="images">Imagens</Label>
                            <Input 
                                id="images" 
                                type="file" 
                                name="images" 
                                accept="image/png,image/jpeg"
                                multiple
                                onChange={e => setData('images', e.target.files ? Array.from(e.target.files) : [])}
                            />
                            <FormErro>{errors.images}</FormErro> // fazer o text
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea 
                                id="description" 
                                name="description" 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                            />
                            <FormErro>{errors.description}</FormErro>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>Criar produto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
