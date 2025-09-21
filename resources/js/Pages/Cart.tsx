import HomeTitle from "@/components/HomeTitle"
import ProductCartCard from "@/components/ProductCartCard"
import HomeLayout from "@/layouts/HomeLayout"
import { PagesWithLayout } from "@/types/inertia"
import { router } from "@inertiajs/react"

interface CartProps {
    cart?: Cart
}

const Cart: PagesWithLayout<CartProps> = ({cart}) => {
    function handleProductCardClick(id: number) {
        router.visit(`/product/${id}`)
    }
    
    return (
        <div className="container mx-auto mb-4 p-4 min-h-screen">
            <HomeTitle>Produtos no carrinho</HomeTitle>

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
                        {p.name} - {p.pivot.quantity} <br />
                    </div>
            )}
        </div>
    )
}

Cart.layout = (page) => <HomeLayout children={page}/>

export default Cart