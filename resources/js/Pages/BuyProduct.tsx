import AppCard from "@/components/AppCard"
import { PagesWithLayout } from "@/types/inertia"

interface ProductProps {
    product?: Product
}

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
        <div className="container mx-auto max-w-4xl mb-4 p-4 min-h-screen space-y-4">
            <div>
                <h1 className="text-2xl font-semibold mb-2">
                    Produto
                </h1>

                <AppCard size='sm'>
                    a
                </AppCard>
            </div>
        </div>
    )
}

export default BuyProduct;