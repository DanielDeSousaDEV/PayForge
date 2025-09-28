interface Cart {
    id: number,
    user: User,
    total_value: number,
    alredy_paid: boolean,
    created_at: Date,

    products: ProductWithPivot[]
}