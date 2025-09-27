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
import { Checkbox } from "../ui/checkbox"

interface CreateUserModalProps extends DialogProps {
    open: boolean,
    onOpenChange: ((open: boolean) => void)
}

type CreateProductForm = {
    name: string,
    email: string,
    password: string,
    is_admin: boolean,
}

export function CreateUserModal({open, onOpenChange}: CreateUserModalProps) {
    const {data, errors, post, processing, setData} = useForm<CreateProductForm>({
        name: '',
        email: '',
        password: '',
        is_admin: false
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        post('/admin/users');

        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Criar usuário</DialogTitle>
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email" 
                                name="email"
                                type="email"
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                            />
                            <FormErro>{errors.email}</FormErro>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password" 
                                name="password"
                                type="password"
                                value={data.password} 
                                onChange={e => setData('password', e.target.value)}
                            />
                            <FormErro>{errors.password}</FormErro>
                        </div>
                        <div className="grid gap-3">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_admin" 
                                    name="is_admin"
                                    checked={data.is_admin}
                                    onCheckedChange={check => setData('is_admin', check ? true : false)}
                                />
                                <Label htmlFor="is_admin">Usuário Admin</Label>
                            </div>
                            <FormErro>{errors.is_admin}</FormErro>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>Criar usuário</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
