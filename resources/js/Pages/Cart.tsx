import { HomeTitle } from "@/components/HomeTitle";
import ProductCartCard from "@/components/ProductCartCard";
import { Button } from "@/components/ui/button";
import HomeLayout from "@/layouts/HomeLayout";
import { PagesWithLayout } from "@/types/inertia";
import { router } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface CartProps {
    cart?: Cart;
}

const Cart: PagesWithLayout<CartProps> = ({ cart }) => {
    const [isLoading, setIsLoading] = useState(false);

    function handleProductCardClick(id: number) {
        router.visit(`/product/${id}`);
    }

    function handlePaidCart() {
        if (!cart) return;
        setIsLoading(true);

        router.visit(`/cart/${cart.id}/pay`, {
            method: "post",
        });

        setIsLoading(false);
    }

    return (
        <div className="container mx-auto mb-8 p-4 min-h-screen space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <HomeTitle
                    icon={
                        <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
                    }
                >
                    Produtos no carrinho
                </HomeTitle>

                {cart && cart.products.length > 0 && (
                    <Button
                        onClick={handlePaidCart}
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-[var(--color-background)] rounded-lg shadow-md transition flex items-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" /> Pagar o carrinho
                    </Button>
                )}
            </div>

            {!cart || cart.products.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 text-[var(--color-text-muted)] p-8 max-w-md mx-auto rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-md">
                    <ShoppingCart className="w-16 h-16 text-[var(--color-primary)]" />
                    <p className="text-xl font-semibold text-[var(--color-text)] text-center">
                        Seu carrinho ainda não possui produtos
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] text-center">
                        Adicione produtos e eles aparecerão aqui para você
                        finalizar sua compra.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cart.products.map((product, index) => (
                        <ProductCartCard
                            key={index}
                            product={product}
                            handleClick={() =>
                                handleProductCardClick(product.id)
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

Cart.layout = (page) => <HomeLayout children={page} />;

export default Cart;
