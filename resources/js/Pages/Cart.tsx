import HomeTitle from "@/components/HomeTitle"
import ProductCartCard from "@/components/ProductCartCard"
import { Button } from "@/components/ui/button"
import HomeLayout from "@/layouts/HomeLayout"
import { PagesWithLayout } from "@/types/inertia"
import { router } from "@inertiajs/react"
import { ShoppingCart } from "lucide-react"

interface CartProps {
    cart?: Cart
}

const Cart: PagesWithLayout<CartProps> = ({cart}) => {
    function handleProductCardClick(id: number) {
        router.visit(`/product/${id}`)
    }

    function handlePaidCart() {
        if (!cart) return ;

        router.visit(`/cart/${cart.id}/pay`, {
            method: 'post'
        })
    }
    
    return (
        <div className="container mx-auto mb-4 p-4 min-h-screen">
            <HomeTitle>Produtos no carrinho</HomeTitle>

            {!cart && 
                <div className="flex flex-col items-center justify-center gap-4 text-gray-700 p-4 max-w-lg mt-8 mx-auto rounded-lg border-2 bg-gray-200 border-gray-700">
                    <ShoppingCart className="size-18"/>
                    <p className="text-xl font-bold">
                        Seu carrinho não possui produtos
                    </p>
                </div>
            }

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                {cart?.products.map((product, index) => (
                    <ProductCartCard
                        key={index}
                        product={product} 
                        handleClick={() => handleProductCardClick(product.id)} 
                    />
                ))}
            </div>

            {cart?.products?.map(
                p => 
                    <div key={p.id}>
                        {p.name} - {p.pivot.quantity}<br />
                    </div>
            )}

            {cart && 
                <div className="flex items-center justify-end">
                    <Button onClick={handlePaidCart}>
                        Pagar o carrinho
                    </Button>
                </div>
            }

        </div>
    )
}

Cart.layout = (page) => <HomeLayout children={page}/>

export default Cart