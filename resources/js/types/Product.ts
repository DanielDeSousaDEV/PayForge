interface Product {
    id: number,
    name: string,
    description: string,
    preview_url: string,
    images: string[],
    price: number,
    rating: number,
    created_at: Date
}

type ProductWithPivot = Product & {
    pivot: {
        quantity: number,
    }    
}