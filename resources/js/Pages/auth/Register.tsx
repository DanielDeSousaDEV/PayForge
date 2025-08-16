import AppCard from "@/components/AppCard"
import { Button } from "@/components/ui/button"
import LoginLayout from "@/layouts/LoginLayout"
import { PagesWithLayout } from "@/types/inertia"
import { Link } from "@inertiajs/react"

const Register: PagesWithLayout = () => {
    return (
        <AppCard>
            <h1 className="font-heading font-semibold text-xl text-center">
                Register
            </h1>

            <div>
                <div className="space-y-2 mb-3">
                    inputs
                </div>
                <Button size='full'>
                    Registrar-se
                </Button>

            </div>

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