import { PagesWithLayout } from "@/types/inertia";
import { router, usePage } from "@inertiajs/react";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditSchema } from "@/schemas/Profile/ProfileEditSchema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppCard from "@/components/AppCard";

const user: User = {
  id: 1,
  name: "Daniel Sousa",
  email: "daniel@example.com",
  is_admin: false,
  created_at: new Date("2025-08-01T09:00:00")
}

const products: Product[] = [
  {
    id: 1,
    img_url: "/products/tenis.jpg",
    name: "Tênis Esportivo",
    description: "Tênis leve para corridas.",
    price: 199.9,
    created_at: new Date("2025-08-01T10:00:00")
  },
  {
    id: 2,
    img_url: "/products/fone.jpg",
    name: "Fone Bluetooth",
    description: "Fone sem fio com cancelamento de ruído.",
    price: 249.0,
    created_at: new Date("2025-08-02T14:30:00")
  },
  {
    id: 3,
    img_url: "/products/mochila.jpg",
    name: "Mochila Executiva",
    description: "Mochila com compartimento para notebook.",
    price: 179.9,
    created_at: new Date("2025-08-03T11:15:00")
  }
]

const carts: Cart[] = [
  {
    id: 1,
    user,
    total_value: 20,
    created_at: new Date("2025-08-05T10:00:00"),
    sales: [
      { quatity: 1, product: products[0] },
      { quatity: 2, product: products[1] }
    ]
  },
  {
    id: 2,
    user,
    total_value: 20,
    created_at: new Date("2025-08-06T16:45:00"),
    sales: [
      { quatity: 1, product: products[2] },
      { quatity: 1, product: products[1] }
    ]
  },
  {
    id: 3,
    user,
    total_value: 20,
    created_at: new Date("2025-08-07T12:30:00"),
    sales: [
      { quatity: 3, product: products[0] }
    ]
  }
]


const Profile: PagesWithLayout = () => {
    const {user} = usePage().props

    const [isEditable, setIsEditable] = useState(false)
    const form = useForm({
        resolver: zodResolver(ProfileEditSchema),
        defaultValues: {
            name: '',
            email: ''
        }
    })

    function onSubmit(data: z.infer<typeof ProfileEditSchema>) {
        // router.post('profile.update', data)
    }

    function handleFormButtonClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setIsEditable(old => !old)
        if (isEditable) {
            form.reset()
        }
    }

    return (
        <div className="container mx-auto max-w-4xl mb-4 p-4 min-h-screen space-y-4">
            <div>
                <h1 className="text-2xl font-semibold mb-2">
                    Perfil
                </h1>

                <AppCard size='sm'>
                    <h1 className="text-xl font-semibold mb-2">
                        Informações
                    </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="Jhon doe" 
                                                disabled={!isEditable}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                                placeholder="jhonDoe@example.com" 
                                                disabled={!isEditable}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-end gap-4">
                                <Button 
                                    type="button"
                                    onClick={handleFormButtonClick}
                                    variant={isEditable ? 'destructive' : 'secondary'}
                                >
                                    {isEditable ? 'Cancelar' : 'Editar'}
                                </Button>

                                {isEditable && (
                                    <Button 
                                        type="submit" 
                                    >
                                        Salvar Alterações
                                    </Button>
                                )}
                            </div>
                            
                        </form>
                    </Form>
                </AppCard>
            </div>

            {/* 
            <AppCard size='sm'>
                <h1 className="text-xl font-semibold mb-2">
                    Ultimas compras
                </h1>
            </AppCard> 

            Queria fazer isso porém to sem nenhuma ideia de design

            */}


        </div>
    )
}

export default Profile