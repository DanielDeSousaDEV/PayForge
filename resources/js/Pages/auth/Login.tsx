import AppCard from "@/components/AppCard"
import { Button } from "@/components/ui/button"
import LoginLayout from "@/layouts/LoginLayout"
import { PagesWithLayout } from "@/types/inertia"
import { Link } from "@inertiajs/react"

const Login: PagesWithLayout = () => {
    return (
        <AppCard>
            <h1 className="font-heading font-semibold text-xl text-center">
                Login
            </h1>

            <div>
                <div className="space-y-2 mb-3">
                    inputs
                </div>
                <Button size='full'>
                    Logar-se
                </Button>
            </div>

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