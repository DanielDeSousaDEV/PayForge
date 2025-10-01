import { AddProductToCartModal } from "@/components/AddProductToCartModal";
import AppCard from "@/components/AppCard";
import { BuyProductModal } from "@/components/BuyProductModal";
import { HomeTitle } from "@/components/HomeTitle";
import { ProductCarousel } from "@/components/ProductCarousel";
import { ProductsDisplay } from "@/components/ProductsDisplay";
import { RatingStars } from "@/components/RatingStarts";
import { Button } from "@/components/ui/button";
import { PagesWithLayout } from "@/types/inertia";
import { Box } from "lucide-react";
import { useState } from "react";

interface ProductDetaisProps {
    product: Product;
    recomendedProducts: Product[];
}

const ProductDetais: PagesWithLayout<ProductDetaisProps> = ({
    product,
    recomendedProducts,
}) => {
    const [isOpenAddProductToCartModal, setIsOpenAddProductToCartModal] =
        useState(false);
    const [isOpenBuyProductModal, setIsOpenBuyProductModal] = useState(false);

    function handleAddToCart() {
        setIsOpenAddProductToCartModal(true);
    }

    function handleBuyProduct() {
        setIsOpenBuyProductModal(true);
    }

    return (
        <div className="container mx-auto max-w-7xl p-4 min-h-screen space-y-8">
            <AppCard
                size="sm"
                className="grid md:grid-cols-2 gap-8 items-start p-6 md:p-8 bg-[var(--color-surface)] rounded-xl shadow-lg"
            >
                <ProductCarousel
                    images={product.images}
                    className="rounded-lg"
                />

                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--color-text)] leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                        <div className="flex items-center gap-2">
                            <RatingStars rating={product.rating} size="sm"/>
                            <span className="font-medium text-lg si text-[var(--color-text)]">
                                {product.rating}
                            </span>
                        </div>

                        <p className="text-sm md:text-base font-medium text-gray-400">
                            133 comentários
                        </p>
                    </div>

                    <p className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                        R$ {product.price}
                    </p>

                    <div className="flex flex-col gap-4 mt-auto">
                        <Button
                            size="lg"
                            className="w-full rounded-xl shadow-md hover:shadow-lg transition bg-[var(--color-primary)] text-[var(--color-text)] hover:bg-[var(--color-secondary)]"
                            onClick={handleBuyProduct}
                        >
                            Comprar agora
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full rounded-xl border border-gray-500 text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition"
                            onClick={handleAddToCart}
                        >
                            Adicionar ao carrinho
                        </Button>
                    </div>
                </div>
            </AppCard>

            <HomeTitle icon={<Box className="size-5" />}>
                Produtos relacionados
            </HomeTitle>

            <ProductsDisplay
                products={recomendedProducts}
                handleProductCardClick={(prod) => console.log(prod)}
            />

            <BuyProductModal
                product={product}
                onOpenChange={setIsOpenBuyProductModal}
                open={isOpenBuyProductModal}
            />

            <AddProductToCartModal
                product={product}
                onOpenChange={setIsOpenAddProductToCartModal}
                open={isOpenAddProductToCartModal}
            />
        </div>
    );
};

export default ProductDetais;
