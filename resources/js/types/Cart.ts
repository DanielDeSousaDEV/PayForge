interface Cart {
    id: number,
    // sales: Sale[],
    user: User,
    total_value: number,
    alredy_paid: boolean,
    created_at: Date,

    products: ProductWithPivot[]
}

interface Sale {
    quatity: number,
    product: Product
}