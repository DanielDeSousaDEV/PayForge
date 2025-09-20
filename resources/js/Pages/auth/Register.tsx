import AppCard from "@/components/AppCard"
import { FormErro } from "@/components/FormErro"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoginLayout from "@/layouts/LoginLayout"
import { PagesWithLayout } from "@/types/inertia"
import { Link, useForm } from "@inertiajs/react"
import { Label } from "@radix-ui/react-label"
import { Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"

const Register: PagesWithLayout = () => {

    const [showPassword, setShowPassword] = useState(false)

    const {errors, data, setData, post} = useForm({
        password: '',
        name: '',
        email: ''
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/register')
    }

    return (
        <AppCard>
            <h1 className="font-heading font-semibold text-xl text-center">
                Register
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="space-y-2 mb-3">
                    <div className="space-y-1">
                        <Label>Nome:</Label>
                        <Input
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />  
                        <FormErro>{errors.name}</FormErro>
                    </div>
                    <div className="space-y-1">
                        <Label>Emal:</Label>
                        <Input
                            value={data.email}
                            type="email"
                            onChange={e => setData('email', e.target.value)}
                        />  
                        <FormErro>{errors.email}</FormErro>
                    </div>
                    <div className="space-y-1">
                        <Label>Senha:</Label>
                        <div className="relative">
                            <Input
                                value={data.password}
                                type={showPassword ? 'text' : 'password'}
                                onChange={e => setData('password', e.target.value)}
                            />  

                            <Button 
                                size='icon' 
                                variant='ghost' 
                                className="absolute top-1/2 right-0 -translate-y-1/2 bg-transparent hover:bg-transparent"
                                type='button'
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword 
                                    ? <Eye/>
                                    : <EyeOff/>
                                }
                            </Button>
                        </div>  
                        <FormErro>{errors.password}</FormErro>
                    </div>
                </div>
                
                <Button size='full' type="submit">
                    Registrar-se
                </Button>

            </form>

            <p className="text-center leading-tight text-xs">
                Já possui uma conta? <br />
                <Link href='/login' className="text-blue-700 underline visited:text-purple-800">
                    faça login
                </Link>
            </p>
        </AppCard>
    )
}

Register.layout = (page) => <LoginLayout children={page}/>

export default Register