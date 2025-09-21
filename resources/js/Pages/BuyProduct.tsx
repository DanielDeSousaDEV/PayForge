import { AddProductToCartModal } from "@/components/AddProductToCartModal"
import AppCard from "@/components/AppCard"
import HomeTitle from "@/components/HomeTitle"
import { ProductCarousel } from "@/components/ProductCarousel"
import { ProductsDisplay } from "@/components/ProductsDisplay"
import { RatingStars } from "@/components/RatingStarts"
import { Button } from "@/components/ui/button"
import { PagesWithLayout } from "@/types/inertia"
import { useState } from "react"

interface BuyProductProps {
    product: Product,
    recomendedProducts: Product[],
}

const BuyProduct: PagesWithLayout<BuyProductProps> = ({product, recomendedProducts}) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    function handleAddToCart() {
        setIsOpenModal(true)
    }

    return (
        <div className="container mx-auto max-w-7xl mb-4 p-4 min-h-screen space-y-4">
            <div>
                <AppCard size='sm' className="grid md:grid-cols-2 gap-4 items-stretch">
                    <ProductCarousel images={product.images} />

                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-3xl font-heading font-semibold">
                            {product.name}
                        </h1>

                        <div className="flex flex-col justify-between grow">
                            
                            <div>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                                    <div className="flex row gap-2 items-center">
                                        <div className="flex row gap-1">
                                            <RatingStars rating={product.rating} />
                                        </div>
                                        <p className="font-semibold text-base md:text-lg">{product.rating}</p>
                                    </div>

                                    <p className="hidden md:block text-2xl">•</p>
                                    
                                    <p className="font-semibold text-base md:text-lg">133 Comments</p>
                                </div>

                                <p className="text-2xl md:text-4xl font-bold mb-4">R$ {product.price}</p>
                            </div>

                            <div className="space-y-2">
                                <Button size='lg' className="w-full">
                                    Comprar
                                </Button>
                                <Button 
                                    size='lg' 
                                    variant='outline' 
                                    className="w-full"
                                    onClick={handleAddToCart}
                                >
                                    Adicionar ao carrinho
                                </Button>
                            </div>
                        </div>
                    </div>                   
                    
                </AppCard>

            </div>

            <HomeTitle>
                Produtos relacionados
            </HomeTitle>


            <ProductsDisplay 
                products={recomendedProducts}
                handleProductCardClick={prod => console.log(prod)}
            />

            <AddProductToCartModal
                product={product}
                onOpenChange={setIsOpenModal}
                open={isOpenModal}
            />
        </div>
    )
}

export default BuyProduct;