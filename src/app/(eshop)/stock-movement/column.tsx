"use client"

import { StockMovement } from "@/models/warehouse"
import { ColumnDef } from "@tanstack/react-table"

export function useStockMovementColumns() {
    const colums: ColumnDef<StockMovement>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "product_id",
            header: "Product ID",
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
        },
        {
            accessorKey: "from_warehouse_id",
            header: "From Warehouse ID",
        },
        {
            accessorKey: "to_warehouse_id",
            header: "To Warehouse ID",
        },
        {
            accessorKey: "to_user_id",
            header: "To User ID",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ cell }) => {
                return cell.getValue<Date>().toLocaleString()
            }
        }
    ]
    
    return colums
}