interface Cart {
    id: number,
    sales: Sale[],
    user: User,
    total_value: number,
    created_at: Date
}

interface Sale {
    quatity: number,
    product: Product
}