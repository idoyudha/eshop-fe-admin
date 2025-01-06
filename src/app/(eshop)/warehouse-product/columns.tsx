"use client"

import { formatMoney } from "@/lib/utils"
import { WarehouseProduct } from "@/models/warehouse"
import { ColumnDef } from "@tanstack/react-table"

export function useWarehouseProductColumns() {
    const colums: ColumnDef<WarehouseProduct>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "warehouse_id",
            header: "Warehouse ID",
        },
        {
            accessorKey: "product_id",
            header: "Product ID",
        },
        {
            accessorKey: "product_name",
            header: "Name",
        },
        {
            accessorKey: "product_price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.original.product_price
                return <span>{formatMoney({ price: price, currency: "USD" })}</span>
            }
        },
        {
            accessorKey: "product_quantity",
            header: "Quantity",
        },
    ]
    
    return colums
}