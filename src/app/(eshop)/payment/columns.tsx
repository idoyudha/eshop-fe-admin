"use client"

import { Payment } from "@/models/payment"
import { ColumnDef } from "@tanstack/react-table"

export function usePaymentColumns() {
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "order_id",
            header: "Order ID",
        },
        {
            accessorKey: "status",
            header: "Payment Status",
        },
        {
            accessorKey: "note",
            header: "Note",
        },
        {
            accessorKey: "created_at",
            header: "Created At",
        }
    ]
    
    return columns
}