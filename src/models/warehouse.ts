export interface Warehouse {
    id: string
    name: string
    street: string
    city: string
    state: string
    zip_code: string
    is_main_warehouse: boolean
}

export interface WarehouseProduct {
    id: string
    warehouse_id: string
    product_id: string
    product_sku: string
    product_name: string
    product_image_url: string
    product_description: string
    product_price: number
    product_quantity: number
    product_category_id: string
}

export interface StockMovement {
    id: string
    product_id: string
    product_name: string
    quantity: number
    from_warehouse_id: string
    to_warehouse_id: string
    to_user_id: string
    created_at: Date
}