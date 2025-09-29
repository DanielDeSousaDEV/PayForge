import { usePage, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppCard from '@/components/AppCard';
import { Label } from '@/components/ui/label';
import { FormErro } from '@/components/FormErro';
import { LogOut, Power } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';

interface ProfileProps{
    carts: Cart[]
}

export default function Profile({carts}: ProfileProps) {
    const { user } = usePage().props;
    const [isEditable, setIsEditable] = useState(false);
    const isMobile = useMediaQuery('(max-width: 767px)');

    const {post, data, errors, setData, reset} = useForm({
        name: user?.name ?? '',
        email: user?.email ?? ''
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/profile')
    };

    const handleDeleteMe = () => {
        router.visit('/profile', {
            method: 'delete'
        })
    }

    const handleLogout = () => {
        router.visit('/logout')
    }

    return (
        <div className="container mx-auto max-w-4xl mb-8 p-4 min-h-screen space-y-4">

            <div className='flex items-center justify-between'>
                <h1 className="text-2xl font-semibold mb-2">Perfil</h1>

                <Button
                    size={isMobile ? 'icon' : 'default'}
                    onClick={handleLogout}
                >
                    {isMobile
                        ? <Power className="stroke-3"/>
                        : 'Deslogar'
                    }
                </Button>
            </div>

            <AppCard size="sm">
                <h2 className="text-xl font-semibold mb-2">Informações</h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className='space-y-2'>
                        <Label>Nome:</Label>
                        <Input
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            disabled={!isEditable}
                        />  
                        <FormErro>{errors.name}</FormErro>
                    </div>

                    <div className='space-y-2'>
                        <Label>Email:</Label>
                        <Input
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            disabled={!isEditable}
                        />  
                        <FormErro>{errors.email}</FormErro>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button
                            type="button"
                            variant={isEditable ? 'destructive' : 'secondary'}
                            onClick={() => {
                                setIsEditable((old) => !old);
                                if (isEditable) reset();
                            }}
                        >
                            {isEditable ? 'Cancelar' : 'Editar'}
                        </Button>

                        {isEditable && <Button type="submit">Salvar Alterações</Button>}
                    </div>
                </form>
            </AppCard>

            <div>
                <h1 className="text-2xl font-semibold mb-2">Carrinhos</h1>

                {carts.map(s => 
                    <>
                        {s.id} - {s.alredy_paid ? 'pago' : 'não pago'} / {s.created_at} <br />
                    </>
                )}
            </div>

            
            <h1 className="text-2xl font-semibold mb-2">Zona de risco</h1>
            <AppCard size="sm" className='bg-red-100 border-red-500 border-2'>
                <h2 className="text-xl font-semibold mb-2">Deletar Perfil</h2>

                <p className='lead'>
                    Esta ação não pode ser desfeita e ocasionará a exclusão permanente de todos os seus dados.
                </p>

                <div className='flex items-center justify-end'>
                    <Button variant='destructive' onClick={handleDeleteMe}>
                        Deletar perfil
                    </Button>
                </div>
            </AppCard>
        </div>
    );
}
