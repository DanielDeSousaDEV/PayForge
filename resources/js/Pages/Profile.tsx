import { usePage, router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { useForm as useRHFForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileEditSchema } from '@/schemas/Profile/ProfileEditSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppCard from '@/components/AppCard';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { FormErro } from '@/components/FormErro';

type ProfileFormData = z.infer<typeof ProfileEditSchema>;

export default function Profile() {
    const { user } = usePage().props;
    const [isEditable, setIsEditable] = useState(false);

    const {post, data, errors, setData, reset} = useForm({
        name: user?.name ?? '',
        email: user?.email ?? ''
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/profile')
    };

    return (
        <div className="container mx-auto max-w-4xl mb-4 p-4 min-h-screen space-y-4">

            <h1 className="text-2xl font-semibold mb-2">Perfil</h1>

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
        </div>
    );
}
