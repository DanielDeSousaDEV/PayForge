import AppCard from "@/components/AppCard"
import HomeTitle from "@/components/HomeTitle"
import { ProductCarousel } from "@/components/ProductCarousel"
import { ProductsDisplay } from "@/components/ProductsDisplay"
import { Button } from "@/components/ui/button"
import { PagesWithLayout } from "@/types/inertia"
import { Star } from "lucide-react"

interface ProductProps {
    product?: Product
}
const products: Product[] = [
  {
    id: 1,
    img_url: "/products/tenis.jpg",
    name: "Tênis Esportivo",
    description: "Tênis leve e confortável para corridas e caminhadas.",
    price: 199.9,
    created_at: new Date("2025-08-01T10:00:00")
  },
  {
    id: 2,
    img_url: "/products/camisa.jpg",
    name: "Camisa Polo",
    description: "Camisa polo clássica de algodão, ideal para uso casual.",
    price: 89.9,
    created_at: new Date("2025-08-02T15:30:00")
  },
  {
    id: 3,
    img_url: "/products/relogio.jpg",
    name: "Relógio Digital",
    description: "Relógio digital à prova d’água com cronômetro e alarme.",
    price: 149.5,
    created_at: new Date("2025-08-05T09:45:00")
  },
  {
    id: 4,
    img_url: "/products/fone.jpg",
    name: "Fone de Ouvido Bluetooth",
    description: "Fone sem fio com cancelamento de ruído e longa duração de bateria.",
    price: 249.0,
    created_at: new Date("2025-08-07T18:20:00")
  },
  {
    id: 5,
    img_url: "/products/mochila.jpg",
    name: "Mochila Executiva",
    description: "Mochila resistente com compartimento para notebook até 15.6”.",
    price: 179.9,
    created_at: new Date("2025-08-10T12:00:00")
  }
]

const prod: Product = {
    id: 1,
    img_url: "/products/tenis.jpg",
    name: "Tênis Esportivo",
    description: "Tênis leve e confortável para corridas e caminhadas.",
    price: 199.9,
    created_at: new Date("2025-08-01T10:00:00")
}

const BuyProduct: PagesWithLayout<ProductProps> = ({product}) => {
    return (
        <div className="container mx-auto max-w-7xl mb-4 p-4 min-h-screen space-y-4">
            <div>
                <AppCard size='sm' className="grid md:grid-cols-2 gap-4 items-stretch">
                    <ProductCarousel />

                    <div className="flex flex-col">
                        <h1 className="text-xl md:text-3xl font-heading font-semibold">
                            Tenis muito massa
                        </h1>

                        <div className="flex flex-col justify-between grow">
                            
                            <div>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                                    <div className="flex row gap-2 items-center">
                                        <div className="flex row gap-1">
                                            <Star className="fill-amber-300 stroke-amber-300" />
                                            <Star className="fill-amber-300 stroke-amber-300" />
                                            <Star className="fill-amber-300 stroke-amber-300" />
                                            <Star className="fill-amber-300 stroke-amber-300" />
                                            <Star className="fill-amber-300 stroke-amber-300" />
                                        </div>
                                        <p className="font-semibold text-base md:text-lg">4.5</p>
                                    </div>

                                    <p className="hidden md:block text-2xl">•</p>
                                    
                                    <p className="font-semibold text-base md:text-lg">133 Comments</p>
                                </div>

                                <p className="text-2xl md:text-4xl font-bold mb-4">R$ 2000.00</p>
                            </div>

                            <div className="space-y-2">
                                <Button size='lg' className="w-full">
                                    Comprar
                                </Button>
                                <Button size='lg' variant='outline' className="w-full">
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
                products={products}
                handleProductCardClick={prod => console.log(prod)}
            />
        </div>
    )
}

export default BuyProduct;