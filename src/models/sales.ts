export interface Sale {
    id: string
    user_id: string
    order_id: string
    product_id: string
    product_quantity: number
    margin_per_product: number
    created_at: Date
}