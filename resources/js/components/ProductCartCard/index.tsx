import AppCard from "../AppCard"

interface productCartCardProps {
    product: ProductWithPivot,
    handleClick: (product: Product) => void
}

export default function ProductCartCard({product, handleClick}: productCartCardProps) {
    return (
        <AppCard size='sm' className="w-50 md:w-60 cursor-pointer" onClick={() => handleClick(product)}>
            <div className="w-full h-40 md:h-50">
                <img src={product.preview_url} alt="Foto do produto" className="h-full w-full object-cover rounded-lg" />
            </div>
            
            <h4 className="text-lg font-heading font-semibold line-clamp-1 mb-2">{product.name}</h4>

            <p>
                <span className="md:text-xl font-bold mr-2">
                    R$ {product.price}
                </span>
                <span className="md:text-xs">
                    QTD: {product.pivot.quantity}
                </span>
            </p>
        </AppCard>
    )
}