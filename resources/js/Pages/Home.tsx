import AppCard from "@/components/AppCard";
import { HomeTitle } from "@/components/HomeTitle";
import { ProductsDisplay } from "@/components/ProductsDisplay";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import { Flame, Sparkles, Trophy } from "lucide-react";

interface HomeProps {
    products: Product[];
    productsMoreSold: Product[];
}

export default function Home({ products, productsMoreSold }: HomeProps) {
    function handleProductCardClick(product: Product) {
        router.visit("/product/" + product.id);
    }

    return (
        <div className="container mx-auto mb-8 p-4 space-y-8">
            <section>
                <HomeTitle icon={<Sparkles className="size-5" />}>
                    Produtos para você
                </HomeTitle>
                <ProductsDisplay
                    products={products}
                    handleProductCardClick={handleProductCardClick}
                />
            </section>

            <section>
                <HomeTitle icon={<Flame className="size-5" />}>
                    Produtos em alta
                </HomeTitle>
                <AppCard
                    size="sm"
                    className="grid md:grid-cols-6 gap-3 md:gap-6 w-full max-w-3xl mx-auto overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl"
                >
                    <div className="h-48 md:h-full col-span-2">
                        <img
                            src="/products/tenis.jpg"
                            alt="Foto do produto"
                            className="h-full w-full object-cover rounded-lg"
                        />
                    </div>

                    <div className="md:col-span-4 flex flex-col items-start space-y-3">
                        <strong className="text-xl font-heading font-semibold text-gray-100">
                            Tênis muito massa
                        </strong>

                        <p className="line-clamp-3 text-gray-400 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus in quibusdam itaque enim ut
                            distinctio dicta obcaecati ex ipsam, minus
                            architecto inventore sed, consequatur officia dolor
                            ipsum sunt commodi cupiditate!
                        </p>

                        <Button className="self-end">Visitar página</Button>
                    </div>
                </AppCard>
            </section>

            <section className="mb-8">
                <HomeTitle icon={<Trophy className="size-5" />}>
                    Mais vendidos
                </HomeTitle>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {productsMoreSold.map((p, idx) => (
                        <AppCard
                            key={idx}
                            size="sm"
                            className="p-3 hover:shadow-xl transition-all duration-300 rounded-xl cursor-pointer group"
                        >
                            <div className="w-full h-32 md:h-40 mb-3 overflow-hidden rounded-lg">
                                <img
                                    src={p.preview_url || p.images?.[0]}
                                    alt={p.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <h4 className="font-heading text-white font-semiboldtext-gray-100 truncate mb-1">
                                {p.name}
                            </h4>

                            <p className="text-sm font-bold text-primary">
                                R$ {p.price}
                            </p>
                        </AppCard>
                    ))}
                </div>
            </section>
        </div>
    );
}
