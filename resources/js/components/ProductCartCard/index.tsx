import AppCard from "../AppCard";

interface productCartCardProps {
    product: ProductWithPivot;
    handleClick: (product: Product) => void;
}

export default function ProductCartCard({
    product,
    handleClick,
}: productCartCardProps) {
    return (
        <AppCard
            size="sm"
            className="w-52 md:w-60 cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden p-3 flex flex-col"
            onClick={() => handleClick(product)}
        >
            <div className="w-full h-40 md:h-48 overflow-hidden rounded-lg mb-3">
                <img
                    src={product.preview_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <h4 className="text-lg font-heading font-semibold line-clamp-1 text-[var(--color-text)] mb-2">
                {product.name}
            </h4>

            <div className="flex items-center justify-between text-[var(--color-text-muted)]">
                <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                    R$ {product.price}
                </span>
                <span className="text-sm md:text-xs">
                    QTD: {product.pivot.quantity}
                </span>
            </div>
        </AppCard>
    );
}
