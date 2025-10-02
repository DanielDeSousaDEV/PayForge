import ProductCard from "../ProductCard";

interface ProductsDisplayProps {
    products: Product[];
    handleProductCardClick: (product: Product) => void;
}

export function ProductsDisplay({
    products,
    handleProductCardClick,
}: ProductsDisplayProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-2 md:px-4 place-items-center">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    product={product}
                    handleClick={handleProductCardClick}
                />
            ))}
        </div>
    );
}
