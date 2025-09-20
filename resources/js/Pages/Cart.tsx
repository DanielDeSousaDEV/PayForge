import AppCard from "@/components/AppCard"
import HomeTitle from "@/components/HomeTitle"
import { Button } from "@/components/ui/button"
import HomeLayout from "@/layouts/HomeLayout"
import { PagesWithLayout } from "@/types/inertia"
import { usePage } from "@inertiajs/react"

interface CartProps {
    cart?: Cart
}

const Cart: PagesWithLayout<CartProps> = ({cart}) => {    
    console.log(cart);
    

    return (
        <div className="container mx-auto mb-4 p-4 min-h-screen">
            <HomeTitle>Produtos no carrinho</HomeTitle>

            <h2>Produtos em alta:</h2>
            <AppCard size='sm' className="grid md:grid-cols-6 gap-2 md:gap-4 w-full max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto overflow-hidden">
                <div className="h-full col-span-2">
                    <img src="/products/tenis.jpg" alt="Foto do produto" className="h-full w-full object-cover rounded-lg" />
                </div>
                <div className="md:col-span-4 flex flex-col items-start space-y-2 md:space-y-4">
                    <strong className="text-lg font-heading mb-2">Tenis muito massa</strong>
                    <p className="line-clamp-3 w-full mb-2 md:mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus in quibusdam itaque enim ut distinctio dicta obcaecati ex ipsam, minus architecto inventore sed, consequatur officia dolor ipsum sunt commodi cupiditate!</p>
                    <Button className="self-end">Visitar página</Button>
                </div>
            </AppCard>

            {cart?.products?.map(
                p => 
                    <div key={p.id}>
                        {p.name} - {p.pivot.quantity} <br />
                    </div>
            )}
        </div>
    )
}

Cart.layout = (page) => <HomeLayout children={page}/>

export default Cart