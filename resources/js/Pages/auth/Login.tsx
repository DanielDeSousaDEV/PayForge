import AppCard from "@/components/AppCard"
import { FormErro } from "@/components/FormErro"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginLayout from "@/layouts/LoginLayout"
import { PagesWithLayout } from "@/types/inertia"
import { Link, useForm } from "@inertiajs/react"
import { FormEvent } from "react"

const Login: PagesWithLayout = () => {
    const {post, processing, setData, errors, data} = useForm({
        email: '',
        password: '',
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        post('/login')
    }

    return (
        <AppCard>
            <h1 className="font-heading font-semibold text-xl text-center">
                Login
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="space-y-2 mb-3">
                    <div className="space-y-1">
                        <Label>Email:</Label>
                        <Input
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />  
                        <FormErro>{errors.email}</FormErro>
                    </div>
                    <div className="space-y-1">
                        <Label>Password:</Label>
                        <Input
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />  
                        <FormErro>{errors.password}</FormErro>
                    </div>
                </div>
                <Button size='full' disabled={processing}>
                    Logar-se
                </Button>
            </form>

            <p className="text-center leading-tight text-xs">
                Não possui uma conta? <br />
                <Link href='/register' className="text-blue-700 underline visited:text-purple-800">
                    Se cadastre
                </Link>
            </p>
        </AppCard>
    )
}

Login.layout = (page) => <LoginLayout children={page}/>

export default Login