"use client"

import { OrderView } from "@/models/order"
import { ColumnDef } from "@tanstack/react-table"

export function useOrderColumns() {
    const columns: ColumnDef<OrderView>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "total_price",
            header: "Total Price",
        },
        {
            accessorKey: "payment_status",
            header: "Payment Status",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
        }
    ]

    return columns
}