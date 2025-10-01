import AppCard from "../AppCard";

interface productCardProps {
    product: Product;
    handleClick: (product: Product) => void;
}

export default function ProductCard({
    product,
    handleClick,
}: productCardProps) {
    return (
        <AppCard
            size="sm"
            className="w-52 md:w-60 cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-[var(--color-surface)]"
            onClick={() => handleClick(product)}
        >
            <div className="w-full h-40 md:h-48 overflow-hidden rounded-t-xl">
                <img
                    src={product.preview_url}
                    alt={`Foto do produto ${product.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            <div className="p-3 flex flex-col">
                <h4 className="text-base md:text-lg font-heading font-semibold text-[var(--color-text)] line-clamp-1 mb-1">
                    {product.name}
                </h4>

                <p className="flex items-center gap-2">
                    <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                        R$ {product.price}
                    </span>
                    <span className="text-xs md:text-sm line-through text-[var(--color-text-muted)]">
                        R$ 200
                    </span>
                </p>
            </div>
        </AppCard>
    );
}
