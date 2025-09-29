import AppCard from "@/components/AppCard";
import HomeTitle from "@/components/HomeTitle";
import { ProductsDisplay } from "@/components/ProductsDisplay";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";

interface HomeProps {
  products: Product[],
  productsMoreSold: Product[]
}

export default function Home({products, productsMoreSold}: HomeProps) {

    function handleProductCardClick (product: Product) {
        router.visit('/product/' + product.id)
    }

    return (
        <div className="container mx-auto mb-4 p-4">
            <HomeTitle>Produtos para você:</HomeTitle>
            <ProductsDisplay
              products={products}
              handleProductCardClick={handleProductCardClick}
            />
            

            <HomeTitle>Produtos em alta:</HomeTitle>
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

            {productsMoreSold.map(
              p => <>{p.name} <br /></>
            )}
        </div>
    )
}